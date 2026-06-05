import type { Product, Offer } from '@/types'

export const PRODUCTS: Product[] = [
  {
    slug: 'herbal-lung-spray',
    sku: 'HBLEANSPRY3',
    nameAr: 'بخاخ تنظيف الرئتين العشبي لتنفس مريح',
    nameEn: 'Herbal Lung Cleansing Spray',
    cardTitleAr: 'بخاخ تنظيف الرئة العشبي',
    shortDescAr: 'تركيبة عشبية طبيعية لدعم إحساس التنفس المريح في يومك',
    descAr:
      'بخاخ نسمة العشبي مو مجرد منتج عادي، هو روتينك اليومي اللي يفك أزمة الكتمة ويريح صدرك من أول بخة! بتركيبة طبيعية 100% جمعنا فيها أقوى الأعشاب اللي تصفي الممرات التنفسية وتطرد تراكمات الدخان والغبار اللي نعيشه كل يوم في أجوائنا. إذا كنت تعاني من ثقل بالصدر، بلغم مزعج، أو كحة ما تفارقك، هالبخاخ بيعطيك إحساس فوري بالانتعاش والخفة كأنك تتنفس لأول مرة. آمن تماماً وخالي من أي كيماويات، عشان تستخدمه وأنت متطمن وترجع لك راحتك وصدرك منشرح.',
    image: '/images/herbal-lung-spray-hero.png',
    crossSells: ['molien-drops'],
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
  {
    slug: 'molien-drops',
    sku: 'MOLIENDRP3',
    nameAr: 'تصحى كل صباح وصدرك مقفول؟ قطرة المولين تذيب البلغم المتحجر وتريحك من "الكتمة" من أول استخدام! 🌿',
    nameEn: 'Molien Drops — Dissolve Hardened Phlegm',
    cardTitleAr: 'قطرة المولين العشبية',
    shortDescAr: 'الحل الطبيعي الأول في السعودية للمدخنين وأهل الشيشة لإذابة البلغم وتخفيف الغثيان الصباحي.',
    descAr:
      'قطرة المولين من نسمة: "غسيل طبيعي" لرئتيك! جبنا لك خلاصة الطبيعة بتركيز عالي جداً. قطرة المولين مو مسكن مؤقت، هذي تركيبة عشبية سريعة الامتصاص تنزل مباشرة على البلغم الكثيف والمتحجر.. تفككه، تذيبه، وتطلعه بدون كحة تجرح حلقك. آمن تماماً وخالي من أي كيماويات، عشان تبدأ يومك بخفة وبدون عذاب.',
    image: '/images/molien-drops-hero.png',
    crossSells: ['herbal-lung-spray'],
    benefits: [
      'تذيب طبقات البلغم المتحجر من أول استخدام',
      'تريحك من الغثيان الصباحي والكحة اللي تفضحك',
      'تفتح الشعب الهوائية وتخليك تتنفس بعمق',
      'تركيز عالي: 2 إلى 4 قطرات فقط تكفيك يومياً',
      'طبيعي 100% ومصرح من الغذاء والدواء (SFDA)',
    ],
    ingredients: [
      'مستخلص أوراق المولين (1400 ملغ)',
      'مستخلص جذور الخطمي (100 ملغ)',
      'مستخلص البريلا (80 ملغ)',
      'مستخلص الآذريون (60 ملغ)',
      'مستخلص الزعتر (60 ملغ)',
      'مستخلص الأستراجالوس (50 ملغ)',
      'مستخلص قشر البرتقال (30 ملغ)',
    ],
    detailedIngredients: [
      {
        name: 'مستخلص أوراق المولين (1400 ملغ)',
        desc: 'عشبة طبيعية معروفة كمذيب للبلغم — تليّن المخاط المتحجر في الحلق والصدر وتسهّل طرده، وتغلّف بطانة الممرات التنفسية لتخفيف التهيج والكحة.',
        image: '/images/ingredient-mullein-leaves.png',
      },
      {
        name: 'مستخلص جذور الخطمي (100 ملغ)',
        desc: 'غني بالمادة الهلامية اللي تغلّف الحلق والمعدة بطبقة مريحة — يهدّي التهيج في الحلق ويريّح الكحة الجافة والبلغم الناشب بدون ما يسبب جفاف.',
        image: '/images/ingredient-marshmallow-root.png',
      },
      {
        name: 'مستخلص البريلا (80 ملغ)',
        desc: 'يخفّف الالتهاب في الممرات التنفسية ويقلّل إفراز المخاط الزائد — يساعد على فتح التنفس ويحمي الرئة من تهيج الغبار والحساسية.',
        image: '/images/ingredient-perilla.png',
      },
      {
        name: 'مستخلص الآذريون (60 ملغ)',
        desc: 'مضاد التهاب طبيعي يهدّي التهيج في بطانة الحلق والفم — يسرّع شفاء الأنسجة المتهيجة ويريّح الحلق الملتهب كل صباح.',
        image: '/images/ingredient-calendula.png',
      },
      {
        name: 'مستخلص الزعتر (60 ملغ)',
        desc: 'مطهّر طبيعي غني بالزيوت العطرية — يساعد على طرد البلغم الكثيف ويهدّي الكحة المنتجة ويحمي الممرات التنفسية من الجراثيم.',
        image: '/images/ingredient-thyme.png',
      },
      {
        name: 'مستخلص الأستراجالوس (50 ملغ)',
        desc: 'يعزّز المناعة ويدعم مقاومة الجسم للالتهابات التنفسية — يقلّل التهاب الشعب الهوائية ويساعد الرئة على التعافي مع الاستخدام المستمر.',
        image: '/images/ingredient-astragalus.png',
      },
      {
        name: 'مستخلص قشر البرتقال (30 ملغ)',
        desc: 'غني بمضادات الأكسدة والمركبات النباتية — يخفّف إجهاد الرئة، يقلّل الالتهاب، ويساعد على تقليل المخاط الزائد في الممرات التنفسية.',
        image: '/images/ingredient-orange-peel.png',
      },
    ],
    faqs: [
      { q: 'متى أحس بالفرق؟', a: 'من أول يوم! بتحس إن البلغم يلين ويطلع بسهولة. ومع الاستمرار خلال أسبوع، الغثيان الصباحي والبلغم الناشب يقل بشكل كبير.' },
      { q: 'هل له أعراض جانبية؟', a: 'أبداً! المنتج عشبي طبيعي 100% ومصرح من هيئة الغذاء والدواء (SFDA)، آمن للاستخدام اليومي ولا يسبب التعود أو الغثيان.' },
      { q: 'كيف طريقة الاستخدام؟', a: 'طريقتها سهلة جداً وما تاخذ من وقتك ثواني! مرتين باليوم (صباح ومساء). بما أن تركيبتنا مركزة جداً (High Potency)، كل اللي تحتاجه هو من قطرتين إلى 4 قطرات فقط! حطها تحت اللسان مباشرة أو في نص كوب موية دافية واشربها.' },
      { q: 'كيف يتم التوصيل والدفع؟', a: 'التوصيل سريع لجميع مناطق المملكة (2-4 أيام عمل). والأهم: الدفع عند الاستلام! تطلب الآن، ولما يوصلك المندوب وتستلم طلبك.. تدفع.' },
      { q: 'كيف أضمن حقي لو ما ناسبني؟', a: 'نسمة تقدم لك "ضمان ذهبي 30 يوم". استخدم المنتج وإذا ما حسيت بفرق واضح، تواصل معنا ونرجع لك فلوسك كاملة بدون أسئلة معقدة.' },
    ],
  },
]

export const HERBAL_LUNG_SPRAY_OFFERS: Offer[] = [
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

export const MOLIEN_DROPS_OFFERS: Offer[] = [
  {
    qty: 1,
    price: 189,
    qtyLabel: 'كورس التجربة',
    volumeLabel: '60 مل',
    badge: 'جرب النتيجة',
    badgeColor: 'sage',
    savings: 0,
    desc: 'للي يبي يشوف النتيجة المبدئية وتخفيف غثيان الصباح. عبوة وحدة تكفيك شهر كامل (تركيز عالي = توفير أكثر).',
  },
  {
    qty: 2,
    price: 279,
    qtyLabel: 'كورس التعافي',
    volumeLabel: '120 مل',
    badge: 'الأكثر طلباً + شحن مجاني 🚚',
    badgeColor: 'gold',
    isDefault: true,
    savings: 99,
    desc: 'للمدخنين وأهل الشيشة! عبوتين تكفيك شهرين — توفر 99 ريال وتضمن تنظيف أعمق للصدر. البلغم القديم ما يروح بعبوة وحدة!',
  },
  {
    qty: 3,
    price: 379,
    qtyLabel: 'الكورس الشامل',
    volumeLabel: '180 مل',
    badge: 'أفضل قيمة + شحن مجاني 🚚',
    badgeColor: 'teal',
    savings: 188,
    desc: 'للي يبي ينسى الكتمة تماماً! 3 عبوات تغطيك 3 شهور وتوفّر 188 ريال. اللي يكمل 90 يوم يرجع يتنفس كأنه مولود من جديد.',
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
