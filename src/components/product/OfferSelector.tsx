'use client'

import { useState } from 'react'
import { ShoppingCart, ShieldCheck, Truck, Package } from 'lucide-react'
import type { Product } from '@/types'
import {
  getOffersForProduct,
  getOfferOriginalPrice,
  getMaxOfferSavings,
} from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

interface OfferSelectorProps {
  product: Product
  className?: string
}

const BADGE_STYLES: Record<string, string> = {
  sage: 'border-teal/15 bg-offer-selected text-teal-dark',
  gold: 'border-gold/30 bg-gold/10 text-gold-dark',
  teal: 'border-teal/20 bg-teal/10 text-teal-dark',
  apothecary: 'bg-apothecary text-white border-transparent',
  charcoal: 'border-charcoal/15 bg-charcoal/5 text-charcoal',
}

export default function OfferSelector({ product, className }: OfferSelectorProps) {
  const offers = getOffersForProduct(product.slug)
  const maxSavings = getMaxOfferSavings(product.slug)
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
      <div className="rounded-2xl border border-teal/15 bg-gradient-to-l from-offer-selected via-mist to-ivory px-4 py-3.5 shadow-sm">
        <p className="text-sm font-extrabold leading-snug text-teal-dark sm:text-[15px]">
          العبوة الأولى تعطيك النتيجة — العبوتين والثلاث تثبّتها
          {maxSavings > 0 && ` — وفّر حتى ${maxSavings} ر.س`}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/15 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-teal-dark sm:text-[11px]">
            <Truck className="h-3 w-3 shrink-0" />
            شحن مجاني على كل العروض
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/15 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-teal-dark sm:text-[11px]">
            <ShieldCheck className="h-3 w-3 shrink-0" />
            الدفع عند الاستلام
          </span>
        </div>
      </div>

      <p className="text-sm font-bold text-charcoal/75">اختر العرض المناسب لك:</p>

      <div className="flex flex-col gap-2.5 sm:gap-3">
        {offers.map((offer, idx) => {
          const isSelected = idx === selectedIdx
          const perUnit = Math.round(offer.price / offer.qty)
          const originalPrice = getOfferOriginalPrice(product.slug, offer)
          const showStrikethrough = (offer.savings ?? 0) > 0

          return (
            <button
              key={offer.qty}
              onClick={() => setSelectedIdx(idx)}
              className={cn(
                'relative w-full rounded-2xl border-2 p-3.5 text-right transition-all duration-200 sm:p-4',
                isSelected
                  ? 'border-teal bg-offer-selected shadow-md shadow-teal/10'
                  : 'border-warm-border/80 bg-white hover:border-teal/25 hover:bg-mist/40',
              )}
              aria-pressed={isSelected}
            >
              {offer.isDefault && (
                <span className="pointer-events-none absolute -top-3 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-extrabold text-charcoal shadow-sm">
                  الأكثر طلباً ⭐
                </span>
              )}

              <div className="flex items-stretch gap-3">
                <div
                  className={cn(
                    'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isSelected ? 'border-teal bg-teal' : 'border-sage/60 bg-white',
                  )}
                >
                  {isSelected && <span className="h-2 w-2 rounded-full bg-gold" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold',
                              isSelected
                                ? 'bg-teal text-white'
                                : 'bg-mist text-teal-dark',
                            )}
                          >
                            {offer.qty}
                          </span>
                          <span className="text-base font-extrabold text-charcoal sm:text-[17px]">
                            {offer.qtyLabel}
                          </span>
                        </div>
                        {offer.volumeLabel && (
                          <span className="rounded-full border border-teal/10 bg-white px-2 py-0.5 text-[10px] font-bold text-teal-dark sm:text-[11px]">
                            {offer.volumeLabel}
                          </span>
                        )}
                      </div>

                      <span
                        className={cn(
                          'mb-1.5 inline-flex max-w-full rounded-full border px-2 py-0.5 text-[10px] font-bold leading-snug sm:text-[11px]',
                          BADGE_STYLES[offer.badgeColor],
                        )}
                      >
                        {offer.badge}
                      </span>

                      {offer.desc && (
                        <p className="text-xs leading-relaxed text-charcoal/65 sm:text-[13px]">
                          {offer.desc}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-charcoal/50 sm:text-xs">
                          {perUnit} ر.س / للعبوة
                        </span>
                        {(offer.savings ?? 0) > 0 && (
                          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold-dark sm:text-[11px]">
                            وفّر {offer.savings} ر.س
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end justify-center">
                      <p className="text-xl font-extrabold tabular-nums text-teal-dark sm:text-2xl">
                        {offer.price}
                        <span className="mr-0.5 text-xs font-bold text-charcoal/45 sm:text-sm">
                          ر.س
                        </span>
                      </p>
                      {showStrikethrough && (
                        <p className="text-[11px] text-charcoal/40 line-through sm:text-xs">
                          {originalPrice} ر.س
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {(selected.savings ?? 0) > 0 && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-gold/20 bg-gold/10 px-3 py-2.5 sm:px-4">
          <Package className="h-4 w-4 shrink-0 text-gold-dark" />
          <span className="text-center text-xs font-bold text-gold-dark sm:text-sm">
            {selected.qtyLabel} — وفّر {selected.savings} ر.س ({selected.price} ر.س فقط)
          </span>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-1 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-teal-dark to-teal px-4 py-4 text-base font-bold text-white shadow-lg shadow-teal/30 transition-all hover:from-apothecary hover:to-teal-dark active:scale-[0.98] sm:gap-3 sm:text-lg"
      >
        <ShoppingCart className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span className="leading-snug">
          أكمل الطلب الآن — {selected.price} ر.س · الدفع عند الاستلام
        </span>
      </button>

      <p className="text-center text-xs font-medium text-charcoal/55">
        توصيل 2-4 أيام · ضمان استرجاع 30 يوم · بدون دفع مقدّم
      </p>
    </div>
  )
}
