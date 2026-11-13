'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  Banknote,
  Loader2,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
} from 'lucide-react'
import type { Offer, Product } from '@/types'
import { createOrder } from '@/lib/api'
import {
  captureAttribution,
  generateEventId,
  trackAddToCart,
  trackInitiateCheckoutOnce,
} from '@/lib/tracking'
import {
  checkoutSchema,
  isWhitelistedPhone,
  normalizeSaudiPhone,
  type CheckoutFormData,
} from '@/lib/validation'
import { cn } from '@/lib/utils'

const CHECKOUT_EVENT_ID_KEY = 'nasama_checkout_event_id'

interface QuickOrderFormProps {
  product: Product
  offer: Offer
  dark?: boolean
}

function formatPrice(amount: number) {
  return amount.toLocaleString('en-US')
}

export default function QuickOrderForm({ product, offer, dark = false }: QuickOrderFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const submitLockRef = useRef(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  })

  const offerTitle = offer.cardTitle ?? offer.qtyLabel ?? `${offer.qty} قطع`

  const onSubmit = async (data: CheckoutFormData) => {
    if (submitLockRef.current || isSubmitting) return
    submitLockRef.current = true
    setIsSubmitting(true)
    setServerError(null)

    if (!isWhitelistedPhone(data.phone) && !normalizeSaudiPhone(data.phone)) {
      setServerError('رقم الجوال يجب أن يكون 10 أرقام ويبدأ بـ 05 أو +966 (مثال: 0512345678)')
      submitLockRef.current = false
      setIsSubmitting(false)
      return
    }

    const normalizedPhone = isWhitelistedPhone(data.phone)
      ? data.phone.trim()
      : (normalizeSaudiPhone(data.phone) as string)

    const eventId = generateEventId()
    try {
      sessionStorage.setItem(CHECKOUT_EVENT_ID_KEY, eventId)
    } catch {
      // tracking still uses the generated id
    }

    trackAddToCart({
      value: offer.price,
      content_ids: [product.slug],
      event_id: generateEventId(),
    })
    trackInitiateCheckoutOnce({
      value: offer.price,
      content_ids: [product.slug],
      event_id: eventId,
      session_key: CHECKOUT_EVENT_ID_KEY,
    })

    const attribution = captureAttribution()

    try {
      const response = await createOrder({
        customer_name: data.name,
        phone: normalizedPhone,
        items: [{ product_slug: product.slug, quantity: offer.qty }],
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

      reset()
      sessionStorage.setItem(
        'nasama_order',
        JSON.stringify({
          order_id: response.order_id,
          order_number: response.order_number,
          event_id: eventId,
          subtotal: response.subtotal ?? offer.price,
          upsell_total: 0,
          total: response.total,
          customer_name: data.name,
          phone: normalizedPhone,
          items: [
            {
              slug: product.slug,
              name_ar: product.nameAr,
              qty: offer.qty,
              price: offer.price,
              image: product.image,
            },
          ],
          upsell_item: null,
          created_at: new Date().toISOString(),
        }),
      )
      sessionStorage.removeItem('nasama_pending_upsell')
      router.push(
        `/thank-you?order=${encodeURIComponent(response.order_number)}&total=${response.total}`,
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ، يرجى المحاولة مجدداً'
      setServerError(message)
      submitLockRef.current = false
      setIsSubmitting(false)
    }
  }

  const fieldClass = (hasError: boolean) =>
    cn(
      'h-12 w-full rounded-xl border-2 text-base outline-none transition-colors sm:h-[52px]',
      dark
        ? 'bg-white/[0.07] text-white placeholder:text-white/35 focus:bg-white/10'
        : 'bg-white text-charcoal placeholder:text-charcoal/35',
      hasError
        ? 'border-red-400 focus:border-red-400'
        : dark
          ? 'border-white/15 focus:border-gold'
          : 'border-teal/15 focus:border-teal',
    )

  return (
    <form
      id="quick-order"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        'scroll-mt-28 rounded-2xl border p-3 sm:p-4',
        dark
          ? 'border-gold/30 bg-gradient-to-b from-gold/10 via-white/[0.04] to-transparent'
          : 'border-teal/15 bg-white shadow-[0_8px_24px_rgba(15,118,110,0.08)]',
      )}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
            dark ? 'bg-gold text-charcoal' : 'bg-teal text-white',
          )}
        >
          <ShieldCheck className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="min-w-0 text-start">
          <p className={cn('text-sm font-extrabold sm:text-base', dark ? 'text-white' : 'text-charcoal')}>
            أكمل طلبك الآن
          </p>
          <p className={cn('text-[11px] font-medium sm:text-xs', dark ? 'text-white/60' : 'text-charcoal/55')}>
            اسمك وجوالك فقط — الدفع عند الاستلام
          </p>
        </div>
      </div>

      <div
        className={cn(
          'mb-3 flex items-center justify-between gap-2 rounded-xl px-3 py-2.5',
          dark ? 'bg-white/5 ring-1 ring-gold/25' : 'bg-teal/[0.06] ring-1 ring-teal/15',
        )}
      >
        <p className={cn('min-w-0 truncate text-xs font-bold sm:text-sm', dark ? 'text-white' : 'text-charcoal')}>
          {offerTitle}
        </p>
        <p className={cn('shrink-0 text-sm font-extrabold tabular-nums sm:text-base', dark ? 'text-gold' : 'text-teal')}>
          {formatPrice(offer.price)} ريال
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="quick-order-name"
            className={cn('mb-1.5 block text-xs font-bold sm:text-sm', dark ? 'text-white' : 'text-charcoal')}
          >
            الاسم الكريم
          </label>
          <div className="relative">
            <UserRound
              className={cn(
                'pointer-events-none absolute start-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2',
                errors.name ? 'text-red-400' : dark ? 'text-gold' : 'text-teal',
              )}
            />
            <input
              id="quick-order-name"
              type="text"
              autoComplete="name"
              placeholder="أدخل اسمك"
              className={cn(fieldClass(Boolean(errors.name)), 'ps-11 pe-3')}
              {...register('name')}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quick-order-phone"
            className={cn('mb-1.5 block text-xs font-bold sm:text-sm', dark ? 'text-white' : 'text-charcoal')}
          >
            رقم الجوال
          </label>
          <div className="relative">
            <Phone
              className={cn(
                'pointer-events-none absolute start-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2',
                errors.phone ? 'text-red-400' : dark ? 'text-gold' : 'text-teal',
              )}
            />
            <input
              id="quick-order-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="05XXXXXXXX"
              dir="ltr"
              className={cn(fieldClass(Boolean(errors.phone)), 'pe-11 ps-3 text-right')}
              {...register('phone')}
            />
          </div>
          {errors.phone ? (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.phone.message}
            </p>
          ) : (
            <p className={cn('mt-1 text-[11px]', dark ? 'text-white/45' : 'text-charcoal/45')}>
              10 أرقام — يبدأ بـ 05 أو +966
            </p>
          )}
        </div>

        {serverError && (
          <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <p className="text-sm text-red-300">{serverError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-4 text-base font-extrabold transition-all active:scale-[0.99] sm:min-h-14',
            isSubmitting
              ? 'cursor-not-allowed bg-white/20 text-white/70'
              : dark
                ? 'bg-gold text-charcoal shadow-[0_4px_18px_rgba(215,168,92,0.35)] hover:bg-gold-dark'
                : 'bg-teal text-white shadow-[0_4px_18px_rgba(15,118,110,0.28)] hover:bg-teal-dark',
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              جاري تسجيل طلبك...
            </>
          ) : (
            <>
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <span>أكد الطلب — {formatPrice(offer.price)} ريال</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
        {[
          { icon: Banknote, label: 'الدفع عند الاستلام' },
          { icon: Truck, label: 'توصيل 2-4 أيام' },
          { icon: ShieldCheck, label: 'ضمان 30 يوم' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className={cn(
              'flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-2 text-center',
              dark ? 'bg-white/5 text-white/80' : 'bg-mist text-charcoal/70',
            )}
          >
            <Icon className={cn('h-4 w-4 shrink-0', dark ? 'text-gold' : 'text-teal')} strokeWidth={1.75} />
            <span className="text-[10px] font-bold leading-tight sm:text-[11px]">{label}</span>
          </div>
        ))}
      </div>
    </form>
  )
}
