import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'نفس | بخاخ تنظيف الرئتين العشبي لتنفس مريح',
  description:
    'بخاخ تنظيف الرئتين العشبي من نفس — تركيبة عشبية طبيعية لدعم راحة الجهاز التنفسي اليومية. الدفع عند الاستلام، توصيل لجميع مناطق المملكة.',
}

export default function HerbalLungSprayPage() {
  const product = getProductBySlug('herbal-lung-spray')!
  const crossSellProducts = getCrossSellProducts(product.slug)

  return (
    <ProductPageContent
      product={product}
      crossSellProducts={crossSellProducts}
    />
  )
}
