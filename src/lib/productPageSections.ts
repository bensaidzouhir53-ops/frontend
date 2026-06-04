export interface PainPoint {
  text: string
}

export interface SolutionFeature {
  title: string
}

export interface MechanismStep {
  step: number
  title: string
  desc: string
}

export interface HowToUseStep {
  step: number
  title: string
  desc: string
  image: string
}

export interface ComparisonRow {
  feature: string
  us: string
  them: string
}

export interface DayProcessPhase {
  period: string
  title: string
  benefits: string[]
  stat: string
}

export interface DayProcessContent {
  image: string
  imageAlt: string
  overlayTitle: string
  overlayDesc: string
  phases: DayProcessPhase[]
}

export interface ProductPageSections {
  painAlert: string
  painTitle: string
  painBody: string
  painPoints: PainPoint[]
  painImage: string
  painImageAlt: string
  painOverlay: string
  solutionBadge: string
  solutionTitle: string
  solutionBody: string
  solutionImage: string
  solutionImageAlt: string
  solutionFeatures: SolutionFeature[]
  mechanismTitle: string
  mechanismSteps: MechanismStep[]
  ingredientsMainImage: string
  ingredientsMainImageAlt: string
  howToUseSteps: HowToUseStep[]
  comparisonRows: ComparisonRow[]
  dayProcess: DayProcessContent
  showImageReviews: boolean
  reviewsKey: 'herbal-lung-spray' | 'molien-drops'
}

const SHARED_DAY_PROCESS_PHASES: DayProcessPhase[] = [
  {
    period: 'اليوم 1-3',
    title: 'بداية الراحة',
    benefits: [
      'تحس إن صدرك صار أخف والكتمة خفت حيل',
      'أول نفس عميق ومريح تأخذه من فترة طويلة',
    ],
    stat: '93% من عملائنا لاحظوا تنفس أسهل بأول 3 أيام',
  },
  {
    period: 'اليوم 4-7',
    title: 'راح تلاحظ الفرق',
    benefits: [
      'بلغم الصبح يبدأ يطلع ويتنظف',
      'الكحة المزعجة تقل بشكل واضح',
    ],
    stat: '89% من عملائنا لاحظوا إن البلغم خف ومجاري التنفس تفتحت باليوم السابع',
  },
  {
    period: 'اليوم 7-14',
    title: 'تنفس براحتك',
    benefits: [
      'تحس إن شعبك الهوائية انفتحت ونضفت',
      'لا صفير بصدرك ولا ثقل يضايقك',
    ],
    stat: '91% من عملائنا حسوا بتنفس صافي ومريح بالأسبوع الثاني',
  },
  {
    period: 'اليوم 14-28',
    title: 'طاقة ونشاط',
    benefits: [
      'نومة أعمق ومريحة طوال الليل',
      'لياقتك تتحسن وتقدر تنجز يومك بدون تعب',
    ],
    stat: '87% من عملائنا حسوا بنشاط وطاقة أعلى مع الاستمرار حتى اليوم 28',
  },
]

const MOLIEN_DAY_PROCESS_PHASES: DayProcessPhase[] = [
  {
    period: 'اليوم 1-3',
    title: 'بداية الراحة',
    benefits: [
      'البلغم المتحجر يبدأ يلين ويطلع بسهولة',
      'الغثيان الصباحي يخف من أول أيام',
    ],
    stat: '93% من عملائنا لاحظوا حلق أخف وتنفس أسهل بأول 3 أيام',
  },
  {
    period: 'اليوم 4-7',
    title: 'راح تلاحظ الفرق',
    benefits: [
      'بلغم الصبح يبدأ يطلع ويتنظف',
      'الكحة المزعجة تقل بشكل واضح',
    ],
    stat: '89% من عملائنا لاحظوا إن البلغم خف ومجاري التنفس تفتحت باليوم السابع',
  },
  {
    period: 'اليوم 7-14',
    title: 'تنفس براحتك',
    benefits: [
      'تحس إن شعبك الهوائية انفتحت ونضفت',
      'لا صفير بصدرك ولا ثقل يضايقك',
    ],
    stat: '91% من عملائنا حسوا بتنفس صافي ومريح بالأسبوع الثاني',
  },
  {
    period: 'اليوم 14-28',
    title: 'طاقة ونشاط',
    benefits: [
      'نومة أعمق ومريحة طوال الليل',
      'لياقتك تتحسن وتقدر تنجز يومك بدون تعب',
    ],
    stat: '87% من عملائنا حسوا بنشاط وطاقة أعلى مع الاستمرار حتى اليوم 28',
  },
]

const HERBAL_LUNG_SPRAY_SECTIONS: ProductPageSections = {
  painAlert: 'رسالة مهمة لكل مدخن: لا تتجاهل هذي العلامات 🚨',
  painTitle: 'الكتمة ذابحتك؟ الشيشة والدخان جالسة تراكم ترسبات تقطع أنفاسك وتسرق راحتك اليومية! ⚠️',
  painBody:
    'البلغم الصباحي الغثيث اللي تحاول تطلعه، الكحة اللي تفضحك بكل مكان، وصوت الصدر وقت النوم أو مع أقل مجهود في النادي أو الدوام.. هذي مو مجرد أرقام، هذي صرخة من رئتك تقولك: "أنا مكتومة، أحتاج أتنظف!" لا تستمر تتجاهل هالإنذارات لين يطيح الفاس بالراس.',
  painPoints: [
    { text: 'تصحى الصبح وتكح كحة ناشفة ومزعجة تحسها تطلع من قلب صدرك؟' },
    { text: 'تحس بـ "كتمة" وثقل يمنعك تأخذ نفس عميق ومريح، خصوصاً قبل النوم؟' },
    { text: 'البلغم ناشب بحلقك ومسوي لك إحراج دايم وتبي تتخلص منه للأبد؟' },
  ],
  painImage: '/images/pain-point-lung.png',
  painImageAlt: 'شخص يعاني من كتمة في الصدر',
  painOverlay: 'لا تخلي الكتمة تسيطر على يومك',
  solutionBadge: 'الحل اللي تدور عليه 🌿',
  solutionTitle: 'رجع لنفسك خفته.. ونظّف صدرك من تراكمات السنين!',
  solutionBody:
    'جبنا لك الخلاصة بتركيبة عشبية طبيعية 100٪، تشتغل من أول استخدام عشان تفكك العوالق وتذيب البلغم المتراكم من الدخان. روتين يومي يريح صدرك ويخليك تتنفس بعمق وكأنك مولود من جديد، بدون أي كيماويات.',
  solutionImage: '/images/solution-lung-spray.png',
  solutionImageAlt: 'بخاخ تنظيف الرئة العشبي مع الأعشاب الطبيعية',
  solutionFeatures: [
    { title: 'ينظف الرئة من آثار الدخان' },
    { title: 'يذيب البلغم ويريح الصدر' },
    { title: 'يوسع الشعب الهوائية' },
    { title: 'ينعش التنفس فوراً' },
  ],
  mechanismTitle: 'كيف يطرد الدخان والترسبات وينظف صدرك حرفياً؟ 🍃',
  mechanismSteps: [
    {
      step: 1,
      title: 'تفكيك ترسبات السنين فوراً',
      desc: 'بمجرد بخات بسيطة بالفم، تتغلغل المستخلصات العشبية القوية لتفكيك طبقات النيكوتين والقطران المتصلبة في ممراتك التنفسية.',
    },
    {
      step: 2,
      title: 'طرد البلغم المزعج وإذابته',
      desc: 'تشتغل الزيوت الطيارة على تذويب البلغم الكثيف وتوسيع الشعب، عشان تتخلص من الكحة الصباحية وتطرد الوصخ بسهولة.',
    },
    {
      step: 3,
      title: 'صدر خفيف ونفس عميق كأنك انولدت من جديد',
      desc: 'يبني لك طبقة حماية تبرد الصدر الملتهب وتمنع جفافه، وترجع لك إحساس الخفة، صدقني بتحس بفرق من أول أسبوع!',
    },
  ],
  ingredientsMainImage: '/images/main-ingredients-lung-spray.png',
  ingredientsMainImageAlt: 'مكونات بخاخ تنظيف الرئة العشبي الطبيعية',
  howToUseSteps: [
    {
      step: 1,
      title: 'رج العبوة جيداً',
      desc: 'قبل كل استخدام، رج العبوة عشان تتجانس المستخلصات العشبية الطبيعية.',
      image: '/images/howto-step-1-shake.png',
    },
    {
      step: 2,
      title: 'بخ داخل الفم',
      desc: 'وجه البخاخ داخل الفم واضغط من 2 إلى 3 بخات لتغطية الممرات التنفسية.',
      image: '/images/howto-step-2-spray.png',
    },
    {
      step: 3,
      title: 'مرتين يومياً',
      desc: 'استخدمه في الصباح لطرد البلغم، وقبل النوم لتنفس عميق ونوم مريح.',
      image: '/images/howto-step-3-routine.png',
    },
  ],
  comparisonRows: [
    { feature: 'المكونات', us: 'خلاصة أعشاب طبيعية 100%', them: 'مركبات كيميائية ومواد مجهولة' },
    { feature: 'الترخيص والأمان', us: 'مطابق لمواصفات الغذاء والدواء (SFDA)', them: 'غالباً مصادر غير معتمدة' },
    { feature: 'الفعالية والنتيجة', us: 'تذويب البلغم وتنظيف عميق للرئة', them: 'تسكين مؤقت وترجع لك الكتمة' },
    { feature: 'الاستخدام اليومي', us: 'تستخدمه يومياً وأنت متطمن', them: 'كثرة استخدامها تسبب جفاف وتعود' },
    { feature: 'ضمان النتيجة', us: 'ارتاح أو نرجع لك فلوسك (30 يوم)', them: 'تدفع فلوسك وتخاطر بدون ضمان' },
  ],
  dayProcess: {
    image: '/images/solution-lung-spray.png',
    imageAlt: 'رجل يستخدم بخاخ نسمة العشبي لتنفس مريح',
    overlayTitle:
      'ينفع لكل اللي يعانون من مشاكل التنفس، خصوصاً المدخنين واللي قطعوا التدخين',
    overlayDesc:
      'راح تحب شعور التنفس العميق من جديد، وودع كتمة الصدر للأبد.',
    phases: SHARED_DAY_PROCESS_PHASES,
  },
  showImageReviews: true,
  reviewsKey: 'herbal-lung-spray',
}

const MOLIEN_DROPS_SECTIONS: ProductPageSections = {
  painAlert: 'تنبيه مهم: لا تتجاهل هذي العلامات الصباحية 🚨',
  painTitle: 'تصحى كل صباح والغثا ناشب بحلقك؟ البلغم المتحجر يقطع نومك ويخرب يومك! ⚠️',
  painBody:
    'البلغم اللي ناشب بحلقك من أول ما تفتح عيونك، الغثيان اللي يخليك ما تقدر تاكل فطورك، والكحة اللي تطلع شيء غثيث كل صباح.. هذي مو مجرد إزعاج، هذي علامة إن بلغمك تحجر وتجمع في صدرك وحلقك طول الليل. كل يوم تتجاهلها، تراكمات أكثر وصدر أثقل ونوم أسوأ.',
  painPoints: [
    { text: 'تصحى الصبح وتحس بغثيان وبلغم ناشب في حلقك ما يروح إلا بالكحة؟' },
    { text: 'تحاول تبلع البلغم المتحجر بس يرجع يجمع ويخنقك كل ليلة؟' },
    { text: 'حلقك متهيج وصوتك مكتوم من أول ما تستيقظ وتبي تخلص من هالعذاب؟' },
  ],
  painImage: '/images/pain-point-lung.png',
  painImageAlt: 'شخص يعاني من بلغم صباحي وغثيان',
  painOverlay: 'لا تخلي البلغم المتحجر يسيطر على صباحك',
  solutionBadge: 'الحل اللي تدور عليه 💧',
  solutionTitle: 'قطرة المولين تذوب البلغم المتحجر من أول يوم!',
  solutionBody:
    'جبنا لك تركيبة المولين العشبية المركّزة، مصممة خصيصاً لإذابة البلغم الكثيف والمتحجر اللي يناشب حلقك كل صباح. قطرات سريعة الامتصاص تشتغل من أول يوم على تليين البلغم وتسهيل طرده، وتريحك من الغثيان والكحة الصباحية بدون أي كيماويات.',
  solutionImage: '/images/mullein-lung-drops.jpg',
  solutionImageAlt: 'قطرة المولين العشبية لإذابة البلغم',
  solutionFeatures: [
    { title: 'يذوب البلغم المتحجر من أول يوم' },
    { title: 'يخفف الغثيان الصباحي والبلغم الناشب' },
    { title: 'يلين الحلق ويريح التهيج' },
    { title: 'طبيعي 100% وآمن للاستخدام اليومي' },
  ],
  mechanismTitle: 'كيف تذوب قطرة المولين البلغم المتحجر؟ 💧',
  mechanismSteps: [
    {
      step: 1,
      title: 'امتصاص سريع تحت اللسان',
      desc: 'بمجرد القطرات، تتغلغل مستخلصات المولين العشبية في الممرات التنفسية وتبدأ تشتغل على تليين البلغم المتحجر فوراً.',
    },
    {
      step: 2,
      title: 'إذابة البلغم وتفكيكه',
      desc: 'التركيبة المركّزة تذوب طبقات البلغم الكثيف اللي تجمع في حلقك وصدرك طول الليل، وتسهّل طرده بدون كحة مزعجة.',
    },
    {
      step: 3,
      title: 'صباح خفيف بدون غثيان',
      desc: 'مع الاستمرار، بتحس إن حلقك نظيف وصدرك أخف، وتصحى بدون بلغم ناشب أو غثيان يخرب بداية يومك!',
    },
  ],
  ingredientsMainImage: '/images/mullein-lung-drops.jpg',
  ingredientsMainImageAlt: 'مكونات قطرة المولين العشبية الطبيعية',
  howToUseSteps: [
    {
      step: 1,
      title: 'رج الزجاجة جيداً',
      desc: 'قبل كل استخدام، رج الزجاجة عشان تتجانس مستخلصات المولين العشبية.',
      image: '/images/howto-step-1-shake.png',
    },
    {
      step: 2,
      title: '15-20 قطرة يومياً',
      desc: 'ضع من 15 إلى 20 قطرة تحت اللسان أو في كوب ماء دافئ، واتركها تمتص.',
      image: '/images/howto-step-2-spray.png',
    },
    {
      step: 3,
      title: 'مرتين يومياً',
      desc: 'استخدمها صباحاً لإذابة البلغم الصباحي، ومساءً قبل النوم لحلق مريح ونوم هادئ.',
      image: '/images/howto-step-3-routine.png',
    },
  ],
  comparisonRows: [
    { feature: 'المكونات', us: 'مستخلص مولين عشبي طبيعي 100%', them: 'مركبات كيميائية ومواد مجهولة' },
    { feature: 'الترخيص والأمان', us: 'مطابق لمواصفات الغذاء والدواء (SFDA)', them: 'غالباً مصادر غير معتمدة' },
    { feature: 'الفعالية والنتيجة', us: 'إذابة البلغم المتحجر من أول يوم', them: 'تسكين مؤقت والبلغم يرجع' },
    { feature: 'الاستخدام اليومي', us: 'قطرات سهلة وآمنة يومياً', them: 'أقراص تسبب غثيان وجفاف' },
    { feature: 'ضمان النتيجة', us: 'ارتاح أو نرجع لك فلوسك (30 يوم)', them: 'تدفع فلوسك وتخاطر بدون ضمان' },
  ],
  dayProcess: {
    image: '/images/mullein-lung-drops.jpg',
    imageAlt: 'قطرة المولين لإذابة البلغم المتحجر',
    overlayTitle:
      'ينفع لكل اللي يصحى على بلغم ناشب أو غثيان صباحي في الحلق',
    overlayDesc:
      'راح تحب شعور الحلق النظيف والصباح الخفيف — ودع البلغم المتحجر للأبد.',
    phases: MOLIEN_DAY_PROCESS_PHASES,
  },
  showImageReviews: false,
  reviewsKey: 'molien-drops',
}

const PRODUCT_PAGE_SECTIONS: Record<string, ProductPageSections> = {
  'herbal-lung-spray': HERBAL_LUNG_SPRAY_SECTIONS,
  'molien-drops': MOLIEN_DROPS_SECTIONS,
}

export function getProductPageSections(slug: string): ProductPageSections {
  return PRODUCT_PAGE_SECTIONS[slug] ?? HERBAL_LUNG_SPRAY_SECTIONS
}

export function hasFullProductPage(slug: string): boolean {
  return slug in PRODUCT_PAGE_SECTIONS
}
