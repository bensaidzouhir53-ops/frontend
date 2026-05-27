import { NextResponse } from 'next/server'
import { getBackendCandidates, getClientIpFromRequest } from '@/lib/orders.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let payload: Record<string, unknown>

  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ stored: false }, { status: 202 })
  }

  const clientIp = getClientIpFromRequest(request)
  const body = clientIp ? { ...payload, client_ip: clientIp } : payload
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (clientIp) {
    headers['X-Forwarded-For'] = clientIp
    headers['X-Real-IP'] = clientIp
  }

  for (const baseUrl of getBackendCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/api/tracking/events`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      })

      if (response.ok) {
        const responseBody = await response.json().catch(() => ({ stored: false }))
        return NextResponse.json(responseBody, { status: 202 })
      }

      return NextResponse.json({ stored: false }, { status: 202 })
    } catch (error) {
      console.error(`[tracking] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  return NextResponse.json({ stored: false }, { status: 202 })
}
