import { HeroCertifications } from "@/components/home/hero-certifications";
import { HeroSection } from "@/components/home/hero-section";
import { HomeContact } from "@/components/home/home-contact";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesIntro } from "@/components/home/services-intro";
import { TrustMetrics } from "@/components/home/trust-metrics";
import { WhySrh } from "@/components/home/why-srh";
import { FeaturedShowcase } from "@/components/portfolio/featured-showcase";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroCertifications />
      <FeaturedShowcase />
      <WhySrh />
      <TrustMetrics />
      <ServicesIntro />
      <ProcessSection />
      <HomeContact />
    </>
  );
}
