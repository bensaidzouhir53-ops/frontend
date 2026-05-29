'use client'

import { useEffect, useState } from 'react'
import { PackageCheck, X } from 'lucide-react'

const NAMES = [
  'سارة',
  'محمد',
  'نورة',
  'خالد',
  'ريم',
  'عبدالله',
  'لين',
  'فيصل',
  'هند',
  'تركي',
]

const CITIES = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة', 'الخبر', 'أبها', 'تبوك']

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function randomMinutesAgo(): number {
  return Math.floor(Math.random() * 18) + 2
}

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    let cycleTimer: ReturnType<typeof setInterval> | undefined

    const showToast = () => {
      const name = pickRandom(NAMES)
      const city = pickRandom(CITIES)
      const minutes = randomMinutesAgo()
      setMessage(`${name} من ${city} أكملت طلبها قبل ${minutes} دقائق`)
      setVisible(true)

      hideTimer = setTimeout(() => setVisible(false), 4500)
    }

    const initialTimer = setTimeout(showToast, 3500)
    cycleTimer = setInterval(showToast, 9000)

    return () => {
      clearTimeout(initialTimer)
      clearTimeout(hideTimer)
      clearInterval(cycleTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-4 z-50 max-w-sm md:left-6"
      dir="rtl"
    >
      <div className="flex items-start gap-3 rounded-2xl border border-sage/30 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
          <PackageCheck className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal/80">طلب جديد</p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-charcoal">{message}</p>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="rounded-full p-1 text-charcoal/40 transition-colors hover:bg-mist hover:text-charcoal"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
