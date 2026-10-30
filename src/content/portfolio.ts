import type { StaticImageData } from "next/image";
import furcare from "@/assets/images/Furcare.png";
import pawpular from "@/assets/images/Pawpular.png";
import payback from "@/assets/images/payback.png";
import tracker from "@/assets/images/tracker-img.png";

export const portfolioMeta = {
  title: "Portfolio",
  description:
    "Selected product work from SRH Software — AI platforms, marketplaces, fintech, and SaaS built for clarity, performance, and lasting impact.",
} as const;

export const portfolioHero = {
  eyebrow: "Portfolio",
  brand: "SRH Software",
  headingLine1: "Selected work,",
  headingLine2Before: "built to ",
  headingAccent: "last.",
  description:
    "AI platforms, marketplaces, and SaaS products engineered with clarity, craft, and production discipline.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "Browse work", href: "#work" },
} as const;

export const portfolioStats = [
  { value: "120+", label: "Products shipped" },
  { value: "40+", label: "Active clients" },
  { value: "12+", label: "Industries served" },
  { value: "98%", label: "Client retention" },
] as const;

export const portfolioFilters = [
  "All",
  "AI",
  "SaaS",
  "Marketplace",
  "Fintech",
  "Mobile",
] as const;

export type PortfolioFilter = (typeof portfolioFilters)[number];

export type PortfolioCase = {
  id: string;
  number: string;
  name: string;
  category: string;
  meta: string;
  description: string;
  outcome: string;
  year: string;
  industry: string;
  image: StaticImageData;
  alt: string;
  tags: string[];
  filters: PortfolioFilter[];
  accent: string;
};

export const portfolioCases: PortfolioCase[] = [
  {
    id: "furcare-ai",
    number: "01",
    name: "Furcare AI",
    category: "AI Powered Veterinary Platform",
    meta: "Web • Healthtech",
    description:
      "An intelligent veterinary platform that helps clinics deliver smarter care with AI-assisted workflows and modern patient experience.",
    outcome: "Faster clinical workflows and clearer pet-owner communication.",
    year: "2025",
    industry: "Healthtech",
    image: furcare,
    alt: "Furcare AI — smarter pet care with health, nutrition, and vaccination insights",
    tags: ["React", "Next.js", "AI", "SaaS"],
    filters: ["All", "AI", "SaaS"],
    accent: "#7B5CFF",
  },
  {
    id: "pawpular",
    number: "02",
    name: "Pawpular",
    category: "Pet Care Marketplace",
    meta: "Mobile • Marketplace",
    description:
      "A marketplace connecting pet owners with trusted care services, bookings, and seamless digital experiences.",
    outcome: "Higher booking conversion with a streamlined discovery flow.",
    year: "2024",
    industry: "Consumer",
    image: pawpular,
    alt: "Pawpular product screens",
    tags: ["Next.js", "Marketplace", "UI/UX"],
    filters: ["All", "Marketplace", "Mobile"],
    accent: "#E81E62",
  },
  {
    id: "payback-day",
    number: "03",
    name: "Payback Day",
    category: "Expense Split Platform",
    meta: "SaaS • Fintech",
    description:
      "A clean expense-splitting product that makes shared costs transparent, fair, and effortless for groups.",
    outcome: "Reduced settlement friction for groups and teams.",
    year: "2024",
    industry: "Fintech",
    image: payback,
    alt: "Payback Day product screens",
    tags: ["React", "Fintech", "Dashboard"],
    filters: ["All", "Fintech", "SaaS"],
    accent: "#3B82F6",
  },
  {
    id: "tracker9to5",
    number: "04",
    name: "Tracker9to5",
    category: "AI Invoice & Business Management",
    meta: "SaaS • Business",
    description:
      "AI-assisted invoicing and business operations software built for clarity, speed, and day-to-day control.",
    outcome: "Faster invoicing cycles with fewer manual ops steps.",
    year: "2025",
    industry: "Business",
    image: tracker,
    alt: "Tracker9to5 product screens",
    tags: ["Next.js", "Node.js", "SaaS", "AI"],
    filters: ["All", "AI", "SaaS"],
    accent: "#0D9488",
  },
];

export const portfolioCapabilities = {
  eyebrow: "What we build",
  heading: "Full-stack product delivery",
  description:
    "Strategy, design, engineering, and AI — assembled into one accountable team that ships production-ready software.",
  items: [
    {
      title: "AI product engineering",
      description:
        "Assistants, automation, and model-backed workflows wired into real business systems.",
    },
    {
      title: "Custom SaaS platforms",
      description:
        "Multi-tenant products with dashboards, billing-ready architecture, and clean UX.",
    },
    {
      title: "Marketplace & apps",
      description:
        "Discovery, booking, and transaction flows designed for conversion and trust.",
    },
    {
      title: "Fintech experiences",
      description:
        "Secure money flows, reporting clarity, and interfaces people actually understand.",
    },
  ],
} as const;

export const portfolioProcess = {
  eyebrow: "How we work",
  heading: "A delivery rhythm built for clarity",
  items: [
    {
      step: "01",
      title: "Discover",
      description:
        "Align on goals, users, constraints, and success metrics before a single screen ships.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "Prototype flows and interfaces that feel premium, simple, and ready for engineering.",
    },
    {
      step: "03",
      title: "Build",
      description:
        "Ship in focused iterations with production quality, reviews, and measurable progress.",
    },
    {
      step: "04",
      title: "Scale",
      description:
        "Harden, optimize, and evolve the product as usage, data, and business needs grow.",
    },
  ],
} as const;

export const portfolioIndustries = {
  eyebrow: "Industries",
  heading: "Proven across demanding domains",
  items: [
    "Healthtech",
    "Fintech",
    "E-commerce",
    "Marketplace",
    "SaaS / B2B",
    "AI Products",
  ],
} as const;

export const portfolioStack = {
  eyebrow: "Technology",
  heading: "Modern stack. Production discipline.",
  items: [
    "Next.js",
    "React",
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Node.js",
    "TypeScript",
    "Python",
    "Java",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "AWS",
    "Google Cloud",
    "Azure",
    "Docker",
    "Kubernetes",
    "OpenAI",
    "LangChain",
    "GraphQL",
    "REST APIs",
  ],
} as const;

export const portfolioCta = {
  eyebrow: "Next project",
  heading: "Have a product idea worth building right?",
  description:
    "Share your roadmap, rebuild, or AI opportunity — we’ll reply with a clear next step and recommended approach.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View services", href: "/services" },
} as const;
