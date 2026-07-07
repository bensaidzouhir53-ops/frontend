/* eslint-disable @next/next/no-img-element */
import { BellRing, Flame, ImageIcon } from 'lucide-react'
import type { AgitationSectionContent } from '@/lib/productPageSections'

interface ProductAgitationSectionProps {
  content: AgitationSectionContent
}

function isGifPath(path: string): boolean {
  return path.trim().toLowerCase().endsWith('.gif')
}

export default function ProductAgitationSection({ content }: ProductAgitationSectionProps) {
  const gifSrc = content.gif?.trim() ?? ''
  const videoSrc = content.gifVideo?.trim() ?? ''
  const hasGif = Boolean(gifSrc)
  const hasVideo = Boolean(videoSrc)
  const hasMedia = hasGif || hasVideo

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(215,168,92,0.15),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(215,168,92,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Animated media — GIF via native img; MP4 loop as fallback only if no GIF */}
          <div className="relative order-1 w-full lg:w-1/2">
            <div className="absolute inset-0 rounded-full bg-gold/10 opacity-60 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-gold/30 bg-charcoal/80 shadow-2xl shadow-black/40">
              {hasMedia ? (
                <>
                  {hasGif && isGifPath(gifSrc) ? (
                    <img
                      key={gifSrc}
                      src={gifSrc}
                      alt={content.gifAlt}
                      className="h-full w-full object-cover contrast-125"
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
                      poster={hasGif ? gifSrc : undefined}
                      className="h-full w-full object-cover contrast-125"
                      aria-label={content.gifAlt}
                    />
                  ) : (
                    <img
                      src={gifSrc}
                      alt={content.gifAlt}
                      className="h-full w-full object-cover contrast-125"
                      loading="eager"
                      decoding="async"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                  {content.overlay && (
                    <div className="absolute bottom-6 right-6 left-6 text-right">
                      <p className="text-xl font-extrabold text-white drop-shadow-md">
                        {content.overlay}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 px-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-gold/40 bg-gold/10">
                    <ImageIcon className="h-10 w-10 text-gold/80" />
                  </div>
                  <p className="text-sm font-bold text-white/50">GIF قريباً</p>
                  {content.overlay && (
                    <p className="max-w-xs text-base font-extrabold leading-relaxed text-ivory">
                      {content.overlay}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Copy — right visually in RTL */}
          <div className="order-2 w-full text-right lg:w-1/2">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/20 px-5 py-2.5 text-sm font-extrabold text-gold shadow-[0_4px_24px_rgba(215,168,92,0.25)]">
              <BellRing className="h-5 w-5 shrink-0" />
              {content.alert}
            </div>

            <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              {content.title}
            </h2>

            <p className="mb-8 text-lg font-medium leading-relaxed text-white/75">
              {content.body}
            </p>

            <div className="space-y-4">
              {content.points.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-end gap-4 rounded-2xl border border-gold/20 bg-white/5 p-4 transition-colors hover:border-gold/50 hover:bg-gold/10"
                >
                  <span className="text-[16px] font-bold leading-relaxed text-white/85 transition-colors group-hover:text-white">
                    {item.text}
                  </span>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-gold/20 transition-colors group-hover:border-gold/60">
                    <Flame className="h-5 w-5 text-gold" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
