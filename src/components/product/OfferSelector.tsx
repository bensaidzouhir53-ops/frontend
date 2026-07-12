'use client'

import { useState } from 'react'
import { ShoppingCart, Truck } from 'lucide-react'
import type { Product, Offer } from '@/types'
import { getOffersForProduct, getOfferOriginalPrice } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

interface OfferSelectorProps {
  product: Product
  className?: string
}

type RibbonVariant = NonNullable<Offer['ribbonVariant']>

function formatSar(amount: number) {
  return `${amount} ر.س`
}

function OfferRadio({ selected }: { selected: boolean }) {
  return (
    <div
      className={cn(
        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-[22px] sm:w-[22px]',
        selected ? 'border-teal bg-teal' : 'border-charcoal/20 bg-white',
      )}
      aria-hidden="true"
    >
      {selected && <div className="h-1.5 w-1.5 rounded-full bg-white shadow-sm sm:h-2 sm:w-2" />}
    </div>
  )
}

function FloatingRibbon({
  text,
  variant,
}: {
  text: string
  variant: RibbonVariant | 'stage' | 'package'
}) {
  const styles: Record<string, string> = {
    value: 'bg-offer-amber text-white shadow-[0_2px_8px_rgba(198,138,59,0.35)]',
    stage: 'bg-teal text-white shadow-[0_2px_8px_rgba(15,118,110,0.25)]',
    package: 'bg-teal-dark text-white shadow-[0_2px_8px_rgba(15,118,110,0.3)]',
    popular: 'bg-teal-dark text-white shadow-[0_2px_8px_rgba(15,118,110,0.3)]',
  }

  return (
    <span
      className={cn(
        'rounded-md px-2.5 py-0.5 text-[9px] font-bold tracking-wide whitespace-nowrap sm:text-[10px]',
        styles[variant],
      )}
    >
      {text}
    </span>
  )
}

function OfferBadgePill({
  text,
  selected,
  offerQty,
}: {
  text: string
  selected: boolean
  offerQty: number
}) {
  const isPackage = text.startsWith('باقة ')
  const isTrial = text === 'للتجربة بس'
  const isShipping = text === 'شحن مجاني'
  const isSpecial = text === 'خصم خاص'
  const isBestTier = offerQty === 3

  let className = 'bg-white text-charcoal/70 border border-border/80'

  if (isSpecial) {
    className = selected
      ? 'bg-offer-amber text-white border border-offer-amber'
      : 'bg-offer-amber-light text-offer-amber border border-offer-amber-border'
  } else if (isPackage) {
    className = selected
      ? 'bg-teal-dark text-white border border-teal-dark'
      : 'bg-teal/10 text-teal border border-teal/25'
  } else if (selected) {
    if (isTrial) className = 'bg-charcoal/8 text-charcoal/80 border border-charcoal/15'
    else if (isShipping) className = 'bg-teal/10 text-teal border border-teal/20'
    else if (isBestTier) className = 'bg-teal text-white border border-teal'
    else className = 'bg-offer-amber text-white border border-offer-amber'
  } else if (isShipping) {
    className = 'bg-teal/5 text-teal/80 border border-teal/15'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold leading-none shadow-sm sm:text-[10px]',
        className,
      )}
    >
      {text}
    </span>
  )
}

function getCardBadges(offer: Offer): string[] {
  if (offer.cardBadges?.length) return offer.cardBadges
  const badges: string[] = []
  if (offer.badge) badges.push(offer.badge)
  if (offer.freeShipping) badges.push('شحن مجاني')
  return badges
}

function OfferCard({
  offer,
  selected,
  onSelect,
  productSlug,
}: {
  offer: Offer
  selected: boolean
  onSelect: () => void
  productSlug: string
}) {
  const originalPrice = getOfferOriginalPrice(productSlug, offer)
  const hasSavings = (offer.savings ?? 0) > 0 && offer.qty > 1
  const perUnit = Math.round(offer.price / offer.qty)
  const badges = getCardBadges(offer)
  const hasRibbon = Boolean(offer.ribbonBadge || offer.stageRibbonBadge)
  const title = offer.cardTitle ?? offer.qtyLabel ?? `${offer.qty} قطع`

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'relative w-full rounded-xl px-3 text-right transition-all duration-150 sm:px-4',
        hasRibbon ? 'pt-4 pb-3 sm:py-3.5' : 'py-3 sm:py-3.5',
        selected
          ? 'border-2 border-teal bg-pine-light/50 shadow-[0_2px_12px_rgba(15,118,110,0.08)]'
          : 'border border-border/70 bg-white hover:border-teal/25',
      )}
    >
      {hasRibbon && (
        <div className="absolute top-0 z-10 start-3 flex -translate-y-1/2 items-center gap-1 sm:start-4 sm:gap-1.5">
          {offer.ribbonBadge && (
            <FloatingRibbon
              text={offer.ribbonBadge}
              variant={offer.ribbonVariant ?? (offer.qty === 3 ? 'value' : 'popular')}
            />
          )}
          {offer.stageRibbonBadge && (
            <FloatingRibbon
              text={offer.stageRibbonBadge}
              variant={offer.qty === 3 ? 'package' : 'stage'}
            />
          )}
        </div>
      )}

      <div className="flex items-start gap-2.5 sm:gap-3">
        <OfferRadio selected={selected} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="min-w-0 flex-1 text-[13px] font-bold leading-tight text-charcoal sm:text-[15px]">
              {title}
            </p>
            <div className="flex shrink-0 items-baseline gap-1.5">
              {hasSavings && (
                <span className="text-[10px] font-medium text-charcoal/35 line-through tabular-nums sm:text-xs">
                  {formatSar(originalPrice)}
                </span>
              )}
              <span
                className={cn(
                  'text-base font-bold tabular-nums leading-none sm:text-lg',
                  selected ? 'text-teal' : 'text-charcoal',
                )}
              >
                {formatSar(offer.price)}
              </span>
            </div>
          </div>

          {badges.length > 0 && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {badges.map((badge) => (
                <OfferBadgePill
                  key={badge}
                  text={badge}
                  selected={selected}
                  offerQty={offer.qty}
                />
              ))}
            </div>
          )}

          {selected && (offer.cardSubtitleLead || offer.cardSubtitle) && (
            <p className="mt-1.5 text-[11px] leading-relaxed text-charcoal/55 sm:text-xs">
              {offer.cardSubtitleLead && (
                <span className="font-bold text-charcoal/75">{offer.cardSubtitleLead} </span>
              )}
              {offer.cardSubtitle}
            </p>
          )}

          <div className="mt-1.5 flex items-center justify-between gap-2">
            <p className="text-[10px] font-medium tabular-nums text-charcoal/45 sm:text-[11px]">
              {formatSar(perUnit)} / للعبوة
            </p>
            {hasSavings && (
              <span className="inline-flex shrink-0 items-center rounded-md border border-offer-amber-border bg-offer-amber-light px-2 py-0.5 text-[10px] font-bold text-offer-amber sm:text-[11px]">
                وفر {offer.savings} ر.س
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

function FreeShippingBanner() {
  return (
    <div
      dir="rtl"
      className="w-full rounded-2xl border border-teal/15 bg-gradient-to-l from-white via-pine-light to-offer-selected px-3.5 py-3 shadow-[0_2px_14px_rgba(15,118,110,0.07)] sm:px-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 ring-1 ring-teal/15">
          <Truck className="h-5 w-5 text-teal" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1 text-start">
          <p className="text-[13px] font-bold leading-snug text-charcoal sm:text-sm">
            شحن مجاني — 2-4 أيام داخل السعودية
          </p>
          <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-charcoal/55 sm:text-xs">
            العبوة الأولى تعطيك النتيجة. العبوتين والثلاث تثبّتها — وفّر حتى 208 ر.س
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OfferSelector({ product, className }: OfferSelectorProps) {
  const offers = getOffersForProduct(product.slug)
  const defaultIdx = offers.findIndex((o) => o.isDefault)
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx >= 0 ? defaultIdx : 1)
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
    <div
      id="offer"
      data-offers-anchor
      className={cn('flex flex-col gap-3', className)}
      dir="rtl"
    >
      <FreeShippingBanner />

      <div className="rounded-2xl border border-border/60 bg-offer-panel p-3 sm:p-4">
        <p className="mb-2.5 text-sm font-bold text-charcoal/80">اختر العرض المناسب لك:</p>
        <div className="space-y-2">
          {offers.map((offer, idx) => (
            <OfferCard
              key={offer.qty}
              offer={offer}
              selected={idx === selectedIdx}
              onSelect={() => setSelectedIdx(idx)}
              productSlug={product.slug}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-teal px-4 py-3.5 text-base font-bold text-white shadow-[0_4px_18px_rgba(15,118,110,0.28)] transition-all hover:bg-teal-dark active:scale-[0.99]"
      >
        <ShoppingCart className="h-5 w-5 shrink-0" />
        <span>أكمل الطلب الآن — الدفع عند الاستلام</span>
      </button>

      <p className="text-center text-[11px] font-medium text-charcoal/50">
        ضمان استرجاع 30 يوم · بدون دفع مقدّم
      </p>
    </div>
  )
}
