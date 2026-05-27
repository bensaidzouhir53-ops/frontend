import type { Metadata } from 'next'
import ThankYouView from './ThankYouView'

export const metadata: Metadata = {
  title: 'تم استلام طلبك بنجاح | نسمة',
  description: 'شكراً لطلبك من نسمة. سيتم التواصل معك خلال 10 دقائق لتأكيد التوصيل.',
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
