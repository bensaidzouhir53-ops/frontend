import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'نسمة | قطرة المولين تذوب البلغم المتحجر من أول يوم',
  description:
    'قطرة المولين العشبية من نسمة — تركيبة طبيعية لإذابة البلغم المتحجر وتخفيف الغثيان الصباحي. الدفع عند الاستلام، توصيل لجميع مناطق المملكة.',
}

export default function MolienDropsPage() {
  const product = getProductBySlug('molien-drops')!
  const crossSellProducts = getCrossSellProducts(product.slug)

  return (
    <ProductPageContent
      product={product}
      crossSellProducts={crossSellProducts}
    />
  )
}
