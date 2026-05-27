import type { Product, Offer } from '@/types'

export const PRODUCTS: Product[] = [
  {
    slug: 'herbal-lung-spray',
    sku: 'NA847291',
    nameAr: 'بخاخ تنظيف الرئتين العشبي لتنفس مريح',
    nameEn: 'Herbal Lung Cleansing Spray',
    shortDescAr: 'تركيبة عشبية طبيعية لدعم إحساس التنفس المريح في يومك',
    descAr:
      'بخاخ نسمة العشبي تركيبة فريدة تجمع بين أجود المكونات الطبيعية، صُمِّمت لدعم إحساس التنفس المريح في حياتك اليومية. مناسب بشكل خاص للأيام التي يكثر فيها الغبار أو الدخان في الهواء، إذ يمنحك إحساساً بالانتعاش والخفة. يمكن دمجه بسهولة في روتين عنايتك اليومي للحصول على أفضل تجربة. تركيبته العشبية خالية من الإضافات الاصطناعية لتناسب اهتمامك بصحتك بشكل طبيعي.',
    image: '/images/herbal-lung-spray.jpg',
    crossSells: ['sinus-cleansing-spray'],
    benefits: [
      'يدعم إحساس التنفس المريح خلال اليوم',
      'مناسب للأيام التي يكثر فيها الغبار أو الدخان',
      'تركيبة عشبية طبيعية خالية من الإضافات الاصطناعية',
      'سهل الاستخدام كجزء من روتينك اليومي',
      'يدعم جهازك التنفسي بشكل عام',
    ],
    ingredients: [
      'مستخلص الزعتر الطبيعي',
      'زيت الكافور النقي',
      'مستخلص الكاليبتوس',
      'زيت النعناع الطبيعي',
    ],
    faqs: [
      { q: 'كيف أستخدم البخاخ؟', a: 'الاستخدام جداً بسيط: رجّ العبوة، وافتح فمك وبخ بختين إلى ثلاث داخل الفم. يُنصح تستخدمه مرتين باليوم (صباح ومساء) عشان تحافظ على انتعاشك وراحة صدرك.' },
      { q: 'متى تظهر النتائج؟', a: 'يلاحظ كثير من المستخدمين إحساساً بالانتعاش من الاستخدام الأول. نتائج الاستخدام المنتظم تختلف من شخص لآخر.' },
      { q: 'هل هو مناسب للجميع؟', a: 'المنتج عشبي طبيعي ومناسب للبالغين بشكل عام. يُنصح بمراجعة الطبيب في حالة الحمل أو الرضاعة أو وجود حساسية من أي من المكونات.' },
      { q: 'هل الشحن سريع؟', a: 'نعم، نوصل لجميع مناطق المملكة العربية السعودية خلال 2-5 أيام عمل. الدفع عند الاستلام.' },
    ],
  },
  {
    slug: 'sinus-cleansing-spray',
    sku: 'NA356184',
    nameAr: 'بخاخ تنظيف الجيوب الأنفية',
    nameEn: 'Sinus Cleansing Spray',
    shortDescAr: 'لإحساس انتعاش وخفة في الجيوب الأنفية',
    descAr:
      'بخاخ نسمة لتنظيف الجيوب الأنفية يمنحك إحساساً فورياً بالانتعاش والخفة، خاصةً في المواسم التي يرتفع فيها تركيز الغبار والملوثات. يعتمد على مزيج من المكونات العشبية الطبيعية المختارة بعناية لدعم راحة الجيوب الأنفية. مناسب للاستخدام اليومي كجزء من روتين عنايتك الشخصية. تركيبته اللطيفة تجعله خياراً مناسباً لمن يرغب في الاعتناء بصحته بطريقة طبيعية.',
    image: '/images/sinus-cleansing-spray.jpg',
    crossSells: ['herbal-lung-spray'],
    benefits: [
      'يمنح إحساساً بالانتعاش في الجيوب الأنفية',
      'مناسب لمواسم الغبار والتلوث',
      'مكونات عشبية طبيعية لطيفة',
      'يدعم راحة الجهاز التنفسي العلوي',
      'سهل الاستخدام في أي وقت',
    ],
    ingredients: [
      'محلول ملحي طبيعي',
      'مستخلص البابونج الطبيعي',
      'زيت الكاليبتوس',
      'مستخلص الصبار',
    ],
    faqs: [
      { q: 'كيف أستخدم بخاخ الجيوب الأنفية؟', a: 'نظّف أنفك أولاً ثم ضع البخاخ في فتحة الأنف وابخخ مرة واحدة في كل جانب. يُنصح بالاستخدام 1-2 مرات يومياً.' },
      { q: 'هل يصلح لموسم الغبار والحساسية؟', a: 'البخاخ مناسب للأيام التي يكثر فيها الغبار أو الملوثات ويمنح إحساساً بالانتعاش. للحساسية الحادة يُنصح باستشارة الطبيب.' },
      { q: 'كيف أطلب وأدفع؟', a: 'اختر كميتك من الصفحة واضغط اطلب الآن. الدفع عند الاستلام — لا حاجة لبطاقة مصرفية.' },
    ],
  },
]

export const OFFERS: Offer[] = [
  {
    qty: 1,
    price: 169,
    badge: 'بداية النتيجة',
    badgeColor: 'sage',
    savings: 0,
    desc: 'يكفيك عشان تجرب المنتج وتبدأ تحس بالفرق والانتعاش',
  },
  {
    qty: 2,
    price: 245,
    badge: 'تأكيد النتيجة',
    badgeColor: 'gold',
    isDefault: true,
    savings: 93,
    desc: 'المدة الصح لتنظيف أعمق وتضمن إن الراحة تستمر معك',
  },
  {
    qty: 3,
    price: 325,
    badge: 'الروتين الكامل',
    badgeColor: 'teal',
    savings: 182,
    desc: 'عشان تضمن أفضل نتيجة وحماية أطول.. وتوفر على جيبك',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getCrossSellProduct(slug: string): Product | undefined {
  const product = getProductBySlug(slug)
  if (!product || product.crossSells.length === 0) return undefined
  return getProductBySlug(product.crossSells[0])
}

/** Returns cross-sell products for the current product page (excludes self). */
export function getCrossSellProducts(currentSlug: string): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return []

  return current.crossSells
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined && p.slug !== currentSlug)
}

export function getDefaultOffer(): Offer {
  return OFFERS.find((o) => o.isDefault) ?? OFFERS[1]
}

// Re-export types so components can import from one place
export type { Product, Offer } from '@/types'
