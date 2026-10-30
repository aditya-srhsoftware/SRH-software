"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { apartCards, apartHeader } from "@/content/about-apart";

const COLORS = {
  navy: "#151C4B",
  title: "#11153A",
  purple: "#5B2BE0",
  pink: "#F6297A",
  lightPurple: "#F8F5FF",
  lightPink: "#FFE8F2",
  border: "#ECECF3",
  body: "#6E7288",
  white: "#FFFFFF",
} as const;

export function AboutApart() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const cards = root.querySelectorAll<HTMLElement>("[data-apart-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.querySelector("[data-apart-grid]"),
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-apart-heading"
      className="relative overflow-hidden bg-[#F8F9FC] py-20 sm:py-24 lg:py-[7.5rem]"
    >
      <Container className="relative max-w-[100rem]">
        <header className="mx-auto max-w-[52rem] text-center">
          <p
            className="inline-flex items-center gap-3 font-body-poppins text-[0.7rem] font-medium uppercase tracking-[0.25em]"
            style={{ color: COLORS.navy }}
          >
            <span
              aria-hidden
              className="h-px w-6 sm:w-8"
              style={{ backgroundColor: COLORS.pink }}
            />
            {apartHeader.eyebrow}
          </p>

          <h2
            id="about-apart-heading"
            className="mt-5 font-heading-manrope text-[clamp(1.65rem,3.8vw,3rem)] font-extrabold leading-[1.2] tracking-[-0.03em] sm:mt-6"
            style={{ color: COLORS.navy }}
          >
            <span className="block">{apartHeader.headingLine1}</span>
            <span className="mt-1 block whitespace-nowrap text-[#E81E62] max-[380px]:whitespace-normal">
              {apartHeader.headingLine2}
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-[700px] font-body-poppins text-base font-normal leading-[1.7] sm:mt-6 sm:text-[1.05rem]"
            style={{ color: COLORS.body }}
          >
            {apartHeader.description}
          </p>
        </header>

        <ul
          data-apart-grid
          className="mt-14 grid list-none grid-cols-1 gap-6 p-0 sm:mt-16 sm:grid-cols-2 lg:mt-[4.5rem] lg:grid-cols-4"
        >
          {apartCards.map((card) => {
            const Icon = card.icon;

            return (
              <li
                key={card.id}
                data-apart-card
                className="group relative flex flex-col rounded-[28px] border border-[#ECECF3] bg-white p-8 shadow-[0_20px_60px_rgba(25,30,60,0.06)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2.5 hover:border-[#F6297A]/25 hover:shadow-[0_28px_70px_rgba(25,30,60,0.1)] md:p-10"
              >
                {/* Ghost number — soft navy, readable but still secondary */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-5 font-heading-manrope text-[3.25rem] font-normal leading-none tracking-[-0.04em] text-[#151C4B]/[0.14] sm:right-7 sm:top-6 sm:text-[3.75rem]"
                >
                  {card.number}
                </span>

                {/* Icon tile — clear Lucide line icons */}
                <div className="relative z-[1] mb-5 inline-flex">
                  <span className="inline-flex size-[4.5rem] items-center justify-center rounded-[20px] bg-[#FCE8F0] shadow-[0_8px_24px_rgba(232,30,98,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    <Icon
                      className="size-8 text-[#E81E62] sm:size-9"
                      strokeWidth={1.75}
                      absoluteStrokeWidth
                    />
                  </span>
                </div>

                {/* Accent line under icon — 28×3 */}
                <span
                  aria-hidden
                  className="mb-5 h-[3px] w-7 rounded-full"
                  style={{ backgroundColor: COLORS.pink }}
                />

                <h3
                  className="font-heading-manrope text-[1.25rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[1.35rem] xl:text-[1.375rem]"
                  style={{ color: COLORS.title }}
                >
                  {card.title}
                </h3>

                <p
                  className="mt-3.5 flex-1 font-body-poppins text-[0.9rem] font-normal leading-[1.8] sm:text-[0.9375rem]"
                  style={{ color: COLORS.body }}
                >
                  {card.description}
                </p>

                {/* CTA 50×50 */}
                <Link
                  href={card.href}
                  aria-label={`Learn more about ${card.title}`}
                  className="mt-8 inline-flex size-[50px] items-center justify-center rounded-full bg-[#FFE8F2] text-[#F6297A] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#5B2BE0] group-hover:to-[#F6297A] group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6297A]/40 focus-visible:ring-offset-2"
                >
                  <ArrowRight
                    className="size-[1.125rem] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
                    strokeWidth={2.25}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
