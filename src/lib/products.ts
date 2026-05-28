import type { Product, Offer } from '@/types'

export const PRODUCTS: Product[] = [
  {
    slug: 'herbal-lung-spray',
    sku: 'NA847291',
    nameAr: 'بخاخ تنظيف الرئتين العشبي لتنفس مريح',
    nameEn: 'Herbal Lung Cleansing Spray',
    shortDescAr: 'تركيبة عشبية طبيعية لدعم إحساس التنفس المريح في يومك',
    descAr:
      'بخاخ نسمة العشبي مو مجرد منتج عادي، هو روتينك اليومي اللي يفك أزمة الكتمة ويريح صدرك من أول بخة! بتركيبة طبيعية 100% جمعنا فيها أقوى الأعشاب اللي تصفي الممرات التنفسية وتطرد تراكمات الدخان والغبار اللي نعيشه كل يوم في أجوائنا. إذا كنت تعاني من ثقل بالصدر، بلغم مزعج، أو كحة ما تفارقك، هالبخاخ بيعطيك إحساس فوري بالانتعاش والخفة كأنك تتنفس لأول مرة. آمن تماماً وخالي من أي كيماويات، عشان تستخدمه وأنت متطمن وترجع لك راحتك وصدرك منشرح.',
    image: '/images/herbal-lung-spray-hero.png',
    crossSells: [],
    benefits: [
      'يطرد البلغم المزعج المتراكم من الدخان والشيشة',
      'يوسع الشعب الهوائية ويسهل عملية التنفس فوراً',
      'ينظف الرئة من آثار الغبار والملوثات اليومية',
      'طبيعي 100% ومصرح من الغذاء والدواء (SFDA)',
      'يخلصك من الكحة الصباحية وكتمة الصدر',
    ],
    ingredients: [
      'مستخلص الزعتر الطبيعي (مذيب للبلغم)',
      'زيت الكافور النقي (موسع للشعب)',
      'مستخلص الكاليبتوس (منظف ومطهر)',
      'زيت النعناع الطبيعي (انتعاش فوري)',
    ],
    detailedIngredients: [
      {
        name: 'الكاليبتوس',
        desc: 'يوسع لك الشعب الهوائية ويفك الكتمة من أول بخة، يخليك تتنفس براحة وتسحب هوا نظيف يرد الروح.',
        image: '/images/ingredient-eucalyptus.png'
      },
      {
        name: 'ببتيدات الكولاجين',
        desc: 'ترمم أنسجة الرئة اللي تعبت من الدخان والغبار، وترجع لها مرونتها عشان ترجع تتنفس طبيعي وصدرك ينشرح.',
        image: '/images/ingredient-collagen.png'
      },
      {
        name: 'زهرة البيلسان',
        desc: 'تطرد السموم والالتهابات من الصدر، وتهدي الكحة الناشفة والمزعجة اللي تقطع أنفاسك وتفضحك بالمجالس.',
        image: '/images/ingredient-elderflower.png'
      },
      {
        name: 'هاماميليس',
        desc: 'يخفف الاحتقان في الممرات التنفسية، ويقلل من إفراز البلغم الغثيث اللي ناشب بحلقك كل صباح.',
        image: '/images/ingredient-hamamelis.png'
      },
      {
        name: 'العبهر',
        desc: 'يذوب البلغم المتحجر في الصدر ويسهل طرده، ويريحك من ثقل الصدر والكتمة خصوصاً وقت النوم.',
        image: '/images/ingredient-styrax.png'
      },
      {
        name: 'هيدروتيس',
        desc: 'مضاد حيوي طبيعي، ينظف الرئة من البكتيريا والميكروبات اللي تتراكم مع الوقت وتتعب صدرك.',
        image: '/images/ingredient-hydrastis.png'
      },
      {
        name: 'جونجينج جراس',
        desc: 'عشبة قوية تصفي الرئة من ترسبات النيكوتين والقطران، وتعطيك إحساس بالانتعاش الفوري والنظافة اللي تدور عليها.',
        image: '/images/ingredient-gongjing-grass.png'
      }
    ],
    faqs: [
      { q: 'متى أحس بالفرق؟', a: 'من أول استخدام بتحس بانتعاش وخفة في صدرك. ومع الاستمرار (خلال أول أسبوع) بتلاحظ إن البلغم يقل والكحة تخف بشكل كبير جداً.' },
      { q: 'هل له أعراض جانبية؟', a: 'أبداً! المنتج عشبي طبيعي 100% ومصرح من هيئة الغذاء والدواء (SFDA)، آمن للاستخدام اليومي ولا يسبب التعود أو الجفاف.' },
      { q: 'كيف طريقة الاستخدام؟', a: 'بسيطة جداً: رج العبوة، وبخ بختين إلى 3 بخات داخل الفم. نوصي باستخدامه مرتين يومياً (الصباح وقبل النوم) لأفضل نتيجة.' },
      { q: 'كيف يتم التوصيل والدفع؟', a: 'التوصيل سريع لجميع مناطق المملكة (2-4 أيام عمل). والأهم: الدفع عند الاستلام! تطلب الآن، ولما يوصلك المندوب وتستلم طلبك.. تدفع.' },
      { q: 'كيف أضمن حقي لو ما ناسبني؟', a: 'نسمة تقدم لك "ضمان ذهبي 30 يوم". استخدم المنتج وإذا ما حسيت بفرق واضح في تنفسك، تواصل معنا ونرجع لك فلوسك كاملة بدون أسئلة معقدة.' },
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
    badge: 'تأكيد النتيجة + شحن مجاني 🚚',
    badgeColor: 'gold',
    isDefault: true,
    savings: 93,
    desc: 'المدة الصح لتنظيف أعمق وتضمن إن الراحة تستمر معك (الأكثر طلباً)',
  },
  {
    qty: 3,
    price: 325,
    badge: 'الروتين الكامل + شحن مجاني 🚚',
    badgeColor: 'teal',
    savings: 182,
    desc: 'عشان تضمن أفضل نتيجة وحماية أطول.. وتوفر على جيبك الكثير!',
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
