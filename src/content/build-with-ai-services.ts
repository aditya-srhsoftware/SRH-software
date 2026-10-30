import chatbotImg from "@/assets/images/ai-services/chatbot.jpg";
import analyticsImg from "@/assets/images/ai-services/analytics.jpg";
import nlpImg from "@/assets/images/ai-services/nlp.jpg";
import visionImg from "@/assets/images/ai-services/vision.jpg";
import integrationImg from "@/assets/images/ai-services/integration.jpg";

export const buildWithAiServices = {
  id: "ai-services",
  eyebrow: "Our AI Services",
  headingLine1: "Powerful AI Solutions",
  headingLine2Before: "Built for ",
  headingAccent: "Real Impact",
  descriptionLine1: "We combine advanced AI technologies with deep",
  descriptionLine2:
    "industry expertise to build intelligent business solutions.",
  cta: { label: "Explore All Services", href: "/services" },
  items: [
    {
      id: "chatbots",
      title: "AI Chatbots &\nVirtual Assistants",
      description:
        "Conversational agents that support customers, qualify leads, and resolve requests around the clock.",
      image: chatbotImg,
      accent: "#7B5CFF",
      border: "#DDD0FF",
      href: "/services",
    },
    {
      id: "analytics",
      title: "Predictive Analytics",
      description:
        "Forecast demand, risk, and opportunity with models tuned to your data and workflows.",
      image: analyticsImg,
      accent: "#3B82F6",
      border: "#BFDBFE",
      href: "/services",
    },
    {
      id: "nlp",
      title: "NLP",
      description:
        "Turn documents, tickets, and conversations into structured insight your teams can act on.",
      image: nlpImg,
      accent: "#E81E62",
      border: "#FBCFE0",
      href: "/services",
    },
    {
      id: "vision",
      title: "Computer Vision",
      description:
        "Detect, classify, and extract meaning from images and video with production-ready pipelines.",
      image: visionImg,
      accent: "#0D9488",
      border: "#99F6E4",
      href: "/services",
    },
    {
      id: "integration",
      title: "Custom AI Integration",
      description:
        "Connect models into your stack with secure APIs, orchestration, and governance built in.",
      image: integrationImg,
      accent: "#EA580C",
      border: "#FED7AA",
      href: "/services",
    },
  ],
} as const;
