import { NextResponse } from 'next/server'
import { getBackendCandidates } from '@/lib/orders.server'
import { normalizePixelConfig } from '@/lib/pixel-config.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export interface PublicTrackingConfig {
  enabled: boolean
  meta_pixel_id?: string | null
  tiktok_pixel_id?: string | null
  snap_pixel_id?: string | null
}

export async function GET() {
  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/config`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      })

      if (response.ok) {
        const body = normalizePixelConfig(
          (await response.json()) as PublicTrackingConfig,
        )
        return NextResponse.json(body, {
          headers: { 'Cache-Control': 'no-store' },
        })
      }
    } catch (error) {
      console.error(`[tracking/config] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  return NextResponse.json(
    { enabled: false, meta_pixel_id: null, tiktok_pixel_id: null, snap_pixel_id: null },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  )
}
