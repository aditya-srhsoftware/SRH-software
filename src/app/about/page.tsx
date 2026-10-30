import type { Metadata } from "next";
import { AboutApart } from "@/components/about/about-apart";
import { AboutHero } from "@/components/about/about-hero";
import { AboutMilestones } from "@/components/about/about-milestones";
import { AboutOffices } from "@/components/about/about-offices";
import { AboutPhilosophy } from "@/components/about/about-philosophy";
import { AboutPurpose } from "@/components/about/about-purpose";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SRH Software — experienced developers building modern digital products, with a clear vision and mission for trusted custom software.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutPurpose />
      <AboutPhilosophy />
      <AboutApart />
      <AboutMilestones />
      <AboutOffices />
    </>
  );
}
