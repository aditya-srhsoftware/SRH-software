import type { LucideIcon } from "lucide-react";
import {
  Award,
  ChartColumnIncreasing,
  Handshake,
  Rocket,
} from "lucide-react";

export type ApartCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export const apartHeader = {
  eyebrow: "What Sets Us Apart",
  headingLine1: "Why Choose Our",
  headingLine2: "Experienced Software Developers",
  description:
    "We combine technical expertise, a client-first approach, and a passion for innovation to deliver software solutions that create real business value.",
} as const;

export const apartCards: ApartCard[] = [
  {
    id: "partnerships",
    number: "01",
    title: "Long-Term Partnerships",
    description:
      "To begin with, we build lasting client relationships through trust and transparency. Our experienced software developers ensure reliable support as your business grows and evolves.",
    icon: Handshake,
    href: "/contact",
  },
  {
    id: "quality",
    number: "02",
    title: "Quality-Driven Results",
    description:
      "Moreover, our experienced software developers focus on delivering high-quality, scalable solutions that meet your long-term business goals and exceed user expectations.",
    icon: Award,
    href: "/contact",
  },
  {
    id: "expertise",
    number: "03",
    title: "Proven Expertise",
    description:
      "In fact, our experienced software developers bring a wealth of technical knowledge, allowing us to deliver innovative, custom software solutions across industries.",
    icon: Rocket,
    href: "/contact",
  },
  {
    id: "cost",
    number: "04",
    title: "Cost-Effective Delivery",
    description:
      "As a result, our experienced software developers offer affordable, future-ready solutions that deliver long-term scalability and strong ROI.",
    icon: ChartColumnIncreasing,
    href: "/contact",
  },
];
