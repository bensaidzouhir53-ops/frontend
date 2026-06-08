export function getPublicSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://nafaas.shop').replace(/\/$/, '')
}

/** Strip legacy absolute URLs so redirects always use on-site paths. */
export function normalizeRedirectTargetPath(targetPath: string): string {
  const trimmed = targetPath.trim()
  if (!trimmed) return '/'

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const { pathname, search } = new URL(trimmed)
      const path = pathname || '/'
      return search ? `${path}${search}` : path
    } catch {
      return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
    }
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}
