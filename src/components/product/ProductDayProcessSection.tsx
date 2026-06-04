import Image from 'next/image'
import { CheckCircle2, Clock } from 'lucide-react'
import type { DayProcessContent } from '@/lib/productPageSections'

interface ProductDayProcessSectionProps {
  content: DayProcessContent
}

export default function ProductDayProcessSection({ content }: ProductDayProcessSectionProps) {
  return (
    <section className="perf-section relative overflow-hidden bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal py-16 md:py-24">
      <div
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal/20 opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gold/10 opacity-30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-gold">
            <Clock className="h-4 w-4" />
            رحلة الـ 28 يوم
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            كيف يتغير تنفسك خلال 28 يوم؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/75 md:text-lg">
            روتين يومي بسيط — كل أسبوع تحس بفرق أوضح لين ترجع تتنفس براحة كاملة.
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:gap-16">
          {/* Timeline — left visually in RTL */}
          <div className="order-2 w-full space-y-8 lg:order-1 lg:w-1/2">
            {content.phases.map((phase) => (
              <div key={phase.period} className="text-right">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-md">
                  <Clock className="h-4 w-4 shrink-0 text-teal" />
                  <span className="text-sm font-extrabold text-teal-dark md:text-base">
                    {phase.period} : {phase.title}
                  </span>
                </div>

                <ul className="mb-4 space-y-3">
                  {phase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start justify-end gap-3">
                      <span className="text-base font-medium leading-relaxed text-white/90 md:text-lg">
                        {benefit}
                      </span>
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={2.5} />
                    </li>
                  ))}
                </ul>

                <div className="rounded-2xl border border-teal-light/40 bg-white/5 px-5 py-4 text-sm font-bold leading-relaxed text-white/85 md:text-base">
                  {phase.stat}
                </div>
              </div>
            ))}
          </div>

          {/* Image card — right visually in RTL */}
          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:max-w-none lg:aspect-[4/5]">
              <Image
                src={content.image}
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-6 text-right md:p-8">
                <p className="mb-3 text-xl font-extrabold leading-snug text-white md:text-2xl">
                  {content.overlayTitle}
                </p>
                <p className="text-sm font-medium leading-relaxed text-white/85 md:text-base">
                  {content.overlayDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
