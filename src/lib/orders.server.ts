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
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const seq = String(now.getTime()).slice(-4)
  return `nasama${y}${m}${d}${seq}`
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

/** Derive production API URL when env vars were not set at build/deploy time */
function getDefaultProductionApiUrl(): string | null {
  if (process.env.NODE_ENV !== 'production') return null

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (siteUrl) {
    try {
      const site = new URL(siteUrl)
      const host = site.hostname.replace(/^www\./, '')
      if (host === 'nasama.shop') return 'https://api.nasama.shop'
      return `${site.protocol}//api.${host}`
    } catch {
      // ignore invalid site URL
    }
  }

  return 'https://api.nasama.shop'
}

function isInternalBackendUrl(url: string): boolean {
  try {
    const { hostname, protocol } = new URL(url)
    if (protocol === 'http:' && (hostname === 'localhost' || hostname === '127.0.0.1')) {
      return true
    }
    // Docker / private network hostnames (no dot, or service name with underscore)
    return !hostname.includes('.') || hostname.includes('_')
  } catch {
    return false
  }
}

/** Server-side backend URLs to try (public URLs first, then internal fallbacks) */
export function getBackendCandidates(): string[] {
  const urls = [
    process.env.BACKEND_URL,
    process.env.NEXT_PUBLIC_API_URL,
    process.env.BACKEND_INTERNAL_URL,
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : null,
    getDefaultProductionApiUrl(),
  ]
    .filter((value): value is string => Boolean(value && value.trim()))
    .map((value) => value.trim().replace(/\/$/, ''))

  const unique = [...new Set(urls)]

  return unique.sort((a, b) => {
    const aInternal = isInternalBackendUrl(a)
    const bInternal = isInternalBackendUrl(b)
    if (aInternal === bInternal) return 0
    return aInternal ? 1 : -1
  })
}

export async function forwardOrderToBackend(
  payload: CreateOrderPayload,
  clientIp?: string,
  backendUrl?: string,
): Promise<{ ok: true; data: CreateOrderResult } | { ok: false; status: number; body: unknown }> {
  const candidates = backendUrl ? [backendUrl.replace(/\/$/, '')] : getBackendCandidates()

  if (candidates.length === 0) {
    throw new Error('No backend URL configured')
  }

  const resolvedIp = clientIp ?? payload.client_ip
  const requestBody: CreateOrderPayload = resolvedIp
    ? { ...payload, client_ip: resolvedIp }
    : payload

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (resolvedIp) {
    headers['X-Forwarded-For'] = resolvedIp
    headers['X-Real-IP'] = resolvedIp
  }

  let lastError: unknown

  for (const baseUrl of candidates) {
    try {
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        cache: 'no-store',
        signal: AbortSignal.timeout(20_000),
      })

      const responseBody = await res.json().catch(() => ({}))

      if (res.ok) {
        return { ok: true, data: responseBody as CreateOrderResult }
      }

      // Backend responded — return API error (DB, validation, geoip, etc.)
      return { ok: false, status: res.status, body: responseBody }
    } catch (error) {
      lastError = error
      console.error(`[orders] Backend unreachable at ${baseUrl}:`, error)
    }
  }

  throw lastError ?? new Error('All backend URLs failed')
}
