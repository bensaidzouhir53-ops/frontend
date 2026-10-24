export const DEFAULT_META_PIXEL_ID = '576636091443534'
export const EXTRA_META_PIXEL_ID = '1435851508750967'
export const DEFAULT_META_PIXEL_IDS = [
  DEFAULT_META_PIXEL_ID,
  EXTRA_META_PIXEL_ID,
] as const

const DROPPED_META_PIXEL_IDS = new Set(['2303667077124032'])

function isMetaPixelId(value: string | null | undefined): value is string {
  const id = value?.trim() ?? ''
  return /^\d+$/.test(id) && !DROPPED_META_PIXEL_IDS.has(id)
}

/** Primary Meta pixel (first in the list). */
export function getCanonicalMetaPixelId(): string {
  const envId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()
  if (isMetaPixelId(envId)) return envId
  return DEFAULT_META_PIXEL_ID
}

export function getExtraMetaPixelIds(): string[] {
  const ids: string[] = []
  const add = (value: string | null | undefined) => {
    const id = value?.trim()
    if (!isMetaPixelId(id) || id === getCanonicalMetaPixelId() || ids.includes(id)) return
    ids.push(id)
  }
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID_2)
  add(EXTRA_META_PIXEL_ID)
  return ids
}

/** All Meta pixels used when backend config is unavailable (build / fallback). */
export function getDefaultMetaPixelIds(): string[] {
  const ids: string[] = []
  const add = (value: string | null | undefined) => {
    const id = value?.trim()
    if (!isMetaPixelId(id) || ids.includes(id)) return
    ids.push(id)
  }

  add(getCanonicalMetaPixelId())
  add(process.env.NEXT_PUBLIC_META_PIXEL_ID_2)
  add(EXTRA_META_PIXEL_ID)
  return ids
}

export function filterMetaPixelIds(ids: Array<string | null | undefined>): string[] {
  const next: string[] = []
  for (const value of ids) {
    const id = value?.trim()
    if (!isMetaPixelId(id) || next.includes(id)) continue
    next.push(id)
  }
  for (const extra of getExtraMetaPixelIds()) {
    if (!next.includes(extra)) next.push(extra)
  }
  return next
}
