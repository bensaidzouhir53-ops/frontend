import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import UpsellModal from '@/components/upsell/UpsellModal'
import PixelInit from '@/components/shared/PixelInit'
import PixelScripts from '@/components/shared/PixelScripts'
import { fetchTrackingConfigFromBackend } from '@/lib/pixel-config.server'
import './globals.css'

// Always load pixel config at request time (never bake empty config at Docker build)
export const dynamic = 'force-dynamic'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'نسمة | صيدلية التنفس الطبيعية في السعودية',
    template: '%s | نسمة',
  },
  description:
    'نسمة — صيدلية التنفس الطبيعية في السعودية. بخاخات وقطرات عشبية بمعايير صيدلانية لتنظيف الرئتين والجيوب الأنفية. مطابق لمواصفات هيئة الغذاء والدواء (SFDA). توصيل لجميع المناطق والدفع عند الاستلام.',
  keywords: [
    'صيدلية تنفس',
    'بخاخ تنظيف الرئتين',
    'قطرات الجيوب الأنفية',
    'علاج البلغم طبيعي',
    'صحة الرئة السعودية',
    'منتجات عشبية SFDA',
    'نسمة',
  ],
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: 'نسمة',
    title: 'نسمة | صيدلية التنفس الطبيعية في السعودية',
    description:
      'بخاخات وقطرات عشبية بمعايير صيدلانية لرئتين أنظف ونفس أخف. مطابقة لمعايير هيئة الغذاء والدواء (SFDA). الدفع عند الاستلام.',
    images: [{ url: '/images/nasama-logo.png', width: 512, height: 512, alt: 'شعار نسمة' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نسمة | صيدلية التنفس الطبيعية في السعودية',
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

  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-arabic bg-ivory text-charcoal antialiased">
        <PixelScripts config={pixelConfig} />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Cart drawer mounts CheckoutModal internally */}
        <CartDrawer />
        {/* Upsell modal — always mounted, controlled by store */}
        <UpsellModal />
        <PixelInit config={pixelConfig} />
      </body>
    </html>
  )
}
