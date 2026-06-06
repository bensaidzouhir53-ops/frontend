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
    title: 'صدمة الانتعاش',
    benefits: [
      'جبل وانزاح عن صدرك.. الكتمة تخف بشكل مجنون',
      'أول نفس عميق تاخذه وتستمتع فيه من سنين طويلة!',
    ],
    stat: '95% صُدموا من سهولة التنفس بأول 3 أيام',
  },
  {
    period: 'اليوم 4-7',
    title: 'طرد السموم',
    benefits: [
      'البلغم الغثيث حق الصباح يبدأ يطلع ويتنظف',
      'الكحة المزعجة اللي تفضحك تختفي تدريجياً',
    ],
    stat: '91% لاحظوا إن صدرهم تخلص من البلغم باليوم السابع',
  },
  {
    period: 'اليوم 7-14',
    title: 'رئة جديدة',
    benefits: [
      'تحس إن مجاري التنفس توسعت وتنظفت بالكامل',
      'صوت التصفير بصدرك وقت النوم يختفي تماماً',
    ],
    stat: '88% حسوا كأنهم رجعوا يتنفسون برئة جديدة بالأسبوع الثاني',
  },
  {
    period: 'اليوم 14-28',
    title: 'طاقة وحياة',
    benefits: [
      'نومة أعمق ومريحة طوال الليل بدون ما تصحى مخنوق',
      'لياقتك ترجع لك وتقدر تطلع درج أو تمارس رياضتك بدون لهث',
    ],
    stat: '85% أكدوا إن طاقتهم ونشاطهم اليومي تضاعف مع الاستمرار',
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
  painAlert: 'عايش بـ "نصف نفس"؟ الدخان والكتمة جالسين يسرقون راحتك ببطء! 🚨',
  painTitle: 'صدرك مقفول ومخنوق؟ البلغم الناشب والكحة اللي تفضحك هي صرخة من رئتك تطلب النجدة! ⚠️',
  painBody:
    'كل صباح تصحى على كحة مزعجة وبلغم غثيث تحاول تطلعه بدون فايدة.. تحس إن صدرك ثقيل ومكتوم حتى مع أقل مجهود. هذي مو مجرد "كحة مدخن"، هذي سموم وترسبات سنين من الدخان والشيشة جالسة تخنق رئتيك وتسد مجاري التنفس! لا تنتظر لين تفقد قدرتك على أخذ نفس عميق براحة وتصير الكتمة جزء من شخصيتك.',
  painPoints: [
    { text: 'غثيان الصباح والكحة الناشفة: تصحى وكبدك تقلب لين تطلع البلغم الغثيث اللي ناشب بحلقك.' },
    { text: 'كتمة وثقل بالصدر: تحس بوزن على صدرك يمنعك تتنفس بعمق، وتلهث من أقل مجهود.' },
    { text: 'إحراج مستمر ونوم متقطع: كحتك تفضحك بالمجالس، وصوت التصفير بصدرك يطير نومك.' },
  ],
  painImage: '/images/pain-point-lung.png',
  painImageAlt: 'شخص يعاني من كتمة في الصدر وصعوبة بالتنفس',
  painOverlay: 'لا تخلي الكتمة تسرق أجمل لحظاتك',
  solutionBadge: 'الفرصة اللي بتغير حياتك 🌿',
  solutionTitle: 'تخيل تصحى بكرة وتتنفس بعمق كأنك مولود من جديد.. بدون كحة ولا بلغم!',
  solutionBody:
    'جبنا لك الخلاصة العشبية المركزة اللي تشتغل زي "المكنسة الطبيعية" لرئتك. بختين بس، تتغلغل وتفكك ترسبات السنين، تذيب البلغم المتحجر، وتوسع لك الشعب الهوائية. هذا مو مجرد منتج، هذي فرصتك ترجع لنفسك راحتها، نومها العميق، وطاقتها، وتودع الإحراج.. طبيعي 100٪ وبدون أي كيماويات.',
  solutionImage: '/images/solution-lung-spray.png',
  solutionImageAlt: 'بخاخ تنظيف الرئة العشبي مع الأعشاب الطبيعية',
  solutionFeatures: [
    { title: 'إذابة فورية للبلغم المتحجر' },
    { title: 'تنظيف عميق لترسبات النيكوتين' },
    { title: 'توسيع الشعب الهوائية لنفس أعمق' },
    { title: 'حماية وراحة مستدامة لصدرك' },
  ],
  mechanismTitle: 'كيف هالبخاخ السحري ينظف صدرك من سموم السنين؟ 🍃',
  mechanismSteps: [
    {
      step: 1,
      title: 'تفكيك صخور البلغم',
      desc: 'بمجرد بخات بسيطة، تتغلغل المستخلصات لتفكيك طبقات النيكوتين والبلغم المتحجرة في مجاري التنفس اللي لها سنين متراكمة.',
    },
    {
      step: 2,
      title: 'طرد السموم براحة',
      desc: 'تذيب البلغم الكثيف وتوسع الشعب الهوائية، عشان تتخلص من الكحة الصباحية وتطرد السموم بسهولة وبدون مجهود يجرح حلقك.',
    },
    {
      step: 3,
      title: 'انتعاش وتنفس عميق',
      desc: 'تبني طبقة حماية تبرد الصدر الملتهب وتعطيك إحساس فوري بالخفة.. بترجع تاخذ نفس عميق يملي الرئة وتحس بالنشاط يرجع لجسمك!',
    },
  ],
  mechanismImage: '/images/mechanism-breathing.gif',
  mechanismImageAlt: 'شرح آلية العمل — حركة التنفس والرئتين',
  statsSection: {
    badge: 'نتائج حقيقية لعملاء جربوا وارتاحوا',
    title: 'توقف عن المعاناة • وابدأ تتنفس الحياة',
    subtitle:
      'آلاف السعوديين كانوا يعانون من الكتمة والبلغم مثل وضعك بالضبط.. وهذي النتائج اللي صدمتهم بعد استخدام بخاخ نسمة!',
    stats: [
      {
        value: '95',
        suffix: '%',
        desc: 'حسوا بانتعاش فوري وخفة بالصدر من أول يوم استخدام، وكأن جبل وانزاح عن صدرهم.',
      },
      {
        value: '91',
        suffix: '%',
        desc: 'تخلصوا من الكحة الصباحية والبلغم الغثيث خلال أول أسبوع بس.. صاروا يصحون بنشاط.',
      },
      {
        value: '88',
        suffix: '%',
        desc: 'رجعوا يمارسون حياتهم ونشاطهم الطبيعي بدون ما يلهثون، مع نوم أعمق بكثير بعد شهر من الاستمرار.',
      },
    ],
    image: '/images/solution-lung-spray.png',
    imageAlt: 'بخاخ نسمة العشبي يمنحك راحة التنفس',
    imageCaption: '«كنت أصحى مخنوق من البلغم.. البخاخ هذا حرفياً رجع لي أنفاسي!»',
    footnote: '* بناءً على استبيان رضا عملاء نسمة للملتزمين بالروتين اليومي.',
  },
  ingredientsMainImage: '/images/main-ingredients-lung-spray.png',
  ingredientsMainImageAlt: 'مكونات بخاخ تنظيف الرئة العشبي الطبيعية',
  beforeAfterComparison: {
    title: 'شوف الفرق بعينك — قبل وبعد بخاخ نسمة 🌿',
    subtitle:
      'حرّك الخط في النص يمين ويسار وقارن حالة الرئة والبلغم قبل الروتين وبعده. آلاف السعوديين صدموا لما شافوا الفرق من أول أسبوع!',
    beforeImage: '/images/herbal-lung-spray-before.png',
    afterImage: '/images/herbal-lung-spray-after.png',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeAlt: 'حالة الرئة قبل بخاخ نسمة — بلغم متراكم وكتمة',
    afterAlt: 'حالة الرئة بعد بخاخ نسمة — رئة أنظف وتنفس مريح',
  },
  howToUseSteps: [
    {
      step: 1,
      title: 'رج العبوة زين',
      desc: 'حركة بسيطة عشان تتجانس المستخلصات العشبية القوية وتكون جاهزة للعمل.',
      image: '/images/howto-step-1-shake.png',
    },
    {
      step: 2,
      title: 'بختين بس بالفم',
      desc: 'وجه البخاخ واضغط مرتين لثلاث.. عشان تغطي الممرات التنفسية بالكامل وتبدأ الإذابة.',
      image: '/images/howto-step-2-spray.png',
    },
    {
      step: 3,
      title: 'مرتين باليوم وتودع الكتمة',
      desc: 'الصباح لطرد بلغم الليل، وقبل النوم عشان تنام نومة عميقة بدون تصفير بصدرك.',
      image: '/images/howto-step-3-routine.png',
    },
  ],
  howToUseTitle: '3 خطوات بس.. وتودع الكتمة للأبد',
  howToUseSubtitle:
    'روتين يومي سحري ما ياخذ من وقتك 10 ثواني، بس يضمن لك صدر نظيف وتنفس مريح طوال اليوم.',
  comparisonRows: [
    { feature: 'المكونات وتأثيرها', us: 'خلاصة عشبية نقية 100% تنظف بعمق', them: 'مواد كيميائية مسكنة ترهق الكبد' },
    { feature: 'النتيجة بعد الاستخدام', us: 'طرد للبلغم وراحة مستدامة طويلة الأمد', them: 'تسكين مؤقت لكم ساعة وترجع الكتمة أقوى' },
    { feature: 'الأمان والاعتماد', us: 'مفحوص ومصرح من الغذاء والدواء (SFDA)', them: 'منتجات مجهولة المصدر والمكونات' },
    { feature: 'الاستخدام اليومي', us: 'آمن جداً ويعالج المشكلة من جذورها', them: 'يسبب جفاف وتعود مع كثرة الاستخدام' },
    { feature: 'الضمان', us: 'ضمان ذهبي 30 يوم (استرداد كامل)', them: 'مغامرة بفلوسك وصحتك بدون أي ضمان' },
  ],
  dayProcess: {
    image: '/images/herbal-lung-spray-day-process.png',
    imageAlt: 'رجل يستخدم بخاخ نسمة العشبي لتنفس مريح',
    overlayTitle:
      'طوق النجاة لكل مدخن ولكل شخص انخنق من البلغم والكتمة',
    overlayDesc:
      'تخيل تصحى بكرة صدرك خفيف، وتاخذ نفس عميق بكل راحة.. هذا اللي بيصير لك!',
    phases: SHARED_DAY_PROCESS_PHASES,
  },
  trustOrigin: {
    badge: 'ثقة وأمان',
    title: 'جودة سعودية.. تستخدمه وأنت مغمض 🇸🇦',
    subtitle:
      'عارفين إنك تخاف تدخل أي شي بجسمك.. عشان كذا جبنا لك منتج مصرح، موثوق، وبمعايير عالمية.',
    body:
      'تركيبتنا العشبية مرت بأدق الفحوصات المخبرية، ومصرحة رسمياً من هيئة الغذاء والدواء (SFDA). هذا يعني إنك تستخدم منتج آمن 100%، خالي من أي مواد ضارة، ومصمم خصيصاً ليناسب بيئتنا ويحل مشاكلك من الجذور. اطلب وأنت متطمن، صحتك في أيد أمينة.',
    countryLabel: 'الاعتماد',
    countryValue: 'هيئة الغذاء والدواء (SFDA) ✔️',
    image: '/images/herbal-lung-spray-trust-origin.png',
    imageAlt: 'مكونات طبيعية في مختبر معتمد — جودة وثقة',
    points: [
      {
        title: 'اعتماد رسمي',
        desc: 'مصرح من الغذاء والدواء السعودية (SFDA).'
      },
      {
        title: 'طبيعي ونقي',
        desc: 'أعشاب طبيعية مختارة بعناية بدون أي إضافات كيميائية.'
      },
      {
        title: 'دفع عند الاستلام',
        desc: 'لا تدفع ولا ريال لين يوصلك الطلب بيدك وتتأكد منه.'
      },
      {
        title: 'ضمان ذهبي',
        desc: 'لو ما حسيت بفرق واضح في تنفسك.. فلوسك ترجع لك.'
      }
    ]
  },
  imageReviewsSection: {
    title: 'قصص نجاح حقيقية.. من الكتمة لقمة النشاط! 💬',
    subtitle:
      'ما نبي نمدح منتجنا.. خلنا نسمع من آلاف العملاء اللي كانوا يعانون من البلغم والكتمة وكيف تغيرت حياتهم مع بخاخ نسمة.',
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
