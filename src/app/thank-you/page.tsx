import type { Metadata } from 'next'
import ThankYouView from './ThankYouView'

export const metadata: Metadata = {
  title: 'تم طلبك — بنتصل خلال 10 دقايق | نَفَس',
  description: 'طلبك وصل. بنتصل فيك خلال 10 دقايق من 9 الصبح لين 9 الليل عشان نأكد العنوان، والشحن من 2 إلى 4 أيام عمل.',
  robots: { index: false, follow: false },
}

interface ThankYouPageProps {
  searchParams: Promise<{ order?: string; total?: string }>
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams
  return (
    <ThankYouView
      fallbackOrderNumber={params.order ?? ''}
      fallbackTotal={params.total ? Number(params.total) : null}
    />
  )
}
