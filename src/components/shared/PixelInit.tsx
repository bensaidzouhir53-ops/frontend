'use client'

import { useEffect } from 'react'
import type { ServerPixelConfig } from '@/lib/pixel-config.server'
import {
  initPixelsFromServerConfig,
  saveFirstLandingUrl,
  syncMetaReadyState,
  trackFirstPartyPageView,
} from '@/lib/tracking'

interface PixelInitProps {
  config: ServerPixelConfig
}

export default function PixelInit({ config }: PixelInitProps) {
  useEffect(() => {
    saveFirstLandingUrl()
    initPixelsFromServerConfig(config)
    syncMetaReadyState()
    trackFirstPartyPageView()

    const interval = window.setInterval(syncMetaReadyState, 50)
    const timeout = window.setTimeout(() => window.clearInterval(interval), 3000)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [config])

  return null
}
