'use client'

import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  dark?: boolean
}

export default function FAQAccordion({ items, dark = false }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-3" dir="rtl">
      {items.map((item, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden transition-all ${
            dark
              ? open === i
                ? 'border-gold/50 shadow-lg shadow-gold/10'
                : 'border-white/10'
              : open === i
                ? 'border-teal/30 shadow-sm'
                : 'border-sage/30'
          }`}
        >
          <button
            className={`w-full flex items-center justify-between p-5 text-right transition-colors ${
              dark ? 'bg-white/[0.04] hover:bg-white/[0.08]' : 'bg-white hover:bg-mist/50'
            }`}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span
              className={`font-semibold text-sm leading-relaxed pr-3 ${
                dark ? (open === i ? 'text-gold' : 'text-white') : 'text-charcoal'
              }`}
            >
              {item.q}
            </span>
            <div
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                dark
                  ? open === i
                    ? 'bg-gold text-charcoal'
                    : 'bg-gold/15 text-gold'
                  : open === i
                    ? 'bg-teal text-white'
                    : 'bg-mist text-teal'
              }`}
            >
              <svg
                className={`w-4 h-4 transition-transform ${open === i ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {open === i && (
            <div className={`px-5 pb-5 ${dark ? 'bg-white/[0.04]' : 'bg-white'}`}>
              <div className={`border-t pt-4 ${dark ? 'border-white/10' : 'border-sage/20'}`}>
                <p className={`text-sm leading-relaxed ${dark ? 'text-white/75' : 'text-charcoal/80'}`}>
                  {item.a}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
