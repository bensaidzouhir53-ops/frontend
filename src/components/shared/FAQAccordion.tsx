'use client'

import { useState } from 'react'

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-3" dir="rtl">
      {items.map((item, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden transition-all ${
            open === i ? 'border-teal/30 shadow-sm' : 'border-sage/30'
          }`}
        >
          <button
            className="w-full flex items-center justify-between p-5 text-right bg-white hover:bg-mist/50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-semibold text-charcoal text-sm leading-relaxed pr-3">
              {item.q}
            </span>
            <div
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                open === i ? 'bg-teal text-white' : 'bg-mist text-teal'
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
            <div className="px-5 pb-5 bg-white">
              <div className="border-t border-sage/20 pt-4">
                <p className="text-charcoal/80 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
