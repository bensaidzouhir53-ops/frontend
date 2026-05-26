import { randomUUID } from 'crypto'

const QUANTITY_PRICES: Record<number, number> = {
  1: 169,
  2: 245,
  3: 325,
}

export interface CreateOrderPayload {
  customer_name: string
  phone: string
  items: { product_slug: string; quantity: number }[]
  landing_page?: string
  utm?: Record<string, string>
  click_ids?: Record<string, string>
  cookies?: Record<string, string>
  event_id?: string
  user_agent?: string
  client_ip?: string
}

export interface CreateOrderResult {
  order_id: string
  order_number: string
  subtotal: number
  total: number
  currency: string
  upsell?: {
    product_slug: string
    name_ar: string
    price: number
    offer_text: string
  }
}

function calculateOrderTotal(items: { quantity: number }[]): number {
  return items.reduce(
    (sum, item) => sum + (QUANTITY_PRICES[item.quantity] ?? item.quantity * 169),
    0,
  )
}

function generateLocalOrderNumber(): string {
  return `NSM-${Date.now().toString().slice(-8)}`
}

export function parseBackendError(body: unknown): string {
  if (!body || typeof body !== 'object') {
    return 'حدث خطأ، يرجى المحاولة مجدداً'
  }

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

  return 'حدث خطأ، يرجى المحاولة مجدداً'
}

export function createDevFallbackOrder(payload: CreateOrderPayload): CreateOrderResult {
  const total = calculateOrderTotal(payload.items)
  return {
    order_id: randomUUID(),
    order_number: generateLocalOrderNumber(),
    subtotal: total,
    total,
    currency: 'SAR',
  }
}

/** Extract the visitor IP from Next.js / proxy headers */
export function getClientIpFromRequest(request: Request): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }

  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  const cfIp = request.headers.get('cf-connecting-ip')?.trim()
  if (cfIp) return cfIp

  return undefined
}

export async function forwardOrderToBackend(
  payload: CreateOrderPayload,
  backendUrl: string,
  clientIp?: string,
): Promise<{ ok: true; data: CreateOrderResult } | { ok: false; status: number; body: unknown }> {
  const resolvedIp = clientIp ?? payload.client_ip
  const requestBody: CreateOrderPayload = resolvedIp
    ? { ...payload, client_ip: resolvedIp }
    : payload

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (resolvedIp) {
    headers['X-Forwarded-For'] = resolvedIp
    headers['X-Real-IP'] = resolvedIp
  }

  const res = await fetch(`${backendUrl}/api/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
    cache: 'no-store',
  })

  const responseBody = await res.json().catch(() => ({}))

  if (res.ok) {
    return { ok: true, data: responseBody as CreateOrderResult }
  }

  return { ok: false, status: res.status, body: responseBody }
}
