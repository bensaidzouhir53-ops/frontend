'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  BadgeCheck,
  Banknote,
  Loader2,
  MousePointerClick,
  PenLine,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import type { Offer, Product } from '@/types'
import { createOrder } from '@/lib/api'
import {
  captureAttribution,
  generateEventId,
  trackAddToCart,
  trackInitiateCheckoutOnce,
  trackPurchaseOnce,
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

      const purchaseId = response.order_id || eventId
      trackPurchaseOnce({
        value: response.total ?? offer.price,
        currency: 'SAR',
        content_ids: [product.slug],
        content_type: 'product',
        contents: [
          {
            content_id: product.slug,
            content_name: product.nameAr,
            content_type: 'product',
            quantity: offer.qty,
            price: offer.price,
          },
        ],
        order_id: purchaseId,
        event_id: purchaseId,
        phone: normalizedPhone,
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
      'h-12 w-full min-w-0 max-w-full rounded-xl border-2 text-[16px] leading-normal outline-none transition-colors sm:h-[52px]',
      dark
        ? 'bg-white text-charcoal placeholder:text-charcoal/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
        : 'bg-white text-charcoal placeholder:text-charcoal/35',
      hasError
        ? 'border-red-400 focus:border-red-400'
        : dark
          ? 'border-[#E2C07A] focus:border-teal focus:ring-2 focus:ring-teal/25'
          : 'border-teal/15 focus:border-teal',
    )

  const orderSteps: { icon: LucideIcon; title: string }[] = [
    { icon: MousePointerClick, title: 'اختر العرض' },
    { icon: PenLine, title: 'اسمك وجوالك' },
    { icon: BadgeCheck, title: 'أكد الطلب' },
  ]

  const trustItems: { icon: LucideIcon; label: string }[] = [
    { icon: Banknote, label: 'الدفع عند الاستلام' },
    { icon: Truck, label: 'توصيل 2-4 أيام' },
    { icon: ShieldCheck, label: 'ضمان 30 يوم' },
  ]

  return (
    <form
      id="quick-order"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        'scroll-mt-28 w-full min-w-0 max-w-full',
        dark
          ? 'rounded-[1.35rem] border-2 border-[#E6C36A] bg-gradient-to-b from-[#FFFCF3] via-[#F8E7C2] to-[#E7C56A] p-3 text-charcoal shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:rounded-3xl sm:p-5'
          : 'rounded-2xl border border-teal/15 bg-white p-3 shadow-[0_8px_24px_rgba(15,118,110,0.08)] sm:p-4',
      )}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className={cn(
            'relative flex h-12 w-12 shrink-0 items-center justify-center',
            dark ? '' : 'rounded-2xl bg-teal text-white',
          )}
        >
          {dark ? (
            <>
              <span className="absolute inset-0 rounded-2xl bg-teal-dark shadow-sm" />
              <span className="absolute inset-[3px] rounded-[13px] bg-gradient-to-b from-[#FFF6DE] to-[#D7A85C]" />
              <Sparkles className="relative h-5 w-5 text-teal-dark" strokeWidth={2.25} />
            </>
          ) : (
            <ShieldCheck className="h-5 w-5" strokeWidth={2} />
          )}
        </div>
        <div className="min-w-0 text-start">
          <p className={cn('text-[15px] font-extrabold leading-tight sm:text-base', dark ? 'text-charcoal' : 'text-charcoal')}>
            {dark ? 'كيف تطلب؟ ثلاث خطوات' : 'أكمل طلبك الآن'}
          </p>
          <p className={cn('mt-0.5 text-[12px] font-bold leading-snug sm:text-[13px]', dark ? 'text-teal-dark' : 'text-charcoal/55')}>
            اسمك وجوالك فقط — تدفع عند الاستلام
          </p>
        </div>
      </div>

      {dark && (
        <ol className="mb-3 grid grid-cols-3 gap-1.5 sm:gap-2">
          {orderSteps.map(({ icon: Icon, title }, index) => (
            <li
              key={title}
              className="flex min-w-0 flex-col items-center rounded-xl bg-white/75 px-1 py-2 text-center ring-1 ring-[#E0C07A]"
            >
              <span className="relative mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#FFF6DE] to-[#E2B85A] text-teal-dark shadow-sm ring-1 ring-[#C9963A]/45">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
                <span className="absolute -top-1 -start-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-teal-dark text-[10px] font-extrabold leading-none text-[#F6E3B0]">
                  {index + 1}
                </span>
              </span>
              <span className="text-[11px] font-extrabold leading-tight text-charcoal sm:text-xs">{title}</span>
            </li>
          ))}
        </ol>
      )}

      <div
        className={cn(
          'mb-3 flex items-center justify-between gap-2 rounded-xl px-3 py-2.5',
          dark ? 'bg-teal-dark text-white shadow-sm' : 'bg-teal/[0.06] ring-1 ring-teal/15',
        )}
      >
        <p className={cn('min-w-0 truncate text-xs font-bold sm:text-sm', dark ? 'text-white' : 'text-charcoal')}>
          {offerTitle}
        </p>
        <p className={cn('shrink-0 text-sm font-extrabold tabular-nums sm:text-base', dark ? 'text-[#F6E3B0]' : 'text-teal')}>
          {formatPrice(offer.price)} ريال
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <label
            htmlFor="quick-order-name"
            className={cn('mb-1.5 block text-xs font-bold sm:text-sm', dark ? 'text-charcoal' : 'text-charcoal')}
          >
            الاسم الكريم
          </label>
          <div className="relative">
            <FieldGlyph icon={UserRound} premium={dark} error={Boolean(errors.name)} />
            <input
              id="quick-order-name"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              placeholder="أدخل اسمك"
              className={cn(fieldClass(Boolean(errors.name)), dark ? 'ps-14 pe-3' : 'ps-11 pe-3')}
              {...register('name')}
            />
          </div>
          {errors.name && (
            <p className={cn('mt-1.5 flex items-center gap-1 text-xs', dark ? 'text-red-700' : 'text-red-400')}>
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quick-order-phone"
            className={cn('mb-1.5 block text-xs font-bold sm:text-sm', dark ? 'text-charcoal' : 'text-charcoal')}
          >
            رقم الجوال
          </label>
          <div className="relative">
            <FieldGlyph icon={Phone} premium={dark} error={Boolean(errors.phone)} />
            <input
              id="quick-order-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              enterKeyHint="done"
              placeholder="05XXXXXXXX"
              dir="ltr"
              className={cn(fieldClass(Boolean(errors.phone)), dark ? 'pe-14 ps-3 text-right' : 'pe-11 ps-3 text-right')}
              {...register('phone')}
            />
          </div>
          {errors.phone ? (
            <p className={cn('mt-1.5 flex items-center gap-1 text-xs', dark ? 'text-red-700' : 'text-red-400')}>
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors.phone.message}
            </p>
          ) : (
            <p className={cn('mt-1 text-[12px] font-medium leading-snug', dark ? 'text-teal-dark/80' : 'text-charcoal/45')}>
              10 أرقام — يبدأ بـ 05 أو +966
            </p>
          )}
        </div>

        {serverError && (
          <div
            className={cn(
              'flex items-start gap-2 rounded-xl border px-3 py-2.5',
              dark ? 'border-red-300 bg-red-50' : 'border-red-400/30 bg-red-500/10',
            )}
          >
            <AlertCircle className={cn('mt-0.5 h-4 w-4 shrink-0', dark ? 'text-red-600' : 'text-red-400')} />
            <p className={cn('text-sm', dark ? 'text-red-700' : 'text-red-300')}>{serverError}</p>
          </div>
        )}

        {dark && (
          <p className="text-center text-[12px] font-bold leading-snug text-teal-dark">
            اكتب اسمك وجوالك، ثم اضغط الزر. ما تدفع الآن — المندوب يوصّل والفلوس عند الاستلام.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-center text-[16px] font-extrabold leading-tight transition-all active:scale-[0.99] sm:min-h-14 sm:px-4',
            isSubmitting
              ? dark
                ? 'cursor-not-allowed bg-[#E7C56A]/50 text-charcoal/50'
                : 'cursor-not-allowed bg-white/20 text-white/70'
              : dark
                ? 'bg-gradient-to-b from-[#F8E7C2] to-[#C9963A] text-charcoal shadow-[0_10px_22px_rgba(184,136,56,0.45)] ring-1 ring-[#A67C2D]/40 hover:from-[#FFF6DE] hover:to-[#B88838]'
                : 'bg-teal text-white shadow-[0_4px_18px_rgba(15,118,110,0.28)] hover:bg-teal-dark',
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
              جاري تسجيل طلبك...
            </>
          ) : dark ? (
            <>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-dark text-[#F6E3B0]">
                <BadgeCheck className="h-[18px] w-[18px]" strokeWidth={2.25} />
              </span>
              <span className="min-w-0">
                أكد الطلب الآن
                <span className="mt-0.5 block text-[12px] font-bold text-teal-dark">
                  {formatPrice(offer.price)} ريال · تدفع عند الاستلام
                </span>
              </span>
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
        {trustItems.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className={cn(
              'flex min-w-0 flex-col items-center gap-1.5 rounded-xl px-1 py-2 text-center',
              dark ? 'bg-white/70 text-charcoal ring-1 ring-[#E0C07A]/80' : 'bg-mist text-charcoal/70',
            )}
          >
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                dark
                  ? 'bg-gradient-to-b from-[#FFF6DE] to-[#E2B85A] text-teal-dark ring-1 ring-[#C9963A]/40'
                  : 'bg-transparent text-teal',
              )}
            >
              <Icon className={cn('shrink-0', dark ? 'h-[16px] w-[16px]' : 'h-4 w-4')} strokeWidth={2.25} />
            </span>
            <span className="text-[11px] font-extrabold leading-tight sm:text-xs">{label}</span>
          </div>
        ))}
      </div>
    </form>
  )
}

function FieldGlyph({
  icon: Icon,
  premium,
  error,
}: {
  icon: LucideIcon
  premium: boolean
  error: boolean
}) {
  if (!premium) {
    return (
      <Icon
        className={cn(
          'pointer-events-none absolute start-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2',
          error ? 'text-red-400' : 'text-teal',
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        'pointer-events-none absolute start-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-sm',
        error
          ? 'bg-red-50 text-red-600 ring-1 ring-red-300'
          : 'bg-gradient-to-b from-[#FFF6DE] to-[#E2B85A] text-teal-dark ring-1 ring-[#C9963A]/50',
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
    </span>
  )
}
