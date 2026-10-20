import { NextResponse } from 'next/server'
import { getBackendCandidates } from '@/lib/orders.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Fire a Snapchat CAPI test Purchase via the backend validate endpoint.
 * Open Ads Manager → Events Manager → Test events, then POST this route.
 */
export async function POST() {
  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/snap-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
        cache: 'no-store',
        signal: AbortSignal.timeout(20_000),
      })
      const data = await response.json().catch(() => ({}))
      return NextResponse.json(data, {
        status: response.status,
        headers: { 'Cache-Control': 'no-store' },
      })
    } catch (error) {
      console.error(`[tracking/snap-test] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  return NextResponse.json(
    { ok: false, error: 'backend unreachable' },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  )
}
