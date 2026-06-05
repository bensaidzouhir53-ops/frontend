'use client'

/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star, Eye } from 'lucide-react'
import type { Product } from '@/types'
import { getOffersForProduct, getDefaultOffer } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const offers = getOffersForProduct(product.slug)
  const basePrice = offers[0].price
  const defaultOffer = getDefaultOffer(product.slug)
  const { addItem, openCart } = useCartStore()

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
        'group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-card-hover',
        className,
      )}
      dir="rtl"
    >
      {/* Image — links to product page */}
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-mist">
        <img
          src={product.image}
          alt={product.nameAr}
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
        />
        {/* Badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-white shadow">
            {defaultOffer.badge}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-teal/0 transition-colors group-hover:bg-teal/10">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-teal opacity-0 shadow transition-opacity group-hover:opacity-100">
            <Eye className="h-3.5 w-3.5" />
            عرض المنتج
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Stars placeholder */}
        <div className="mb-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
          ))}
          <span className="mr-1 text-xs text-charcoal/50">(+120)</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-snug text-charcoal hover:text-teal transition-colors">
            {product.nameAr}
          </h3>
        </Link>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-charcoal/60">
          {product.shortDescAr}
        </p>

        {/* Price */}
        <div className="mb-3 mt-auto flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-teal">
            {defaultOffer.price} ريال
          </span>
          <span className="text-sm text-charcoal/40 line-through">
            {basePrice * defaultOffer.qty} ريال
          </span>
          {defaultOffer.savings && defaultOffer.savings > 0 && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold">
              وفّر {defaultOffer.savings} ريال
            </span>
          )}
        </div>

        {/* CTAs — view product + add to cart */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-teal py-2.5 text-sm font-bold text-teal transition-colors hover:bg-teal hover:text-white"
          >
            <Eye className="h-3.5 w-3.5" />
            عرض
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-dark active:scale-[0.98]"
            aria-label={`أضف ${product.nameAr} للسلة`}
          >
            <ShoppingCart className="h-4 w-4" />
            اطلب الآن
          </button>
        </div>
      </div>
    </article>
  )
}
