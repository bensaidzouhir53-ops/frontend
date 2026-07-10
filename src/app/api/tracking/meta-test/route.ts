import { NextResponse } from 'next/server'
import { getBackendCandidates } from '@/lib/orders.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Fire a Meta CAPI test Purchase via backend.
 * Body (optional): { "test_event_code": "TEST…" }
 * Open Events Manager → Test events, paste the TEST code, then call this.
 */
export async function POST(request: Request) {
  let body: unknown = {}
  try {
    body = await request.json()
  } catch {
    body = {}
  }

  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/meta-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body ?? {}),
        cache: 'no-store',
        signal: AbortSignal.timeout(20_000),
      })
      const data = await response.json().catch(() => ({}))
      return NextResponse.json(data, {
        status: response.status,
        headers: { 'Cache-Control': 'no-store' },
      })
    } catch (error) {
      console.error(`[tracking/meta-test] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  return NextResponse.json(
    { ok: false, error: 'backend unreachable' },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  )
}
