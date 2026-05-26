export interface FAQItem {
  q: string
  a: string
}

export interface Product {
  slug: string
  nameAr: string
  nameEn: string
  shortDescAr: string
  descAr: string
  image: string
  crossSells: string[]
  benefits: string[]
  ingredients: string[]
  faqs: FAQItem[]
}

export interface Offer {
  qty: number
  price: number
  badge: string
  badgeColor: 'sage' | 'gold' | 'teal'
  isDefault?: boolean
  savings?: number
  desc?: string
}

export interface CartItem {
  product: Product
  qty: number
  price: number
}

export interface UpsellData {
  product_slug: string
  name_ar: string
  price: number
  offer_text: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  isCheckoutOpen: boolean
  isUpsellOpen: boolean
  upsellProduct: UpsellData | null
  pendingOrderId: string | null
  pendingOrderNumber: string | null
  addItem: (product: Product, qty: number, price: number) => void
  removeItem: (slug: string) => void
  updateQty: (slug: string, qty: number, price: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  openCheckout: () => void
  closeCheckout: () => void
  openUpsell: (data: UpsellData) => void
  closeUpsell: () => void
  total: () => number
  itemCount: () => number
}

export interface OrderPayload {
  customer_name: string
  phone: string
  items: { product_slug: string; quantity: number }[]
  landing_page?: string
  utm?: Record<string, string>
  click_ids?: Record<string, string>
  cookies?: Record<string, string>
  event_id?: string
  user_agent?: string
}

export interface OrderResponse {
  order_id: string
  order_number: string
  subtotal: number
  total: number
  currency: string
  upsell?: {
    product_slug: string
    name_ar: string
    price: number
    offer_text: string
  }
}
