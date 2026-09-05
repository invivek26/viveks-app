export type PortfolioWork = {
  slug: string;
  name: string;
  descriptor: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  heroMetric: string;
  heroLabel: string;
  challenge: string;
  contribution: string;
  outcomes: ReadonlyArray<{ value: string; label: string }>;
  highlights: ReadonlyArray<string>;
  recognitionHeading: string;
  recognition: ReadonlyArray<{
    name: string;
    period: string;
    amount: number;
    awardCount: number;
    detail: string;
    href: string;
  }>;
  stack: ReadonlyArray<string>;
  links: ReadonlyArray<{ label: string; href: string }>;
  accent: "market" | "transit";
};

export const portfolio = {
  person: {
    name: "Vivek Indlebele Narasimha Prasad",
    headline: "Founder, CTO, and product engineer",
    location: "San Francisco, California",
    email: "vivek@gamestock.app",
    calendly: "https://calendly.com/vivek-gamestock",
    summary:
      "I turn ambitious ideas into products people can actually use—from the first prototype through payments, analytics, releases, and scale.",
  },
  social: {
    github: "https://github.com/invivek26",
    linkedin: "https://www.linkedin.com/in/vivek-i-n/",
    terminal: "https://terminal.viveks.app",
  },
  stats: [
    { value: "$2M", label: "pre-seed raised" },
    { value: "20K+", label: "GameStock users" },
    { value: "150K+", label: "tournament joins" },
    { value: "16K+", label: "npm downloads" },
  ],
  capabilities: [
    {
      number: "01",
      title: "Product direction",
      description:
        "Shape the problem, make the tradeoffs, and ship the smallest product that earns its next iteration.",
    },
    {
      number: "02",
      title: "Mobile and platform",
      description:
        "Build native-feeling React Native products and the TypeScript systems that keep them fast and reliable.",
    },
    {
      number: "03",
      title: "Money and realtime",
      description:
        "Design payments, wallets, market events, dispatch, and other systems where correctness meets immediacy.",
    },
    {
      number: "04",
      title: "Release and learning",
      description:
        "Close the loop with analytics, observability, automated delivery, and experiments grounded in evidence.",
    },
  ],
  work: [
    {
      slug: "gamestock",
      name: "GameStock",
      descriptor: "Markets for competitive gaming",
      role: "Founder and CTO",
      period: "Aug 2025 — Present",
      location: "San Francisco, CA",
      summary:
        "A fantasy stock and crypto tournament platform where players compete on market insight, not starting capital.",
      heroMetric: "20K+",
      heroLabel: "users built from zero",
      challenge:
        "Turn live market movement into a trustworthy competition product—with fast transactions, real money flows, understandable outcomes, and mobile releases that could keep pace with the company.",
      contribution:
        "I co-founded the company and lead product, engineering, and technical strategy across the mobile experience, Convex backend, market infrastructure, payments, analytics, observability, and releases.",
      outcomes: [
        { value: "$2M", label: "pre-seed led by Peak XV" },
        { value: "10.6K", label: "monthly active users" },
        { value: "4.8/5", label: "Google Play rating" },
        { value: "0.9s", label: "median transaction broadcast" },
      ],
      highlights: [
        "Built the tournament and live-trading platform behind more than 150,000 tracked tournament joins.",
        "Reduced median transaction broadcast latency from 2.95 seconds to approximately 0.9 seconds.",
        "Designed wallets, funding, escrow, reconciliation, refunds, and payouts for 2,000+ transacting users and 16,000+ completed payment events.",
        "Established product analytics and release engineering with PostHog, AppsFlyer, Sentry, automated native and backend deployments, and 18 critical end-to-end flows.",
        "Brought recent CI to a 2.5-minute average with 95%+ success across more than 1,000 monthly runs.",
      ],
      recognitionHeading: "",
      recognition: [],
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Convex",
        "Stripe",
        "PostHog",
        "Sentry",
        "GitHub Actions",
      ],
      links: [
        { label: "Visit GameStock", href: "https://gamestock.com" },
        { label: "Peak XV profile", href: "https://www.peakxv.com/companies/gamestock" },
      ],
      accent: "market",
    },
    {
      slug: "zen-shuttles",
      name: "Zen Shuttles",
      descriptor: "Smarter campus transportation",
      role: "Founder and CTO",
      period: "May 2022 — Dec 2023",
      location: "Tempe, AZ",
      summary:
        "A campus ride-pooling service that coordinated riders, drivers, schedules, and real-time operations around Arizona State University; reached break-even in 15 months and secured $31K across four ASU venture awards.",
      heroMetric: "15 mo",
      heroLabel: "from launch to break-even",
      challenge:
        "Campus trips are short, demand arrives in clusters, vehicle capacity is limited, and riders still expect predictable ETAs. The product had to coordinate all of it with a tiny team.",
      contribution:
        "I co-founded Zen and owned product and engineering end to end: rider and driver apps, dispatch, payments, promotions, internal operations, analytics, and production delivery.",
      outcomes: [
        { value: "15 mo", label: "to break-even" },
        { value: "$31K", label: "across four ASU venture awards" },
        { value: "1st", label: "Tech Devils Pitch Showcase" },
        { value: "3", label: "production applications" },
      ],
      highlights: [
        "Built and launched rider and driver applications plus a real-time operations dashboard.",
        "Designed the dispatch and scheduling engine to group nearby demand, enforce capacity, and deliver routes and ETAs to drivers.",
        "Reduced Maps and Places API usage through autocomplete caching, session tokens, and elimination of redundant route requests.",
        "Shipped memberships, payments, referrals, promotions, push messaging, and ride, driver, customer, and revenue analytics.",
      ],
      recognitionHeading: "$31K across four ASU venture awards.",
      recognition: [
        {
          name: "ASU eSeed Challenge",
          period: "Dec 2022",
          amount: 25_000,
          awardCount: 2,
          detail: "Two awards: $8K and $17K",
          href: "https://news.asu.edu/20220503-entrepreneurship-entrepreneurs-pitch-dollars-and-change",
        },
        {
          name: "ASU Venture Development Grant",
          period: "Mar 2023",
          amount: 1_000,
          awardCount: 1,
          detail: "Venture development grant",
          href: "https://news.engineering.asu.edu/2023/03/student-entrepreneurs-pitch-innovative-ideas/",
        },
        {
          name: "Hool Coury Law Tech Venture Challenge",
          period: "Apr 2023",
          amount: 5_000,
          awardCount: 1,
          detail: "Pitch competition award",
          href: "https://entrepreneurship.engineering.asu.edu/hool-coury-law-tech-venture-challenge/",
        },
      ],
      stack: [
        "React Native",
        "React",
        "Firebase",
        "Stripe",
        "Google Cloud",
        "Twilio",
        "Reanimated",
      ],
      links: [
        {
          label: "ASU founder profile",
          href: "https://news.engineering.asu.edu/2023/03/student-entrepreneurs-pitch-innovative-ideas/",
        },
        {
          label: "ASU eSeed announcement",
          href: "https://news.asu.edu/20220503-entrepreneurship-entrepreneurs-pitch-dollars-and-change",
        },
      ],
      accent: "transit",
    },
  ] satisfies ReadonlyArray<PortfolioWork>,
  openSource: [
    {
      name: "Expo OneSignal Live Activities",
      packageName: "expo-onesignal-live-activities",
      description:
        "Automates the complete native Live Activity setup for Expo and OneSignal—from targets and entitlements to push-to-start tokens and widget scaffolding.",
      downloads: "10K+",
      version: "0.2.10",
      demo: "live-activity",
      github: "https://github.com/invivek26/expo-onesignal-live-activities",
      npm: "https://www.npmjs.com/package/expo-onesignal-live-activities",
    },
    {
      name: "React Native Number Animation",
      packageName: "react-native-number-animation",
      description:
        "Native rolling-number animations for Fabric, built with Swift Core Animation and Kotlin Canvas.",
      downloads: "3K+",
      version: "0.1.5",
      demo: "number",
      github: "https://github.com/invivek26/react-native-number-animation",
      npm: "https://www.npmjs.com/package/react-native-number-animation",
    },
    {
      name: "React Native Marquee Animation",
      packageName: "react-native-marquee-animation",
      description:
        "A production-grade native marquee for smooth, continuous content on React Native Fabric.",
      downloads: "2.8K+",
      version: "0.1.3",
      demo: "marquee",
      github: "https://github.com/invivek26/react-native-marquee-animation",
      npm: "https://www.npmjs.com/package/react-native-marquee-animation",
    },
  ],
  education: [
    {
      degree: "M.S. in Computer Science",
      school: "Arizona State University",
      period: "Jan 2025 — Dec 2025",
      detail: "GPA 4.0/4.0",
    },
    {
      degree: "B.S. in Computer Science",
      school: "Arizona State University",
      period: "2021 — Dec 2024",
      detail: "GPA 4.0/4.0",
    },
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Swift", "Kotlin", "Python", "SQL"],
    product: ["React Native", "Expo", "React", "TanStack", "Node.js", "Bun", "Convex", "Firebase"],
    systems: ["Stripe", "Google Cloud", "PostHog", "AppsFlyer", "Sentry", "GitHub Actions", "EAS"],
  },
} as const;

export function getWork(slug: string) {
  return portfolio.work.find((item) => item.slug === slug);
}
