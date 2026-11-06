'use client'

import { Drawer } from 'vaul'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { X, ShoppingCart, Trash2, Shield, Truck, RotateCcw, Package, BadgePercent, Plus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { getProductBySlug, getOfferForProductQty, getDefaultOffer } from '@/lib/products'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import type { Product } from '@/types'
import CheckoutModal from '@/components/checkout/CheckoutModal'

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
    <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur-sm">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-white">
        <img
          src={product.image}
          alt={product.nameAr}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <p className="line-clamp-2 text-xs font-bold text-charcoal leading-snug">
          {product.nameAr}
        </p>
        <p className="mt-0.5 text-xs font-extrabold text-teal-dark">{defaultOffer.price} ريال</p>
      </div>
      <button
        onClick={handleAdd}
        className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-teal-dark px-3 py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-charcoal"
      >
        <Plus className="h-3.5 w-3.5" />
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
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
          <Drawer.Content
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-[#E9C47F] via-gold to-gold-dark shadow-2xl outline-none"
            dir="rtl"
            aria-label="سلة التسوق"
          >
            <Drawer.Title className="sr-only">سلة التسوق</Drawer.Title>
            <div
              className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-white/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-16 bottom-32 h-56 w-56 rounded-full bg-teal-dark/10 blur-3xl"
              aria-hidden
            />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-dark text-gold shadow-md">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-extrabold text-charcoal">
                  سلة التسوق
                  {count > 0 && (
                    <span className="mr-2 rounded-full bg-teal-dark px-2.5 py-0.5 text-xs font-bold text-gold">
                      {count}
                    </span>
                  )}
                </h2>
              </div>
              <Drawer.Close asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/40 text-charcoal transition-colors hover:bg-white/70"
                  aria-label="إغلاق"
                >
                  <X className="h-4 w-4" />
                </button>
              </Drawer.Close>
            </div>

            {/* Content */}
            <div className="relative flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                  <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/50 ring-4 ring-white/40">
                    <ShoppingCart className="h-11 w-11 text-teal-dark" />
                  </div>
                  <h3 className="mb-2 text-xl font-extrabold text-charcoal">
                    سلتك فارغة
                  </h3>
                  <p className="mb-6 text-sm font-medium text-charcoal/70">
                    أضف منتجاً من متجرنا لبدء رحلة عنايتك
                  </p>
                  <Drawer.Close asChild>
                    <Link
                      href="/#products"
                      className="rounded-2xl bg-teal-dark px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition-colors hover:bg-charcoal"
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
                        className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white p-3 shadow-lg shadow-gold-dark/20"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-2 ring-gold/40">
                          <img
                            src={item.product.image}
                            alt={item.product.nameAr}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="line-clamp-2 text-sm font-bold leading-snug text-charcoal">
                            {item.product.nameAr}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="rounded-full bg-teal-dark/10 px-2 py-0.5 text-[11px] font-bold text-teal-dark">
                              {qtyLabel}
                            </span>
                            {offer?.volumeLabel && (
                              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[11px] font-bold text-gold-dark">
                                {offer.volumeLabel}
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-base font-extrabold text-teal-dark">
                            {item.price} ريال
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.slug)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-full bg-charcoal/5 text-charcoal/40 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={`احذف ${item.product.nameAr} من السلة`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )})}
                  </div>

                  {/* Savings callout */}
                  {totalSavings > 0 && (
                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-teal-dark px-4 py-3 shadow-md">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-teal-dark">
                        <BadgePercent className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-extrabold text-white">
                        وفّرت <span className="text-gold">{totalSavings} ريال</span> بطلبك هذا
                      </p>
                    </div>
                  )}

                  {/* Cross-sell */}
                  {crossSellProducts.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-3 text-sm font-extrabold text-charcoal">
                        أكمل تجربتك مع:
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
                        className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/50 bg-white/40 px-1 py-3 text-center backdrop-blur-sm"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-dark">
                          <t.icon className="h-4 w-4 text-gold" />
                        </div>
                        <span className="text-[11px] font-bold leading-tight text-charcoal/80">
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
              <div className="relative rounded-t-3xl bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal px-5 pb-5 pt-4 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">
                    إجمالي الطلب
                  </span>
                  <span className="text-2xl font-extrabold text-gold">
                    {cartTotal} ريال
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
                <p className="mt-2.5 text-center text-xs text-white/55">
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
