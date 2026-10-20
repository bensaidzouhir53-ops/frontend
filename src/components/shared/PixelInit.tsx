'use client'

import { useEffect } from 'react'
import type { ServerPixelConfig } from '@/lib/pixel-config.server'
import {
  initPixelsFromServerConfig,
  saveFirstLandingUrl,
  syncMetaReadyState,
  syncSnapReadyState,
  syncTtqReadyState,
  trackFirstPartyPageView,
  trackPageView,
} from '@/lib/tracking'

interface PixelInitProps {
  config: ServerPixelConfig
}

export default function PixelInit({ config }: PixelInitProps) {
  useEffect(() => {
    saveFirstLandingUrl()
    initPixelsFromServerConfig(config)
    syncMetaReadyState()
    syncTtqReadyState()
    syncSnapReadyState()
    trackFirstPartyPageView()

    let pageViewSent = false
    const tryTrackPageView = () => {
      if (pageViewSent) return
      if (!window.fbq?.callMethod) return
      pageViewSent = true
      trackPageView()
    }

    tryTrackPageView()

    const interval = window.setInterval(() => {
      syncMetaReadyState()
      syncTtqReadyState()
      syncSnapReadyState()
      tryTrackPageView()
    }, 100)
    const timeout = window.setTimeout(() => window.clearInterval(interval), 10000)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [config])

  return null
}
