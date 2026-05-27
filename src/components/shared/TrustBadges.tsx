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

export default function TrustBadges({ variant = 'row', className }: TrustBadgesProps) {
  if (variant === 'row') {
    return (
      <div className={cn('w-full overflow-hidden bg-white py-6 border-y border-sage/20 relative', className)} dir="rtl">
        {/* Fading edges for premium look */}
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        
        {/* Marquee Container */}
        <div className="flex w-max animate-marquee-rtl items-center">
          {/* We duplicate the items 2 times to ensure a seamless infinite loop with 50% translation */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 px-6 items-center">
              {BADGES.map((badge, j) => (
                <div key={`${i}-${j}`} className="flex items-center gap-3 whitespace-nowrap group">
                  <div className={cn('flex shrink-0 items-center justify-center rounded-full h-12 w-12 transition-transform group-hover:scale-110', badge.bg)}>
                    <badge.icon className={cn('h-6 w-6', badge.color)} />
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-charcoal text-base">
                      {badge.title}
                    </p>
                    <p className="text-sm font-medium text-charcoal/60">
                      {badge.desc}
                    </p>
                  </div>
                  {/* Separator dot */}
                  {j < BADGES.length - 1 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-sage/40 ml-6 mr-3" />
                  )}
                </div>
              ))}
              {/* Extra Separator dot at the end of each duplicate set */}
              <div className="w-1.5 h-1.5 rounded-full bg-sage/40 ml-6 mr-3" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5',
        className,
      )}
      dir="rtl"
    >
      {BADGES.map((badge) => (
        <div
          key={badge.title}
          className={cn(
            'flex items-center gap-2 rounded-xl px-3 py-2',
            badge.bg,
            'flex-col items-start p-4',
          )}
        >
          <div className="flex shrink-0 items-center justify-center rounded-lg h-10 w-10 bg-white shadow-sm">
            <badge.icon className={cn('h-4 w-4', badge.color)} />
          </div>
          <div>
            <p className="font-semibold leading-tight text-sm">
              {badge.title}
            </p>
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
