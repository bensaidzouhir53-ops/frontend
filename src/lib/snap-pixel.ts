export const DEFAULT_SNAP_PIXEL_ID = '700c360f-b027-411e-8fbd-47ff5e4e91b7'

function isSnapPixelId(value: string | null | undefined): value is string {
  const id = value?.trim() ?? ''
  if (!id) return false
  const lower = id.toLowerCase()
  if (lower === 'your_id' || lower.startsWith('your_') || lower.startsWith('replace_with')) {
    return false
  }
  return /^[A-Za-z0-9_-]+$/.test(id)
}

/** Snap pixel used when backend / env config is missing. */
export function getCanonicalSnapPixelId(): string {
  for (const raw of [
    process.env.NEXT_PUBLIC_SNAP_PIXEL_ID,
    process.env.SNAP_PIXEL_ID,
  ]) {
    if (isSnapPixelId(raw)) return raw.trim()
  }
  return DEFAULT_SNAP_PIXEL_ID
}
