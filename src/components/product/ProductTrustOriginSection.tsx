import Image from 'next/image'
import { Award, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import type { TrustOriginContent } from '@/lib/productPageSections'

interface ProductTrustOriginSectionProps {
  content: TrustOriginContent
}

const pointIcons = [MapPin, ShieldCheck, Award, Sparkles]

export default function ProductTrustOriginSection({ content }: ProductTrustOriginSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-teal/20 opacity-40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/15 opacity-50 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Image — left visually in RTL */}
          <div className="order-1 w-full lg:w-1/2">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border-2 border-gold/30 shadow-2xl shadow-black/30 lg:max-w-none">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-teal-dark/10" />
              <div className="absolute bottom-0 right-0 left-0 border-t border-gold/30 bg-charcoal/75 p-5 text-right backdrop-blur-sm md:p-6">
                <p className="text-xs font-bold tracking-widest text-gold uppercase">
                  {content.countryLabel}
                </p>
                <p className="mt-1 text-xl font-extrabold text-white md:text-2xl">
                  {content.countryValue}
                </p>
              </div>
            </div>
          </div>

          {/* Content — right visually in RTL */}
          <div className="order-2 w-full text-right lg:w-1/2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-sm font-bold text-gold">
              <ShieldCheck className="h-4 w-4" />
              {content.badge}
            </div>

            <h2 className="text-3xl font-extrabold leading-snug tracking-tight text-white md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-lg font-medium leading-relaxed text-white/80">
              {content.subtitle}
            </p>
            <p className="mt-6 text-base font-medium leading-relaxed text-white/70 md:text-lg">
              {content.body}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.points.map((point, idx) => {
                const Icon = pointIcons[idx] ?? ShieldCheck
                return (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-gold/30 hover:bg-white/10"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Icon className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-base font-extrabold text-white">{point.title}</h3>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/70">
                      {point.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
