export const buildWithAiMeta = {
  title: "Build with AI",
  description:
    "Partner with SRH Software to design and ship AI-powered products — intelligent workflows, assistants, and platforms built for real business outcomes.",
} as const;

export const buildWithAiHero = {
  eyebrow: "AI Powered Product Engineering",
  headingBefore: "Build Smarter, Faster & Scalable ",
  headingAccent: "AI Solutions for Your Business",
  description:
    "SRH Software designs and ships AI-powered products that solve real problems — intelligent workflows, assistants, and platforms built for clarity, performance, and lasting quality.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "Learn more", href: "#platforms" },
  stats: [
    { value: "120+", label: "Products shipped", tone: "pink" as const },
    { value: "98%", label: "Client retention", tone: "purple" as const },
    { value: "12+", label: "Industries covered", tone: "magenta" as const },
  ],
} as const;

export const buildWithAiPlatforms = {
  id: "platforms",
  eyebrow: "Built on top of the best AI platforms",
  heading: "Enterprise-ready AI stack",
  items: [
    {
      id: "openai",
      title: "ChatGPT & GPT-4",
      subtitle: "OpenAI",
      description:
        "Production assistants, content systems, and reasoning workflows powered by GPT-class models.",
      icon: "openai" as const,
      tint: "#0D0D0D",
    },
    {
      id: "claude",
      title: "Claude AI",
      subtitle: "Anthropic",
      description:
        "Long-context analysis, careful reasoning, and document-heavy workflows for enterprise teams.",
      icon: "claude" as const,
      tint: "#D97757",
    },
    {
      id: "whisper",
      title: "Whisper",
      subtitle: "Speech",
      description:
        "Accurate speech-to-text for support, meetings, and voice-led product experiences.",
      icon: "whisper" as const,
      tint: "#B8D4E8",
    },
    {
      id: "langchain",
      title: "LangChain",
      subtitle: "Orchestration",
      description:
        "Composable agents, retrieval pipelines, and tool-calling systems wired into your stack.",
      icon: "langchain" as const,
      tint: "#0D9488",
    },
    {
      id: "opensource",
      title: "Open Source Models",
      subtitle: "LLaMA & more",
      description:
        "Self-hosted and hybrid deployments when data residency and cost control matter most.",
      icon: "opensource" as const,
      tint: "#0668E1",
    },
    {
      id: "vertex",
      title: "Google Vertex AI",
      subtitle: "Gemini",
      description:
        "Multimodal Gemini models and managed ML ops for scalable cloud-native AI products.",
      icon: "vertex" as const,
      tint: "#4285F4",
    },
  ],
} as const;

export const buildWithAiIndustries = {
  eyebrow: "Industries we serve",
  heading: "Industries We Serve",
  items: [
    {
      id: "ecommerce",
      title: "E-commerce",
      description: "Boost sales with smart recommendations and automation.",
      icon: "ecommerce" as const,
    },
    {
      id: "healthcare",
      title: "Healthcare",
      description: "Enhancing care and diagnostics through intelligent data.",
      icon: "healthcare" as const,
    },
    {
      id: "realestate",
      title: "Real Estate",
      description: "Smarter insights for smarter investments.",
      icon: "realestate" as const,
    },
    {
      id: "finance",
      title: "Finance & Banking",
      description: "Secure, fast, and data-driven financial decisions.",
      icon: "finance" as const,
    },
    {
      id: "marketing",
      title: "Marketing & Advertising",
      description: "Automate your campaigns and boost performance.",
      icon: "marketing" as const,
    },
  ],
} as const;

export const buildWithAiTestimonials = {
  id: "testimonials",
  heading: "What Our Users Are Saying",
  items: [
    {
      id: "aiden",
      quote:
        "Implementing this AI tool has completely transformed our workflow. Tasks that used to take hours now take minutes, and our team can finally focus on creative work instead of repetitive processes.",
      name: "Aiden Brooks",
      role: "Project Coordinator",
      rating: 5,
      border: "#F97316",
      avatarTone: "#F97316",
    },
    {
      id: "clara",
      quote:
        "The real-time responses and easy integration are exactly what we needed. Customer satisfaction is up, and our support team feels more confident handling complex questions every day.",
      name: "Clara Jensen",
      role: "Customer Success Lead",
      rating: 5,
      border: "#FB923C",
      avatarTone: "#FB923C",
    },
    {
      id: "leila",
      quote:
        "Multilingual support and consistent accuracy make this AI tool a must-have for our global campaigns. We launched in new markets faster without sacrificing brand voice.",
      name: "Leila Monroe",
      role: "Global Marketing Director",
      rating: 5,
      border: "#E81E62",
      avatarTone: "#E81E62",
    },
    {
      id: "omar",
      quote:
        "With advanced encryption and real-time monitoring, we finally feel confident deploying AI across sensitive workflows. Security reviews passed on the first attempt.",
      name: "Omar Castillo",
      role: "Cybersecurity Lead",
      rating: 5,
      border: "#EF4444",
      avatarTone: "#EF4444",
    },
    {
      id: "elina",
      quote:
        "From setup to deployment, their documentation and support made everything simple. We shipped our first AI feature in weeks, not quarters.",
      name: "Elina D’Souza",
      role: "Full Stack Developer",
      rating: 5,
      border: "#F59E0B",
      avatarTone: "#F59E0B",
    },
    {
      id: "nathan",
      quote:
        "This solution paid for itself within weeks. The automation and analytics boost our ROI while keeping reporting clear for leadership.",
      name: "Nathan Zhu",
      role: "Finance Analyst",
      rating: 5,
      border: "#F43F5E",
      avatarTone: "#F43F5E",
    },
  ],
} as const;

export const buildWithAiConnect = {
  id: "connect",
  heading: "Connect with Our AI Experts",
  description:
    "Have a project in mind or need guidance? Share your goals, and our team will get back to you with tailored insights within 24 hours.",
  email: {
    label: "Send us an email:",
    value: "sales@srhsoftwares.com",
    href: "mailto:sales@srhsoftwares.com",
  },
  phone: {
    label: "Give us a call:",
    value: "+91- 882-615-6384",
    href: "tel:+918826156384",
  },
  socialLabel: "Follow us:",
  social: [
    {
      id: "pinterest",
      label: "Pinterest",
      href: "https://www.pinterest.com/",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/",
    },
  ],
} as const;

export const buildWithAiFaq = {
  id: "faq",
  heading: "Feel free to connect for more insights",
  description:
    "Our AI-powered tools are ready to go—helping businesses tap into advanced intelligence fast, without the wait or heavy development effort in dynamic industries.",
  cta: { label: "Ask your questions", href: "/contact" },
  items: [
    {
      id: "start",
      question: "How do I start with your AI SaaS tools?",
      answer:
        "Simply sign up on our website to get started. Choose a tool like ChatGPT, DALL·E, or Vertex AI and begin exploring pre-built modules.",
    },
    {
      id: "customize",
      question: "Can I customize your AI tools for my needs?",
      answer:
        "Yes. We tailor models, workflows, and integrations to your stack—APIs, data sources, governance, and UI—so the solution fits how your team already works.",
    },
    {
      id: "operations",
      question: "How can AI improve my operations?",
      answer:
        "AI can automate routine work, surface insights from documents and data, speed up support, and help teams make clearer decisions with less manual effort.",
    },
  ],
} as const;
