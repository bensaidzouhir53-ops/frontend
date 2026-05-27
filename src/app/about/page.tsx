import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'من نحن — صيدلية التنفس الطبيعية',
  description:
    'نسمة هي أول صيدلية سعودية متخصصة في العناية بالجهاز التنفسي بمنتجات عشبية بمعايير صيدلانية. تعرّف على قصتنا، معاييرنا، وفلسفتنا في صناعة منتجات SFDA-aligned.',
}

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'معايير صيدلانية',
    desc: 'كل عبوة تخرج من نسمة تمر بمعايير جودة صارمة على غرار الصيدليات. تركيبات مدروسة وتعبئة طبية محكمة.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'تخصص واحد فقط',
    desc: 'ما نبيع أي شي. نسمة متخصصة بشي واحد: العناية بالرئة والجيوب الأنفية. هذا اللي يعطينا عمق وخبرة في كل منتج نطلقه.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'مصنوعة لأجواء السعودية',
    desc: 'الغبار، المكيفات على مدار السنة، الشيشة، وغبار الدوام.. تركيباتنا مصممة خصيصاً لروتين الإنسان السعودي اليومي.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'الطبيعة بمنطق الصيدلية',
    desc: 'نمزج بين حكمة الطب العشبي العربي والمنطق الصيدلاني الحديث. مكونات نقية، جرعات مدروسة، ووعود ما نتجاوزها.',
  },
]

export default function AboutPage() {
  return (
    <main dir="rtl" className="bg-ivory">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-apothecary-dark via-apothecary to-teal-dark py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white" />
          <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-gold" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-right">
          <p className="text-gold font-bold text-sm tracking-[0.3em] mb-4">صيدلية التنفس الطبيعية</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">نسمة — رفيق رئتك في السعودية</h1>
          <p className="text-white/85 text-xl max-w-2xl leading-relaxed">
            أول دار سعودية متخصصة فقط في العناية بالجهاز التنفسي. بخاخات وقطرات عشبية بمعايير صيدلانية، مصممة لتحدي الغبار، المكيفات، والشيشة في حياتك اليومية.
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
              <p className="text-apothecary font-bold text-sm tracking-[0.3em] mb-3">رحلتنا</p>
              <h2 className="text-3xl font-bold text-charcoal mb-6">من فكرة صيدلانية بسيطة، إلى رفيق يومي لرئة كل سعودي</h2>
              <div className="space-y-5 text-charcoal/75 leading-relaxed">
                <p>
                  بدأت نسمة من سؤال واحد: ليش ما يكون عندنا في السعودية صيدلية متخصصة فقط في صحة الرئة والجيوب الأنفية، تتعامل بمعايير صيدلانية لكن بمكونات طبيعية يفهمها أجدادنا؟
                </p>
                <p>
                  جمعنا فريقاً من المتخصصين في التركيبات العشبية وراجعنا أكثر من 40 عشبة استُخدمت تاريخياً في الطب العربي للتنفس، ثم اخترنا فقط ما تدعمه دراسات حديثة، وصُغناه بتركيز صيدلاني محسوب.
                </p>
                <p>
                  كل منتج يخرج من نسمة يمر بمعايير جودة على غرار الصيدليات: مصدر معتمد للمكونات، تعبئة طبية محكمة، ومطابقة لاشتراطات هيئة الغذاء والدواء السعودية (SFDA).
                </p>
                <p>
                  اليوم، نسمة ليست متجراً عشوائياً للأعشاب — هي صيدليتك المتخصصة في التنفس. آلاف العملاء في السعودية اعتمدوا روتيننا اليومي، وكل يوم نضيف جديد يستحق ثقتهم.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-mint-clean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-apothecary font-bold text-sm tracking-[0.3em] mb-2">مبادئ الصيدلية</p>
            <h2 className="text-3xl font-bold text-charcoal">على ماذا تقوم نسمة</h2>
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
            <p className="text-apothecary font-bold text-sm tracking-[0.3em] mb-2">معايير صيدلانية</p>
            <h2 className="text-3xl font-bold text-charcoal mb-4">من الحقل إلى الصيدلية إلى يدك</h2>
            <p className="text-charcoal/60 max-w-xl mx-auto">
              ثلاث مراحل صارمة تمر بها كل عبوة قبل أن تصل لباب بيتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '١',
                title: 'مصدر معتمد للمكونات',
                desc: 'نشتغل فقط مع موردين عشبيين معتمدين. كل دفعة أعشاب تختبر للنقاء، الفعالية، وخلوها من الملوثات قبل ما تدخل مصنعنا.',
                icon: '🌿',
              },
              {
                step: '٢',
                title: 'تركيبة صيدلانية بتركيز محسوب',
                desc: 'تصاغ كل تركيبة بجرعات مدروسة، تحت إشراف متخصصين، عشان تحصل الفائدة كاملة بدون مبالغة ولا أعراض جانبية.',
                icon: '⚗️',
              },
              {
                step: '٣',
                title: 'تعبئة طبية وتسليم آمن',
                desc: 'العبوات بمعايير صيدلانية محكمة الإغلاق، مطابقة لاشتراطات SFDA، ونوصلها لباب بيتك في 2-4 أيام بالدفع عند الاستلام.',
                icon: '🚚',
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
      <section className="py-16 bg-gradient-to-br from-apothecary-dark to-apothecary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">عندك سؤال عن روتينك؟</h2>
          <p className="text-white/85 mb-8 leading-relaxed">
            مستشاري نسمة جاهزين يساعدونك تختار البخاخ أو القطرات المناسبة لحالتك. تواصل معنا على واتساب بأي وقت.
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
