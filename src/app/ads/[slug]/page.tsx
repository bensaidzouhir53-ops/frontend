import { notFound, redirect } from 'next/navigation'
import {
  buildRedirectDestination,
  fetchRedirectBySlug,
} from '@/lib/redirects.server'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdsRedirectPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const query = await searchParams
  const redirectLink = await fetchRedirectBySlug(slug)

  if (!redirectLink) {
    notFound()
  }

  redirect(buildRedirectDestination(redirectLink.target_path, query))
}
