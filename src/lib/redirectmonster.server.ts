import { getBackendCandidates } from '@/lib/orders.server'

type ForwardResult =
  | { ok: true; status: number; body: unknown }
  | { ok: false; status: number; body: unknown }
  | { ok: false; status: 503; body: { detail: string } }

export async function forwardRedirectMonsterRequest(
  path: string,
  init: RequestInit,
): Promise<ForwardResult> {
  const candidates = getBackendCandidates()
  let lastError: unknown

  for (const baseUrl of candidates) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        ...init,
        cache: 'no-store',
        signal: AbortSignal.timeout(20_000),
      })

      const body = await res.json().catch(() => ({}))

      if (res.ok) {
        return { ok: true, status: res.status, body }
      }

      return { ok: false, status: res.status, body }
    } catch (error) {
      lastError = error
      console.error(`[redirectmonster] Backend unreachable at ${baseUrl}${path}:`, error)
    }
  }

  console.error('[redirectmonster] All backend URLs failed:', lastError)

  return {
    ok: false,
    status: 503,
    body: { detail: 'Could not reach the backend API. Check backend service and env.' },
  }
}

export function getAuthorizationHeader(request: Request): string | null {
  const header = request.headers.get('authorization')?.trim()
  return header || null
}
