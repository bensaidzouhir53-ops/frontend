import { getBackendCandidates } from '@/lib/orders.server'
import { normalizeRedirectTargetPath } from '@/lib/site-url'

export interface RedirectLink {
  slug: string
  target_path: string
}

async function fetchFromBackend(slug: string): Promise<RedirectLink | null> {
  const normalized = slug.trim().toLowerCase()
  if (!normalized) return null

  const candidates = getBackendCandidates()

  for (const base of candidates) {
    const url = `${base.replace(/\/$/, '')}/api/redirects/${encodeURIComponent(normalized)}`
    try {
      const res = await fetch(url, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      })
      if (res.status === 404) return null
      if (!res.ok) {
        console.error(`[redirects] ${res.status} from ${url}`)
        continue
      }
      return (await res.json()) as RedirectLink
    } catch (error) {
      console.error(`[redirects] Failed to reach ${url}:`, error)
    }
  }

  console.error(`[redirects] No backend returned slug "${normalized}" (tried: ${candidates.join(', ')})`)
  return null
}

export async function fetchRedirectBySlug(slug: string): Promise<RedirectLink | null> {
  return fetchFromBackend(slug)
}

export function buildRedirectDestination(
  targetPath: string,
  searchParams: Record<string, string | string[] | undefined>,
): string {
  const normalizedPath = normalizeRedirectTargetPath(targetPath)
  const qs = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      value.forEach((entry) => qs.append(key, entry))
    } else {
      qs.set(key, value)
    }
  }

  const queryString = qs.toString()
  return queryString ? `${normalizedPath}?${queryString}` : normalizedPath
}
