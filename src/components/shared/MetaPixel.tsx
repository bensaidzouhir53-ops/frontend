'use client'

import { useEffect } from 'react'
import { DEFAULT_META_PIXEL_ID } from '@/lib/meta-pixel'
import { registerMetaPixelIds, syncMetaReadyState } from '@/lib/tracking'

interface MetaPixelProps {
  pixelId?: string | null
}

/** Fallback — if /meta-pixel.js was blocked, inject bootstrap once on the client. */
export default function MetaPixel({ pixelId = DEFAULT_META_PIXEL_ID }: MetaPixelProps) {
  useEffect(() => {
    const id = (pixelId ?? DEFAULT_META_PIXEL_ID).trim()
    if (!/^\d+$/.test(id)) return

    const sync = () => {
      if (!window.fbq) return false
      window.__nasamaMetaReady = true
      registerMetaPixelIds([id])
      syncMetaReadyState()
      return true
    }

    if (sync()) return

    const script = document.createElement('script')
    script.src = '/meta-pixel.js'
    script.async = false
    script.dataset.pixelId = id
    script.onload = () => {
      sync()
    }
    document.head.appendChild(script)

    const interval = window.setInterval(() => {
      if (sync()) window.clearInterval(interval)
    }, 100)
    window.setTimeout(() => window.clearInterval(interval), 10000)
  }, [pixelId])

  return null
}
