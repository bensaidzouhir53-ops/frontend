import { NextRequest, NextResponse } from 'next/server'
import {
  buildRedirectDestination,
  fetchRedirectBySlug,
} from '@/lib/redirects.server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  const redirectLink = await fetchRedirectBySlug(slug)

  if (!redirectLink) {
    return NextResponse.redirect(new URL('/ad-link-not-found', request.url))
  }

  const query: Record<string, string | string[] | undefined> = {}
  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    const existing = query[key]
    if (existing === undefined) {
      query[key] = value
    } else if (Array.isArray(existing)) {
      existing.push(value)
    } else {
      query[key] = [existing, value]
    }
  }

  const destination = buildRedirectDestination(redirectLink.target_path, query)
  return NextResponse.redirect(new URL(destination, request.url), 307)
}
