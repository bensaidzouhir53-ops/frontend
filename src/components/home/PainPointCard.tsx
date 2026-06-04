import Image from 'next/image'

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
  const styles = accentStyles[accent]

  return (
    <article className="group overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className={`relative aspect-[4/3] overflow-hidden ring-1 ring-inset ${styles.ring}`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          className="object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent" />

        <div
          className={`absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-lg ${styles.badge}`}
        >
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
