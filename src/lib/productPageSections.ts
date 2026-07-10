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

export interface ResultsSectionContent {
  badge: string
  title: string
  subtitle: string
  /** Animated GIF — native img only (Next/Image breaks animation) */
  gif: string
  gifAlt: string
  gifVideo?: string
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
  video?: string
  imageCaption?: string
  footnote?: string
}

export interface ImageReviewsSectionContent {
  title: string
  subtitle: string
}

export interface FacebookSocialProofItem {
  image: string
  alt: string
  caption?: string
  platform?: string
}

export interface FacebookSocialProofSectionContent {
  badge: string
  title: string
  subtitle: string
  stats: { value: string; label: string }[]
  items: FacebookSocialProofItem[]
  footerText: string
  ctaLabel: string
}

export interface AgitationPoint {
  text: string
}

export interface AgitationSectionContent {
  theme?: 'dark' | 'light'
  alert: string
  title: string
  body: string
  points: AgitationPoint[]
  /** Animated GIF — native img only (Next/Image breaks animation) */
  gif: string
  gifAlt: string
  /** Optional MP4 loop — used when GIF is missing or as smoother fallback */
  gifVideo?: string
  overlay: string
}

export interface ProductPageSections {
  painAlert: string
  painTitle: string
  painBody: string
  painPoints: PainPoint[]
  painImage: string
  painImageAlt: string
  /** Animated GIF for pain section — native img only */
  painGif?: string
  painVideo?: string
  painOverlay: string
  agitation?: AgitationSectionContent
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
  results?: ResultsSectionContent
  beforeAfterComparison?: BeforeAfterContent
  statsSection?: StatsSectionContent
  trustOrigin?: TrustOriginContent
  imageReviewsSection?: ImageReviewsSectionContent
  facebookSocialProof?: FacebookSocialProofSectionContent
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

const HERBAL_LUNG_SPRAY_RESULTS_PHASES: DayProcessPhase[] = [
  {
    period: '',
    title: 'تنفس مريح بدون كتمة',
    benefits: [
      'صدرك ينفك من الثقل — وتاخذ نفس عميق بدون لهث ولا كح',
      'الكتمة اللي كانت تلاحقك طول اليوم تختفي وتحس براحة حقيقية',
    ],
    stat: '95% حسوا بانتعاش وخفة بالصدر',
  },
  {
    period: '',
    title: 'صدر نظيف وبلغم أقل',
    benefits: [
      'الكحة الصباحية والبلغم يخفون — وتصحى صدرك خفيف',
      'مجاري تنفسك توسع وترجع تتنفس طبيعي بدون صفير',
    ],
    stat: '91% لاحظوا فرق واضح في نظافة الصدر',
  },
  {
    period: '',
    title: 'نوم هادئ طول الليل',
    benefits: [
      'تنام بدون كتمة تقطع نومك أو تصفير بصدرك',
      'تصحى نشيط — مو مخنوق من بلغم الصباح',
    ],
    stat: '88% رجعوا ينامون براحة ويتنفسون بعمق',
  },
  {
    period: '',
    title: 'طاقة وحياة طبيعية',
    benefits: [
      'تمشي، تطلع درج، وتعيش يومك بدون ما تهن',
      'تنسى إن الكتمة كانت تتحكم في حياتك — صدرك منشرح طول الوقت',
    ],
    stat: '85% أكدوا إن نشاطهم وطاقتهم رجعوا',
  },
]

const MOLIEN_DAY_PROCESS_PHASES: DayProcessPhase[] = [
  {
    period: 'اليوم 1-3',
    title: 'بداية الراحة',
    benefits: [
      'تحس صدرك صار أخف والكتمة خفّت — أول نفس مريح من زمان',
      'بلغم الصباحي يبدأ يقل وتحس فرق من أول أيام',
    ],
    stat: '93% من عملائنا حسّوا تنفس أسهل بأول 3 أيام — وانت الحين بالدور',
  },
  {
    period: 'اليوم 4-7',
    title: 'راح تلاحظ الفرق',
    benefits: [
      'بلغم الصبح يبدأ يطلع وتتنظف رئتك',
      'الكحة المزعجة تقل بشكل واضح وترتاح',
    ],
    stat: '89% من عملائنا لاحظوا إن البلغم خف ومجاري التنفس تفتحت باليوم السابع',
  },
  {
    period: 'اليوم 7-14',
    title: 'تنفس براحتك',
    benefits: [
      'تحس إن شعبك الهوائية انفتحت وتصفت بالكامل',
      'لا صفير بصدرك ولا ثقل يضايقك لا بالليل ولا بالنهار',
    ],
    stat: '91% من عملائنا حسوا بتنفس صافي ومريح بالأسبوع الثاني',
  },
  {
    period: 'اليوم 14-28',
    title: 'طاقة ونشاط',
    benefits: [
      'نومة أعمق ومريحة طول الليل بدون تقطع',
      'لياقتك تتحسن وتقدر تنجز بيومك وتطلع الدرج بدون تعب',
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
  painImageAlt: 'رجل سعودي يتعب ويتلهث من كتمة الصدر أثناء نزول الدرج',
  painGif: '/images/herbal-lung-spray-pain.gif',
  painOverlay: 'لا تخلي الكتمة تسرق أجمل لحظاتك',
  agitation: {
    alert: 'لا تلف وجهك عن الصورة.. لأن هذا مستقبلك القريب إذا كملت تكابر! ⏳',
    title: 'تحسب الكتمة اللي فيك الحين مجرد "كحة مدخن" وبتروح؟ أنت جالس تدفن رئتك بالحيا!',
    body:
      'القطران والبلغم الأسود جالسين ينصبّون زي الأسمنت في صدرك كل يوم. صرت شايب قبل وقتك.. تلهث من خطوتين، زوجتك تطالعك بشفقة وأنت تصحى مخنوق، وعيالك يفزون بالليل على صوت كحتك اللي تشق الصدر. لا تسلك لنفسك، رئتك قاعدة تنهار وما راح تنتظرك!',
    points: [
      {
        text: 'بعد 6 شهور: كحتك بتفضحك بكل مجلس! ما تقدر تكمل سالفة إلا وصدرك يصفر وتكح لين تدمع عينك.. شكلك بيصير ضعيف قدام ربعك.',
      },
      {
        text: 'بعد سنة: بتودع صحتك تماماً. طلعة الدرج بتصير كابوس، خطوتين وتدور النفس كأنك راكض ماراثون. بتفقد هيبتك وطاقتك حتى في بيتك.',
      },
      {
        text: 'بعد سنتين: بتعيش نفس معاناة الشايب اللي بالصورة.. أجهزة أكسجين، مستشفيات، وتدفع اللي وراك ودونك بس عشان تشتري "نسمة هوا" وممكن ما تفيد!',
      },
    ],
    gif: '/images/herbal-lung-spray-agitation.gif',
    gifVideo: '/videos/herbal-lung-spray-agitation.mp4',
    gifAlt: 'مدخن كبير بالسن مع أنبوب أكسجين — عواقب تجاهل الكتمة والتدخين',
    overlay: 'طالع الصورة زين، وشوف وش ينتظرك لو استمريت تعاند',
  },
  solutionBadge: 'طوق النجاة اللي بينقذ رئتك 🌿',
  solutionTitle: '"غسيل فوري" لصدرك.. بختين بس وتطرد قطران وبلغم السنين!',
  solutionBody:
    'لا تستسلم للكتمة وتنتظر الأسوأ! جبنا لك "المكنسة العشبية" اللي بتنفض صدرك نفض. بختين بس تنزل مباشرة على البلغم المتحجر والقطران اللي ساد مجاريك.. تذوبه وتطلعه غصب. هذي فرصتك ترجع تتنفس براحة، تنام بدون تصفير يطير نومك، وتودع الكحة اللي كسرت هيبتك بالمجالس. طبيعي 100% وبدون كيماويات تزيد الطين بلة.',
  solutionImage: '/images/solution-lung-spray.png',
  solutionImageAlt: 'بخاخ تنظيف الرئة العشبي مع الأعشاب الطبيعية',
  solutionFeatures: [
    { title: 'نسف فوري للبلغم المتحجر بصدرك' },
    { title: 'غسيل عميق لترسبات القطران والنيكوتين' },
    { title: 'فتح مجاري التنفس المقفلة لنفس يرد الروح' },
    { title: 'استرجاع لياقتك ونومتك المريحة بدون كتمة' },
  ],
  mechanismTitle: 'كيف هالبخاخ ينسف سموم السنين من صدرك؟',
  mechanismSteps: [
    {
      step: 1,
      title: 'تكسير "صخور" البلغم والقطران',
      desc: 'بمجرد ما تبخ، المستخلصات العشبية تنزل زي النار على طبقات النيكوتين والبلغم المتحجرة اللي سادة مجاريك من سنين.. وتكسرها تكسير.',
    },
    {
      step: 2,
      title: 'طرد السموم اللي خانقتك',
      desc: 'تذوب البلغم الأسود الثقيل وتوسع لك الشعب الهوائية المقفلة، عشان تطرد هذي السموم برا جسمك بدون ما تكح لين تطلع روحك.',
    },
    {
      step: 3,
      title: 'نفس جديد يملي الرئة',
      desc: 'تنظف صدرك الملتهب وتبني طبقة حماية.. بترجع تسحب هوا نظيف يملي رئتك وتحس بصدرك انشرح وطاقتك رجعت لك من جديد!',
    },
  ],
  mechanismImage: '/images/mechanism-breathing.gif',
  mechanismImageAlt: 'شرح آلية العمل — حركة التنفس والرئتين',
  statsSection: {
    badge: 'نتائج حقيقية لعملاء جربوا وارتاحوا',
    title: 'توقف عن المعاناة • وابدأ تتنفس الحياة',
    subtitle:
      'آلاف السعوديين كانوا يعانون من الكتمة والبلغم مثل وضعك بالضبط.. وهذي النتائج اللي صدمتهم بعد استخدام بخاخ نفس!',
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
    imageAlt: 'بخاخ نفس العشبي يمنحك راحة التنفس',
    video: '/videos/herbal-lung-spray-results-animated.mp4',
    imageCaption: '«كنت أصحى مخنوق من البلغم.. البخاخ هذا حرفياً رجع لي أنفاسي!»',
    footnote: '* بناءً على استبيان رضا عملاء نفس للملتزمين بالروتين اليومي.',
  },
  ingredientsMainImage: '/images/main-ingredients-lung-spray.png',
  ingredientsMainImageAlt: 'مكونات بخاخ تنظيف الرئة العشبي الطبيعية',
  beforeAfterComparison: {
    title: 'شوف الفرق بعينك — قبل وبعد بخاخ نفس',
    subtitle:
      'حرّك الخط في النص يمين ويسار وقارن حالة الرئة والبلغم قبل الروتين وبعده. آلاف السعوديين صدموا لما شافوا الفرق من أول أسبوع!',
    beforeImage: '/images/herbal-lung-spray-before.png',
    afterImage: '/images/herbal-lung-spray-after.png',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeAlt: 'حالة الرئة قبل بخاخ نفس — بلغم متراكم وكتمة',
    afterAlt: 'حالة الرئة بعد بخاخ نفس — رئة أنظف وتنفس مريح',
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
    imageAlt: 'رجل يستخدم بخاخ نفس العشبي لتنفس مريح',
    overlayTitle:
      'طوق النجاة لكل مدخن ولكل شخص انخنق من البلغم والكتمة',
    overlayDesc:
      'تخيل تصحى بكرة صدرك خفيف، وتاخذ نفس عميق بكل راحة.. هذا اللي بيصير لك!',
    phases: SHARED_DAY_PROCESS_PHASES,
  },
  results: {
    badge: 'النتائج اللي راح تحصلها',
    title: 'هذا اللي راح تحس فيه لما تستخدم بخاخ نفس',
    subtitle:
      'مو وعود إعلانية — هذي النتائج اللي حققها آلاف السعوديين: تنفس مريح، صدر منشرح، ونوم بدون كتمة.',
    gif: '/images/herbal-lung-spray-results.gif',
    gifVideo: '/videos/herbal-lung-spray-results.mp4',
    gifAlt: 'رجل يتنفس بعمق على قمة جبل — نتيجة تنفس مريح بعد بخاخ نفس',
    overlayTitle: 'تنفس مريح وصدر منشرح — هذي النتيجة اللي تستحقها',
    overlayDesc:
      'آلاف السعوديين جربوا بخاخ نفس وما رجعوا للكتمة والبلغم. جربه وشوف الفرق بنفسك.',
    phases: HERBAL_LUNG_SPRAY_RESULTS_PHASES,
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
      'ما نبي نمدح منتجنا.. خلنا نسمع من آلاف العملاء اللي كانوا يعانون من البلغم والكتمة وكيف تغيرت حياتهم مع بخاخ نفس.',
  },
  facebookSocialProof: {
    badge: 'تفاعل حقيقي من السعوديين 🇸🇦',
    title: 'شوف الناس وش قاعدين يقولون — تعليقات وتجارب حقيقية!',
    subtitle:
      'مو إعلاناتنا.. هذي لقطات حقيقية من تفاعل السعوديين: يسألون، يجربون، ويشهدون إن بخاخ نَفَس فعلاً يريح الصدر ويخفف الكتمة والبلغم.',
    stats: [
      { value: '+900', label: 'تفاعل وإعجاب على المنشورات' },
      { value: '100%', label: 'يقولون: «منتج فعّال»' },
      { value: '+111', label: 'تعليق يسأل ويطلب التجربة' },
    ],
    items: [
      {
        image: '/images/social-proof/herbal-lung-spray-social-4.png',
        alt: 'منشور بخاخ الرئة — 905 إعجاب وتعليق: ممتاز عن تجربة قبل سنة',
        caption: '«من بعد فضل الله.. هذا العلاج ممتاز عن تجربة قبل سنة»',
        platform: '905+ إعجاب',
      },
      {
        image: '/images/social-proof/herbal-lung-spray-social-2.png',
        alt: '939 إعجاب — «والله ممتاز» من تجربة حقيقية',
        caption: '«والله ممتاز» — رد على سؤال: مين جرب واستفاد؟',
        platform: '939+ إعجاب',
      },
      {
        image: '/images/social-proof/herbal-lung-spray-social-3.png',
        alt: 'تعليق: عن تجربة شخصية منتج ممتاز جداً',
        caption: '«عن تجربه شخصيه.. منتج من الآخر ممتاز جداً»',
        platform: 'تعليق مؤكد',
      },
      {
        image: '/images/social-proof/herbal-lung-spray-social-1.png',
        alt: 'تعليقات: منتج فعال 100% واستفسارات شراء',
        caption: '«ما شاء الله منتج فعال 100%» — وناس تسأل: بكام؟',
        platform: 'تعليقات حية',
      },
      {
        image: '/images/social-proof/herbal-lung-spray-social-5.png',
        alt: 'رسالة عميل: فرق كبير في التنفس وطرد البلغم',
        caption:
          '«التنفس عندي صار فيه فرق كبير.. والبلغم يطلع بطريقة رهيبة» — تجربة بعد الاستخدام',
        platform: 'رسالة عميل',
      },
    ],
    footerText: 'انضم للسعوديين اللي جربوا وارتاحوا — اطلب الحين والدفع عند الاستلام',
    ctaLabel: 'أكمل طلبك — الدفع عند الاستلام 📦',
  },
  showImageReviews: true,
  reviewsKey: 'herbal-lung-spray',
}

const MOLIEN_DROPS_SECTIONS: ProductPageSections = {
  painAlert: 'تنبيه: صدرك يصرخ — وانت تتجاهله؟ ⚠️',
  painTitle: 'كحة، بلغم، وكتمة؟ رئتك محتاجة تنظيف من جوّا مو مسكنات!',
  painBody:
    'مع الغبار بالرياض، الشيشة بالجلسة، والمكيف بالدوام — كلها تتراكم برئتك وتقطع نفسك. مو أول مرة تحس بثقل بصدرك.. بس أول مرة تلقى حل ينظّف وما يغطّي. قطرات المولين من نَفَس تعطيك تنظيف طبيعي 100% من جوّا، بدون كيماويات ولا تعب. لا تخلي الكتمة والبلغم يسيطرون على يومك!',
  painPoints: [
    { text: 'تصحى الفجر وبلغم ثقيل يضايقك — وكل يوم نفس المعاناة؟' },
    { text: 'تحس بكتمة بالليل وما تقدر تاخذ نفسك كامل مع الغبار والحر؟' },
    { text: 'تدخن أو تشيش وتبي تفك رئتك من آثار السنين — قبل لا يتأخر؟' },
  ],
  painImage: '/images/pain-point-lung.png',
  painImageAlt: 'شخص يعاني من كتمة وبلغم',
  painVideo: '/videos/molien-drops-pain-animated.mp4',
  painOverlay: 'لا تخلي الكتمة والبلغم يسيطرون على يومك',
  agitation: {
    theme: 'light',
    alert: 'لا تكابر.. صدرك جالس ينهار من جوّا وأنت تسلّك لنفسك! ⏳',
    title: 'تحسبها مجرد "كحة وتروح"؟ هذا اللي ينتظرك إذا ما نظفت رئتك اليوم!',
    body: 'كل يوم تتجاهل فيه البلغم والكتمة، أنت جالس تبني جدار من السموم داخل رئتك. الغبار، الشيشة، الدخان، وحتى هوا المكيف.. كلها قاعدة تسد مجاري التنفس ببطء. لا تستنى لين يوصل فيك الحال إنك ما تقدر تطلع درج بيتك!',
    points: [
      { text: 'بعد كم شهر: كحتك بتزيد وبتصير تفضحك بالدوام وبالمجالس، وصوت صفير صدرك بيحرمك النوم.' },
      { text: 'بعد سنة: البلغم بيتحجر أكثر، ومناعتك بتقل، وبتصير تلهث من أقل مجهود كأنك شايب.' },
      { text: 'بعد فترة: بتصير ضيف دايم في طوارئ المستشفيات تدور أكسجين عشان بس تاخذ "نفس طبيعي"!' }
    ],
    gif: '',
    gifVideo: '/videos/molien-agitation.mp4',
    gifAlt: 'عواقب إهمال كتمة الصدر والبلغم',
    overlay: 'لا تستنى لين يوصل فيك الحال كذا.. نظّف رئتك اليوم!'
  },
  solutionBadge: 'ليش المولين؟ 🌿',
  solutionTitle: 'ينظّف الرئة من جوّا — مو يغطّي على المشكلة',
  solutionBody:
    'العسل والبخار يعطونك راحة ساعة.. المولين يشتغل على صدرك كل يوم. عكس الحلول المؤقتة، خلاصة المولين المركّزة تشتغل على تطهير الشعب الهوائية، تهدّي الكحة، وتفكّ البلغم — طبيعي 100% ومناسب للاستخدام اليومي مع جو السعودية.',
  solutionImage: '/images/molien-solution.png',
  solutionImageAlt: 'قطرات المولين تُضاف في كوب ماء — تركيبة عشبية مركّزة لإذابة البلغم',
  solutionFeatures: [
    { title: 'يفتح صدرك ويخلي التنفس أسهل من أول أيام' },
    { title: 'يفكّ الكتمة ويطرد البلغم المزعج' },
    { title: 'ينظّف الرئة من آثار التدخين والغبار والمكيف' },
    { title: 'يعزّز مناعتك — مو بس يريّحك ساعة ويخلّص' },
  ],
  mechanismTitle: 'آلية العمل — 3 خطوات وصدرك يفتح 💧',
  mechanismSteps: [
    {
      step: 1,
      title: 'تطهير الشعب الهوائية',
      desc: 'بقطرات بسيطة، تتغلغل خلاصة المولين وتنظّف الممرات التنفسية من الشوائب — آثار الدخان، الغبار، والمكيف اللي يخنقك كل يوم.',
    },
    {
      step: 2,
      title: 'تفكيك البلغم وتهدئة الكحة',
      desc: 'تذوّب البلغم المتراكم وتفكّ الكتمة اللي تضايقك — مو راحة ساعة، لا.. صدرك يفتح وتتنفس براحة.',
    },
    {
      step: 3,
      title: 'تعزيز المناعة وحماية الرئة',
      desc: 'مضادات أكسدة طبيعية تحمي خلايا رئتك وتقلّل الالتهاب — عشان ترجع تتنفس بحرية مو بكتمة.',
    },
  ],
  mechanismImage: '/images/molien-mechanism.png',
  mechanismImageAlt: 'امتصاص قطرة المولين وتأثيرها على الرئة',
  statsSection: {
    badge: 'نتائج حقيقية — يوم بعد يوم',
    title: 'ينفع لكل اللي يعانون من مشاكل التنفس',
    subtitle:
      'خصوصاً المدخنين واللي قطعوا التدخين! راح تحب شعور التنفس العميق من جديد — ودّع كتمة الصدر اللي تضايقك كل ليلة.',
    stats: [
      {
        value: '93',
        suffix: '%',
        desc: 'من عملائنا حسّوا تنفس أسهل بأول 3 أيام — وانت الحين بالدور.',
      },
      {
        value: '89',
        suffix: '%',
        desc: 'لاحظوا إن البلغم خف ومجاري التنفس تفتحت باليوم السابع.',
      },
      {
        value: '91',
        suffix: '%',
        desc: 'حسوا بتنفس صافي ومريح بالأسبوع الثاني، لا صفير ولا ثقل.',
      },
    ],
    image: '/images/molien-breathe-stats.png',
    imageAlt: 'رجل يتنفس براحة مع رئتين سليمتين',
    imageCaption: '«أخيراً صرت أصحى بدون بلغم ناشب — قطرات المولين غيّرت تنفسي»',
    footnote: '* بناءً على تقييمات عملاء نَفَس — النتائج تختلف حسب الالتزام بالروتين اليومي.',
  },
  ingredientsMainImage: '/images/molien-ingredients.png',
  ingredientsMainImageAlt: 'مكونات قطرة المولين العشبية الطبيعية',
  howToUseSteps: [
    {
      step: 1,
      title: 'تحت اللسان مباشرة',
      desc: 'حط من 2 إلى 3 قطرات تحت لسانك واتركها تمتص — أسرع طريقة لامتصاص مستخلص المولين.',
      image: '/images/molien-howto-under-tongue.svg',
      video: '/videos/molien-howto-under-tongue.mp4',
    },
    {
      step: 2,
      title: 'مع كوب ماء دافئ',
      desc: 'أضف من 2 إلى 3 قطرات في نص كوب ماء دافئ واشربها — مناسبة إذا تفضل طريقة أخف على الحلق.',
      image: '/images/molien-howto-glass-water.svg',
      video: '/videos/molien-howto-glass-water.mp4',
    },
  ],
  howToUseTitle: '3 قطرات — مرتين باليوم',
  howToUseSubtitle:
    'تركيبتنا مركّزة — كل اللي تحتاجه من 2 إلى 3 قطرات بس! استخدمها مرتين يومياً — صباحاً ومساءً — ولا تنسى الالتزام عشان تشوف الفرق.',
  comparisonRows: [
    { feature: 'المفعول والنتيجة', us: 'دعم يومي ينظّف الرئة من جوّا ويفك الكتمة', them: 'راحة ساعة وبس وترجع الكتمة (العسل والزنجبيل)' },
    { feature: 'التحضير والوقت', us: 'جاهزة معاك بجيبك — قطرات سريعة بأي وقت', them: 'تعب وتحضير ومفعوله يخلص (البخار والمشروبات)' },
    { feature: 'التركيبة والتركيز', us: 'أعشاب مركّزة ومفحوصة تطرد السموم', them: 'سكر ونكهات على الفاضي (حلاو الحلق العادي)' },
    { feature: 'الترخيص والأمان', us: 'معتمد من الغذاء والدواء السعودية (SFDA)', them: 'منتجات غير معتمدة أو مجهولة المصدر' },
    { feature: 'الضمان', us: 'ضمان 30 يوم (استرجاع كامل بدون أسئلة)', them: 'لا يوجد ضمان، تدفع وتخاطر' },
  ],
  dayProcess: {
    image: '/images/molien-day-process.png',
    imageAlt: 'رجل سعودي يشعر بالراحة بعد استخدام قطرة المولين',
    overlayTitle:
      'لكل اللي يبي يرتاح صدره ويتنفس هواء نظيف',
    overlayDesc:
      'روتين يومي لكل شخص يبي يحافظ على رئته من الغبار، الشيشة، والمكيف.',
    phases: MOLIEN_DAY_PROCESS_PHASES,
  },
  beforeAfterComparison: {
    title: 'شوف الفرق بنفسك — قبل وبعد قطرات المولين',
    subtitle:
      'حرّك الخط في منتصف الصورة لليمين أو اليسار لمقارنة حالة الرئة والبلغم قبل الاستخدام وبعده.',
    beforeImage: '/images/molien-before.png',
    afterImage: '/images/molien-after.png',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    beforeAlt: 'رجل سعودي يعاني من كحة وكتمة في الصدر قبل استخدام قطرات المولين',
    afterAlt: 'رجل سعودي يتنفس براحة وصدره مرتاح بعد استخدام قطرات المولين',
  },
  trustOrigin: {
    badge: 'ثقة ومصدر واضح',
    title: 'من بلدنا — تستخدمه وأنت مطمئن 🇸🇦',
    subtitle:
      'قطرات المولين من نَفَس — تركيبة طبيعية مركّزة، تُصنَّع في السعودية ومعتمدة من هيئة الغذاء والدواء.',
    body:
      'جودة تثق فيها لصدرك ورئتك — ولا تنتظر لين تتفاقم الكتمة. كل دفعة تمر بفحص مخبري قبل ما توصلك، وكل مكون اخترناه بناءً على دراسات تثبت فعاليته في توسيع الشعب الهوائية وطرد السموم.',
    countryLabel: 'بلد المنشأ',
    countryValue: 'المملكة العربية السعودية 🇸🇦',
    image: '/images/molien-trust-origin.png',
    imageAlt: 'مكونات قطرة المولين الطبيعية في مختبر معتمد — جودة وثقة',
    points: [
      {
        title: 'معتمد SFDA',
        desc: 'تركيبة آمنة ومطابقة لمعايير هيئة الغذاء والدواء السعودية — تستخدمها وأنت مطمئن.',
      },
      {
        title: 'صنع في السعودية',
        desc: 'منتج محلي يُصنَّع ويُعبَّأ بمعايير جودة عالية تناسب السوق السعودي.',
      },
      {
        title: 'جودة مختبرية',
        desc: 'مكونات طبيعية مفحوصة بمعايير جودة عالية — كل دفعة تمر بفحص قبل ما توصلك.',
      },
      {
        title: 'توصيل ودفع مريح',
        desc: 'توصيل لجميع مناطق المملكة مع خيار الدفع عند الاستلام — بدون تعقيد.',
      },
    ],
  },
  imageReviewsSection: {
    title: 'شوف وش يقولون أهل السعودية بعد ما جربوه 💬',
    subtitle:
      'تجارب موثقة من رجال بالرياض وجدة والدمام — جربوا قطرات المولين وشافوا الفرق بأنفسهم.',
  },
    showImageReviews: true,
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
