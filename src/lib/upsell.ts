import { getProductBySlug } from '@/lib/products'
import type { UpsellData } from '@/types'

export const UPSELL_PRICE = 99
export const UPSELL_OFFER_COUNTDOWN_SECONDS = 10

export const UPSELL_CROSS_SELL: Record<string, string> = {
  'herbal-lung-spray': 'molien-drops',
  'molien-drops': 'herbal-lung-spray',
}

export const UPSELL_OFFER_TEXT =
  'أكمل روتينك التنفسي — عرض حصري لعملاء نَفَس فقط'

export const PENDING_UPSELL_STORAGE_KEY = 'nasama_pending_upsell'

export function getUpsellOffer(
  items: { product_slug: string }[],
): UpsellData | null {
  const ordered = new Set(items.map((item) => item.product_slug))

  for (const slug of ordered) {
    const upsellSlug = UPSELL_CROSS_SELL[slug]
    if (!upsellSlug || ordered.has(upsellSlug)) continue

    const product = getProductBySlug(upsellSlug)
    if (!product) continue

    return {
      product_slug: upsellSlug,
      name_ar: product.cardTitleAr ?? product.nameAr,
      price: UPSELL_PRICE,
      offer_text: UPSELL_OFFER_TEXT,
    }
  }

  return null
}

export function storePendingUpsell(upsell: UpsellData): void {
  sessionStorage.setItem(PENDING_UPSELL_STORAGE_KEY, JSON.stringify(upsell))
}

export function clearPendingUpsell(): void {
  sessionStorage.removeItem(PENDING_UPSELL_STORAGE_KEY)
}

export function readPendingUpsell(): UpsellData | null {
  try {
    const raw = sessionStorage.getItem(PENDING_UPSELL_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UpsellData
  } catch {
    return null
  }
}
