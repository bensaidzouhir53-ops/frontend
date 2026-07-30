'use client'

import { useEffect } from 'react'
import { generateEventId, trackViewContent } from '@/lib/tracking'

interface ProductViewTrackerProps {
  slug: string
  value: number
}

/** Fire Meta ViewContent once when a product page loads. */
export default function ProductViewTracker({ slug, value }: ProductViewTrackerProps) {
  useEffect(() => {
    trackViewContent({
      value,
      content_ids: [slug],
      event_id: generateEventId(),
    })
  }, [slug, value])

  return null
}
