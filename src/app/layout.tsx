import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientLazyModals from '@/components/layout/ClientLazyModals'
import PixelInit from '@/components/shared/PixelInit'
import PixelScripts from '@/components/shared/PixelScripts'
import MetaPixel from '@/components/shared/MetaPixel'
import MetaPixelHeadScripts from '@/components/shared/MetaPixelHeadScripts'
import TikTokHeadScripts from '@/components/shared/TikTokHeadScripts'
import SnapHeadScripts from '@/components/shared/SnapHeadScripts'
import { filterMetaPixelIds, getCanonicalMetaPixelId } from '@/lib/meta-pixel'
import { fetchTrackingConfigFromBackend, getMetaPixelIds } from '@/lib/pixel-config.server'
import { getCanonicalSnapPixelId } from '@/lib/snap-pixel'
import { getPublicSiteUrl } from '@/lib/site-url'
import './globals.css'

// Storefront pages are built from static product data. Re-render (ISR) at most
// every 5 minutes so pages are served from cache instead of rendered per-request.
export const revalidate = 300

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
  const metaPixelIds = filterMetaPixelIds(getMetaPixelIds(pixelConfig))
  const metaPixelId = metaPixelIds[0] ?? getCanonicalMetaPixelId()
  const tiktokPixelId = pixelConfig.tiktok_pixel_id
  const snapPixelId = pixelConfig.snap_pixel_id ?? getCanonicalSnapPixelId()

  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <head>
        {metaPixelId ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__nasamaCapiEnabled=${pixelConfig.capi_enabled ? 'true' : 'false'}`,
              }}
            />
            <MetaPixelHeadScripts pixelId={metaPixelId} pixelIds={metaPixelIds} />
          </>
        ) : null}
        {tiktokPixelId ? <TikTokHeadScripts pixelId={tiktokPixelId} /> : null}
        {snapPixelId ? <SnapHeadScripts pixelId={snapPixelId} /> : null}
      </head>
      <body className="font-arabic bg-ivory text-charcoal antialiased">
        <MetaPixel pixelId={metaPixelId} pixelIds={metaPixelIds} />
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
