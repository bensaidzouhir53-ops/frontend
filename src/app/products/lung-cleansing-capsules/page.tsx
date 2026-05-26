import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'نسمة | كبسولات تنظيف الرئتين',
  description:
    'كبسولات تنظيف الرئتين من نسمة — مكملات عشبية يومية لدعم صحة الجهاز التنفسي من الداخل. الدفع عند الاستلام.',
}

export default function LungCleansingCapsulesPage() {
  const product = getProductBySlug('lung-cleansing-capsules')!
  const crossSellProducts = getCrossSellProducts(product.slug)

  return (
    <ProductPageContent
      product={product}
      crossSellProducts={crossSellProducts}
    />
  )
}
