/**
 * Single source of truth for all portfolio copy, links, experience, projects,
 * speaking, and achievements. Update values here without editing components.
 *
 * Placeholders in square brackets (e.g. "[CV_LINK]", "[DATES]", "[PHOTO_URL]")
 * are detected automatically by the UI and upgraded to live links/images once
 * you replace them with real URLs or text.
 */

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
  handle: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  context?: string;
  role: string;
  dates: string;
  highlights: string[];
  isPlaceholderHighlights?: boolean;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export type ProjectCategory = 'Production' | 'Personal';

export type ProjectMockupId =
  | 'nology-mobile'
  | 'kabsa'
  | 'nesterverify'
  | 'whoosh'
  | 'greamit'
  | 'striit'
  | 'emc-portal'
  | 'runway';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  platform: string;
  mockupId: ProjectMockupId;
  problem: string;
  /** Optional: omit when there's no specific decision worth calling out. */
  decision?: string;
  shipped: string;
  tech: string[];
  links: ProjectLink[];
}

export interface SpeakingItem {
  id: string;
  kind: string;
  title: string;
  organization: string;
  date?: string;
  summary: string;
  links?: ProjectLink[];
}

export interface StoryChapter {
  id: string;
  label: string;
  title: string;
  body: string;
  chips: string[];
  isNow?: boolean;
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  platform: 'Dev.to' | 'Hashnode' | 'Medium';
  date: string;
  readMinutes: number;
  url: string;
  tags: string[];
}

export type QuestId =
  | 'first-steps'
  | 'completionist'
  | 'shapeshifter'
  | 'night-and-day'
  | 'recruiter-mode'
  | 'bookworm'
  | 'say-hi'
  | 'secret-flutter';

export interface QuestItem {
  id: QuestId;
  title: string;
  hint: string;
  xp: number;
  secret?: boolean;
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  detail: string;
}

export function isPlaceholderValue(value?: string): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  return trimmed.length === 0 || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

export const siteContent = {
  meta: {
    name: 'Idris Idris',
    role: 'Software Engineer',
    location: 'Lagos, Nigeria',
    availability: 'Available for remote senior roles, contract work & code review',
    email: 'idrisade.eedris@gmail.com',
    copyright: '© 2026 Idris Idris',
  },

  nav: [
    { label: 'Story', href: '#story' },
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
    { label: 'Writing', href: '#writing' },
    { label: 'Speaking', href: '#speaking' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],

  /** Every section id, in page order. Drives scroll-spy and the Explorer quest. */
  sectionIds: ['hero', 'story', 'experience', 'work', 'writing', 'speaking', 'achievements', 'contact'],

  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/IdrisAdeyemi01',
      handle: 'github.com/IdrisAdeyemi01',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/idris-idris',
      handle: 'linkedin.com/in/idris-idris',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:idrisade.eedris@gmail.com',
      handle: 'idrisade.eedris@gmail.com',
    },
  ] as SocialLink[],

  hero: {
    name: 'Idris Idris',
    greeting: "Hi, I'm Idris Idris.",
    title: 'Software Engineer',
    pills: ['Software Engineer @ Nology Store', 'Flutter & Dart', 'Remote since 2021'],
    pitch: "I treat every feature I build like I'm its CEO.",
    subcopy:
      'I ship production Flutter apps on iOS and Android for fintech, logistics, and e-commerce teams. I own features end to end: architecture, analytics, security, and the code review that keeps it all honest. Open to remote senior roles, contracts, and AI evaluation or code review work.',
    primaryCta: {
      label: 'View my work',
      href: '#work',
    },
    secondaryCta: {
      label: 'Download CV',
      url: 'https://drive.google.com/file/d/1uGXFhvBmm89MwqvO-qp2RTMP8q8lXn-B/view?usp=sharing',
    },
    // Google Drive image link (file must stay shared as "Anyone with the link").
    photoUrl: 'https://drive.google.com/thumbnail?id=1zmjAOpJDKVxhc_6NtPiDBxq2AXzv2SWH&sz=w800',
    photoAlt: 'Portrait of Idris Idris, Software Engineer',
  },

  /** Real, checkable numbers only. */
  stats: [
    { value: 5, suffix: '+', label: 'Years shipping Flutter apps' },
    { value: 7, label: 'Remote teams shipped with' },
    { value: 6, label: 'Apps live on the stores' },
    { value: 5000, suffix: '+', label: 'Community support requests handled' },
  ] as StatItem[],

  about: {
    heading: 'Story',
    lead: 'From Chemical Engineering to owning production mobile systems end to end.',
    chapters: [
      {
        id: 'switch',
        label: 'Chapter 1 · The switch',
        title: 'A chemical engineer who fell for Flutter',
        body:
          'I studied Chemical Engineering at the University of Lagos and taught myself software on the side. By December 2020 I was writing beginner guides to Flutter, and in 2021 I took my first role as a mobile developer at Dynatech, turning complex designs into reusable Flutter components.',
        chips: ['University of Lagos', 'Self-taught', 'Dynatech'],
      },
      {
        id: 'builder',
        label: 'Chapter 2 · The builder',
        title: 'Shipping for fintech, logistics, and US teams, all remote',
        body:
          'Over the next few years I shipped production apps remotely: a KYC flow that halved verification time at ErrandPay, rider and customer apps with live tracking and chat at Whoosh, fintech features at Mabilla Group, and client apps for US-based teams at Dished Holdings and OkoroTech.',
        chips: ['ErrandPay', 'Dished Holdings', 'OkoroTech', 'Mabilla Group', 'Whoosh'],
      },
      {
        id: 'owner',
        label: 'Chapter 3 · The owner',
        title: "Every feature gets a CEO, and it's me",
        body:
          "Today I'm a Software Engineer at Nology Store. Before I write a line of code, I study competitors to find what should be better, then own the feature end to end: architecture, analytics, security, and release. I also speak about it, most recently on securing AI features in Flutter at DevFest Ibadan 2026.",
        chips: ['Nology Store', 'DevFest Ibadan 2026'],
        isNow: true,
      },
    ] as StoryChapter[],
    skillsHeading: 'Core skills & tooling',
    skillGroups: [
      {
        category: 'Mobile & State',
        items: ['Flutter', 'Dart', 'BLoC/Cubit', 'GetX', 'CustomPainter & animations'],
      },
      {
        category: 'Native & Networking',
        items: ['Swift & Kotlin platform channels', 'REST/Dio', 'Deep linking (AppsFlyer)', 'Jaspr (Dart web)'],
      },
      {
        category: 'Firebase & Analytics',
        items: [
          'Firebase (Remote Config, Analytics, App Check, FCM)',
          'Analytics SDKs (GA4, Klaviyo)',
        ],
      },
      {
        category: 'Delivery & Quality',
        items: [
          'CI/CD (Codemagic, GitHub Actions, Bitbucket Pipelines)',
          'AI-assisted development and code review',
        ],
      },
    ] as SkillGroup[],
  },

  experience: {
    heading: 'Experience',
    lead: 'Fully remote since 2021, shipping production apps for e-commerce, logistics, and fintech teams.',
    items: [
      {
        id: 'nology-store',
        company: 'Nology Store',
        context: 'Qatar-based e-commerce, remote',
        role: 'Senior Mobile Engineer',
        dates: 'Jan 2026 to Present',
        highlights: [
          'Led parts of the GetX to BLoC/Cubit migration in Nology Mobile and fixed navigation failures in its multi-tab scoped search.',
          'Built CMS-driven homepage sections with deep linking, tracked by an analytics layer of 11 GA4 events with visibility-based impressions.',
          'Implemented Firebase App Check and triaged a mobile penetration test, separating real vulnerabilities from inflated findings.',
          'Shipped native work on iOS (Swift) and Android, including scheduled app icon switching and end-to-end Klaviyo push and in-app forms.',
        ],
      },
      {
        id: 'whoosh',
        company: 'Whoosh',
        context: 'Nigeria-based logistics, contract, remote',
        role: 'Senior Mobile Engineer',
        dates: 'Oct 2023 to Jan 2026',
        highlights: [
          'Delivered two Flutter apps for Android and iOS: Whoosh for customers and Whoosh Rider for delivery riders.',
          'Built real-time tracking and geo-fencing for riders, with Firebase Cloud Messaging for delivery updates.',
          'Integrated in-app chat between customers and riders, and shipped features driven by user feedback.',
        ],
      },
      {
        id: 'mabilla-group',
        company: 'Mabilla Group',
        context: 'Fintech, full-time, remote',
        role: 'Senior Mobile Engineer',
        dates: 'Oct 2023 to Sep 2024',
        highlights: [
          'Owned the mobile lifecycle for fintech products from idea to release.',
          "Worked with the Tech Lead to shape a mobile strategy that fit the company's wider technical roadmap.",
          'Shipped secure fintech features backed by automated tests and a CI/CD pipeline.',
        ],
      },
      {
        id: 'okorotech',
        company: 'OkoroTech',
        context: 'US-based, remote',
        role: 'Flutter Engineer',
        dates: 'Mar 2023 to Nov 2023',
        highlights: [
          'Delivered multiple Flutter apps for clients, from first build to release.',
          'Led and mentored small teams through each project, keeping delivery on schedule and to standard.',
          'Kept technical decisions tied to business goals through regular project updates with stakeholders.',
        ],
      },
      {
        id: 'dished-holdings',
        company: 'Dished Holdings',
        context: 'US-based, remote',
        role: 'Flutter Engineer',
        dates: 'Mar 2022 to Jan 2023',
        highlights: [
          'Reworked the app architecture to improve performance and the overall user experience.',
          'Integrated an in-app chat system to give users a direct way to interact.',
          'Worked with cross-functional teams, including the CTO, on improvements driven by market needs.',
        ],
      },
      {
        id: 'errandpay',
        company: 'ErrandPay',
        context: 'Lagos-based fintech, remote',
        role: 'Mobile Developer',
        dates: 'Nov 2021 to Jan 2022',
        highlights: [
          'Built a streamlined KYC flow that cut user verification time by half.',
          'Restructured the codebase and reduced app size by 20%.',
          'Implemented Firebase Cloud Messaging for transactional and engagement notifications.',
        ],
      },
      {
        id: 'dynatech',
        company: 'Dynatech Nigeria',
        context: 'Lagos-based, remote',
        role: 'Mobile Developer',
        dates: 'Jul 2021 to Oct 2021',
        highlights: [
          'Turned complex UI designs into reusable Flutter components shared across client projects.',
          'Integrated APIs of varying complexity with a focus on testability and maintainability.',
        ],
      },
    ] as ExperienceItem[],
  },

  work: {
    heading: 'Featured Work',
    lead: 'Selected mobile and Dart products built with full end-to-end ownership.',
    items: [
      {
        id: 'nology-mobile',
        title: 'Nology Mobile',
        subtitle: 'Production Flutter e-commerce app',
        category: 'Production',
        platform: 'iOS & Android',
        mockupId: 'nology-mobile',
        problem:
          'Product discovery, CMS merchandising, customer messaging, and client security needed to scale cleanly without slowing releases or losing visibility into shopper behaviour.',
        decision:
          'Owned each surface like a product lead: migrated search and filters from GetX to BLoC/Cubit, paired CMS homepage blocks with 11 GA4 visibility events, integrated Klaviyo push and identity end to end, and hardened client requests with Firebase App Check.',
        shipped:
          'Live iOS and Android releases with debounced search, CustomPainter spotlight onboarding controlled via Remote Config, native scheduled app icon switching, and faster parallel Bitbucket Pipelines builds.',
        tech: ['Flutter', 'BLoC/Cubit', 'Swift & Kotlin', 'Firebase App Check', 'GA4', 'Klaviyo', 'AppsFlyer'],
        links: [
          {
            label: 'App Store',
            url: 'https://apps.apple.com/us/app/nology-store-%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A-%D8%B3%D8%AA%D9%88%D8%B1/id1476822418',
          },
          { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.nologystore.nology' },
        ],
      },
      {
        id: 'kabsa',
        title: 'Kabsa',
        subtitle: "Nology Store's Flutter driver app",
        category: 'Production',
        platform: 'iOS & Android',
        mockupId: 'kabsa',
        problem:
          'Drivers rely on the app across harsh midday sunlight and late-night delivery shifts, where inconsistent styling or harsh contrast slows down every drop-off.',
        decision:
          'Standardised the UI on a shared design system with complete light and dark theme parity so tokens, typography, and status states stay predictable across every screen.',
        shipped:
          'Production Flutter driver app with full light and dark theming built on reusable design-system components.',
        tech: ['Flutter', 'Dart', 'Shared Design System', 'Light & Dark Theming', 'REST/Dio'],
        links: [],
      },
      {
        id: 'whoosh',
        title: 'Whoosh',
        subtitle: 'Logistics apps for customers and delivery riders',
        category: 'Production',
        platform: 'Android & iOS',
        mockupId: 'whoosh',
        problem:
          'A delivery service only works when both sides move in step: customers need to send packages and follow them, and riders need to manage pickups and drop-offs on the move.',
        decision:
          'Built two focused Flutter apps, one for customers and one for riders, integrated third-party APIs, used Firebase Cloud Messaging for real-time updates, and added in-app chat so customers and riders could talk directly.',
        shipped:
          'Whoosh and Whoosh Rider for Android and iOS, with real-time tracking and geo-fencing for riders. Both are live on Google Play.',
        tech: ['Flutter', 'Dart', 'Firebase Cloud Messaging', 'In-app chat', 'Geo-fencing', 'Third-party APIs'],
        links: [
          { label: 'Whoosh on Play Store', url: 'https://play.google.com/store/apps/details?id=com.whoosh.user' },
          { label: 'Whoosh Rider on Play Store', url: 'https://play.google.com/store/apps/details?id=com.whoosh.rider' },
        ],
      },
      {
        id: 'nesterverify',
        title: 'NesterVerify',
        subtitle: 'Business verification mobile app',
        category: 'Production',
        platform: 'Mobile',
        mockupId: 'nesterverify',
        problem:
          'Business verification workflows demand clear step-by-step data capture and dependable mobile state so checks are completed accurately in the field.',
        decision:
          'Structured the mobile verification flow around clear validation, predictable navigation, and clean separation between UI and API layers.',
        shipped:
          'Production mobile application supporting end-to-end business verification workflows.',
        tech: ['Flutter', 'Dart', 'REST/Dio', 'Mobile Verification'],
        links: [
          { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.ngss.nesterVerify' },
        ],
      },
      {
        id: 'greamit',
        title: 'Greamit',
        subtitle: 'Interest-based social app',
        category: 'Production',
        platform: 'iOS & Android',
        mockupId: 'greamit',
        problem:
          'People want one simple place to discover, create, and share content around the topics they actually care about.',
        shipped:
          'An easy-to-use social app for viewing, creating, and sharing content based on each user\'s interests, live on the App Store and Google Play.',
        tech: ['Flutter', 'Dart', 'Social feed', 'Interest-based content'],
        links: [
          { label: 'App Store', url: 'https://apps.apple.com/ng/app/greamit/id6504239079' },
          { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.greamit.app' },
        ],
      },
      {
        id: 'striit',
        title: 'Striit',
        subtitle: 'Parking assistance app',
        category: 'Production',
        platform: 'iOS',
        mockupId: 'striit',
        problem: 'Parking in busy areas costs drivers more time and money than it should.',
        decision:
          'Used Firebase for authentication, real-time data storage, and user notifications so parking information stays current for every driver.',
        shipped: 'A parking assistance app on the App Store that helps drivers reduce what they spend on parking.',
        tech: ['Flutter', 'Dart', 'Firebase Authentication', 'Real-time data', 'Push notifications'],
        links: [{ label: 'App Store', url: 'https://apps.apple.com/us/app/striit/id6446465864' }],
      },
      {
        id: 'emc-portal',
        title: 'EMC Portal',
        subtitle: 'Automated teacher reminder portal for an Extra Mural Class',
        category: 'Personal',
        platform: 'Web · GitHub Pages',
        mockupId: 'emc-portal',
        problem:
          'Sending daily schedule reminders to Extra Mural Class teachers manually was repetitive and easy to miss, while maintaining a custom backend server was unnecessary overhead.',
        decision:
          'Built the web app with Dart and the Jaspr framework, using a Google Sheet as its backend so coordinators can manage schedules in a tool they already know.',
        shipped:
          'A static web portal hosted on GitHub Pages that automates daily WhatsApp reminders to teachers with minimal maintenance.',
        tech: ['Dart', 'Jaspr', 'Google Sheets API', 'WhatsApp Automation', 'GitHub Pages'],
        links: [], // Private project
      },
      {
        id: 'runway',
        title: 'Runway',
        subtitle: 'Personal budgeting & financial runway app',
        category: 'Personal',
        platform: 'Flutter Mobile',
        mockupId: 'runway',
        problem:
          'Standard expense trackers log past spending but rarely show how long your current funds will last at your actual pace of spending.',
        decision:
          'Modelled the app directly on my own expense tracking system, focusing on fast entry and an immediate view of remaining financial runway.',
        shipped:
          'A clean Flutter budgeting and financial runway app designed for everyday clarity rather than spreadsheet friction.',
        tech: ['Flutter', 'Dart', 'Personal Finance', 'Custom UI'],
        links: [], // Private for now; add { label: 'Source', url: '...' } when public
      },
    ] as ProjectItem[],
  },

  writing: {
    heading: 'Writing',
    lead: 'I learn in public, and write so others can skip the hard parts.',
    profiles: [{ label: 'All on Dev.to', url: 'https://dev.to/idrisadeyemi01' }] as ProjectLink[],
    items: [
      {
        id: 'null-safety-dart',
        title: 'Deep Dive Into Null and Null Safety in Dart',
        summary:
          'Nullable and non-nullable types, every null-aware operator from ?? to ?[], and when to reach for the late keyword, all built on a simple classroom analogy.',
        platform: 'Dev.to',
        date: 'Aug 2022',
        readMinutes: 9,
        url: 'https://dev.to/idrisadeyemi01/deep-dive-into-null-safety-in-dart-k95',
        tags: ['Dart', 'Flutter'],
      },
      {
        id: 'beginners-guide-flutter',
        title: "Beginners' Guide to Flutter",
        summary:
          'What Flutter and Dart are, why Flutter is worth picking as your main mobile framework, how to get started, and what to build once you know the basics.',
        platform: 'Dev.to',
        date: 'Dec 2020',
        readMinutes: 4,
        url: 'https://dev.to/idrisadeyemi01/beginners-guide-to-flutter-16de',
        tags: ['Flutter', 'Beginners'],
      },
    ] as ArticleItem[],
  },

  /** Explorer quest: a light, optional game. Copy lives here; logic in src/quest. */
  quest: {
    title: 'Explorer quest',
    intro: 'A little game for the curious. Unlock them all and there is something at the end.',
    completeTitle: "You've seen it all.",
    completeBody: "Thanks for exploring every corner. If you got this far, we'd probably work well together.",
    items: [
      { id: 'first-steps', title: 'First steps', hint: 'Scroll past the intro.', xp: 10 },
      { id: 'shapeshifter', title: 'Shapeshifter', hint: 'Try all three themes.', xp: 30 },
      { id: 'night-and-day', title: 'Night & day', hint: "Flip Kabsa's phone preview theme.", xp: 20 },
      { id: 'recruiter-mode', title: 'Recruiter mode', hint: 'Open the CV.', xp: 20 },
      { id: 'bookworm', title: 'Bookworm', hint: 'Open one of the articles.', xp: 20 },
      { id: 'say-hi', title: 'Say hi', hint: 'Email me or copy my address.', xp: 30 },
      { id: 'completionist', title: 'Completionist', hint: 'Visit every section of the page.', xp: 40 },
      { id: 'secret-flutter', title: 'Hot reload', hint: 'Type the name of my favourite framework.', xp: 50, secret: true },
    ] as QuestItem[],
  },

  speaking: {
    heading: 'Speaking & Community',
    lead: 'Sharing practical mobile security lessons and keeping large community systems running smoothly.',
    items: [
      {
        id: 'devfest-ibadan-2026',
        kind: 'Conference Talk',
        title: 'Your Gemini Key Is in the APK: Securing AI Features in Flutter',
        organization: 'DevFest Ibadan 2026',
        date: 'Nov 21, 2026',
        summary:
          'Talk focused on protecting API keys and securing AI features in production Flutter builds on Android and iOS.',
        links: [
          {
            label: 'Slides',
            url: 'https://docs.google.com/presentation/d/1lDFFmtZmXwr1KF3Vdt2yOhP8KquARl3tsy5QF6HgdTQ/edit?usp=sharing',
          },
        ],
      },
      {
        id: 'mssn-lagos-web-team',
        kind: 'Operations & Support',
        title: 'MSSN Lagos Web Team',
        organization: 'Annual December Islamic Vacation Course',
        summary:
          'Help run the support pipeline that handles 5,000+ requests during the annual December Islamic Vacation Course.',
      },
      {
        id: 'mssn-agege-area-council',
        kind: 'Community Leadership',
        title: 'Regional Student Leadership',
        organization: 'MSSN Agege Area Council',
        summary:
          'Lead a regional student organisation.',
      },
    ] as SpeakingItem[],
  },

  achievements: {
    heading: 'Achievements',
    items: [
      {
        id: 'squadio-2021',
        year: '2021',
        title: 'Winner, Squadio Worldwide Coding Challenge',
        detail: 'First place in the Squadio Worldwide Coding Challenge.',
      },
      {
        id: 'zindi-2018',
        year: '2018',
        title: 'Zindi Data Science Hackathons',
        detail: 'Participated in Zindi data science hackathons.',
      },
    ] as AchievementItem[],
  },

  contact: {
    heading: 'Contact',
    closingLine: "Building something that needs an owner, not just a coder? Let's talk.",
    subcopy:
      'Open to remote senior Flutter and mobile engineering roles, focused contract engagements, and AI evaluation or code review work.',
    emailCtaLabel: 'Email me',
  },
};
