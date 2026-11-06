import Image from 'next/image'
import { Star, CheckCircle2 } from 'lucide-react'
import type { ProductReview } from '@/lib/productReviews'

interface ProductReviewsGridProps {
  reviews: ProductReview[]
  dark?: boolean
}

export default function ProductReviewsGrid({ reviews, dark = false }: ProductReviewsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 text-right md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, i) => (
        <div
          key={`${review.name}-${i}`}
          className={`group overflow-hidden rounded-2xl border transition-all ${
            dark
              ? 'border-gold/20 bg-white/[0.05] shadow-lg shadow-black/25 hover:-translate-y-0.5 hover:border-gold/45'
              : 'border-sage/30 bg-white shadow-md shadow-teal/5 hover:shadow-lg hover:shadow-teal/10'
          }`}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-mist">
            <Image
              src={review.image}
              alt={`صورة تقييم من ${review.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
              className="object-cover transition-opacity group-hover:opacity-100"
            />
            <div
              className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                dark ? 'bg-gold text-charcoal' : 'bg-teal text-white'
              }`}
            >
              <CheckCircle2 className="h-3 w-3" />
              مشتري مؤكد
            </div>
          </div>
          <div className="p-5">
            <div className="mb-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p
              className={`mb-4 min-h-[72px] line-clamp-4 text-sm font-medium leading-relaxed ${
                dark ? 'text-white/80' : 'text-charcoal/80'
              }`}
            >
              &ldquo;{review.text}&rdquo;
            </p>
            <div
              className={`flex items-center gap-3 border-t pt-4 ${
                dark ? 'border-white/10' : 'border-sage/20'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  dark ? 'bg-gold/20 text-gold ring-1 ring-gold/40' : 'bg-teal text-white'
                }`}
              >
                {review.name.charAt(0)}
              </div>
              <div>
                <p className={`text-sm font-bold ${dark ? 'text-white' : 'text-charcoal'}`}>{review.name}</p>
                <p className={`text-xs ${dark ? 'text-white/50' : 'text-charcoal/50'}`}>{review.city}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
