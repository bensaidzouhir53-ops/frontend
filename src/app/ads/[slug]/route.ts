import { NextRequest, NextResponse } from 'next/server'
import {
  buildRedirectDestination,
  fetchRedirectBySlug,
} from '@/lib/redirects.server'
import { resolvePublicUrl } from '@/lib/site-url'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  const redirectLink = await fetchRedirectBySlug(slug)

  if (!redirectLink) {
    return NextResponse.redirect(resolvePublicUrl('/ad-link-not-found', request))
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
  return NextResponse.redirect(resolvePublicUrl(destination, request), 307)
}
