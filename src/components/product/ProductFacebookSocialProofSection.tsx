import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ThumbsUp, Users } from 'lucide-react'
import type { FacebookSocialProofSectionContent } from '@/lib/productPageSections'

interface ProductFacebookSocialProofSectionProps {
  content: FacebookSocialProofSectionContent
  ctaHref?: string
}

function SocialProofCard({
  item,
  featured = false,
}: {
  item: FacebookSocialProofSectionContent['items'][number]
  featured?: boolean
}) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-sage/25 bg-white shadow-md shadow-charcoal/5 md:rounded-[1.5rem] md:transition md:hover:-translate-y-0.5 md:hover:shadow-lg ${
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
}: ProductFacebookSocialProofSectionProps) {
  if (!content.items.length) return null

  return (
    <section className="relative overflow-hidden border-y border-sage/20 bg-gradient-to-b from-white via-mist/20 to-white py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-right md:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1877F2]/20 bg-[#1877F2]/5 px-3 py-1.5 text-[11px] font-extrabold text-[#1877F2] md:mb-4 md:px-4 md:py-2 md:text-xs">
            <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
            {content.badge}
          </div>
          <h2 className="text-xl font-extrabold leading-tight text-charcoal md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-charcoal/65 md:mt-3 md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-2 md:mb-8 md:gap-4">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-sage/20 bg-white px-2 py-3 text-center shadow-sm md:rounded-2xl md:px-4 md:py-5"
            >
              <p className="text-lg font-extrabold text-teal md:text-2xl">{stat.value}</p>
              <p className="mt-0.5 text-[10px] font-bold leading-snug text-charcoal/60 md:mt-1 md:text-xs">
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
                <SocialProofCard item={item} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] font-bold text-charcoal/45">
            اسحب يمين ويسار لشوف كل التعليقات ←
          </p>
        </div>

        {/* Desktop: grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {content.items.map((item, index) => (
            <SocialProofCard key={item.image} item={item} featured={index === 0} />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-teal/15 bg-teal/5 px-4 py-4 text-center md:mt-8 md:flex-row md:rounded-[1.75rem] md:px-5 md:py-5 md:text-right">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-white md:h-11 md:w-11">
              <Users className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <p className="text-xs font-extrabold text-charcoal md:text-base">{content.footerText}</p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-teal px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-teal/25 transition hover:bg-teal-dark md:w-auto md:rounded-2xl md:px-7 md:py-3.5"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
