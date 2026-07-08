import Link from 'next/link'
import { Star } from 'lucide-react'
import ProductReviewsGrid from '@/components/product/ProductReviewsGrid'
import type { ProductReview } from '@/lib/productReviews'

export interface ImageReviewsSectionContent {
  title: string
  subtitle: string
}

interface ProductImageReviewsSectionProps {
  content: ImageReviewsSectionContent
  reviews: ProductReview[]
  ctaHref?: string
}

export default function ProductImageReviewsSection({
  content,
  reviews,
  ctaHref = '#offer',
}: ProductImageReviewsSectionProps) {
  if (reviews.length === 0) return null

  return (
    <section id="reviews" className="relative overflow-hidden bg-white py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-teal/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold/5 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-end">
          <div className="text-right">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-bold text-gold-dark">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              تقييمات بصور حقيقية
            </div>
            <h2 className="text-3xl font-extrabold text-charcoal md:text-4xl">{content.title}</h2>
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-charcoal/70 md:text-lg">
              {content.subtitle}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-sage/30 bg-ivory px-5 py-3 text-right shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <div>
              <p className="text-sm font-extrabold text-charcoal">4.9/5</p>
              <p className="text-xs text-charcoal/50">+2,700 تقييم</p>
            </div>
          </div>
        </div>

        <ProductReviewsGrid reviews={reviews} />

        <div className="mt-12 text-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-teal/30 transition-colors hover:bg-teal-dark"
          >
            جرب قطرة المولين — الدفع عند الاستلام
          </Link>
        </div>
      </div>
    </section>
  )
}
