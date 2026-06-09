/** Brand name for customer-facing WhatsApp copy */
export const BRAND_NAME_AR = 'نَفَس'

/** Local display number for WhatsApp */
export const WHATSAPP_PHONE_DISPLAY = '+1 (970) 325-8330'

/** International digits for wa.me / tel (no + prefix) */
export const WHATSAPP_PHONE_WA = '19703258330'

export function buildWhatsAppUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_PHONE_WA}`
  if (!text?.trim()) return base
  return `${base}?text=${encodeURIComponent(text.trim())}`
}

/** Default wa.me link (no pre-filled message) */
export const WHATSAPP_URL = buildWhatsAppUrl()

/** General support message for footer, contact page, etc. */
export function buildGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    `السلام عليكم 👋\nحاب أستفسر عن منتجات ${BRAND_NAME_AR} 🌿`,
  )
}

export function buildOutboundWelcomePreview(options: {
  orderNumber?: string
  customerName?: string
  total?: number
}): string {
  const firstName = (options.customerName || '').trim().split(/\s+/)[0]
  const greeting = firstName ? `هلا ${firstName} 👋` : 'السلام عليكم 👋'
  const total = options.total && options.total > 0 ? Math.round(options.total) : null

  const lines = [
    greeting,
    '',
    `ألف مبروك من فريق ${BRAND_NAME_AR} 🌿`,
    'وصلنا طلبك بنجاح!',
    '',
  ]
  if (options.orderNumber) lines.push(`📦 رقم الطلب: ${options.orderNumber}`)
  if (total) lines.push(`💰 المبلغ: ${total} ر.س — الدفع عند الاستلام`)
  lines.push(
    '',
    'بنتواصل معك خلال دقائق لتأكيد العنوان ونطلق الشحن.',
    'استعد لروتين تنفس أخف — صدرك راح يحس بالفرق من أول استخدام!',
    '',
    'أي سؤال؟ رد على هالرسالة ونخدمك فوراً 🇸🇦',
  )
  return lines.join('\n')
}
