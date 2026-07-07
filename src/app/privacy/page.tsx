import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'نَفَس | سياسة الخصوصية',
  description: 'سياسة خصوصية متجر نَفَس — كيف نجمع بياناتك ونستخدمها ونحميها.',
}

export default function PrivacyPage() {
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
            <span className="text-charcoal">سياسة الخصوصية</span>
          </nav>
          <h1 className="text-4xl font-bold text-charcoal mb-3">سياسة الخصوصية</h1>
          <p className="text-charcoal/60">آخر تحديث: مايو ٢٠٢٦</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-sage/20 p-8 md:p-10 space-y-8 text-right">

            <div className="bg-mist rounded-xl p-5 border border-sage/20">
              <p className="text-charcoal/70 text-sm leading-relaxed">
                نحن في نَفَس نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع معلوماتك واستخدامها وحمايتها عند تفاعلك مع متجرنا الإلكتروني.
              </p>
            </div>

            {[
              {
                title: '١. البيانات التي نجمعها',
                content: [
                  {
                    subtitle: 'بيانات الطلب',
                    text: 'عند تقديم طلب، نجمع: الاسم الكامل، رقم الهاتف، عنوان التوصيل، والمنطقة داخل المملكة العربية السعودية. هذه البيانات ضرورية لمعالجة طلبك وتوصيله.',
                  },
                  {
                    subtitle: 'بيانات التواصل',
                    text: 'إذا تواصلت معنا عبر البريد الإلكتروني أو واتساب، نحتفظ بسجل المراسلات لتقديم دعم أفضل.',
                  },
                  {
                    subtitle: 'بيانات الاستخدام',
                    text: 'نجمع معلومات تقنية مثل نوع المتصفح، نظام التشغيل، وصفحات الموقع التي تزورها. هذه البيانات مجمّعة وغير شخصية وتُستخدم لتحسين تجربة الموقع.',
                  },
                ],
              },
              {
                title: '٢. كيف نستخدم بياناتك',
                content: [
                  {
                    subtitle: 'تنفيذ الطلبات',
                    text: 'نستخدم بياناتك أساساً لمعالجة طلبك وتنسيق التوصيل مع شركات الشحن والتواصل معك لتأكيد الطلب وتتبّعه.',
                  },
                  {
                    subtitle: 'تحسين الخدمة',
                    text: 'نحلّل بيانات الاستخدام المجمّعة لفهم احتياجات عملائنا وتطوير تجربة التسوّق.',
                  },
                  {
                    subtitle: 'التواصل التسويقي',
                    text: 'لن نرسل لك رسائل تسويقية دون موافقتك الصريحة. يمكنك إلغاء الاشتراك في أي وقت.',
                  },
                ],
              },
              {
                title: '٣. مشاركة البيانات مع الأطراف الثالثة',
                content: [
                  {
                    subtitle: 'لا نبيع بياناتك',
                    text: 'نؤكد بشكل قاطع أننا لا نبيع أو نؤجر بياناتك الشخصية لأي طرف ثالث تحت أي ظرف.',
                  },
                  {
                    subtitle: 'شركاء التوصيل',
                    text: 'نشارك بيانات العنوان والاسم ورقم الهاتف مع شركات الشحن المعتمدة لتنفيذ التوصيل فقط.',
                  },
                  {
                    subtitle: 'متطلبات قانونية',
                    text: 'قد نُفصح عن بياناتك إذا طُلب ذلك بموجب القانون أو أمر قضائي صادر من الجهات المختصة في المملكة العربية السعودية.',
                  },
                ],
              },
              {
                title: '٤. ملفات تعريف الارتباط (الكوكيز) وبكسلات التتبع',
                content: [
                  {
                    subtitle: 'الكوكيز الضرورية',
                    text: 'يستخدم موقعنا كوكيز أساسية لضمان عمل الموقع بشكل صحيح، مثل تذكّر محتوى سلة التسوق.',
                  },
                  {
                    subtitle: 'كوكيز التحليل',
                    text: 'نستخدم أدوات تحليلية مثل Google Analytics لفهم كيفية استخدام الزوار للموقع. البيانات مجمّعة وغير شخصية.',
                  },
                  {
                    subtitle: 'بكسلات التسويق',
                    text: 'قد نستخدم بكسلات تتبع من منصات التواصل الاجتماعي (مثل Meta Pixel) لقياس أداء الحملات الإعلانية. يمكنك إيقاف هذا التتبع من إعدادات متصفحك.',
                  },
                ],
              },
              {
                title: '٥. حقوقك وطلبات البيانات',
                content: [
                  {
                    subtitle: 'الوصول والتصحيح',
                    text: 'يحق لك طلب نسخة من بياناتك المحفوظة لدينا أو تصحيحها في أي وقت.',
                  },
                  {
                    subtitle: 'حذف البيانات',
                    text: 'يمكنك طلب حذف بياناتك الشخصية من سجلاتنا، مع مراعاة الالتزامات القانونية للاحتفاظ ببيانات المعاملات.',
                  },
                  {
                    subtitle: 'للتواصل بشأن بياناتك',
                    text: 'أرسل طلبك إلى: privacy@nasmashop.sa أو تواصل معنا عبر واتساب.',
                  },
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-charcoal mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-charcoal mb-1.5">{item.subtitle}</h3>
                      <p className="text-charcoal/70 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-sage/30 pt-6">
              <p className="text-charcoal/60 text-sm leading-relaxed">
                نحتفظ بحق تحديث هذه السياسة من وقت لآخر. سيتم إشعارك بالتغييرات الجوهرية عبر البريد الإلكتروني المسجّل. باستمرارك في استخدام الموقع بعد التحديث، تعني موافقتك على السياسة المحدّثة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
