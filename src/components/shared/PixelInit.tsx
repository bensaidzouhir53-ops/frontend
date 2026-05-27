'use client'

import { useEffect } from 'react'
import { initPixels, trackFirstPartyPageView } from '@/lib/tracking'

export default function PixelInit() {
  useEffect(() => {
    initPixels()
    trackFirstPartyPageView()
  }, [])

  return null
}
