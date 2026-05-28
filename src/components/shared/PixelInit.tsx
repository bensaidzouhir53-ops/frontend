'use client'

import { useEffect } from 'react'
import type { ServerPixelConfig } from '@/lib/pixel-config.server'
import { initPixelsFromServerConfig, trackFirstPartyPageView } from '@/lib/tracking'

interface PixelInitProps {
  config: ServerPixelConfig
}

export default function PixelInit({ config }: PixelInitProps) {
  useEffect(() => {
    initPixelsFromServerConfig(config)
    trackFirstPartyPageView()
  }, [config])

  return null
}
