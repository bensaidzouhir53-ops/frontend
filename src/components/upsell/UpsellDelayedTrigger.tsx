'use client'

import { useEffect, useRef } from 'react'
import { useCartStore } from '@/store/cartStore'
import {
  UPSELL_SHOW_DELAY_MS,
  clearPendingUpsell,
  readPendingUpsell,
} from '@/lib/upsell'

function orderAlreadyHasUpsell(): boolean {
  try {
    const raw = sessionStorage.getItem('nasama_order')
    if (!raw) return false
    const order = JSON.parse(raw) as { upsell_item?: unknown }
    return Boolean(order.upsell_item)
  } catch {
    return false
  }
}

export default function UpsellDelayedTrigger() {
  const openUpsell = useCartStore((state) => state.openUpsell)
  const isUpsellOpen = useCartStore((state) => state.isUpsellOpen)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isUpsellOpen) return

    const pendingUpsell = readPendingUpsell()
    if (!pendingUpsell || orderAlreadyHasUpsell()) {
      clearPendingUpsell()
      return
    }

    timerRef.current = setTimeout(() => {
      if (orderAlreadyHasUpsell()) {
        clearPendingUpsell()
        return
      }

      clearPendingUpsell()
      openUpsell(pendingUpsell)
    }, UPSELL_SHOW_DELAY_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isUpsellOpen, openUpsell])

  return null
}
