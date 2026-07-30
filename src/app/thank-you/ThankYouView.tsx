'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Headset,
  MapPin,
  MessageCircle,
  Moon,
  Package,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Truck,
  Volume2,
} from 'lucide-react'
import { PRODUCTS, getProductBySlug, getOffersForProduct } from '@/lib/products'
import {
  WHATSAPP_PHONE_WA,
  buildGeneralWhatsAppUrl,
  buildWhatsAppUrl,
} from '@/lib/contact'
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

function maskPhone(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '')
  if (digits.length < 6) return phone
  const tail = digits.slice(-3)
  const head = digits.slice(0, 3)
  return `${head} *** **${tail}`
}

function formatSar(value: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(Math.round(value || 0))
}

function getRiyadhParts(): { hour: number; minute: number; iso: string } {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Riyadh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .formatToParts(now)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== 'literal') acc[part.type] = part.value
      return acc
    }, {})
  return {
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    iso: now.toISOString(),
  }
}

const CALL_START_HOUR = 9
const CALL_END_HOUR = 21

export default function ThankYouView({
  fallbackOrderNumber,
  fallbackTotal,
}: ThankYouViewProps) {
  const [order, setOrder] = useState<StoredOrder | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('nasama_order')
      if (raw) {
        const parsed = JSON.parse(raw) as StoredOrder
        setOrder(parsed)
      }
    } catch {
      setOrder(null)
    }
  }, [])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('nasama_order')
      if (!raw) return
      const parsed = JSON.parse(raw) as StoredOrder
      if (!parsed.order_id) return
      const contentIds = [
        ...(parsed.items?.map((item) => item.slug) ?? []),
        ...(parsed.upsell_item?.slug ? [parsed.upsell_item.slug] : []),
      ]
      trackPurchaseOnce({
        value: parsed.total ?? fallbackTotal ?? 0,
        content_ids: contentIds,
        event_id: parsed.event_id,
        order_id: parsed.order_id,
      })
    } catch {
      // Purchase may already have fired from checkout/upsell flow.
    }
  }, [fallbackTotal])

  useEffect(() => {
    const id = setInterval(() => setTick((value) => value + 1), 30_000)
    return () => clearInterval(id)
  }, [])

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

  const callStatus = useMemo(() => {
    void tick
    const { hour, minute } = getRiyadhParts()
    const minutesNow = hour * 60 + minute
    const startMinutes = CALL_START_HOUR * 60
    const endMinutes = CALL_END_HOUR * 60
    const inside = minutesNow >= startMinutes && minutesNow < endMinutes

    if (inside) {
      return {
        mode: 'inside' as const,
        pill: 'دوامنا مفتوح الحين',
        headline: 'بنتصل فيك خلال أقل من 10 دقائق ⏱️',
        sub:
          'من رقم سعودي 🇸🇦 — يرجى الرد ولو ما تعرف الرقم. المكالمة أقل من دقيقتين، نتأكد من العنوان وعدد القطع، وبعدها يدخل طلبك مباشرة في الشحن.',
      }
    }

    const earlyMorning = minutesNow < startMinutes

    return {
      mode: 'outside' as const,
      pill: earlyMorning ? 'صباح الخير 🌅' : 'دوامنا قفل الحين',
      headline: earlyMorning
        ? 'أول ما يبدأ دوامنا الساعة 9 ص بنتصل فيك على طول'
        : 'بنتصل فيك صباحاً بعون الله الساعة 9 ص',
      sub: 'نشتغل من 9 صباحاً إلى 9 مساءً بتوقيت الرياض، ونرد على كل طلب خلال 10 دقائق داخل هذا الوقت. طلبك محفوظ ومُجهَّز، ما عليك إلا تخلي جوالك قريب صباحاً.',
    }
  }, [tick])

  const itemsForDisplay: StoredOrderItem[] = useMemo(() => {
    if (order?.items && order.items.length > 0) return order.items
    return []
  }, [order?.items])

  const cartSlugs = useMemo(() => {
    const set = new Set<string>()
    itemsForDisplay.forEach((item) => set.add(item.slug))
    if (order?.upsell_item?.slug) set.add(order.upsell_item.slug)
    return set
  }, [itemsForDisplay, order?.upsell_item])

  const crossSells = useMemo(() => {
    return PRODUCTS.filter((product) => !cartSlugs.has(product.slug)).slice(0, 2)
  }, [cartSlugs])

  const whatsappSupportLink = useMemo(() => buildGeneralWhatsAppUrl(), [])

  function copy(value: string, field: string) {
    if (!value || typeof navigator === 'undefined' || !navigator.clipboard) return
    void navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1800)
    })
  }

  const greetingName = customerFirstName ? `، ${customerFirstName}` : ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal/5 via-ivory to-mist/30 pb-20" dir="rtl">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark to-teal pb-28 pt-12 text-white md:pt-16">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/15" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-white/10" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10"
          >
            <CheckCircle2 className="h-14 w-14 text-white drop-shadow" strokeWidth={2.5} />
          </div>
          <p className="text-sm font-extrabold uppercase tracking-[0.3em] text-gold">
            طلبك تم بنجاح
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            ألف مبروك{greetingName} 🎉
            <br />
            <span className="text-gold">نفسك الجديد بدأ من هنا.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 md:text-lg">
            انضممت لأكثر من <strong className="text-gold">12,000</strong> سعودي اختار نفس لرئة
            أنظف وتنفس أخف. خليك جنب جوالك — مكالمة التأكيد قريبة.
          </p>

          {orderNumber && (
            <div className="mx-auto mt-7 flex w-fit items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3">
              <div className="text-right">
                <p className="text-xs font-bold text-white/70">رقم الطلب</p>
                <p className="ltr text-lg font-extrabold tracking-wide text-gold">
                  {orderNumber}
                </p>
              </div>
              <button
                onClick={() => copy(orderNumber, 'order')}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 transition hover:bg-white/25"
                aria-label="نسخ رقم الطلب"
              >
                <Copy className="h-4 w-4" />
              </button>
              {copiedField === 'order' && (
                <span className="text-xs font-bold text-gold">تم النسخ ✓</span>
              )}
            </div>
          )}

        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="relative -mt-20 mx-auto max-w-3xl px-4">
        {/* CALL BANNER — the star */}
        <div className="relative overflow-hidden rounded-[2rem] border border-teal/30 bg-white p-6 shadow-2xl md:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/15" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal text-white shadow-lg shadow-teal/30">
              {callStatus.mode === 'inside' ? (
                <Phone className="h-7 w-7" />
              ) : (
                <Sun className="h-7 w-7" />
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-extrabold text-teal-dark">
                  <Clock className="h-3 w-3" />
                  {callStatus.pill}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-charcoal/5 px-3 py-1 text-xs font-bold text-charcoal/70">
                  <Volume2 className="h-3 w-3" />
                  رقم سعودي 🇸🇦
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-charcoal/5 px-3 py-1 text-xs font-bold text-charcoal/70">
                  دوامنا 9 ص – 9 م (الرياض)
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-charcoal md:text-2xl">
                {callStatus.headline}
              </h2>
              <p className="mt-2 text-sm font-bold leading-relaxed text-charcoal/60">
                {callStatus.sub}
              </p>
            </div>
          </div>

          {/* phone confirmation */}
          {phone && (
            <div className="mt-6 flex flex-col items-stretch gap-3 rounded-2xl bg-mist/70 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal" />
                <div>
                  <p className="text-xs font-bold text-charcoal/50">المكالمة بتوصل على</p>
                  <p className="ltr text-base font-extrabold tracking-wide text-charcoal">
                    {maskPhone(phone)}
                  </p>
                </div>
              </div>
              <a
                href={whatsappSupportLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-charcoal px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-charcoal/90"
              >
                <MessageCircle className="h-4 w-4" />
                الرقم خطأ؟ صحّحه عبر واتساب
              </a>
            </div>
          )}

          {/* trust mini-row */}
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px] font-extrabold text-charcoal/70 md:text-xs">
            <div className="rounded-xl bg-white px-2 py-3 shadow-sm">
              <ShieldCheck className="mx-auto mb-1 h-5 w-5 text-teal" />
              ما تدفع شي الحين
            </div>
            <div className="rounded-xl bg-white px-2 py-3 shadow-sm">
              <Truck className="mx-auto mb-1 h-5 w-5 text-teal" />
              شحن مجاني
            </div>
            <div className="rounded-xl bg-white px-2 py-3 shadow-sm">
              <BadgeCheck className="mx-auto mb-1 h-5 w-5 text-teal" />
              ضمان 30 يوم
            </div>
          </div>
        </div>

        {/* TIMELINE — what happens next */}
        <Section title="وش يصير الحين؟" eyebrow="خطواتك القادمة">
          <ol className="relative space-y-5 border-r-2 border-dashed border-teal/30 pr-6">
            <TimelineStep
              icon={Phone}
              title="مكالمة التأكيد"
              tone="active"
              time={
                callStatus.mode === 'inside'
                  ? 'خلال 10 دقائق'
                  : 'صباحاً 9 ص خلال 10 دقائق'
              }
              body="نتأكد من الاسم والعنوان وعدد القطع. المكالمة قصيرة وبتاخذ أقل من دقيقتين، ومن رقم سعودي 🇸🇦 (يرجى الرد ولو ما تعرف الرقم)."
            />
            <TimelineStep
              icon={Package}
              title="تجهيز الطلب وتغليفه"
              time="خلال 24 ساعة"
              body="ننسّق طلبك بعناية ونرسله لشركة الشحن مع رقم تتبع تشوفه على الواتساب."
            />
            <TimelineStep
              icon={Truck}
              title="التوصيل لباب البيت"
              time="خلال 2-5 أيام عمل"
              body="المندوب بيتصل قبل لا يوصل. تستلم وتتأكد من حالة الطلب، وبعدها تدفع كاش أو شبكة."
            />
            <TimelineStep
              icon={PackageCheck}
              title="استلام وتجربة فورية"
              time="اليوم الأول"
              body="من أول بختين راح تحس بانتعاش وخفة بصدرك. واستمر يومياً لنتيجة أعمق."
            />
          </ol>
        </Section>

        {/* RESULTS PREVIEW */}
        <Section title="وش بتحس فيه بالضبط؟" eyebrow="رحلتك مع نفس">
          <div className="grid gap-3 md:grid-cols-3">
            <ResultCard
              day="من أول استخدام"
              title="انتعاش وخفة فورية"
              body="بختين، ودقائق بعدها بتلاحظ أن الصدر مفتوح وأخف، والنفس صار أعمق."
              icon={Sparkles}
            />
            <ResultCard
              day="خلال 7 أيام"
              title="بلغم أقل، نوم أهدى"
              body="الكحة الصباحية تقل، ما تحس بثقل بصدرك، وحتى الشخير يخف عند بعض العملاء."
              icon={Moon}
            />
            <ResultCard
              day="خلال 30 يوم"
              title="رئة أنظف، نَفَس أطول"
              body="استخدام منتظم = رئة مرتاحة من تراكمات الدخان والغبار، وطاقة أعلى بيومك."
              icon={CheckCircle2}
            />
          </div>
          <p className="mt-4 rounded-2xl bg-teal/5 px-4 py-3 text-sm font-bold text-teal-dark">
            💡 نصيحة من فريقنا: استخدمه بختين صباحاً وبختين قبل النوم لمدة 30 يوم — هذي
            المدة اللي 9 من كل 10 عملاء حسوا فيها بفرق واضح.
          </p>
        </Section>

        {/* ORDER SUMMARY — clean */}
        <Section title="ملخص طلبك" eyebrow="التفاصيل">
          <div className="overflow-hidden rounded-2xl border border-sage/20 bg-white">
            {itemsForDisplay.length === 0 && (
              <div className="px-5 py-8 text-center text-sm font-bold text-charcoal/40">
                تفاصيل المنتجات بتظهر في رسالة الواتساب.
              </div>
            )}
            {itemsForDisplay.map((item) => (
              <div
                key={item.slug}
                className="flex items-center gap-4 border-b border-sage/15 px-4 py-4 last:border-b-0"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name_ar}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-2 text-sm font-extrabold text-charcoal">
                    {item.name_ar}
                  </p>
                  <p className="mt-1 text-xs font-bold text-charcoal/50">
                    الكمية: {item.qty}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-base font-extrabold text-charcoal">
                    {formatSar(item.price)} <span className="text-xs font-bold">ر.س</span>
                  </p>
                </div>
              </div>
            ))}
            {order?.upsell_item && (
              <div className="flex items-center gap-4 border-t border-gold/30 bg-gold/5 px-4 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist">
                  {order.upsell_item.image && (
                    <Image
                      src={order.upsell_item.image}
                      alt={order.upsell_item.name_ar}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-gold-dark">
                    <Sparkles className="h-3 w-3" />
                    إضافة العرض الخاص
                  </p>
                  <p className="line-clamp-2 text-sm font-extrabold text-charcoal">
                    {order.upsell_item.name_ar}
                  </p>
                </div>
                <p className="text-base font-extrabold text-gold-dark">
                  {formatSar(order.upsell_item.price)}{' '}
                  <span className="text-xs font-bold">ر.س</span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2 rounded-2xl bg-white p-5 shadow-sm">
            <SummaryRow label="المجموع الفرعي" value={`${formatSar(subtotal)} ر.س`} />
            {upsellTotal > 0 && (
              <SummaryRow
                label="إضافات العرض"
                value={`${formatSar(upsellTotal)} ر.س`}
              />
            )}
            <SummaryRow label="الشحن" value="مجاني" highlight />
            <div className="my-3 h-px bg-sage/20" />
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-charcoal/50">المبلغ الذي ستدفعه للمندوب</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-teal">
                    {formatSar(orderTotal)}
                  </span>
                  <span className="text-sm font-bold text-charcoal/60">ر.س</span>
                </p>
              </div>
              <div className="rounded-2xl bg-teal/10 px-4 py-2 text-center">
                <ShieldCheck className="mx-auto mb-1 h-5 w-5 text-teal" />
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-teal-dark">
                  الدفع عند الاستلام
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* CROSS-SELL */}
        {crossSells.length > 0 && (
          <Section
            title="تبي تكمّل الروتين؟"
            eyebrow="أضفها قبل الشحن"
            description="منتجاتنا الأخرى اللي يأخذها العملاء غالباً مع طلبك. كلّم فريقنا على واتساب لإضافتها بنفس الطلب بدون رسوم شحن إضافية."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {crossSells.map((product) => {
                const ws = buildWhatsAppUrl(
                  `السلام عليكم، رقم طلبي ${orderNumber}. أبي أضيف ${product.nameAr} لنفس الطلب 🙌`,
                )
                return (
                  <div
                    key={product.slug}
                    className="group flex gap-4 overflow-hidden rounded-2xl border border-sage/20 bg-white p-4 transition hover:shadow-lg"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-mist">
                      <Image
                        src={product.image}
                        alt={product.nameAr}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="line-clamp-2 text-sm font-extrabold text-charcoal">
                        {product.nameAr}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs font-bold text-charcoal/55">
                        {product.shortDescAr}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="text-sm font-extrabold text-teal">
                          من {getOffersForProduct(product.slug)[0].price} ر.س
                        </span>
                        <a
                          href={ws}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 rounded-xl bg-teal px-3 py-2 text-xs font-extrabold text-white shadow-md shadow-teal/30 hover:bg-teal-dark"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          أضفه لطلبي
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

        {/* SOCIAL PROOF */}
        <Section title="رأي عملاء نفس" eyebrow="مجرب من السعوديين">
          <div className="mb-5 flex items-center justify-between rounded-2xl bg-charcoal px-5 py-4 text-white">
            <div>
              <p className="text-xs font-bold text-white/60">تقييم العملاء</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-5 w-5 fill-gold text-gold"
                    />
                  ))}
                </div>
                <span className="text-lg font-extrabold">4.9</span>
                <span className="text-sm text-white/60">من 2,184 تقييم</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white/60">عميل سعودي</p>
              <p className="mt-1 text-2xl font-extrabold text-gold">+12,000</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-sage/20 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm font-bold leading-relaxed text-charcoal/85">
                  «{item.quote}»
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="font-extrabold text-charcoal">{item.name}</span>
                  <span className="flex items-center gap-1 text-charcoal/50">
                    <MapPin className="h-3 w-3" />
                    {item.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section title="أسئلة سريعة قبل المكالمة" eyebrow="جاوبنا عليها لراحتك">
          <div className="space-y-2">
            {FAQS.map((faq, index) => (
              <FaqItem key={index} q={faq.q} a={faq.a} />
            ))}
          </div>
        </Section>

        {/* SUPPORT CTA */}
        <div className="mt-8 overflow-hidden rounded-[2rem] bg-charcoal p-6 text-center text-white shadow-xl md:p-10">
          <Headset className="mx-auto mb-3 h-9 w-9 text-gold" />
          <h3 className="text-2xl font-extrabold">عندك سؤال أو تبي تعدّل الطلب؟</h3>
          <p className="mx-auto mt-2 max-w-md text-sm font-bold text-white/70">
            فريق نفس جاهز يخدمك خلال 5 دقائق على الواتساب. عدّل العنوان، الكمية، أو
            استفسر بدون أي تردد.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 md:flex-row">
            <a
              href={whatsappSupportLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              راسل فريق نَفَس على واتساب
            </a>
            <a
              href={`tel:+${WHATSAPP_PHONE_WA}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              اتصل بنا مباشرة
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center text-sm font-bold text-charcoal/50 transition hover:text-teal"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string
  eyebrow?: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      {eyebrow && (
        <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.25em] text-teal">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-extrabold text-charcoal md:text-3xl">{title}</h2>
      {description && (
        <p className="mt-2 text-sm font-bold text-charcoal/60">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  )
}

function TimelineStep({
  icon: Icon,
  title,
  time,
  body,
  tone,
}: {
  icon: typeof Phone
  title: string
  time: string
  body: string
  tone?: 'active'
}) {
  const active = tone === 'active'
  return (
    <li className="relative">
      <span
        className={cn(
          'absolute -right-[37px] top-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-ivory',
          active
            ? 'bg-teal text-white shadow-lg shadow-teal/30 ring-4 ring-teal/15'
            : 'bg-mist text-teal',
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div
        className={cn(
          'ms-2 rounded-2xl bg-white p-4 shadow-sm',
          active && 'ring-2 ring-teal/20',
        )}
      >
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-extrabold text-charcoal">{title}</h3>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-[11px] font-extrabold',
              active ? 'bg-teal/10 text-teal-dark' : 'bg-mist text-charcoal/70',
            )}
          >
            {time}
          </span>
        </div>
        <p className="text-sm font-bold text-charcoal/60">{body}</p>
      </div>
    </li>
  )
}

function ResultCard({
  day,
  title,
  body,
  icon: Icon,
}: {
  day: string
  title: string
  body: string
  icon: typeof Sparkles
}) {
  return (
    <div className="rounded-2xl border border-sage/20 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-[11px] font-extrabold uppercase tracking-wider text-teal-dark">
        {day}
      </p>
      <h4 className="mt-1 text-lg font-extrabold text-charcoal">{title}</h4>
      <p className="mt-2 text-sm font-bold leading-relaxed text-charcoal/60">{body}</p>
    </div>
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
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-charcoal/65">{label}</span>
      <span
        className={cn(
          'text-sm font-extrabold',
          highlight ? 'text-teal' : 'text-charcoal',
        )}
      >
        {value}
      </span>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen((value) => !value)}
      className="w-full overflow-hidden rounded-2xl border border-sage/20 bg-white text-right"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-sm font-extrabold text-charcoal">{q}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-charcoal/40 transition-transform',
            open && 'rotate-180',
          )}
        />
      </div>
      {open && (
        <div className="border-t border-sage/15 bg-mist/30 px-5 py-4 text-sm font-bold leading-relaxed text-charcoal/70">
          {a}
        </div>
      )}
    </button>
  )
}

const TESTIMONIALS = [
  {
    name: 'أحمد',
    city: 'الرياض',
    quote:
      'أنا كان عندي كحة ناشفة من الدخان من 4 سنين، أول أسبوع حسيت فرق كبير. الحين ما أبدأ يومي إلا فيه.',
  },
  {
    name: 'سارة',
    city: 'جدة',
    quote:
      'موسم الغبار يقتلني. مع بخاخ الجيوب صار نومي أهدى وما عاد أصحى مكتومة. شكراً نفس 💚',
  },
  {
    name: 'فهد',
    city: 'الدمام',
    quote:
      'طلبت وتواصلوا معاي خلال 5 دقائق. التوصيل وصل بسرعة والمنتج فعلاً ينعش الصدر من أول استخدام.',
  },
]

const FAQS = [
  {
    q: 'متى راح يتم التوصيل؟',
    a: 'بنشحن الطلب بنفس اليوم بعد تأكيد المكالمة. التوصيل عادة من 2 إلى 5 أيام عمل لجميع مناطق المملكة، وأحياناً أسرع داخل المدن الرئيسية.',
  },
  {
    q: 'هل أدفع الحين أو عند الاستلام؟',
    a: 'الدفع عند الاستلام كاش أو شبكة. ما تدفع ولا ريال الآن. تستلم وتتأكد من الطلب ثم تسلّم المبلغ للمندوب.',
  },
  {
    q: 'لو ما رد المندوب أو ما وصلت المكالمة؟',
    a: 'إذا ما توصلك مكالمة خلال 30 دقيقة بأوقات العمل (9 ص - 9 م)، تواصل معنا على واتساب وبنرد عليك مباشرة ونتابع طلبك.',
  },
  {
    q: 'هل المنتج طبيعي ومصرّح؟',
    a: 'نعم — تركيبة عشبية 100% مصرّحة من هيئة الغذاء والدواء السعودية (SFDA)، آمنة للاستخدام اليومي ولا تسبب الإدمان أو الجفاف.',
  },
  {
    q: 'هل يمكنني تعديل العنوان بعد الطلب؟',
    a: 'أكيد. قبل ما يخرج الطلب من المستودع نقدر نعدل العنوان أو الكمية. راسلنا على الواتساب برقم طلبك.',
  },
]
