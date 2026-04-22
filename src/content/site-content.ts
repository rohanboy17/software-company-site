export type Service = {
  title: string;
  slug: string;
  description: string;
  outcomes: string[];
  features?: string[];
  faqs?: { q: string; a: string }[];
};

export type CaseStudy = {
  client: string;
  sector: string;
  headline: string;
  impact: string;
  imageUrl?: string;
  image?: unknown;
  problem?: string;
  approach?: string;
  timeline?: string;
  stack?: string[];
  results?: { label: string; value: string }[];
};

export type ProcessStep = {
  title: string;
  detail: string;
};

export type CompanyInfo = {
  tagline: string;
  email: string;
  schedulingUrl?: string;
  timezone: string;
  locations: string[];
  socials: { label: string; url: string }[];
};

export type TrustMetric = { label: string; value: string };
export type TrustInfo = {
  metrics: TrustMetric[];
  logos?: { name: string }[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type FAQItem = { q: string; a: string };

export type Differentiator = { title: string; detail: string };

export type SiteSEO = {
  siteUrl?: string;
  defaultTitle?: string;
  defaultDescription?: string;
};

export type SiteContent = {
  companyName: string;
  company?: CompanyInfo;
  trust?: TrustInfo;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  services: Service[];
  caseStudies: CaseStudy[];
  testimonials?: Testimonial[];
  faqs?: FAQItem[];
  differentiators?: Differentiator[];
  siteSeo?: SiteSEO;
  process: ProcessStep[];
  scrollStory: {
    heading: string;
    intro: string;
    scenes: string[];
  };
};

export const siteContent: SiteContent = {
  companyName: "NovaAxis Labs",
  company: {
    tagline: "Premium engineering studio for product teams.",
    email: "hello@novaaxislabs.com",
    schedulingUrl: "",
    timezone: "UTC+05:30",
    locations: ["Bengaluru", "Remote (Worldwide)"],
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com" },
      { label: "X", url: "https://x.com" },
      { label: "GitHub", url: "https://github.com" },
    ],
  },
  trust: {
    metrics: [
      { label: "Avg. Lighthouse", value: "95+" },
      { label: "Time-to-ship", value: "2–6 wks" },
      { label: "Performance budget", value: "Strict" },
      { label: "Delivery model", value: "Milestones" },
    ],
    logos: [{ name: "FinTech" }, { name: "HealthTech" }, { name: "SaaS" }, { name: "Logistics" }],
  },
  hero: {
    badge: "Premium Engineering Studio",
    title: "Build digital products that feel years ahead.",
    subtitle:
      "We design and engineer high-performance websites, mobile apps, software platforms, and AI systems that convert and scale.",
    primaryCta: "Book Strategy Call",
    secondaryCta: "View Our Work",
  },
  services: [
    {
      title: "High‑performance Websites",
      slug: "website-development",
      description:
        "Conversion-first marketing websites with cinematic interactions, SEO structure, and fast Core Web Vitals.",
      outcomes: ["Higher qualified leads", "Faster page experience", "Modern brand perception"],
      features: ["UX & narrative design", "SEO foundations", "Performance optimization", "CMS integration"],
      faqs: [
        {
          q: "Will the site be fast with animations?",
          a: "Yes. Motion is designed around performance budgets and tested with real Core Web Vitals targets.",
        },
        {
          q: "Can we edit content ourselves?",
          a: "Yes — we can integrate a CMS so your team can update pages without code changes.",
        },
      ],
    },
    {
      title: "Mobile Apps",
      slug: "mobile-app-development",
      description:
        "Cross-platform mobile applications engineered for smooth UX, scale, and secure integrations.",
      outcomes: ["Better retention", "Faster release cycles", "App-store-ready quality"],
      features: ["UX-first app flows", "Offline-ready foundations", "Secure auth & APIs", "Release automation"],
      faqs: [
        {
          q: "Do you build iOS and Android?",
          a: "Yes — either cross-platform or native depending on performance and requirements.",
        },
      ],
    },
    {
      title: "Product Web Apps",
      slug: "software-development",
      description:
        "Dashboards, portals, and SaaS frontends engineered for performance, reliability, and growth.",
      outcomes: ["Operational efficiency", "Reliable architecture", "Business process automation"],
      features: ["API design", "Dashboards & internal tools", "Integration layers", "Testing & observability"],
    },
    {
      title: "AI Features & Automation",
      slug: "ai-development",
      description:
        "Applied AI: RAG, copilots, workflow automation, and guardrails built for production.",
      outcomes: ["Smarter decisions", "Reduced repetitive work", "AI-enabled product features"],
      features: ["RAG & retrieval", "Workflow automation", "Guardrails & evals", "Production deployment"],
    },
  ],
  caseStudies: [
    {
      client: "FinSage",
      sector: "FinTech",
      headline: "Rebuilt the customer acquisition funnel with a high-speed product site.",
      impact: "2.8x more demo requests in 90 days",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
      problem: "Low conversion and slow page experience on a legacy site.",
      approach: "New narrative, faster architecture, and motion tuned to performance budgets.",
      timeline: "4 weeks",
      stack: ["Next.js", "Sanity", "Vercel"],
      results: [
        { label: "Demo requests", value: "+180%" },
        { label: "LCP", value: "< 2.2s" },
      ],
    },
    {
      client: "MediNova",
      sector: "HealthTech",
      headline: "Delivered a cross-platform care app with real-time patient workflows.",
      impact: "41% increase in weekly active users",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
      problem: "Fragmented UX and inconsistent performance across devices.",
      approach: "Streamlined flows, reliable realtime integrations, and rigorous QA.",
      timeline: "8 weeks",
      stack: ["React", "APIs", "Observability"],
      results: [
        { label: "Weekly actives", value: "+41%" },
        { label: "Crash-free", value: "99.8%" },
      ],
    },
    {
      client: "CoreFleet",
      sector: "Logistics SaaS",
      headline: "Built analytics software and AI summaries for dispatch operators.",
      impact: "34% faster daily planning operations",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
      problem: "Manual planning and fragmented data slowed daily ops.",
      approach: "Dashboard UX + automation and AI summaries for rapid decisions.",
      timeline: "6 weeks",
      stack: ["Next.js", "Postgres", "AI workflows"],
      results: [
        { label: "Planning speed", value: "+34%" },
        { label: "Ops automation", value: "High" },
      ],
    },
  ],
  testimonials: [
    {
      quote:
        "NovaAxis shipped a performance-first website that doubled qualified leads without sacrificing the cinematic feel.",
      name: "Aditi",
      role: "VP Growth",
      company: "B2B SaaS",
    },
    {
      quote:
        "The team moved fast, communicated clearly, and delivered an interface that feels genuinely premium on every device.",
      name: "Rahul",
      role: "Product Lead",
      company: "HealthTech",
    },
    {
      quote:
        "Best vendor experience we’ve had — clean engineering, great motion craft, and everything launched on time.",
      name: "Sara",
      role: "Founder",
      company: "FinTech",
    },
  ],
  faqs: [
    {
      q: "How do you price projects?",
      a: "Fixed-scope for well-defined builds, or monthly retainers for iterative product work. We’ll recommend the model that reduces risk.",
    },
    {
      q: "How fast can we launch?",
      a: "Most marketing sites ship in 2–6 weeks depending on complexity. We’ll define milestones and a delivery plan in the first call.",
    },
    {
      q: "Who owns the code and design?",
      a: "You do. All deliverables and source code are yours after final payment, under the terms of the engagement agreement.",
    },
    {
      q: "Can you work with our existing team?",
      a: "Yes — we can integrate with your engineers/designers, or deliver end-to-end with clear handoff documentation.",
    },
  ],
  differentiators: [
    {
      title: "Performance budgets",
      detail: "Core Web Vitals is a feature — we design motion and 3D around strict budgets.",
    },
    {
      title: "Design systems",
      detail: "Tokenized UI that scales across pages, campaigns, and product surfaces.",
    },
    {
      title: "Security & reliability",
      detail: "Hardening basics baked in: headers, validation, safe defaults, and uptime focus.",
    },
    {
      title: "AI enablement",
      detail: "Applied AI where it matters: copilots, retrieval, automation, and product workflows.",
    },
  ],
  siteSeo: {
    siteUrl: "https://example.com",
    defaultTitle: "NovaAxis Labs | Software Company",
    defaultDescription:
      "High-performance websites, apps, software platforms, and AI systems engineered for modern teams.",
  },
  process: [
    {
      title: "Discovery & Positioning",
      detail:
        "We map audience, product goals, and technical constraints to define a clear delivery path.",
    },
    {
      title: "Design & Prototype",
      detail:
        "Interface systems, motion language, and narrative prototypes are crafted before heavy build work.",
    },
    {
      title: "Build & Integrate",
      detail:
        "Our team ships production-grade code, backend integrations, and QA-tested experiences.",
    },
    {
      title: "Launch & Optimize",
      detail:
        "We track key metrics, tune performance, and continuously improve conversion and adoption.",
    },
  ],
  scrollStory: {
    heading: "Scroll Through The Build Pipeline",
    intro:
      "A 3D narrative that transforms from idea to launch as users move down the page.",
    scenes: [
      "Frame 01 - Product Idea",
      "Frame 02 - UX Architecture",
      "Frame 03 - Engineering Core",
      "Frame 04 - AI Enablement",
      "Frame 05 - Go-Live Momentum",
    ],
  },
};
