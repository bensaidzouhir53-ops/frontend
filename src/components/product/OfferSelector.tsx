'use client'

import { useState } from 'react'
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  Check,
  Sparkles,
  TrendingUp,
  Crown,
  Flame,
  ArrowUp,
} from 'lucide-react'
import type { Product, Offer } from '@/types'
import {
  getOffersForProduct,
  getOfferOriginalPrice,
  getMaxOfferSavings,
  REGULAR_UNIT_PRICE,
} from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

interface OfferSelectorProps {
  product: Product
  className?: string
}

function BottleStack({ count, active }: { count: number; active: boolean }) {
  return (
    <div className="flex items-end justify-center gap-0.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-3 rounded-t-sm border border-b-0 sm:w-3.5',
            active ? 'border-teal/40 bg-teal/20' : 'border-sage/50 bg-sage/25',
          )}
          style={{ height: `${18 + i * 6}px` }}
        />
      ))}
    </div>
  )
}

function OfferCard({
  offer,
  isSelected,
  onSelect,
  productSlug,
}: {
  offer: Offer
  isSelected: boolean
  onSelect: () => void
  productSlug: string
}) {
  const perUnit = Math.round(offer.price / offer.qty)
  const originalPrice = getOfferOriginalPrice(productSlug, offer)
  const hasSavings = (offer.savings ?? 0) > 0
  const isPopular = offer.isDefault
  const isBest = offer.isBestValue

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl text-right transition-all duration-300',
        isBest && 'sm:scale-[1.02]',
        isSelected
          ? isBest
            ? 'ring-2 ring-gold shadow-xl shadow-gold/20'
            : isPopular
              ? 'ring-2 ring-teal shadow-lg shadow-teal/15'
              : 'ring-2 ring-teal/70 shadow-md'
          : 'ring-1 ring-warm-border/80 hover:ring-teal/30 hover:shadow-md',
      )}
    >
      {/* Ribbon */}
      {offer.ribbon && (
        <div
          className={cn(
            'flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold sm:text-[11px]',
            isBest
              ? 'bg-gradient-to-l from-charcoal via-apothecary to-teal-dark text-gold'
              : isPopular
                ? 'bg-gradient-to-l from-gold to-gold-dark text-charcoal'
                : 'bg-mist text-charcoal/60',
          )}
        >
          {isBest && <Crown className="h-3 w-3 shrink-0" />}
          {isPopular && !isBest && <Flame className="h-3 w-3 shrink-0" />}
          {offer.ribbon}
        </div>
      )}

      <div
        className={cn(
          'relative p-3.5 sm:p-4',
          isSelected
            ? isBest
              ? 'bg-gradient-to-bl from-gold/10 via-offer-selected to-mist'
              : 'bg-offer-selected'
            : isBest
              ? 'bg-gradient-to-bl from-ivory via-white to-gold/5'
              : 'bg-white',
        )}
      >
        {isBest && (
          <div
            className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-gold/15 blur-2xl"
            aria-hidden="true"
          />
        )}

        <div className="relative flex gap-3">
          {/* Radio + bottles */}
          <div className="flex shrink-0 flex-col items-center gap-2 pt-0.5">
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all',
                isSelected
                  ? isBest
                    ? 'border-gold bg-gold'
                    : 'border-teal bg-teal'
                  : 'border-sage/50 bg-white group-hover:border-teal/40',
              )}
            >
              {isSelected && (
                <Check
                  className={cn('h-3.5 w-3.5', isBest ? 'text-charcoal' : 'text-white')}
                  strokeWidth={3}
                />
              )}
            </div>
            <BottleStack count={offer.qty} active={isSelected} />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-base font-extrabold text-charcoal sm:text-lg">
                    {offer.qtyLabel}
                  </span>
                  {offer.volumeLabel && (
                    <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-teal-dark ring-1 ring-teal/15 sm:text-[11px]">
                      {offer.volumeLabel}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold sm:text-[11px]',
                      isBest
                        ? 'bg-apothecary text-white'
                        : isPopular
                          ? 'bg-gold/20 text-gold-dark'
                          : 'bg-sage/30 text-teal-dark',
                    )}
                  >
                    {offer.badge}
                  </span>
                  {offer.percentOff != null && offer.percentOff > 0 && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-teal px-2 py-0.5 text-[10px] font-extrabold text-white sm:text-[11px]">
                      <TrendingUp className="h-3 w-3" />
                      خصم {offer.percentOff}%
                    </span>
                  )}
                </div>
              </div>

              {/* Price block */}
              <div className="flex shrink-0 flex-col items-end">
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={cn(
                      'text-2xl font-black tabular-nums sm:text-[1.75rem]',
                      isBest ? 'text-apothecary' : 'text-teal-dark',
                    )}
                  >
                    {offer.price}
                  </span>
                  <span className="text-xs font-bold text-charcoal/45">ر.س</span>
                </div>
                {hasSavings && (
                  <span className="text-[11px] text-charcoal/40 line-through sm:text-xs">
                    {originalPrice} ر.س
                  </span>
                )}
                <span
                  className={cn(
                    'mt-0.5 text-[10px] font-semibold sm:text-[11px]',
                    isBest ? 'text-gold-dark' : 'text-charcoal/50',
                  )}
                >
                  {perUnit} ر.س / للعبوة
                </span>
              </div>
            </div>

            {offer.headline && (
              <p
                className={cn(
                  'mb-1.5 text-xs font-bold leading-snug sm:text-[13px]',
                  isBest ? 'text-apothecary' : isPopular ? 'text-teal-dark' : 'text-charcoal/75',
                )}
              >
                {offer.headline}
              </p>
            )}

            {offer.desc && (
              <p className="mb-2 text-[11px] leading-relaxed text-charcoal/60 sm:text-xs">
                {offer.desc}
              </p>
            )}

            {offer.bullets && offer.bullets.length > 0 && (
              <ul className="space-y-1">
                {offer.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-1.5 text-[10px] leading-snug text-charcoal/70 sm:text-[11px]"
                  >
                    <Check
                      className={cn(
                        'mt-0.5 h-3 w-3 shrink-0',
                        isBest ? 'text-gold-dark' : 'text-teal',
                      )}
                      strokeWidth={3}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {hasSavings && (
              <div
                className={cn(
                  'mt-2.5 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-extrabold sm:text-[11px]',
                  isBest
                    ? 'bg-gold/20 text-gold-dark'
                    : 'bg-teal/10 text-teal-dark',
                )}
              >
                <Sparkles className="h-3 w-3 shrink-0" />
                وفّر {offer.savings} ر.س مع هذا الخيار
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function OfferSelector({ product, className }: OfferSelectorProps) {
  const offers = getOffersForProduct(product.slug)
  const maxSavings = getMaxOfferSavings(product.slug)
  const defaultIdx = offers.findIndex((o) => o.isDefault)
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx >= 0 ? defaultIdx : 1)
  const { addItem, openCart } = useCartStore()

  const selected = offers[selectedIdx] ?? offers[1]
  const bestValueOffer = offers.find((o) => o.isBestValue) ?? offers[offers.length - 1]
  const popularOffer = offers.find((o) => o.isDefault) ?? offers[1]
  const upgradeOffer = bestValueOffer
  const showUpgradeNudge = selected.qty < bestValueOffer.qty

  const handleAddToCart = () => {
    addItem(product, selected.qty, selected.price)
    openCart()
    trackAddToCart({
      value: selected.price,
      content_ids: [product.slug],
      event_id: generateEventId(),
    })
  }

  const upgradeExtra =
    showUpgradeNudge && upgradeOffer
      ? upgradeOffer.price - selected.price
      : 0

  return (
    <div className={cn('flex flex-col gap-3 sm:gap-4', className)} dir="rtl">
      {/* Urgency + social proof header */}
      <div className="overflow-hidden rounded-2xl border border-teal/20 shadow-sm">
        <div className="flex items-center justify-center gap-2 bg-gradient-to-l from-teal-dark to-teal px-4 py-2">
          <Flame className="h-4 w-4 shrink-0 animate-pulse text-gold" />
          <p className="text-xs font-extrabold text-white sm:text-sm">
            الكمية محدودة — 87% من الطلبات اليوم على باقة شهرين أو أكثر
          </p>
        </div>
        <div className="bg-gradient-to-l from-offer-selected via-mist to-ivory px-4 py-3">
          <p className="text-sm font-extrabold leading-snug text-teal-dark sm:text-[15px]">
            🎯 العبوة الأولى تعطيك النتيجة —{' '}
            <span className="text-apothecary">العبوتين والثلاث تثبّتها للأبد</span>
            {maxSavings > 0 && (
              <span className="text-gold-dark"> · وفّر حتى {maxSavings} ر.س</span>
            )}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-teal/15 bg-white px-2.5 py-1 text-[10px] font-bold text-teal-dark sm:text-[11px]">
              <Truck className="h-3 w-3" />
              شحن مجاني
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-teal/15 bg-white px-2.5 py-1 text-[10px] font-bold text-teal-dark sm:text-[11px]">
              <ShieldCheck className="h-3 w-3" />
              الدفع عند الاستلام
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-bold text-gold-dark sm:text-[11px]">
              <Crown className="h-3 w-3" />
              3 علب = أقل سعر ({Math.round(bestValueOffer.price / bestValueOffer.qty)} ر.س/عبوة)
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm font-extrabold text-charcoal">
        اختر باقتك —{' '}
        <span className="font-bold text-charcoal/50">كل ما زادت، وفّرت أكثر</span>
      </p>

      <div className="flex flex-col gap-3">
        {offers.map((offer, idx) => (
          <OfferCard
            key={offer.qty}
            offer={offer}
            isSelected={idx === selectedIdx}
            onSelect={() => setSelectedIdx(idx)}
            productSlug={product.slug}
          />
        ))}
      </div>

      {/* AOV upgrade nudge */}
      {showUpgradeNudge && upgradeOffer && upgradeExtra > 0 && (
        <button
          type="button"
          onClick={() => setSelectedIdx(offers.findIndex((o) => o.qty === bestValueOffer.qty))}
          className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-gold/50 bg-gradient-to-l from-gold/10 via-gold/5 to-transparent p-3.5 text-right transition-all hover:border-gold hover:bg-gold/15 sm:p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20">
            <ArrowUp className="h-5 w-5 text-gold-dark" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-gold-dark sm:text-sm">
              💡 نصيحة: بـ {upgradeExtra} ر.س إضافية فقط — خذ الكورس الكامل (3 علب)
            </p>
            <p className="mt-0.5 text-[11px] text-charcoal/65 sm:text-xs">
              وفّر {upgradeOffer.savings} ر.س بدل {REGULAR_UNIT_PRICE * 3} ر.س · أقل سعر للعبوة (
              {Math.round(upgradeOffer.price / 3)} ر.س)
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-gold px-3 py-1.5 text-[10px] font-extrabold text-charcoal sm:text-[11px]">
            ترقية ←
          </span>
        </button>
      )}

      {/* Selected savings recap */}
      {(selected.savings ?? 0) > 0 ? (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-gold/25 bg-gradient-to-l from-gold/15 to-gold/5 px-4 py-3">
          <Sparkles className="h-4 w-4 shrink-0 text-gold-dark" />
          <span className="text-center text-xs font-extrabold text-gold-dark sm:text-sm">
            🎉 اختيار ممتاز! وفّر {selected.savings} ر.س — {selected.qtyLabel} بـ {selected.price} ر.س
            فقط
          </span>
        </div>
      ) : (
        <div className="rounded-xl border border-teal/15 bg-mist/60 px-4 py-2.5 text-center">
          <p className="text-[11px] font-semibold text-charcoal/60 sm:text-xs">
            💡 نصيحة: باقة {popularOffer.qtyLabel} توفر {popularOffer.savings} ر.س — أغلب عملائنا يختارونها
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        className={cn(
          'flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl px-4 py-4 text-base font-extrabold text-white shadow-xl transition-all active:scale-[0.98] sm:text-lg',
          selected.isBestValue
            ? 'bg-gradient-to-l from-charcoal via-apothecary to-teal-dark shadow-apothecary/30 hover:shadow-2xl'
            : 'bg-gradient-to-l from-teal-dark to-teal shadow-teal/30 hover:from-apothecary hover:to-teal-dark',
        )}
      >
        <ShoppingCart className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
        <span className="leading-snug">
          {selected.isBestValue
            ? `اطلب الكورس الكامل — ${selected.price} ر.س · وفّر ${selected.savings} ر.س`
            : selected.isDefault
              ? `اطلب الآن — ${selected.qtyLabel} · ${selected.price} ر.س`
              : `أكمل الطلب — ${selected.price} ر.س · الدفع عند الاستلام`}
        </span>
      </button>

      <p className="text-center text-[11px] font-medium text-charcoal/50 sm:text-xs">
        توصيل 2-4 أيام لكل السعودية · ضمان استرجاع 30 يوم · بدون دفع مقدّم
      </p>
    </div>
  )
}
