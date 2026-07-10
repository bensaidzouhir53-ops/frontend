'use client'

import { useState } from 'react'
import { Check, ShoppingCart, TrendingUp, Flame } from 'lucide-react'
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
  sage: 'bg-sage/40 text-teal-dark border border-sage/50',
  gold: 'bg-gold/15 text-gold-dark border border-gold/40',
  teal: 'bg-teal/10 text-teal-dark border border-teal/20',
  apothecary: 'bg-apothecary text-white shadow-sm',
  charcoal: 'bg-charcoal text-gold border border-gold/30 shadow-sm',
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
  const isMolien = product.slug === 'molien-drops'

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
      {product.slug === 'herbal-lung-spray' && (
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/10 to-amber-50/80 px-4 py-3.5">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm font-bold leading-relaxed text-charcoal/80">
            <span className="text-charcoal">صدق اللي جرب — عبوة وحدة تعطيك طعم بس!</span>{' '}
            الكتمة وبلغم السنين ما يبي يوم واحد، يبي روتين يرافقك. عبوتين فما فوق تضمن إنك ما
            توقف وتشوف فرق حقيقي — 30 مل · 60 مل · 90 مل.
          </p>
        </div>
      )}

      {isMolien && (
        <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-extrabold text-red-700 sm:text-xs">
          <Flame className="h-3.5 w-3.5 shrink-0 text-red-600" />
          <span className="leading-snug">الأكثر طلباً اليوم — الكمية بتخلص!</span>
        </div>
      )}

      <p className="text-sm font-semibold text-charcoal/70">اختر كميتك:</p>

      <div className="flex flex-col gap-3">
        {offers.map((offer, idx) => {
          const isSelected = idx === selectedIdx
          const perUnit = Math.round(offer.price / offer.qty)
          const qtyLabel = offer.qtyLabel ?? DEFAULT_QTY_LABELS[offer.qty]

          return (
            <button
              key={offer.qty}
              onClick={() => setSelectedIdx(idx)}
              className={cn(
                'relative w-full rounded-2xl border-2 p-4 text-right transition-all duration-200',
                isSelected
                  ? 'border-teal bg-teal/5 shadow-md'
                  : isMolien
                    ? 'border-warm-border bg-white hover:border-teal/30 hover:bg-surface-rose/60'
                    : 'border-sage/40 bg-white hover:border-teal/40',
              )}
              aria-pressed={isSelected}
            >
              {isMolien && offer.qty === 2 && (
                <span className="pointer-events-none absolute -top-3 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-extrabold text-charcoal shadow-sm">
                  الأكثر طلباً
                </span>
              )}

              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isSelected ? 'border-teal bg-teal' : 'border-sage/60 bg-white',
                  )}
                >
                  {isSelected &&
                    (isMolien ? (
                      <span className="h-2 w-2 rounded-full bg-gold" />
                    ) : (
                      <Check className="h-3.5 w-3.5 stroke-[3] text-white" />
                    ))}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
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

                    <div className="flex shrink-0 flex-col items-start sm:items-end">
                      <p className="text-xl font-extrabold tabular-nums text-teal-dark">
                        {offer.price} {isMolien ? 'ر.س' : 'ريال'}
                      </p>
                      {offer.qty > 1 && (
                        <p className="text-[11px] text-charcoal/40 line-through sm:text-xs">
                          {basePrice * offer.qty} {isMolien ? 'ر.س' : 'ريال'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    <span className="text-[11px] text-charcoal/50 sm:text-xs">
                      {perUnit} {isMolien ? 'ر.س' : 'ريال'} / للعبوة
                    </span>
                    {(offer.savings ?? 0) > 0 && (
                      <span className="text-[11px] font-semibold text-gold-dark sm:text-xs">
                        وفّر {offer.savings} ريال
                      </span>
                    )}
                    {offer.qty > 1 && (
                      <span className="inline-flex items-center rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold text-teal-dark sm:text-[11px]">
                        شحن مجاني
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {(selected.savings ?? 0) > 0 && !isMolien && (
        <div className="flex items-center justify-center rounded-xl bg-gold/10 px-3 py-2.5 text-gold sm:px-4">
          <span className="text-center text-xs font-bold sm:text-sm">
            ستوفّر {selected.savings} ريال مع هذا الخيار 🎉
          </span>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-1 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-teal px-4 py-4 text-base font-bold text-white shadow-lg shadow-teal/20 transition-all hover:bg-teal-dark active:scale-[0.98] sm:gap-3 sm:text-lg"
      >
        <ShoppingCart className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span className="leading-snug">أكمل الطلب الآن — الدفع عند الاستلام</span>
      </button>

      {isMolien ? (
        <p className="text-center text-xs font-medium text-charcoal/55">
          الدفع عند الاستلام · شحن سريع 2-4 أيام · إرجاع مجاني
        </p>
      ) : (
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
      )}
    </div>
  )
}
