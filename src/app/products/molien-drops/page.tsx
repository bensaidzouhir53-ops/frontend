import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'كحة، بلغم، وكتمة؟ قطرات مستخلص المولين تنظّف رئتك من جوّا | نَفَس',
  description:
    'مع الغبار والشيشة والمكيف — صدرك مو سليم! قطرات المولين من نَفَس لتنظيف الرئة من جوّا وتطرد بلغم السنين. توصيل لجميع مناطق المملكة والدفع عند الاستلام.',
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
