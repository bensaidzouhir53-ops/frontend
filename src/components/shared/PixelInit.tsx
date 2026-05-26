'use client'

import { useEffect } from 'react'
import { initPixels } from '@/lib/tracking'

export default function PixelInit() {
  useEffect(() => {
    initPixels()
  }, [])

  return null
}
