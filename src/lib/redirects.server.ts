import { getBackendCandidates } from '@/lib/orders.server'

export interface RedirectLink {
  slug: string
  target_path: string
}

async function fetchFromBackend(slug: string): Promise<RedirectLink | null> {
  const normalized = slug.trim().toLowerCase()
  if (!normalized) return null

  for (const base of getBackendCandidates()) {
    try {
      const res = await fetch(`${base.replace(/\/$/, '')}/api/redirects/${encodeURIComponent(normalized)}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      })
      if (res.status === 404) return null
      if (!res.ok) continue
      return (await res.json()) as RedirectLink
    } catch {
      // try next backend URL
    }
  }

  return null
}

export async function fetchRedirectBySlug(slug: string): Promise<RedirectLink | null> {
  return fetchFromBackend(slug)
}

export function buildRedirectDestination(
  targetPath: string,
  searchParams: Record<string, string | string[] | undefined>,
): string {
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
  return queryString ? `${targetPath}?${queryString}` : targetPath
}
