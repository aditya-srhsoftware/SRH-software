import { ArrowUpRight } from "lucide-react";
import { HeroBackground } from "@/components/home/hero-background";
import { HeroHeadline } from "@/components/home/hero-headline";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[min(36rem,100dvh)] items-center overflow-hidden sm:min-h-[min(40rem,100dvh)] md:min-h-[min(44rem,100dvh)] lg:min-h-[calc(78vh+100px)]">
      <HeroBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(12,6,28,0.72)_0%,rgba(26,16,48,0.55)_42%,rgba(12,6,28,0.82)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,6,28,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-[linear-gradient(180deg,rgba(12,6,28,0.45),transparent)] sm:h-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 z-[1] hidden h-72 w-72 rounded-full bg-violet/30 blur-3xl md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-16 z-[1] hidden h-80 w-80 rounded-full bg-magenta/20 blur-3xl md:block"
      />

      <div className="ds-container relative z-10 flex flex-col items-center pb-16 pt-24 text-center sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
        <p className="animate-fade-up inline-flex max-w-full items-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-magenta-300 backdrop-blur-md sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.22em] md:text-sm">
          <span className="truncate">
            Software engineering & digital transformation
          </span>
        </p>

        <HeroHeadline />

        <p className="animate-fade-up animation-delay-200 mt-4 max-w-2xl text-pretty text-[clamp(0.95rem,2.4vw,1.2rem)] leading-relaxed text-white/80 sm:mt-6">
          {siteConfig.name} designs and delivers custom software, SaaS
          products, cloud platforms, and AI-powered workflows that help teams
          move faster with confidence.
        </p>

        <div className="animate-fade-up animation-delay-300 mt-8 flex w-full max-w-md flex-row items-center justify-center gap-2.5 sm:mt-10 sm:max-w-none sm:w-auto sm:gap-4">
          <ButtonLink
            href="/contact"
            variant="primary"
            className="h-11 min-w-0 flex-1 px-3 text-[0.8rem] sm:h-12 sm:flex-none sm:px-7 sm:text-sm"
          >
            Contact us
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
          </ButtonLink>
          <ButtonLink
            href="/portfolio"
            variant="glass"
            className="h-11 min-w-0 flex-1 px-3 text-[0.8rem] sm:h-12 sm:flex-none sm:px-7 sm:text-sm"
          >
            View portfolio
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
