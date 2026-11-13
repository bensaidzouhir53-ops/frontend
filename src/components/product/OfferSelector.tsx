'use client'

import { useState } from 'react'
import { ShieldCheck, Truck } from 'lucide-react'
import type { Product, Offer } from '@/types'
import {
  getOffersForProduct,
  getOfferOriginalPrice,
  getMaxOfferSavings,
} from '@/lib/products'
import QuickOrderForm from '@/components/product/QuickOrderForm'
import { cn } from '@/lib/utils'

interface OfferSelectorProps {
  product: Product
  className?: string
  dark?: boolean
}

type RibbonVariant = NonNullable<Offer['ribbonVariant']>

type OfferTierStyle = {
  price: string
  priceMuted: string
  priceBg: string
  priceBgSelected: string
  currency: string
  border: string
  borderSelected: string
  selectedBg: string
  savings: string
  radioSelected: string
  volumeBadge: string
  volumeBadgeSelected: string
}

const OFFER_TIER_STYLES: Record<number, OfferTierStyle> = {
  1: {
    price: 'text-teal-dark',
    priceMuted: 'text-teal/80',
    priceBg: 'bg-teal/8',
    priceBgSelected: 'bg-teal/12',
    currency: 'text-teal/75',
    border: 'border-teal/20',
    borderSelected: 'border-teal',
    selectedBg: 'bg-teal/[0.06]',
    savings: 'border-teal/20 bg-teal/10 text-teal-dark',
    radioSelected: 'border-teal bg-teal',
    volumeBadge:
      'border border-sage/50 bg-mist text-teal/70 shadow-sm',
    volumeBadgeSelected:
      'border border-teal/35 bg-teal/10 text-teal-dark shadow-sm',
  },
  2: {
    price: 'text-[#A66B1F]',
    priceMuted: 'text-offer-amber/80',
    priceBg: 'bg-offer-amber-light',
    priceBgSelected: 'bg-[#F5E8D0]',
    currency: 'text-offer-amber',
    border: 'border-offer-amber-border',
    borderSelected: 'border-offer-amber',
    selectedBg: 'bg-offer-amber-light/70',
    savings: 'border-offer-amber-border bg-offer-amber-light text-offer-amber',
    radioSelected: 'border-offer-amber bg-offer-amber',
    volumeBadge:
      'border border-offer-amber/40 bg-gradient-to-l from-offer-amber-light to-[#FFF8EE] text-[#A66B1F] shadow-[0_2px_8px_rgba(198,138,59,0.2)]',
    volumeBadgeSelected:
      'border border-offer-amber bg-gradient-to-l from-offer-amber to-[#B87333] text-white shadow-[0_3px_12px_rgba(198,138,59,0.35)]',
  },
  3: {
    price: 'text-apothecary-dark',
    priceMuted: 'text-apothecary/80',
    priceBg: 'bg-pine-light',
    priceBgSelected: 'bg-[#DDF0EA]',
    currency: 'text-apothecary',
    border: 'border-gold/45',
    borderSelected: 'border-apothecary',
    selectedBg: 'bg-gradient-to-l from-pine-light via-gold/10 to-pine-light/90',
    savings: 'border-gold/35 bg-gold/15 text-gold-dark',
    radioSelected: 'border-apothecary bg-apothecary',
    volumeBadge:
      'border-2 border-gold/55 bg-gradient-to-l from-gold/25 via-[#FFF9EE] to-apothecary/10 text-apothecary-dark shadow-[0_3px_14px_rgba(215,168,92,0.38)] ring-1 ring-gold/25',
    volumeBadgeSelected:
      'border-2 border-gold bg-gradient-to-l from-apothecary via-apothecary-dark to-[#062E28] text-gold shadow-[0_4px_16px_rgba(11,79,74,0.35)]',
  },
}

const DARK_OFFER_TIER_STYLE: OfferTierStyle = {
  price: 'text-gold',
  priceMuted: 'text-white/85',
  priceBg: 'bg-white/5 ring-1 ring-white/10',
  priceBgSelected: 'bg-gold/15 ring-1 ring-gold/40',
  currency: 'text-white/60',
  border: 'border-white/15',
  borderSelected: 'border-gold',
  selectedBg: 'bg-gradient-to-l from-gold/15 via-white/5 to-gold/10',
  savings: 'border-gold/40 bg-gold/15 text-gold',
  radioSelected: 'border-gold bg-gold',
  volumeBadge: 'border border-white/20 bg-white/10 text-white/85',
  volumeBadgeSelected: 'border border-gold bg-gold text-charcoal shadow-[0_3px_12px_rgba(215,168,92,0.35)]',
}

function getOfferTierStyle(qty: number, dark = false): OfferTierStyle {
  if (dark) return DARK_OFFER_TIER_STYLE
  return OFFER_TIER_STYLES[qty] ?? OFFER_TIER_STYLES[1]
}

function formatOfferPrice(amount: number) {
  return amount.toLocaleString('en-US')
}

function OfferRadio({
  selected,
  tier,
  dark = false,
}: {
  selected: boolean
  tier: OfferTierStyle
  dark?: boolean
}) {
  return (
    <div
      className={cn(
        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-[22px] sm:w-[22px]',
        selected
          ? tier.radioSelected
          : dark
            ? 'border-white/30 bg-transparent'
            : 'border-charcoal/20 bg-white',
      )}
      aria-hidden="true"
    >
      {selected && (
        <div
          className={cn(
            'h-1.5 w-1.5 rounded-full shadow-sm sm:h-2 sm:w-2',
            dark ? 'bg-charcoal' : 'bg-white',
          )}
        />
      )}
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
  dark = false,
}: {
  text: string
  selected: boolean
  offerQty: number
  dark?: boolean
}) {
  const isPackage = text.startsWith('باقة ')
  const isTrial = text === 'للتجربة بس'
  const isShipping = text === 'شحن مجاني'
  const isSpecial = text === 'خصم خاص'
  const isBestTier = offerQty === 3

  let className = 'bg-white text-charcoal/70 border border-border/80'

  if (dark) {
    className =
      selected && (isSpecial || isPackage || isBestTier)
        ? 'bg-gold text-charcoal border border-gold'
        : isShipping || isSpecial || isPackage
          ? 'bg-gold/10 text-gold border border-gold/35'
          : 'bg-white/10 text-white/80 border border-white/20'
  } else if (isSpecial) {
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
  dark = false,
}: {
  offer: Offer
  selected: boolean
  onSelect: () => void
  productSlug: string
  dark?: boolean
}) {
  const originalPrice = getOfferOriginalPrice(productSlug, offer)
  const hasSavings = (offer.savings ?? 0) > 0 && offer.qty > 1
  const perUnit = Math.round(offer.price / offer.qty)
  const badges = getCardBadges(offer)
  const hasRibbon = Boolean(offer.ribbonBadge || offer.stageRibbonBadge)
  const title = offer.cardTitle ?? offer.qtyLabel ?? `${offer.qty} قطع`
  const tier = getOfferTierStyle(offer.qty, dark)

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'relative w-full rounded-xl px-3 text-right transition-all duration-150 sm:px-4',
        hasRibbon ? 'pt-4 pb-3 sm:py-3.5' : 'py-3 sm:py-3.5',
        offer.isBestValue && !selected && 'ring-1 ring-gold/35',
        selected
          ? cn(
              'border-2',
              dark
                ? 'shadow-[0_6px_24px_rgba(215,168,92,0.2)]'
                : 'shadow-[0_4px_16px_rgba(15,118,110,0.1)]',
              tier.borderSelected,
              tier.selectedBg,
            )
          : cn(
              'border',
              dark ? 'bg-white/5 hover:border-gold/40 hover:bg-white/10' : 'bg-white hover:border-teal/25',
              tier.border,
            ),
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
        <OfferRadio selected={selected} tier={tier} dark={dark} />

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'text-[13px] font-bold leading-tight sm:text-[15px]',
              dark ? 'text-white' : 'text-charcoal',
            )}
          >
            {title}
          </p>

          {offer.volumeLabel && (
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 font-extrabold tabular-nums tracking-tight',
                  offer.qty === 3 ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-xs',
                  selected ? tier.volumeBadgeSelected : tier.volumeBadge,
                )}
              >
                {offer.volumeLabel}
              </span>
              {offer.qty === 2 && (
                <span className={cn('text-[9px] font-bold sm:text-[10px]', dark ? 'text-gold' : 'text-offer-amber')}>
                  الأكثر طلباً
                </span>
              )}
              {offer.qty === 3 && (
                <span className={cn('text-[9px] font-bold sm:text-[10px]', dark ? 'text-gold' : 'text-gold-dark')}>
                  أفضل قيمة — وفّر أكثر
                </span>
              )}
            </div>
          )}

          {badges.length > 0 && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {badges.map((badge) => (
                <OfferBadgePill
                  key={badge}
                  text={badge}
                  selected={selected}
                  offerQty={offer.qty}
                  dark={dark}
                />
              ))}
            </div>
          )}

          {selected && (offer.cardSubtitleLead || offer.cardSubtitle) && (
            <p
              className={cn(
                'mt-1.5 text-[11px] leading-relaxed sm:text-xs',
                dark ? 'text-white/65' : 'text-charcoal/55',
              )}
            >
              {offer.cardSubtitleLead && (
                <span className={cn('font-bold', dark ? 'text-white/90' : 'text-charcoal/75')}>
                  {offer.cardSubtitleLead}{' '}
                </span>
              )}
              {offer.cardSubtitle}
            </p>
          )}

          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
            <p className={cn('text-[10px] font-semibold tabular-nums sm:text-[11px]', tier.currency)}>
              {formatOfferPrice(perUnit)} ريال سعودي / للعبوة
            </p>
            {hasSavings && (
              <span
                className={cn(
                  'inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[10px] font-bold sm:text-[11px]',
                  tier.savings,
                )}
              >
                وفر {formatOfferPrice(offer.savings ?? 0)} ريال سعودي
              </span>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex shrink-0 flex-col items-center justify-center rounded-xl px-2.5 py-2 text-center sm:min-w-[92px] sm:px-3',
            selected ? tier.priceBgSelected : tier.priceBg,
          )}
        >
          {hasSavings && (
            <span
              className={cn(
                'text-[10px] font-medium line-through tabular-nums sm:text-[11px]',
                dark ? 'text-white/40' : 'text-charcoal/35',
              )}
            >
              {formatOfferPrice(originalPrice)}
            </span>
          )}
          <span
            className={cn(
              'text-xl font-extrabold tabular-nums leading-none sm:text-2xl',
              selected ? tier.price : tier.priceMuted,
            )}
          >
            {formatOfferPrice(offer.price)}
          </span>
          <span className={cn('mt-1 text-[9px] font-bold leading-tight sm:text-[10px]', tier.currency)}>
            ريال سعودي
          </span>
        </div>
      </div>
    </button>
  )
}

function FreeShippingBanner({ productSlug, dark = false }: { productSlug: string; dark?: boolean }) {
  const maxSavings = getMaxOfferSavings(productSlug)
  return (
    <div
      dir="rtl"
      className={cn(
        'w-full rounded-2xl border px-3.5 py-3 sm:px-4',
        dark
          ? 'border-gold/25 bg-gradient-to-l from-gold/10 via-white/5 to-transparent'
          : 'border-teal/15 bg-gradient-to-l from-white via-pine-light to-offer-selected shadow-[0_2px_14px_rgba(15,118,110,0.07)]',
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1',
            dark ? 'bg-gold/15 ring-gold/30' : 'bg-teal/10 ring-teal/15',
          )}
        >
          <Truck className={cn('h-5 w-5', dark ? 'text-gold' : 'text-teal')} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1 text-start">
          <p
            className={cn(
              'text-[13px] font-bold leading-snug sm:text-sm',
              dark ? 'text-white' : 'text-charcoal',
            )}
          >
            شحن مجاني — 2-4 أيام داخل السعودية
          </p>
          <p
            className={cn(
              'mt-0.5 text-[11px] font-medium leading-relaxed sm:text-xs',
              dark ? 'text-white/65' : 'text-charcoal/55',
            )}
          >
            العبوة الأولى تعطيك النتيجة. العبوتين والثلاث تثبّتها — وفّر حتى{' '}
            {maxSavings} ريال سعودي
          </p>
        </div>
      </div>
    </div>
  )
}

function OfferStockUrgency({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        'mt-3 flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5',
        dark ? 'border-red-400/30 bg-red-500/10' : 'border-red-200/80 bg-red-50/90',
      )}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
      </span>
      <p
        className={cn(
          'text-[13px] font-extrabold leading-snug sm:text-sm',
          dark ? 'text-red-300' : 'text-red-600',
        )}
      >
        أوشكت تخلص — الكمية على آخرها!
      </p>
    </div>
  )
}

export default function OfferSelector({ product, className, dark = false }: OfferSelectorProps) {
  const offers = getOffersForProduct(product.slug)
  const defaultIdx = offers.findIndex((o) => o.isDefault)
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx >= 0 ? defaultIdx : 1)

  const selected = offers[selectedIdx] ?? offers[1]

  return (
    <div
      id="offer"
      data-offers-anchor
      className={cn('flex flex-col gap-3', className)}
      dir="rtl"
    >
      <FreeShippingBanner productSlug={product.slug} dark={dark} />

      <div
        className={cn(
          'rounded-2xl border p-3 sm:p-4',
          dark ? 'border-white/10 bg-black/15 backdrop-blur-sm' : 'border-border/60 bg-offer-panel',
        )}
      >
        <p className={cn('mb-2.5 text-sm font-bold', dark ? 'text-gold' : 'text-charcoal/80')}>
          اختر العرض المناسب لك:
        </p>
        <div className={cn(dark ? 'space-y-3' : 'space-y-2')}>
          {offers.map((offer, idx) => (
            <OfferCard
              key={offer.qty}
              offer={offer}
              selected={idx === selectedIdx}
              onSelect={() => setSelectedIdx(idx)}
              productSlug={product.slug}
              dark={dark}
            />
          ))}
        </div>
        <OfferStockUrgency dark={dark} />
      </div>

      <QuickOrderForm product={product} offer={selected} dark={dark} />

      <div
        className={cn(
          'mt-2 flex flex-wrap items-center justify-center gap-4 text-[10.5px] font-bold sm:text-xs',
          dark ? 'text-white/80' : 'text-charcoal/65',
        )}
      >
        <div className="flex items-center gap-1.5">
          <ShieldCheck className={cn('h-3.5 w-3.5', dark ? 'text-gold' : 'text-teal')} />
          مصرح SFDA
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🇸🇦</span>
          صنع في السعودية
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className={cn('h-3.5 w-3.5', dark ? 'text-gold' : 'text-teal')} />
          استرجاع 30 يوم
        </div>
      </div>
    </div>
  )
}
