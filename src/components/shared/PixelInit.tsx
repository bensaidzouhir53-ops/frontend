'use client'

import { useEffect } from 'react'
import type { ServerPixelConfig } from '@/lib/pixel-config.server'
import {
  initPixelsFromServerConfig,
  saveFirstLandingUrl,
  syncMetaReadyState,
  syncTtqReadyState,
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
    syncTtqReadyState()
    trackFirstPartyPageView()

    const interval = window.setInterval(() => {
      syncMetaReadyState()
      syncTtqReadyState()
    }, 100)
    const timeout = window.setTimeout(() => window.clearInterval(interval), 10000)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [config])

  return null
}
