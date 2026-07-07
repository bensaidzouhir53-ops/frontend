'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const openUpsell = useCartStore((state) => state.openUpsell)
  const scheduleUpsell = useCartStore((state) => state.scheduleUpsell)
  const clearScheduledUpsell = useCartStore((state) => state.clearScheduledUpsell)
  const pendingUpsell = useCartStore((state) => state.pendingUpsell)
  const isUpsellOpen = useCartStore((state) => state.isUpsellOpen)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scheduledForRef = useRef<string | null>(null)

  // Restore pending upsell after refresh or hard navigation to thank-you.
  useEffect(() => {
    if (pendingUpsell || isUpsellOpen || orderAlreadyHasUpsell()) return

    const stored = readPendingUpsell()
    if (stored) {
      scheduleUpsell(stored)
    }
  }, [pathname, pendingUpsell, isUpsellOpen, scheduleUpsell])

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (isUpsellOpen || !pendingUpsell) {
      scheduledForRef.current = null
      return
    }

    if (orderAlreadyHasUpsell()) {
      clearPendingUpsell()
      clearScheduledUpsell()
      return
    }

    const upsellKey = pendingUpsell.product_slug
    if (scheduledForRef.current === upsellKey) return
    scheduledForRef.current = upsellKey

    timerRef.current = setTimeout(() => {
      if (orderAlreadyHasUpsell()) {
        clearPendingUpsell()
        clearScheduledUpsell()
        return
      }

      clearPendingUpsell()
      clearScheduledUpsell()
      openUpsell(pendingUpsell)
      scheduledForRef.current = null
    }, UPSELL_SHOW_DELAY_MS)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [
    isUpsellOpen,
    pendingUpsell,
    openUpsell,
    clearScheduledUpsell,
  ])

  return null
}
