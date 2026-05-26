'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { Clock, Package, X, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { acceptUpsell } from '@/lib/api'
import { trackPurchase, generateEventId } from '@/lib/tracking'
import { cn } from '@/lib/utils'

const UPSELL_PRICE = 99
const COUNTDOWN_SECONDS = 15

export default function UpsellModal() {
  const router = useRouter()
  const { isUpsellOpen, upsellProduct, closeUpsell } = useCartStore()

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS)
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset and start countdown whenever modal opens
  useEffect(() => {
    if (!isUpsellOpen) {
      if (timerRef.current) clearInterval(timerRef.current)
      setSecondsLeft(COUNTDOWN_SECONDS)
      return
    }

    setSecondsLeft(COUNTDOWN_SECONDS)
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

  const getOrderFromSession = () => {
    try {
      const raw = sessionStorage.getItem('nasama_order')
      if (!raw) return null
      return JSON.parse(raw) as {
        order_id: string
        order_number: string
        total: number
      }
    } catch {
      return null
    }
  }

  const navigateToThankYou = (orderNumber: string, orderTotal: number) => {
    sessionStorage.removeItem('nasama_order')
    router.push(`/thank-you?order=${orderNumber}&total=${orderTotal}`)
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

        closeUpsell()
        navigateToThankYou(
          order.order_number,
          order.total + UPSELL_PRICE,
        )
      } else {
        // Fallback: decline gracefully if order data is missing
        closeUpsell()
        router.push('/thank-you')
      }
    } catch {
      // If upsell API fails, just proceed to thank-you
      closeUpsell()
      if (order) {
        navigateToThankYou(order.order_number, order.total)
      } else {
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
    closeUpsell()

    setTimeout(() => {
      if (order) {
        navigateToThankYou(order.order_number, order.total)
      } else {
        router.push('/thank-you')
      }
      setIsDeclining(false)
    }, 100)
  }

  const progressPct = (secondsLeft / COUNTDOWN_SECONDS) * 100

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
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-mist">
                  <Package className="h-7 w-7 text-teal" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold leading-snug text-charcoal">
                    {upsellProduct?.name_ar ?? 'منتج إضافي'}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/60">
                    {upsellProduct?.offer_text ??
                      'أضفه الآن بسعر حصري لعملاء نسمة فقط'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gold/10 px-4 py-3">
                <div>
                  <p className="text-xs text-charcoal/50 line-through">169 ريال</p>
                  <p className="text-2xl font-extrabold text-teal">
                    {UPSELL_PRICE} ريال فقط
                  </p>
                </div>
                <div className="rounded-full bg-gold px-3 py-1.5">
                  <span className="text-xs font-extrabold text-white">
                    وفّر 70 ريال
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
