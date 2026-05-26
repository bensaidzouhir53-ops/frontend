import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const UPSELL_PRICE = 99

type RouteContext = { params: Promise<{ orderId: string }> }

export async function POST(request: Request, context: RouteContext) {
  const { orderId } = await context.params
  const payload = await request.json().catch(() => ({}))

  try {
    const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/upsell`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const body = await res.json().catch(() => ({}))

    if (res.ok) {
      return NextResponse.json(body, { status: res.status })
    }

    return NextResponse.json(body, { status: res.status })
  } catch {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        order_id: orderId,
        order_number: 'NSM-DEV',
        upsell_total: UPSELL_PRICE,
        total: UPSELL_PRICE,
        currency: 'SAR',
      })
    }

    return NextResponse.json(
      { detail: 'تعذر إضافة العرض الإضافي حالياً' },
      { status: 503 },
    )
  }
}
