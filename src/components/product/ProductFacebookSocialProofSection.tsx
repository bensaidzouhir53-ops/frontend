import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ThumbsUp, Users } from 'lucide-react'
import type { FacebookSocialProofSectionContent } from '@/lib/productPageSections'

interface ProductFacebookSocialProofSectionProps {
  content: FacebookSocialProofSectionContent
  ctaHref?: string
}

export default function ProductFacebookSocialProofSection({
  content,
  ctaHref = '#offer',
}: ProductFacebookSocialProofSectionProps) {
  if (!content.items.length) return null

  return (
    <section className="relative overflow-hidden border-y border-sage/20 bg-gradient-to-b from-white via-mist/20 to-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-right md:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1877F2]/20 bg-[#1877F2]/5 px-4 py-2 text-xs font-extrabold text-[#1877F2]">
            <MessageCircle className="h-4 w-4" />
            {content.badge}
          </div>
          <h2 className="text-2xl font-extrabold leading-tight text-charcoal md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base font-medium leading-relaxed text-charcoal/65 md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3 md:gap-4">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-sage/20 bg-white px-3 py-4 text-center shadow-sm md:px-4 md:py-5"
            >
              <p className="text-xl font-extrabold text-teal md:text-2xl">{stat.value}</p>
              <p className="mt-1 text-[11px] font-bold text-charcoal/60 md:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {content.items.map((item, index) => (
            <article
              key={item.image}
              className={`overflow-hidden rounded-[1.5rem] border border-sage/25 bg-white shadow-md shadow-charcoal/5 transition hover:-translate-y-0.5 hover:shadow-lg ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div
                className={`relative w-full overflow-hidden bg-[#F0F2F5] ${
                  index === 0 ? 'aspect-[16/11] lg:aspect-auto lg:min-h-[420px]' : 'aspect-[4/5]'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={
                    index === 0
                      ? '(max-width: 1024px) 100vw, 66vw'
                      : '(max-width: 1024px) 100vw, 33vw'
                  }
                  loading="lazy"
                  className="object-contain object-top p-1"
                />
              </div>
              {item.caption && (
                <div className="border-t border-sage/15 bg-white px-4 py-3 text-right">
                  <div className="mb-1 flex items-center justify-end gap-1.5 text-[11px] font-bold text-[#1877F2]">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {item.platform ?? 'تعليق حقيقي'}
                  </div>
                  <p className="text-sm font-extrabold leading-relaxed text-charcoal">
                    {item.caption}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] border border-teal/15 bg-teal/5 px-5 py-5 text-center md:flex-row md:text-right">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal text-white">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-sm font-extrabold text-charcoal md:text-base">
              {content.footerText}
            </p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-teal px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-teal/25 transition hover:bg-teal-dark"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
