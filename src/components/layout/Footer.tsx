import Link from 'next/link'
import LungLogo from '@/components/brand/LungLogo'
import { WHATSAPP_URL } from '@/lib/contact'

const FOOTER_LINKS = [
  { href: '/shipping', label: 'الشحن والإرجاع' },
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/terms', label: 'الشروط والأحكام' },
  { href: '/#contact', label: 'تواصل معنا' },
]

export default function Footer() {
  return (
    <>
      {/* ── Main Footer ── */}
      <footer className="bg-charcoal text-mist relative overflow-hidden pt-20 border-t-[6px] border-teal" dir="rtl">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-dark/20 rounded-full blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] opacity-40 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative z-10">
          <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between mb-16">
            
            {/* Brand */}
            <div className="max-w-sm">
              <div className="mb-8 flex items-center gap-4 text-gold group cursor-default">
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold/40 shadow-[0_0_30px_rgba(215,168,92,0.2)] transition-all duration-500 group-hover:ring-gold group-hover:shadow-[0_0_40px_rgba(215,168,92,0.35)]">
                  <LungLogo className="h-full w-full scale-110" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">نسمة</span>
                  <span className="text-xs font-bold tracking-[0.35em] text-gold uppercase ltr mt-2 opacity-90 drop-shadow-sm">
                    nasama shop
                  </span>
                </div>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-mist/70 font-medium">
                متجر متخصص في منتجات العناية بالجهاز التنفسي. تركيبات عشبية طبيعية 100% صُممت خصيصاً لدعم إحساس التنفس المريح في يومك واستعادة نشاطك.
              </p>
            </div>

            {/* Links */}
            <nav aria-label="روابط التذييل">
              <p className="mb-8 text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gold rounded-full inline-block" />
                روابط مفيدة
              </p>
              <ul className="flex flex-col gap-5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 text-base md:text-lg text-mist/70 transition-all hover:text-white font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal group-hover:bg-gold group-hover:scale-150 transition-all duration-300 shadow-sm" />
                      <span className="group-hover:-translate-x-3 transition-transform duration-300">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <p className="mb-8 text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-6 bg-teal rounded-full inline-block" />
                نحن هنا لخدمتك
              </p>
              <a
                href={WHATSAPP_URL}
                className="group relative inline-flex items-center gap-3 rounded-[1.25rem] bg-gradient-to-r from-green-500 to-green-600 p-[3px] shadow-[0_10px_30px_rgba(34,197,94,0.2)] hover:shadow-[0_10px_40px_rgba(34,197,94,0.4)] transition-all duration-500 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 bg-white/20 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-3 bg-charcoal px-8 py-4 rounded-xl transition-colors group-hover:bg-transparent">
                  <svg className="w-7 h-7 text-green-500 group-hover:text-white transition-colors drop-shadow" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.48-1.459-1.653-1.756-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  <span className="font-extrabold text-white text-lg tracking-wide">تواصل عبر واتساب</span>
                </span>
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-mist/10 pt-8 text-sm md:text-base text-mist/50 md:flex-row font-medium">
            <p className="flex items-center gap-2">
              جميع الحقوق محفوظة © {new Date().getFullYear()}
              <span className="font-extrabold text-white">نسمة</span>
            </p>
            <p className="ltr tracking-[0.4em] font-extrabold text-mist/30 text-xs">POWERED BY NASAMA SHOP</p>
          </div>
        </div>
      </footer>
    </>
  )
}
