import { NextResponse } from 'next/server'
import { getBackendCandidates } from '@/lib/orders.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Proxy backend CAPI status (no secrets) so you can check from nafaas.shop. */
export async function GET() {
  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/capi-status`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      })
      if (response.ok) {
        const body = await response.json()
        return NextResponse.json(body, {
          headers: { 'Cache-Control': 'no-store' },
        })
      }
    } catch (error) {
      console.error(`[tracking/capi-status] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  return NextResponse.json(
    { error: 'backend unreachable', enable_capi: null, meta: { ready: false } },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  )
}
