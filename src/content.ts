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
  decision: string;
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
    role: 'Software Engineer · Flutter & Mobile',
    location: 'Lagos, Nigeria',
    availability: 'Available for remote senior roles, contract work & code review',
    email: 'idrisade.eedris@gmail.com',
    copyright: '© 2026 Idris Idris',
  },

  nav: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
    { label: 'Speaking', href: '#speaking' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],

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
    title: 'Software Engineer · Flutter & Mobile',
    pitch: "I treat every feature I build like I'm its CEO.",
    subcopy:
      'Shipping production Flutter apps on iOS and Android since 2021 across fintech, logistics, and consumer e-commerce. Focused on clean architecture, measurable analytics, security, and thoughtful code review.',
    primaryCta: {
      label: 'View my work',
      href: '#work',
    },
    secondaryCta: {
      label: 'Download CV',
      url: '[CV_LINK]',
    },
    photoUrl: '[PHOTO_URL]',
    photoAlt: 'Portrait of Idris Idris, Software Engineer specialising in Flutter and mobile',
    focusAreas: [
      { label: 'Primary stack', value: 'Flutter · Dart · iOS & Android' },
      { label: 'Shipping since', value: '2021' },
      { label: 'Location', value: 'Lagos, Nigeria (Remote)' },
      { label: 'Also open to', value: 'AI evaluation & code review' },
    ],
  },

  about: {
    heading: 'About',
    lead: 'From Chemical Engineering to owning production mobile systems end to end.',
    paragraphs: [
      'I studied Chemical Engineering before teaching myself software development, and I have been shipping production Flutter apps on iOS and Android professionally since 2021 across fintech, logistics, and consumer e-commerce.',
      'My core philosophy is simple: I act as the mini-CEO of every feature and app I work on. Before writing a line of code, I study competitors in the space to find what should be better, then take full ownership end to end. I care about architecture, performance, analytics, and security, not just screens.',
    ],
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
    lead: 'Production engineering across remote e-commerce, logistics, fintech, and verification platforms.',
    items: [
      {
        id: 'nology-store',
        company: 'Nology Store',
        context: 'Qatar-based e-commerce, remote',
        role: 'Senior Mobile Engineer',
        dates: 'Jan 2026 to Present',
        highlights: [
          "Worked on Nology Mobile, the store's Flutter e-commerce app on iOS and Android, and Kabsa, its Flutter driver app.",
          'Led parts of a GetX to BLoC/Cubit migration covering search, trending keywords, debounced search, and scoped filter state.',
          'Integrated Klaviyo end to end: identity resolution, APNs/FCM push token bridging, and in-app forms.',
          'Built CMS-driven homepage sections with deep-link routing and GA4 tracking, plus a homepage analytics layer with 11 GA4 events, visibility-based impression tracking, and a reusable TrackableSection widget.',
          'Fixed navigation failures in the multi-tab scoped search caused by GetX state issues, unblocking the core discovery flow.',
          'Built a spotlight onboarding overlay with CustomPainter, a Remote Config kill-switch, and analytics.',
          'Shipped scheduled app icon switching natively on iOS (Swift) and Android (activity-alias).',
          'Implemented Firebase App Check and triaged a mobile penetration test report, separating real vulnerabilities from inflated findings.',
          'Modernised CI/CD on Bitbucket Pipelines with caching and parallel steps.',
        ],
      },
      {
        id: 'whoosh',
        company: 'Whoosh',
        context: 'Logistics, contract, remote',
        role: 'Senior Mobile Engineer',
        dates: 'Oct 2023 to Jan 2026',
        highlights: [
          'Delivered two Flutter apps live on iOS and Android: Whoosh for customers and Whoosh Rider for delivery riders.',
          'Built real-time tracking and geo-fencing for riders, with Firebase Cloud Messaging for delivery updates.',
          'Integrated in-app chat between customers and riders, and shipped features driven by user feedback.',
        ],
      },
      {
        id: 'mabilla-group',
        company: 'Mabilla Group',
        context: 'Full-time, fintech, remote',
        role: 'Senior Mobile Engineer',
        dates: 'Oct 2023 to Sep 2024',
        highlights: [
          'Owned the mobile lifecycle for fintech products from idea to release.',
          "Worked with the Tech Lead to shape a mobile strategy that fit the company's wider technical roadmap.",
          'Shipped secure fintech features backed by automated tests and a CI/CD pipeline.',
        ],
      },
      {
        id: 'errandpay',
        company: 'ErrandPay',
        context: 'Fintech, Lagos',
        role: 'Mobile Developer',
        dates: 'Nov 2021 to Jan 2022',
        highlights: [
          'Built a streamlined KYC flow that cut user verification time by half.',
          'Restructured the codebase and reduced app size by 20%.',
          'Implemented Firebase Cloud Messaging for transactional and engagement notifications.',
        ],
      },
      {
        id: 'greamit',
        company: 'Greamit',
        role: 'Software Engineer',
        dates: '[DATES]',
        context: 'Social',
        highlights: [
          "Built Greamit, a social app live on iOS and Android for viewing, creating, and sharing content around users' interests.",
        ],
      },
      {
        id: 'nesterverify',
        company: 'NesterVerify',
        context: 'Business verification app',
        role: 'Software Engineer',
        dates: '[DATES]',
        highlights: [
          '[Highlight 1: add key verification workflow or mobile architecture outcome at NesterVerify]',
        ],
        isPlaceholderHighlights: true,
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
          { label: 'App Store', url: '[APP_STORE_LINK]' },
          { label: 'Play Store', url: '[PLAY_STORE_LINK]' },
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
        id: 'nesterverify',
        title: 'NesterVerify',
        subtitle: 'Business verification mobile app',
        category: 'Production',
        platform: 'Mobile',
        mockupId: 'nesterverify',
        problem:
          'Business verification workflows demand clear step-by-step data capture and dependable mobile state so checks are completed accurately in the field.',
        decision:
          'Structured the mobile verification flow around clear validation, predictable navigation, and clean separation between UI and API layers. [Add specific product decision]',
        shipped:
          'Production mobile application supporting end-to-end business verification workflows. [Add launch or scope detail]',
        tech: ['Flutter', 'Dart', 'REST/Dio', 'Mobile Verification'],
        links: [
          { label: 'Project link', url: '[NESTERVERIFY_LINK]' },
        ],
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
        links: [
          { label: 'Live site', url: '[EMC_PORTAL_URL]' },
          { label: 'Source', url: '[EMC_PORTAL_REPO]' },
        ],
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
        links: [
          { label: 'Source', url: '[RUNWAY_REPO]' },
        ],
      },
    ] as ProjectItem[],
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
          { label: 'Slides', url: '[SLIDES_LINK]' },
          { label: 'Recording', url: '[RECORDING_LINK]' },
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
