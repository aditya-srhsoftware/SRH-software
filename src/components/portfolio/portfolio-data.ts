import type { StaticImageData } from "next/image";
import furcare from "@/assets/images/Furcare.png";
import pawpular from "@/assets/images/Pawpular.png";
import payback from "@/assets/images/payback.png";
import tracker from "@/assets/images/tracker-img.png";

export type PortfolioProject = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  meta: string;
  image: StaticImageData;
  alt: string;
  tags: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "furcare-ai",
    number: "01",
    name: "Furcare AI",
    category: "AI Powered Veterinary Platform",
    meta: "Web • Healthtech",
    description:
      "An intelligent veterinary platform that helps clinics deliver smarter care with AI-assisted workflows and modern patient experience.",
    image: furcare,
    alt: "Furcare AI — smarter pet care with health, nutrition, and vaccination insights",
    tags: ["React", "Next.js", "AI", "SaaS"],
  },
  {
    id: "pawpular",
    number: "02",
    name: "Pawpular",
    category: "Pet Care Marketplace",
    meta: "Mobile • Marketplace",
    description:
      "A marketplace connecting pet owners with trusted care services, bookings, and seamless digital experiences.",
    image: pawpular,
    alt: "Pawpular product screens",
    tags: ["Next.js", "Marketplace", "UI/UX"],
  },
  {
    id: "payback-day",
    number: "03",
    name: "Payback Day",
    category: "Expense Split Platform",
    meta: "SaaS • Fintech",
    description:
      "A clean expense-splitting product that makes shared costs transparent, fair, and effortless for groups.",
    image: payback,
    alt: "Payback Day product screens",
    tags: ["React", "Fintech", "Dashboard"],
  },
  {
    id: "tracker9to5",
    number: "04",
    name: "Tracker9to5",
    category: "AI Invoice & Business Management",
    meta: "SaaS • Business",
    description:
      "AI-assisted invoicing and business operations software built for clarity, speed, and day-to-day control.",
    image: tracker,
    alt: "Tracker9to5 product screens",
    tags: ["Next.js", "Node.js", "SaaS"],
  },
];
