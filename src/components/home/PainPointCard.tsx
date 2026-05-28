'use client'

import Image from 'next/image'
import { useState } from 'react'

type PainPointCardProps = {
  title: string
  desc: string
  image: string
  accent: 'teal' | 'gold' | 'sage' | 'apothecary' | 'mint'
}

const accentStyles = {
  teal: {
    glow: 'from-teal/25 via-mist to-teal-light/15',
    ring: 'ring-teal/20',
  },
  gold: {
    glow: 'from-gold/20 via-mist to-apothecary/10',
    ring: 'ring-gold/25',
  },
  sage: {
    glow: 'from-sage/35 via-mist to-teal/10',
    ring: 'ring-sage/30',
  },
  apothecary: {
    glow: 'from-apothecary/20 via-mist to-teal/15',
    ring: 'ring-apothecary/20',
  },
  mint: {
    glow: 'from-mint-clean via-mist to-sage/25',
    ring: 'ring-teal/15',
  },
}

export default function PainPointCard({ title, desc, image, accent }: PainPointCardProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const styles = accentStyles[accent]
  const showPlaceholder = failed || !loaded

  return (
    <article className="group w-[300px] shrink-0 overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:w-[340px]">
      <div className={`relative aspect-[4/3] overflow-hidden ring-1 ring-inset ${styles.ring}`}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${styles.glow} transition-opacity duration-500 ${showPlaceholder ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={!showPlaceholder}
        >
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_30%_20%,#0F766E_0%,transparent_50%),radial-gradient(circle_at_70%_80%,#D7A85C_0%,transparent_45%)]" />
        </div>

        {!failed && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="340px"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
      </div>

      <div className="p-5 text-right">
        <h3 className="mb-2 text-base font-bold text-charcoal sm:text-lg">{title}</h3>
        <p className="text-sm leading-relaxed text-charcoal/70">{desc}</p>
      </div>
    </article>
  )
}
