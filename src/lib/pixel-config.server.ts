import { getBackendCandidates } from '@/lib/orders.server'
import { DEFAULT_META_PIXEL_ID, getCanonicalMetaPixelId } from '@/lib/meta-pixel'

export interface ServerPixelConfig {
  enabled: boolean
  /** Primary Meta pixel (first in list) — backward compatible */
  meta_pixel_id: string | null
  /** All Meta browser pixel IDs */
  meta_pixel_ids: string[]
  tiktok_pixel_id: string | null
  snap_pixel_id: string | null
  /** Meta Purchase handled by backend CAPI — skip browser fbq Purchase */
  capi_enabled: boolean
}

const EMPTY: ServerPixelConfig = {
  enabled: false,
  meta_pixel_id: null,
  meta_pixel_ids: [],
  tiktok_pixel_id: null,
  snap_pixel_id: null,
  capi_enabled: false,
}

function isValidPixelId(value: string | null | undefined): value is string {
  if (!value) return false
  const id = value.trim()
  if (!id) return false
  const lower = id.toLowerCase()
  if (lower === 'your_id' || lower === 'your_token' || lower.startsWith('your_')) {
    return false
  }
  return /^[A-Za-z0-9_-]+$/.test(id)
}

function collectMetaPixelIds(raw: {
  meta_pixel_id?: string | null
  meta_pixel_ids?: string[] | null
  extra?: Array<string | null | undefined>
}): string[] {
  const ids: string[] = []
  const add = (value: string | null | undefined) => {
    if (!isValidPixelId(value)) return
    const trimmed = value.trim()
    if (!ids.includes(trimmed)) ids.push(trimmed)
  }

  add(raw.meta_pixel_id)
  for (const id of raw.meta_pixel_ids ?? []) add(id)
  for (const id of raw.extra ?? []) add(id)

  return ids
}

export function normalizePixelConfig(raw: {
  enabled?: boolean
  meta_pixel_id?: string | null
  meta_pixel_ids?: string[] | null
  tiktok_pixel_id?: string | null
  snap_pixel_id?: string | null
  capi_enabled?: boolean
}): ServerPixelConfig {
  const metaIds = collectMetaPixelIds(raw)
  const tiktok = resolveTikTokPixelId(raw.tiktok_pixel_id)
  const snap = isValidPixelId(raw.snap_pixel_id) ? raw.snap_pixel_id!.trim() : null
  const hasAny = Boolean(metaIds.length || tiktok || snap)

  return {
    enabled: hasAny && (Boolean(raw.enabled) || process.env.ENABLE_WEB_PIXELS !== 'false'),
    meta_pixel_id: metaIds[0] ?? null,
    meta_pixel_ids: metaIds,
    tiktok_pixel_id: tiktok,
    snap_pixel_id: snap,
    capi_enabled: Boolean(raw.capi_enabled),
  }
}

type PixelConfigInput = Parameters<typeof normalizePixelConfig>[0] & {
  capi_enabled?: boolean
}

function resolveTikTokPixelId(...candidates: Array<string | null | undefined>): string | null {
  for (const raw of candidates) {
    if (!isValidPixelId(raw)) continue
    return raw.trim()
  }
  return null
}

/** Deploy-time TikTok override (Dockerfile / Easypanel frontend env). */
export function getTikTokPixelOverride(): string | null {
  return resolveTikTokPixelId(
    process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
    process.env.TIKTOK_PIXEL_CODE,
    process.env.TIKTOK_PIXEL_ID,
  )
}

function getSnapPixelOverride(): string | null {
  const raw = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? process.env.SNAP_PIXEL_ID ?? null
  return isValidPixelId(raw) ? raw.trim() : null
}

/** Force a single Meta pixel so browser + Ads Manager always match. */
export function applyCanonicalMetaPixel(config: ServerPixelConfig): ServerPixelConfig {
  const canonical = getCanonicalMetaPixelId()
  const webPixelsEnabled = process.env.ENABLE_WEB_PIXELS !== 'false'
  return {
    ...config,
    enabled: config.enabled || webPixelsEnabled,
    meta_pixel_id: canonical,
    meta_pixel_ids: [canonical],
  }
}

/** Merge configs — backend meta pixel wins; env fallback only when backend has none. */
export function mergePixelConfigs(...sources: PixelConfigInput[]): ServerPixelConfig {
  const backendSource = sources[0]

  const metaIds = [getCanonicalMetaPixelId()]

  let tiktok: string | null = null
  let snap: string | null = null
  let anyEnabled = false
  const tiktokCandidates: Array<string | null | undefined> = []

  for (const source of sources) {
    if (source.enabled) anyEnabled = true
    tiktokCandidates.push(source.tiktok_pixel_id)
    const nextSnap = isValidPixelId(source.snap_pixel_id) ? source.snap_pixel_id!.trim() : null
    if (nextSnap && !snap) snap = nextSnap
  }

  tiktokCandidates.push(getTikTokPixelOverride())
  tiktok = resolveTikTokPixelId(...tiktokCandidates)

  const snapOverride = getSnapPixelOverride()
  if (snapOverride) snap = snapOverride

  const hasAny = Boolean(metaIds.length || tiktok || snap)
  const webPixelsEnabled = process.env.ENABLE_WEB_PIXELS !== 'false'

  return {
    enabled: (anyEnabled || webPixelsEnabled) && hasAny,
    meta_pixel_id: metaIds[0] ?? null,
    meta_pixel_ids: metaIds,
    tiktok_pixel_id: tiktok,
    snap_pixel_id: snap,
    capi_enabled: Boolean(
      process.env.NEXT_PUBLIC_CAPI_ENABLED === 'true' ||
        backendSource?.capi_enabled ||
        sources.some((source) => source.capi_enabled),
    ),
  }
}

/** Runtime env fallback when backend fetch fails during Docker build or network blip. */
export function getEnvPixelFallback(): ServerPixelConfig {
  const capiFromEnv = process.env.NEXT_PUBLIC_CAPI_ENABLED === 'true'
  return normalizePixelConfig({
    enabled: process.env.ENABLE_WEB_PIXELS !== 'false',
    meta_pixel_id:
      process.env.NEXT_PUBLIC_META_PIXEL_ID ??
      process.env.META_PIXEL_ID ??
      DEFAULT_META_PIXEL_ID,
    tiktok_pixel_id: resolveTikTokPixelId(
      process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
      process.env.TIKTOK_PIXEL_CODE,
      process.env.TIKTOK_PIXEL_ID,
    ),
    snap_pixel_id:
      process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? process.env.SNAP_PIXEL_ID ?? null,
    capi_enabled: capiFromEnv,
  })
}

function isProductionBuild(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build'
}

/** Fetch pixel IDs from backend first, then merge env fallbacks (never skip backend). */
export async function fetchTrackingConfigFromBackend(): Promise<ServerPixelConfig> {
  const envFallback = getEnvPixelFallback()

  // Backend is unreachable during Docker/CI builds — env vars are baked in via build args.
  if (isProductionBuild()) {
    const built = envFallback.enabled ? envFallback : EMPTY
    return applyCanonicalMetaPixel(built)
  }

  let backendRaw: PixelConfigInput | null = null

  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/config`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      })
      if (response.ok) {
        backendRaw = (await response.json()) as PixelConfigInput
        break
      }
    } catch {
      // try next backend URL
    }
  }

  if (backendRaw) {
    const backendConfig = normalizePixelConfig(backendRaw)
    if (backendConfig.meta_pixel_ids.length > 0) {
      const webPixelsEnabled = process.env.ENABLE_WEB_PIXELS !== 'false'
      return applyCanonicalMetaPixel({
        ...backendConfig,
        enabled: backendConfig.enabled || webPixelsEnabled,
        capi_enabled:
          process.env.NEXT_PUBLIC_CAPI_ENABLED === 'true' ||
          backendConfig.capi_enabled,
      })
    }
    return applyCanonicalMetaPixel(mergePixelConfigs(backendConfig, envFallback))
  }

  if (envFallback.meta_pixel_ids.length > 0 || envFallback.tiktok_pixel_id) {
    console.warn(
      '[pixel-config] Backend /api/tracking/config unreachable — using env fallback for pixel IDs',
    )
  }

  return applyCanonicalMetaPixel(
    envFallback.enabled
      ? {
          ...envFallback,
          capi_enabled:
            process.env.NEXT_PUBLIC_CAPI_ENABLED === 'true' ||
            envFallback.capi_enabled,
        }
      : EMPTY,
  )
}

export function getMetaPixelIds(config: ServerPixelConfig): string[] {
  if (config.meta_pixel_ids.length > 0) return config.meta_pixel_ids
  return config.meta_pixel_id ? [config.meta_pixel_id] : []
}
