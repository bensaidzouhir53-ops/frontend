'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import LungLogo from '@/components/brand/LungLogo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'المنتجات' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
]

function isActiveLink(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname() ?? '/'

  return (
    <header
      className="sticky top-0 z-30 w-full border-b border-gold/20 bg-gradient-to-l from-teal-dark via-apothecary-dark to-charcoal shadow-lg shadow-black/20"
      dir="rtl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-105">
            <LungLogo className="h-full w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" priority />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight text-white">
              نَفَس
            </span>
            <span className="mt-1 max-w-[9.5rem] text-[10px] font-bold leading-snug text-gold">
              الكنز الأخضر
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="التنقل الرئيسي">
          {NAV_LINKS.map((link) => {
            const active = isActiveLink(pathname, link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-bold transition-colors',
                  active ? 'text-gold' : 'text-white/75 hover:bg-white/10 hover:text-white',
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-gold/50 hover:text-gold md:hidden"
            aria-label="القائمة"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav
          className="border-t border-white/10 bg-gradient-to-b from-teal-dark to-charcoal px-4 py-4 md:hidden"
          aria-label="التنقل للجوال"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActiveLink(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold transition-colors',
                      active
                        ? 'border border-gold/30 bg-gold/10 text-gold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white',
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', active ? 'bg-gold' : 'bg-white/25')} />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
