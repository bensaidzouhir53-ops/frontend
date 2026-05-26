import type { Metadata } from 'next'
import Link from 'next/link'
import { WHATSAPP_URL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'نسمة | الشحن والإرجاع',
  description: 'معلومات الشحن والتوصيل وسياسة الإرجاع لمتجر نسمة — توصيل لجميع مناطق المملكة مع الدفع عند الاستلام.',
}

export default function ShippingReturnsPage() {
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
            <span className="text-charcoal">الشحن والإرجاع</span>
          </nav>
          <h1 className="text-4xl font-bold text-charcoal mb-3">الشحن والإرجاع</h1>
          <p className="text-charcoal/60">كل ما تحتاج معرفته عن توصيل طلبك وسياسة الإرجاع</p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b border-sage/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'مجاني', label: 'الشحن', icon: '🚚' },
              { value: '٢–٥ أيام', label: 'التوصيل', icon: '📅' },
              { value: 'جميع مناطق KSA', label: 'التغطية', icon: '🗺️' },
              { value: '٧ أيام', label: 'مدة الإرجاع', icon: '↩️' },
            ].map((stat) => (
              <div key={stat.label} className="bg-mist rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="font-bold text-charcoal text-lg">{stat.value}</p>
                <p className="text-charcoal/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Shipping Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage/20 overflow-hidden">
            <div className="bg-gradient-to-r from-teal to-teal-light p-6 text-right">
              <div className="flex items-center gap-3 justify-end">
                <h2 className="text-xl font-bold text-white">معلومات الشحن والتوصيل</h2>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5 text-right">
              {[
                {
                  title: 'مناطق التوصيل',
                  content:
                    'نوصّل لجميع مناطق ومحافظات المملكة العربية السعودية بما فيها: الرياض، جدة، مكة المكرمة، المدينة المنورة، الدمام، الخبر، الطائف، أبها، تبوك، حائل، القصيم، وجميع المناطق الأخرى.',
                },
                {
                  title: 'مدة التوصيل',
                  content:
                    'تصلك طلباتك خلال ٢–٥ أيام عمل من تأكيد الطلب. قد تستغرق بعض المناطق النائية وقتاً إضافياً. لا تُحسب أيام الجمعة والعطل الرسمية ضمن أيام العمل.',
                },
                {
                  title: 'تكلفة الشحن',
                  content:
                    'الشحن مجاني تماماً لجميع الطلبات بغض النظر عن القيمة أو الكمية. لا توجد أي رسوم خفية.',
                },
                {
                  title: 'الدفع عند الاستلام (COD)',
                  content:
                    'جميع طلباتنا تُدفع عند الاستلام. لا داعي لإدخال بيانات بطاقتك الآن — ادفع للمندوب عند وصول طلبك بيدك.',
                },
                {
                  title: 'تتبع الطلب',
                  content:
                    'سترسل لك شركة الشحن رسالة نصية برقم التتبع فور شحن طلبك. يمكنك متابعة حالة طلبك عبر موقع شركة الشحن.',
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-charcoal mb-1.5">{item.title}</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{item.content}</p>
                  {i < 4 && <div className="border-b border-sage/20 mt-5" />}
                </div>
              ))}
            </div>
          </div>

          {/* Returns Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-sage/20 overflow-hidden">
            <div className="bg-gradient-to-r from-gold to-gold-light p-6 text-right">
              <div className="flex items-center gap-3 justify-end">
                <h2 className="text-xl font-bold text-white">سياسة الإرجاع والاستبدال</h2>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 2 2 2-2 2 2 2-2 4 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5 text-right">
              <div className="bg-mist rounded-xl p-4">
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  رضاك عن تجربتك مع نسمة أولويتنا. إذا لم تكن راضياً لأي سبب، تواصل معنا ونحن سنبذل كل ما بوسعنا للمساعدة.
                </p>
              </div>

              {[
                {
                  title: 'شروط قبول الإرجاع',
                  items: [
                    'المنتج لم يُفتح وعبوته الأصلية سليمة',
                    'الإبلاغ عن طلب الإرجاع خلال ٧ أيام من تاريخ الاستلام',
                    'احتفظ بفاتورة الشراء ورقم الطلب',
                    'المنتج لم يتعرض لأضرار بسبب سوء الاستخدام أو التخزين',
                  ],
                },
                {
                  title: 'حالات لا تُقبل فيها الإرجاع',
                  items: [
                    'العبوة مفتوحة أو المنتج مستخدم جزئياً',
                    'مرور أكثر من ٧ أيام على تاريخ الاستلام',
                    'المنتج تالف بسبب سوء التعامل أو التخزين الخاطئ',
                    'منتجات أُعيدت دون التواصل المسبق معنا',
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-charcoal mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                        </div>
                        <p className="text-charcoal/70 text-sm">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="border-t border-sage/20 pt-5">
                <h3 className="font-semibold text-charcoal mb-4">خطوات طلب الإرجاع</h3>
                <div className="space-y-3">
                  {[
                    { step: '١', title: 'تواصل معنا', desc: 'أرسل رسالة على واتساب أو البريد الإلكتروني مع رقم طلبك وسبب الإرجاع.' },
                    { step: '٢', title: 'تأكيد الطلب', desc: 'سيتواصل فريقنا معك خلال ٢٤ ساعة لتأكيد قبول طلب الإرجاع وإرشادك للخطوات.' },
                    { step: '٣', title: 'إعادة المنتج', desc: 'أرسل المنتج المُعاد في حالته الأصلية. سنغطي تكلفة الإعادة في حال وجود عيب في المنتج.' },
                    { step: '٤', title: 'المعالجة', desc: 'يُعالج طلب الإرجاع خلال ٣–٥ أيام عمل من استلام المنتج. نحن نتواصل معك في كل خطوة.' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-teal rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal text-sm">{item.title}</p>
                        <p className="text-charcoal/60 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Returns */}
          <div className="bg-gradient-to-br from-teal-dark to-teal rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-3">هل تحتاج مساعدة في طلب الإرجاع؟</h2>
            <p className="text-white/75 text-sm mb-5">فريقنا جاهز لمساعدتك في أسرع وقت</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal font-bold px-6 py-3 rounded-xl hover:bg-ivory transition-colors shadow-lg"
              >
                تواصل عبر واتساب
              </a>
              <a
                href="mailto:hello@nasmashop.sa"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/30"
              >
                راسلنا بالبريد
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
