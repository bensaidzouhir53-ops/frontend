import type { Metadata } from 'next'
import { Star, Truck, Headphones, ShieldCheck, Clock, Users } from 'lucide-react'
import SocialProofToast from '@/components/lp/SocialProofToast'

export const metadata: Metadata = {
  title: 'نَفَس | متجر إلكتروني سعودي',
  description:
    'تسوق بسهولة مع نَفَس. توصيل سريع داخل المملكة، دعم عملاء متجاوب، وتجربة طلب واضحة من البداية للنهاية.',
  robots: {
    index: false,
    follow: false,
  },
}

const REVIEWS = [
  {
    name: 'نوف م.',
    city: 'الرياض',
    text: 'تجربة طلب سلسة من أول خطوة. فريق الدعم رد بسرعة وكل شي كان واضح.',
  },
  {
    name: 'بندر',
    city: 'جدة',
    text: 'الموقع مرتب وسهل الاستخدام. استلمت الطلب في الوقت المتوقع والتغليف كان ممتاز.',
  },
  {
    name: 'مها العتيبي',
    city: 'الدمام',
    text: 'أكثر شي عجبني التواصل والمتابعة. حسيت إن الطلب مهم وما انقطعت عني المعلومات.',
  },
  {
    name: 'فيصل',
    city: 'الخبر',
    text: 'تجربة شراء مريحة بدون تعقيد. الدفع عند الاستلام يخلي الموضوع أسهل بكثير.',
  },
  {
    name: 'ريم',
    city: 'مكة',
    text: 'خدمة عملاء محترمة ورد سريع على استفساراتي. أنصح بالتجربة للي يدور على متجر منظم.',
  },
  {
    name: 'تركي',
    city: 'المدينة',
    text: 'كل خطوات الطلب واضحة من البداية. التوصيل كان أسرع من المتوقع والتعامل راقي.',
  },
]

export default function LandingPage() {
  return (
    <div dir="rtl" className="bg-ivory selection:bg-teal/20">
      <SocialProofToast />

      <section className="relative overflow-hidden bg-gradient-to-b from-mist/80 to-ivory pb-16 pt-10 md:pt-16">
        <div className="absolute top-0 right-0 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/3 rounded-full bg-teal/5 opacity-60" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] translate-y-1/3 -translate-x-1/3 rounded-full bg-gold/5 opacity-50" />

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-apothecary/15 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal" />
            <span className="text-xs font-extrabold tracking-[0.18em] text-apothecary">
              متجر إلكتروني سعودي
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-[1.2] tracking-tight text-charcoal md:text-5xl">
            تسوق بثقة
            <br />
            <span className="text-apothecary">وتجربة طلب واضحة</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-charcoal/75 md:text-xl">
            نَفَس توفر لك تجربة شراء بسيطة داخل المملكة: متابعة للطلب، دعم سريع، وتوصيل لباب بيتك
            بالدفع عند الاستلام.
          </p>

          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 text-sm font-semibold text-charcoal/70">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <Truck className="h-4 w-4 text-teal" />
              توصيل داخل السعودية
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-teal" />
              الدفع عند الاستلام
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <Headphones className="h-4 w-4 text-teal" />
              دعم عملاء متجاوب
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-sage/20 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold tracking-[0.3em] text-apothecary">لماذا نَفَس</p>
            <h2 className="text-3xl font-extrabold text-charcoal md:text-4xl">
              تجربة شراء مريحة من البداية للنهاية
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Clock,
                title: 'طلب سريع',
                desc: 'خطوات واضحة بدون تعقيد، من اختيار الطلب حتى تأكيده.',
              },
              {
                icon: Users,
                title: 'فريق يتابع معك',
                desc: 'دعم عملاء جاهز يرد على استفساراتك ويحدّثك على حالة الطلب.',
              },
              {
                icon: Truck,
                title: 'توصيل موثوق',
                desc: 'نشحن لمعظم مناطق المملكة مع متابعة لحالة التسليم.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-3xl border border-sage/30 bg-ivory p-8 text-right shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-extrabold text-charcoal">{title}</h3>
                <p className="font-medium leading-relaxed text-charcoal/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-gold text-gold" />
            ))}
          </div>
          <h2 className="mb-3 text-3xl font-extrabold text-charcoal md:text-4xl">
            آراء عملائنا
          </h2>
          <p className="mb-14 text-lg text-charcoal/60">
            تجارب حقيقية من عملاء اختاروا التسوق مع نَفَس
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-sage/30 bg-white p-7 text-right shadow-sm"
              >
                <div className="mb-5 flex justify-end gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mb-6 text-base font-medium leading-relaxed text-charcoal/80">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-end gap-3 border-t border-sage/20 pt-5">
                  <div className="text-right">
                    <p className="font-bold text-charcoal">{review.name}</p>
                    <p className="text-sm font-semibold text-teal">من {review.city}</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-lg font-extrabold text-teal">
                    {review.name.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-charcoal via-apothecary-dark to-teal-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">جاهز تبدأ؟</h2>
          <p className="text-lg font-medium leading-relaxed text-white/85">
            تصفّح المتجر، اختر ما يناسبك، وخَلّ فريقنا يتابع معك خطوة بخطوة.
          </p>
        </div>
      </section>
    </div>
  )
}
