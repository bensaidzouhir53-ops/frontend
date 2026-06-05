'use client'

import { useState } from 'react'
import { Check, ShoppingCart, TrendingUp } from 'lucide-react'
import type { Product } from '@/types'
import { getOffersForProduct } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

interface OfferSelectorProps {
  product: Product
  className?: string
}

const BADGE_STYLES: Record<string, string> = {
  sage: 'bg-sage/30 text-teal-dark',
  gold: 'bg-gold text-white',
  teal: 'bg-teal text-white',
}

const DEFAULT_QTY_LABELS: Record<number, string> = {
  1: 'قطعة واحدة',
  2: 'قطعتان',
  3: '3 قطع',
}

export default function OfferSelector({ product, className }: OfferSelectorProps) {
  const offers = getOffersForProduct(product.slug)
  const basePrice = offers[0].price
  const [selectedIdx, setSelectedIdx] = useState(offers.findIndex((o) => o.isDefault))
  const { addItem, openCart } = useCartStore()

  const selected = offers[selectedIdx] ?? offers[1]

  const handleAddToCart = () => {
    addItem(product, selected.qty, selected.price)
    openCart()
    trackAddToCart({
      value: selected.price,
      content_ids: [product.slug],
      event_id: generateEventId(),
    })
  }

  return (
    <div className={cn('flex flex-col gap-3 sm:gap-4', className)} dir="rtl">
      {product.slug === 'molien-drops' && (
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/10 to-amber-50/80 px-4 py-3.5">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm font-bold leading-relaxed text-charcoal/80">
            <span className="text-charcoal">ليش الأغلبية يختارون عبوتين أو أكثر؟</span>{' '}
            البلغم المتحجر ما يروح بعبوة وحدة — الاستمرار شهرين أو أكثر يعطيك نتيجة أوضح وتوفر أكثر على
            السعر.
          </p>
        </div>
      )}

      <p className="text-sm font-semibold text-charcoal/70">اختر كميتك:</p>

      <div className="flex flex-col gap-2.5 sm:gap-3">
        {offers.map((offer, idx) => {
          const isSelected = idx === selectedIdx
          const perUnit = Math.round(offer.price / offer.qty)
          const qtyLabel = offer.qtyLabel ?? DEFAULT_QTY_LABELS[offer.qty]

          return (
            <button
              key={offer.qty}
              onClick={() => setSelectedIdx(idx)}
              className={cn(
                'relative w-full rounded-2xl border-2 p-3.5 text-right transition-all sm:p-4',
                isSelected
                  ? 'border-teal bg-teal/5 shadow-md'
                  : 'border-sage/40 bg-white hover:border-teal/40',
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isSelected ? 'border-teal bg-teal' : 'border-sage/60 bg-white',
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col gap-2 sm:mb-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-base font-bold text-charcoal sm:text-[17px]">
                          {qtyLabel}
                        </span>
                        {offer.volumeLabel && (
                          <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold text-teal-dark sm:text-[11px]">
                            {offer.volumeLabel}
                          </span>
                        )}
                        <span
                          className={cn(
                            'inline-flex max-w-full rounded-full px-2 py-0.5 text-[10px] font-bold leading-snug sm:text-[11px]',
                            BADGE_STYLES[offer.badgeColor],
                          )}
                        >
                          {offer.badge}
                        </span>
                      </div>

                      {offer.desc && (
                        <p className="text-xs leading-relaxed text-charcoal/70 sm:text-[13px]">
                          {offer.desc}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center sm:gap-0.5">
                      <div className="text-right sm:text-left">
                        <p className="text-lg font-extrabold text-teal sm:text-xl">
                          {offer.price} ريال
                        </p>
                        {offer.qty > 1 && (
                          <p className="text-[11px] text-charcoal/40 line-through sm:text-xs">
                            {basePrice * offer.qty} ريال
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    <span className="text-[11px] text-charcoal/50 sm:text-xs">
                      {perUnit} ريال / للعبوة
                    </span>
                    {(offer.savings ?? 0) > 0 && (
                      <span className="text-[11px] font-semibold text-gold sm:text-xs">
                        وفّر {offer.savings} ريال
                      </span>
                    )}
                    {offer.qty > 1 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold text-teal sm:text-[11px]">
                        🚚 شحن مجاني
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {(selected.savings ?? 0) > 0 && (
        <div className="flex items-center justify-center rounded-xl bg-gold/10 px-3 py-2.5 sm:px-4">
          <span className="text-center text-xs font-bold text-gold sm:text-sm">
            ستوفّر {selected.savings} ريال مع هذا الخيار 🎉
          </span>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal px-4 py-3.5 text-base font-extrabold text-white shadow-lg shadow-teal/30 transition-all hover:bg-teal-dark active:scale-[0.98] sm:gap-3 sm:py-4 sm:text-lg md:py-5"
      >
        <ShoppingCart className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span className="leading-snug">أكمل الطلب الآن — الدفع عند الاستلام</span>
      </button>

      <div className="mt-1 flex flex-col items-stretch gap-2 rounded-xl bg-mist/50 px-3 py-3 text-xs font-bold text-charcoal/60 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 sm:text-sm">
        <span className="flex items-center justify-center gap-1 sm:justify-start">
          <Check className="h-3 w-3 shrink-0 text-teal" /> الدفع عند الاستلام
        </span>
        <span className="flex items-center justify-center gap-1 sm:justify-start">
          <Check className="h-3 w-3 shrink-0 text-teal" /> شحن سريع 2-4 أيام
        </span>
        <span className="flex items-center justify-center gap-1 sm:justify-start">
          <Check className="h-3 w-3 shrink-0 text-teal" /> إرجاع مجاني
        </span>
      </div>
    </div>
  )
}
