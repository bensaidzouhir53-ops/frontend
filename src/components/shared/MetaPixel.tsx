'use client'

import { useEffect } from 'react'
import { DEFAULT_META_PIXEL_ID } from '@/lib/meta-pixel'
import { registerMetaPixelIds, syncMetaReadyState } from '@/lib/tracking'

interface MetaPixelProps {
  pixelId?: string | null
}

/** Client fallback if the head bootstrap did not run (adblock / failed inject). */
export default function MetaPixel({ pixelId = DEFAULT_META_PIXEL_ID }: MetaPixelProps) {
  useEffect(() => {
    const id = (pixelId ?? DEFAULT_META_PIXEL_ID).trim()
    if (!/^\d+$/.test(id)) return

    const markReady = () => {
      if (!window.fbq) return false
      window.__nasamaMetaReady = true
      if (!window.__nasamaInitializedPixelIds?.includes(id)) {
        window.fbq('init', id)
        window.__nasamaInitializedPixelIds = [
          ...(window.__nasamaInitializedPixelIds ?? []),
          id,
        ]
      }
      registerMetaPixelIds(window.__nasamaInitializedPixelIds ?? [id])
      syncMetaReadyState()
      return true
    }

    if (markReady()) return

    // Standard Meta stub + fbevents (same as head bootstrap)
    const w = window as Window & { fbq?: Window['fbq']; _fbq?: Window['fbq'] }
    if (!w.fbq) {
      const n = function (...args: unknown[]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fn = n as any
        fn.callMethod ? fn.callMethod(...args) : fn.queue.push(args)
      } as NonNullable<Window['fbq']>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(n as any).push = n
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(n as any).loaded = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(n as any).version = '2.0'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(n as any).queue = []
      w.fbq = n
      w._fbq = n
    }

    const existing = document.querySelector(
      'script[src*="connect.facebook.net"][src*="fbevents.js"]',
    )
    if (!existing) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)
    }

    w.fbq?.('init', id)
    if (!window.__nasamaPageViewTracked) {
      w.fbq?.('track', 'PageView')
      window.__nasamaPageViewTracked = true
    }
    window.__nasamaMetaReady = true
    window.__nasamaInitializedPixelIds = [id]
    registerMetaPixelIds([id])
    syncMetaReadyState()

    const interval = window.setInterval(() => {
      if (markReady()) window.clearInterval(interval)
    }, 200)
    window.setTimeout(() => window.clearInterval(interval), 10000)
  }, [pixelId])

  return null
}
