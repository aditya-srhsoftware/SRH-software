"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { buildWithAiServices } from "@/content/build-with-ai-services";

export function AiServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-ai-fade]"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={buildWithAiServices.id}
      className="relative scroll-mt-28 overflow-hidden bg-[#FDFDFD] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.1),transparent_70%)] blur-3xl sm:-right-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-24 size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.09),transparent_70%)] blur-3xl"
      />

      <Container>
        {/* Header — heading left, copy + CTA right */}
        <div
          data-ai-fade
          className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-14 xl:gap-20"
        >
          <div className="min-w-0 max-w-[38rem] shrink">
            <p className="inline-flex items-center gap-3 font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#E81E62]/90 sm:text-[0.75rem]">
              <span aria-hidden className="h-px w-7 bg-[#E81E62]/70 sm:w-8" />
              {buildWithAiServices.eyebrow}
            </p>

            <h2 className="mt-4 font-heading-manrope text-[clamp(2.15rem,4.6vw,3.75rem)] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#151C4B] sm:mt-5">
              <span className="block">{buildWithAiServices.headingLine1}</span>
              <span className="block">
                {buildWithAiServices.headingLine2Before}
                <span className="text-[#E81E62]">
                  {buildWithAiServices.headingAccent}
                </span>
              </span>
            </h2>
          </div>

          <div className="flex w-full max-w-[28rem] flex-col gap-5 pt-1 sm:gap-6 lg:w-auto lg:shrink-0 lg:items-end lg:pt-10">
            <p className="max-w-[36ch] font-body-poppins text-[0.95rem] font-normal leading-[1.7] text-[#6B7280] sm:text-[1.0625rem] lg:max-w-none lg:text-right">
              <span className="block lg:whitespace-nowrap">
                {buildWithAiServices.descriptionLine1}
              </span>
              <span className="block lg:whitespace-nowrap">
                {buildWithAiServices.descriptionLine2}
              </span>
            </p>
            <Link
              href={buildWithAiServices.cta.href}
              className="group relative inline-flex h-[3.15rem] items-center gap-2.5 overflow-hidden rounded-full bg-[#151C4B] px-7 text-[0.9375rem] font-semibold tracking-[-0.01em] text-white transition-all duration-300 hover:bg-[#1B2458] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151C4B]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">{buildWithAiServices.cta.label}</span>
              <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Cards */}
        <ul
          data-ai-fade
          className="mt-12 grid list-none grid-cols-1 gap-5 p-0 sm:mt-14 sm:grid-cols-2 sm:gap-6 md:gap-7 lg:mt-16 xl:mt-20 xl:grid-cols-5 xl:gap-8 2xl:gap-10"
        >
          {buildWithAiServices.items.map((item) => (
            <li key={item.id} className="min-w-0">
              <article
                className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.5rem] border bg-white p-6 text-[#151C4B] shadow-[0_10px_30px_-22px_rgba(21,28,75,0.18)] transition-all duration-300 will-change-transform hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgba(21,28,75,0.26)] sm:rounded-[1.75rem] sm:p-7 xl:min-h-[26rem] xl:p-8"
                style={{ borderColor: item.border }}
              >
                <div className="relative mx-auto flex w-full max-w-[11rem] items-center justify-center sm:max-w-[12rem] xl:max-w-[13rem]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 scale-90 rounded-full opacity-55 blur-3xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, ${item.accent}66, transparent 68%)`,
                    }}
                  />
                  <div className="bwa-float relative aspect-square w-full overflow-hidden rounded-[1.25rem] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04] sm:rounded-[1.5rem]">
                    <Image
                      src={item.image}
                      alt=""
                      width={420}
                      height={420}
                      sizes="(max-width: 640px) 48vw, (max-width: 1280px) 24vw, 210px"
                      className="h-full w-full object-cover drop-shadow-[0_22px_40px_rgba(21,28,75,0.14)]"
                    />
                  </div>
                </div>

                <h3 className="relative mt-6 whitespace-pre-line font-heading-manrope text-[1.35rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#151C4B] sm:mt-7 sm:text-[1.5rem] xl:mt-8 xl:text-[1.65rem]">
                  {item.title}
                </h3>

                <p className="relative mt-2.5 flex-1 font-body-poppins text-[0.9375rem] font-normal leading-[1.7] text-[#6B7280] sm:mt-3 sm:text-[1rem]">
                  {item.description}
                </p>

                <div className="relative mt-6 flex items-center justify-between gap-3 sm:mt-7 xl:mt-8">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 font-body-poppins text-[0.9375rem] font-semibold text-[#151C4B] transition-colors hover:opacity-70 sm:text-[1rem]"
                  >
                    Learn More
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={item.href}
                    aria-label={`Learn more about ${item.title.replace("\n", " ")}`}
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-white shadow-[0_10px_22px_-12px_rgba(17,24,39,0.4)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-105 sm:size-11"
                    style={{
                      background: `linear-gradient(135deg, ${item.accent}, ${item.accent}CC)`,
                    }}
                  >
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
