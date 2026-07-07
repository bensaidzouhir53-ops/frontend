import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientLazyModals from '@/components/layout/ClientLazyModals'
import PixelInit from '@/components/shared/PixelInit'
import PixelScripts from '@/components/shared/PixelScripts'
import MetaPixel from '@/components/shared/MetaPixel'
import { fetchTrackingConfigFromBackend, getMetaPixelIds } from '@/lib/pixel-config.server'
import { getPublicSiteUrl } from '@/lib/site-url'
import './globals.css'

export const dynamic = 'force-dynamic'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
})

const siteUrl = getPublicSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'نَفَس | بيت الأعشاب في السعودية',
    template: '%s | نَفَس',
  },
    description:
      'نَفَس — بيت الأعشاب في السعودية. بخاخات وقطرات عشبية بمعايير صيدلانية لتنظيف الرئتين والجيوب الأنفية. مطابق لمواصفات هيئة الغذاء والدواء (SFDA). توصيل لجميع المناطق والدفع عند الاستلام.',
  keywords: [
    'صيدلية تنفس',
    'بخاخ تنظيف الرئتين',
    'قطرات الجيوب الأنفية',
    'علاج البلغم طبيعي',
    'صحة الرئة السعودية',
    'منتجات عشبية SFDA',
    'نَفَس',
  ],
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'نَفَس',
    title: 'نَفَس | بيت الأعشاب في السعودية',
    description:
      'بخاخات وقطرات عشبية بمعايير صيدلانية لرئتين أنظف ونفس أخف. مطابقة لمعايير هيئة الغذاء والدواء (SFDA). الدفع عند الاستلام.',
    images: [{ url: '/images/nasama-logo.png', width: 512, height: 512, alt: 'شعار نَفَس' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نَفَس | بيت الأعشاب في السعودية',
    description: 'بخاخات وقطرات عشبية بمعايير صيدلانية لرئتين أنظف ونفس أخف.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/nasama-logo.png',
    apple: '/images/nasama-logo.png',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pixelConfig = await fetchTrackingConfigFromBackend()
  const metaPixelIds = getMetaPixelIds(pixelConfig)

  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-arabic bg-ivory text-charcoal antialiased">
        <MetaPixel enabled={pixelConfig.enabled} pixelIds={metaPixelIds} />
        <PixelScripts config={pixelConfig} />
        <Header />
        <main>{children}</main>
        <Footer />
        <ClientLazyModals />
        <PixelInit config={pixelConfig} />
      </body>
    </html>
  )
}
