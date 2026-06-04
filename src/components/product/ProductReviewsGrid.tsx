'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, CheckCircle2 } from 'lucide-react'
import type { ProductReview } from '@/lib/productReviews'

const INITIAL_COUNT = 6

interface ProductReviewsGridProps {
  reviews: ProductReview[]
}

export default function ProductReviewsGrid({ reviews }: ProductReviewsGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const visible = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  return (
    <>
      <div className="grid grid-cols-1 gap-6 text-right md:grid-cols-2 lg:grid-cols-3">
        {visible.map((review, i) => (
          <div
            key={`${review.name}-${i}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-800 shadow-lg"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
              <Image
                src={review.image}
                alt={`صورة تقييم من ${review.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
              />
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-teal px-3 py-1 text-xs font-bold text-white shadow-sm">
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
              <p className="mb-4 min-h-[72px] line-clamp-4 text-sm font-medium leading-relaxed text-white/90">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-dark text-xs font-bold text-white">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{review.name}</p>
                  <p className="text-xs text-white/50">{review.city}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setVisibleCount(reviews.length)}
            className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20"
          >
            عرض المزيد من التقييمات ({reviews.length - visibleCount} متبقية)
          </button>
        </div>
      ) : null}
    </>
  )
}
