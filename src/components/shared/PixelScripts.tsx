/* eslint-disable @next/next/no-img-element -- Snap noscript fallback uses a 1x1 pixel */
import type { ServerPixelConfig } from '@/lib/pixel-config.server'

interface PixelScriptsProps {
  config: ServerPixelConfig
}

/** Noscript Snap PAGE_VIEW. JS pixel lives in SnapHeadScripts (head). */
export default function PixelScripts({ config }: PixelScriptsProps) {
  if (!config.enabled) return null

  const snapId = config.snap_pixel_id
  if (!snapId) return null

  return (
    <noscript>
      <img
        height={1}
        width={1}
        alt=""
        style={{ display: 'none' }}
        src={`https://tr.snapchat.com/p?pid=${encodeURIComponent(snapId)}&ev=PAGE_VIEW`}
      />
    </noscript>
  )
}
