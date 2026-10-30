import type { LucideIcon } from "lucide-react";
import {
  Building2,
  FileText,
  Globe2,
  Rocket,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";

export type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  /** Bold metric value shown in the footer badge */
  statValue: string;
  /** Label next to the metric */
  statLabel: string;
  icon: LucideIcon;
  /** Smaller icon used in the footer metric chip */
  statIcon: LucideIcon;
  /** Accent tone for icon circle */
  tone: "pink" | "purple" | "indigo";
};

export const milestonesHeader = {
  eyebrow: "Our Milestones",
  headingBefore: "A Journey of Innovation and Trusted ",
  headingAccent: "Software Solutions",
  description:
    "From our first lines of code to global delivery — every milestone reflects craft, partnership, and products that last.",
} as const;

export const milestones: Milestone[] = [
  {
    id: "birth",
    year: "2018",
    title: "The Birth of SRH Software",
    description:
      "SRH Software was founded with a clear mission — to build reliable, modern software that helps businesses grow with confidence.",
    statValue: "5+",
    statLabel: "Team Members",
    icon: Rocket,
    statIcon: Users,
    tone: "pink",
  },
  {
    id: "workspace",
    year: "2019",
    title: "Modern Workspace Expansion",
    description:
      "We opened a dedicated studio workspace designed for collaboration, deep work, and product excellence under one roof.",
    statValue: "1",
    statLabel: "Modern Office",
    icon: Building2,
    statIcon: Building2,
    tone: "purple",
  },
  {
    id: "global",
    year: "2020",
    title: "Expanding Global Capabilities",
    description:
      "Our delivery model scaled across time zones, enabling seamless collaboration with clients around the world.",
    statValue: "12+",
    statLabel: "Countries",
    icon: Globe2,
    statIcon: Globe2,
    tone: "indigo",
  },
  {
    id: "team",
    year: "2021",
    title: "100+ Skilled Developers",
    description:
      "The team grew into a multidisciplinary unit of engineers, designers, and strategists united by craft.",
    statValue: "100+",
    statLabel: "Developers",
    icon: Star,
    statIcon: Users,
    tone: "pink",
  },
  {
    id: "projects",
    year: "2022",
    title: "50+ Projects Delivered",
    description:
      "We crossed a major delivery milestone — shipping secure, scalable products across industries.",
    statValue: "50+",
    statLabel: "Projects",
    icon: Target,
    statIcon: FileText,
    tone: "purple",
  },
  {
    id: "excellence",
    year: "2023",
    title: "Recognized for Excellence",
    description:
      "Industry recognition followed years of consistent quality, transparency, and client outcomes.",
    statValue: "Top",
    statLabel: "Rated Studio",
    icon: Trophy,
    statIcon: Trophy,
    tone: "indigo",
  },
];

export const toneStyles = {
  pink: {
    iconBg: "bg-[#FFE4EF]",
    iconText: "text-[#E81E62]",
    arrowBg: "bg-[#FFE4EF]",
    arrowText: "text-[#E81E62]",
    arrowHover: "group-hover:bg-[#E81E62]",
  },
  purple: {
    iconBg: "bg-[#EDE4FF]",
    iconText: "text-[#7C3AED]",
    arrowBg: "bg-[#EDE4FF]",
    arrowText: "text-[#7C3AED]",
    arrowHover: "group-hover:bg-[#7C3AED]",
  },
  indigo: {
    iconBg: "bg-[#E4E9FF]",
    iconText: "text-[#4F46E5]",
    arrowBg: "bg-[#E4E9FF]",
    arrowText: "text-[#4F46E5]",
    arrowHover: "group-hover:bg-[#4F46E5]",
  },
} as const;
