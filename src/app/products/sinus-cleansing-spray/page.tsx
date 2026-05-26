import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'نسمة | بخاخ تنظيف الجيوب الأنفية',
  description:
    'بخاخ تنظيف الجيوب الأنفية من نسمة — تركيبة عشبية طبيعية لدعم راحة التنفس عبر الأنف. الدفع عند الاستلام، توصيل سريع للمملكة.',
}

export default function SinusCleansingSprayPage() {
  const product = getProductBySlug('sinus-cleansing-spray')!
  const crossSellProducts = getCrossSellProducts(product.slug)

  return (
    <ProductPageContent
      product={product}
      crossSellProducts={crossSellProducts}
    />
  )
}
