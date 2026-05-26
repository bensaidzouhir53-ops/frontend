import { z } from 'zod'

/**
 * Normalizes a Saudi mobile number to +9665XXXXXXXX format.
 *
 * Accepted formats:
 *   +9665[0-8]XXXXXXX  (13 chars) → return as-is after validation
 *   9665[0-8]XXXXXXX   (12 chars) → add + prefix
 *   05[0-8]XXXXXXX     (10 chars) → strip leading 0, prepend +966
 *   5[0-8]XXXXXXX      (9 chars)  → prepend +966
 *
 * Returns null if the number is invalid.
 */
export function normalizeSaudiPhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-\(\)]/g, '')

  // +9665[0-8]XXXXXXX → 13 chars total
  if (/^\+9665[0-8]\d{7}$/.test(cleaned)) {
    return cleaned
  }

  // 9665[0-8]XXXXXXX → 12 chars total
  if (/^9665[0-8]\d{7}$/.test(cleaned)) {
    return `+${cleaned}`
  }

  // 05[0-8]XXXXXXX → 10 chars total
  if (/^05[0-8]\d{7}$/.test(cleaned)) {
    return `+966${cleaned.slice(1)}`
  }

  // 5[0-8]XXXXXXX → 9 chars total
  if (/^5[0-8]\d{7}$/.test(cleaned)) {
    return `+966${cleaned}`
  }

  return null
}

const WHITELIST_PHONES = (
  process.env.NEXT_PUBLIC_ORDER_PHONE_WHITELIST ?? '055000000,0550000000'
)
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean)

export function isWhitelistedPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s\-\(\)]/g, '')
  return WHITELIST_PHONES.some(
    (entry) => cleaned === entry || cleaned.endsWith(entry) || entry.endsWith(cleaned),
  )
}

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, 'يرجى إدخال اسمك الكريم (حرفان على الأقل)')
    .max(60, 'الاسم طويل جداً'),
  phone: z.string().refine(
    (val) => isWhitelistedPhone(val) || normalizeSaudiPhone(val) !== null,
    'يرجى إدخال رقم جوال سعودي صحيح (مثال: 0512345678)',
  ),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
