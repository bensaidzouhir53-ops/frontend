import Image from 'next/image'

type HowToUseStepProps = {
  step: number
  title: string
  desc: string
  image: string
  video?: string
}

export default function HowToUseStep({ step, title, desc, image, video }: HowToUseStepProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-sage/20 bg-white text-center shadow-card transition-shadow duration-300 hover:border-teal/30 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist ring-1 ring-inset ring-sage/20">
        {video ? (
          <video
            src={`${video}#t=0.001`}
            controls
            playsInline
            muted
            loop
            preload="metadata"
            className="h-full w-full object-cover bg-mist"
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

        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-extrabold text-white shadow-lg">
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
