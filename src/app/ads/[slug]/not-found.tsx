import Link from 'next/link'

export default function AdsRedirectNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center" dir="rtl">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-teal">404</p>
      <h1 className="mb-4 text-3xl font-extrabold text-charcoal">رابط الإعلان غير موجود</h1>
      <p className="mb-8 max-w-md text-charcoal/65">
        هذا الرابط غير مفعّل حالياً. تأكد من كتابة الرابط بشكل صحيح أو تواصل مع فريق نسمة.
      </p>
      <Link
        href="/"
        className="rounded-2xl bg-teal px-6 py-3 font-extrabold text-white hover:bg-teal-dark"
      >
        العودة للرئيسية
      </Link>
    </div>
  )
}
