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

/** Fetch pixel IDs from backend at request time (Easypanel env). */
export async function fetchTrackingConfigFromBackend(): Promise<ServerPixelConfig> {
  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/config`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      })
      if (response.ok) {
        return normalizePixelConfig(
          (await response.json()) as Parameters<typeof normalizePixelConfig>[0],
        )
      }
    } catch {
      // try next backend URL
    }
  }
  return EMPTY
}
