'use client'

import { Drawer } from 'vaul'
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingCart, Trash2, Shield, Truck, RotateCcw, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { getProductBySlug, OFFERS } from '@/lib/products'
import { trackAddToCart, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'
import CheckoutModal from '@/components/checkout/CheckoutModal'

function CrossSellCard({ product }: { product: Product }) {
  const { addItem, openCheckout } = useCartStore()
  const defaultOffer = OFFERS.find((o) => o.isDefault) ?? OFFERS[1]

  const handleAdd = () => {
    addItem(product, defaultOffer.qty, defaultOffer.price)
    trackAddToCart({
      value: defaultOffer.price,
      content_ids: [product.slug],
      event_id: generateEventId(),
    })
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-sage/30 bg-mist/60 p-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
        <img
          src={product.image}
          alt={product.nameAr}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <p className="line-clamp-2 text-xs font-semibold text-charcoal leading-snug">
          {product.nameAr}
        </p>
        <p className="mt-0.5 text-xs text-teal font-bold">{defaultOffer.price} ريال</p>
      </div>
      <button
        onClick={handleAdd}
        className="shrink-0 rounded-lg bg-teal px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-teal-dark"
      >
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
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
          <Drawer.Content
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-2xl outline-none"
            dir="rtl"
            aria-label="سلة التسوق"
          >
            <Drawer.Title className="sr-only">سلة التسوق</Drawer.Title>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-sage/30 bg-white px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-teal" />
                <h2 className="text-base font-bold text-charcoal">
                  سلة التسوق
                  {count > 0 && (
                    <span className="mr-2 rounded-full bg-teal px-2 py-0.5 text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </h2>
              </div>
              <Drawer.Close asChild>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/60 transition-colors hover:bg-mist hover:text-charcoal"
                  aria-label="إغلاق"
                >
                  <X className="h-4 w-4" />
                </button>
              </Drawer.Close>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-mist">
                    <ShoppingCart className="h-10 w-10 text-sage" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-charcoal">
                    سلتك فارغة
                  </h3>
                  <p className="mb-6 text-sm text-charcoal/60">
                    أضف منتجاً من متجرنا لبدء رحلة عنايتك
                  </p>
                  <Drawer.Close asChild>
                    <Link
                      href="/#products"
                      className="rounded-xl bg-teal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-dark"
                    >
                      تصفح المنتجات
                    </Link>
                  </Drawer.Close>
                </div>
              ) : (
                <div className="px-5 py-4">
                  {/* Cart items */}
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <div
                        key={item.product.slug}
                        className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist">
                          <img
                            src="https://placehold.co/400x400/e2e8f0/475569?text=Product"
                            alt={item.product.nameAr}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="line-clamp-2 text-sm font-semibold leading-snug text-charcoal">
                            {item.product.nameAr}
                          </p>
                          <p className="mt-1 text-xs text-charcoal/50">
                            الكمية: {item.qty}{' '}
                            {item.qty === 1 ? 'قطعة' : item.qty === 2 ? 'قطعتان' : 'قطع'}
                          </p>
                          <p className="mt-0.5 text-sm font-extrabold text-teal">
                            {item.price} ريال
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.slug)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-charcoal/30 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={`احذف ${item.product.nameAr} من السلة`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Savings callout */}
                  {items.some((i) => {
                    const offer = OFFERS.find((o) => o.qty === i.qty)
                    return (offer?.savings ?? 0) > 0
                  }) && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-3">
                      <span className="text-lg">🎉</span>
                      <p className="text-sm font-bold text-gold">
                        {(() => {
                          const totalSavings = items.reduce((sum, i) => {
                            const offer = OFFERS.find((o) => o.qty === i.qty)
                            return sum + (offer?.savings ?? 0)
                          }, 0)
                          return `وفّرت ${totalSavings} ريال بطلبك هذا`
                        })()}
                      </p>
                    </div>
                  )}

                  {/* Cross-sell */}
                  {crossSellProducts.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-3 text-sm font-bold text-charcoal">
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
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      { icon: Package, text: 'الدفع عند الاستلام' },
                      { icon: Truck, text: 'شحن سريع' },
                      { icon: RotateCcw, text: 'إرجاع مجاني' },
                    ].map((t) => (
                      <div
                        key={t.text}
                        className="flex flex-col items-center gap-1 rounded-xl bg-mist py-2.5 px-1 text-center"
                      >
                        <t.icon className="h-4 w-4 text-teal" />
                        <span className="text-[10px] font-semibold text-charcoal/70 leading-tight">
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
              <div className="border-t border-sage/30 bg-white px-5 py-4">
                {/* Order summary */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-charcoal/70">
                    إجمالي الطلب
                  </span>
                  <span className="text-xl font-extrabold text-charcoal">
                    {cartTotal} ريال
                  </span>
                </div>
                <button
                  onClick={() => {
                    closeCart()
                    openCheckout()
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal py-4 text-base font-extrabold text-white shadow-lg shadow-teal/30 transition-all hover:bg-teal-dark active:scale-[0.98]"
                >
                  <Shield className="h-5 w-5" />
                  إتمام الطلب الآن
                </button>
                <p className="mt-2 text-center text-xs text-charcoal/40">
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
