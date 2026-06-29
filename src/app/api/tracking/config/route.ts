import { NextResponse } from 'next/server'
import { getBackendCandidates } from '@/lib/orders.server'
import { getEnvPixelFallback, mergePixelConfigs } from '@/lib/pixel-config.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export interface PublicTrackingConfig {
  enabled: boolean
  meta_pixel_id?: string | null
  meta_pixel_ids?: string[] | null
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
        const backendRaw = (await response.json()) as PublicTrackingConfig
        const body = mergePixelConfigs(backendRaw, {
          enabled: process.env.ENABLE_WEB_PIXELS !== 'false',
          meta_pixel_ids: [
            process.env.NEXT_PUBLIC_META_PIXEL_ID,
            process.env.NEXT_PUBLIC_META_PIXEL_ID_2,
            process.env.NEXT_PUBLIC_META_PIXEL_ID_3,
            process.env.NEXT_PUBLIC_META_PIXEL_ID_4,
          ].filter(Boolean) as string[],
          tiktok_pixel_id: getEnvPixelFallback().tiktok_pixel_id,
        })
        return NextResponse.json(body, {
          headers: { 'Cache-Control': 'no-store' },
        })
      }
    } catch (error) {
      console.error(`[tracking/config] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  return NextResponse.json(getEnvPixelFallback(), {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  })
}
