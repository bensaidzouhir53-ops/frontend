/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShieldCheck, Star, CheckCircle2, ChevronLeft, ArrowLeft, 
  Leaf, Zap, AlertTriangle, Wind, HeartPulse, XCircle, Wallet,
  BellRing, Users, Clock
} from 'lucide-react'
import type { Product } from '@/types'
import { getDefaultOffer } from '@/lib/products'
import OfferSelector from '@/components/product/OfferSelector'
import ProductDayProcessSection from '@/components/product/ProductDayProcessSection'
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

export default function ProductPageContent({
  product,
  crossSellProducts,
}: ProductPageContentProps) {
  const sections = getProductPageSections(product.slug)
  const painIcons = [Wind, HeartPulse, AlertTriangle]
  const solutionIcons = [
    { icon: ShieldCheck, color: 'text-teal' },
    { icon: Zap, color: 'text-gold' },
    { icon: Wind, color: 'text-blue-500' },
    { icon: HeartPulse, color: 'text-red-400' },
  ]
  const productReviews =
    sections.showImageReviews
      ? sections.reviewsKey === 'herbal-lung-spray'
        ? HERBAL_LUNG_SPRAY_REVIEWS
        : sections.reviewsKey === 'molien-drops'
          ? MOLIEN_DROPS_REVIEWS
          : DEFAULT_PRODUCT_REVIEWS
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
      <section className="pt-6 pb-12 md:py-16 bg-gradient-to-b from-mist/50 to-ivory relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full opacity-60 -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Image (Left visually, Right in DOM for RTL) */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32 order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 border-4 border-white shadow-2xl shadow-teal/10">
                <Image
                  src={product.image}
                  alt={product.nameAr}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content (Right visually, Left in DOM for RTL) */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 text-right">
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full shadow-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-xs font-bold text-red-700 tracking-wide">المنتج الأكثر طلباً في السعودية اليوم 🔥</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full shadow-sm">
                  <Users className="w-4 h-4 text-teal" />
                  <span className="text-xs font-bold text-teal-dark tracking-wide">تم شراء هذا المنتج أكثر من 145 مرة اليوم</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-charcoal mb-4 leading-[1.3] tracking-tight">
                {product.nameAr}
              </h1>

              <div className="flex flex-wrap items-center gap-3 justify-end mb-6 bg-white rounded-xl p-3 border border-sage/20 w-fit ml-auto">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-base font-extrabold text-charcoal">4.9/5</span>
                <span className="text-sm font-bold text-teal-dark">(أكثر من 2,700 تقييم)</span>
              </div>

              <p className="text-charcoal/80 text-lg leading-relaxed mb-8 font-medium">
                {product.descAr}
              </p>

              {/* Offer Selector */}
              <div id="offer" className="overflow-hidden rounded-[1.75rem] border border-teal/10 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[2.5rem] sm:p-6 md:p-8">
                <h3 className="mb-4 text-center text-lg font-extrabold leading-snug text-charcoal sm:mb-6 sm:text-xl">
                  اختر العرض المناسب لك (كمية محدودة)
                </h3>
                <OfferSelector product={product} />
              </div>

              {/* Delivery & Guarantee Trust Block */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-2 bg-gradient-to-b from-white to-mist/30 rounded-2xl p-4 border border-sage/30 shadow-sm hover:border-gold/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="font-extrabold text-charcoal text-sm">ضمان ذهبي 30 يوم</p>
                  </div>
                  <p className="text-[11px] text-charcoal/60 leading-relaxed font-medium">ما ناسبك؟ نرجع لك فلوسك بدون أسئلة معقدة.</p>
                </div>
                
                <div className="flex flex-col gap-2 bg-gradient-to-b from-white to-mist/30 rounded-2xl p-4 border border-sage/30 shadow-sm hover:border-teal/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0 text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <p className="font-extrabold text-charcoal text-sm">الدفع عند الاستلام</p>
                  </div>
                  <p className="text-[11px] text-charcoal/60 leading-relaxed font-medium">تطلب الآن، ولا تدفع ولا ريال لين يوصلك المندوب وتستلم طلبك بيدك.</p>
                </div>

                <div className="flex flex-col gap-2 bg-gradient-to-b from-white to-mist/30 rounded-2xl p-4 border border-sage/30 shadow-sm hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="font-extrabold text-charcoal text-sm">تأكيد سريع للطلب</p>
                  </div>
                  <p className="text-[11px] text-charcoal/60 leading-relaxed font-medium">بمجرد تسجيل طلبك، راح نتواصل معك لتأكيد الشحن فوراً عشان ما تتأخر عليك النتيجة.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── 2. Pain Agitation Section (Text Right, Image Left) ── */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 text-white mb-5 bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 rounded-full font-extrabold text-sm shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
                <BellRing className="w-5 h-5 " />
                {sections.painAlert}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6 leading-tight tracking-tight">
                {sections.painTitle}
              </h2>
              <p className="text-lg text-charcoal/70 mb-8 leading-relaxed font-medium">
                {sections.painBody}
              </p>
              
              <div className="space-y-5 mb-8">
                {sections.painPoints.map((item, i) => {
                  const Icon = painIcons[i] ?? AlertTriangle
                  return (
                  <div key={i} className="flex items-center gap-4 justify-end p-4 rounded-2xl bg-mist/40 border border-sage/30 hover:border-red-200 hover:bg-red-50/50 transition-colors group">
                    <span className="text-[17px] font-bold text-charcoal/80 group-hover:text-charcoal transition-colors">
                      {item.text}
                    </span>
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-sage/20 group-hover:border-red-200 transition-colors">
                      <Icon className="w-5 h-5 text-red-400 group-hover:text-red-500" />
                    </div>
                  </div>
                )})}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-red-500/10 rounded-full opacity-40" />
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 border border-sage/20 shadow-2xl">
                <img 
                  src={sections.painImage} 
                  alt={sections.painImageAlt} 
                  className="w-full h-full object-cover grayscale-[30%] contrast-125"
                />
                {/* Overlay gradient for dramatic effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 left-6 text-right">
                  <p className="text-white font-extrabold text-xl mb-1 shadow-black drop-shadow-md">
                    {sections.painOverlay}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Solution / Epiphany (Image Right, Text Left) ── */}
      <section className="py-16 md:py-24 bg-mist/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Image Right visually, Order 1 in RTL so it goes right */}
            <div className="w-full lg:w-1/2 order-1">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 border border-sage/20 shadow-xl">
                <img 
                  src={sections.solutionImage} 
                  alt={sections.solutionImageAlt} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Left visually, Order 2 in RTL */}
            <div className="w-full lg:w-1/2 text-right lg:text-left order-2">
              <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm lg:flex-row-reverse border border-teal/20 shadow-sm">
                <Leaf className="w-4 h-4" />
                {sections.solutionBadge}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6 leading-tight tracking-tight">
                {sections.solutionTitle}
              </h2>
              <p className="text-lg text-charcoal/70 mb-8 leading-relaxed font-medium">
                {sections.solutionBody}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sections.solutionFeatures.map((feature, i) => {
                  const { icon: FeatureIcon, color } = solutionIcons[i] ?? solutionIcons[0]
                  return (
                  <div key={i} className="bg-white p-4 rounded-xl border border-sage/20 flex items-center justify-between lg:flex-row-reverse gap-3 shadow-sm hover:shadow-md hover:border-teal/30 transition-all group">
                    <span className="font-bold text-charcoal text-sm lg:text-left text-right w-full group-hover:text-teal transition-colors">{feature.title}</span>
                    <div className={`w-10 h-10 bg-mist rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <FeatureIcon className={`w-5 h-5 ${color}`} />
                    </div>
                  </div>
                )})}
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

            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 border border-sage/20 shadow-2xl">
                <img
                  src="/images/mechanism-breathing.gif"
                  alt="شرح آلية العمل — حركة التنفس والرئتين"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4.5 Ingredients Section ── */}
      {product.detailedIngredients && product.detailedIngredients.length > 0 && (
        <section className="py-16 md:py-24 bg-mist/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              
              {/* Image Side (Left visually, Right in DOM for RTL) */}
              <div className="w-full lg:w-5/12 order-1 lg:order-2">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white border border-sage/20 shadow-2xl group">
                  <img 
                    src={sections.ingredientsMainImage} 
                    alt={sections.ingredientsMainImageAlt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-60" />
                </div>
              </div>

              {/* Content Side (Right visually, Left in DOM for RTL) */}
              <div className="w-full lg:w-7/12 order-2 lg:order-1 text-right">
                <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm border border-teal/20 shadow-sm">
                  <Leaf className="w-4 h-4" />
                  مكونات طبيعية 100%
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4 tracking-tight">
                  سر التركيبة العشبية الفعالة
                </h2>
                <p className="text-lg text-charcoal/70 mb-10 font-medium leading-relaxed">
                  جمعنا لك أقوى الأعشاب الطبيعية اللي تشتغل مع بعض عشان تنظف صدرك وترجع لك تنفسك الطبيعي والمريح.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                  {product.detailedIngredients.map((ingredient, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 bg-mist">
                        <img 
                          src={ingredient.image} 
                          alt={ingredient.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-charcoal mb-1.5 group-hover:text-teal transition-colors">
                          {ingredient.name}
                        </h3>
                        <p className="text-sm text-charcoal/70 leading-relaxed font-medium">
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

      {/* ── 4.6 Twenty-Eight Day Process ── */}
      {hasFullProductPage(product.slug) && (
        <ProductDayProcessSection content={sections.dayProcess} />
      )}

      {/* ── 4.75 How to Use Section ── */}
      {hasFullProductPage(product.slug) && (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm border border-teal/20 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                طريقة الاستخدام
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4 tracking-tight">
                3 خطوات بسيطة لراحة تدوم
              </h2>
              <p className="text-lg text-charcoal/70 font-medium max-w-2xl mx-auto">
                روتين يومي سهل وسريع يضمن لك أفضل نتيجة لتنظيف الصدر وتوسيع الشعب الهوائية.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {sections.howToUseSteps.map((item) => (
                <HowToUseStep key={item.step} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Comparison Table (Us vs. Them) ── */}
      <section className="py-16 md:py-24 bg-mist/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm border border-teal/20 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            ليش نسمة هي خيارك الصح؟
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-10 tracking-tight">
            مقارنة سريعة توضح لك الفرق
          </h2>

          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-sage/20 relative">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-charcoal text-white font-bold text-sm md:text-lg">
              <div className="p-4 md:p-6 text-center border-l border-white/10 flex items-center justify-center">وجه المقارنة</div>
              <div className="p-4 md:p-6 text-center border-l border-white/10 bg-gradient-to-b from-teal-dark to-teal text-white flex flex-col items-center justify-center gap-1 shadow-inner">
                <span className="text-xl md:text-2xl mb-1">🌿</span>
                <span>روتين نسمة</span>
              </div>
              <div className="p-4 md:p-6 text-center text-white/60 flex flex-col items-center justify-center gap-1 bg-gray-900">
                <span className="text-xl md:text-2xl mb-1 grayscale opacity-50">💊</span>
                <span>البدائل العادية</span>
              </div>
            </div>

            {/* Table Rows */}
            {sections.comparisonRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm md:text-base border-b border-sage/10 transition-colors hover:bg-mist/50 ${i % 2 === 0 ? 'bg-white' : 'bg-mist/20'}`}>
                <div className="p-4 md:p-6 text-center border-l border-sage/20 font-extrabold text-charcoal/80 flex items-center justify-center">
                  {row.feature}
                </div>
                <div className="p-4 md:p-6 text-center border-l border-sage/20 font-bold text-teal-dark flex flex-col items-center justify-center gap-2 bg-teal/5">
                  <CheckCircle2 className="w-6 h-6 text-teal drop-shadow-sm" />
                  {row.us}
                </div>
                <div className="p-4 md:p-6 text-center text-charcoal/60 font-medium flex flex-col items-center justify-center gap-2 bg-gray-50/50">
                  <XCircle className="w-5 h-5 text-red-400" />
                  {row.them}
                </div>
              </div>
            ))}
          </div>
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
                صحتك ما فيها مجازفة. جميع منتجات نسمة تمر باختبارات جودة صارمة لتكون مطابقة تماماً للمواصفات والمقاييس السعودية (SFDA). نحن نضمن لك منتجاً نقيّاً، فعّالاً، وخالياً من أي إضافات ضارة.
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

      {/* ── 7. Image Reviews / Proof Section ── */}
      {sections.showImageReviews && (
        <section id="reviews" className="py-16 md:py-24 bg-charcoal text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="text-right">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">شف تجارب عملائنا بنفسك</h2>
                <p className="text-white/70 max-w-2xl">آلاف الشباب في السعودية ارتاحوا من الكتمة بعد استخدام منتجاتنا. لا تأخذ كلامنا، اسمع منهم!</p>
              </div>
              {/* Add Review Button */}
              <Link 
                href="#reviews"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
              >
                <Star className="w-4 h-4 fill-gold text-gold" />
                أضف تقييمك
              </Link>
            </div>
            
            {/* Reviews Grid */}
            <ProductReviewsGrid reviews={productReviews} />

            <div className="mt-12">
              <Link
                href="#offer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-teal px-12 py-5 text-xl font-extrabold text-white shadow-xl shadow-teal/20 transition-transform hover:scale-105 hover:bg-teal-dark md:w-auto"
              >
                🚀 اطلب الآن والدفع عند الاستلام
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. FAQ ── */}
      <section className="py-16 bg-white border-y border-sage/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-charcoal mb-4">أسئلة شائعة عن المنتج</h2>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-sage/20">
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
                const offer = getDefaultOffer()
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
