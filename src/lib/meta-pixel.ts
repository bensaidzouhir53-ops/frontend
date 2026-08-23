export const DEFAULT_META_PIXEL_ID = '576636091443534'

/** Single Meta pixel used for all browser events (AddToCart, InitiateCheckout, Purchase). */
export function getCanonicalMetaPixelId(): string {
  const envId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()
  if (envId && /^\d+$/.test(envId)) return envId
  return DEFAULT_META_PIXEL_ID
}
