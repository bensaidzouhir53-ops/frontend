'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { Clock, X, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { acceptUpsell, declineUpsell } from '@/lib/api'
import { getProductBySlug, getOffersForProduct } from '@/lib/products'
import {
  UPSELL_PRICE,
  UPSELL_OFFER_COUNTDOWN_SECONDS,
  clearPendingUpsell,
} from '@/lib/upsell'
import { trackPurchase, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

export default function UpsellModal() {
  const router = useRouter()
  const pathname = usePathname()
  const { isUpsellOpen, upsellProduct, closeUpsell } = useCartStore()

  const [secondsLeft, setSecondsLeft] = useState(UPSELL_OFFER_COUNTDOWN_SECONDS)
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset and start countdown whenever modal opens
  useEffect(() => {
    if (!isUpsellOpen) {
      if (timerRef.current) clearInterval(timerRef.current)
      setSecondsLeft(UPSELL_OFFER_COUNTDOWN_SECONDS)
      return
    }

    setSecondsLeft(UPSELL_OFFER_COUNTDOWN_SECONDS)
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!)
          handleDecline()
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpsellOpen])

  type StoredOrder = {
    order_id: string
    order_number: string
    subtotal?: number
    upsell_total?: number
    total: number
    customer_name?: string
    phone?: string
    items?: Array<{
      slug: string
      name_ar: string
      qty: number
      price: number
      image: string
    }>
    upsell_item?: {
      slug: string
      name_ar: string
      price: number
      image?: string
    } | null
    created_at?: string
  }

  const getOrderFromSession = (): StoredOrder | null => {
    try {
      const raw = sessionStorage.getItem('nasama_order')
      if (!raw) return null
      return JSON.parse(raw) as StoredOrder
    } catch {
      return null
    }
  }

  const navigateToThankYou = (orderNumber: string, orderTotal: number) => {
    const thankYouPath = `/thank-you?order=${encodeURIComponent(orderNumber)}&total=${orderTotal}`
    if (pathname === '/thank-you') return
    router.push(thankYouPath)
  }

  const finishUpsell = async (orderNumber: string, orderTotal: number) => {
    clearPendingUpsell()
    closeUpsell()
    navigateToThankYou(orderNumber, orderTotal)
  }

  const notifyUpsellDeclined = async (orderId: string) => {
    try {
      await declineUpsell(orderId)
    } catch {
      // Still continue to thank-you even if COD sync fails.
    }
  }

  const handleAccept = async () => {
    if (isAccepting || !upsellProduct) return
    if (timerRef.current) clearInterval(timerRef.current)
    setIsAccepting(true)

    const order = getOrderFromSession()
    const eventId = generateEventId()

    try {
      if (order) {
        await acceptUpsell(order.order_id, {
          product_slug: upsellProduct.product_slug,
          quantity: 1,
          event_id: eventId,
        })

        trackPurchase({
          value: UPSELL_PRICE,
          content_ids: [upsellProduct.product_slug],
          event_id: eventId,
          order_id: order.order_id,
        })

        const upsellProductData = getProductBySlug(upsellProduct.product_slug)
        const newTotal = order.total + UPSELL_PRICE
        sessionStorage.setItem(
          'nasama_order',
          JSON.stringify({
            ...order,
            upsell_total: (order.upsell_total ?? 0) + UPSELL_PRICE,
            total: newTotal,
            upsell_item: {
              slug: upsellProduct.product_slug,
              name_ar: upsellProduct.name_ar,
              price: UPSELL_PRICE,
              image: upsellProductData?.image,
            },
          }),
        )

        finishUpsell(order.order_number, newTotal)
      } else {
        clearPendingUpsell()
        closeUpsell()
        router.push('/thank-you')
      }
    } catch {
      if (order) {
        finishUpsell(order.order_number, order.total)
      } else {
        clearPendingUpsell()
        closeUpsell()
        router.push('/thank-you')
      }
    } finally {
      setIsAccepting(false)
    }
  }

  const handleDecline = () => {
    if (isDeclining || isAccepting) return
    if (timerRef.current) clearInterval(timerRef.current)
    setIsDeclining(true)

    const order = getOrderFromSession()

    void (async () => {
      if (order) {
        await notifyUpsellDeclined(order.order_id)
        finishUpsell(order.order_number, order.total)
      } else {
        clearPendingUpsell()
        closeUpsell()
        router.push('/thank-you')
      }
      setIsDeclining(false)
    })()
  }

  const progressPct = (secondsLeft / UPSELL_OFFER_COUNTDOWN_SECONDS) * 100
  const upsellImage = upsellProduct
    ? getProductBySlug(upsellProduct.product_slug)?.image
    : undefined
  const upsellRegularPrice = upsellProduct
    ? getOffersForProduct(upsellProduct.product_slug)[0]?.price ?? 179
    : 179
  const upsellSavings = Math.max(upsellRegularPrice - UPSELL_PRICE, 0)

  return (
    <Dialog.Root
      open={isUpsellOpen}
      onOpenChange={(open) => {
        if (!open) handleDecline()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-ivory shadow-2xl outline-none"
          dir="rtl"
          aria-describedby="upsell-description"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">عرض خاص</Dialog.Title>
          <Dialog.Description id="upsell-description" className="sr-only">
            عرض خاص بعد الطلب — فرصة لإضافة منتج بسعر مخفض
          </Dialog.Description>

          {/* Countdown progress bar */}
          <div className="h-1.5 w-full bg-sage/30">
            <div
              className="h-full bg-gold transition-all duration-1000 ease-linear"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Header */}
          <div className="relative bg-gradient-teal px-5 py-5 text-center text-white">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              <span className="text-sm font-bold text-gold">
                عرض خاص ينتهي خلال {secondsLeft} ثانية
              </span>
            </div>
            <h2 className="text-xl font-extrabold">
              🎁 أضفه الآن قبل انتهاء الطلب!
            </h2>
          </div>

          {/* Product offer */}
          <div className="px-5 py-5">
            <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-mist">
                  {upsellImage ? (
                    <Image
                      src={upsellImage}
                      alt={upsellProduct?.name_ar ?? 'منتج إضافي'}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold leading-snug text-charcoal">
                    {upsellProduct?.name_ar ?? 'بخاخ تنظيف الجيوب الأنفية'}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/60">
                    {upsellProduct?.offer_text ??
                      'أكمل روتينك التنفسي — عرض حصري لعملاء نَفَس فقط'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gold/10 px-4 py-3">
                <div>
                  <p className="text-xs text-charcoal/50 line-through">{upsellRegularPrice} ريال</p>
                  <p className="text-2xl font-extrabold text-teal">
                    {UPSELL_PRICE} ريال فقط
                  </p>
                </div>
                <div className="rounded-full bg-gold px-3 py-1.5">
                  <span className="text-xs font-extrabold text-white">
                    وفّر {upsellSavings} ريال
                  </span>
                </div>
              </div>
            </div>

            {/* Accept button */}
            <button
              onClick={handleAccept}
              disabled={isAccepting || isDeclining}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-extrabold text-white shadow-lg transition-all',
                isAccepting || isDeclining
                  ? 'cursor-not-allowed bg-charcoal/30'
                  : 'bg-teal shadow-teal/30 hover:bg-teal-dark active:scale-[0.98]',
              )}
            >
              {isAccepting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  جاري الإضافة...
                </>
              ) : (
                <>أضفه الآن بـ {UPSELL_PRICE} ريال فقط</>
              )}
            </button>

            {/* Decline */}
            <button
              onClick={handleDecline}
              disabled={isAccepting || isDeclining}
              className="mt-3 flex w-full items-center justify-center gap-1 py-2 text-xs text-charcoal/40 transition-colors hover:text-charcoal/60 disabled:cursor-not-allowed"
            >
              {isDeclining ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
              لا شكراً، سأكمل الطلب بدونه
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
