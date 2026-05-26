import { NextResponse } from 'next/server'
import {
  createDevFallbackOrder,
  forwardOrderToBackend,
  getClientIpFromRequest,
  parseBackendError,
  type CreateOrderPayload,
} from '@/lib/orders.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let payload: CreateOrderPayload

  try {
    payload = (await request.json()) as CreateOrderPayload
  } catch {
    return NextResponse.json(
      { detail: 'بيانات الطلب غير صالحة' },
      { status: 400 },
    )
  }

  try {
    const clientIp = getClientIpFromRequest(request)
    const result = await forwardOrderToBackend(payload, clientIp)

    if (result.ok) {
      return NextResponse.json(result.data, { status: 201 })
    }

    return NextResponse.json(
      { detail: parseBackendError(result.body) },
      { status: result.status },
    )
  } catch (error) {
    console.error('[api/orders] Connection failed:', error)

    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(createDevFallbackOrder(payload), { status: 201 })
    }

    return NextResponse.json(
      {
        detail:
          'تعذر الاتصال بالخادم حالياً. تأكد أن الخدمة تعمل ثم حاول مرة أخرى.',
      },
      { status: 503 },
    )
  }
}
