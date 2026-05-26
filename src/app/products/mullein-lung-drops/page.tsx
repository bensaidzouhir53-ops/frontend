import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'نسمة | قطرات المولين لتنظيف الرئتين من البلغم',
  description:
    'قطرات المولين من نسمة — مستخلص نبتة المولين الطبيعية لدعم صحة الجهاز التنفسي. الدفع عند الاستلام، توصيل لجميع مناطق المملكة.',
}

export default function MulleinLungDropsPage() {
  const product = getProductBySlug('mullein-lung-drops')!
  const crossSellProducts = getCrossSellProducts(product.slug)

  return (
    <ProductPageContent
      product={product}
      crossSellProducts={crossSellProducts}
    />
  )
}
