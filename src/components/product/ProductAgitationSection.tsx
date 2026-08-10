/* eslint-disable @next/next/no-img-element */
import { BellRing, Flame, ImageIcon } from 'lucide-react'
import type { AgitationSectionContent } from '@/lib/productPageSections'

interface ProductAgitationSectionProps {
  content: AgitationSectionContent
}

function isGifPath(path: string): boolean {
  return path.trim().toLowerCase().endsWith('.gif')
}

function AnimatedGif({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )
}

export default function ProductAgitationSection({ content }: ProductAgitationSectionProps) {
  const gifSrc = content.gif?.trim() ?? ''
  const videoSrc = content.gifVideo?.trim() ?? ''
  const hasGif = Boolean(gifSrc)
  const hasVideo = Boolean(videoSrc)
  const hasMedia = hasGif || hasVideo
  const isLight = content.theme === 'light'
  const isClinical = content.theme === 'clinical'
  const isPlain = isLight || isClinical

  const sectionClass = isPlain
    ? 'bg-ivory'
    : 'bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95'

  return (
    <section className={`relative overflow-hidden py-16 md:py-24 ${sectionClass}`}>
      {!isPlain && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at top right, rgba(215,168,92,0.15), transparent 55%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at bottom left, rgba(215,168,92,0.08), transparent 50%)',
            }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Animated media — native img for .gif (Next/Image breaks animation) */}
          <div className="relative order-1 w-full lg:w-1/2">
            {!isPlain && (
              <div className="absolute inset-0 rounded-full bg-gold/10 opacity-60 blur-3xl" />
            )}
            <div
              className={`relative aspect-[4/5] overflow-hidden ${
                isPlain
                  ? 'rounded-3xl shadow-lg'
                  : 'rounded-[2.5rem] border border-gold/30 bg-charcoal/80 shadow-2xl shadow-black/40'
              }`}
            >
              {hasMedia ? (
                <>
                  {hasVideo ? (
                    <video
                      key={videoSrc}
                      src={`${videoSrc}#t=0.001`}
                      autoPlay
                      playsInline
                      muted
                      loop
                      preload="auto"
                      poster={hasGif ? gifSrc : undefined}
                      className="h-full w-full object-cover"
                      aria-label={content.gifAlt}
                    />
                  ) : hasGif && isGifPath(gifSrc) ? (
                    <AnimatedGif
                      src={gifSrc}
                      alt={content.gifAlt}
                      className="h-full w-full object-cover contrast-125"
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
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent ${
                      isPlain
                        ? 'from-black/50 via-transparent'
                        : 'from-charcoal via-charcoal/20'
                    }`}
                  />
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
                  <p className={`text-sm font-bold ${isLight ? 'text-charcoal/40' : 'text-white/50'}`}>GIF قريباً</p>
                  {content.overlay && (
                    <p className={`max-w-xs text-base font-extrabold leading-relaxed ${isLight ? 'text-charcoal' : 'text-ivory'}`}>
                      {content.overlay}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Copy — right visually in RTL */}
          <div className="order-2 w-full text-right lg:w-1/2">
            {content.alert?.trim() ? (
              <div
                className={`mb-5 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-extrabold ${
                  isPlain
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-gold/40 bg-gold/20 text-gold shadow-[0_4px_24px_rgba(215,168,92,0.25)]'
                }`}
              >
                <BellRing className="h-5 w-5 shrink-0" />
                {content.alert}
              </div>
            ) : null}

            <h2
              className={`mb-6 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl ${
                isPlain ? 'text-charcoal' : 'text-white'
              }`}
            >
              {content.title}
            </h2>

            <p
              className={`mb-8 text-lg font-medium leading-relaxed ${
                isPlain ? 'text-charcoal/85' : 'text-white/75'
              }`}
            >
              {content.body}
            </p>

            <div className="space-y-4">
              {content.points.map((item, i) => (
                <div
                  key={i}
                  className={`group flex items-center justify-end gap-4 rounded-2xl border p-4 transition-colors ${
                    isPlain
                      ? 'border-charcoal/10 bg-white hover:border-red-200 hover:bg-red-50/40'
                      : 'border-gold/20 bg-white/5 hover:border-gold/50 hover:bg-gold/10'
                  }`}
                >
                  <span
                    className={`text-[16px] font-bold leading-relaxed transition-colors ${
                      isPlain
                        ? 'text-charcoal/90 group-hover:text-charcoal'
                        : 'text-white/85 group-hover:text-white'
                    }`}
                  >
                    {item.text}
                  </span>
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                      isPlain
                        ? 'border-red-200 bg-red-50 group-hover:border-red-300'
                        : 'border-gold/40 bg-gold/20 group-hover:border-gold/60'
                    }`}
                  >
                    <Flame className={`h-5 w-5 ${isPlain ? 'text-red-500' : 'text-gold'}`} />
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
