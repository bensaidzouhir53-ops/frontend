import Image from 'next/image'
import { TrendingUp } from 'lucide-react'
import type { StatsSectionContent } from '@/lib/productPageSections'
import { cn } from '@/lib/utils'

interface ProductStatsSectionProps {
  content: StatsSectionContent
  dark?: boolean
}

export default function ProductStatsSection({ content, dark = false }: ProductStatsSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden py-16 md:py-24',
        dark
          ? 'bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal'
          : 'bg-gradient-to-br from-mist via-[#E4F3EE] to-teal-light/20',
      )}
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Stats — right visually in RTL */}
          <div className="order-2 w-full text-right lg:order-1 lg:w-1/2">
            <div
              className={cn(
                'mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-wide shadow-sm backdrop-blur-sm',
                dark
                  ? 'border-white/20 bg-white/10 text-gold'
                  : 'border-teal/20 bg-white/70 text-teal-dark',
              )}
            >
              <TrendingUp className="h-4 w-4 text-gold" />
              {content.badge}
            </div>

            <h2
              className={cn(
                'text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-[2.5rem]',
                dark ? 'text-white' : 'text-teal-dark',
              )}
            >
              {content.title}
            </h2>
            {content.subtitle && (
              <p
                className={cn(
                  'mt-3 text-base font-medium leading-relaxed md:text-lg',
                  dark ? 'text-white/75' : 'text-charcoal/65',
                )}
              >
                {content.subtitle}
              </p>
            )}

            <div className="mt-10 space-y-8 md:mt-12 md:space-y-10">
              {content.stats.map((stat) => (
                <div
                  key={stat.value}
                  className={cn(
                    'group border-b pb-8 last:border-0 last:pb-0',
                    dark ? 'border-white/10' : 'border-teal/10',
                  )}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <span
                      className={cn(
                        'text-5xl font-extrabold leading-none md:text-6xl lg:text-7xl',
                        dark ? 'text-gold' : 'text-teal-dark',
                      )}
                    >
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                      )}
                    </span>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-teal/30 bg-white shadow-sm transition-colors group-hover:border-teal group-hover:bg-teal/5">
                      <TrendingUp className="h-4 w-4 text-teal" strokeWidth={2.5} />
                    </div>
                  </div>
                  <p
                    className={cn(
                      'mt-3 max-w-lg text-base font-semibold leading-relaxed md:text-lg',
                      dark ? 'text-white/85' : 'text-charcoal/75',
                    )}
                  >
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {content.footnote && (
              <p
                className={cn(
                  'mt-8 text-xs font-medium leading-relaxed md:text-sm',
                  dark ? 'text-white/50' : 'text-charcoal/45',
                )}
              >
                {content.footnote}
              </p>
            )}
          </div>

          {/* Lifestyle image — left visually in RTL */}
          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <div
              className={cn(
                'relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border bg-white shadow-2xl lg:max-w-none',
                dark ? 'border-white/10' : 'border-teal/15 shadow-teal-dark/10',
              )}
            >
              {content.video ? (
                <video
                  src={`${content.video}#t=0.001`}
                  autoPlay
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  poster={content.image}
                  className="h-full w-full object-cover object-top"
                  aria-label={content.imageAlt}
                />
              ) : (
                <Image
                  src={content.image}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  loading="lazy"
                  className="object-cover object-top"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/25 via-transparent to-transparent" />
              {content.imageCaption && (
                <div className="absolute bottom-0 right-0 left-0 border-t border-gold/25 bg-teal-dark/80 p-5 text-right backdrop-blur-sm">
                  <p className="text-sm font-extrabold text-white md:text-base">
                    {content.imageCaption}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
