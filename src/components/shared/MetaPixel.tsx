'use client'

import { useEffect, useRef } from 'react'
import { registerMetaPixelIds, syncMetaReadyState } from '@/lib/tracking'

interface MetaPixelProps {
  enabled: boolean
  pixelIds: string[]
}

/** Sync head pixel with tracking.ts — no second script load. */
export default function MetaPixel({ enabled, pixelIds }: MetaPixelProps) {
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || pixelIds.length === 0 || started.current) return
    started.current = true

    const sync = () => {
      if (!window.fbq) return false
      window.__nasamaMetaReady = true
      registerMetaPixelIds(pixelIds)
      syncMetaReadyState()
      return true
    }

    if (!sync()) {
      const interval = window.setInterval(() => {
        if (sync()) window.clearInterval(interval)
      }, 50)
      window.setTimeout(() => window.clearInterval(interval), 10000)
    }
  }, [enabled, pixelIds.join(',')])

  return null
}
