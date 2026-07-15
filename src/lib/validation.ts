import { z } from 'zod'

const SAUDI_PHONE_05_RE = /^05\d{8}$/
const SAUDI_PHONE_PLUS966_RE = /^\+9665\d{8}$/
const SAUDI_PHONE_966_RE = /^9665\d{8}$/

function cleanPhoneInput(raw: string): string {
  return raw.replace(/[\s\-\(\)]/g, '')
}

/**
 * Validates Saudi mobile input: exactly 10 digits starting with 05,
 * or international +966 / 966 format.
 */
export function isValidSaudiPhoneInput(raw: string): boolean {
  const cleaned = cleanPhoneInput(raw)
  return (
    SAUDI_PHONE_05_RE.test(cleaned) ||
    SAUDI_PHONE_PLUS966_RE.test(cleaned) ||
    SAUDI_PHONE_966_RE.test(cleaned)
  )
}

/**
 * Normalizes a Saudi mobile number to +9665XXXXXXXX format.
 *
 * Accepted formats:
 *   05XXXXXXXX         (10 digits) → +9665XXXXXXXX
 *   +9665XXXXXXXX      (13 chars)  → return as-is
 *   9665XXXXXXXX       (12 digits) → add + prefix
 *
 * Returns null if the number is invalid.
 */
export function normalizeSaudiPhone(raw: string): string | null {
  const cleaned = cleanPhoneInput(raw)

  if (SAUDI_PHONE_PLUS966_RE.test(cleaned)) {
    return cleaned
  }

  if (SAUDI_PHONE_966_RE.test(cleaned)) {
    return `+${cleaned}`
  }

  if (SAUDI_PHONE_05_RE.test(cleaned)) {
    return `+966${cleaned.slice(1)}`
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
  phone: z
    .string()
    .min(1, 'رقم الجوال مطلوب')
    .refine(
      (val) => isWhitelistedPhone(val) || isValidSaudiPhoneInput(val),
      'رقم الجوال يجب أن يكون 10 أرقام ويبدأ بـ 05 أو +966 (مثال: 0512345678)',
    ),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
