/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { Wind, Star, ShieldCheck, HeartPulse, CheckCircle2, ArrowLeft, PackageCheck } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import TrustBadges from '@/components/shared/TrustBadges'
import FAQAccordion from '@/components/shared/FAQAccordion'

export default function HomePage() {
  return (
    <div dir="rtl" className="bg-ivory selection:bg-teal/20">
      
      {/* ── Top Announcement Bar ── */}
      <div className="bg-teal-dark text-white text-center py-2 px-4 text-xs font-bold tracking-wide">
        <span className="text-gold">✨</span> شحن مجاني للطلبات فوق 299 ريال + الدفع عند الاستلام متاح في جميع مناطق المملكة
      </div>

      {/* ── 1. Hero Section (Emotion & Conversion) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mist/80 to-ivory pb-12 pt-8 md:pt-16 md:pb-20">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 md:flex-row">
          
          {/* Hero Copy (Right) */}
          <div className="w-full md:w-1/2 text-center md:text-right z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 border border-teal/10 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-charcoal">أكثر من 50,000 عميل في السعودية يثق بنا</span>
            </div>

            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] text-charcoal tracking-tight">
              تنفّس براحة،<br />
              <span className="text-teal">وخل الباقي على الطبيعة.</span>
            </h1>

            <p className="mb-8 text-lg md:text-xl leading-relaxed text-charcoal/70 font-medium max-w-lg mx-auto md:mx-0">
              روتين يومي بسيط بمكونات عشبية يريحك من كتمة الغبار والدخان، ويمنحك إحساساً بالنظافة والانتعاش اللي تستحقه.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-8">
              <Link
                href="#products"
                className="w-full sm:w-auto bg-teal text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-teal/20 hover:bg-teal-dark hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
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

            <div className="flex items-center justify-center md:justify-start gap-6 text-sm font-semibold text-charcoal/60">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal" /> ضمان 30 يوم</div>
              <div className="flex items-center gap-1.5"><PackageCheck className="w-4 h-4 text-teal" /> الدفع عند الاستلام</div>
            </div>
          </div>

          {/* Hero Image (Left) */}
          <div className="w-full md:w-1/2 relative z-10">
            <div className="relative mx-auto w-full aspect-square md:aspect-[4/5] lg:aspect-[4/3] max-w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal to-gold rounded-[2.5rem] blur-[60px] opacity-20 transform rotate-3" />
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-mist border-4 border-white">
                <img src="https://placehold.co/800x1000/0f766e/ffffff?text=Hero+Image" alt="متجر نسمة" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The Pain & Relatability Section ── */}
      <section className="py-16 md:py-24 bg-white border-y border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4">
            لأننا عايشين نفس الأجواء، فهمنا مشكلتك.
          </h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            الجو عندنا في السعودية ما يرحم الجهاز التنفسي. غبار، مكيفات جافة 24 ساعة، روائح بخور قوية، أو حتى دخان في البيت. النتيجة؟ ثقل، كتمة، وعدم راحة في التنفس.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌪️', title: 'مواسم الغبار والتقلبات', desc: 'تزيد من حساسية الصدر والجيوب الأنفية وتخلي التنفس متعب.' },
              { icon: '❄️', title: 'هواء المكيفات الجاف', desc: 'يسبب جفاف في الممرات التنفسية ويزعجك وقت النوم.' },
              { icon: '💨', title: 'دخان وبخور البيت', desc: 'التعرض اليومي لها يراكم الترسبات ويخلي النفس ثقيل.' }
            ].map((pain, i) => (
              <div key={i} className="bg-mist/30 p-8 rounded-3xl border border-sage/20 hover:bg-mist hover:scale-105 transition-all">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl mx-auto mb-4">
                  {pain.icon}
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-2">{pain.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{pain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. The Solution / Products Grid ── */}
      <section id="products" className="py-16 md:py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal font-bold tracking-widest text-sm uppercase mb-3 block">الحل عندنا</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4">
              اختر الروتين اللي يناسبك
            </h2>
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
              منتجاتنا ليست أدوية معقدة، بل هي روتين عشبي يومي بسيط يساعدك تسترجع راحتك وإحساسك بالانتعاش.
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
        <div className="absolute inset-0 bg-teal mix-blend-overlay opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2 text-right">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                جودة عالية، مكونات نظيفة، وأمان تام.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                في نسمة، راحتك وصحتك خط أحمر. حرصنا على انتقاء أفضل المكونات العشبية من مصادر موثوقة، وتم تعبئتها وفق أعلى معايير الجودة العالمية لنضمن لك منتجاً نقيّاً وفعّالاً.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: 'خالية من المواد الكيميائية القاسية', desc: 'نعتمد على الطبيعة فقط.' },
                  { title: 'معايير جودة صارمة', desc: 'كل عبوة تمر باختبارات جودة قبل وصولها إليك.' },
                  { title: 'موثوقة ومجربة', desc: 'تركيبات مبنية على استخدامات عشبية متوارثة ومعروفة بفعاليتها.' }
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
                    <p className="font-bold">عناية يومية</p>
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
                    <p className="font-extrabold text-2xl mb-1">100%</p>
                    <p className="font-bold text-sm">مكونات طبيعية عشبية</p>
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
      <section className="py-20 bg-gradient-teal relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ShieldCheck className="w-20 h-20 text-gold mx-auto mb-6" />
          <h2 className="text-4xl font-extrabold text-white mb-6">الضمان الذهبي 30 يوماً</h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            تسوّق بكل اطمئنان. إذا لم تكن راضياً تماماً خلال 30 يوماً من الاستخدام، نرجع لك فلوسك كاملة. الدفع عند الاستلام متاح لنكسب ثقتك قبل مالك.
          </p>
          <Link
            href="#products"
            className="inline-flex items-center justify-center gap-3 bg-white text-teal-dark font-extrabold text-xl px-12 py-5 rounded-2xl shadow-2xl hover:bg-mist transition-transform hover:scale-105"
          >
            تسوّق الآن بدون مخاطرة
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
            { q: 'هل المنتجات مرخصة وآمنة؟', a: 'جميع منتجاتنا تعتمد على مكونات عشبية طبيعية 100% مستخدمة عالمياً، ويتم فحصها وتعبئتها وفق أعلى معايير الجودة لضمان أمانك التام.' },
            { q: 'متى يوصلني الطلب؟', a: 'نحن نشحن لجميع مناطق المملكة العربية السعودية. التوصيل يستغرق عادة بين 2 إلى 5 أيام عمل كحد أقصى.' },
            { q: 'كيف طريقة الدفع؟ هل أقدر أدفع عند الاستلام؟', a: 'نعم بكل تأكيد! لتكون مطمئناً تماماً، وفرنا خدمة الدفع عند الاستلام. لا تدفع أي مبلغ حتى يوصلك المندوب لباب بيتك.' },
            { q: 'هل أقدر أسترجع المنتج إذا ما ناسبني؟', a: 'نعم، نوفّر لك "الضمان الذهبي" لمدة 30 يوماً. إذا لم تكن راضياً عن النتيجة، تواصل مع خدمة العملاء وسنقوم بترتيب الإرجاع واسترداد أموالك.' },
          ]} />
        </div>
      </section>

    </div>
  )
}
