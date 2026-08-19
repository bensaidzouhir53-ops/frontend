import { ShieldCheck, CircleCheckBig, XCircle } from 'lucide-react'
import type { ComparisonRow, ComparisonSectionContent } from '@/lib/productPageSections'

interface ProductComparisonSectionProps {
  rows: ComparisonRow[]
  content?: ComparisonSectionContent
  productTitle: string
  variant?: 'default' | 'after-ingredients'
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
}: ProductComparisonSectionProps) {
  const copy = { ...DEFAULT_CONTENT, ...content }
  const footerHighlight =
    copy.footerHighlight ?? rows[4]?.us ?? 'ضمان 30 يوم · مرخّص SFDA · طبيعي 100%'
  const isAfterIngredients = variant === 'after-ingredients'

  return (
    <section
      className={
        isAfterIngredients
          ? 'border-t border-warm-border bg-white py-14 md:py-20'
          : 'bg-white py-14 md:py-24'
      }
    >
      <div className="mx-auto max-w-container px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-5 py-2 text-sm font-bold text-teal shadow-sm">
          <ShieldCheck className="h-4 w-4" />
          {copy.badge}
        </div>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
          {copy.title}
        </h2>
        <p className="mx-auto mb-10 max-w-3xl text-lg font-medium leading-relaxed text-charcoal/70">
          {copy.subtitle}
        </p>

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

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-teal-dark to-charcoal p-6 text-right text-white shadow-xl sm:p-8">
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
