import type { OrderPayload, OrderResponse } from '@/types'

function parseApiError(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') return fallback

  const detail = (body as { detail?: unknown }).detail

  if (typeof detail === 'string') return detail

  if (Array.isArray(detail)) {
    const first = detail[0] as { msg?: string } | undefined
    if (first?.msg) return first.msg
  }

  if (detail && typeof detail === 'object' && 'message' in detail) {
    const message = (detail as { message?: unknown }).message
    if (typeof message === 'string') return message
  }

  return fallback
}

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(
      parseApiError(
        body,
        res.status >= 502
          ? 'الخادم غير متاح حالياً. يرجى المحاولة بعد دقيقة.'
          : 'حدث خطأ، يرجى المحاولة مجدداً',
      ),
    )
  }

  return body as OrderResponse
}

export async function declineUpsell(orderId: string): Promise<void> {
  const res = await fetch(`/api/orders/${orderId}/upsell/decline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(parseApiError(body, 'تعذر إكمال الطلب حالياً'))
  }
}

export async function acceptUpsell(
  orderId: string,
  payload: { product_slug: string; quantity: number; event_id?: string },
): Promise<OrderResponse> {
  const res = await fetch(`/api/orders/${orderId}/upsell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(parseApiError(body, 'حدث خطأ في الإضافة'))
  }

  return res.json() as Promise<OrderResponse>
}
