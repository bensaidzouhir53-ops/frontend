'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function StickyOrderBar({ dark = false }: { dark?: boolean }) {
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById('quick-order')
    if (!form) return

    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.25 },
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  if (formVisible) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden ${
        dark ? 'border-white/10 bg-teal-dark/95' : 'border-border bg-white/95'
      }`}
      dir="rtl"
    >
      <div className="mx-auto max-w-md">
        <Link
          href="#quick-order"
          className={`flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl px-4 text-[15px] font-bold shadow-lg transition-colors active:scale-[0.98] ${
            dark ? 'bg-gold text-charcoal hover:bg-gold-dark' : 'bg-teal text-white hover:bg-teal-dark'
          }`}
        >
          <ShieldCheck className="h-5 w-5 shrink-0" />
          <span>أكمل طلبك — الدفع عند الاستلام</span>
        </Link>
      </div>
    </div>
  )
}
