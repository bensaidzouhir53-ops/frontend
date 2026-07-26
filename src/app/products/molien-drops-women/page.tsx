import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'كحة، بلغم، وكتمة؟ قطرات المولين للسيدات تنظّف رئتكِ من جوّا | نَفَس',
  description:
    'مع الغبار والبخور والمكيف — صدركِ محتاج تنظيف! قطرات المولين للسيدات من نَفَس لتنظيف الرئة من جوّا وتطرد بلغم السنين. توصيل لجميع مناطق المملكة والدفع عند الاستلام.',
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
