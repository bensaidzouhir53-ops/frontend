/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { Wind, Star, ShieldCheck, HeartPulse, CheckCircle2, ArrowLeft, PackageCheck } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import PainPointCard from '@/components/home/PainPointCard'
import TrustBadges from '@/components/shared/TrustBadges'
import FAQAccordion from '@/components/shared/FAQAccordion'

const PAIN_POINTS = [
  {
    icon: '🌪️',
    title: 'مواسم الغبار والتقلبات',
    desc: 'تزيد من حساسية الصدر والجيوب الأنفية وتخلي التنفس متعب.',
    image: '/images/pain-dust-season.png',
    accent: 'teal' as const,
  },
  {
    icon: '❄️',
    title: 'هواء المكيفات الجاف',
    desc: 'يسبب جفاف في الممرات التنفسية ويزعجك وقت النوم.',
    image: '/images/pain-ac-dry.png',
    accent: 'gold' as const,
  },
  {
    icon: '💨',
    title: 'دخان وبخور البيت',
    desc: 'التعرض اليومي لها يراكم الترسبات ويخلي النفس ثقيل.',
    image: '/images/pain-smoke-incense.png',
    accent: 'sage' as const,
  },
]

export default function HomePage() {
  return (
    <div dir="rtl" className="bg-ivory selection:bg-teal/20">
      
      {/* ── Top Announcement Bar ── */}
      <div className="bg-apothecary text-white text-center py-2 px-4 text-xs font-bold tracking-wide">
        <span className="text-gold">⊕</span> صيدلية التنفس الطبيعية في السعودية — مطابق لمعايير SFDA · الدفع عند الاستلام · توصيل لكل المناطق
      </div>

      {/* ── 1. Hero Section (Emotion & Conversion) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mist/80 to-ivory pb-12 pt-8 md:pt-16 md:pb-20">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 md:flex-row">
          
          {/* Hero Copy (Right) */}
          <div className="w-full md:w-1/2 text-center md:text-right z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-apothecary/15 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-apothecary animate-pulse" />
              <span className="text-xs font-extrabold text-apothecary tracking-[0.18em]">صيدلية التنفس الطبيعية · مطابق SFDA</span>
            </div>

            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] text-charcoal tracking-tight">
              صيدليتك المتخصصة<br />
              <span className="text-apothecary">في صحة الرئة والتنفس.</span>
            </h1>

            <p className="mb-8 text-lg md:text-xl leading-relaxed text-charcoal/75 font-medium max-w-lg mx-auto md:mx-0">
              بخاخات وقطرات عشبية بمعايير صيدلانية، مصممة للجو السعودي. نظّف رئتك من تراكمات الدخان والغبار، وافتح جيوبك الأنفية، بروتين يومي بسيط وآمن.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-8">
              <Link
                href="#products"
                className="w-full sm:w-auto bg-apothecary text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-apothecary/25 hover:bg-apothecary-dark hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                تصفح منتجاتنا
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory bg-mist overflow-hidden relative">
                      <img src="https://placehold.co/400x400/e2e8f0/475569?text=Brand+Story" alt="Customer" className="object-cover opacity-50 w-full h-full" />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                  </div>
                  <p className="text-xs font-bold text-charcoal">تقييم 4.9/5</p>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-wrap justify-center md:justify-start gap-5 text-sm font-semibold text-charcoal/65">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-apothecary" /> مطابق SFDA</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-apothecary" /> ضمان 30 يوم</div>
              <div className="flex items-center gap-1.5"><PackageCheck className="w-4 h-4 text-apothecary" /> الدفع عند الاستلام</div>
            </div>
          </div>

          {/* Hero Image (Left) */}
          <div className="w-full md:w-1/2 relative z-10">
            <div className="relative mx-auto w-full aspect-[3/4] md:aspect-[4/5] max-w-[520px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal to-gold rounded-[2.5rem] blur-[60px] opacity-20 transform rotate-3" />
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-mist border-4 border-white">
                <Image
                  src="/images/hero-main.png"
                  alt="منتجات نسمة العشبية لدعم التنفس المريح"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The Pain & Relatability Section ── */}
      <section className="py-16 md:py-24 bg-white border-y border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-apothecary font-bold tracking-[0.3em] text-sm mb-3">تشخيص الصيدلية</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4">
            ليش رئة السعودي تحتاج عناية يومية متخصصة؟
          </h2>
          <p className="text-lg text-charcoal/65 max-w-2xl mx-auto mb-16 leading-relaxed">
            الجو في السعودية يضع جهازك التنفسي تحت ضغط يومي: غبار، مكيفات جافة على مدار السنة، شيشة، وغبار الدوام. كلها تتراكم وتسبب ثقل، بلغم، وكتمة. الحل ما يكون من صيدلية كيماوية، بل من صيدلية طبيعية متخصصة.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PAIN_POINTS.map((pain) => (
              <PainPointCard key={pain.title} {...pain} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. The Solution / Products Grid ── */}
      <section id="products" className="py-16 md:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-apothecary font-bold tracking-[0.3em] text-sm mb-3 block">روتين الصيدلية</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4">
              تركيباتنا الصيدلانية الطبيعية
            </h2>
            <p className="text-lg text-charcoal/65 max-w-2xl mx-auto">
              كل منتج من نسمة مصاغ بتركيز صيدلاني محسوب من أعشاب نقية، عشان يكون فعّال لحالتك بدون أعراض كيماوية. اختر روتينك:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Science, Quality & SFDA Authority Section ── */}
      <section className="py-16 md:py-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-apothecary mix-blend-overlay opacity-25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2 text-right">
              <p className="text-gold font-bold tracking-[0.3em] text-sm mb-3">معايير الصيدلية</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                نشتغل بنفس انضباط الصيدليات الكبرى — لكن بمكونات الطبيعة.
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                كل تركيبة في نسمة تمر بثلاث مراحل صيدلانية: اختبار المصدر، صياغة بتركيز محسوب، وتعبئة طبية مطابقة لاشتراطات هيئة الغذاء والدواء السعودية (SFDA). صحتك ما تستحق أقل من ذلك.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: 'مطابق لمعايير هيئة الغذاء والدواء (SFDA)', desc: 'كل عبوة تنطلق بعد مطابقة كاملة لاشتراطات السلامة السعودية.' },
                  { title: 'مصدر عشبي معتمد ومختبر', desc: 'موردين معتمدين فقط، واختبارات نقاء وفعالية لكل دفعة قبل التصنيع.' },
                  { title: 'تركيز صيدلاني محسوب', desc: 'جرعات مدروسة تحت إشراف متخصصين، بدون مبالغة ولا أعراض كيماوية.' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 justify-end">
                    <div className="text-right">
                      <h4 className="font-bold text-gold text-lg mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-gold" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm text-center">
                    <HeartPulse className="w-10 h-10 text-teal-light mx-auto mb-3" />
                    <p className="font-bold">روتين تنفسي يومي</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm text-center">
                    <ShieldCheck className="w-10 h-10 text-gold mx-auto mb-3" />
                    <p className="font-bold">تغليف آمن ومحكم</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm text-center">
                    <Wind className="w-10 h-10 text-mist mx-auto mb-3" />
                    <p className="font-bold">استخلاص نقي</p>
                  </div>
                  <div className="bg-gradient-to-br from-gold to-gold-dark p-6 rounded-3xl text-charcoal text-center flex flex-col justify-center h-[160px]">
                    <p className="font-extrabold text-2xl mb-1">SFDA</p>
                    <p className="font-bold text-sm">مطابق للهيئة العامة للغذاء والدواء</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. Social Proof / Reviews ── */}
      <section className="py-16 md:py-24 bg-white border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4">آراء عملائنا هي فخرنا</h2>
          <p className="text-lg text-charcoal/60 mb-16">أكثر من 2,400 عميل في السعودية اختاروا منتجات نسمة لعنايتهم اليومية</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
            {[
              { name: 'عبدالله م.', city: 'الرياض', text: 'بصراحة كنت أعاني دايم مع الغبار والمكيفات، ثقل في الصدر مو طبيعي. من يوم جربت هالروتين وأنا مرتاح ونفسي خفيف. التوصيل كان سريع والتعامل راقي.' },
              { name: 'أبو خالد', city: 'جدة', text: 'أخذت بخاخ الجيوب الأنفية، أحلى روتين شتوي! تحس بانتعاش وخفة. التغليف يفتح النفس وتوصيلهم كان في 3 أيام بس.' },
              { name: 'فهد المطيري', city: 'الدمام', text: 'أجمل استثمار في صحتي. مكوناته طبيعية وهذا أهم شي عندي لأني أخاف من الكيماويات. أنصح فيه كل واحد يدور على منتج آمن ومضمون.' }
            ].map((review, i) => (
              <div key={i} className="bg-ivory p-8 rounded-3xl border border-sage/30 text-right shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-6 justify-end">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-gold text-gold" />)}
                </div>
                <p className="text-charcoal/80 font-medium leading-relaxed mb-8 text-lg">"{review.text}"</p>
                <div className="flex items-center gap-4 justify-end border-t border-sage/30 pt-6">
                  <div className="text-right">
                    <p className="font-bold text-charcoal text-base">{review.name}</p>
                    <p className="text-teal font-semibold text-sm">من {review.city} - مشتري مؤكد</p>
                  </div>
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center text-teal font-extrabold text-xl">
                    {review.name.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. 30-Day Guarantee Banner ── */}
      <section className="py-20 bg-gradient-to-br from-apothecary-dark via-apothecary to-teal-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ShieldCheck className="w-20 h-20 text-gold mx-auto mb-6" />
          <p className="text-gold/90 font-bold tracking-[0.3em] text-sm mb-3">ضمان الصيدلية</p>
          <h2 className="text-4xl font-extrabold text-white mb-6">30 يوماً — أو نرجع لك فلوسك كاملة</h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            نسمة ما تطلب منك تثق فينا قبل ما تجرّب. الدفع عند الاستلام، وإذا ما حسّيت بفرق خلال 30 يوماً، نرجع لك فلوسك بدون أسئلة. هذي طريقة الصيدلية الحقيقية.
          </p>
          <Link
            href="#products"
            className="inline-flex items-center justify-center gap-3 bg-white text-apothecary-dark font-extrabold text-xl px-12 py-5 rounded-2xl shadow-2xl hover:bg-mint-clean transition-transform hover:scale-105"
          >
            ابدأ روتينك من الصيدلية
          </Link>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="py-16 md:py-24 bg-white border-b border-sage/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-charcoal mb-4">أسئلة شائعة</h2>
            <p className="text-charcoal/60">كل ما تحتاج معرفته عن طلبك من نسمة</p>
          </div>
          <FAQAccordion items={[
            { q: 'هل منتجات نسمة آمنة ومرخصة؟', a: 'نعم. كل منتجات نسمة عشبية طبيعية 100% ومطابقة لاشتراطات هيئة الغذاء والدواء السعودية (SFDA). تمر كل دفعة بمراقبة جودة على غرار الصيدليات قبل ما تطلع للسوق.' },
            { q: 'هل أقدر أستخدمها يومياً بدون أعراض جانبية؟', a: 'إيه. تركيباتنا مصممة بتركيز صيدلاني مدروس عشان تكون آمنة للاستخدام اليومي، بدون التعود أو الجفاف اللي تسببه البخاخات الكيماوية.' },
            { q: 'متى يوصلني الطلب؟', a: 'نشحن لكل مناطق المملكة العربية السعودية. التوصيل عادة 2-4 أيام عمل لباب بيتك بالدفع عند الاستلام.' },
            { q: 'كيف أعرف المنتج المناسب لحالتي؟', a: 'مستشاري نسمة على واتساب جاهزين يسمعون حالتك (مدخن، شيشة، حساسية غبار، كتمة مكيفات) ويوصون لك بالبخاخ أو القطرات المناسبة. الاستشارة مجانية.' },
            { q: 'ماذا لو ما حسّيت بفرق؟', a: 'عندك ضمان نسمة الذهبي 30 يوماً. إذا ما حسّيت بنتيجة واضحة، تواصل معنا ونرجع لك فلوسك كاملة، بدون أسئلة معقدة. هذي طريقتنا في الصيدلية.' },
          ]} />
        </div>
      </section>

    </div>
  )
}
