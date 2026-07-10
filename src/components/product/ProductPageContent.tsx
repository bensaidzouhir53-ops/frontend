/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShieldCheck, Star, CheckCircle2, ChevronLeft, ArrowLeft, 
  Leaf, Zap, AlertTriangle, Wind, HeartPulse, XCircle, Wallet,
  BellRing, Users, Clock, Truck, HeartHandshake, CircleCheckBig, CircleX
} from 'lucide-react'
import type { Product } from '@/types'
import { getDefaultOffer } from '@/lib/products'
import OfferSelector from '@/components/product/OfferSelector'
import ProductDayProcessSection from '@/components/product/ProductDayProcessSection'
import ProductResultsSection from '@/components/product/ProductResultsSection'
import ProductBeforeAfterSection from '@/components/product/ProductBeforeAfterSection'
import ProductStatsSection from '@/components/product/ProductStatsSection'
import ProductTrustOriginSection from '@/components/product/ProductTrustOriginSection'
import ProductFacebookSocialProofSection from '@/components/product/ProductFacebookSocialProofSection'
import ProductAgitationSection from '@/components/product/ProductAgitationSection'
import ProductImageReviewsSection from '@/components/product/ProductImageReviewsSection'
import HowToUseStep from '@/components/product/HowToUseStep'
import ProductReviewsGrid from '@/components/product/ProductReviewsGrid'
import TrustBadges from '@/components/shared/TrustBadges'
import FAQAccordion from '@/components/shared/FAQAccordion'
import { DEFAULT_PRODUCT_REVIEWS, HERBAL_LUNG_SPRAY_REVIEWS, MOLIEN_DROPS_REVIEWS } from '@/lib/productReviews'
import { getProductPageSections, hasFullProductPage } from '@/lib/productPageSections'

interface ProductPageContentProps {
  product: Product
  crossSellProducts: Product[]
}

function isGifPath(path: string): boolean {
  return path.trim().toLowerCase().endsWith('.gif')
}

export default function ProductPageContent({
  product,
  crossSellProducts,
}: ProductPageContentProps) {
  const sections = getProductPageSections(product.slug)
  const isMolien = product.slug === 'molien-drops'
  const painIcons = [Wind, HeartPulse, AlertTriangle]
  const solutionIcons = [
    { icon: ShieldCheck, color: 'text-teal' },
    { icon: Zap, color: 'text-gold' },
    { icon: Wind, color: 'text-blue-500' },
    { icon: HeartPulse, color: 'text-red-400' },
  ]
  const molienHeroStats = [
    { value: '60', label: 'مل في العبوة' },
    { value: '2-3', label: 'قطرات بالجرعة' },
    { value: '100%', label: 'طبيعي' },
    { value: 'SFDA', label: 'مرخّص رسمياً' },
  ]
  const molienTrustBar = [
    { icon: CircleCheckBig, title: 'الدفع عند الاستلام', sub: 'بدون دفع أونلاين' },
    { icon: Truck, title: 'توصيل 2-4 أيام', sub: 'كل مدن المملكة' },
    { icon: HeartHandshake, title: 'ضمان 30 يوم', sub: 'استرجاع كامل' },
    { icon: ShieldCheck, title: 'مرخّص SFDA', sub: 'حلال · طبيعي' },
  ]
  const productReviews =
    sections.showImageReviews
      ? sections.reviewsKey === 'herbal-lung-spray'
        ? HERBAL_LUNG_SPRAY_REVIEWS
        : sections.reviewsKey === 'molien-drops'
          ? MOLIEN_DROPS_REVIEWS
          : DEFAULT_PRODUCT_REVIEWS
      : []

  const imageReviewsAfterTrust =
    sections.imageReviewsSection && sections.reviewsKey === 'molien-drops'
      ? MOLIEN_DROPS_REVIEWS
      : sections.imageReviewsSection && sections.reviewsKey === 'herbal-lung-spray'
        ? HERBAL_LUNG_SPRAY_REVIEWS
        : []

  return (
    <main dir="rtl" className="bg-ivory min-h-screen pb-24 lg:pb-0">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-sage/20 py-3 sticky top-[60px] lg:top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-charcoal/60 font-medium">
            <Link href="/" className="hover:text-teal transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-teal transition-colors">المنتجات</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-teal font-bold line-clamp-1 max-w-[200px]">{product.nameAr}</span>
          </nav>
        </div>
      </div>

      {/* ── 1. Hero Section (The Buy Box) ── */}
      <section
        className={
          isMolien
            ? 'relative overflow-hidden bg-gradient-to-br from-ivory via-surface-rose to-mist/80 py-8 sm:py-12 lg:py-20'
            : 'relative overflow-hidden bg-gradient-to-b from-mist/50 to-ivory pt-6 pb-12 md:py-16'
        }
      >
        {!isMolien && (
          <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/2 rounded-full bg-teal/5 opacity-60" />
        )}
        <div className="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div
            className={
              isMolien
                ? 'grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12'
                : 'flex flex-col items-start gap-8 lg:flex-row lg:gap-16'
            }
          >
            {/* Image */}
            <div
              className={
                isMolien
                  ? 'order-1 w-full lg:order-1'
                  : 'order-1 w-full lg:sticky lg:top-32 lg:order-2 lg:w-1/2'
              }
            >
              <div
                className={
                  isMolien
                    ? 'relative mx-auto w-full max-w-2xl lg:max-w-none'
                    : 'relative mx-auto w-full max-w-md lg:max-w-xl'
                }
              >
                {isMolien && (
                  <div
                    className="absolute inset-0 scale-150 rounded-full bg-teal/10 blur-3xl"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={
                    isMolien
                      ? 'relative aspect-[4/5] min-h-[420px] overflow-hidden rounded-3xl border border-white/40 bg-white shadow-2xl sm:min-h-[520px] lg:min-h-[640px]'
                      : 'relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white bg-gray-100 shadow-2xl shadow-teal/10'
                  }
                >
                  <Image
                    src={product.image}
                    alt={product.nameAr}
                    fill
                    priority
                    sizes={
                      isMolien
                        ? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw'
                        : '(max-width: 1024px) 100vw, 50vw'
                    }
                    className={isMolien ? 'object-contain p-1 sm:p-2' : 'object-cover'}
                  />
                </div>

                {isMolien && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {molienHeroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-warm-border/70 bg-white/95 p-2.5 text-center shadow-sm backdrop-blur sm:p-3"
                      >
                        <p className="text-base font-extrabold text-teal">{stat.value}</p>
                        <p className="line-clamp-1 text-[10px] font-medium text-charcoal/55">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div
              className={
                isMolien
                  ? 'order-2 w-full text-right lg:order-2'
                  : 'order-2 w-full text-right lg:order-1 lg:w-1/2'
              }
            >
              {!isMolien && (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 shadow-sm">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-xs font-bold tracking-wide text-red-700">
                      المنتج الأكثر طلباً في السعودية اليوم 🔥
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-2 shadow-sm">
                    <Users className="h-4 w-4 text-teal" />
                    <span className="text-xs font-bold tracking-wide text-teal-dark">
                      تم شراء هذا المنتج أكثر من 145 مرة اليوم
                    </span>
                  </div>
                </div>
              )}

              {isMolien && (
                <p className="mb-3 text-sm font-bold text-teal">
                  قطرات مرخّصة من هيئة الغذاء والدواء (SFDA)
                </p>
              )}

              <h1
                className={
                  isMolien
                    ? 'mb-4 text-[28px] font-extrabold leading-[1.15] tracking-tight text-charcoal text-balance sm:text-4xl lg:text-5xl'
                    : 'mb-4 text-3xl font-extrabold leading-[1.3] tracking-tight text-charcoal md:text-5xl'
                }
              >
                {product.nameAr}
              </h1>

              {isMolien && (
                <p className="mb-5 border-r-2 border-gold pr-4 text-base font-medium leading-relaxed text-charcoal/85 sm:text-lg lg:text-xl">
                  {product.descAr}
                </p>
              )}

              <div
                className={
                  isMolien
                    ? 'mb-5 flex flex-wrap items-center gap-2'
                    : 'mb-6 ml-auto flex w-fit flex-wrap items-center justify-end gap-3 rounded-xl border border-sage/20 bg-white p-3'
                }
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500 sm:h-5 sm:w-5" />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-teal sm:text-base">4.9</span>
                <span className="text-sm font-bold text-charcoal/60">
                  (أكثر من 2,700 تقييم · مؤكدة)
                </span>
                {isMolien && (
                  <span className="text-sm font-bold text-charcoal/70">· من 189 ر.س / عبوة</span>
                )}
              </div>

              {!isMolien && (
                <p className="mb-8 text-lg font-medium leading-relaxed text-charcoal/80">
                  {product.descAr}
                </p>
              )}

              {/* Offer Selector */}
              <div
                id="offer"
                className={
                  isMolien
                    ? 'overflow-hidden'
                    : 'overflow-hidden rounded-[1.75rem] border border-teal/10 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[2.5rem] sm:p-6 md:p-8'
                }
              >
                {!isMolien && (
                  <h3 className="mb-4 text-center text-lg font-extrabold leading-snug text-charcoal sm:mb-6 sm:text-xl">
                    اختر العرض المناسب لك (كمية محدودة)
                  </h3>
                )}
                <OfferSelector product={product} />
              </div>

              {/* Delivery & Guarantee Trust Block — non-molien only (molien uses dark bar) */}
              {!isMolien && (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="group flex flex-col gap-2 rounded-2xl border border-sage/30 bg-gradient-to-b from-white to-mist/30 p-4 shadow-sm transition-colors hover:border-gold/50">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-extrabold text-charcoal">ضمان ذهبي 30 يوم</p>
                    </div>
                    <p className="text-[11px] font-medium leading-relaxed text-charcoal/60">
                      ما ناسبك؟ نرجع لك فلوسك بدون أسئلة معقدة.
                    </p>
                  </div>

                  <div className="group flex flex-col gap-2 rounded-2xl border border-sage/30 bg-gradient-to-b from-white to-mist/30 p-4 shadow-sm transition-colors hover:border-teal/50">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                        <Wallet className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-extrabold text-charcoal">الدفع عند الاستلام</p>
                    </div>
                    <p className="text-[11px] font-medium leading-relaxed text-charcoal/60">
                      تطلب الآن، ولا تدفع ولا ريال لين يوصلك المندوب وتستلم طلبك بيدك.
                    </p>
                  </div>

                  <div className="group flex flex-col gap-2 rounded-2xl border border-sage/30 bg-gradient-to-b from-white to-mist/30 p-4 shadow-sm transition-colors hover:border-blue-500/50">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <Clock className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-extrabold text-charcoal">تأكيد سريع للطلب</p>
                    </div>
                    <p className="text-[11px] font-medium leading-relaxed text-charcoal/60">
                      بمجرد تسجيل طلبك، راح نتواصل معك لتأكيد الشحن فوراً عشان ما تتأخر عليك النتيجة.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark trust bar (Nama-style, molien only) ── */}
      {isMolien && (
        <section className="bg-charcoal text-white">
          <div className="mx-auto grid max-w-container grid-cols-2 gap-3 px-4 py-5 sm:gap-5 sm:px-6 sm:py-6 lg:grid-cols-4 lg:px-8">
            {molienTrustBar.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/40 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 text-right">
                    <p className="text-xs font-extrabold sm:text-sm">{item.title}</p>
                    <p className="text-[10px] text-white/60 sm:text-xs">{item.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── 2. Pain Agitation Section (Text Right, Image Left) ── */}
      <section className={`overflow-hidden py-14 md:py-24 ${isMolien ? 'bg-white' : 'bg-white'}`}>
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="order-2 w-full text-right lg:order-1 lg:w-1/2">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
                <BellRing className="h-5 w-5" />
                {sections.painAlert}
              </div>
              <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-charcoal md:text-4xl">
                {sections.painTitle}
              </h2>
              <p className="mb-8 text-lg font-medium leading-relaxed text-charcoal/70">
                {sections.painBody}
              </p>

              {isMolien ? (
                <div className="space-y-4">
                  {sections.painPoints.map((item, i) => {
                    const solution = sections.solutionFeatures[i]
                    return (
                      <div
                        key={i}
                        className="overflow-hidden rounded-2xl border border-warm-border"
                      >
                        <div className="flex items-start gap-3 bg-white p-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
                            <CircleX className="h-5 w-5 text-red-500" />
                          </div>
                          <p className="text-[15px] font-bold leading-relaxed text-charcoal/80">
                            {item.text}
                          </p>
                        </div>
                        {solution && (
                          <div className="flex items-start gap-3 border-t border-teal/10 bg-teal/5 p-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/15">
                              <CircleCheckBig className="h-5 w-5 text-teal" />
                            </div>
                            <p className="text-[15px] font-bold leading-relaxed text-teal-dark">
                              {solution.title}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="mb-8 space-y-5">
                  {sections.painPoints.map((item, i) => {
                    const Icon = painIcons[i] ?? AlertTriangle
                    return (
                      <div
                        key={i}
                        className="group flex items-center justify-end gap-4 rounded-2xl border border-sage/30 bg-mist/40 p-4 transition-colors hover:border-red-200 hover:bg-red-50/50"
                      >
                        <span className="text-[17px] font-bold text-charcoal/80 transition-colors group-hover:text-charcoal">
                          {item.text}
                        </span>
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-sage/20 bg-white shadow-sm transition-colors group-hover:border-red-200">
                          <Icon className="h-5 w-5 text-red-400 group-hover:text-red-500" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="relative order-1 w-full lg:order-2 lg:w-1/2">
              {!isMolien && <div className="absolute inset-0 rounded-full bg-red-500/10 opacity-40" />}
              <div
                className={
                  isMolien
                    ? 'relative aspect-[4/5] overflow-hidden rounded-[2rem] border-8 border-white bg-gray-100 shadow-2xl lg:min-h-[420px]'
                    : 'relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-sage/20 bg-gray-100 shadow-2xl'
                }
              >
                {sections.painGif && isGifPath(sections.painGif) ? (
                  <img
                    key={sections.painGif}
                    src={sections.painGif}
                    alt={sections.painImageAlt}
                    className="h-full w-full object-cover grayscale-[30%] contrast-125"
                    loading="eager"
                    decoding="async"
                  />
                ) : sections.painVideo ? (
                  <video
                    src={`${sections.painVideo}#t=0.001`}
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    poster={sections.painImage}
                    className="h-full w-full object-cover grayscale-[30%] contrast-125"
                    aria-label={sections.painImageAlt}
                  />
                ) : (
                  <img
                    src={sections.painImage}
                    alt={sections.painImageAlt}
                    className="h-full w-full object-cover grayscale-[30%] contrast-125"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-right">
                  <p className="mb-1 text-xl font-extrabold text-white drop-shadow-md shadow-black">
                    {sections.painOverlay}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sections.agitation && <ProductAgitationSection content={sections.agitation} />}

      {/* ── 3. Solution / Epiphany (Image Right, Text Left) ── */}
      <section className={`py-14 md:py-24 ${isMolien ? 'bg-surface-rose' : 'bg-mist/30'}`}>
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="order-1 w-full lg:w-1/2">
              <div
                className={
                  isMolien
                    ? 'relative aspect-[4/5] overflow-hidden rounded-[2rem] border-8 border-white bg-gray-100 shadow-2xl lg:min-h-[420px]'
                    : 'relative aspect-square overflow-hidden rounded-[2rem] border border-sage/20 bg-gray-100 shadow-xl'
                }
              >
                <img
                  src={sections.solutionImage}
                  alt={sections.solutionImageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="order-2 w-full text-right lg:w-1/2 lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-5 py-2 text-sm font-bold text-teal shadow-sm lg:flex-row-reverse">
                <Leaf className="h-4 w-4" />
                {sections.solutionBadge}
              </div>
              <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-charcoal md:text-4xl">
                {sections.solutionTitle}
              </h2>
              <p className="mb-8 text-lg font-medium leading-relaxed text-charcoal/70">
                {sections.solutionBody}
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sections.solutionFeatures.map((feature, i) => {
                  const { icon: FeatureIcon, color } = solutionIcons[i] ?? solutionIcons[0]
                  return (
                    <div
                      key={i}
                      className={`group flex items-center justify-between gap-3 border p-4 shadow-sm transition-all hover:shadow-md lg:flex-row-reverse ${
                        isMolien
                          ? 'rounded-2xl border-warm-border bg-white hover:border-teal/30'
                          : 'rounded-xl border-sage/20 bg-white hover:border-teal/30'
                      }`}
                    >
                      <span className="w-full text-right text-sm font-bold text-charcoal transition-colors group-hover:text-teal lg:text-left">
                        {feature.title}
                      </span>
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-mist transition-transform group-hover:scale-110">
                        <FeatureIcon className={`h-5 w-5 ${color}`} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Mechanism / How it works (Text Right, Image Left) ── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-teal-light/10 rounded-full opacity-50 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            <div className="w-full lg:w-1/2 text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-charcoal/50 mb-4 bg-gray-100 px-4 py-1.5 rounded-full font-bold text-sm tracking-widest uppercase">
                آلية العمل
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-10 leading-tight">
                {sections.mechanismTitle}
              </h2>
              
              <div className="relative space-y-8">
                {sections.mechanismSteps.map((item) => (
                  <div key={item.step} className="relative flex gap-6 justify-start group">
                    {/* Glowing Step Number */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="absolute inset-0 bg-teal rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-teal-dark to-teal text-white font-extrabold flex items-center justify-center text-xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                    </div>
                    <div className="text-right pt-2">
                      <h4 className="font-extrabold text-xl text-charcoal mb-2 group-hover:text-teal transition-colors">{item.title}</h4>
                      <p className="text-charcoal/70 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 w-full lg:order-2 lg:w-1/2">
              <div
                className={
                  isMolien
                    ? 'relative aspect-[4/5] overflow-hidden rounded-[2rem] border-8 border-white bg-gradient-to-b from-slate-100 to-slate-200 shadow-2xl lg:min-h-[420px]'
                    : 'relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-sage/20 bg-gradient-to-b from-slate-100 to-slate-200 shadow-2xl md:aspect-square lg:aspect-[4/5]'
                }
              >
                <img
                  src={sections.mechanismImage}
                  alt={sections.mechanismImageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4.1 Results / Stats (molien) ── */}
      {sections.statsSection && (
        <ProductStatsSection content={sections.statsSection} />
      )}

      {/* ── 4.5 Ingredients Section ── */}
      {product.detailedIngredients && product.detailedIngredients.length > 0 && (
        <section className={`relative overflow-hidden py-14 md:py-24 ${isMolien ? 'bg-surface-rose' : 'bg-mist/10'}`}>
          <div className="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="order-1 w-full lg:order-2 lg:w-5/12">
                <div
                  className={
                    isMolien
                      ? 'group relative aspect-[4/5] overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl'
                      : 'group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border border-sage/20 bg-white shadow-2xl'
                  }
                >
                  <img
                    src={sections.ingredientsMainImage}
                    alt={sections.ingredientsMainImageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-60" />
                </div>
              </div>

              <div className="order-2 w-full text-right lg:order-1 lg:w-7/12">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-5 py-2 text-sm font-bold text-teal shadow-sm">
                  <Leaf className="h-4 w-4" />
                  مكونات طبيعية 100%
                </div>
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
                  سر التركيبة العشبية الفعالة
                </h2>
                <p className="mb-10 text-lg font-medium leading-relaxed text-charcoal/70">
                  جمعنا لك أقوى الأعشاب الطبيعية اللي تشتغل مع بعض عشان تنظف صدرك وترجع لك تنفسك الطبيعي والمريح.
                </p>

                <div
                  className={
                    isMolien
                      ? 'grid grid-cols-1 gap-4 sm:grid-cols-2'
                      : 'grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2'
                  }
                >
                  {product.detailedIngredients.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className={
                        isMolien
                          ? 'group flex gap-4 rounded-2xl border border-warm-border bg-white p-4 shadow-sm'
                          : 'group flex items-start gap-4'
                      }
                    >
                      <div
                        className={
                          isMolien
                            ? 'h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-warm-border bg-surface-rose'
                            : 'h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-mist shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg'
                        }
                      >
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="mb-1.5 text-lg font-extrabold text-charcoal transition-colors group-hover:text-teal">
                          {ingredient.name}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-charcoal/70">
                          {ingredient.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4.55 Before / After Comparison ── */}
      {sections.beforeAfterComparison && (
        <ProductBeforeAfterSection content={sections.beforeAfterComparison} />
      )}

      {sections.facebookSocialProof && (
        <ProductFacebookSocialProofSection content={sections.facebookSocialProof} />
      )}

      {/* ── 4.6 Twenty-Eight Day Process ── */}
      {hasFullProductPage(product.slug) && (
        <ProductDayProcessSection content={sections.dayProcess} />
      )}

      {sections.results && <ProductResultsSection content={sections.results} />}

      {/* ── 4.75 How to Use Section ── */}
      {hasFullProductPage(product.slug) && (
        <section className={`relative overflow-hidden py-14 md:py-24 ${isMolien ? 'bg-surface-rose' : 'bg-white'}`}>
          <div className="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-5 py-2 text-sm font-bold text-teal shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
                طريقة الاستخدام
              </div>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
                {sections.howToUseTitle}
              </h2>
              <p className="mx-auto max-w-2xl text-lg font-medium text-charcoal/70">
                {sections.howToUseSubtitle}
              </p>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 md:gap-8 ${
                sections.howToUseSteps.length === 2 ? 'mx-auto max-w-4xl md:grid-cols-2' : 'md:grid-cols-3'
              }`}
            >
              {sections.howToUseSteps.map((item) => (
                <HowToUseStep key={item.step} {...item} variant={isMolien ? 'nama' : 'default'} />
              ))}
            </div>

            {isMolien && (
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: '60', label: 'مل في العبوة' },
                  { value: '2-3', label: 'قطرات بالجرعة' },
                  { value: '2×', label: 'يومياً' },
                  { value: '<60', label: 'ثانية باليوم' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-warm-border bg-white p-4 text-center shadow-sm"
                  >
                    <p className="text-2xl font-extrabold text-teal">{stat.value}</p>
                    <p className="text-xs font-medium text-charcoal/55">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 4.8 Trust & Country of Origin ── */}
      {sections.trustOrigin && (
        <ProductTrustOriginSection content={sections.trustOrigin} />
      )}

      {/* ── 4.85 Customer image reviews (molien) ── */}
      {sections.imageReviewsSection && imageReviewsAfterTrust.length > 0 && (
        <ProductImageReviewsSection
          content={sections.imageReviewsSection}
          reviews={imageReviewsAfterTrust}
        />
      )}

      {/* ── 5. Comparison Table (Us vs. Them) ── */}
      <section className={`py-14 md:py-24 ${isMolien ? 'bg-white' : 'bg-mist/30'}`}>
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isMolien ? 'max-w-container' : 'max-w-4xl'} text-center`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-5 py-2 text-sm font-bold text-teal shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            ليش نفس هي خيارك الصح؟
          </div>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
            مقارنة سريعة توضح لك الفرق
          </h2>

          {isMolien ? (
            <>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {sections.comparisonRows.slice(0, 4).map((row, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-warm-border bg-white p-5 text-right shadow-sm"
                  >
                    <p className="mb-3 text-sm font-extrabold text-charcoal">{row.feature}</p>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2 text-sm font-medium text-charcoal/55">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <span>{row.them}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm font-bold text-teal-dark">
                        <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        <span>{row.us}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-teal-dark to-charcoal p-6 text-right text-white shadow-xl sm:p-8">
                <div
                  className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full border-4 border-gold/30"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-10 -right-6 h-40 w-40 rounded-full border-4 border-gold/20"
                  aria-hidden="true"
                />
                <p className="relative mb-2 text-xl font-extrabold text-gold sm:text-2xl">
                  {product.cardTitleAr}
                </p>
                <p className="relative text-sm font-medium text-white/80 sm:text-base">
                  {sections.comparisonRows[4]?.us ?? 'ضمان 30 يوم · مرخّص SFDA · طبيعي 100%'}
                </p>
              </div>
            </>
          ) : (
            <div className="relative overflow-hidden rounded-[2.5rem] border border-sage/20 bg-white shadow-2xl">
              <div className="grid grid-cols-3 bg-charcoal text-sm font-bold text-white md:text-lg">
                <div className="flex items-center justify-center border-l border-white/10 p-4 text-center md:p-6">
                  وجه المقارنة
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-l border-white/10 bg-gradient-to-b from-teal-dark to-teal p-4 text-center text-white shadow-inner md:p-6">
                  <span className="mb-1 text-xl md:text-2xl">🌿</span>
                  <span>روتين نفس</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 bg-gray-900 p-4 text-center text-white/60 md:p-6">
                  <span className="mb-1 text-xl opacity-50 grayscale md:text-2xl">💊</span>
                  <span>البدائل العادية</span>
                </div>
              </div>

              {sections.comparisonRows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 border-b border-sage/10 text-sm transition-colors hover:bg-mist/50 md:text-base ${
                    i % 2 === 0 ? 'bg-white' : 'bg-mist/20'
                  }`}
                >
                  <div className="flex items-center justify-center border-l border-sage/20 p-4 text-center font-extrabold text-charcoal/80 md:p-6">
                    {row.feature}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 border-l border-sage/20 bg-teal/5 p-4 text-center font-bold text-teal-dark md:p-6">
                    <CheckCircle2 className="h-6 w-6 text-teal drop-shadow-sm" />
                    {row.us}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 bg-gray-50/50 p-4 text-center font-medium text-charcoal/60 md:p-6">
                    <XCircle className="h-5 w-5 text-red-400" />
                    {row.them}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. SFDA & Quality Guarantee ── */}
      <section className="py-16 bg-white border-y border-sage/20 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gold/10 rounded-full opacity-40 -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-r from-teal-dark to-charcoal rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-white relative z-10">
            <div className="w-full md:w-2/3 text-right order-2 md:order-1">
              <h2 className="text-3xl font-extrabold mb-4 text-gold">
                أمانك خط أحمر: مطابق لمواصفات هيئة الغذاء والدواء (SFDA)
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                صحتك ما فيها مجازفة. جميع منتجات نفس تمر باختبارات جودة صارمة لتكون مطابقة تماماً للمواصفات والمقاييس السعودية (SFDA). نحن نضمن لك منتجاً نقيّاً، فعّالاً، وخالياً من أي إضافات ضارة.
              </p>
              <div className="flex flex-wrap gap-4 justify-end">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span className="font-bold text-sm">مكونات معتمدة</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-sm">تغليف طبي آمن</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2">
              <div className="relative w-44 md:w-56 lg:w-64">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-110" aria-hidden="true" />
                <Image
                  src="/images/sfda-approved.png"
                  alt="معتمد من الهيئة العامة للغذاء والدواء SFDA"
                  width={512}
                  height={640}
                  className="relative w-full h-auto object-contain drop-shadow-2xl"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6.1 SFDA Establishment Certificate ── */}
      {sections.sfdaCertificateSection && (
        <section className={`py-14 md:py-16 ${isMolien ? 'bg-surface-rose' : 'bg-mist/10'}`}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-5 py-2 text-sm font-bold text-teal shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                شهادة تسجيل SFDA
              </div>
              <h2 className="mb-3 text-3xl font-extrabold text-charcoal md:text-4xl">
                {sections.sfdaCertificateSection.title}
              </h2>
              <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-charcoal/70">
                {sections.sfdaCertificateSection.subtitle}
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-warm-border bg-white p-4 shadow-xl md:p-6">
              <img
                src={sections.sfdaCertificateSection.image}
                alt={sections.sfdaCertificateSection.imageAlt}
                className="mx-auto h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FAQ ── */}
      <section className={`border-y border-sage/20 py-14 md:py-16 ${isMolien ? 'bg-surface-rose' : 'bg-white'}`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-charcoal">أسئلة شائعة عن المنتج</h2>
          </div>
          <div
            className={
              isMolien
                ? 'rounded-3xl border border-warm-border bg-white p-4 shadow-sm sm:p-6'
                : 'rounded-[2rem] border border-sage/20 bg-white p-6 shadow-sm md:p-8'
            }
          >
            <FAQAccordion items={product.faqs} />
          </div>
        </div>
      </section>

      {/* ── 7. Trust Badges ── */}
      <section className="py-10 bg-ivory border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* ── 8. Cross-sell ── */}
      {crossSellProducts.length > 0 && (
        <section className="py-16 bg-mist/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-charcoal mb-3">كمل روتينك لنتائج أفضل</h2>
              <p className="text-charcoal/60 max-w-xl mx-auto">
                منتجات تكمّل بعضها عشان تحصل على تنفس أريح ونتيجة أوضح
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              {crossSellProducts.map((p) => {
                const offer = getDefaultOffer(p.slug)
                return (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-sage/20 hover:border-teal/30 hover:shadow-xl transition-all shadow-sm"
                  >
                    <div className="relative aspect-square bg-mist border-b border-sage/10">
                      <Image
                        src={p.image}
                        alt={p.nameAr}
                        fill
                        sizes="(max-width: 768px) 45vw, 280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                  </div>
                    <div className="flex flex-col flex-1 p-4 md:p-5 text-center">
                      <h3 className="font-extrabold text-charcoal text-sm md:text-base group-hover:text-teal transition-colors line-clamp-3 mb-3 min-h-[3.5rem] md:min-h-[4rem]">
                      {p.nameAr}
                    </h3>
                      <p className="text-teal font-extrabold text-sm md:text-base mb-4">
                        من {offer.price} ريال
                      </p>
                      <span className="mt-auto inline-flex items-center justify-center gap-1 rounded-xl bg-teal/10 group-hover:bg-teal group-hover:text-white text-teal font-extrabold text-sm py-2.5 px-4 transition-colors">
                        عرض المنتج
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </span>
                  </div>
                </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-sage/30 p-4 shadow-[0_-10px_40px_rgba(15,118,110,0.15)]" dir="rtl">
        <div className="max-w-md mx-auto">
          <Link
            href="#offer"
            className="w-full bg-gradient-to-r from-teal-dark to-teal text-white font-extrabold py-3.5 px-4 rounded-xl text-center shadow-lg shadow-teal/30 flex items-center justify-center gap-2 active:scale-95 transition-transform "
          >
            اطلب الآن والدفع عند الاستلام 📦
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
