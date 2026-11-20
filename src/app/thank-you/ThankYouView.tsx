'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Banknote,
  BellRing,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Headset,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  PhoneCall,
  Sun,
  Truck,
  Volume2,
  type LucideIcon,
} from 'lucide-react'
import { PRODUCTS, getOffersForProduct } from '@/lib/products'
import { WHATSAPP_PHONE_WA, buildWhatsAppUrl } from '@/lib/contact'
import { cn } from '@/lib/utils'
import { trackPurchaseOnce } from '@/lib/tracking'

type StoredOrderItem = {
  slug: string
  name_ar: string
  qty: number
  price: number
  image: string
}

type StoredUpsellItem = {
  slug: string
  name_ar: string
  price: number
  image?: string
}

type StoredOrder = {
  order_id: string
  order_number: string
  event_id?: string
  subtotal?: number
  upsell_total?: number
  total: number
  customer_name?: string
  phone?: string
  items?: StoredOrderItem[]
  upsell_item?: StoredUpsellItem | null
  created_at?: string
}

interface ThankYouViewProps {
  fallbackOrderNumber: string
  fallbackTotal: number | null
}

const CALL_START_HOUR = 9
const CALL_END_HOUR = 21
const CALL_WINDOW_SECONDS = 10 * 60
const CALL_ANCHOR_KEY = 'nasama_call_anchor'

type ClockPart = { value: string; label: string }

type CallPhase =
  | { phase: 'countdown'; seconds: number }
  | { phase: 'calling' }
  | { phase: 'closed'; seconds: number; earlyMorning: boolean }

function displayPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('966') && digits.length >= 12) return `0${digits.slice(3)}`
  return phone.trim()
}

function formatSar(value: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(Math.round(value || 0))
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function riyadhClock(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value
      return acc
    }, {})
  return {
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  }
}

function isRiyadhOpen(date: Date) {
  const { hour, minute } = riyadhClock(date)
  const minutes = hour * 60 + minute
  return minutes >= CALL_START_HOUR * 60 && minutes < CALL_END_HOUR * 60
}

function secondsUntilOpen(date: Date) {
  const { hour, minute, second } = riyadhClock(date)
  const nowSeconds = hour * 3600 + minute * 60 + second
  const openSeconds = CALL_START_HOUR * 3600
  if (nowSeconds < openSeconds) return openSeconds - nowSeconds
  return 24 * 3600 - nowSeconds + openSeconds
}

function clockParts(totalSeconds: number): ClockPart[] {
  const safe = Math.max(0, totalSeconds)
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  if (hours > 0) {
    return [
      { value: pad(hours), label: 'ساعة' },
      { value: pad(minutes), label: 'دقيقة' },
      { value: pad(seconds), label: 'ثانية' },
    ]
  }
  return [
    { value: pad(minutes), label: 'دقيقة' },
    { value: pad(seconds), label: 'ثانية' },
  ]
}

function resolveAnchor(createdAt: string | undefined, now: Date) {
  if (createdAt) {
    const parsed = Date.parse(createdAt)
    if (!Number.isNaN(parsed)) return parsed
  }
  if (!isRiyadhOpen(now)) return now.getTime()
  try {
    const saved = sessionStorage.getItem(CALL_ANCHOR_KEY)
    if (saved && !Number.isNaN(Number(saved))) return Number(saved)
    const stamp = now.getTime()
    sessionStorage.setItem(CALL_ANCHOR_KEY, String(stamp))
    return stamp
  } catch {
    return now.getTime()
  }
}

function getCallPhase(now: Date, anchorMs: number): CallPhase {
  const remain = Math.ceil((anchorMs + CALL_WINDOW_SECONDS * 1000 - now.getTime()) / 1000)
  const openNow = isRiyadhOpen(now)
  const orderedWhileOpen = isRiyadhOpen(new Date(anchorMs))

  if (orderedWhileOpen && remain > 0 && (openNow || remain <= 15 * 60)) {
    return { phase: 'countdown', seconds: remain }
  }
  if (openNow) return { phase: 'calling' }
  const { hour } = riyadhClock(now)
  return {
    phase: 'closed',
    seconds: secondsUntilOpen(now),
    earlyMorning: hour < CALL_START_HOUR,
  }
}

export default function ThankYouView({
  fallbackOrderNumber,
  fallbackTotal,
}: ThankYouViewProps) {
  const [order, setOrder] = useState<StoredOrder | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [now, setNow] = useState<Date | null>(null)
  const [anchor, setAnchor] = useState<number | null>(null)
  const tiktokPurchaseFired = useRef(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('nasama_order')
      if (raw) setOrder(JSON.parse(raw) as StoredOrder)
    } catch {
      setOrder(null)
    }
  }, [])

  useEffect(() => {
    if (tiktokPurchaseFired.current) return
    try {
      const raw = sessionStorage.getItem('nasama_order')
      if (!raw) return
      const parsed = JSON.parse(raw) as StoredOrder
      if (!parsed.order_id) return
      const contents = [
        ...(parsed.items ?? []).map((item) => ({
          content_id: item.slug,
          content_name: item.name_ar,
          content_type: 'product',
          quantity: item.qty || 1,
          price: item.price,
        })),
        ...(parsed.upsell_item?.slug
          ? [
              {
                content_id: parsed.upsell_item.slug,
                content_name: parsed.upsell_item.name_ar,
                content_type: 'product',
                quantity: 1,
                price: parsed.upsell_item.price,
              },
            ]
          : []),
      ]
      const fired = trackPurchaseOnce({
        value: parsed.total ?? fallbackTotal ?? 0,
        content_ids: contents.map((item) => item.content_id),
        contents,
        event_id: parsed.order_id,
        order_id: parsed.order_id,
        phone: parsed.phone,
      })
      if (fired) tiktokPurchaseFired.current = true
    } catch {
      // Purchase may already have fired from checkout.
    }
  }, [fallbackTotal])

  useEffect(() => {
    const current = new Date()
    setNow(current)
    setAnchor(resolveAnchor(order?.created_at, current))
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [order?.created_at])

  const orderNumber = order?.order_number || fallbackOrderNumber
  const orderTotal = order?.total ?? fallbackTotal ?? 0
  const subtotal = order?.subtotal ?? orderTotal
  const upsellTotal = order?.upsell_total ?? 0
  const customerFirstName = useMemo(() => {
    const name = (order?.customer_name || '').trim()
    if (!name) return ''
    return name.split(/\s+/)[0]
  }, [order?.customer_name])
  const phone = order?.phone || ''

  const phase = useMemo(() => {
    if (!now || anchor === null) return null
    return getCallPhase(now, anchor)
  }, [now, anchor])

  const itemsForDisplay = order?.items ?? []
  const cartSlugs = useMemo(() => {
    const set = new Set<string>()
    itemsForDisplay.forEach((item) => set.add(item.slug))
    if (order?.upsell_item?.slug) set.add(order.upsell_item.slug)
    return set
  }, [itemsForDisplay, order?.upsell_item])
  const crossSells = useMemo(
    () => PRODUCTS.filter((product) => !cartSlugs.has(product.slug)).slice(0, 2),
    [cartSlugs],
  )
  const shownPhone = phone ? displayPhone(phone) : ''
  const whatsappCorrectLink = useMemo(() => {
    const lines = ['السلام عليكم']
    lines.push(orderNumber ? `رقم طلبي: ${orderNumber}` : 'عندي طلب وأبي أصحّح رقم الجوال')
    if (shownPhone) lines.push(`الرقم المسجّل: ${shownPhone}`)
    lines.push('الرقم الصحيح:')
    return buildWhatsAppUrl(lines.join('\n'))
  }, [orderNumber, shownPhone])

  function copy(value: string, field: string) {
    if (!value || typeof navigator === 'undefined' || !navigator.clipboard) return
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1800)
    })
  }

  const callCopy = getCallCopy(phase, customerFirstName)
  const parts = clockParts(phase?.phase === 'calling' ? 0 : phase?.seconds ?? CALL_WINDOW_SECONDS)

  return (
    <div className="min-h-screen bg-teal-dark pb-24 text-white" dir="rtl">
      <section className="mx-auto w-full max-w-lg px-4 pb-8 pt-6 sm:pt-8">
        <div className="mb-5 flex flex-col items-center text-center">
          <GoldMark icon={CheckCircle2} />
          <h1 className="mt-3">
            <span className="block text-2xl font-extrabold text-white sm:text-3xl">كفو عليك</span>
            <span className="mt-1 block text-[2rem] font-extrabold leading-tight text-[#F6E3B0] sm:text-5xl">
              {customerFirstName ? `يا ${customerFirstName}` : 'حياك الله'}
            </span>
          </h1>
          <p className="mt-2 text-lg font-extrabold leading-snug text-white">طلبك تم، وحياك الله في نَفَس</p>
        </div>

        <div className="rounded-[1.4rem] border-2 border-[#E6C36A] bg-gradient-to-b from-[#FFFCF3] via-[#F8E7C2] to-[#E7C56A] p-3.5 text-charcoal shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:p-5">
          <div className="mb-3 flex items-center gap-3">
            <GoldMark icon={phase?.phase === 'closed' ? Sun : PhoneCall} />
            <div className="min-w-0 text-start">
              <p className="text-[15px] font-extrabold leading-tight sm:text-base">{callCopy.title}</p>
              <p className="mt-0.5 text-[12px] font-bold leading-snug text-teal-dark sm:text-[13px]">
                {callCopy.kicker}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-teal-dark px-3 py-4 text-center text-white shadow-sm">
            <p className="text-[12px] font-extrabold text-[#F6E3B0]">{callCopy.timerLabel}</p>
            <div
              className="mt-2 flex items-end justify-center gap-1"
              aria-label={callCopy.timerLabel}
            >
              {parts.map((part, index) => (
                <div key={part.label} className="flex items-end gap-1">
                  {index > 0 && (
                    <span className="mb-4 text-xl font-extrabold text-[#F6E3B0] sm:text-2xl">:</span>
                  )}
                  <div className="min-w-[3.15rem] sm:min-w-[4.5rem]">
                    <p className="text-[2rem] font-extrabold tabular-nums leading-none text-[#F6E3B0] sm:text-5xl">
                      {part.value}
                    </p>
                    <p className="mt-1 text-[11px] font-bold text-white/70">{part.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-3 max-w-sm text-[13px] font-bold leading-relaxed text-white/85">
              {callCopy.timerNote}
            </p>
          </div>

          <div className="mt-3 rounded-xl bg-white/75 px-3 py-3 ring-1 ring-[#E0C07A]">
            <p className="flex items-start gap-2 text-[13px] font-extrabold leading-relaxed text-teal-dark">
              <BellRing className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.25} />
              <span>{callCopy.confirmNotice}</span>
            </p>
          </div>

          <div className="mt-3 rounded-xl bg-teal-dark px-3 py-3 text-white">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white/70">رقمك اللي بنتصل عليه</p>
                <p className="truncate text-lg font-extrabold tracking-wide text-[#F6E3B0]" dir="ltr">
                  {shownPhone || '—'}
                </p>
              </div>
              <Phone className="h-5 w-5 shrink-0 text-[#F6E3B0]" />
            </div>
            <p className="mt-2 text-[12px] font-bold leading-snug text-white/80">
              لو الرقم غلط، أرسل الرقم الصحيح على واتساب قبل المكالمة.
            </p>
            <a
              href={whatsappCorrectLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-[14px] font-extrabold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              صحّح الرقم واتساب
            </a>
          </div>

          {orderNumber && (
            <button
              type="button"
              onClick={() => copy(orderNumber, 'order')}
              className="mt-3 flex w-full items-center justify-between gap-2 rounded-xl bg-white/70 px-3 py-2.5 text-start ring-1 ring-[#E0C07A]"
            >
              <span>
                <span className="block text-[11px] font-bold text-charcoal/55">رقم الطلب</span>
                <span className="text-sm font-extrabold text-charcoal" dir="ltr">
                  {orderNumber}
                </span>
              </span>
              <span className="flex items-center gap-1 text-[12px] font-extrabold text-teal-dark">
                <Copy className="h-4 w-4" />
                {copiedField === 'order' ? 'تم النسخ' : 'انسخ'}
              </span>
            </button>
          )}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
          {CONFIRM_ACTIONS.map((item) => (
            <article
              key={item.title}
              className="flex min-w-0 flex-col items-center rounded-2xl border border-gold/30 bg-white/5 px-1.5 py-3 text-center"
            >
              <GoldMark icon={item.icon} size="sm" />
              <p className="mt-2 text-[12px] font-extrabold leading-tight">{item.title}</p>
              <p className="mt-1 text-[10px] font-bold leading-snug text-white/65">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-gold/25 bg-white/5 px-3 py-3">
          <GoldMark icon={Clock3} size="sm" />
          <p className="min-w-0 text-[13px] font-bold leading-relaxed text-white/85">
            نشتغل من <span className="text-[#F6E3B0]">9 الصبح</span> لين{' '}
            <span className="text-[#F6E3B0]">9 الليل</span>. داخل الدوام، التأكيد خلال 10 دقايق.
          </p>
        </div>

        <section className="mt-8">
          <p className="text-[11px] font-extrabold tracking-[0.16em] text-[#F6E3B0]">وش يصير الحين</p>
          <h2 className="mt-1 text-xl font-extrabold">من المكالمة لين باب البيت</h2>
          <ol className="mt-4 space-y-2.5">
            {PROCESS.map((step, index) => (
              <li
                key={step.title}
                className="flex items-start gap-3 rounded-2xl border border-gold/25 bg-white/[0.04] p-3"
              >
                <span className="relative">
                  <GoldMark icon={step.icon} />
                  <span className="absolute -top-1 -start-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-teal text-[10px] font-extrabold text-[#F6E3B0] ring-2 ring-teal-dark">
                    {index + 1}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h3 className="text-sm font-extrabold">{step.title}</h3>
                    <span className="rounded-full bg-[#F6E3B0]/15 px-2 py-0.5 text-[10px] font-extrabold text-[#F6E3B0]">
                      {step.time}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] font-bold leading-relaxed text-white/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-4 rounded-2xl bg-teal px-3.5 py-3.5 text-white shadow-sm ring-1 ring-white/10">
          <p className="flex items-center gap-2 text-sm font-extrabold">
            <Truck className="h-4 w-4 shrink-0 text-[#F6E3B0]" />
            تنبيه التوصيل
          </p>
          <p className="mt-1.5 text-[13px] font-bold leading-relaxed text-white/90">
            الشحن من 2 إلى 4 أيام عمل بعد التأكيد. المندوب يتصل قبل لا يوصّل. استلم الطلب وتأكد منه،
            وبعدين ادفع كاش أو شبكة. لا ترفض الشحنة — هي مجهّزة باسمك.
          </p>
        </div>

        <section className="mt-8">
          <p className="text-[11px] font-extrabold tracking-[0.16em] text-[#F6E3B0]">تفاصيل الطلب</p>
          <h2 className="mt-1 text-xl font-extrabold">ملخص طلبك</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-gold/25 bg-white/[0.04]">
            {itemsForDisplay.length === 0 && (
              <p className="px-4 py-6 text-center text-sm font-bold text-white/55">
                تفاصيل المنتجات بتجيك مع مكالمة التأكيد.
              </p>
            )}
            {itemsForDisplay.map((item) => (
              <div key={item.slug} className="flex items-center gap-3 border-b border-white/10 px-3 py-3 last:border-b-0">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                  {item.image && (
                    <Image src={item.image} alt={item.name_ar} fill sizes="56px" className="object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-extrabold">{item.name_ar}</p>
                  <p className="mt-0.5 text-[12px] font-bold text-white/55">الكمية: {item.qty}</p>
                </div>
                <p className="shrink-0 text-sm font-extrabold text-[#F6E3B0]">
                  {formatSar(item.price)} <span className="text-[11px]">ر.س</span>
                </p>
              </div>
            ))}
            {order?.upsell_item && (
              <div className="flex items-center gap-3 border-t border-gold/30 bg-[#F6E3B0]/10 px-3 py-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                  {order.upsell_item.image && (
                    <Image
                      src={order.upsell_item.image}
                      alt={order.upsell_item.name_ar}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-extrabold text-[#F6E3B0]">إضافة العرض</p>
                  <p className="line-clamp-2 text-sm font-extrabold">{order.upsell_item.name_ar}</p>
                </div>
                <p className="shrink-0 text-sm font-extrabold text-[#F6E3B0]">
                  {formatSar(order.upsell_item.price)} <span className="text-[11px]">ر.س</span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-3 rounded-2xl border border-gold/25 bg-white/[0.04] p-4">
            <SummaryRow label="المجموع" value={`${formatSar(subtotal)} ر.س`} />
            {upsellTotal > 0 && <SummaryRow label="إضافات العرض" value={`${formatSar(upsellTotal)} ر.س`} />}
            <SummaryRow label="الشحن" value="مجاني" highlight />
            <div className="my-3 h-px bg-white/10" />
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[12px] font-bold text-white/60">تدفعه للمندوب يوم الاستلام</p>
                <p className="mt-1 text-3xl font-extrabold text-[#F6E3B0]">
                  {formatSar(orderTotal)} <span className="text-sm text-white/70">ر.س</span>
                </p>
              </div>
              <div className="rounded-2xl bg-teal px-3 py-2 text-center">
                <Banknote className="mx-auto h-4 w-4 text-[#F6E3B0]" />
                <p className="mt-1 text-[10px] font-extrabold leading-tight">الدفع عند الاستلام</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <p className="text-[11px] font-extrabold tracking-[0.16em] text-[#F6E3B0]">قبل لا تقفل الصفحة</p>
          <h2 className="mt-1 text-xl font-extrabold">أسئلة الناس تسألها</h2>
          <div className="mt-4 space-y-2">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {crossSells.length > 0 && (
          <section className="mt-8">
            <p className="text-[11px] font-extrabold tracking-[0.16em] text-[#F6E3B0]">قبل الشحن</p>
            <h2 className="mt-1 text-xl font-extrabold">تبي تضيف شي لنفس الطلب؟</h2>
            <p className="mt-1 text-[13px] font-bold text-white/65">
              كلّمنا واتساب ونحطه مع طلبك، بدون شحن زيادة.
            </p>
            <div className="mt-4 space-y-2.5">
              {crossSells.map((product) => {
                const ws = buildWhatsAppUrl(
                  `السلام عليكم، رقم طلبي ${orderNumber}. أبي أضيف ${product.nameAr} لنفس الطلب.`,
                )
                return (
                  <div
                    key={product.slug}
                    className="flex gap-3 rounded-2xl border border-gold/25 bg-white/[0.04] p-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/10">
                      <Image src={product.image} alt={product.nameAr} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="line-clamp-2 text-sm font-extrabold">{product.nameAr}</p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                        <span className="text-sm font-extrabold text-[#F6E3B0]">
                          من {getOffersForProduct(product.slug)[0].price} ر.س
                        </span>
                        <a
                          href={ws}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl bg-[#F6E3B0] px-3 py-2 text-[12px] font-extrabold text-charcoal"
                        >
                          أضفه
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <div className="mt-8 rounded-[1.4rem] border border-gold/30 bg-gradient-to-b from-white/[0.07] to-transparent p-5 text-center">
          <Headset className="mx-auto h-8 w-8 text-[#F6E3B0]" />
          <h3 className="mt-2 text-lg font-extrabold">الرقم غلط أو تبي تعدّل العنوان؟</h3>
          <p className="mt-1 text-[13px] font-bold leading-relaxed text-white/70">
            راسلنا قبل مكالمة التأكيد عشان الطلب يطلع صح من أول مرة.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={whatsappCorrectLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 text-[15px] font-extrabold text-white"
            >
              <MessageCircle className="h-5 w-5" />
              واتساب نَفَس
            </a>
            <a
              href={`tel:+${WHATSAPP_PHONE_WA}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#E6C36A] px-4 text-sm font-extrabold text-[#F6E3B0]"
            >
              <Phone className="h-4 w-4" />
              اتصل بنا
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-bold text-white/50">
            العودة للرئيسية
          </Link>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6C36A]/40 bg-teal-dark/95 px-4 py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <p className="text-center text-[13px] font-extrabold text-[#F6E3B0]">{callCopy.sticky}</p>
      </div>
    </div>
  )
}

function getCallCopy(phase: CallPhase | null, name: string) {
  const who = name ? `يا ${name}` : ''
  if (!phase || phase.phase === 'countdown') {
    return {
      title: who ? `بنتصل فيك ${who}` : 'بنتصل فيك الحين',
      kicker: 'تأكيد الطلب خلال 10 دقايق',
      timerLabel: 'المكالمة بعد',
      timerNote: 'خلّ الجوال جنبك وارفع الصوت. رد حتى لو الرقم مو محفوظ.',
      confirmNotice: 'إذا ما رديت، الطلب يتأجل وما يطلع للشحن. المكالمة دقيقة أو دقيقتين: اسمك، الحي، والكمية.',
      sticky: 'خلّ جوالك جنبك — بنتصل خلال 10 دقايق',
    }
  }
  if (phase.phase === 'calling') {
    return {
      title: 'المكالمة صايرة الحين',
      kicker: 'لا تسكت الرقم الغريب',
      timerLabel: 'وقت التأكيد',
      timerNote: 'لو ما جاتك، خلّ الجوال مفتوح. بنعيد الاتصال داخل الدوام.',
      confirmNotice: 'رد الحين. إذا ما رديت، الطلب يتأجل وما يطلع للشحن.',
      sticky: 'المكالمة صايرة الحين — رد حتى لو الرقم غريب',
    }
  }
  return {
    title: phase.earlyMorning ? 'لسه ما فتحنا الدوام' : 'الدوام قفل الحين',
    kicker: phase.earlyMorning
      ? 'الساعة 9 الصبح بنتصل خلال 10 دقايق'
      : 'بكرة 9 الصبح بنتصل خلال 10 دقايق',
    timerLabel: 'الدوام يفتح بعد',
    timerNote: 'طلبك محفوظ. أول ما نفتح الساعة 9 الصبح بنتصل فيك خلال 10 دقايق.',
    confirmNotice: 'نشتغل من 9 الصبح لين 9 الليل. خلّ الجوال قريب أول الدوام ورد على المكالمة.',
    sticky: phase.earlyMorning
      ? 'بنتصل 9 الصبح خلال 10 دقايق — خلّ الجوال قريب'
      : 'طلبك محفوظ — بنتصل بكرة 9 الصبح',
  }
}

function GoldMark({ icon: Icon, size = 'md' }: { icon: LucideIcon; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-12 w-12'
  const glyph = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <span className={cn('relative flex shrink-0 items-center justify-center', box)}>
      <span className="absolute inset-0 rounded-2xl bg-teal-dark shadow-sm ring-1 ring-[#E6C36A]/80" />
      <span className="absolute inset-[3px] rounded-[13px] bg-gradient-to-b from-[#FFF6DE] to-[#D7A85C]" />
      <Icon className={cn('relative text-teal-dark', glyph)} strokeWidth={2.25} />
    </span>
  )
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-sm font-bold text-white/65">{label}</span>
      <span className={cn('text-sm font-extrabold', highlight ? 'text-[#F6E3B0]' : 'text-white')}>{value}</span>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      className="w-full overflow-hidden rounded-2xl border border-gold/25 bg-white/[0.04] text-right"
    >
      <span className="flex items-center justify-between gap-3 px-4 py-3.5">
        <span className="text-sm font-extrabold">{q}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-[#F6E3B0] transition', open && 'rotate-180')} />
      </span>
      {open && (
        <span className="block border-t border-white/10 px-4 py-3 text-[13px] font-bold leading-relaxed text-white/75">
          {a}
        </span>
      )}
    </button>
  )
}

const CONFIRM_ACTIONS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Volume2, title: 'ارفع الصوت', body: 'خلّ الجوال جنبك' },
  { icon: Phone, title: 'رد على الاتصال', body: 'حتى لو الرقم غريب' },
  { icon: MapPin, title: 'أكّد الحي', body: 'عشان يطلع الشحن' },
]

const PROCESS: { icon: LucideIcon; title: string; time: string; body: string }[] = [
  {
    icon: PhoneCall,
    title: 'تأكيد أول',
    time: 'خلال 10 دقايق',
    body: 'نتصل من رقم سعودي. ترد، ونأكد الاسم والحي والكمية. المكالمة قصيرة.',
  },
  {
    icon: Package,
    title: 'نجهّز طلبك',
    time: 'بعد التأكيد',
    body: 'أول ما تأكد، نجهّز الطلب ونسلّمه لشركة الشحن.',
  },
  {
    icon: Truck,
    title: 'التوصيل',
    time: '2 إلى 4 أيام عمل',
    body: 'المندوب يتصل قبل لا يوصّل. الشحن لكل مناطق المملكة.',
  },
  {
    icon: Banknote,
    title: 'تدفع عند الباب',
    time: 'يوم الاستلام',
    body: 'تستلم وتتأكد، بعدين تدفع كاش أو شبكة. ما تدفع شي الحين.',
  },
]

const FAQS = [
  {
    q: 'متى بتتصلون؟',
    a: 'داخل الدوام، خلال 10 دقايق من الطلب. نشتغل من 9 الصبح لين 9 الليل بتوقيت السعودية. لو طلبت بعد الدوام، بنتصل أول ما نفتح الساعة 9 الصبح.',
  },
  {
    q: 'لو ما رديت على المكالمة؟',
    a: 'الطلب يتأجل وما يطلع للشحن. رد حتى لو الرقم مو محفوظ، المكالمة دقيقة أو دقيقتين بس.',
  },
  {
    q: 'متى يوصل الطلب؟',
    a: 'بعد التأكيد، الشحن ياخذ من 2 إلى 4 أيام عمل. المندوب يتصل قبل لا يجي.',
  },
  {
    q: 'أدفع الحين ولا عند الاستلام؟',
    a: 'عند الاستلام. كاش أو شبكة، بعد ما تستلم وتتأكد. لا تدفع أي مبلغ الحين، ولا تحوّل لأحد.',
  },
  {
    q: 'أقدر أغيّر العنوان؟',
    a: 'إيه، قبل ما يطلع الشحن. راسلنا واتساب برقم الطلب وبنعدّله.',
  },
]
