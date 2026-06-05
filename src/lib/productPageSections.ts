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
  video?: string
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

export interface BeforeAfterContent {
  title: string
  subtitle: string
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
  beforeAlt: string
  afterAlt: string
}

export interface TrustOriginPoint {
  title: string
  desc: string
}

export interface TrustOriginContent {
  badge: string
  title: string
  subtitle: string
  body: string
  countryLabel: string
  countryValue: string
  image: string
  imageAlt: string
  points: TrustOriginPoint[]
}

export interface StatsSectionStat {
  value: string
  suffix?: string
  desc: string
}

export interface StatsSectionContent {
  badge: string
  title: string
  subtitle?: string
  stats: StatsSectionStat[]
  image: string
  imageAlt: string
  imageCaption?: string
  footnote?: string
}

export interface ImageReviewsSectionContent {
  title: string
  subtitle: string
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
  mechanismImage: string
  mechanismImageAlt: string
  ingredientsMainImage: string
  ingredientsMainImageAlt: string
  howToUseSteps: HowToUseStep[]
  howToUseTitle: string
  howToUseSubtitle: string
  comparisonRows: ComparisonRow[]
  dayProcess: DayProcessContent
  beforeAfterComparison?: BeforeAfterContent
  statsSection?: StatsSectionContent
  trustOrigin?: TrustOriginContent
  imageReviewsSection?: ImageReviewsSectionContent
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
      'غثيان الصباح يخف بشكل ملحوظ وتقدر تفطر براحة',
    ],
    stat: '93% من عملائنا لاحظوا حلق أخف وتنفس أسهل بأول 3 أيام',
  },
  {
    period: 'اليوم 4-7',
    title: 'طرد السموم',
    benefits: [
      'صدرك يبدأ ينظف والكحة المزعجة تقل',
      'تحس إن مجرى التنفس صار أوسع',
    ],
    stat: '89% من عملائنا لاحظوا إن البلغم خف ومجاري التنفس تفتحت باليوم السابع',
  },
  {
    period: 'اليوم 7-14',
    title: 'التنفس العميق',
    benefits: [
      'الكتمة تختفي! لا صفير بالصدر',
      'تقدر تاخذ نفس عميق يملي الرئة بدون ما تكح',
    ],
    stat: '91% من عملائنا حسوا بتنفس صافي ومريح بالأسبوع الثاني',
  },
  {
    period: 'اليوم 14-28',
    title: 'النشاط والحيوية',
    benefits: [
      'نومتك تصير أعمق، لياقتك تتحسن',
      'تودع البلغم الناشب للأبد!',
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
  mechanismImage: '/images/mechanism-breathing.gif',
  mechanismImageAlt: 'شرح آلية العمل — حركة التنفس والرئتين',
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
  howToUseTitle: '3 خطوات بسيطة لراحة تدوم',
  howToUseSubtitle:
    'روتين يومي سهل وسريع يضمن لك أفضل نتيجة لتنظيف الصدر وتوسيع الشعب الهوائية.',
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
  painAlert: 'تعبت من الكحة اللي تفضحك بالمجالس؟ ⚠️',
  painTitle: 'البلغم الناشب بحلقك أول ما تصحى مو بس "شي يغث".. هذا إنذار من جسمك!',
  painBody:
    'تراكمات الدخان، الشيشة، الغبار، ومكيفات التبريد جالسة تخنق رئتيك يوم بعد يوم. البلغم اللي ناشب بحلقك من أول ما تفتح عيونك، الغثيان اللي يخليك ما تقدر تاكل فطورك، والكحة اللي تطلع شيء غثيث كل صباح.. هذي علامة إن بلغمك تحجر وتجمع في صدرك وحلقك طول الليل. لا تخلي البلغم المتحجر يسرق راحتك ويخرب يومك من أوله!',
  painPoints: [
    { text: 'غثيان الصباح: تصحى وكبدك تقلب، وما تقدر تفطر لين تطلع البلغم.' },
    { text: 'كتمة الصدر: تحس بوزن ثقيل على صدرك، وما تقدر تاخذ نفس عميق يملي الرئة.' },
    { text: 'كحة الإحراج: كحة مستمرة وناشفة تحرجك بالدوام، وبالمجالس، وقدام ضيوفك.' },
    { text: 'نوم متقطع: تقوم من عز نومك مخنوق تدور الهوا، وصوت شخير أو تصفير بصدرك.' },
  ],
  painImage: '/images/pain-point-lung.png',
  painImageAlt: 'شخص يعاني من بلغم صباحي وغثيان',
  painOverlay: 'لا تخلي الكتمة تسيطر على يومك',
  solutionBadge: 'الحل اللي تدور عليه 💧',
  solutionTitle: 'قطرة المولين من نسمة: "غسيل طبيعي" لرئتيك!',
  solutionBody:
    'جبنا لك خلاصة الطبيعة بتركيز عالي جداً. قطرة المولين مو مسكن مؤقت، هذي تركيبة عشبية سريعة الامتصاص تنزل مباشرة على البلغم الكثيف والمتحجر.. تفككه، تذيبه، وتطلعه بدون كحة تجرح حلقك. تريحك من الغثيان والكحة الصباحية بدون أي كيماويات.',
  solutionImage: '/images/molien-solution.png',
  solutionImageAlt: 'قطرة المولين تُضاف في كوب ماء — تركيبة عشبية مركّزة لإذابة البلغم',
  solutionFeatures: [
    { title: 'تذيب طبقات البلغم المتحجر فوراً' },
    { title: 'تريحك من الغثيان الصباحي' },
    { title: 'تفتح الشعب الهوائية وتوسع التنفس' },
    { title: 'تركيز عالي: قطرات بسيطة تكفيك' },
  ],
  mechanismTitle: 'كيف تذوب قطرة المولين البلغم المتحجر؟ 💧',
  mechanismSteps: [
    {
      step: 1,
      title: 'امتصاص فوري',
      desc: 'تحت اللسان أو مع موية دافية، تتغلغل مستخلصات المولين في مجاري التنفس وتبدأ تشتغل على تليين البلغم المتحجر فوراً.',
    },
    {
      step: 2,
      title: 'إذابة الصخور',
      desc: 'تذيب طبقات البلغم الكثيف اللي له سنين متراكم في صدرك، وتسهّل طرده بدون كحة تجرح حلقك.',
    },
    {
      step: 3,
      title: 'تنفس براحة',
      desc: 'تفتح الشعب الهوائية، تهدّي التهيج، وتخليك تصحى الصبح خفيف ونشيط بدون غثيان يخرب بداية يومك!',
    },
  ],
  mechanismImage: '/images/molien-mechanism.png',
  mechanismImageAlt: 'امتصاص قطرة المولين وتأثيرها على الرئة والجهاز الهضمي',
  statsSection: {
    badge: 'نتائج حقيقية من عملائنا',
    title: 'وقف العذاب • وابدأ تتنفس براحة',
    subtitle:
      'آلاف السعوديين جربوا قطرة المولين — وهذي أبرز النتائج اللي لاحظوها مع الاستمرار، مو كلام فاضي.',
    stats: [
      {
        value: '93',
        suffix: '%',
        desc: 'من عملائنا حسّوا حلق أخف وبلغم أقل من أول 3 أيام — الصباح صار أسهل بكثير.',
      },
      {
        value: '90',
        suffix: '%',
        desc: 'لاحظوا إن البلغم المتحجر يذوب ويطلع بسهولة خلال أسبوع — بدون كحة تفضحك.',
      },
      {
        value: '87',
        suffix: '%',
        desc: 'مع الاستمرار شهر كامل حسّوا صدر أنظف وتنفس أعمق — وكأنهم رجعوا يتنفسون من جديد.',
      },
    ],
    image: '/images/molien-breathe-stats.png',
    imageAlt: 'امرأة سعودية تشعر بالراحة بعد استخدام قطرة المولين العشبية',
    imageCaption: '«أخيراً صرت أصحى بدون بلغم ناشب — قطرة المولين غيّرت صباحي»',
    footnote: '* بناءً على تقييمات واستبيانات عملاء نسمة — النتائج تختلف حسب الالتزام بالروتين اليومي.',
  },
  ingredientsMainImage: '/images/molien-ingredients.png',
  ingredientsMainImageAlt: 'مكونات قطرة المولين العشبية — أوراق المولين والأعشاب الطبيعية',
  howToUseSteps: [
    {
      step: 1,
      title: 'تحت اللسان مباشرة',
      desc: 'لأسرع نتيجة: ضع من 2 إلى 4 قطرات فقط تحت اللسان واتركها تمتص — الطريقة الأسرع لامتصاص مستخلصات المولين.',
      image: '/images/molien-howto-under-tongue.svg',
      video: '/videos/molien-howto-under-tongue.mp4',
    },
    {
      step: 2,
      title: 'مع كوب ماء دافئ',
      desc: 'طريقة ثانية: أضف من 2 إلى 4 قطرات في نص كوب ماء دافئ واشربها — مناسبة إذا تفضل طريقة أخف على الحلق.',
      image: '/images/molien-howto-glass-water.svg',
      video: '/videos/molien-howto-glass-water.mp4',
    },
  ],
  howToUseTitle: 'طريقتين سهلتين للاستخدام',
  howToUseSubtitle:
    'بما أن تركيبتنا مُركزة جداً (High Potency)، كل اللي تحتاجه هو من قطرتين إلى 4 قطرات فقط! استخدمها مرتين يومياً صباحاً ومساءً.',
  comparisonRows: [
    { feature: 'المكونات', us: 'مستخلص مولين عشبي طبيعي 100%', them: 'مركبات كيميائية ومواد مجهولة' },
    { feature: 'الترخيص والأمان', us: 'مطابق لمواصفات الغذاء والدواء (SFDA)', them: 'غالباً مصادر غير معتمدة' },
    { feature: 'الفعالية والنتيجة', us: 'إذابة البلغم المتحجر من أول يوم', them: 'تسكين مؤقت والبلغم يرجع' },
    { feature: 'الاستخدام اليومي', us: 'قطرات سهلة وآمنة يومياً', them: 'أقراص تسبب غثيان وجفاف' },
    { feature: 'ضمان النتيجة', us: 'ارتاح أو نرجع لك فلوسك (30 يوم)', them: 'تدفع فلوسك وتخاطر بدون ضمان' },
  ],
  dayProcess: {
    image: '/images/molien-day-process.png',
    imageAlt: 'رجل سعودي يشعر بالراحة بعد استخدام قطرة المولين لإذابة البلغم المتحجر',
    overlayTitle:
      'ينفع لكل اللي يصحى على بلغم ناشب أو غثيان صباحي في الحلق',
    overlayDesc:
      'راح تحب شعور الحلق النظيف والصباح الخفيف — ودع البلغم المتحجر للأبد.',
    phases: MOLIEN_DAY_PROCESS_PHASES,
  },
  beforeAfterComparison: {
    title: 'شوف الفرق بنفسك — قبل وبعد قطرة المولين',
    subtitle:
      'حرّك الخط في منتصف الصورة لليمين أو اليسار لمقارنة حالة الرئة والبلغم قبل الاستخدام وبعده.',
    beforeImage: '/images/molien-before.png',
    afterImage: '/images/molien-after.png',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeAlt: 'حالة الرئة قبل استخدام قطرة المولين — بلغم متحجر وانسداد',
    afterAlt: 'حالة الرئة بعد استخدام قطرة المولين — رئتين نظيفتين وتنفس مريح',
  },
  trustOrigin: {
    badge: 'ثقة ومصدر واضح',
    title: 'من بلدنا — تستخدمه وأنت مطمّن 🇸🇦',
    subtitle:
      'قطرة المولين مو كلام فاضي؛ تركيبة طبيعية ومصدرها واضح قدامك، مصنوعة على مقاس السوق السعودي.',
    body:
      'نعرف إنك تبي شي يطلع من بلدك وتثق فيه — مو منتجات غامضة من برّا. مكوناتنا الطبيعية تمر بفحوصات جودة في مختبرات معتمدة، والمنتج مطابق لمواصفات هيئة الغذاء والدواء (SFDA). استخدمها وأنت مرتاح؛ من بلدنا وللسعوديين اللي يدورون على حل عشبي موثوق.',
    countryLabel: 'بلد المنشأ',
    countryValue: 'المملكة العربية السعودية 🇸🇦',
    image: '/images/molien-trust-origin.png',
    imageAlt: 'مكونات قطرة المولين الطبيعية في مختبر معتمد — جودة وثقة',
    points: [
      {
        title: 'صنع في السعودية',
        desc: 'المنتج يطلع من بلدنا ويخدم احتياج السوق السعودي — مو استيراد مجهول المصدر.',
      },
      {
        title: 'معتمد SFDA',
        desc: 'مطابق لمواصفات هيئة الغذاء والدواء — تستخدمه وأنت مطمّن على الأمان.',
      },
      {
        title: 'جودة مختبرية',
        desc: 'مكونات طبيعية مفحوصة بمعايير جودة عالية قبل ما توصل لباب بيتك.',
      },
      {
        title: 'توصيل ودفع مريح',
        desc: 'نوصل لكل مناطق المملكة والدفع عند الاستلام — تطلب وأنت مرتاح.',
      },
    ],
  },
  imageReviewsSection: {
    title: 'تجارب حقيقية من ناس عانوا مثلك.. وارتاحوا! 💬',
    subtitle:
      'عملاء من الرياض وجدة والدمام وغيرها جربوا قطرة المولين وارتاحوا من الكتمة والغثيان. لا تأخذ كلامنا — اسمع منهم بلهجتهم.',
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
