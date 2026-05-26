import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'نسمة | من نحن',
  description: 'تعرّف على قصة نسمة — علامة سعودية للعناية بالجهاز التنفسي بمكونات عشبية طبيعية.',
}

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'الاهتمام الصادق',
    desc: 'نؤمن بأن كل عميل يستحق منتجاً مصنوعاً بنية صادقة، لا مجرد سلعة. نسمة وُلدت من اهتمام حقيقي بصحتكم.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'الشفافية الكاملة',
    desc: 'نُفصح عن جميع مكونات منتجاتنا بوضوح. لا ادعاءات مبالغ فيها، لا وعود طبية — فقط مكونات طبيعية موثّقة.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'السعودية أولاً',
    desc: 'نسمة علامة سعودية بروح سعودية. نفهم احتياجات المستهلك المحلي وطبيعة المناخ والبيئة في مملكتنا الحبيبة.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'الطبيعة ثروتنا',
    desc: 'نستلهم من الطب العشبي التقليدي وثروة الطبيعة الغنية. نختار مكوناتنا بعناية من أعشاب ذات تاريخ استخدامي موثّق.',
  },
]

export default function AboutPage() {
  return (
    <main dir="rtl" className="bg-ivory">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-dark to-teal py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white" />
          <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-gold" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-right">
          <p className="text-white/60 font-semibold text-sm tracking-widest uppercase mb-4">قصتنا</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">من نحن</h1>
          <p className="text-white/80 text-xl max-w-2xl leading-relaxed">
            نسمة علامة سعودية تؤمن بأن العناية بجهازك التنفسي جزء أصيل من روتين حياتك اليومي
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="/images/brand-story.jpg"
                alt="قصة نسمة"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-right order-1 lg:order-2">
              <p className="text-teal font-semibold text-sm tracking-widest uppercase mb-3">البداية</p>
              <h2 className="text-3xl font-bold text-charcoal mb-6">رحلة نسمة</h2>
              <div className="space-y-5 text-charcoal/75 leading-relaxed">
                <p>
                  بدأت فكرة نسمة من ملاحظة بسيطة: نحن نستخدم جهازنا التنفسي في كل لحظة من حياتنا، لكنّنا نادراً ما نمنحه الاهتمام اليومي الذي يستحقه.
                </p>
                <p>
                  آمنّا بأن الطبيعة وهبتنا كل ما نحتاجه. الأعشاب التي اعتمد عليها أجدادنا لقرون تحمل ثروة حقيقية يمكن إعادة استكشافها بتركيبات عصرية ومريحة الاستخدام.
                </p>
                <p>
                  عملنا على تطوير مجموعة من المنتجات التي تجمع بين حكمة الطب العشبي التقليدي وسهولة الاستخدام في الحياة اليومية المعاصرة — مصنوعة بعناية، للعائلة السعودية.
                </p>
                <p>
                  اليوم، نسمة ليست مجرد متجر — بل رفيق يومي لروتين عنايتك التنفسية. نفخر بكل عميل وثق بنا، ونسعى يومياً لتقديم تجربة أفضل.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal font-semibold text-sm tracking-widest uppercase mb-2">ما نؤمن به</p>
            <h2 className="text-3xl font-bold text-charcoal">قيمنا</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-right shadow-sm border border-sage/20">
                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mb-4 mr-0 ml-auto">
                  <span className="text-teal">{val.icon}</span>
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-3">{val.title}</h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal font-semibold text-sm tracking-widest uppercase mb-2">معايير الجودة</p>
            <h2 className="text-3xl font-bold text-charcoal mb-4">من المصدر إلى يدك</h2>
            <p className="text-charcoal/60 max-w-xl mx-auto">
              نتّبع معايير صارمة في اختيار المكونات وصياغة المنتجات وتغليفها
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '١',
                title: 'اختيار المكونات',
                desc: 'نختار أعشابنا من موردين موثوقين يلتزمون بمعايير الجودة. كل مكوّن يخضع لمراجعة دقيقة قبل قبوله في تركيباتنا.',
                icon: '🌿',
              },
              {
                step: '٢',
                title: 'الصياغة والتركيب',
                desc: 'تُصاغ منتجاتنا بتركيزات مدروسة تحافظ على خصائص الأعشاب الطبيعية. نستخدم عمليات إنتاج تحافظ على نقاء المكونات.',
                icon: '⚗️',
              },
              {
                step: '٣',
                title: 'التغليف والتوصيل',
                desc: 'عبوات مصممة لحماية المنتج وسهولة الاستخدام. نحرص على وصول كل طلب بحالة ممتازة مع معلومات واضحة عن الاستخدام.',
                icon: '📦',
              },
            ].map((item) => (
              <div key={item.step} className="text-right">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="flex items-center gap-3 justify-end mb-3">
                  <h3 className="font-bold text-charcoal text-xl">{item.title}</h3>
                  <div className="w-9 h-9 bg-teal rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                </div>
                <p className="text-charcoal/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-dark to-teal">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">هل لديك سؤال؟</h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            فريقنا متاح للإجابة على استفساراتك عن منتجاتنا أو طلباتك
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal font-bold px-8 py-4 rounded-2xl hover:bg-ivory transition-colors shadow-lg"
            >
              تواصل معنا
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-2xl transition-colors border border-white/30"
            >
              تصفح المنتجات
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
