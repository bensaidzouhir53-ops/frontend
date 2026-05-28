import { getBackendCandidates } from '@/lib/orders.server'

export interface ServerPixelConfig {
  enabled: boolean
  meta_pixel_id: string | null
  tiktok_pixel_id: string | null
  snap_pixel_id: string | null
}

const EMPTY: ServerPixelConfig = {
  enabled: false,
  meta_pixel_id: null,
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

export function normalizePixelConfig(raw: {
  enabled?: boolean
  meta_pixel_id?: string | null
  tiktok_pixel_id?: string | null
  snap_pixel_id?: string | null
}): ServerPixelConfig {
  const meta = isValidPixelId(raw.meta_pixel_id) ? raw.meta_pixel_id!.trim() : null
  const tiktok = isValidPixelId(raw.tiktok_pixel_id) ? raw.tiktok_pixel_id!.trim() : null
  const snap = isValidPixelId(raw.snap_pixel_id) ? raw.snap_pixel_id!.trim() : null
  const hasAny = Boolean(meta || tiktok || snap)

  return {
    enabled: Boolean(raw.enabled) && hasAny,
    meta_pixel_id: meta,
    tiktok_pixel_id: tiktok,
    snap_pixel_id: snap,
  }
}

/** Runtime env fallback when backend fetch fails during Docker build or network blip. */
export function getEnvPixelFallback(): ServerPixelConfig {
  return normalizePixelConfig({
    enabled: process.env.ENABLE_WEB_PIXELS !== 'false',
    meta_pixel_id:
      process.env.NEXT_PUBLIC_META_PIXEL_ID ?? process.env.META_PIXEL_ID ?? null,
    tiktok_pixel_id:
      process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ??
      process.env.TIKTOK_PIXEL_CODE ??
      process.env.TIKTOK_PIXEL_ID ??
      null,
    snap_pixel_id:
      process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? process.env.SNAP_PIXEL_ID ?? null,
  })
}

/** Fetch pixel IDs from backend at request time (Easypanel env). */
export async function fetchTrackingConfigFromBackend(): Promise<ServerPixelConfig> {
  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/config`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      })
      if (response.ok) {
        const config = normalizePixelConfig(
          (await response.json()) as Parameters<typeof normalizePixelConfig>[0],
        )
        if (config.enabled) return config
      }
    } catch {
      // try next backend URL
    }
  }

  const fallback = getEnvPixelFallback()
  return fallback.enabled ? fallback : EMPTY
}
