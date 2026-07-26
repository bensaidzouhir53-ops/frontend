import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'تكحين بالمجلس؟ قطرات المولين للسيدات تنظّف صدركِ من جوّا | نَفَس',
  description:
    'بلغم الصبح، كتمة المكيف، وبخور البيت يضايق صدركِ؟ قطرات المولين للسيدات من نَفَس — تنظيف طبيعي للرئة، مصرّح SFDA، توصيل لكل السعودية والدفع عند الاستلام.',
}

export default function MolienDropsWomenPage() {
  const product = getProductBySlug('molien-drops-women')!
  const crossSellProducts = getCrossSellProducts(product.slug)

  return (
    <ProductPageContent
      product={product}
      crossSellProducts={crossSellProducts}
    />
  )
}
