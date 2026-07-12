export interface FAQItem {
  q: string
  a: string
}

export interface Ingredient {
  name: string
  desc: string
  image: string
}

export interface Product {
  slug: string
  sku: string
  nameAr: string
  nameEn: string
  /** Shorter title for cards and grids (falls back to nameAr) */
  cardTitleAr?: string
  shortDescAr: string
  descAr: string
  image: string
  crossSells: string[]
  benefits: string[]
  ingredients: string[]
  detailedIngredients?: Ingredient[]
  faqs: FAQItem[]
}

export interface Offer {
  qty: number
  price: number
  badge: string
  badgeColor: 'sage' | 'gold' | 'teal' | 'charcoal' | 'apothecary'
  isDefault?: boolean
  savings?: number
  desc?: string
  volumeLabel?: string
  qtyLabel?: string
  /** Short hook above the description */
  headline?: string
  /** Quick benefit bullets for the offer card */
  bullets?: string[]
  /** Top ribbon text (e.g. "الأكثر طلباً") */
  ribbon?: string
  /** Display % off vs buying singles */
  percentOff?: number
  /** Marks the highest-AOV / best-value tier visually */
  isBestValue?: boolean
  /** Total bottles/units the customer receives (e.g. BOGO: tier 2 → 4 units) */
  totalUnits?: number
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
  pendingUpsell: UpsellData | null
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
  scheduleUpsell: (data: UpsellData) => void
  clearScheduledUpsell: () => void
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
