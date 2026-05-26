import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Phone, MessageCircle, AlertTriangle, ShieldCheck } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'تم استلام طلبك بنجاح | نسمة',
  description: 'شكراً لطلبك من نسمة. سيتم التواصل معك قريباً لتأكيد الشحن.',
  robots: { index: false, follow: false },
}

interface ThankYouPageProps {
  searchParams: Promise<{ order?: string; total?: string }>
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams
  const orderNumber = params.order ?? ''
  const total = params.total ? Number(params.total) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-dark/5 to-mist/30 py-12 md:py-20" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        
        {/* Main Success Card */}
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-sage/20 relative">
          {/* Confetti / Success Top Background */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-teal-dark to-teal" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl opacity-50" />
          
          {/* Header Content */}
          <div className="relative pt-12 pb-8 px-6 text-center text-white">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-lg border-2 border-white/50 animate-bounce" style={{ animationDuration: '3s' }}>
              <CheckCircle className="h-12 w-12 text-white drop-shadow-md" strokeWidth={2.5} />
            </div>
            <h1 className="mb-2 text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm">كفو! تم استلام طلبك بنجاح 🎉</h1>
            <p className="text-white/90 text-lg font-medium">ننتظرك تنضم لآلاف العملاء اللي تنفسوا براحة مع نسمة!</p>
            
            {orderNumber && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md px-6 py-3 border border-white/20 shadow-inner">
                <span className="text-sm font-semibold text-white/80">رقم طلبك المميز: </span>
                <span className="font-black text-xl ltr text-gold drop-shadow-sm">{orderNumber}</span>
              </div>
            )}
          </div>

          {/* Delivery & Confirmation Strategy (CR & DR Optimization) */}
          <div className="px-6 md:px-10 py-8 bg-white relative z-10 rounded-t-[2.5rem] -mt-6">
            
            {/* Order Summary & COD Reminder */}
            {total && (
              <div className="mb-8 flex items-center justify-between rounded-2xl bg-mist/50 px-6 py-4 border border-sage/20">
                <span className="text-base font-bold text-charcoal/80">المبلغ الإجمالي</span>
                <span className="text-2xl font-black text-teal">{total} ريال</span>
              </div>
            )}

            <div className="mb-10 rounded-[2rem] border border-gold/30 bg-gold/5 p-6 md:p-8 text-center shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-50" />
              <div className="relative z-10">
                <ShieldCheck className="w-10 h-10 text-gold mx-auto mb-3" />
                <h2 className="font-extrabold text-charcoal text-xl md:text-2xl mb-2">الدفع عند الاستلام</h2>
                <p className="text-sm md:text-base text-charcoal/70 font-medium leading-relaxed">
                  ما راح تدفع ولا ريال الحين.. جهز المبلغ نقداً أو شبكة وسلمه للمندوب لما يوصل لك الطلب لباب بيتك.
                </p>
              </div>
            </div>

            {/* Next Steps (Psychological Preparation) */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-charcoal/5 px-4 py-1.5 rounded-full mb-6">
                <AlertTriangle className="w-4 h-4 text-charcoal/60" />
                <h3 className="text-sm font-extrabold text-charcoal">وش بيصير الحين؟ (خطوات مهمة)</h3>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-teal shadow-sm border border-sage/30">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-charcoal mb-1">1. تجهيز الطلب الفوري</p>
                    <p className="text-sm text-charcoal/60 font-medium leading-relaxed">فريقنا بيجهز طلبك بأعلى معايير التغليف والأمان لضمان وصوله بأفضل حالة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative">
                  <div className="absolute right-6 top-14 w-0.5 h-10 bg-teal/20 -z-10" />
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal text-white shadow-md shadow-teal/30 ring-4 ring-teal/10">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-teal-dark mb-1">2. رسالة تأكيد الواتساب (مهم جداً)</p>
                    <p className="text-sm text-charcoal/70 font-bold leading-relaxed bg-teal/5 p-3 rounded-xl border border-teal/10 mt-2">
                      بنرسل لك رسالة على الواتساب قريباً جداً لتأكيد تفاصيل الشحن. <strong className="text-teal-dark">يرجى الرد عليها لتجنب إلغاء الطلب.. (خلي جوالك قريب).</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-teal shadow-sm border border-sage/30">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-charcoal mb-1">3. التوصيل لباب بيتك</p>
                    <p className="text-sm text-charcoal/60 font-medium leading-relaxed">المندوب بيتواصل معك لتسليم الطلب خلال 2 إلى 5 أيام عمل بالكثير.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Support */}
            <div className="rounded-[2rem] bg-charcoal text-white p-6 md:p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10">
                <Phone className="mx-auto mb-3 h-8 w-8 text-gold" />
                <h4 className="text-lg font-extrabold mb-2">تبي تعدل أو تضيف شيء لطلبك؟</h4>
                <p className="text-sm font-medium text-white/70 mb-6">
                  فريق خدمة العملاء جاهز لخدمتك عن طريق الواتساب بشكل مباشر
                </p>
                <a
                  href={WHATSAPP_URL}
                  className="inline-flex w-full md:w-auto items-center justify-center rounded-2xl bg-[#25D366] px-8 py-4 text-base font-extrabold text-white transition-transform hover:scale-105 shadow-lg shadow-[#25D366]/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 ml-2 fill-white" />
                  تواصل عبر واتساب الآن
                </a>
              </div>
            </div>

            {/* Back to shop */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center font-bold text-charcoal/50 hover:text-teal transition-colors"
              >
                العودة للتسوق
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
