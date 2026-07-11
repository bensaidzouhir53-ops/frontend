'use client'

import { useState } from 'react'
import { Check, ShoppingCart, TrendingUp, Flame, Gift } from 'lucide-react'
import type { Product } from '@/types'
import {
  getOffersForProduct,
  getOfferTotalUnits,
  getOfferOriginalPrice,
} from '@/lib/products'
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
        <div className="relative overflow-hidden rounded-2xl border-2 border-teal/25 bg-gradient-to-l from-mist via-ivory to-gold/10 px-4 py-4 shadow-sm">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-teal/15 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal-dark shadow-md shadow-teal/25">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="mb-1 text-base font-extrabold text-teal-dark sm:text-lg">
                🎁 عرض حصري — اشتري وخذ نفس العدد مجاناً!
              </p>
              <p className="text-sm font-semibold leading-relaxed text-charcoal/75">
                1+1 بـ 199 ر.س · 2+2 بـ 299 ر.س · 3+3 بـ 399 ر.س — كل ما زادت الكمية، كل ما
                وفّرت أكثر. لا تفوّت العرض!
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-extrabold text-charcoal sm:text-xs">
                <Flame className="h-3.5 w-3.5 text-charcoal" />
                الأكثر طلباً اليوم — الكمية محدودة!
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm font-semibold text-charcoal/70">
        {isMolien ? 'اختر عرضك:' : 'اختر كميتك:'}
      </p>

      <div className="flex flex-col gap-3">
        {offers.map((offer, idx) => {
          const isSelected = idx === selectedIdx
          const totalUnits = getOfferTotalUnits(offer)
          const perUnit = Math.round(offer.price / totalUnits)
          const qtyLabel = offer.qtyLabel ?? DEFAULT_QTY_LABELS[offer.qty]
          const originalPrice = getOfferOriginalPrice(product.slug, offer)
          const showStrikethrough = (offer.savings ?? 0) > 0

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
                  الأكثر طلباً ⭐
                </span>
              )}

              {isMolien && offer.totalUnits && (
                <span className="pointer-events-none absolute -top-3 left-4 rounded-full bg-teal px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-sm">
                  {totalUnits} عبوات
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
                      {showStrikethrough && (
                        <p className="text-[11px] text-charcoal/40 line-through sm:text-xs">
                          {originalPrice} {isMolien ? 'ر.س' : 'ريال'}
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
                    {isMolien && offer.totalUnits && (
                      <span className="inline-flex items-center rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold-dark sm:text-[11px]">
                        🎁 {offer.qty} مجاناً
                      </span>
                    )}
                    {(offer.qty > 1 || isMolien) && (
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

      {isMolien && (selected.savings ?? 0) > 0 && (
        <div className="flex items-center justify-center rounded-xl bg-gold/15 px-3 py-2.5 text-gold-dark sm:px-4">
          <span className="text-center text-xs font-bold sm:text-sm">
            🎉 ستوفّر {selected.savings} ريال — {getOfferTotalUnits(selected)} عبوات بـ{' '}
            {selected.price} ر.س فقط!
          </span>
        </div>
      )}

      {!isMolien && (selected.savings ?? 0) > 0 && (
        <div className="flex items-center justify-center rounded-xl bg-gold/10 px-3 py-2.5 text-gold sm:px-4">
          <span className="text-center text-xs font-bold sm:text-sm">
            ستوفّر {selected.savings} ريال مع هذا الخيار 🎉
          </span>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-1 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-teal-dark to-teal px-4 py-4 text-base font-bold text-white shadow-lg shadow-teal/30 transition-all hover:from-apothecary hover:to-teal-dark active:scale-[0.98] sm:gap-3 sm:text-lg"
      >
        <ShoppingCart className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span className="leading-snug">
          {isMolien
            ? `اطلب الآن — ${getOfferTotalUnits(selected)} عبوات بـ ${selected.price} ر.س`
            : 'أكمل الطلب الآن — الدفع عند الاستلام'}
        </span>
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
