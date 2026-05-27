'use client'

import { useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'
import { OFFERS } from '@/lib/products'
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

const basePrice = OFFERS[0].price

export default function OfferSelector({ product, className }: OfferSelectorProps) {
  const defaultOffer = OFFERS.find((o) => o.isDefault) ?? OFFERS[1]
  const [selectedIdx, setSelectedIdx] = useState(
    OFFERS.findIndex((o) => o.isDefault),
  )
  const { addItem, openCart } = useCartStore()

  const selected = OFFERS[selectedIdx]

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
    <div className={cn('flex flex-col gap-4', className)} dir="rtl">
      <p className="text-sm font-semibold text-charcoal/70">اختر كميتك:</p>

      {/* Offer cards */}
      <div className="flex flex-col gap-2.5">
        {OFFERS.map((offer, idx) => {
          const isSelected = idx === selectedIdx
          const perUnit = Math.round(offer.price / offer.qty)
          return (
            <button
              key={offer.qty}
              onClick={() => setSelectedIdx(idx)}
              className={cn(
                'relative flex items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-right transition-all',
                isSelected
                  ? 'border-teal bg-teal/5 shadow-md'
                  : 'border-sage/40 bg-white hover:border-teal/40',
              )}
              aria-pressed={isSelected}
            >
              {/* Selected checkmark */}
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  isSelected
                    ? 'border-teal bg-teal'
                    : 'border-sage/60 bg-white',
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
              </div>

              {/* Middle: qty + label */}
              <div className="mx-3 flex-1 text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-charcoal">
                    {offer.qty === 1 ? 'قطعة واحدة' : offer.qty === 2 ? 'قطعتان' : '3 قطع'}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[11px] font-bold',
                      BADGE_STYLES[offer.badgeColor],
                    )}
                  >
                    {offer.badge}
                  </span>
                </div>
                {offer.desc && (
                  <p className="text-xs text-charcoal/70 mb-1 leading-snug font-medium">
                    {offer.desc}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-charcoal/50">
                    {perUnit} ريال / للقطعة
                  </span>
                  {(offer.savings ?? 0) > 0 && (
                    <span className="text-[11px] font-semibold text-gold">
                      وفّر {offer.savings} ريال
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="text-left flex flex-col items-end justify-center">
                <p className="font-extrabold text-teal text-lg md:text-xl">{offer.price} ريال</p>
                {offer.qty > 1 && (
                  <p className="text-xs text-charcoal/40 line-through">
                    {basePrice * offer.qty} ريال
                  </p>
                )}
                {offer.qty > 1 && (
                   <span className="mt-1 text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded flex items-center gap-1">
                     🚚 شحن مجاني
                   </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Savings highlight */}
      {(selected.savings ?? 0) > 0 && (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-gold/10 px-4 py-2.5">
          <span className="text-sm font-bold text-gold">
            ستوفّر {selected.savings} ريال مع هذا الخيار 🎉
          </span>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleAddToCart}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-teal py-4 md:py-5 text-lg font-extrabold text-white shadow-lg shadow-teal/30 transition-all hover:bg-teal-dark active:scale-[0.98] mt-2 animate-bounce hover:animate-none"
      >
        <ShoppingCart className="h-6 w-6" />
        أكمل الطلب الآن — الدفع عند الاستلام
      </button>

      {/* Micro-trust */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-charcoal/60 font-bold bg-mist/50 py-3 px-2 rounded-xl mt-1">
        <span className="flex items-center gap-1"><Check className="w-3 h-3 text-teal" /> الدفع عند الاستلام</span>
        <span className="flex items-center gap-1"><Check className="w-3 h-3 text-teal" /> شحن سريع 2-4 أيام</span>
        <span className="flex items-center gap-1"><Check className="w-3 h-3 text-teal" /> إرجاع مجاني</span>
      </div>
    </div>
  )
}
