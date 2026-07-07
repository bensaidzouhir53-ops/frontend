import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'نَفَس | الشروط والأحكام',
  description: 'الشروط والأحكام لاستخدام متجر نَفَس وإتمام عمليات الشراء.',
}

export default function TermsPage() {
  return (
    <main dir="rtl" className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-mist to-ivory py-12 border-b border-sage/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          <nav className="flex items-center gap-2 text-sm text-charcoal/50 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">الرئيسية</Link>
            <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-charcoal">الشروط والأحكام</span>
          </nav>
          <h1 className="text-4xl font-bold text-charcoal mb-3">الشروط والأحكام</h1>
          <p className="text-charcoal/60">آخر تحديث: مايو ٢٠٢٦</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-sage/20 p-8 md:p-10 space-y-8 text-right">

            <div className="bg-mist rounded-xl p-5 border border-sage/20">
              <p className="text-charcoal/70 text-sm leading-relaxed">
                باستخدامك لموقع نَفَس أو إتمامك لأي عملية شراء، فإنك توافق على الشروط والأحكام التالية. يُرجى قراءتها بعناية قبل تقديم طلبك.
              </p>
            </div>

            {[
              {
                title: '١. شروط الدفع عند الاستلام',
                items: [
                  'جميع مشتريات نَفَس تتم بنظام الدفع عند الاستلام (COD) فقط. لا يُطلب منك أي دفع مسبق.',
                  'عند وصول طلبك، يتعيّن عليك دفع المبلغ المتفق عليه كاملاً للمندوب قبل استلام الطلب.',
                  'في حال رفض استلام الطلب بدون سبب مقبول بعد تأكيده، يحق لنا تقييد إمكانية الطلب مستقبلاً.',
                  'المبالغ المحددة بالريال السعودي نهائية وتشمل ضريبة القيمة المضافة إن وُجدت.',
                ],
              },
              {
                title: '٢. الأسعار وإمكانية التغيير',
                items: [
                  'تعكس الأسعار المعروضة على الموقع سعر الطلب في وقت تقديمه.',
                  'نحتفظ بحق تعديل الأسعار في أي وقت دون إشعار مسبق. لن يؤثر أي تعديل على الطلبات المؤكّدة.',
                  'العروض والتخفيضات صالحة للفترة المحددة لها فقط ولا يمكن تطبيقها بأثر رجعي.',
                  'في حالة وجود خطأ في السعر المعروض، يحق لنا التواصل معك لتصحيحه قبل إتمام الشحن.',
                ],
              },
              {
                title: '٣. سياسة إلغاء الطلب',
                items: [
                  'يمكنك إلغاء طلبك مجاناً قبل شحنه بالتواصل معنا عبر واتساب في أسرع وقت ممكن.',
                  'بعد شحن الطلب، لا يمكن إلغاؤه ولكن يمكنك رفض الاستلام مع مراعاة سياسة الإرجاع.',
                  'في حال تعذّر التواصل معك لتأكيد الطلب خلال ٤٨ ساعة، قد يُلغى الطلب تلقائياً.',
                ],
              },
              {
                title: '٤. دقة وصف المنتجات',
                items: [
                  'نسعى لأن تكون أوصاف منتجاتنا وصورها دقيقة قدر الإمكان. قد تختلف الألوان قليلاً حسب شاشة جهازك.',
                  'المعلومات المقدمة عن المكونات والاستخدامات هي لأغراض توعوية فقط وليست ادعاءات طبية.',
                  'منتجاتنا مكملات عشبية وليست أدوية ولا تُغني عن الاستشارة الطبية المتخصصة.',
                ],
              },
              {
                title: '٥. حدود المسؤولية',
                items: [
                  'نَفَس مسؤولة عن جودة المنتجات المشحونة وتوصيلها في الحالة الموصوفة.',
                  'لا تتحمل نَفَس مسؤولية أي تأثيرات تنتج عن الاستخدام الخاطئ أو غير الموصى به للمنتجات.',
                  'في حال وجود حالة صحية معينة، يقع على العميل مسؤولية استشارة الطبيب قبل الاستخدام.',
                  'أقصى مسؤولية لنا محدودة بقيمة الطلب المدفوع في حال ثبوت عيب في المنتج.',
                ],
              },
              {
                title: '٦. القانون الواجب التطبيق',
                items: [
                  'تخضع هذه الشروط لأنظمة المملكة العربية السعودية وتُفسَّر وفقاً لها.',
                  'أي نزاع يُحال إلى الجهات القضائية المختصة في المملكة العربية السعودية.',
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-charcoal mb-4">{section.title}</h2>
                <ul className="space-y-2.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                      </div>
                      <p className="text-charcoal/70 text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="border-t border-sage/30 pt-6">
              <p className="text-charcoal/60 text-sm leading-relaxed">
                للاستفسار عن أي بند من هذه الشروط، تواصل معنا على:{' '}
                <a href="mailto:hello@nasmashop.sa" className="text-teal font-semibold hover:underline">
                  hello@nasmashop.sa
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
