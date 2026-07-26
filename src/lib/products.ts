import type { Product, Offer } from '@/types'

export const PRODUCTS: Product[] = [
  {
    slug: 'herbal-lung-spray',
    sku: 'HBLEANSPRY3',
    nameAr: 'صدرك مكتوم وبلغمك ما يوقف؟ انسف الكتمة فوراً مع بخاخ تنظيف الرئتين العشبي 🌿',
    nameEn: 'Herbal Lung Cleansing Spray',
    cardTitleAr: 'بخاخ تنظيف الرئة العشبي',
    shortDescAr: 'بخاخ طبيعي ينظف رئتك من آثار الدخان والغبار، ويخليك تاخذ نَفَس عميق ومريح من أول 3 أيام.',
    descAr:
      'الكحة اللي تفضحك بالمجالس، والبلغم اللي يحرجك الصبح بالدوام... ودعها للأبد! مع الغبار والشيشة والمكيف، صدرك جالس ينهار من جوّا. بخاخ نَفَس العشبي يعطيك تنظيف طبيعي 100%، يكسر النيكوتين، يذيب البلغم الأسود، ويفتح مجاري التنفس لتتنفس براحة من جديد.',
    image: '/images/herbal-lung-spray-hero.png',
    crossSells: ['molien-drops'],
    benefits: [
      'إذابة سريعة للبلغم المتحجر والسموم المتراكمة',
      'توسيع فوري للشعب الهوائية لتنفس عميق ومريح',
      'تنظيف الرئة من آثار الدخان والغبار بشكل فعّال',
      'القضاء على الكحة الصباحية وغثيان الحلق نهائياً',
      'مصرح من الغذاء والدواء (SFDA) - طبيعي وآمن 100%',
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
      { q: 'كيف أضمن حقي لو ما ناسبني؟', a: 'نفس تقدم لك "ضمان ذهبي 30 يوم". استخدم المنتج وإذا ما حسيت بفرق واضح في تنفسك، تواصل معنا ونرجع لك فلوسك كاملة بدون أسئلة معقدة.' },
    ],
  },
  {
    slug: 'molien-drops',
    sku: 'MOILZOUH',
    nameAr: 'صدرك مكتوم وبلغمك ما يوقف؟ قطرات المولين تنظّف رئتك وتطرد بلغم السنين! 🌿',
    nameEn: 'Molien Drops — Deep Lung Cleansing',
    cardTitleAr: 'قطرات المولين لتنظيف الرئة',
    shortDescAr: 'قطرات طبيعية تنظف رئتك من آثار الشيشة والغبار، وتخليك تاخذ نَفَس عميق ومريح من أول 3 أيام.',
    descAr:
      'الكحة اللي تفضحك بالمجالس، والبلغم اللي يحرجك الصبح بالدوام... ودعها للأبد! مع الغبار والشيشة والمكيف، صدرك جالس ينهار من جوّا. قطرات المولين من نَفَس تعطيك تنظيف طبيعي 100%، تفتح صدرك، تفكّ الكتمة، وتطرد البلغم المزعج لتتنفس براحة من جديد.',
    image: '/images/molien-drops-hero.png',
    crossSells: ['herbal-lung-spray'],
    benefits: [
      'ينظّف الرئة من جوّا ويطرد آثار التدخين والغبار والمكيف',
      'يفكّ الكتمة ويفتح الشعب الهوائية لتنفس أسهل',
      'يذوّب ويطرد البلغم المزعج اللي يضايقك كل صباح',
      'يعزّز مناعة جهازك التنفسي ويحميه من الالتهابات',
      'طبيعي 100% ومصرح من الغذاء والدواء (SFDA)',
    ],
    ingredients: [
      'أوراق المولين (مذيب للبلغم)',
      'جذور الخطمى (ملطف للأغشية)',
      'مستخلص البريلا (مضاد التهابات)',
      'مستخلص الزنييون (مزيل احتقان)',
      'مستخلص الزعتر (مطهر طبيعي)',
      'مستخلص الأستراجالوس (داعم للمناعة)',
      'مستخلص قشر البرتقال (مضاد أكسدة)',
    ],
    detailedIngredients: [
      {
        name: 'أوراق المولين',
        desc: 'تفك الكتمة وتفتح الشعب الهوائية. تعمل كمزيل احتقان طبيعي يسهل عليك التنفس بمرونة وسلاسة.',
        image: '/images/ingredient-mullein-leaves.png',
      },
      {
        name: 'جذور الخطمى',
        desc: 'ملطف قوي للأغشية المخاطية. يهدئ تهيج الحلق ويخفف حدة السعال بفعالية.',
        image: '/images/ingredient-marshmallow-root.png',
      },
      {
        name: 'مستخلص البريلا',
        desc: 'مضاد طبيعي للالتهابات. يساعد في تهدئة الحساسية التنفسية ويمنحك راحة عند التنفس.',
        image: '/images/ingredient-perilla.png',
      },
      {
        name: 'مستخلص الزنييون',
        desc: 'مزيل احتقان فائق. يعمل على فتح الشعب الهوائية المسدودة ويخلصك من ضيق التنفس والكتمة.',
        image: '/images/ingredient-calendula.png',
      },
      {
        name: 'مستخلص الزعتر',
        desc: 'مطهر طبيعي وطارد للبلغم. ينظف الرئتين ويفتح المسالك الهوائية لتتنفس بعمق.',
        image: '/images/ingredient-thyme.png',
      },
      {
        name: 'مستخلص الأستراجالوس',
        desc: 'داعم رئيسي للمناعة. يعزز كفاءة الجهاز التنفسي ويحافظ على صحة ونشاط الرئتين.',
        image: '/images/ingredient-astragalus.png',
      },
      {
        name: 'مستخلص قشر البرتقال',
        desc: 'غني بمضادات الأكسدة وفيتامين C. يدعم صحة الجهاز التنفسي ويجعل تنفسك أكثر راحة وسلاسة.',
        image: '/images/ingredient-orange-peel.png',
      },
    ],
    faqs: [
      { q: 'هل ينفع للمدخنين واللي يشيشون؟', a: 'أكيد! مصمم خصيصاً لتنظيف الرئة من ترسبات الدخان والشيشة والنيكوتين، ويفك كتمة الصدر اللي يعاني منها المدخن.' },
      { q: 'أقدر أستخدمه كل يوم؟ وفيه كيماويات؟', a: 'المنتج طبيعي 100% ومفحوص مخبرياً ومصرح من هيئة الغذاء والدواء. ما فيه أي كيماويات ومناسب جداً كروتين يومي تنظف فيه صدرك.' },
      { q: 'كيف طريقة الاستخدام؟', a: 'مرتين باليوم (صباح ومساء). حط 2 إلى 3 قطرات تحت لسانك مباشرة، أو اخلطها مع نص كوب ماء دافئ واشربها.' },
      { q: 'كيف يتم التوصيل والدفع؟', a: 'التوصيل سريع لجميع مناطق المملكة (2-4 أيام عمل). والأهم: الدفع عند الاستلام! تطلب الآن وتدفع لما يوصلك المندوب.' },
      { q: 'كيف أضمن حقي لو ما ناسبني؟', a: 'نوفر لك "ضمان 30 يوم". جرب العبوة الأولى كاملة، وإذا ما حسيت بفرق وراحة بصدرك، نرجع لك فلوسك كاملة بدون أسئلة معقدة.' },
    ],
  },
  {
    slug: 'molien-drops-women',
    sku: 'MOILZOUH',
    nameAr: 'كحة، بلغم، وكتمة؟ قطرات المولين للسيدات تنظّف رئتكِ وتطرد بلغم السنين! 🌿',
    nameEn: 'Molien Drops for Women — Deep Lung Cleansing',
    cardTitleAr: 'قطرات المولين للسيدات',
    shortDescAr:
      'قطرات طبيعية تنظّف رئتكِ من آثار الغبار والبخور والمكيف، وتخلّيكِ تاخذين نَفَس عميق ومريح من أول 3 أيام.',
    descAr:
      'الكحة اللي تفضحكِ بالمجالس، والبلغم اللي يضايقكِ كل صباح.. ودّعيه للأبد! مع الغبار والبخور والمكيف، صدركِ جالس ينهار من جوّا. قطرات المولين من نَفَس تعطيكِ تنظيف طبيعي 100%، تفتح صدركِ، تفكّ الكتمة، وتطرد البلغم المزعج — عشان تتنفسين براحة من جديد.',
    image: '/images/molien-drops-hero.png',
    crossSells: ['herbal-lung-spray'],
    benefits: [
      'ينظّف الرئة من جوّا ويطرد آثار الغبار والبخور والمكيف',
      'يفكّ الكتمة ويفتح الشعب الهوائية لتنفس أسهل',
      'يذوّب ويطرد البلغم المزعج اللي يضايقكِ كل صباح',
      'يعزّز مناعتكِ ويحمي جهازكِ التنفسي من الالتهابات',
      'طبيعي 100% ومصرح من الغذاء والدواء (SFDA)',
    ],
    ingredients: [
      'أوراق المولين (مذيب للبلغم)',
      'جذور الخطمى (ملطف للأغشية)',
      'مستخلص البريلا (مضاد التهابات)',
      'مستخلص الزنييون (مزيل احتقان)',
      'مستخلص الزعتر (مطهر طبيعي)',
      'مستخلص الأستراجالوس (داعم للمناعة)',
      'مستخلص قشر البرتقال (مضاد أكسدة)',
    ],
    detailedIngredients: [
      {
        name: 'أوراق المولين',
        desc: 'تفك الكتمة وتفتح الشعب الهوائية. تعمل كمزيل احتقان طبيعي يسهّل عليكِ التنفس بمرونة وسلاسة.',
        image: '/images/ingredient-mullein-leaves.png',
      },
      {
        name: 'جذور الخطمى',
        desc: 'ملطف قوي للأغشية المخاطية. يهدئ تهيج الحلق ويخفف حدة السعال بفعالية.',
        image: '/images/ingredient-marshmallow-root.png',
      },
      {
        name: 'مستخلص البريلا',
        desc: 'مضاد طبيعي للالتهابات. يساعد في تهدئة الحساسية التنفسية ويمنحكِ راحة عند التنفس.',
        image: '/images/ingredient-perilla.png',
      },
      {
        name: 'مستخلص الزنييون',
        desc: 'مزيل احتقان فائق. يعمل على فتح الشعب الهوائية المسدودة ويخلّصكِ من ضيق التنفس والكتمة.',
        image: '/images/ingredient-calendula.png',
      },
      {
        name: 'مستخلص الزعتر',
        desc: 'مطهر طبيعي وطارد للبلغم. ينظف الرئتين ويفتح المسالك الهوائية لتتنفسي بعمق.',
        image: '/images/ingredient-thyme.png',
      },
      {
        name: 'مستخلص الأستراجالوس',
        desc: 'داعم رئيسي للمناعة. يعزز كفاءة الجهاز التنفسي ويحافظ على صحة ونشاط الرئتين.',
        image: '/images/ingredient-astragalus.png',
      },
      {
        name: 'مستخلص قشر البرتقال',
        desc: 'غني بمضادات الأكسدة وفيتامين C. يدعم صحة الجهاز التنفسي ويجعل تنفسكِ أكثر راحة وسلاسة.',
        image: '/images/ingredient-orange-peel.png',
      },
    ],
    faqs: [
      {
        q: 'هل ينفع للسيدات اللي يعانين من حساسية الغبار والبخور؟',
        a: 'أكيد! مصمم خصيصاً لتنظيف الرئة من آثار الغبار والبخور والمكيف، ويفك كتمة الصدر اللي تضايق كثير من السيدات.',
      },
      {
        q: 'أقدر أستخدمه كل يوم؟ وفيه كيماويات؟',
        a: 'المنتج طبيعي 100% ومفحوص مخبرياً ومصرح من هيئة الغذاء والدواء. ما فيه أي كيماويات ومناسب جداً كروتين يومي تنظّفين فيه صدركِ.',
      },
      {
        q: 'كيف طريقة الاستخدام؟',
        a: 'مرتين باليوم (صباح ومساء). حطّي 2 إلى 3 قطرات تحت لسانكِ مباشرة، أو اخلطيها مع نص كوب ماء دافئ واشربيها.',
      },
      {
        q: 'كيف يتم التوصيل والدفع؟',
        a: 'التوصيل سريع لجميع مناطق المملكة (2-4 أيام عمل). والأهم: الدفع عند الاستلام! تطلبين الآن وتدفعين لما يوصلكِ المندوب.',
      },
      {
        q: 'كيف أضمن حقي لو ما ناسبني؟',
        a: 'نوفر لكِ "ضمان 30 يوم". جربي العبوة الأولى كاملة، وإذا ما حسيتِ بفرق وراحة بصدركِ، نرجع لكِ فلوسكِ كاملة بدون أسئلة معقدة.',
      },
    ],
  },
]

export const REGULAR_UNIT_PRICE = 179

/** @deprecated Use REGULAR_UNIT_PRICE */
export const BOGO_UNIT_PRICE = REGULAR_UNIT_PRICE

/** @deprecated Use REGULAR_UNIT_PRICE */
export const MOLIEN_REGULAR_UNIT_PRICE = REGULAR_UNIT_PRICE

export const HERBAL_LUNG_SPRAY_OFFERS: Offer[] = [
  {
    qty: 1,
    price: 179,
    qtyLabel: 'علبة واحدة',
    volumeLabel: '30 مل',
    cardTitle: 'علبة واحدة — باقة التجربة',
    cardBadges: ['باقة التجربة', 'للتجربة بس'],
    badge: 'باقة التجربة',
    badgeColor: 'sage',
    cardSubtitleLead: 'تكفيك شهر كامل —',
    cardSubtitle:
      'مناسبة لو تبي تشوف الفرق من أول أسبوع. بس أغلب اللي حسّوا بتحسّن حقيقي كملوا شهرين على الأقل.',
  },
  {
    qty: 2,
    price: 249,
    qtyLabel: 'علبتان',
    volumeLabel: '60 مل',
    cardTitle: 'علبتان — باقة العناية المتقدمة',
    ribbonBadge: 'الأكثر طلباً',
    ribbonVariant: 'popular',
    stageRibbonBadge: 'شهرين',
    cardBadges: ['باقة العناية المتقدمة', 'شحن مجاني'],
    badge: 'الأكثر طلباً',
    badgeColor: 'gold',
    isDefault: true,
    freeShipping: true,
    savings: 109,
    percentOff: 30,
    cardSubtitleLead: '87% من عملائنا يختارون هذا —',
    cardSubtitle: 'شهرين يثبّتون فيهم النتيجة: البلغم يقل، الصدر ينشرح، والكتمة ما ترجع.',
  },
  {
    qty: 3,
    price: 319,
    qtyLabel: '3 علب',
    volumeLabel: '90 مل',
    cardTitle: '3 علب — باقة التنظيف الشامل للرئة',
    ribbonBadge: 'أفضل قيمة',
    ribbonVariant: 'value',
    stageRibbonBadge: 'الأكثر مبيعاً',
    cardBadges: ['باقة التنظيف الشامل', 'شحن مجاني', 'خصم خاص'],
    badge: 'أفضل توفير',
    badgeColor: 'apothecary',
    freeShipping: true,
    savings: 218,
    percentOff: 41,
    isBestValue: true,
    cardSubtitleLead: 'كورس 3 شهور —',
    cardSubtitle:
      'أقل سعر للعبوة (106 ر.س). اللي يكملون الكورس الكامل يودّعون الكتمة والبلغم للأبد.',
  },
]

export const MOLIEN_DROPS_OFFERS: Offer[] = HERBAL_LUNG_SPRAY_OFFERS.map((offer, index) => ({
  ...offer,
  volumeLabel: ['60 مل', '120 مل', '180 مل'][index],
  ...(offer.qty === 3
    ? {
        price: 349,
        savings: 188,
        percentOff: 35,
        cardSubtitle:
          'أقل سعر للعبوة (116 ر.س). اللي يكملون الكورس الكامل يودّعون الكتمة والبلغم للأبد.',
      }
    : {}),
}))

/** @deprecated Use getOffersForProduct(slug) */
export const OFFERS: Offer[] = HERBAL_LUNG_SPRAY_OFFERS

const OFFERS_BY_PRODUCT: Record<string, Offer[]> = {
  'herbal-lung-spray': HERBAL_LUNG_SPRAY_OFFERS,
  'molien-drops': MOLIEN_DROPS_OFFERS,
  'molien-drops-women': MOLIEN_DROPS_OFFERS,
}

/** Landing-page variants (e.g. women-targeted) — hidden from shop catalog grids. */
const CATALOG_HIDDEN_SLUGS = new Set(['molien-drops-women'])

export function isMolienDropsProduct(slug: string): boolean {
  return slug === 'molien-drops' || slug === 'molien-drops-women'
}

export function getCatalogProducts(): Product[] {
  return PRODUCTS.filter((p) => !CATALOG_HIDDEN_SLUGS.has(p.slug))
}

export function getOffersForProduct(slug: string): Offer[] {
  return OFFERS_BY_PRODUCT[slug] ?? HERBAL_LUNG_SPRAY_OFFERS
}

export function getOfferForProductQty(slug: string, qty: number): Offer | undefined {
  return getOffersForProduct(slug).find((o) => o.qty === qty)
}

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

export function getDefaultOffer(slug?: string): Offer {
  const offers = slug ? getOffersForProduct(slug) : HERBAL_LUNG_SPRAY_OFFERS
  return offers.find((o) => o.isDefault) ?? offers[1]
}

export function getOfferTotalUnits(offer: Offer): number {
  return offer.totalUnits ?? offer.qty
}

export function getOfferOriginalPrice(slug: string, offer: Offer): number {
  if (offer.totalUnits) {
    return REGULAR_UNIT_PRICE * getOfferTotalUnits(offer)
  }
  return REGULAR_UNIT_PRICE * offer.qty
}

export function getMaxOfferSavings(slug: string): number {
  return Math.max(...getOffersForProduct(slug).map((o) => o.savings ?? 0), 0)
}

export function productHasBogoOffers(slug: string): boolean {
  return getOffersForProduct(slug).some((o) => (o.totalUnits ?? 0) > o.qty)
}

// Re-export types so components can import from one place
export type { Product, Offer } from '@/types'
