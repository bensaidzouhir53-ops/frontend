export const DEFAULT_META_PIXEL_ID = '576636091443534'
export const DEFAULT_META_PIXEL_IDS = [
  '576636091443534',
  '2303667077124032',
] as const

function isMetaPixelId(value: string | null | undefined): value is string {
  const id = value?.trim() ?? ''
  return /^\d+$/.test(id)
}

/** Primary Meta pixel (first in the list). */
export function getCanonicalMetaPixelId(): string {
  const envId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()
  if (isMetaPixelId(envId)) return envId
  return DEFAULT_META_PIXEL_ID
}

/** All Meta pixels used when backend config is unavailable (build / fallback). */
export function getDefaultMetaPixelIds(): string[] {
  const ids: string[] = []
  const add = (value: string | null | undefined) => {
    const id = value?.trim()
    if (!isMetaPixelId(id) || ids.includes(id)) return
    ids.push(id)
  }

  add(process.env.NEXT_PUBLIC_META_PIXEL_ID)
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID_2)
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID_3)
  for (const id of DEFAULT_META_PIXEL_IDS) add(id)
  return ids
}
