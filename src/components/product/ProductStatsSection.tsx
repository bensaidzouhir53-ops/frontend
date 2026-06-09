import Image from 'next/image'
import { TrendingUp } from 'lucide-react'
import type { StatsSectionContent } from '@/lib/productPageSections'

interface ProductStatsSectionProps {
  content: StatsSectionContent
}

export default function ProductStatsSection({ content }: ProductStatsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mist via-[#E4F3EE] to-teal-light/20 py-16 md:py-24">
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/70 px-4 py-2 text-xs font-bold tracking-wide text-teal-dark shadow-sm backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 text-gold" />
              {content.badge}
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-teal-dark md:text-4xl lg:text-[2.5rem]">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="mt-3 text-base font-medium leading-relaxed text-charcoal/65 md:text-lg">
                {content.subtitle}
              </p>
            )}

            <div className="mt-10 space-y-8 md:mt-12 md:space-y-10">
              {content.stats.map((stat) => (
                <div
                  key={stat.value}
                  className="group border-b border-teal/10 pb-8 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-5xl font-extrabold leading-none text-teal-dark md:text-6xl lg:text-7xl">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                      )}
                    </span>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-teal/30 bg-white shadow-sm transition-colors group-hover:border-teal group-hover:bg-teal/5">
                      <TrendingUp className="h-4 w-4 text-teal" strokeWidth={2.5} />
                    </div>
                  </div>
                  <p className="mt-3 max-w-lg text-base font-semibold leading-relaxed text-charcoal/75 md:text-lg">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {content.footnote && (
              <p className="mt-8 text-xs font-medium leading-relaxed text-charcoal/45 md:text-sm">
                {content.footnote}
              </p>
            )}
          </div>

          {/* Lifestyle image — left visually in RTL */}
          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-teal/15 bg-white shadow-2xl shadow-teal-dark/10 lg:max-w-none">
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
