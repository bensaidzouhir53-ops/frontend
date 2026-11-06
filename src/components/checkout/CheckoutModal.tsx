'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Shield, AlertCircle, Loader2, Users, Clock } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import {
  checkoutSchema,
  isWhitelistedPhone,
  normalizeSaudiPhone,
  type CheckoutFormData,
} from '@/lib/validation'
import { createOrder } from '@/lib/api'
import {
  captureAttribution,
  generateEventId,
  trackInitiateCheckoutOnce,
  checkoutInitiateCheckoutFiredKey,
} from '@/lib/tracking'
import { cn } from '@/lib/utils'

const CHECKOUT_EVENT_ID_KEY = 'nasama_checkout_event_id'

export default function CheckoutModal() {
  const router = useRouter()
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    total,
    clearCart,
  } = useCartStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const submitLockRef = useRef(false)

  const cartTotal = total()

  useEffect(() => {
    if (!isCheckoutOpen) {
      try {
        sessionStorage.removeItem(CHECKOUT_EVENT_ID_KEY)
        sessionStorage.removeItem(checkoutInitiateCheckoutFiredKey(CHECKOUT_EVENT_ID_KEY))
      } catch {
        // ignore
      }
      submitLockRef.current = false
      return
    }
    if (items.length === 0) return

    let checkoutEventId = ''
    try {
      checkoutEventId = sessionStorage.getItem(CHECKOUT_EVENT_ID_KEY) ?? ''
      if (!checkoutEventId) {
        checkoutEventId = generateEventId()
        sessionStorage.setItem(CHECKOUT_EVENT_ID_KEY, checkoutEventId)
      }
    } catch {
      checkoutEventId = generateEventId()
    }

    trackInitiateCheckoutOnce({
      value: cartTotal,
      content_ids: items.map((i) => i.product.slug),
      event_id: checkoutEventId,
      session_key: CHECKOUT_EVENT_ID_KEY,
    })
  }, [isCheckoutOpen, items])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  })

  const handleClose = () => {
    if (isSubmitting) return
    closeCheckout()
    reset()
    setServerError(null)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    if (submitLockRef.current || isSubmitting || items.length === 0) return
    submitLockRef.current = true
    setIsSubmitting(true)
    setServerError(null)

    let eventId = generateEventId()
    try {
      eventId = sessionStorage.getItem(CHECKOUT_EVENT_ID_KEY) ?? eventId
      if (!sessionStorage.getItem(CHECKOUT_EVENT_ID_KEY)) {
        sessionStorage.setItem(CHECKOUT_EVENT_ID_KEY, eventId)
      }
    } catch {
      // use generated eventId
    }
    const attribution = captureAttribution()

    if (!isWhitelistedPhone(data.phone)) {
      const normalized = normalizeSaudiPhone(data.phone)
      if (!normalized) {
        setServerError(
          'رقم الجوال يجب أن يكون 10 أرقام ويبدأ بـ 05 أو +966 (مثال: 0512345678)',
        )
        setIsSubmitting(false)
        return
      }
    }

    const normalizedPhone = isWhitelistedPhone(data.phone)
      ? data.phone.trim()
      : (normalizeSaudiPhone(data.phone) as string)

    try {
      const response = await createOrder({
        customer_name: data.name,
        phone: normalizedPhone,
        items: items.map((i) => ({
          product_slug: i.product.slug,
          quantity: i.qty,
        })),
        landing_page: attribution.landing_page,
        utm: attribution.utm
          ? {
              source: attribution.utm.source,
              medium: attribution.utm.medium,
              campaign: attribution.utm.campaign,
              content: attribution.utm.content,
              term: attribution.utm.term,
            }
          : undefined,
        click_ids: {
          fbclid: attribution.fbclid ?? '',
          ttclid: attribution.ttclid ?? '',
          sc_click_id: attribution.sc_click_id ?? '',
        },
        cookies: {
          _fbp: attribution._fbp ?? '',
          _fbc: attribution._fbc ?? '',
          _ttp: attribution._ttp ?? '',
          _scid: attribution._scid ?? '',
        },
        event_id: eventId,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      })

      clearCart()
      closeCheckout()
      reset()

      sessionStorage.setItem(
        'nasama_order',
        JSON.stringify({
          order_id: response.order_id,
          order_number: response.order_number,
          event_id: eventId,
          subtotal: response.subtotal ?? cartTotal,
          upsell_total: 0,
          total: response.total,
          customer_name: data.name,
          phone: normalizedPhone,
          items: items.map((i) => ({
            slug: i.product.slug,
            name_ar: i.product.nameAr,
            qty: i.qty,
            price: i.price,
            image: i.product.image,
          })),
          upsell_item: null,
          created_at: new Date().toISOString(),
        }),
      )

      sessionStorage.removeItem('nasama_pending_upsell')
      router.push(
        `/thank-you?order=${encodeURIComponent(response.order_number)}&total=${response.total}`,
      )
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'حدث خطأ، يرجى المحاولة مجدداً'
      setServerError(message)
    } finally {
      submitLockRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={isCheckoutOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md max-h-[92dvh] overflow-y-auto rounded-t-3xl border border-gold/25 bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal shadow-2xl shadow-black/50 outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[95dvh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
          dir="rtl"
          aria-describedby="checkout-description"
        >
          <Dialog.Title className="sr-only">إتمام الطلب</Dialog.Title>
          <Dialog.Description id="checkout-description" className="sr-only">
            أدخل اسمك ورقم جوالك لإتمام طلبك
          </Dialog.Description>

          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold text-charcoal shadow-lg shadow-gold/30">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">إتمام الطلب</h2>
                <p className="text-[11px] font-medium text-white/55">خطوة وحدة وطلبك يوصلك</p>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="إغلاق"
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="px-5 py-5">
            <div className="mb-5 grid grid-cols-2 gap-2">
              {/* Social proof */}
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5">
                <Users className="h-4 w-4 shrink-0 text-gold" />
                <p className="text-[11px] font-medium leading-snug text-white/75">
                  انضم لأكثر من{' '}
                  <span className="font-bold text-gold">2,400 عميل راضٍ</span>
                </p>
              </div>

              {/* Scarcity */}
              <div className="flex items-center gap-2 rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2.5">
                <Clock className="h-4 w-4 shrink-0 text-red-300" />
                <p className="text-[11px] font-medium leading-snug text-red-200">
                  الكمية محدودة — الطلب مرتفع هذا الأسبوع
                </p>
              </div>
            </div>

            {/* Order summary */}
            <div className="mb-5 rounded-2xl border border-gold/25 bg-white/[0.05] p-4 backdrop-blur-sm">
              <p className="mb-3 text-sm font-extrabold text-gold">ملخص طلبك</p>
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-gold/40">
                      <Image
                        src={item.product.image}
                        alt={item.product.nameAr}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-2 flex-1 font-semibold leading-snug text-white/90">
                      {item.product.nameAr}
                      <span className="mr-1.5 rounded-full bg-gold/15 px-1.5 py-0.5 text-[11px] font-bold text-gold">
                        ×{item.qty}
                      </span>
                    </span>
                  </div>
                  <span className="mr-3 shrink-0 font-extrabold text-white">{item.price} ريال</span>
                </div>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-sm font-medium text-white/65">الإجمالي</span>
                <span className="text-2xl font-extrabold text-gold">{cartTotal} ريال</span>
              </div>
              <p className="mt-2 text-center text-xs text-white/50">
                الدفع عند الاستلام — لا حاجة لبطاقة ائتمان
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="checkout-name"
                  className="mb-1.5 block text-sm font-bold text-white"
                >
                  الاسم الكريم <span className="text-gold">*</span>
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  autoComplete="name"
                  placeholder="أدخل اسمك"
                  className={cn(
                    'w-full rounded-xl border-2 bg-white/[0.07] px-4 py-3.5 text-base text-white placeholder-white/35 outline-none transition-colors focus:bg-white/10',
                    errors.name
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/15 focus:border-gold',
                  )}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="checkout-phone"
                  className="mb-1.5 block text-sm font-bold text-white"
                >
                  رقم الجوال <span className="text-gold">*</span>
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="05XXXXXXXX"
                  minLength={10}
                  maxLength={13}
                  required
                  className={cn(
                    'w-full rounded-xl border-2 bg-white/[0.07] px-4 py-3.5 text-base text-white placeholder-white/35 outline-none transition-colors focus:bg-white/10 ltr text-right',
                    errors.phone
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-white/15 focus:border-gold',
                  )}
                  {...register('phone')}
                />
                <p className="mt-1 text-[11px] text-white/45">
                  10 أرقام — يبدأ بـ 05 أو +966
                </p>
                {errors.phone && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <p className="text-sm text-red-200">{serverError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'mt-1 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-extrabold shadow-lg transition-all',
                  !isSubmitting
                    ? 'bg-gold text-charcoal shadow-gold/30 hover:bg-[#E9C47F] active:scale-[0.98]'
                    : 'cursor-not-allowed bg-white/20 text-white/70 shadow-none',
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    جاري تسجيل طلبك...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    تأكيد الطلب — {cartTotal} ريال
                  </>
                )}
              </button>

              <p className="text-center text-xs text-white/45">
                بالضغط على &quot;تأكيد الطلب&quot; أنت توافق على{' '}
                <a href="/terms" className="underline hover:text-gold">
                  الشروط والأحكام
                </a>
              </p>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
