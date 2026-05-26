import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'نسمة | بخاخ الإقلاع عن التدخين',
  description:
    'بخاخ الإقلاع عن التدخين من نسمة — أداة داعمة بمكونات عشبية طبيعية لرحلتك نحو نمط حياة أكثر صحة. الدفع عند الاستلام.',
}

export default function StopSmokingSprayPage() {
  const product = getProductBySlug('stop-smoking-spray')!
  const crossSellProducts = getCrossSellProducts(product.slug)

  return (
    <ProductPageContent
      product={product}
      crossSellProducts={crossSellProducts}
    />
  )
}
