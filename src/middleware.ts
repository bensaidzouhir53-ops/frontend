import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LEGACY_HOSTS = new Set(['nasama.shop', 'www.nasama.shop'])

function getSiteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://nafaas.shop').replace(/\/$/, '')
}

/** Permanent redirect from the old storefront domain to nafaas.shop (keeps path + query). */
export function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase()
  if (!LEGACY_HOSTS.has(host)) {
    return NextResponse.next()
  }

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    getSiteOrigin(),
  )

  return NextResponse.redirect(destination, 301)
}

export const config = {
  matcher: '/:path*',
}
