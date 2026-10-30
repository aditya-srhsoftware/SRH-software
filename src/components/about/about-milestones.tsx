"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import {
  milestones,
  milestonesHeader,
  toneStyles,
  type Milestone,
} from "@/content/about-milestones";

/**
 * Solid gradient node sitting ON the timeline path
 * (matches reference: filled circle with white rim).
 */
function TimelineNode({ year }: { year?: string }) {
  return (
    <span
      data-milestone-node
      title={year}
      className="relative z-[4] inline-flex size-[15px] shrink-0 items-center justify-center xl:size-4"
    >
      <span
        aria-hidden
        className="absolute -inset-1.5 rounded-full bg-[#C026D3]/25 blur-[2px]"
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border-[2.5px] border-white bg-gradient-to-br from-[#7C3AED] to-[#E81E62] shadow-[0_2px_8px_rgba(124,58,237,0.35)]"
      />
    </span>
  );
}

function MilestoneCard({
  item,
  className,
  slideFrom = "up",
}: {
  item: Milestone;
  className?: string;
  slideFrom?: "left" | "right" | "up";
}) {
  const Icon = item.icon;
  const StatIcon = item.statIcon;
  const tone = toneStyles[item.tone];

  return (
    <article
      data-milestone-card
      data-slide-from={slideFrom}
      className={cn(
        "group relative flex w-full flex-col rounded-[22px] border border-[#ECECF3] bg-white p-5 shadow-[0_12px_36px_-16px_rgba(21,28,75,0.14)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_20px_48px_-14px_rgba(21,28,75,0.2)] sm:rounded-[24px] sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 sm:size-12",
            tone.iconBg,
            tone.iconText,
          )}
        >
          <Icon className="size-5 sm:size-[1.35rem]" strokeWidth={1.75} />
        </span>
        <span className="font-body-poppins text-[0.8rem] font-bold tracking-wide text-[#E81E62]">
          {item.year}
        </span>
      </div>

      <h3 className="mt-4 font-heading-manrope text-[1.1rem] font-bold leading-snug tracking-[-0.02em] text-[#151C4B] sm:mt-5 sm:text-[1.25rem]">
        {item.title}
      </h3>

      <p className="mt-2 font-body-poppins text-[0.85rem] leading-[1.7] text-[#6E7288] sm:text-[0.9rem] sm:leading-[1.75]">
        {item.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#F2F3F7] pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "inline-flex size-7 shrink-0 items-center justify-center rounded-full",
              tone.iconBg,
              tone.iconText,
            )}
          >
            <StatIcon className="size-3.5" strokeWidth={2} />
          </span>
          <span data-milestone-stat className="truncate">
            <span className="font-heading-manrope text-[0.85rem] font-bold text-[#151C4B]">
              {item.statValue}
            </span>{" "}
            <span className="font-body-poppins text-[0.75rem] text-[#6E7288]">
              {item.statLabel}
            </span>
          </span>
        </div>

        <Link
          href="/contact"
          aria-label={`Learn more about ${item.title}`}
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
            tone.arrowBg,
            tone.arrowText,
            tone.arrowHover,
            "group-hover:text-white",
          )}
        >
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={2.25}
          />
        </Link>
      </div>
    </article>
  );
}

/**
 * Tablet / Mobile (reference):
 * Vertical DASHED line on the left → solid nodes →
 * short horizontal dashed stem → card on the right.
 *
 * Rail is a fixed w-10 column; track + nodes share that same center
 * so dots sit exactly on the dashed line.
 */
function VerticalTimeline({ items }: { items: readonly Milestone[] }) {
  return (
    <div className="relative lg:hidden">
      {/* Track column — same width as node rail (w-10) so centers match */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-0 top-8 z-0 flex w-10 justify-center"
      >
        <span className="h-full w-0 border-l-2 border-dashed border-[#D4C4E8]" />
        <span
          data-milestone-progress
          className="absolute top-0 h-full w-[3px] origin-top scale-y-0 rounded-full bg-gradient-to-b from-[#7C3AED] via-[#C026D3] to-[#E81E62]"
        />
      </div>

      <ul className="relative m-0 flex list-none flex-col gap-8 p-0 sm:gap-10 md:gap-12">
        {items.map((item, index) => (
          <li key={item.id} className="relative flex items-start gap-0">
            {/* Node — centered in the same w-10 rail as the track */}
            <div className="relative z-[2] flex w-10 shrink-0 items-start justify-center pt-8">
              <TimelineNode year={item.year} />
            </div>

            {/* Horizontal dashed stem → card */}
            <div className="flex min-w-0 flex-1 items-start pt-8">
              <span
                aria-hidden
                className="mt-[7px] mr-3 h-0 w-3 shrink-0 border-t-2 border-dashed border-[#D4C4E8] sm:mr-4 sm:w-5 md:w-6"
              />
              <MilestoneCard
                item={item}
                slideFrom={index % 2 === 0 ? "left" : "right"}
                className="min-w-0 flex-1 max-w-[22rem] md:max-w-none"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Desktop (reference zig-zag):
 *
 *   [1]      [3]      [5]     ← above wave
 *    │        │        │      ← vertical dashed stems
 *    ○——○——○——○——○——○        ← organic gradient wave + 6 nodes
 *         │        │        │
 *        [2]      [4]      [6] ← below wave (staggered between tops)
 *
 * Six equal slot centers — cards, stems, and nodes share the same X.
 */
function DesktopJourney({ items }: { items: readonly Milestone[] }) {
  // Evenly spaced across the track (centers of 6 equal columns)
  const slots = [8.333, 25, 41.667, 58.333, 75, 91.667] as const;

  const top = [
    { item: items[0], slot: slots[0], from: "left" as const },
    { item: items[2], slot: slots[2], from: "up" as const },
    { item: items[4], slot: slots[4], from: "right" as const },
  ];
  const bottom = [
    { item: items[1], slot: slots[1], from: "left" as const },
    { item: items[3], slot: slots[3], from: "up" as const },
    { item: items[5], slot: slots[5], from: "right" as const },
  ];

  return (
    <div className="relative hidden lg:block">
      {/* Top: 1 · 3 · 5 */}
      <div className="relative min-h-[22rem] xl:min-h-[23.5rem]">
        {top.map(({ item, slot, from }) =>
          item ? (
            <div
              key={item.id}
              className="absolute bottom-0 flex w-[min(17rem,24%)] flex-col items-center"
              style={{ left: `${slot}%`, transform: "translateX(-50%)" }}
            >
              <MilestoneCard item={item} slideFrom={from} />
              <span
                aria-hidden
                className="relative z-[1] h-10 w-0 shrink-0 border-l-2 border-dashed border-[#C9A0D4] xl:h-12"
              />
            </div>
          ) : null,
        )}
      </div>

      {/* Wave + 6 nodes (same slot X as cards) */}
      <div className="relative z-[2] -mt-px -mb-px h-12 xl:h-14">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1200 56"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/*
            Wave crosses midline (y=28) at slot Xs ≈ 100,300,500,700,900,1100
            so dashed stems land on the nodes.
          */}
          <path
            d="M20 28 C 55 6, 85 6, 100 28 S 220 50, 300 28 S 420 6, 500 28 S 620 50, 700 28 S 820 6, 900 28 S 1020 50, 1100 28 S 1145 12, 1180 28"
            stroke="#F5E6F0"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            data-milestone-wave
            d="M20 28 C 55 6, 85 6, 100 28 S 220 50, 300 28 S 420 6, 500 28 S 620 50, 700 28 S 820 6, 900 28 S 1020 50, 1100 28 S 1145 12, 1180 28"
            stroke="url(#msWaveGrad)"
            strokeWidth="2.25"
            strokeLinecap="round"
            fill="none"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
          <defs>
            <linearGradient
              id="msWaveGrad"
              x1="20"
              y1="0"
              x2="1180"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7C3AED" />
              <stop offset="0.5" stopColor="#C026D3" />
              <stop offset="1" stopColor="#E81E62" />
            </linearGradient>
          </defs>
        </svg>

        {items.map((item, i) => (
          <div
            key={item.id}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${slots[i]}%` }}
          >
            <TimelineNode year={item.year} />
          </div>
        ))}
      </div>

      {/* Bottom: 2 · 4 · 6 */}
      <div className="relative min-h-[22rem] xl:min-h-[23.5rem]">
        {bottom.map(({ item, slot, from }) =>
          item ? (
            <div
              key={item.id}
              className="absolute top-0 flex w-[min(17rem,24%)] flex-col items-center"
              style={{ left: `${slot}%`, transform: "translateX(-50%)" }}
            >
              <span
                aria-hidden
                className="relative z-[1] h-10 w-0 shrink-0 border-l-2 border-dashed border-[#C9A0D4] xl:h-12"
              />
              <MilestoneCard item={item} slideFrom={from} />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}

export function AboutMilestones() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      root
        .querySelectorAll<HTMLElement>("[data-milestone-card]")
        .forEach((card) => {
          const from = card.dataset.slideFrom;
          const x = from === "left" ? -36 : from === "right" ? 36 : 0;
          const y = from === "up" || !from ? 36 : 10;

          gsap.fromTo(
            card,
            { autoAlpha: 0, x, y },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        });

      root
        .querySelectorAll<HTMLElement>("[data-milestone-node]")
        .forEach((node) => {
          ScrollTrigger.create({
            trigger: node,
            start: "top 85%",
            onEnter: () => {
              gsap.fromTo(
                node,
                { scale: 0.65 },
                { scale: 1, duration: 0.4, ease: "back.out(1.7)" },
              );
            },
          });
        });

      const progress = root.querySelector<HTMLElement>(
        "[data-milestone-progress]",
      );
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: progress.parentElement,
              start: "top 65%",
              end: "bottom 25%",
              scrub: 0.4,
            },
          },
        );
      }

      const wave = root.querySelector<SVGPathElement>("[data-milestone-wave]");
      if (wave) {
        gsap.to(wave, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: wave,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-milestones-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[12%] size-40 rounded-full bg-[#E81E62]/[0.05] blur-3xl sm:size-52"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[18%] size-36 rounded-full bg-[#7C3AED]/[0.05] blur-3xl sm:size-48"
      />

      <Container className="relative max-w-[100rem]">
        <header className="mx-auto max-w-[46rem] text-center">
          <p className="inline-flex items-center gap-2.5 font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#E81E62]">
            <span aria-hidden className="h-px w-5 bg-current" />
            {milestonesHeader.eyebrow}
          </p>

          <h2
            id="about-milestones-heading"
            className="mt-4 font-heading-manrope text-[clamp(1.85rem,4.2vw,3.15rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#151C4B] sm:mt-5"
          >
            {milestonesHeader.headingBefore}
            <span className="text-[#E81E62]">
              {milestonesHeader.headingAccent}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[34rem] font-body-poppins text-[0.95rem] leading-[1.75] text-[#6E7288] sm:mt-5 sm:text-base">
            {milestonesHeader.description}
          </p>
        </header>

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <DesktopJourney items={milestones} />
          <VerticalTimeline items={milestones} />
        </div>
      </Container>
    </section>
  );
}
