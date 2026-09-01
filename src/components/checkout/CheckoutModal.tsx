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
  }, [isCheckoutOpen, items, cartTotal])

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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-ivory shadow-2xl outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[95dvh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
          dir="rtl"
          aria-describedby="checkout-description"
        >
          <Dialog.Title className="sr-only">إتمام الطلب</Dialog.Title>
          <Dialog.Description id="checkout-description" className="sr-only">
            أدخل اسمك ورقم جوالك لإتمام طلبك
          </Dialog.Description>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-sage/30 bg-white px-5 py-4 rounded-t-3xl">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-teal" />
              <h2 className="text-base font-bold text-charcoal">إتمام الطلب</h2>
            </div>
            <Dialog.Close asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 transition-colors hover:bg-mist hover:text-charcoal"
                aria-label="إغلاق"
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="px-5 py-5">
            {/* Social proof */}
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-teal/5 border border-teal/15 px-3 py-2.5">
              <Users className="h-4 w-4 shrink-0 text-teal" />
              <p className="text-xs font-medium text-charcoal/80">
                انضم لأكثر من{' '}
                <span className="font-bold text-teal">2,400 عميل سعودي راضٍ</span>
              </p>
            </div>

            {/* Scarcity */}
            <div className="mb-5 flex items-center gap-2 rounded-xl bg-gold/10 px-3 py-2.5">
              <Clock className="h-4 w-4 shrink-0 text-gold" />
              <p className="text-xs font-medium text-gold">
                الكمية محدودة — الطلب مرتفع هذا الأسبوع
              </p>
            </div>

            {/* Order summary */}
            <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-charcoal">ملخص طلبك:</p>
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-mist">
                      <Image
                        src={item.product.image}
                        alt={item.product.nameAr}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-2 flex-1 text-charcoal/80 font-semibold leading-snug">
                      {item.product.nameAr}
                      <span className="mr-1 text-xs text-charcoal/50 font-normal">
                        ×{item.qty}
                      </span>
                    </span>
                  </div>
                  <span className="mr-3 font-bold text-charcoal shrink-0">{item.price} ريال</span>
                </div>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-sage/30 pt-3">
                <span className="text-sm font-medium text-charcoal/70">الإجمالي</span>
                <span className="text-xl font-extrabold text-teal">{cartTotal} ريال</span>
              </div>
              <p className="mt-1.5 text-center text-xs text-charcoal/50">
                الدفع عند الاستلام — لا حاجة لبطاقة ائتمان
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="checkout-name"
                  className="mb-1.5 block text-sm font-semibold text-charcoal"
                >
                  الاسم الكريم <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  autoComplete="name"
                  placeholder="أدخل اسمك"
                  className={cn(
                    'w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-charcoal placeholder-charcoal/30 outline-none transition-colors',
                    errors.name
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-sage/40 focus:border-teal',
                  )}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="checkout-phone"
                  className="mb-1.5 block text-sm font-semibold text-charcoal"
                >
                  رقم الجوال <span className="text-red-500">*</span>
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
                    'w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-charcoal placeholder-charcoal/30 outline-none transition-colors ltr text-right',
                    errors.phone
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-sage/40 focus:border-teal',
                  )}
                  {...register('phone')}
                />
                <p className="mt-1 text-[11px] text-charcoal/45">
                  10 أرقام — يبدأ بـ 05 أو +966
                </p>
                {errors.phone && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <p className="text-sm text-red-600">{serverError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-extrabold text-white shadow-lg transition-all',
                  !isSubmitting
                    ? 'bg-teal shadow-teal/30 hover:bg-teal-dark active:scale-[0.98]'
                    : 'cursor-not-allowed bg-charcoal/30 shadow-none',
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

              <p className="text-center text-xs text-charcoal/40">
                بالضغط على "تأكيد الطلب" أنت توافق على{' '}
                <a href="/terms" className="underline hover:text-teal">
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
