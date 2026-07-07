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
  sage: 'bg-sage/40 text-teal-dark border border-sage/50',
  gold: 'bg-gradient-to-r from-gold to-gold-dark text-white shadow-sm',
  teal: 'bg-teal text-white shadow-sm',
  apothecary: 'bg-apothecary text-white shadow-sm',
  charcoal: 'bg-charcoal text-gold border border-gold/30 shadow-sm',
}

type OfferCardTheme = {
  cardDefault: string
  cardSelected: string
  radioDefault: string
  radioSelected: string
  price: string
  volumePill: string
  savings: string
  shipping: string
  savingsBanner: string
}

const MOLIEN_OFFER_THEMES: Record<number, OfferCardTheme> = {
  1: {
    cardDefault:
      'border-sage/60 bg-gradient-to-l from-mint-clean via-white to-mist hover:border-teal/50',
    cardSelected:
      'border-teal bg-gradient-to-l from-teal/12 via-mist to-white shadow-lg shadow-teal/20 ring-2 ring-teal/15',
    radioDefault: 'border-teal/35 bg-white',
    radioSelected: 'border-teal bg-teal shadow-sm shadow-teal/30',
    price: 'text-teal-dark',
    volumePill: 'bg-teal/10 text-teal-dark ring-1 ring-teal/15',
    savings: 'text-teal-dark',
    shipping: 'bg-teal/12 text-teal-dark ring-1 ring-teal/15',
    savingsBanner: 'bg-teal/10 text-teal-dark',
  },
  2: {
    cardDefault:
      'border-gold/45 bg-gradient-to-l from-amber-50/95 via-ivory to-gold/8 hover:border-gold/70',
    cardSelected:
      'border-gold bg-gradient-to-l from-gold/18 via-amber-50/90 to-ivory shadow-xl shadow-gold/25 ring-2 ring-gold/25',
    radioDefault: 'border-gold/50 bg-white',
    radioSelected: 'border-gold bg-gold shadow-sm shadow-gold/35',
    price: 'text-apothecary-dark',
    volumePill: 'bg-gold/15 text-gold-dark ring-1 ring-gold/25',
    savings: 'text-gold-dark font-extrabold',
    shipping: 'bg-gold/15 text-gold-dark ring-1 ring-gold/25',
    savingsBanner: 'bg-gold/12 text-gold-dark',
  },
  3: {
    cardDefault:
      'border-charcoal/15 bg-gradient-to-l from-charcoal/[0.04] via-ivory to-gold/10 hover:border-charcoal/30',
    cardSelected:
      'border-charcoal/70 bg-gradient-to-l from-charcoal/10 via-ivory to-gold/15 shadow-xl shadow-charcoal/15 ring-2 ring-gold/20',
    radioDefault: 'border-charcoal/25 bg-white',
    radioSelected: 'border-charcoal bg-charcoal shadow-sm shadow-charcoal/30',
    price: 'text-charcoal',
    volumePill: 'bg-charcoal/8 text-charcoal ring-1 ring-charcoal/10',
    savings: 'text-gold-dark font-extrabold',
    shipping: 'bg-charcoal text-gold ring-1 ring-gold/20',
    savingsBanner: 'bg-gradient-to-l from-charcoal/10 to-gold/10 text-charcoal',
  },
}

function getOfferTheme(productSlug: string, qty: number): OfferCardTheme | null {
  if (productSlug !== 'molien-drops') return null
  return MOLIEN_OFFER_THEMES[qty] ?? null
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
      {(product.slug === 'herbal-lung-spray') && (
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/10 to-amber-50/80 px-4 py-3.5">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm font-bold leading-relaxed text-charcoal/80">
            <span className="text-charcoal">صدق اللي جرب — عبوة وحدة تعطيك طعم بس!</span>{' '}
            الكتمة وبلغم السنين ما يبي يوم واحد، يبي روتين يرافقك. عبوتين فما فوق تضمن إنك ما
            توقف وتشوف فرق حقيقي — 30 مل · 60 مل · 90 مل.
          </p>
        </div>
      )}

      {product.slug === 'molien-drops' && (
        <div className="flex items-start gap-3 rounded-2xl border border-teal/25 bg-gradient-to-l from-teal/8 via-mist to-gold/10 px-4 py-3.5">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
          <p className="text-sm font-bold leading-relaxed text-charcoal/80">
            <span className="text-teal-dark">ليش أغلب العملاء يختارون عبوتين أو أكثر؟</span>{' '}
            تنظيف الرئة من جوّا يبي استمرار — عبوتين تثبت النتيجة شهرين، و3 عبوات تعطيك كورس
            كامل بأفضل توفير وشحن مجاني.
          </p>
        </div>
      )}

      <p className="text-sm font-semibold text-charcoal/70">اختر كميتك:</p>

      <div className="flex flex-col gap-2.5 sm:gap-3">
        {offers.map((offer, idx) => {
          const isSelected = idx === selectedIdx
          const perUnit = Math.round(offer.price / offer.qty)
          const qtyLabel = offer.qtyLabel ?? DEFAULT_QTY_LABELS[offer.qty]
          const theme = getOfferTheme(product.slug, offer.qty)

          return (
            <button
              key={offer.qty}
              onClick={() => setSelectedIdx(idx)}
              className={cn(
                'relative w-full rounded-2xl border-2 p-3.5 text-right transition-all duration-200 sm:p-4',
                theme
                  ? isSelected
                    ? cn(theme.cardSelected, 'scale-[1.01]')
                    : theme.cardDefault
                  : isSelected
                    ? 'border-teal bg-teal/5 shadow-md'
                    : 'border-sage/40 bg-white hover:border-teal/40',
              )}
              aria-pressed={isSelected}
            >
              {product.slug === 'molien-drops' && offer.qty === 2 && (
                <span className="pointer-events-none absolute -top-2.5 left-4 rounded-full bg-gradient-to-r from-gold to-gold-dark px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-md">
                  ⭐ الأكثر طلباً
                </span>
              )}

              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    theme
                      ? isSelected
                        ? theme.radioSelected
                        : theme.radioDefault
                      : isSelected
                        ? 'border-teal bg-teal'
                        : 'border-sage/60 bg-white',
                  )}
                >
                  {isSelected && (
                    <Check
                      className={cn(
                        'h-3.5 w-3.5 stroke-[3]',
                        offer.qty === 3 && product.slug === 'molien-drops'
                          ? 'text-gold'
                          : 'text-white',
                      )}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col gap-2 sm:mb-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-base font-bold text-charcoal sm:text-[17px]">
                          {qtyLabel}
                        </span>
                        {offer.volumeLabel && (
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-[10px] font-bold sm:text-[11px]',
                              theme?.volumePill ??
                                'bg-mist text-teal-dark',
                            )}
                          >
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
                        <p
                          className={cn(
                            'text-lg font-extrabold sm:text-xl',
                            theme?.price ?? 'text-teal',
                          )}
                        >
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
                      <span
                        className={cn(
                          'text-[11px] font-semibold sm:text-xs',
                          theme?.savings ?? 'text-gold',
                        )}
                      >
                        وفّر {offer.savings} ريال
                      </span>
                    )}
                    {offer.qty > 1 && (
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold sm:text-[11px]',
                          theme?.shipping ?? 'bg-teal/10 text-teal',
                        )}
                      >
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
        <div
          className={cn(
            'flex items-center justify-center rounded-xl px-3 py-2.5 sm:px-4',
            getOfferTheme(product.slug, selected.qty)?.savingsBanner ??
              'bg-gold/10 text-gold',
          )}
        >
          <span className="text-center text-xs font-bold sm:text-sm">
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
