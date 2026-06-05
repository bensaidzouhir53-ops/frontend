'use client'

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ArrowLeft, Check, ShoppingCart, Star, Truck } from 'lucide-react'
import type { Product } from '@/types'
import { getDefaultOffer, getOffersForProduct } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

interface HomeProductCardProps {
  product: Product
  className?: string
}

export default function HomeProductCard({ product, className }: HomeProductCardProps) {
  const offers = getOffersForProduct(product.slug)
  const basePrice = offers[0].price
  const defaultOffer = getDefaultOffer(product.slug)
  const { addItem, openCart } = useCartStore()

  const displayTitle = product.cardTitleAr ?? product.nameAr
  const qtyLabels: Record<number, string> = { 1: 'قطعة واحدة', 2: 'قطعتان', 3: '3 قطع' }
  const qtyLabel = defaultOffer.qtyLabel ?? qtyLabels[defaultOffer.qty] ?? `${defaultOffer.qty} قطع`

  const handleAddToCart = () => {
    addItem(product, defaultOffer.qty, defaultOffer.price)
    openCart()
    trackAddToCart({
      value: defaultOffer.price,
      content_ids: [product.slug],
      event_id: generateEventId(),
    })
  }

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-sage/25 bg-white shadow-lg shadow-teal/5 transition-all duration-300 hover:-translate-y-1 hover:border-teal/25 hover:shadow-xl hover:shadow-teal/10 md:flex-row',
        className,
      )}
      dir="rtl"
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] shrink-0 overflow-hidden bg-gradient-to-br from-mist to-teal-light/10 md:aspect-auto md:w-[44%] lg:w-[42%]"
      >
        <img
          src={product.image}
          alt={displayTitle}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/20 via-transparent to-transparent" />

        <div className="absolute right-4 top-4">
          <span className="inline-flex max-w-[200px] items-center rounded-full bg-gold px-3 py-1.5 text-[11px] font-extrabold leading-snug text-white shadow-lg">
            {defaultOffer.badge}
          </span>
        </div>

        {(defaultOffer.savings ?? 0) > 0 && (
          <div className="absolute bottom-4 right-4 left-4 flex items-center justify-center gap-1.5 rounded-xl bg-teal-dark/85 px-3 py-2 text-[11px] font-bold text-white backdrop-blur-sm">
            <Truck className="h-3.5 w-3.5 text-gold" />
            شحن مجاني مع العرض المختار
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 md:p-6 lg:p-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
            ))}
            <span className="mr-1.5 text-xs font-bold text-charcoal/45">4.9</span>
          </div>
          <span className="rounded-full bg-teal/10 px-2.5 py-1 text-[10px] font-bold text-teal-dark">
            SFDA ✓
          </span>
        </div>

        <Link href={`/products/${product.slug}`} className="group/title">
          <h3 className="mb-2 text-xl font-extrabold leading-snug text-charcoal transition-colors group-hover/title:text-teal md:text-2xl">
            {displayTitle}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-charcoal/65 md:text-[15px]">
          {product.shortDescAr}
        </p>

        <ul className="mb-5 space-y-2">
          {product.benefits.slice(0, 2).map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-right">
              <span className="min-w-0 flex-1 text-xs font-semibold leading-relaxed text-charcoal/70 md:text-sm">
                {benefit}
              </span>
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10">
                <Check className="h-3 w-3 text-teal" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>

        {/* Offer + price */}
        <div className="mt-auto rounded-2xl border border-teal/10 bg-gradient-to-l from-mist/80 to-white p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-teal/10 px-2.5 py-1 text-xs font-bold text-teal-dark">
              {qtyLabel}
            </span>
            {defaultOffer.volumeLabel && (
              <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-charcoal/55 ring-1 ring-sage/30">
                {defaultOffer.volumeLabel}
              </span>
            )}
            {(defaultOffer.savings ?? 0) > 0 && (
              <span className="rounded-lg bg-gold/15 px-2.5 py-1 text-xs font-extrabold text-gold-dark">
                وفّر {defaultOffer.savings} ريال
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-teal md:text-[2rem]">
                {defaultOffer.price}
              </span>
              <span className="text-sm font-bold text-charcoal/50">ريال</span>
              {(defaultOffer.savings ?? 0) > 0 && (
                <span className="text-sm font-medium text-charcoal/35 line-through">
                  {basePrice * defaultOffer.qty} ريال
                </span>
              )}
            </div>
            <p className="text-[11px] font-medium text-charcoal/45">
              الدفع عند الاستلام
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-teal/25 transition-all hover:bg-teal-dark active:scale-[0.98]"
            aria-label={`اطلب ${displayTitle}`}
          >
            <ShoppingCart className="h-4 w-4" />
            اطلب الآن — {defaultOffer.price} ريال
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-teal/20 bg-white px-4 py-3.5 text-sm font-bold text-teal transition-colors hover:border-teal hover:bg-teal/5"
          >
            تفاصيل المنتج
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
