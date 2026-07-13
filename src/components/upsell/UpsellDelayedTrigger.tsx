'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { clearPendingUpsell, readPendingUpsell } from '@/lib/upsell'

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

function hasPendingOrder(): boolean {
  try {
    return Boolean(sessionStorage.getItem('nasama_order'))
  } catch {
    return false
  }
}

/** Restores the upsell modal after refresh if checkout completed but thank-you not reached yet. */
export default function UpsellDelayedTrigger() {
  const pathname = usePathname()
  const openUpsell = useCartStore((state) => state.openUpsell)
  const pendingUpsell = useCartStore((state) => state.pendingUpsell)
  const isUpsellOpen = useCartStore((state) => state.isUpsellOpen)
  const scheduleUpsell = useCartStore((state) => state.scheduleUpsell)

  useEffect(() => {
    if (isUpsellOpen || orderAlreadyHasUpsell() || !hasPendingOrder()) return

    const stored = pendingUpsell ?? readPendingUpsell()
    if (!stored) return

    if (!pendingUpsell) {
      scheduleUpsell(stored)
    }

    openUpsell(stored)
  }, [pathname, pendingUpsell, isUpsellOpen, openUpsell, scheduleUpsell])

  return null
}
