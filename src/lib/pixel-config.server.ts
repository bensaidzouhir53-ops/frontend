import { getBackendCandidates } from '@/lib/orders.server'

export interface ServerPixelConfig {
  enabled: boolean
  /** Primary Meta pixel (first in list) — backward compatible */
  meta_pixel_id: string | null
  /** All Meta browser pixel IDs */
  meta_pixel_ids: string[]
  tiktok_pixel_id: string | null
  snap_pixel_id: string | null
}

const EMPTY: ServerPixelConfig = {
  enabled: false,
  meta_pixel_id: null,
  meta_pixel_ids: [],
  tiktok_pixel_id: null,
  snap_pixel_id: null,
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
}): ServerPixelConfig {
  const metaIds = collectMetaPixelIds(raw)
  const tiktok = resolveTikTokPixelId(raw.tiktok_pixel_id)
  const snap = isValidPixelId(raw.snap_pixel_id) ? raw.snap_pixel_id!.trim() : null
  const hasAny = Boolean(metaIds.length || tiktok || snap)

  return {
    enabled: Boolean(raw.enabled) && hasAny,
    meta_pixel_id: metaIds[0] ?? null,
    meta_pixel_ids: metaIds,
    tiktok_pixel_id: tiktok,
    snap_pixel_id: snap,
  }
}

type PixelConfigInput = Parameters<typeof normalizePixelConfig>[0]

/** Legacy pixel — replaced in Easypanel; ignore if backend still returns it. */
const STALE_TIKTOK_PIXEL_IDS = new Set(['D6FOFO3C77U2V3Q5MST0'])
const ACTIVE_TIKTOK_PIXEL_ID = 'D8C3P7RC77UA4F3IGAJG'

function resolveTikTokPixelId(...candidates: Array<string | null | undefined>): string | null {
  for (const raw of candidates) {
    if (!isValidPixelId(raw)) continue
    const id = raw.trim()
    if (STALE_TIKTOK_PIXEL_IDS.has(id)) continue
    return id
  }
  return isValidPixelId(ACTIVE_TIKTOK_PIXEL_ID) ? ACTIVE_TIKTOK_PIXEL_ID : null
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

/** Merge backend + env (+ any other sources) so a baked-in primary ID never hides new pixels. */
export function mergePixelConfigs(...sources: PixelConfigInput[]): ServerPixelConfig {
  const metaIds = collectMetaPixelIds({
    extra: sources.flatMap((source) => [
      source.meta_pixel_id,
      ...(source.meta_pixel_ids ?? []),
    ]),
  })

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
  }
}

/** Runtime env fallback when backend fetch fails during Docker build or network blip. */
export function getEnvPixelFallback(): ServerPixelConfig {
  return normalizePixelConfig({
    enabled: process.env.ENABLE_WEB_PIXELS !== 'false',
    meta_pixel_ids: collectMetaPixelIds({
      extra: [
        process.env.NEXT_PUBLIC_META_PIXEL_ID ?? process.env.META_PIXEL_ID,
        process.env.NEXT_PUBLIC_META_PIXEL_ID_2 ?? process.env.META_PIXEL_ID_2,
        process.env.NEXT_PUBLIC_META_PIXEL_ID_3 ?? process.env.META_PIXEL_ID_3,
        process.env.NEXT_PUBLIC_META_PIXEL_ID_4 ?? process.env.META_PIXEL_ID_4,
      ],
    }),
    tiktok_pixel_id: resolveTikTokPixelId(
      process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
      process.env.TIKTOK_PIXEL_CODE,
      process.env.TIKTOK_PIXEL_ID,
    ),
    snap_pixel_id:
      process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? process.env.SNAP_PIXEL_ID ?? null,
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
    return envFallback.enabled ? envFallback : EMPTY
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
    return mergePixelConfigs(
      { ...backendRaw, enabled: backendConfig.enabled || envFallback.enabled },
      {
        enabled: envFallback.enabled,
        meta_pixel_ids: envFallback.meta_pixel_ids,
        tiktok_pixel_id: envFallback.tiktok_pixel_id,
      },
    )
  }

  if (envFallback.meta_pixel_ids.length > 0 || envFallback.tiktok_pixel_id) {
    console.warn(
      '[pixel-config] Backend /api/tracking/config unreachable — using env fallback for pixel IDs',
    )
  }

  return envFallback.enabled ? envFallback : EMPTY
}

export function getMetaPixelIds(config: ServerPixelConfig): string[] {
  if (config.meta_pixel_ids.length > 0) return config.meta_pixel_ids
  return config.meta_pixel_id ? [config.meta_pixel_id] : []
}
