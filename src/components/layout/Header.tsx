'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import LungLogo from '@/components/brand/LungLogo'

const NAV_LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'المنتجات' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, openCart } = useCartStore()
  const count = itemCount()

  return (
    <header
      className="sticky top-0 z-30 w-full border-b border-sage/30 bg-ivory/90 backdrop-blur-md"
      dir="rtl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 text-teal">
          <div className="relative h-11 w-11 overflow-hidden rounded-full shadow-md ring-1 ring-gold/40 transition-all duration-300 group-hover:ring-gold/70 group-hover:shadow-lg group-hover:shadow-gold/20">
            <LungLogo className="h-full w-full scale-110" priority />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-teal-dark">
              نسمة
            </span>
            <span className="text-[10px] font-medium tracking-widest text-teal/70 uppercase ltr">
              nasama shop
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex" aria-label="التنقل الرئيسي">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 transition-colors hover:text-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-mist text-teal transition-colors hover:bg-teal hover:text-white"
            aria-label={`سلة التسوق (${count} منتجات)`}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white ltr">
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-charcoal transition-colors hover:bg-teal hover:text-white md:hidden"
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
          className="border-t border-sage/30 bg-ivory px-4 py-4 md:hidden"
          aria-label="التنقل للجوال"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-charcoal/80 transition-colors hover:bg-mist hover:text-teal"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-sage/30 pt-4">
            <button
              onClick={() => {
                openCart()
                setMobileOpen(false)
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-3 font-semibold text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>سلة التسوق</span>
              {count > 0 && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
