'use client'

import dynamic from 'next/dynamic'

const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), { ssr: false })
const UpsellModal = dynamic(() => import('@/components/upsell/UpsellModal'), { ssr: false })

export default function ClientLazyModals() {
  return (
    <>
      <CartDrawer />
      <UpsellModal />
    </>
  )
}
