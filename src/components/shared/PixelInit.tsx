'use client'

import { useEffect } from 'react'
import type { ServerPixelConfig } from '@/lib/pixel-config.server'
import {
  initPixelsFromServerConfig,
  saveFirstLandingUrl,
  trackFirstPartyPageView,
} from '@/lib/tracking'

interface PixelInitProps {
  config: ServerPixelConfig
}

export default function PixelInit({ config }: PixelInitProps) {
  useEffect(() => {
    saveFirstLandingUrl()
    initPixelsFromServerConfig(config)
    trackFirstPartyPageView()
  }, [config])

  return null
}
