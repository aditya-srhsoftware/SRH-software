import type { Metadata } from "next";
import { PortfolioLanding } from "@/components/portfolio/portfolio-landing";
import { portfolioMeta } from "@/content/portfolio";

export const metadata: Metadata = {
  title: portfolioMeta.title,
  description: portfolioMeta.description,
};

export default function PortfolioPage() {
  return <PortfolioLanding />;
}
