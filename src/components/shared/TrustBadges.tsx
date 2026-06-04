'use client'

import { useEffect, useRef } from 'react'
import { Shield, Truck, Phone, RotateCcw, Leaf, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrustBadgesProps {
  variant?: 'row' | 'grid'
  className?: string
}

const BADGES = [
  {
    icon: CheckCircle2,
    title: 'مطابق لمعايير SFDA',
    desc: 'هيئة الغذاء والدواء السعودية',
    color: 'text-apothecary',
    bg: 'bg-apothecary/10',
  },
  {
    icon: Shield,
    title: 'الدفع عند الاستلام',
    desc: 'ادفع بعد ما يوصلك المندوب',
    color: 'text-apothecary',
    bg: 'bg-apothecary/10',
  },
  {
    icon: Truck,
    title: 'توصيل لكل مناطق المملكة',
    desc: '2-4 أيام عمل لباب البيت',
    color: 'text-teal',
    bg: 'bg-teal/10',
  },
  {
    icon: Phone,
    title: 'مستشار صيدلية على واتساب',
    desc: 'استشارة مجانية بالعربي',
    color: 'text-teal',
    bg: 'bg-teal/10',
  },
  {
    icon: RotateCcw,
    title: 'ضمان 30 يوماً أو استرداد كامل',
    desc: 'بدون أسئلة معقدة',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Leaf,
    title: 'تركيبات عشبية بمعايير صيدلانية',
    desc: 'بدون كيماويات ولا تعود',
    color: 'text-apothecary-dark',
    bg: 'bg-sage/25',
  },
]

function BadgeItem({ badge }: { badge: (typeof BADGES)[number] }) {
  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
      <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-full', badge.bg)}>
        <badge.icon className={cn('h-6 w-6', badge.color)} />
      </div>
      <div className="text-right">
        <p className="text-base font-extrabold text-charcoal">{badge.title}</p>
        <p className="text-sm font-medium text-charcoal/60">{badge.desc}</p>
      </div>
    </div>
  )
}

export default function TrustBadges({ variant = 'row', className }: TrustBadgesProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant !== 'row') return
    const el = marqueeRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('is-paused', !entry.isIntersecting)
      },
      { rootMargin: '100px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [variant])

  if (variant === 'row') {
    return (
      <div
        className={cn(
          'relative w-full overflow-hidden border-y border-sage/20 bg-white py-6',
          className,
        )}
        dir="rtl"
      >
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />

        <div ref={marqueeRef} className="animate-marquee-rtl is-paused flex w-max items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {BADGES.map((badge, j) => (
                <div key={`${i}-${j}`} className="flex items-center gap-3">
                  <BadgeItem badge={badge} />
                  {j < BADGES.length - 1 && (
                    <div className="ml-6 mr-3 h-1.5 w-1.5 rounded-full bg-sage/40" />
                  )}
                </div>
              ))}
              <div className="ml-6 mr-3 h-1.5 w-1.5 rounded-full bg-sage/40" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5', className)}
      dir="rtl"
    >
      {BADGES.map((badge) => (
        <div
          key={badge.title}
          className={cn('flex flex-col items-start gap-2 rounded-xl p-4', badge.bg)}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
            <badge.icon className={cn('h-4 w-4', badge.color)} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">{badge.title}</p>
            <p className="mt-0.5 text-xs text-charcoal/60">{badge.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TrustBadgesCompact({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} dir="rtl">
      {BADGES.slice(0, 3).map((badge) => (
        <div
          key={badge.title}
          className="flex items-center gap-1.5 rounded-lg bg-mist px-2.5 py-1.5"
        >
          <badge.icon className={cn('h-3.5 w-3.5', badge.color)} />
          <span className="text-xs font-medium text-charcoal/80">{badge.title}</span>
        </div>
      ))}
    </div>
  )
}
