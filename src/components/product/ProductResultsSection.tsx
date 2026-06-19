/* eslint-disable @next/next/no-img-element */
import { CheckCircle2, ImageIcon, TrendingUp } from 'lucide-react'
import type { ResultsSectionContent } from '@/lib/productPageSections'

interface ProductResultsSectionProps {
  content: ResultsSectionContent
}

function isGifPath(path: string): boolean {
  return path.trim().toLowerCase().endsWith('.gif')
}

export default function ProductResultsSection({ content }: ProductResultsSectionProps) {
  const gifSrc = content.gif?.trim() ?? ''
  const videoSrc = content.gifVideo?.trim() ?? ''
  const hasGif = Boolean(gifSrc)
  const hasVideo = Boolean(videoSrc)
  const hasMedia = hasGif || hasVideo

  return (
    <section className="perf-section relative overflow-hidden bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal py-16 md:py-24">
      <div
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-gold/15 opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-teal/15 opacity-30"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-gold">
            <TrendingUp className="h-4 w-4" />
            {content.badge}
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/75 md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:gap-16">
          {/* GIF — left visually in RTL; native img keeps animation */}
          <div className="order-1 w-full lg:w-1/2">
            <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:max-w-none lg:aspect-[4/5]">
              {hasMedia ? (
                <>
                  {hasGif && isGifPath(gifSrc) ? (
                    <img
                      key={gifSrc}
                      src={gifSrc}
                      alt={content.gifAlt}
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  ) : hasVideo ? (
                    <video
                      key={videoSrc}
                      src={`${videoSrc}#t=0.001`}
                      autoPlay
                      playsInline
                      muted
                      loop
                      preload="auto"
                      className="h-full w-full object-cover"
                      aria-label={content.gifAlt}
                    />
                  ) : (
                    <img
                      src={gifSrc}
                      alt={content.gifAlt}
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-6 text-right md:p-8">
                    <p className="mb-3 text-xl font-extrabold leading-snug text-white md:text-2xl">
                      {content.overlayTitle}
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-white/85 md:text-base">
                      {content.overlayDesc}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 bg-charcoal/60 px-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-white/25 bg-white/5">
                    <ImageIcon className="h-10 w-10 text-white/40" />
                  </div>
                  <p className="text-sm font-bold text-white/45">GIF قريباً</p>
                  <div className="max-w-xs text-right">
                    <p className="mb-2 text-lg font-extrabold leading-snug text-white/90">
                      {content.overlayTitle}
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-white/70">
                      {content.overlayDesc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results list — right visually in RTL */}
          <div className="order-2 w-full space-y-8 lg:w-1/2">
            {content.phases.map((phase, index) => (
              <div key={`${phase.title}-${index}`} className="text-right">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-md">
                  <TrendingUp className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm font-extrabold text-teal-dark md:text-base">
                    {phase.period ? `${phase.period} : ${phase.title}` : phase.title}
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

                <div className="rounded-2xl border border-gold/30 bg-white/5 px-5 py-4 text-sm font-bold leading-relaxed text-white/85 md:text-base">
                  {phase.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
