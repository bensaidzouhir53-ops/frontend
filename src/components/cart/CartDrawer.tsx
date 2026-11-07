'use client'

import { Drawer } from 'vaul'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import {
  X,
  ShoppingCart,
  Trash2,
  Shield,
  Truck,
  RotateCcw,
  Package,
  BadgePercent,
  Plus,
  Check,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { getProductBySlug, getOfferForProductQty, getDefaultOffer } from '@/lib/products'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'
import CheckoutModal from '@/components/checkout/CheckoutModal'

const CHECKOUT_STEPS = ['السلة', 'بياناتك', 'تأكيد الطلب']

function CheckoutSteps() {
  return (
    <div className="flex items-center gap-2 px-5 pb-4">
      {CHECKOUT_STEPS.map((step, i) => {
        const active = i === 0
        return (
          <div key={step} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold',
                  active ? 'bg-gold text-charcoal' : 'bg-white/10 text-white/50 ring-1 ring-white/15',
                )}
              >
                {active ? <Check className="h-3 w-3" strokeWidth={3.5} /> : i + 1}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-[11px] font-bold',
                  active ? 'text-gold' : 'text-white/45',
                )}
              >
                {step}
              </span>
            </div>
            {i < CHECKOUT_STEPS.length - 1 && (
              <div className={cn('h-px flex-1', active ? 'bg-gold/50' : 'bg-white/10')} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function CrossSellCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const defaultOffer = getDefaultOffer(product.slug)

  const handleAdd = () => {
    addItem(product, defaultOffer.qty, defaultOffer.price)
    trackAddToCart({
      value: defaultOffer.price,
      content_ids: [product.slug],
      event_id: generateEventId(),
    })
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3 transition-colors hover:border-gold/40">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/30">
        <img
          src={product.image}
          alt={product.nameAr}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <p className="line-clamp-2 text-xs font-bold leading-snug text-white/90">
          {product.nameAr}
        </p>
        <p className="mt-1 text-xs font-extrabold text-gold">{defaultOffer.price} ريال</p>
      </div>
      <button
        onClick={handleAdd}
        className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-gold/50 px-3 py-2 text-xs font-extrabold text-gold transition-colors hover:bg-gold hover:text-charcoal"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={3} />
        أضف
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    total,
    itemCount,
    openCheckout,
  } = useCartStore()

  const count = itemCount()
  const cartTotal = total()

  const totalSavings = items.reduce((sum, i) => {
    const offer = getOfferForProductQty(i.product.slug, i.qty)
    return sum + (offer?.savings ?? 0)
  }, 0)

  const hasFreeShipping =
    items.length > 0 &&
    items.every((i) => getOfferForProductQty(i.product.slug, i.qty)?.freeShipping)

  // Collect unique cross-sell products from cart items
  const crossSellSlugs = items.flatMap((i) => i.product.crossSells)
  const uniqueSlugs = Array.from(new Set(crossSellSlugs))
  const cartSlugs = new Set(items.map((i) => i.product.slug))
  const crossSellProducts = uniqueSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined && !cartSlugs.has(p.slug))
    .slice(0, 2)

  return (
    <>
      <Drawer.Root
        open={isOpen}
        onOpenChange={(open) => !open && closeCart()}
        direction="right"
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
          <Drawer.Content
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l border-gold/20 bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal shadow-2xl shadow-black/50 outline-none"
            dir="rtl"
            aria-label="سلة التسوق"
          >
            <Drawer.Title className="sr-only">سلة التسوق</Drawer.Title>
            <div
              className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-24 bottom-40 h-64 w-64 rounded-full bg-teal/20 blur-3xl"
              aria-hidden
            />

            {/* Header */}
            <div className="relative border-b border-white/10">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gold text-charcoal shadow-lg shadow-gold/30">
                    <ShoppingCart className="h-5 w-5" />
                    {count > 0 && (
                      <span className="absolute -left-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-extrabold text-teal-dark ring-2 ring-teal-dark">
                        {count}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white">سلة التسوق</h2>
                    <p className="text-[11px] font-medium text-white/55">
                      {count > 0 ? 'باقي خطوة وطلبك يكون جاهز' : 'ابدأ رحلتك لتنفس أريح'}
                    </p>
                  </div>
                </div>
                <Drawer.Close asChild>
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                    aria-label="إغلاق"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Drawer.Close>
              </div>
              {items.length > 0 && <CheckoutSteps />}
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl" aria-hidden />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-white/[0.06]">
                      <ShoppingCart className="h-11 w-11 text-gold" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-extrabold text-white">سلتك فارغة</h3>
                  <p className="mb-7 text-sm font-medium text-white/60">
                    أضف منتجاً من متجرنا لبدء رحلة عنايتك
                  </p>
                  <Drawer.Close asChild>
                    <Link
                      href="/#products"
                      className="rounded-2xl bg-gold px-8 py-3.5 text-sm font-extrabold text-charcoal shadow-lg shadow-gold/30 transition-colors hover:bg-[#E9C47F]"
                    >
                      تصفح المنتجات
                    </Link>
                  </Drawer.Close>
                </div>
              ) : (
                <div className="px-5 py-5">
                  {/* Cart items */}
                  <div className="flex flex-col gap-3">
                    {items.map((item) => {
                      const offer = getOfferForProductQty(item.product.slug, item.qty)
                      const qtyLabel =
                        offer?.qtyLabel ??
                        (item.qty === 1 ? 'قطعة واحدة' : item.qty === 2 ? 'قطعتان' : `${item.qty} قطع`)

                      return (
                      <div
                        key={item.product.slug}
                        className="relative flex gap-3 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-l from-white/[0.09] to-white/[0.03] p-3 shadow-lg shadow-black/20"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl ring-2 ring-gold/40">
                          <img
                            src={item.product.image}
                            alt={item.product.nameAr}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start gap-2">
                            <p className="line-clamp-2 flex-1 text-sm font-bold leading-snug text-white">
                              {item.product.nameAr}
                            </p>
                            <button
                              onClick={() => removeItem(item.product.slug)}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/40 transition-colors hover:bg-red-500/15 hover:text-red-300"
                              aria-label={`احذف ${item.product.nameAr} من السلة`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] font-bold text-white/80">
                              {qtyLabel}
                            </span>
                            {offer?.volumeLabel && (
                              <span className="rounded-full border border-gold/30 bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-gold">
                                {offer.volumeLabel}
                              </span>
                            )}
                          </div>
                          <div className="mt-auto flex items-end justify-between pt-2">
                            <p className="text-lg font-extrabold text-gold">
                              {item.price} <span className="text-xs font-bold text-gold/80">ريال</span>
                            </p>
                            {(offer?.savings ?? 0) > 0 && (
                              <span className="rounded-md bg-gold px-2 py-0.5 text-[10px] font-extrabold text-charcoal">
                                وفّرت {offer?.savings} ريال
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>

                  {/* Savings callout */}
                  {totalSavings > 0 && (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-gold to-[#E9C47F] px-4 py-3 shadow-lg shadow-gold/20">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-dark text-gold">
                        <BadgePercent className="h-5 w-5" />
                      </div>
                      <p className="text-sm font-extrabold text-charcoal">
                        مبروك! وفّرت {totalSavings} ريال بطلبك هذا
                      </p>
                    </div>
                  )}

                  {/* Cross-sell */}
                  {crossSellProducts.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-3 flex items-center gap-2 text-sm font-extrabold text-white">
                        <span className="h-4 w-1 rounded-full bg-gold" />
                        أكمل تجربتك مع
                      </p>
                      <div className="flex flex-col gap-2">
                        {crossSellProducts.map((p) => (
                          <CrossSellCard key={p.slug} product={p} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trust reminders */}
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[
                      { icon: Package, text: 'الدفع عند الاستلام' },
                      { icon: Truck, text: 'شحن سريع' },
                      { icon: RotateCcw, text: 'إرجاع مجاني' },
                    ].map((t) => (
                      <div
                        key={t.text}
                        className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-1 py-3 text-center"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/40">
                          <t.icon className="h-4 w-4 text-gold" />
                        </div>
                        <span className="text-[11px] font-bold leading-tight text-white/75">
                          {t.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            {items.length > 0 && (
              <div className="relative border-t border-gold/20 bg-black/25 px-5 pb-5 pt-4 backdrop-blur-md">
                {hasFreeShipping && (
                  <div className="mb-1 flex items-center justify-between text-xs text-white/55">
                    <span>الشحن</span>
                    <span className="font-bold text-gold">مجاني</span>
                  </div>
                )}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-white/80">إجمالي الطلب</span>
                  <span className="text-2xl font-extrabold text-gold">
                    {cartTotal} <span className="text-sm font-bold">ريال</span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    closeCart()
                    openCheckout()
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-4 text-base font-extrabold text-charcoal shadow-lg shadow-gold/30 transition-all hover:bg-[#E9C47F] active:scale-[0.98]"
                >
                  <Shield className="h-5 w-5" />
                  إتمام الطلب الآن
                </button>
                <p className="mt-2.5 text-center text-xs text-white/50">
                  الدفع عند الاستلام · آمن وموثوق
                </p>
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Checkout modal is always mounted alongside cart drawer */}
      <CheckoutModal />
    </>
  )
}
