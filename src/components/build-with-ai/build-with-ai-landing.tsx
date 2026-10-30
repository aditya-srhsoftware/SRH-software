"use client";

import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  HandHeart,
  Home,
  Landmark,
  MonitorSmartphone,
  ShoppingCart,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { DashboardPreview } from "@/components/build-with-ai/dashboard-preview";
import { AiConnectSection } from "@/components/build-with-ai/ai-connect-section";
import { AiFaqSection } from "@/components/build-with-ai/ai-faq-section";
import { AiServicesSection } from "@/components/build-with-ai/ai-services-section";
import { AiTestimonialsCarousel } from "@/components/build-with-ai/ai-testimonials-carousel";
import { PlatformIcon } from "@/components/build-with-ai/platform-icon";
import { cn } from "@/lib/utils";
import {
  buildWithAiHero,
  buildWithAiIndustries,
  buildWithAiPlatforms,
} from "@/content/build-with-ai";

const industryIcons = {
  ecommerce: ShoppingCart,
  healthcare: HandHeart,
  realestate: Home,
  finance: Landmark,
  marketing: MonitorSmartphone,
} as const;

export function BuildWithAiLanding() {
  return (
    <div className="relative overflow-hidden bg-[#FAF8F4] text-[#151C4B]">
      {/* Near-white field + one quiet light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(ellipse_at_20%_0%,rgba(232,30,98,0.06),transparent_55%),radial-gradient(ellipse_at_85%_10%,rgba(124,58,237,0.05),transparent_50%)]" />
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-[8.5rem] lg:pb-24">
        <Container className="relative max-w-[84rem]">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
            <div className="relative z-[1] max-w-[32.5rem]">
              <p className="inline-flex items-center gap-3 font-body-poppins text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-[#E81E62]/90">
                <span aria-hidden className="h-px w-7 bg-[#E81E62]/70" />
                {buildWithAiHero.eyebrow}
              </p>

              <h1 className="mt-7 font-heading-manrope text-[clamp(2.35rem,4.8vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.04em] text-[#151C4B]">
                {buildWithAiHero.headingBefore}
                <span className="text-[#E81E62]">
                  {buildWithAiHero.headingAccent}
                </span>
              </h1>

              <p className="mt-7 max-w-[28rem] font-body-poppins text-[1.0625rem] font-normal leading-[1.8] text-[#6B7280] sm:text-[1.125rem] sm:leading-[1.8]">
                {buildWithAiHero.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={buildWithAiHero.primaryCta.href}
                  className="group inline-flex h-[3.15rem] items-center gap-2.5 rounded-full bg-[#151C4B] px-7 text-[0.9375rem] font-semibold tracking-[-0.01em] text-white transition-all duration-300 hover:bg-[#1B2458] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151C4B]"
                >
                  {buildWithAiHero.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={buildWithAiHero.secondaryCta.href}
                  className="inline-flex h-[3.15rem] items-center gap-2 rounded-full border border-[#E5E5EA] bg-transparent px-7 text-[0.9375rem] font-semibold tracking-[-0.01em] text-[#151C4B] transition-all duration-300 hover:border-[#D4D4DA] hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151C4B]"
                >
                  {buildWithAiHero.secondaryCta.label}
                </Link>
              </div>

              <ul className="mt-14 flex list-none flex-wrap items-stretch gap-0 divide-x divide-[#E5E5EA] border-t border-[#E5E5EA] p-0 pt-8">
                {buildWithAiHero.stats.map((stat, index) => (
                  <li
                    key={stat.label}
                    className={cn(
                      "min-w-[7.5rem] flex-1 px-5 first:pl-0 last:pr-0 sm:min-w-0",
                      index === 0 && "pl-0",
                    )}
                  >
                    <p className="font-heading-manrope text-[1.35rem] font-bold tracking-[-0.03em] text-[#151C4B] sm:text-[1.5rem]">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 font-body-poppins text-[0.8125rem] leading-snug text-[#8B90A0]">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative w-full lg:justify-self-end">
              <DashboardPreview />
            </div>
          </div>
        </Container>
      </section>

      <AiServicesSection />

      {/* ── AI Platforms ──────────────────────────────────────── */}
      <section
        id={buildWithAiPlatforms.id}
        className="relative scroll-mt-28 py-16 sm:py-20 lg:py-24"
      >
        <Container className="relative max-w-[86rem]">
          <header className="mx-auto max-w-[40rem] text-center">
            <p className="font-body-poppins text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#E81E62]">
              {buildWithAiPlatforms.eyebrow}
            </p>
            <h2 className="mt-4 font-heading-manrope text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold tracking-[-0.03em] text-[#151C4B]">
              {buildWithAiPlatforms.heading}
            </h2>
          </header>

          <ul className="mt-12 grid list-none grid-cols-1 gap-5 p-0 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7">
            {buildWithAiPlatforms.items.map((item) => (
              <li key={item.id}>
                <article className="group relative flex h-full flex-col rounded-[1.75rem] border border-[#ECECEC] bg-white p-7 shadow-[0_10px_30px_-22px_rgba(21,28,75,0.2)] transition-all duration-300 hover:-translate-y-2 hover:border-[#E0D4F5] hover:shadow-[0_24px_48px_-24px_rgba(21,28,75,0.28)] sm:p-8">
                  <PlatformIcon kind={item.icon} tint={item.tint} />
                  <h3 className="mt-5 font-heading-manrope text-[1.25rem] font-bold tracking-[-0.02em] text-[#151C4B] sm:mt-6 sm:text-[1.4rem]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 font-body-poppins text-[0.8rem] font-medium text-[#8B90A0]">
                    {item.subtitle}
                  </p>

                  <p className="mt-4 flex-1 font-body-poppins text-[0.95rem] leading-[1.7] text-[#5C5370] sm:mt-5 sm:text-base sm:leading-[1.75]">
                    {item.description}
                  </p>

                  <div className="mt-7 flex justify-end">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#FFE8F2] text-[#E81E62] transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#7C3AED] group-hover:to-[#E81E62] group-hover:text-white">
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Industries ────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] px-5 py-14 sm:rounded-[2.5rem] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <header className="relative mx-auto max-w-[36rem] text-center">
              <p className="font-body-poppins text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-white/45">
                {buildWithAiIndustries.eyebrow}
              </p>
              <h2 className="mt-3 font-heading-manrope text-[clamp(1.85rem,3.6vw,3rem)] font-extrabold tracking-[-0.03em] text-white">
                {buildWithAiIndustries.heading}
              </h2>
            </header>

            {/* 3 + 2 layout matching reference */}
            <ul className="relative mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-6 lg:gap-5">
              {buildWithAiIndustries.items.map((item, index) => {
                const Icon = industryIcons[item.icon];
                const isWide = index >= 3;
                return (
                  <li
                    key={item.id}
                    className={cn(isWide ? "lg:col-span-3" : "lg:col-span-2")}
                  >
                    <article
                      className={cn(
                        "group flex h-full min-h-[16.5rem] cursor-pointer flex-col rounded-[1.5rem] bg-[#1A1A1A] p-7 text-white transition-all duration-300",
                        "hover:-translate-y-1.5 hover:bg-[#7C3AED] hover:shadow-[0_28px_56px_-24px_rgba(124,58,237,0.7)]",
                        "sm:min-h-[17.5rem] sm:p-8",
                      )}
                    >
                      <span className="inline-flex text-white">
                        {item.icon === "ecommerce" ? (
                          <span className="relative inline-flex size-10 items-center justify-center">
                            <ShoppingCart className="size-9" strokeWidth={1.5} />
                            <Globe2
                              className="absolute bottom-0.5 right-0 size-4"
                              strokeWidth={2}
                            />
                          </span>
                        ) : (
                          <Icon className="size-9" strokeWidth={1.5} />
                        )}
                      </span>

                      <h3 className="mt-8 font-heading-manrope text-[1.35rem] font-bold tracking-[-0.02em] text-white sm:text-[1.5rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 flex-1 font-body-poppins text-[0.95rem] leading-[1.65] text-white/80 sm:text-base">
                        {item.description}
                      </p>

                      <div className="mt-8">
                        <span className="inline-flex text-white/90 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-white">
                          <ArrowRight className="size-5" strokeWidth={1.75} />
                        </span>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <AiTestimonialsCarousel />

      <AiFaqSection />

      <AiConnectSection />
    </div>
  );
}
