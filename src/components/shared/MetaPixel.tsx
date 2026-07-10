'use client'

import { useEffect, useRef } from 'react'
import { registerMetaPixelIds, syncMetaReadyState } from '@/lib/tracking'

const FB_SCRIPT = 'https://connect.facebook.net/en_US/fbevents.js'
const SCRIPT_ID = 'nasama-meta-fbevents'

interface MetaPixelProps {
  enabled: boolean
  pixelIds: string[]
}

function loadFbeventsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve()

    if (window.fbq?.callMethod) {
      resolve()
      return
    }

    if (!window.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) {
          fbq.callMethod(...args)
        } else {
          fbq.queue!.push(args)
        }
      } as NonNullable<Window['fbq']>
      fbq.push = fbq
      fbq.loaded = true
      fbq.version = '2.0'
      fbq.queue = []
      window.fbq = fbq
      window._fbq = fbq
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('fbevents load failed')), {
        once: true,
      })
      if (window.fbq?.callMethod) resolve()
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = FB_SCRIPT
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('fbevents load failed'))
    document.head.appendChild(script)
  })
}

function bootMetaPixels(pixelIds: string[]): void {
  if (typeof window === 'undefined' || !window.fbq || pixelIds.length === 0) return

  window.__nasamaInitializedPixelIds = window.__nasamaInitializedPixelIds || []

  for (const id of pixelIds) {
    if (!window.__nasamaInitializedPixelIds.includes(id)) {
      window.fbq('init', id)
      window.__nasamaInitializedPixelIds.push(id)
    }
  }

  if (!window.__nasamaPageViewTracked) {
    for (const id of pixelIds) {
      window.fbq('trackSingle', id, 'PageView')
    }
    window.__nasamaPageViewTracked = true
  }

  window.__nasamaMetaReady = true
  registerMetaPixelIds(pixelIds)
  syncMetaReadyState()
}

/** Client fallback — registers pixels with tracking.ts if head script already ran, else loads fbq. */
export default function MetaPixel({ enabled, pixelIds }: MetaPixelProps) {
  const started = useRef(false)

  useEffect(() => {
    if (!enabled || pixelIds.length === 0 || started.current) return
    started.current = true

    let cancelled = false

    const finish = () => {
      if (cancelled) return
      bootMetaPixels(pixelIds)
    }

    if (window.fbq?.callMethod || window.__nasamaPageViewTracked) {
      finish()
    } else {
      void loadFbeventsScript().then(finish).catch((error) => {
        console.warn('[MetaPixel] Failed to load:', error)
      })
    }

    const interval = window.setInterval(() => {
      syncMetaReadyState()
    }, 200)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [enabled, pixelIds.join(',')])

  return null
}
