import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ThumbsUp, Users } from 'lucide-react'
import type { FacebookSocialProofSectionContent } from '@/lib/productPageSections'

interface ProductFacebookSocialProofSectionProps {
  content: FacebookSocialProofSectionContent
  ctaHref?: string
  dark?: boolean
}

function SocialProofCard({
  item,
  featured = false,
  dark = false,
}: {
  item: FacebookSocialProofSectionContent['items'][number]
  featured?: boolean
  dark?: boolean
}) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white md:rounded-[1.5rem] md:transition md:hover:-translate-y-0.5 md:hover:shadow-lg ${
        dark ? 'border-gold/30 shadow-lg shadow-black/30' : 'border-sage/25 shadow-md shadow-charcoal/5'
      } ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-[#F0F2F5] ${
          featured ? 'h-[200px] md:h-[260px] lg:h-[300px]' : 'h-[200px] md:h-[220px]'
        }`}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={
            featured
              ? '(max-width: 768px) 78vw, (max-width: 1024px) 50vw, 66vw'
              : '(max-width: 768px) 78vw, (max-width: 1024px) 50vw, 33vw'
          }
          loading="lazy"
          className="object-contain object-top p-1"
        />
      </div>
      {item.caption && (
        <div className="border-t border-sage/15 bg-white px-3 py-2.5 text-right md:px-4 md:py-3">
          <div className="mb-1 flex items-center justify-end gap-1.5 text-[10px] font-bold text-[#1877F2] md:text-[11px]">
            <ThumbsUp className="h-3 w-3 md:h-3.5 md:w-3.5" />
            {item.platform ?? 'تعليق حقيقي'}
          </div>
          <p className="line-clamp-2 text-xs font-extrabold leading-relaxed text-charcoal md:line-clamp-none md:text-sm">
            {item.caption}
          </p>
        </div>
      )}
    </article>
  )
}

export default function ProductFacebookSocialProofSection({
  content,
  ctaHref = '#offer',
  dark = false,
}: ProductFacebookSocialProofSectionProps) {
  if (!content.items.length) return null

  return (
    <section
      className={`relative overflow-hidden py-8 md:py-16 ${
        dark
          ? 'bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal'
          : 'border-y border-sage/20 bg-gradient-to-b from-white via-mist/20 to-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-right md:mb-10">
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-extrabold md:mb-4 md:px-4 md:py-2 md:text-xs ${
              dark
                ? 'border-white/20 bg-white/10 text-gold'
                : 'border-[#1877F2]/20 bg-[#1877F2]/5 text-[#1877F2]'
            }`}
          >
            <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
            {content.badge}
          </div>
          <h2
            className={`text-xl font-extrabold leading-tight md:text-4xl ${
              dark ? 'text-white' : 'text-charcoal'
            }`}
          >
            {content.title}
          </h2>
          <p
            className={`mt-2 max-w-3xl text-sm font-medium leading-relaxed md:mt-3 md:text-lg ${
              dark ? 'text-white/75' : 'text-charcoal/65'
            }`}
          >
            {content.subtitle}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-2 md:mb-8 md:gap-4">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl border px-2 py-3 text-center shadow-sm md:rounded-2xl md:px-4 md:py-5 ${
                dark ? 'border-gold/25 bg-gradient-to-b from-gold/10 to-white/[0.03]' : 'border-sage/20 bg-white'
              }`}
            >
              <p className={`text-lg font-extrabold md:text-2xl ${dark ? 'text-gold' : 'text-teal'}`}>{stat.value}</p>
              <p
                className={`mt-0.5 text-[10px] font-bold leading-snug md:mt-1 md:text-xs ${
                  dark ? 'text-white/65' : 'text-charcoal/60'
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: compact horizontal scroll */}
        <div className="-mx-4 md:hidden">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {content.items.map((item) => (
              <div key={item.image} className="w-[78vw] max-w-[300px] shrink-0 snap-center">
                <SocialProofCard item={item} dark={dark} />
              </div>
            ))}
          </div>
          <p
            className={`mt-2 text-center text-[11px] font-bold ${
              dark ? 'text-white/55' : 'text-charcoal/45'
            }`}
          >
            اسحب يمين ويسار لشوف كل التعليقات ←
          </p>
        </div>

        {/* Desktop: grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {content.items.map((item, index) => (
            <SocialProofCard key={item.image} item={item} featured={index === 0} dark={dark} />
          ))}
        </div>

        <div
          className={`mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-center md:mt-8 md:flex-row md:rounded-[1.75rem] md:px-5 md:py-5 md:text-right ${
            dark ? 'border-white/15 bg-white/5' : 'border-teal/15 bg-teal/5'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-white md:h-11 md:w-11">
              <Users className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <p
              className={`text-xs font-extrabold md:text-base ${dark ? 'text-white' : 'text-charcoal'}`}
            >
              {content.footerText}
            </p>
          </div>
          <Link
            href={ctaHref}
            className={`inline-flex w-full shrink-0 items-center justify-center rounded-xl px-6 py-3 text-sm font-extrabold shadow-lg transition md:w-auto md:rounded-2xl md:px-7 md:py-3.5 ${
              dark
                ? 'bg-gold text-charcoal shadow-gold/25 hover:bg-gold-dark'
                : 'bg-teal text-white shadow-teal/25 hover:bg-teal-dark'
            }`}
          >
            {content.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
