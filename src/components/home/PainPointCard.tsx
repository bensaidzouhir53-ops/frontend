'use client'

import Image from 'next/image'
import { useState } from 'react'

type PainPointCardProps = {
  icon: string
  title: string
  desc: string
  image: string
  accent: 'teal' | 'gold' | 'sage'
}

const accentStyles = {
  teal: {
    glow: 'from-teal/30 via-mist to-teal-light/20',
    badge: 'bg-teal/90',
    ring: 'ring-teal/20',
  },
  gold: {
    glow: 'from-gold/25 via-mist to-apothecary/15',
    badge: 'bg-apothecary/90',
    ring: 'ring-gold/25',
  },
  sage: {
    glow: 'from-sage/40 via-mist to-teal/15',
    badge: 'bg-teal-dark/90',
    ring: 'ring-sage/30',
  },
}

export default function PainPointCard({ icon, title, desc, image, accent }: PainPointCardProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const styles = accentStyles[accent]
  const showPlaceholder = failed || !loaded

  return (
    <article className="group overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className={`relative aspect-[4/3] overflow-hidden ring-1 ring-inset ${styles.ring}`}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${styles.glow} flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${showPlaceholder ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={!showPlaceholder}
        >
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,#0F766E_0%,transparent_50%),radial-gradient(circle_at_70%_80%,#D7A85C_0%,transparent_45%)]" />
          <span className="relative text-5xl drop-shadow-sm">{icon}</span>
          <span className="relative rounded-full border border-sage/30 bg-white/70 px-3 py-1 text-[11px] font-bold tracking-wide text-apothecary/70">
            صورة قريباً
          </span>
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

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent" />

        <div className={`absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-lg backdrop-blur-sm ${styles.badge}`}>
          {icon}
        </div>
      </div>

      <div className="p-6 text-right">
        <h3 className="mb-2 text-lg font-bold text-charcoal">{title}</h3>
        <p className="text-sm leading-relaxed text-charcoal/70">{desc}</p>
      </div>
    </article>
  )
}
