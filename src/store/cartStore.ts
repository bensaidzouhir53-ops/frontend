import { create } from 'zustand'
import type { CartItem, CartState, Product, UpsellData } from '@/types'

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  isCheckoutOpen: false,
  isUpsellOpen: false,
  upsellProduct: null,
  pendingUpsell: null,
  pendingOrderId: null,
  pendingOrderNumber: null,

  addItem: (product: Product, qty: number, price: number) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.slug === product.slug)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.slug === product.slug ? { ...i, qty, price } : i,
          ),
        }
      }
      const newItem: CartItem = { product, qty, price }
      return { items: [...state.items, newItem] }
    })
  },

  removeItem: (slug: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.product.slug !== slug),
    }))
  },

  updateQty: (slug: string, qty: number, price: number) => {
    if (qty <= 0) {
      get().removeItem(slug)
      return
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product.slug === slug ? { ...i, qty, price } : i,
      ),
    }))
  },

  clearCart: () => set({ items: [] }),

  openCart: () => set({ isOpen: true, isCheckoutOpen: false }),
  closeCart: () => set({ isOpen: false }),

  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () =>
    set({ isCheckoutOpen: false, pendingOrderId: null, pendingOrderNumber: null }),

  openUpsell: (data: UpsellData) =>
    set({
      isUpsellOpen: true,
      upsellProduct: data,
      isCheckoutOpen: false,
      isOpen: false,
    }),
  closeUpsell: () => set({ isUpsellOpen: false, upsellProduct: null }),

  scheduleUpsell: (data: UpsellData) => set({ pendingUpsell: data }),
  clearScheduledUpsell: () => set({ pendingUpsell: null }),

  total: () => get().items.reduce((sum, item) => sum + item.price, 0),
  itemCount: () => get().items.reduce((sum, item) => sum + item.qty, 0),
}))
