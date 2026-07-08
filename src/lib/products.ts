import type { Product, Offer } from '@/types'

export const PRODUCTS: Product[] = [
  {
    slug: 'herbal-lung-spray',
    sku: 'HBLEANSPRY3',
    nameAr: 'رئتك تحتضر؟ انسف الكتمة والبلغم فوراً مع بخاخ تنظيف الرئتين العشبي 🌿',
    nameEn: 'Herbal Lung Cleansing Spray',
    cardTitleAr: 'بخاخ تنظيف الرئة العشبي',
    shortDescAr: 'الفرصة الذهبية لكل مدخن.. تركيبة عشبية سحرية تذيب البلغم وتوسع الشعب الهوائية لنفس أعمق!',
    descAr:
      'عايش بـ "نصف نفس"؟ صدرك يصفر من الكتمة والبلغم المتحجر اللي ساد مجاريك؟ بخاخ نفس العشبي هو طوق النجاة اللي راح ينتشلك من هالكابوس! بتركيبة طبيعية مركزة 100%، هالبخاخ ينزل زي النار على ترسبات السنين.. يكسر النيكوتين، يذيب البلغم الأسود، ويفتح مجاري التنفس المقفلة من أول بخة. تخيل تصحى الصبح بدون كحة تشق صدرك، وبدون غثيان، وتتنفس بعمق كأنك مولود من جديد! آمن تماماً، مصرح من هيئة الغذاء والدواء، ويضمن لك صدر منشرح وراحة تدوم طول اليوم.',
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
    nameAr: 'كحة، بلغم، وكتمة؟ قطرات مستخلص المولين تنظّف رئتك من جوّا وتطرد بلغم السنين! 🌿',
    nameEn: 'Molien Drops — Deep Lung Cleansing',
    cardTitleAr: 'قطرات المولين لتنظيف الرئة',
    shortDescAr: 'تنظيف حقيقي مو تغطية! قطرات طبيعية 100% لتوسيع الشعب الهوائية وطرد البلغم للمدخنين واللي يتأثرون بالغبار.',
    descAr:
      'مع الغبار والشيشة والمكيف — صدرك مو سليم! كحة، بلغم، وكتمة؟ رئتك محتاجة تنظيف من جوّا. مو أول مرة تحس بثقل بصدرك.. بس أول مرة تلقى حل ينظّف وما يغطّي. قطرات المولين من نَفَس تعطيك تنظيف طبيعي 100% من جوّا، بدون كيماويات ولا تعب. تفتح صدرك، تفكّ الكتمة، وتطرد البلغم المزعج لتتنفس براحة من جديد.',
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
]

export const HERBAL_LUNG_SPRAY_OFFERS: Offer[] = [
  {
    qty: 1,
    price: 179,
    qtyLabel: 'علبة واحدة',
    volumeLabel: '30 مل',
    badge: 'للتجربة بس',
    badgeColor: 'sage',
    savings: 0,
    desc: 'تبي تتأكد بس؟ 30 مل يخليك تحس بانتعاش من أول أيام — لكن لا تتوقع تودع الكتمة! ترسبات السنين والبلغم المتراكم يبيله أكثر من عبوة وحدة عشان يطلع من صدرك.',
  },
  {
    qty: 2,
    price: 245,
    qtyLabel: 'عبوتين',
    volumeLabel: '60 مل',
    badge: 'الأكثر طلباً + شحن مجاني 🚚',
    badgeColor: 'gold',
    isDefault: true,
    savings: 113,
    desc: 'ليش أغلب السعوديين ياخذون هالخيار؟ 60 مل = شهرين كاملين بدون ما تفصل الروتين. من الأسبوع الثاني تحس إن البلغم الصباحي يقل والصدر ينشرح — وتوفر 113 ريال + شحن مجاني.',
  },
  {
    qty: 3,
    price: 325,
    qtyLabel: '3 عبوات',
    volumeLabel: '90 مل',
    badge: 'الكورس الكامل + شحن مجاني 🚚',
    badgeColor: 'teal',
    savings: 212,
    desc: 'لكل مدخن وكل واحد تعب من الكتمة! 90 مل تغطيك 3 شهور — الكورس اللي فعلاً يودع البلغم والكحة. وفّر 212 ريال ولا تخسر روتينك في نص الطريق.',
  },
]

export const MOLIEN_DROPS_OFFERS: Offer[] = [
  {
    qty: 1,
    price: 189,
    qtyLabel: 'عبوة واحدة',
    volumeLabel: '60 مل',
    badge: 'العبوة الأولى • تعطيك النتيجة',
    badgeColor: 'sage',
    savings: 0,
    desc: 'العبوة الأولى تعطيك النتيجة وتشوف الفرق المبدئي بفتح الصدر وتخفيف الكتمة.',
  },
  {
    qty: 2,
    price: 229,
    qtyLabel: 'عبوتين',
    volumeLabel: '120 مل',
    badge: 'الأكثر طلباً • تثبت النتيجة',
    badgeColor: 'gold',
    isDefault: true,
    savings: 149,
    desc: 'العبوتين تثبت النتيجة! روتين يكفيك شهرين لضمان تنظيف أعمق للرئة وتوفير 149 ريال.',
  },
  {
    qty: 3,
    price: 255,
    qtyLabel: '3 عبوات',
    volumeLabel: '180 مل',
    badge: 'أفضل توفير • وفر 312 ريال',
    badgeColor: 'charcoal',
    savings: 312,
    desc: 'لكل اللي يبي يتنفس براحة مستدامة! تغطيك 3 شهور، توفر 312 ريال، وتودع الكتمة للأبد.',
  },
]

/** @deprecated Use getOffersForProduct(slug) */
export const OFFERS: Offer[] = HERBAL_LUNG_SPRAY_OFFERS

const OFFERS_BY_PRODUCT: Record<string, Offer[]> = {
  'herbal-lung-spray': HERBAL_LUNG_SPRAY_OFFERS,
  'molien-drops': MOLIEN_DROPS_OFFERS,
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

// Re-export types so components can import from one place
export type { Product, Offer } from '@/types'
