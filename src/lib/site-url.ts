import type { NextRequest } from 'next/server'

export function getPublicSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://nafaas.shop').replace(/\/$/, '')
}

/** Public storefront origin — never use the Docker container hostname from request.url. */
export function getRequestPublicOrigin(request?: NextRequest): string {
  if (request) {
    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
    const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
    if (forwardedHost && !forwardedHost.includes('_') && forwardedHost.includes('.')) {
      const proto = forwardedProto || 'https'
      return `${proto}://${forwardedHost}`.replace(/\/$/, '')
    }
  }

  return getPublicSiteUrl()
}

/** Build an absolute redirect URL on the public domain (e.g. nafaas.shop). */
export function resolvePublicUrl(path: string, request?: NextRequest): URL {
  const base = getRequestPublicOrigin(request)
  const trimmed = path.trim()

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const absolute = new URL(trimmed)
      // Rewrite legacy or internal hosts to the public storefront domain.
      if (
        absolute.hostname.includes('_') ||
        !absolute.hostname.includes('.') ||
        absolute.hostname === 'localhost' ||
        absolute.hostname === '127.0.0.1'
      ) {
        return new URL(`${absolute.pathname}${absolute.search}`, base)
      }
      return absolute
    } catch {
      return new URL(trimmed.startsWith('/') ? trimmed : `/${trimmed}`, base)
    }
  }

  return new URL(trimmed.startsWith('/') ? trimmed : `/${trimmed}`, base)
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
