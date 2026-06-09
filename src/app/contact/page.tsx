'use client'

import { useState } from 'react'
import Link from 'next/link'
import { WHATSAPP_PHONE_DISPLAY, buildGeneralWhatsAppUrl } from '@/lib/contact'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <main dir="rtl" className="bg-ivory min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-mist to-ivory py-14 border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          <p className="text-teal font-semibold text-sm tracking-widest uppercase mb-2">نحن هنا لك</p>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">تواصل معنا</h1>
          <p className="text-charcoal/60 text-lg max-w-xl">
            سعيدون بالإجابة على أسئلتك في أسرع وقت ممكن
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-charcoal mb-6 text-right">طرق التواصل</h2>

              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                  color: 'bg-green-500',
                  title: 'واتساب',
                  value: WHATSAPP_PHONE_DISPLAY,
                  sub: 'متاح ٩ص – ٩م (السبت–الخميس)',
                  href: buildGeneralWhatsAppUrl(),
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: 'bg-teal',
                  title: 'البريد الإلكتروني',
                  value: 'hello@nasmashop.sa',
                  sub: 'نرد خلال ٢٤ ساعة',
                  href: 'mailto:hello@nasmashop.sa',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: 'bg-gold',
                  title: 'ساعات العمل',
                  value: 'السبت – الخميس',
                  sub: '٩ صباحاً – ٩ مساءً (بتوقيت الرياض)',
                  href: null,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-sage/20 shadow-sm text-right flex items-start gap-4"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/50 mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-charcoal hover:text-teal transition-colors block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-charcoal">{item.value}</p>
                    )}
                    <p className="text-xs text-charcoal/50 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}

              {/* FAQ Link */}
              <div className="bg-mist rounded-2xl p-5 text-right border border-sage/20">
                <p className="font-semibold text-charcoal mb-2">لديك سؤال سريع؟</p>
                <p className="text-charcoal/60 text-sm mb-3">تصفح قسم الأسئلة الشائعة — قد تجد إجابتك على الفور</p>
                <Link href="/#faq" className="text-teal font-semibold text-sm hover:text-teal-dark transition-colors inline-flex items-center gap-1">
                  الأسئلة الشائعة
                  <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-sage/20 p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal mb-3">تم إرسال رسالتك!</h3>
                    <p className="text-charcoal/60 mb-6">
                      شكراً للتواصل معنا. سيقوم فريقنا بالرد عليك في أقرب وقت ممكن.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                      className="text-teal font-semibold hover:text-teal-dark transition-colors"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-charcoal mb-6 text-right">أرسل لنا رسالة</h2>
                    <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                            الاسم الكامل <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="اسمك الكريم"
                            className="w-full border border-sage/40 rounded-xl px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-right bg-ivory"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                            البريد الإلكتروني <span className="text-red-400">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="example@email.com"
                            className="w-full border border-sage/40 rounded-xl px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-left bg-ivory"
                            dir="ltr"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                          الرسالة <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="اكتب رسالتك هنا..."
                          className="w-full border border-sage/40 rounded-xl px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none text-right bg-ivory"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal hover:bg-teal-dark disabled:bg-teal/60 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal/20"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            جارٍ الإرسال...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            إرسال الرسالة
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 bg-white border-t border-sage/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-mist rounded-3xl h-64 flex items-center justify-center border border-sage/30">
            <div className="text-center">
              <svg className="w-10 h-10 text-sage mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-charcoal/50 text-sm">المملكة العربية السعودية</p>
              <p className="text-charcoal/40 text-xs mt-1">نوصّل لجميع مناطق المملكة</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
