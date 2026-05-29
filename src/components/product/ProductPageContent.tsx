/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShieldCheck, Star, CheckCircle2, ChevronLeft, ArrowLeft, 
  Leaf, Zap, AlertTriangle, Wind, HeartPulse, XCircle, Wallet,
  Flame, BellRing, Users, Clock
} from 'lucide-react'
import type { Product } from '@/types'
import { getDefaultOffer } from '@/lib/products'
import OfferSelector from '@/components/product/OfferSelector'
import HowToUseStep from '@/components/product/HowToUseStep'
import TrustBadges from '@/components/shared/TrustBadges'
import FAQAccordion from '@/components/shared/FAQAccordion'
import { DEFAULT_PRODUCT_REVIEWS, HERBAL_LUNG_SPRAY_REVIEWS } from '@/lib/productReviews'

interface ProductPageContentProps {
  product: Product
  crossSellProducts: Product[]
}

export default function ProductPageContent({
  product,
  crossSellProducts,
}: ProductPageContentProps) {
  return (
    <main dir="rtl" className="bg-ivory min-h-screen pb-24 lg:pb-0 scroll-smooth">
      {/* ── Breadcrumb ── */}
      <div className="bg-white/80 backdrop-blur-md border-b border-sage/20 py-3 sticky top-[60px] lg:top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-charcoal/60 font-medium">
            <Link href="/" className="hover:text-teal transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-teal transition-colors">المنتجات</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-teal font-bold line-clamp-1 max-w-[200px]">{product.nameAr}</span>
          </nav>
        </div>
      </div>

      {/* ── 1. Hero Section (The Buy Box) ── */}
      <section className="pt-6 pb-12 md:py-16 bg-gradient-to-b from-mist/50 to-ivory relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Image (Left visually, Right in DOM for RTL) */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32 order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 flex items-center justify-center border-4 border-white shadow-2xl shadow-teal/10">
                <img
                  src={product.image}
                  alt={product.nameAr}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content (Right visually, Left in DOM for RTL) */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 text-right">
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full shadow-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-700 tracking-wide">المنتج الأكثر طلباً في السعودية اليوم 🔥</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 px-4 py-2 rounded-full shadow-sm">
                  <Users className="w-4 h-4 text-teal" />
                  <span className="text-xs font-bold text-teal-dark tracking-wide">تم شراء هذا المنتج أكثر من 145 مرة اليوم</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-charcoal mb-4 leading-[1.3] tracking-tight">
                {product.nameAr}
              </h1>

              <div className="flex flex-wrap items-center gap-3 justify-end mb-6 bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-sage/20 w-fit ml-auto">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-base font-extrabold text-charcoal">4.9/5</span>
                <span className="text-sm font-bold text-teal-dark">(أكثر من 2,700 تقييم)</span>
              </div>

              <p className="text-charcoal/80 text-lg leading-relaxed mb-8 font-medium">
                {product.descAr}
              </p>

              {/* Offer Selector */}
              <div id="offer" className="overflow-hidden rounded-[1.75rem] border border-teal/10 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[2.5rem] sm:p-6 md:p-8">
                <h3 className="mb-4 text-center text-lg font-extrabold leading-snug text-charcoal sm:mb-6 sm:text-xl">
                  اختر العرض المناسب لك (كمية محدودة)
                </h3>
                <OfferSelector product={product} />
              </div>

              {/* Delivery & Guarantee Trust Block */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-2 bg-gradient-to-b from-white to-mist/30 rounded-2xl p-4 border border-sage/30 shadow-sm hover:border-gold/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <p className="font-extrabold text-charcoal text-sm">ضمان ذهبي 30 يوم</p>
                  </div>
                  <p className="text-[11px] text-charcoal/60 leading-relaxed font-medium">ما ناسبك؟ نرجع لك فلوسك بدون أسئلة معقدة.</p>
                </div>
                
                <div className="flex flex-col gap-2 bg-gradient-to-b from-white to-mist/30 rounded-2xl p-4 border border-sage/30 shadow-sm hover:border-teal/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0 text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <p className="font-extrabold text-charcoal text-sm">الدفع عند الاستلام</p>
                  </div>
                  <p className="text-[11px] text-charcoal/60 leading-relaxed font-medium">تطلب الآن، ولا تدفع ولا ريال لين يوصلك المندوب وتستلم طلبك بيدك.</p>
                </div>

                <div className="flex flex-col gap-2 bg-gradient-to-b from-white to-mist/30 rounded-2xl p-4 border border-sage/30 shadow-sm hover:border-blue-500/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="font-extrabold text-charcoal text-sm">تأكيد سريع للطلب</p>
                  </div>
                  <p className="text-[11px] text-charcoal/60 leading-relaxed font-medium">بمجرد تسجيل طلبك، راح نتواصل معك لتأكيد الشحن فوراً عشان ما تتأخر عليك النتيجة.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── 2. Pain Agitation Section (Text Right, Image Left) ── */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 text-white mb-5 bg-gradient-to-r from-red-600 to-red-500 px-5 py-2.5 rounded-full font-extrabold text-sm shadow-[0_4px_20px_rgba(220,38,38,0.4)] animate-pulse">
                <BellRing className="w-5 h-5 animate-bounce" />
                {product.slug === 'herbal-lung-spray' ? 'رسالة مهمة لكل مدخن: لا تتجاهل هذي العلامات 🚨' : 'تنبيه: لا تتجاهل هذي العلامات 🚨'}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6 leading-tight tracking-tight">
                {product.slug === 'herbal-lung-spray'
                  ? 'الكتمة ذابحتك؟ الشيشة والدخان جالسة تراكم ترسبات تقطع أنفاسك وتسرق راحتك اليومية! ⚠️'
                  : 'غبار، مكيفات 24 ساعة، أو حتى دخان.. كلها تراكمات تتعب صدرك!'}
                </h2>
              <p className="text-lg text-charcoal/70 mb-8 leading-relaxed font-medium">
                {product.slug === 'herbal-lung-spray'
                  ? 'البلغم الصباحي الغثيث اللي تحاول تطلعه، الكحة اللي تفضحك بكل مكان، وصوت الصدر وقت النوم أو مع أقل مجهود في النادي أو الدوام.. هذي مو مجرد أرقام، هذي صرخة من رئتك تقولك: "أنا مكتومة، أحتاج أتنظف!" لا تستمر تتجاهل هالإنذارات لين يطيح الفاس بالراس.'
                  : 'الجو عندنا في السعودية متعب جداً للجهاز التنفسي. تخيل كمية الغبار اللي نتعرض لها يومياً، أو جفاف هواء المكيفات اللي يخليك تصحى من النوم وحلقك ناشف وصدرك مكتوم.'}
              </p>
              
              <div className="space-y-5 mb-8">
                {(product.slug === 'herbal-lung-spray'
                  ? [
                      { text: 'تصحى الصبح وتكح كحة ناشفة ومزعجة تحسها تطلع من قلب صدرك؟', icon: Wind },
                      { text: 'تحس بـ "كتمة" وثقل يمنعك تأخذ نفس عميق ومريح، خصوصاً قبل النوم؟', icon: HeartPulse },
                      { text: 'البلغم ناشب بحلقك ومسوي لك إحراج دايم وتبي تتخلص منه للأبد؟', icon: AlertTriangle }
                    ]
                  : [
                      { text: 'تحس بصعوبة في التنفس أو ثقل في الصدر؟', icon: Wind },
                      { text: 'تنزعج من روائح البخور أو الدخان في البيت؟', icon: Zap },
                      { text: 'تصحى من النوم مو مرتاح وتحس بكتمة؟', icon: HeartPulse }
                    ]
                ).map((item, i) => (
                  <div key={i} className="flex items-center gap-4 justify-end p-4 rounded-2xl bg-mist/40 border border-sage/30 hover:border-red-200 hover:bg-red-50/50 transition-colors group">
                    <span className="text-[17px] font-bold text-charcoal/80 group-hover:text-charcoal transition-colors">
                      {item.text}
                    </span>
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-sage/20 group-hover:border-red-200 transition-colors">
                      <item.icon className="w-5 h-5 text-red-400 group-hover:text-red-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-red-500/10 blur-[60px] rounded-full" />
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-100 border border-sage/20 shadow-2xl">
                <img 
                  src={product.slug === 'herbal-lung-spray' ? '/images/pain-point-lung.png' : 'https://placehold.co/800x1000/f87171/ffffff?text=Pain+Point+Image'} 
                  alt={product.slug === 'herbal-lung-spray' ? 'شخص يعاني من كتمة في الصدر' : 'Pain placeholder'} 
                  className="w-full h-full object-cover grayscale-[30%] contrast-125"
                />
                {/* Overlay gradient for dramatic effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 left-6 text-right">
                  <p className="text-white font-extrabold text-xl mb-1 shadow-black drop-shadow-md">
                    {product.slug === 'herbal-lung-spray' ? 'لا تخلي الكتمة تسيطر على يومك' : 'لا تتجاهل إشارات جسمك'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Solution / Epiphany (Image Right, Text Left) ── */}
      <section className="py-16 md:py-24 bg-mist/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Image Right visually, Order 1 in RTL so it goes right */}
            <div className="w-full lg:w-1/2 order-1">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 border border-sage/20 shadow-xl">
                <img 
                  src={product.slug === 'herbal-lung-spray' ? '/images/solution-lung-spray.png' : 'https://placehold.co/800x800/0f766e/ffffff?text=Solution+Image+(Product+with+Herbs)'} 
                  alt={product.slug === 'herbal-lung-spray' ? 'بخاخ تنظيف الرئة العشبي مع الأعشاب الطبيعية' : 'Solution placeholder'} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Left visually, Order 2 in RTL */}
            <div className="w-full lg:w-1/2 text-right lg:text-left order-2">
              <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm lg:flex-row-reverse border border-teal/20 shadow-sm">
                <Leaf className="w-4 h-4" />
                {product.slug === 'herbal-lung-spray' ? 'الحل اللي تدور عليه 🌿' : 'الحل من الطبيعة'}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6 leading-tight tracking-tight">
                {product.slug === 'herbal-lung-spray'
                  ? 'رجع لنفسك خفته.. ونظّف صدرك من تراكمات السنين!'
                  : 'روتين يومي بسيط، يرجع لك إحساس الخفة والراحة'}
              </h2>
              <p className="text-lg text-charcoal/70 mb-8 leading-relaxed font-medium">
                {product.slug === 'herbal-lung-spray'
                  ? 'جبنا لك الخلاصة بتركيبة عشبية طبيعية 100٪، تشتغل من أول استخدام عشان تفكك العوالق وتذيب البلغم المتراكم من الدخان. روتين يومي يريح صدرك ويخليك تتنفس بعمق وكأنك مولود من جديد، بدون أي كيماويات.'
                  : 'وفرنا لك تركيبة عشبية طبيعية 100٪، مصممة خصيصاً عشان تنظف الممرات التنفسية وتدعم تنفسك بشكل يومي. بدون أدوية، بدون كيماويات، مجرد قوة الطبيعة النقية.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(product.slug === 'herbal-lung-spray'
                  ? [
                      { title: 'ينظف الرئة من آثار الدخان', icon: ShieldCheck, color: 'text-teal' },
                      { title: 'يذيب البلغم ويريح الصدر', icon: Zap, color: 'text-gold' },
                      { title: 'يوسع الشعب الهوائية', icon: Wind, color: 'text-blue-500' },
                      { title: 'ينعش التنفس فوراً', icon: HeartPulse, color: 'text-red-400' }
                    ]
                  : [
                      { title: 'يوسع الشعب الهوائية', icon: Wind, color: 'text-teal' },
                      { title: 'يذيب الترسبات والبلغم', icon: Zap, color: 'text-gold' },
                      { title: 'ينعش التنفس فوراً', icon: HeartPulse, color: 'text-red-400' },
                      { title: 'آمن للاستخدام اليومي', icon: ShieldCheck, color: 'text-green-500' }
                    ]
                ).map((feature, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-sage/20 flex items-center justify-between lg:flex-row-reverse gap-3 shadow-sm hover:shadow-md hover:border-teal/30 transition-all group">
                    <span className="font-bold text-charcoal text-sm lg:text-left text-right w-full group-hover:text-teal transition-colors">{feature.title}</span>
                    <div className={`w-10 h-10 bg-mist rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Mechanism / How it works (Text Right, Image Left) ── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-teal-light/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            <div className="w-full lg:w-1/2 text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-charcoal/50 mb-4 bg-gray-100 px-4 py-1.5 rounded-full font-bold text-sm tracking-widest uppercase">
                آلية العمل
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-10 leading-tight">
                {product.slug === 'herbal-lung-spray' 
                  ? 'كيف يطرد الدخان والترسبات وينظف صدرك حرفياً؟ 🍃' 
                  : 'كيف يشتغل المنتج ويريح صدرك؟'}
              </h2>
              
              <div className="relative space-y-8">
                {(product.slug === 'herbal-lung-spray'
                  ? [
                      { step: 1, title: 'تفكيك ترسبات السنين فوراً', desc: 'بمجرد بخات بسيطة بالفم، تتغلغل المستخلصات العشبية القوية لتفكيك طبقات النيكوتين والقطران المتصلبة في ممراتك التنفسية.' },
                      { step: 2, title: 'طرد البلغم المزعج وإذابته', desc: 'تشتغل الزيوت الطيارة على تذويب البلغم الكثيف وتوسيع الشعب، عشان تتخلص من الكحة الصباحية وتطرد الوصخ بسهولة.' },
                      { step: 3, title: 'صدر خفيف ونفس عميق كأنك انولدت من جديد', desc: 'يبني لك طبقة حماية تبرد الصدر الملتهب وتمنع جفافه، وترجع لك إحساس الخفة، صدقني بتحس بفرق من أول أسبوع!' }
                    ]
                  : [
                      { step: 1, title: 'الاستخلاص النقي', desc: 'تتغلغل المكونات العشبية بلطف في الممرات التنفسية لتبدأ عملية التنظيف الفوري.' },
                      { step: 2, title: 'تفكيك الترسبات', desc: 'تساعد في تذويب العوالق الناتجة عن الغبار ودخان البخور المتراكم يومياً.' },
                      { step: 3, title: 'انتعاش وراحة تدوم', desc: 'تترك طبقة منعشة تحمي وتهدئ جهازك التنفسي، لترجع تتنفس براحة تامة طوال اليوم.' }
                    ]
                ).map((item, idx) => (
                  <div key={item.step} className="relative flex gap-6 justify-start group">
                    {/* Glowing Step Number */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="absolute inset-0 bg-teal rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-teal-dark to-teal text-white font-extrabold flex items-center justify-center text-xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                    </div>
                    <div className="text-right pt-2">
                      <h4 className="font-extrabold text-xl text-charcoal mb-2 group-hover:text-teal transition-colors">{item.title}</h4>
                      <p className="text-charcoal/70 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 border border-sage/20 shadow-2xl">
                <img
                  src="/images/mechanism-breathing.gif"
                  alt="شرح آلية العمل — حركة التنفس والرئتين"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4.5 Ingredients Section ── */}
      {product.detailedIngredients && product.detailedIngredients.length > 0 && (
        <section className="py-16 md:py-24 bg-mist/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              
              {/* Image Side (Left visually, Right in DOM for RTL) */}
              <div className="w-full lg:w-5/12 order-1 lg:order-2">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white border border-sage/20 shadow-2xl group">
                  <img 
                    src={product.slug === 'herbal-lung-spray' ? '/images/main-ingredients-lung-spray.png' : 'https://placehold.co/800x1000/0f766e/ffffff?text=Main+Ingredients+Image'} 
                    alt={product.slug === 'herbal-lung-spray' ? 'مكونات بخاخ تنظيف الرئة العشبي الطبيعية' : 'مكونات طبيعية'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-60" />
                </div>
              </div>

              {/* Content Side (Right visually, Left in DOM for RTL) */}
              <div className="w-full lg:w-7/12 order-2 lg:order-1 text-right">
                <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm border border-teal/20 shadow-sm">
                  <Leaf className="w-4 h-4" />
                  مكونات طبيعية 100%
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4 tracking-tight">
                  سر التركيبة العشبية الفعالة
                </h2>
                <p className="text-lg text-charcoal/70 mb-10 font-medium leading-relaxed">
                  جمعنا لك أقوى الأعشاب الطبيعية اللي تشتغل مع بعض عشان تنظف صدرك وترجع لك تنفسك الطبيعي والمريح.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                  {product.detailedIngredients.map((ingredient, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 bg-mist">
                        <img 
                          src={ingredient.image} 
                          alt={ingredient.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-charcoal mb-1.5 group-hover:text-teal transition-colors">
                          {ingredient.name}
                        </h3>
                        <p className="text-sm text-charcoal/70 leading-relaxed font-medium">
                          {ingredient.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── 4.75 How to Use Section ── */}
      {product.slug === 'herbal-lung-spray' && (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm border border-teal/20 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                طريقة الاستخدام
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-4 tracking-tight">
                3 خطوات بسيطة لراحة تدوم
              </h2>
              <p className="text-lg text-charcoal/70 font-medium max-w-2xl mx-auto">
                روتين يومي سهل وسريع يضمن لك أفضل نتيجة لتنظيف الصدر وتوسيع الشعب الهوائية.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {[
                { step: 1, title: 'رج العبوة جيداً', desc: 'قبل كل استخدام، رج العبوة عشان تتجانس المستخلصات العشبية الطبيعية.', image: '/images/howto-step-1-shake.png' },
                { step: 2, title: 'بخ داخل الفم', desc: 'وجه البخاخ داخل الفم واضغط من 2 إلى 3 بخات لتغطية الممرات التنفسية.', image: '/images/howto-step-2-spray.png' },
                { step: 3, title: 'مرتين يومياً', desc: 'استخدمه في الصباح لطرد البلغم، وقبل النوم لتنفس عميق ونوم مريح.', image: '/images/howto-step-3-routine.png' },
              ].map((item) => (
                <HowToUseStep key={item.step} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Comparison Table (Us vs. Them) ── */}
      <section className="py-16 md:py-24 bg-mist/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-teal mb-4 bg-teal/10 px-5 py-2 rounded-full font-bold text-sm border border-teal/20 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            ليش نسمة هي خيارك الصح؟
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-10 tracking-tight">
            مقارنة سريعة توضح لك الفرق
          </h2>

          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-sage/20 relative">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-charcoal text-white font-bold text-sm md:text-lg">
              <div className="p-4 md:p-6 text-center border-l border-white/10 flex items-center justify-center">وجه المقارنة</div>
              <div className="p-4 md:p-6 text-center border-l border-white/10 bg-gradient-to-b from-teal-dark to-teal text-white flex flex-col items-center justify-center gap-1 shadow-inner">
                <span className="text-xl md:text-2xl mb-1">🌿</span>
                <span>روتين نسمة</span>
              </div>
              <div className="p-4 md:p-6 text-center text-white/60 flex flex-col items-center justify-center gap-1 bg-gray-900">
                <span className="text-xl md:text-2xl mb-1 grayscale opacity-50">💊</span>
                <span>البدائل العادية</span>
              </div>
            </div>

            {/* Table Rows */}
            {(product.slug === 'herbal-lung-spray'
              ? [
                  { feature: 'المكونات', us: 'خلاصة أعشاب طبيعية 100%', them: 'مركبات كيميائية ومواد مجهولة' },
                  { feature: 'الترخيص والأمان', us: 'مطابق لمواصفات الغذاء والدواء (SFDA)', them: 'غالباً مصادر غير معتمدة' },
                  { feature: 'الفعالية والنتيجة', us: 'تذويب البلغم وتنظيف عميق للرئة', them: 'تسكين مؤقت وترجع لك الكتمة' },
                  { feature: 'الاستخدام اليومي', us: 'تستخدمه يومياً وأنت متطمن', them: 'كثرة استخدامها تسبب جفاف وتعود' },
                  { feature: 'ضمان النتيجة', us: 'ارتاح أو نرجع لك فلوسك (30 يوم)', them: 'تدفع فلوسك وتخاطر بدون ضمان' },
                ]
              : [
                  { feature: 'المكونات', us: 'طبيعية عشبية 100%', them: 'مواد كيميائية' },
                  { feature: 'الترخيص', us: 'مُصرح وآمن (مطابق لهيئة الغذاء والدواء)', them: 'غير معروف المصدر' },
                  { feature: 'النتيجة', us: 'راحة وانتعاش فوري', them: 'راحة مؤقتة وجفاف' },
                  { feature: 'الآثار الجانبية', us: 'آمن للاستخدام اليومي', them: 'قد يسبب التعود أو الجفاف' },
                  { feature: 'الضمان', us: 'ضمان ذهبي 30 يوم واسترجاع', them: 'لا يوجد ضمان' },
                ]
            ).map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-sm md:text-base border-b border-sage/10 transition-colors hover:bg-mist/50 ${i % 2 === 0 ? 'bg-white' : 'bg-mist/20'}`}>
                <div className="p-4 md:p-6 text-center border-l border-sage/20 font-extrabold text-charcoal/80 flex items-center justify-center">
                  {row.feature}
                </div>
                <div className="p-4 md:p-6 text-center border-l border-sage/20 font-bold text-teal-dark flex flex-col items-center justify-center gap-2 bg-teal/5">
                  <CheckCircle2 className="w-6 h-6 text-teal drop-shadow-sm" />
                  {row.us}
                </div>
                <div className="p-4 md:p-6 text-center text-charcoal/60 font-medium flex flex-col items-center justify-center gap-2 bg-gray-50/50">
                  <XCircle className="w-5 h-5 text-red-400" />
                  {row.them}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SFDA & Quality Guarantee ── */}
      <section className="py-16 bg-white border-y border-sage/20 overflow-hidden relative">
        <div className="absolute right-0 top-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-r from-teal-dark to-charcoal rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-white relative z-10">
            <div className="w-full md:w-2/3 text-right order-2 md:order-1">
              <h2 className="text-3xl font-extrabold mb-4 text-gold">
                أمانك خط أحمر: مطابق لمواصفات هيئة الغذاء والدواء (SFDA)
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                صحتك ما فيها مجازفة. جميع منتجات نسمة تمر باختبارات جودة صارمة لتكون مطابقة تماماً للمواصفات والمقاييس السعودية (SFDA). نحن نضمن لك منتجاً نقيّاً، فعّالاً، وخالياً من أي إضافات ضارة.
              </p>
              <div className="flex flex-wrap gap-4 justify-end">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span className="font-bold text-sm">مكونات معتمدة</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="font-bold text-sm">تغليف طبي آمن</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2">
              <div className="relative w-44 md:w-56 lg:w-64">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-110" aria-hidden="true" />
                <Image
                  src="/images/sfda-approved.png"
                  alt="معتمد من الهيئة العامة للغذاء والدواء SFDA"
                  width={512}
                  height={640}
                  className="relative w-full h-auto object-contain drop-shadow-2xl"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Image Reviews / Proof Section ── */}
      {true && (
        <section id="reviews" className="py-16 md:py-24 bg-charcoal text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="text-right">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">شف تجارب عملائنا بنفسك</h2>
                <p className="text-white/70 max-w-2xl">آلاف الشباب في السعودية ارتاحوا من الكتمة بعد استخدام منتجاتنا. لا تأخذ كلامنا، اسمع منهم!</p>
              </div>
              {/* Add Review Button */}
              <Link 
                href="#reviews"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
              >
                <Star className="w-4 h-4 fill-gold text-gold" />
                أضف تقييمك
              </Link>
            </div>
            
            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
              {(product.slug === 'herbal-lung-spray'
                ? HERBAL_LUNG_SPRAY_REVIEWS
                : DEFAULT_PRODUCT_REVIEWS
              ).map((review, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/5] bg-gray-900 overflow-hidden">
                    <img 
                      src={review.image} 
                      alt={`صورة تقييم من ${review.name}`} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500"
                    />
                    {/* Verified Buyer Badge */}
                    <div className="absolute top-3 right-3 bg-teal/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      مشتري مؤكد
                    </div>
                  </div>
                  {/* Review Content */}
                  <div className="p-5">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mb-4 font-medium min-h-[72px] line-clamp-4">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                      <div className="w-8 h-8 rounded-full bg-teal-dark flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{review.name}</p>
                        <p className="text-xs text-white/50">{review.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Link
                href="#offer"
                className="inline-flex items-center justify-center gap-3 bg-teal hover:bg-teal-dark text-white font-extrabold text-xl px-12 py-5 rounded-2xl shadow-xl shadow-teal/20 hover:scale-105 transition-all w-full md:w-auto animate-bounce"
              >
                🚀 اطلب الآن والدفع عند الاستلام
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. FAQ ── */}
      <section className="py-16 bg-white border-y border-sage/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-charcoal mb-4">أسئلة شائعة عن المنتج</h2>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-sage/20">
          <FAQAccordion items={product.faqs} />
          </div>
        </div>
      </section>

      {/* ── 7. Trust Badges ── */}
      <section className="py-10 bg-ivory border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* ── 8. Cross-sell ── */}
      {crossSellProducts.length > 0 && (
        <section className="py-16 bg-mist/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-charcoal mb-3">كمل روتينك لنتائج أفضل</h2>
              <p className="text-charcoal/60 max-w-xl mx-auto">
                منتجات تكمّل بعضها عشان تحصل على تنفس أريح ونتيجة أوضح
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              {crossSellProducts.map((p) => {
                const offer = getDefaultOffer()
                return (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-sage/20 hover:border-teal/30 hover:shadow-xl transition-all shadow-sm"
                  >
                    <div className="relative aspect-square bg-mist border-b border-sage/10">
                      <Image
                        src={p.image}
                        alt={p.nameAr}
                        fill
                        sizes="(max-width: 768px) 45vw, 280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                  </div>
                    <div className="flex flex-col flex-1 p-4 md:p-5 text-center">
                      <h3 className="font-extrabold text-charcoal text-sm md:text-base group-hover:text-teal transition-colors line-clamp-3 mb-3 min-h-[3.5rem] md:min-h-[4rem]">
                      {p.nameAr}
                    </h3>
                      <p className="text-teal font-extrabold text-sm md:text-base mb-4">
                        من {offer.price} ريال
                      </p>
                      <span className="mt-auto inline-flex items-center justify-center gap-1 rounded-xl bg-teal/10 group-hover:bg-teal group-hover:text-white text-teal font-extrabold text-sm py-2.5 px-4 transition-colors">
                        عرض المنتج
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </span>
                  </div>
                </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-sage/30 p-4 shadow-[0_-10px_40px_rgba(15,118,110,0.15)]" dir="rtl">
        <div className="max-w-md mx-auto">
          <Link
            href="#offer"
            className="w-full bg-gradient-to-r from-teal-dark to-teal text-white font-extrabold py-3.5 px-4 rounded-xl text-center shadow-lg shadow-teal/30 flex items-center justify-center gap-2 active:scale-95 transition-transform animate-bounce"
          >
            اطلب الآن والدفع عند الاستلام 📦
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
