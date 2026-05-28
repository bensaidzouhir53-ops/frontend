'use client'

import PainPointCard from '@/components/home/PainPointCard'

export type PainPoint = {
  title: string
  desc: string
  image: string
  accent: 'teal' | 'gold' | 'sage' | 'apothecary' | 'mint'
}

type PainPointsMarqueeProps = {
  items: PainPoint[]
}

export default function PainPointsMarquee({ items }: PainPointsMarqueeProps) {
  const track = [...items, ...items]

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />

      <div className="flex w-max animate-marquee-ltr gap-5 px-4 sm:gap-6 sm:px-6 hover:[animation-play-state:paused]">
        {track.map((pain, i) => (
          <PainPointCard key={`${pain.title}-${i}`} {...pain} />
        ))}
      </div>
    </div>
  )
}
