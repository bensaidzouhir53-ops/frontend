import { NextResponse } from 'next/server'
import { getBackendCandidates } from '@/lib/orders.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const UPSELL_PRICE = 99

type RouteContext = { params: Promise<{ orderId: string }> }

export async function POST(request: Request, context: RouteContext) {
  const { orderId } = await context.params
  const payload = await request.json().catch(() => ({}))
  const candidates = getBackendCandidates()

  let lastError: unknown

  for (const baseUrl of candidates) {
    try {
      const res = await fetch(`${baseUrl}/api/orders/${orderId}/upsell`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
        signal: AbortSignal.timeout(20_000),
      })

      const body = await res.json().catch(() => ({}))

      if (res.ok) {
        return NextResponse.json(body, { status: res.status })
      }

      const detail = (body as { detail?: unknown }).detail
      const isGatewayError =
        res.status === 502 ||
        res.status === 504 ||
        (res.status === 503 && detail === undefined)

      if (isGatewayError) {
        lastError = new Error(`Backend gateway error ${res.status} at ${baseUrl}`)
        console.error(
          `[upsell] Gateway/proxy error ${res.status} at ${baseUrl} — trying next candidate`,
        )
        continue
      }

      return NextResponse.json(body, { status: res.status })
    } catch (error) {
      lastError = error
      console.error(`[upsell] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({
      order_id: orderId,
      order_number: 'NA-DEV',
      upsell_total: UPSELL_PRICE,
      total: UPSELL_PRICE,
      currency: 'SAR',
    })
  }

  console.error('[api/orders/upsell] Connection failed:', lastError)

  return NextResponse.json(
    { detail: 'تعذر إضافة العرض الإضافي حالياً' },
    { status: 503 },
  )
}
