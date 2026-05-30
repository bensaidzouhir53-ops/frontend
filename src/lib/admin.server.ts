import { getBackendCandidates } from '@/lib/orders.server'

export async function forwardAdminRequest(
  backendPath: string,
  init: RequestInit & { authorization?: string | null },
): Promise<Response> {
  const headers: Record<string, string> = {}
  const auth = init.authorization?.trim()
  if (auth) headers['Authorization'] = auth

  const contentType =
    init.headers instanceof Headers
      ? init.headers.get('content-type')
      : (init.headers as Record<string, string> | undefined)?.['Content-Type']

  if (contentType) headers['Content-Type'] = contentType

  let lastError: unknown

  for (const baseUrl of getBackendCandidates()) {
    try {
      const res = await fetch(`${baseUrl}${backendPath}`, {
        method: init.method,
        headers,
        body: init.body,
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
      })

      const responseHeaders = new Headers()
      const backendContentType = res.headers.get('content-type')
      if (backendContentType) {
        responseHeaders.set('content-type', backendContentType)
      }

      if (backendContentType?.includes('text/csv')) {
        const csv = await res.text()
        return new Response(csv, { status: res.status, headers: responseHeaders })
      }

      const body = await res.text()
      return new Response(body, {
        status: res.status,
        headers: responseHeaders,
      })
    } catch (error) {
      lastError = error
      console.error(`[admin] Backend unreachable at ${baseUrl}${backendPath}:`, error)
    }
  }

  console.error('[admin] All backend URLs failed:', lastError)
  return Response.json(
    { detail: { message: 'تعذر الاتصال بخادم الإدارة. تحقق من تشغيل الـ backend.' } },
    { status: 503 },
  )
}

export function getAdminBackendPath(request: Request, pathSegments: string[]): string {
  const query = new URL(request.url).search
  return `/api/admin/${pathSegments.join('/')}${query}`
}

export function getAuthorizationHeader(request: Request): string | null {
  return request.headers.get('authorization')?.trim() || null
}
