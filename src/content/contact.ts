export const contactMeta = {
  title: "Contact us",
  description:
    "Tell SRH Software what you want to build. Share your goals and we’ll reply with a clear next step within 24 hours.",
} as const;

export const contactHero = {
  eyebrow: "Get in touch",
  brand: "SRH Software",
  headingLine1: "Start a",
  headingLine2Before: "conversation.",
  headingAccent: "",
  description:
    "Tell us what you’re building. We’ll reply with a clear next step — usually within one business day.",
} as const;

export const contactDetails = {
  email: {
    label: "Email",
    value: "sales@srhsoftwares.com",
    href: "mailto:sales@srhsoftwares.com",
  },
  phone: {
    label: "Phone",
    value: "+91- 882-615-6384",
    href: "tel:+918826156384",
  },
  hours: {
    label: "Response time",
    value: "Within 24 hours",
  },
} as const;

export const contactReasons = [
  {
    title: "New product build",
    description: "From discovery to launch for web, mobile, and AI products.",
  },
  {
    title: "Rebuild or modernization",
    description: "Upgrade legacy systems with cleaner UX and stronger architecture.",
  },
  {
    title: "AI integration",
    description: "Assistants, automation, and model-backed workflows in production.",
  },
  {
    title: "Dedicated partnership",
    description: "Ongoing engineering support with clear ownership and delivery.",
  },
] as const;

export const contactSocial = [
  { id: "pinterest" as const, label: "Pinterest", href: "https://www.pinterest.com/" },
  { id: "x" as const, label: "X", href: "https://x.com/" },
  { id: "linkedin" as const, label: "LinkedIn", href: "https://www.linkedin.com/" },
  { id: "instagram" as const, label: "Instagram", href: "https://www.instagram.com/" },
] as const;

export const contactFaq = [
  {
    question: "How soon will you reply?",
    answer:
      "We typically respond within one business day with a clear next step and any questions we need to move forward.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "A short summary of the product, timeline, and goals is enough. Screens, links, or a rough brief help us respond faster.",
  },
  {
    question: "Do you work with startups and enterprises?",
    answer:
      "Yes. We partner with both — scoped MVP builds, platform rebuilds, and long-term product engineering.",
  },
] as const;
