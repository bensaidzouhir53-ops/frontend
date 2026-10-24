'use client'

import { useEffect } from 'react'
import { DEFAULT_META_PIXEL_ID } from '@/lib/meta-pixel'
import { registerMetaPixelIds, syncMetaReadyState } from '@/lib/tracking'

interface MetaPixelProps {
  pixelId?: string | null
  pixelIds?: string[] | null
}

type FbqFn = NonNullable<Window['fbq']>

/** Client fallback if the head bootstrap did not run (adblock / failed inject). */
export default function MetaPixel({ pixelId, pixelIds }: MetaPixelProps) {
  useEffect(() => {
    const ids = (pixelIds?.length ? pixelIds : [pixelId ?? DEFAULT_META_PIXEL_ID])
      .map((id) => (id ?? '').trim())
      .filter((id, index, all) => /^\d+$/.test(id) && all.indexOf(id) === index)
    if (ids.length === 0) return

    const appendIds = (next: string[]) => {
      const current = window.__nasamaInitializedPixelIds ?? []
      for (const id of next) {
        if (!current.includes(id)) current.push(id)
      }
      window.__nasamaInitializedPixelIds = current
      return current
    }

    const markReady = () => {
      if (!window.fbq?.callMethod) return false
      window.__nasamaMetaReady = true
      for (const id of ids) {
        if (!window.__nasamaInitializedPixelIds?.includes(id)) {
          window.fbq('init', id)
        }
      }
      registerMetaPixelIds(appendIds(ids))
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

    for (const id of ids) {
      if (!window.__nasamaInitializedPixelIds?.includes(id)) {
        window.fbq?.('init', id)
      }
    }
    if (!window.__nasamaPageViewTracked) {
      window.fbq?.('track', 'PageView')
      window.__nasamaPageViewTracked = true
    }
    registerMetaPixelIds(appendIds(ids))
    syncMetaReadyState()

    const interval = window.setInterval(() => {
      if (markReady()) window.clearInterval(interval)
    }, 200)
    window.setTimeout(() => window.clearInterval(interval), 10000)
  }, [pixelId, pixelIds])

  return null
}
