import type { StaticImageData } from "next/image";
import { Shield, Target, Users, type LucideIcon } from "lucide-react";
import leadershipImg from "@/assets/images/process/discover.jpg";
import collaborationImg from "@/assets/images/about/team.jpg";
import qualityImg from "@/assets/images/process/support.jpg";

/**
 * Editable About → Philosophy content.
 * Use **double asterisks** around phrases that should render bold.
 */
export type PhilosophyBlob = {
  position: string;
  size: string;
  color: string;
};

export type PhilosophyCard = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconClass: string;
  placement: string;
};

export type PhilosophyBlock = {
  id: string;
  number: string;
  label: string;
  heading: string;
  accent: string;
  body: string;
  image: StaticImageData;
  imageAlt: string;
  /** When true: image left / content right */
  imageLeft: boolean;
  blob: PhilosophyBlob;
  card: PhilosophyCard;
};

export const philosophyHeader = {
  eyebrow: "Our Philosophy",
  headingBefore: "The SRH Softwares ",
  headingAccent: "Business Philosophy",
  description:
    "At **SRH Softwares**, we believe that strong values create stronger software. **Moreover**, our **experienced software developers** follow a clear philosophy that guides every project we deliver.",
} as const;

export const philosophyBlocks: PhilosophyBlock[] = [
  {
    id: "leadership",
    number: "01",
    label: "Supervision",
    heading: "Leadership That Sparks Innovation",
    accent: "Innovation",
    body: "At SRH Softwares, we believe great products start with strong **leadership**. **That’s why** our **experienced software developers** guide every project with clarity, ownership, and a culture that sparks lasting innovation.",
    image: leadershipImg,
    imageAlt: "SRH Softwares team collaborating in a workshop session",
    imageLeft: true,
    blob: {
      position: "-left-6 -top-6",
      size: "h-[62%] w-[52%]",
      color: "bg-[#8B7CFF]/[0.14]",
    },
    card: {
      title: "Leadership",
      subtitle: "Empowering Teams",
      icon: Users,
      iconClass: "bg-[#EEF0FF] text-[#6B5CFF]",
      placement: "-bottom-5 left-6 sm:-bottom-6 sm:left-8",
    },
  },
  {
    id: "collaboration",
    number: "02",
    label: "Strength",
    heading: "Collaboration That Drives Results",
    accent: "Drives Results",
    body: "**In fact**, great software is never built alone. **Consequently**, our **experienced software developers** work side by side with clients — sharing ideas, iterating fast, and delivering outcomes that move the business forward.",
    image: collaborationImg,
    imageAlt: "Team collaborating around a table with laptops",
    imageLeft: false,
    blob: {
      position: "-right-6 -top-6",
      size: "h-[58%] w-[54%]",
      color: "bg-[#FF2E72]/[0.12]",
    },
    card: {
      title: "Collaboration",
      subtitle: "Shared Success",
      icon: Target,
      iconClass: "bg-[#FFE8F0] text-[#FF2E72]",
      placement: "-bottom-5 right-6 sm:-bottom-6 sm:right-8",
    },
  },
  {
    id: "transparency",
    number: "03",
    label: "Quality",
    heading: "Building Trust Through Transparency",
    accent: "Transparency",
    body: "**Therefore**, we keep communication open and decisions honest at every stage. Our **experienced software developers** build trust through clear timelines, ethical practices, and software quality you can rely on.",
    image: qualityImg,
    imageAlt: "Professionals celebrating a successful project milestone",
    imageLeft: true,
    blob: {
      position: "-left-6 -top-6",
      size: "h-[56%] w-[50%]",
      color: "bg-[#FF2E72]/[0.1]",
    },
    card: {
      title: "Quality",
      subtitle: "Trusted Solutions",
      icon: Shield,
      iconClass: "bg-[#E8F1FF] text-[#3B82F6]",
      placement: "-bottom-5 left-6 sm:-bottom-6 sm:left-8",
    },
  },
];
