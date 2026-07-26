import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCatalogProducts } from '@/lib/products'
import TrustBadges from '@/components/shared/TrustBadges'

export const metadata: Metadata = {
  title: 'نَفَس | جميع منتجاتنا',
  description: 'تصفح مجموعة نَفَس الكاملة من المنتجات العشبية لدعم صحة الجهاز التنفسي. توصيل لجميع مناطق المملكة مع الدفع عند الاستلام.',
}

export default function ProductsPage() {
  const catalogProducts = getCatalogProducts()

  return (
    <main dir="rtl" className="bg-ivory min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-mist to-ivory py-14 border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-charcoal/50 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">الرئيسية</Link>
            <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-charcoal">المنتجات</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-teal font-semibold text-sm tracking-widest uppercase mb-2">تشكيلتنا</p>
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-3">جميع منتجاتنا</h1>
              <p className="text-charcoal/60 text-lg max-w-xl">
                روتين عناية شامل بجهازك التنفسي — {catalogProducts.length} منتجات عشبية مختارة بعناية
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl px-4 py-2 border border-sage/30 text-sm text-charcoal/70">
                <span className="font-semibold text-charcoal">{catalogProducts.length}</span> منتجات متاحة
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sort/Filter Bar (visual placeholder) */}
      <section className="bg-white border-b border-sage/20 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4" dir="rtl">
            <div className="flex items-center gap-2 text-sm text-charcoal/60">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              تصفية وترتيب
            </div>
            <div className="flex gap-2">
              {['الكل', 'بخاخات'].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === 'الكل'
                      ? 'bg-teal text-white'
                      : 'bg-mist text-charcoal/70 hover:bg-sage/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogProducts.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-sage/20 hover:border-teal/30 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-mist overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.nameAr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {index === 0 && (
                    <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                      الأكثر مبيعاً
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 text-right flex flex-col flex-1">
                  <h2 className="font-bold text-charcoal text-lg leading-snug mb-2 group-hover:text-teal transition-colors line-clamp-2">
                    {product.nameAr}
                  </h2>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {product.shortDescAr}
                  </p>

                  {/* Benefits Preview */}
                  <ul className="space-y-1.5 mb-5">
                    {product.benefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 justify-end">
                        <span className="text-xs text-charcoal/60 leading-relaxed">{b}</span>
                        <div className="w-4 h-4 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="border-t border-sage/20 pt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 bg-teal text-white px-4 py-2 rounded-xl text-sm font-semibold group-hover:bg-teal-dark transition-colors">
                      اطلب الآن
                      <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal text-lg">١٦٩ ريال</p>
                      <p className="text-charcoal/50 text-xs">أو ٢ قطعة بـ ٢٤٥ ريال</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white border-t border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* Health Disclaimer */}
      <section className="py-6 bg-ivory border-t border-sage/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
          <p className="text-charcoal/40 text-xs leading-relaxed">
            <strong className="font-semibold text-charcoal/60">تنبيه صحي:</strong>{' '}
            منتجات نَفَس مكملات عشبية ولا تُغني عن الاستشارة الطبية. استشر طبيبك دائماً قبل الاستخدام.
          </p>
        </div>
      </section>
    </main>
  )
}
