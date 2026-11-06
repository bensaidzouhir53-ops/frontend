import { ShieldCheck, CircleCheckBig, XCircle, Crown, Check, X } from 'lucide-react'
import type { ComparisonRow, ComparisonSectionContent } from '@/lib/productPageSections'

function DarkComparison({
  rows,
  usLabel,
  themLabel,
}: {
  rows: ComparisonRow[]
  usLabel: string
  themLabel: string
}) {
  return (
    <>
      {/* Desktop table */}
      <div className="relative mb-10 hidden md:block">
        <div
          className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[2.5rem] bg-gold/5 blur-2xl"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-black/15 shadow-2xl shadow-black/40 backdrop-blur-sm">
          <table className="w-full border-collapse text-right">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-[22%] px-6 py-5 text-sm font-extrabold text-white/60">المعيار</th>
                <th className="w-[36%] px-6 py-5 text-sm font-extrabold text-red-300/90">
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-400/30">
                      <X className="h-4 w-4 text-red-300" strokeWidth={3} />
                    </span>
                    {themLabel}
                  </span>
                </th>
                <th className="w-[42%] bg-gradient-to-b from-gold/30 to-gold/10 px-6 py-5">
                  <span className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-base font-extrabold text-gold">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-charcoal shadow-lg shadow-gold/30">
                        <Crown className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      {usLabel}
                    </span>
                    <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-extrabold text-charcoal">
                      الخيار الأذكى
                    </span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/[0.07] last:border-b-0">
                  <td className="px-6 py-5 align-top text-sm font-extrabold text-white">
                    {row.feature}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-white/50">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400/80" />
                      <span>{row.them}</span>
                    </div>
                  </td>
                  <td className="bg-gold/[0.07] px-6 py-5 align-top">
                    <div className="flex items-start gap-2.5 text-sm font-bold leading-relaxed text-white">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
                        <Check className="h-3 w-3 text-charcoal" strokeWidth={3.5} />
                      </span>
                      <span>{row.us}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        {rows.map((row, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-gold/25 bg-black/15 text-right shadow-lg shadow-black/30"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-[11px] font-extrabold text-gold ring-1 ring-gold/40">
                {i + 1}
              </span>
              <p className="text-sm font-extrabold text-white">{row.feature}</p>
            </div>
            <div className="space-y-2.5 p-4">
              <div className="rounded-xl border border-red-400/20 bg-red-500/[0.07] p-3">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold text-red-300">
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                  {themLabel}
                </p>
                <p className="text-sm font-medium leading-relaxed text-white/55">{row.them}</p>
              </div>
              <div className="rounded-xl border border-gold/40 bg-gradient-to-l from-gold/20 to-gold/5 p-3">
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold text-gold">
                  <Crown className="h-3.5 w-3.5" strokeWidth={2.5} />
                  {usLabel}
                </p>
                <p className="text-sm font-bold leading-relaxed text-white">{row.us}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

interface ProductComparisonSectionProps {
  rows: ComparisonRow[]
  content?: ComparisonSectionContent
  productTitle: string
  variant?: 'default' | 'after-ingredients'
  dark?: boolean
}

const DEFAULT_CONTENT: ComparisonSectionContent = {
  badge: 'ليش نَفَس خيارك الصح؟',
  title: 'مقارنة سريعة توضح لك الفرق',
  subtitle: 'شوف الفرق بين تركيبتنا والمنتجات الثانية — واختر اللي يحل المشكلة من جذورها.',
  usLabel: 'نَفَس',
  themLabel: 'المنافسين',
}

export default function ProductComparisonSection({
  rows,
  content,
  productTitle,
  variant = 'default',
  dark = false,
}: ProductComparisonSectionProps) {
  const copy = { ...DEFAULT_CONTENT, ...content }
  const footerHighlight =
    copy.footerHighlight ?? rows[4]?.us ?? 'ضمان 30 يوم · مرخّص SFDA · طبيعي 100%'
  const isAfterIngredients = variant === 'after-ingredients'

  return (
    <section
      className={
        dark
          ? 'bg-gradient-to-br from-teal-dark via-apothecary-dark to-charcoal py-14 md:py-20'
          : isAfterIngredients
            ? 'border-t border-warm-border bg-white py-14 md:py-20'
            : 'bg-white py-14 md:py-24'
      }
    >
      <div className="mx-auto max-w-container px-4 text-center sm:px-6 lg:px-8">
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold shadow-sm ${
            dark ? 'border-white/20 bg-white/10 text-gold' : 'border-teal/20 bg-teal/10 text-teal'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          {copy.badge}
        </div>
        <h2
          className={`mb-4 text-3xl font-extrabold tracking-tight md:text-4xl ${
            dark ? 'text-white' : 'text-charcoal'
          }`}
        >
          {copy.title}
        </h2>
        <p
          className={`mx-auto mb-10 max-w-3xl text-lg font-medium leading-relaxed ${
            dark ? 'text-white/75' : 'text-charcoal/70'
          }`}
        >
          {copy.subtitle}
        </p>

        {dark ? (
          <DarkComparison rows={rows} usLabel={copy.usLabel} themLabel={copy.themLabel} />
        ) : (
        <>
        {/* Desktop table */}
        <div className="mb-8 hidden overflow-hidden rounded-3xl border border-warm-border bg-white shadow-lg md:block">
          <table className="w-full border-collapse text-right">
            <thead>
              <tr className="border-b border-warm-border bg-surface-rose">
                <th className="px-6 py-4 text-sm font-extrabold text-charcoal">المعيار</th>
                <th className="px-6 py-4 text-sm font-extrabold text-red-500/80">
                  {copy.themLabel}
                </th>
                <th className="bg-teal/10 px-6 py-4 text-sm font-extrabold text-teal-dark">
                  {copy.usLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-warm-border/70 last:border-b-0 even:bg-surface-rose/40"
                >
                  <td className="px-6 py-5 align-top text-sm font-extrabold text-charcoal">
                    {row.feature}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex items-start gap-2 text-sm font-medium text-charcoal/55">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <span>{row.them}</span>
                    </div>
                  </td>
                  <td className="bg-teal/5 px-6 py-5 align-top">
                    <div className="flex items-start gap-2 text-sm font-bold text-teal-dark">
                      <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span>{row.us}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {rows.map((row, i) => (
            <div
              key={i}
              className="rounded-2xl border border-warm-border bg-white p-5 text-right shadow-sm"
            >
              <p className="mb-3 text-sm font-extrabold text-charcoal">{row.feature}</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-sm font-medium text-charcoal/55">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>
                    <span className="mb-0.5 block text-xs font-bold text-red-400/80">
                      {copy.themLabel}
                    </span>
                    {row.them}
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm font-bold text-teal-dark">
                  <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>
                    <span className="mb-0.5 block text-xs font-bold text-teal">{copy.usLabel}</span>
                    {row.us}
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        </>
        )}

        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-l from-teal-dark to-charcoal p-6 text-right text-white shadow-xl sm:p-8 ${
            dark ? 'border border-gold/30' : ''
          }`}
        >
          <div
            className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full border-4 border-gold/30"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-10 -right-6 h-40 w-40 rounded-full border-4 border-gold/20"
            aria-hidden="true"
          />
          <p className="relative mb-2 text-xl font-extrabold text-gold sm:text-2xl">{productTitle}</p>
          <p className="relative text-sm font-medium text-white/80 sm:text-base">{footerHighlight}</p>
        </div>
      </div>
    </section>
  )
}
