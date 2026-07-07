import type { Metadata } from 'next'
import { getProductBySlug, getCrossSellProducts } from '@/lib/products'
import ProductPageContent from '@/components/product/ProductPageContent'

export const metadata: Metadata = {
  title: 'قطرات مستخلص المولين لتنظيف الرئتين وطرد البلغم | نسمة',
  description:
    'مع الغبار والشيشة والمكيف — صدرك مو سليم! قطرات المولين من نسمة لتنظيف الرئة من جوّا وتوسيع الشعب الهوائية. توصيل لجميع مناطق المملكة والدفع عند الاستلام.',
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
