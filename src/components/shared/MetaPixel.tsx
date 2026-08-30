'use client'

import { useEffect } from 'react'
import { DEFAULT_META_PIXEL_ID } from '@/lib/meta-pixel'
import { registerMetaPixelIds, syncMetaReadyState } from '@/lib/tracking'

interface MetaPixelProps {
  pixelId?: string | null
}

type FbqFn = NonNullable<Window['fbq']>

/** Client fallback if the head bootstrap did not run (adblock / failed inject). */
export default function MetaPixel({ pixelId = DEFAULT_META_PIXEL_ID }: MetaPixelProps) {
  useEffect(() => {
    const id = (pixelId ?? DEFAULT_META_PIXEL_ID).trim()
    if (!/^\d+$/.test(id)) return

    const markReady = () => {
      if (!window.fbq?.callMethod) return false
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

    if (!window.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) {
          fbq.callMethod(...args)
        } else {
          fbq.queue!.push(args)
        }
      } as FbqFn

      fbq.push = fbq
      fbq.loaded = true
      fbq.version = '2.0'
      fbq.queue = []
      window.fbq = fbq
      window._fbq = fbq
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

    window.fbq?.('init', id)
    if (!window.__nasamaPageViewTracked) {
      window.fbq?.('track', 'PageView')
      window.__nasamaPageViewTracked = true
    }
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
