'use client'

import Image from 'next/image'
import { useState } from 'react'

type HowToUseStepProps = {
  step: number
  title: string
  desc: string
  image: string
}

export default function HowToUseStep({ step, title, desc, image }: HowToUseStepProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const showPlaceholder = failed || !loaded

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-sage/20 bg-white text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist ring-1 ring-inset ring-sage/20">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-teal/15 via-mist to-gold/10 transition-opacity duration-500 ${showPlaceholder ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={!showPlaceholder}
        >
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_30%_20%,#0F766E_0%,transparent_50%),radial-gradient(circle_at_70%_80%,#D7A85C_0%,transparent_45%)]" />
        </div>

        {!failed && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
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
