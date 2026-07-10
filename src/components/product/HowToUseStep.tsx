import Image from 'next/image'
import { cn } from '@/lib/utils'

type HowToUseStepProps = {
  step: number
  title: string
  desc: string
  image: string
  video?: string
  variant?: 'default' | 'nama'
}

export default function HowToUseStep({
  step,
  title,
  desc,
  image,
  video,
  variant = 'default',
}: HowToUseStepProps) {
  const isNama = variant === 'nama'

  return (
    <article
      className={cn(
        'group overflow-hidden text-center transition-all duration-300',
        isNama
          ? 'rounded-3xl border border-warm-border bg-white shadow-sm hover:-translate-y-1 hover:shadow-md'
          : 'rounded-[2rem] border border-sage/20 bg-white shadow-card hover:border-teal/30 hover:shadow-card-hover',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-mist',
          isNama ? 'aspect-square' : 'aspect-[4/3] ring-1 ring-inset ring-sage/20',
        )}
      >
        {video ? (
          <video
            src={`${video}#t=0.001`}
            controls
            playsInline
            muted
            loop
            preload="metadata"
            className="h-full w-full bg-mist object-cover"
            aria-label={title}
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="object-cover"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />

        <div
          className={cn(
            'absolute right-3 top-3 flex items-center justify-center font-extrabold text-white shadow-lg',
            isNama
              ? 'h-11 w-11 rounded-2xl bg-teal text-gold ring-2 ring-gold/30 ring-offset-2'
              : 'h-9 w-9 rounded-full bg-gold text-sm',
          )}
        >
          {step}
        </div>
      </div>

      <div className="p-5 text-right sm:p-6">
        <h3 className="mb-2 text-lg font-extrabold text-charcoal transition-colors group-hover:text-teal sm:text-xl">
          {title}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-charcoal/70 sm:text-base">{desc}</p>
      </div>
    </article>
  )
}
