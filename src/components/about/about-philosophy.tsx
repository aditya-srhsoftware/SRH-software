"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import {
  philosophyBlocks,
  philosophyHeader,
  type PhilosophyBlock,
} from "@/content/about-philosophy";

const NAVY = "#101B5A";
const PINK = "#FF2E72";
const GRAY = "#5E6477";
const LINE = "#D5DCE8";

/** Renders editable copy with **bold** markers. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-[#101B5A]/85">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function AccentHeading({
  heading,
  accent,
  className,
}: {
  heading: string;
  accent: string;
  className?: string;
}) {
  const idx = heading.indexOf(accent);
  let nodes: ReactNode;

  if (idx === -1) {
    nodes = heading;
  } else {
    nodes = (
      <>
        {heading.slice(0, idx)}
        <span style={{ color: PINK }}>{accent}</span>
        {heading.slice(idx + accent.length)}
      </>
    );
  }

  return (
    <h3 className={className} style={{ color: NAVY }}>
      {nodes}
    </h3>
  );
}

/**
 * Reference timeline badge:
 * white fill · soft pink ring · pink number
 */
function TimelineBadge({ number }: { number: string }) {
  return (
    <span
      aria-hidden
      className="relative z-10 flex size-[3.75rem] shrink-0 items-center justify-center rounded-full border-[3px] border-[#FF2E72]/40 bg-white font-display text-[1.05rem] font-bold tracking-[-0.02em] text-[#FF2E72] shadow-[0_8px_24px_-10px_rgba(255,46,114,0.4)]"
    >
      {number}
    </span>
  );
}

function FeatureCard({ block }: { block: PhilosophyBlock }) {
  const Icon = block.card.icon;

  return (
    <div
      data-philosophy-card
      className={cn(
        "absolute z-20 flex items-center gap-3 rounded-[18px] bg-white p-4 shadow-[0_18px_48px_rgba(15,23,42,0.1)] sm:gap-3.5 sm:p-[18px]",
        block.card.placement,
      )}
    >
      <span
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-full sm:size-11",
          block.card.iconClass,
        )}
      >
        <Icon className="size-[1.15rem] sm:size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 pr-1">
        <p
          className="font-display text-[0.9rem] font-bold leading-tight tracking-[-0.02em] sm:text-[0.95rem]"
          style={{ color: NAVY }}
        >
          {block.card.title}
        </p>
        <p
          className="mt-0.5 text-[0.75rem] leading-snug sm:text-[0.8rem]"
          style={{ color: GRAY }}
        >
          {block.card.subtitle}
        </p>
      </div>
    </div>
  );
}

function PhilosophyMedia({ block }: { block: PhilosophyBlock }) {
  return (
    <div data-philosophy-media className="relative w-full pb-8 sm:pb-9">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute rounded-[2rem]",
          block.blob.position,
          block.blob.size,
          block.blob.color,
        )}
      />

      <div className="relative overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(10,20,60,0.08)] sm:rounded-[2.5rem]">
        <div className="relative aspect-[16/10] w-full lg:aspect-[5/3]">
          <Image
            src={block.image}
            alt={block.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1023px) 100vw, 44vw"
            placeholder="blur"
          />
        </div>
      </div>

      <FeatureCard block={block} />
    </div>
  );
}

function PhilosophyCopy({ block }: { block: PhilosophyBlock }) {
  return (
    <div className="w-full">
      <p
        className="text-[0.68rem] font-semibold uppercase tracking-[0.32em]"
        style={{ color: GRAY }}
      >
        {block.label}
      </p>

      <AccentHeading
        heading={block.heading}
        accent={block.accent}
        className="mt-3 max-w-[18ch] font-display text-[clamp(1.5rem,2.6vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.035em] sm:mt-4"
      />

      <p
        className="mt-4 max-w-[32rem] text-[0.95rem] leading-[1.8] sm:mt-5 sm:text-[1.05rem]"
        style={{ color: GRAY }}
      >
        <RichText text={block.body} />
      </p>
    </div>
  );
}

/**
 * Badge + copy share one top edge so the number lines up with SUPERVISION.
 * Badge always occupies the center 5rem spine column.
 */
function TextCluster({
  block,
  slideFrom,
  badgeOnLeft,
}: {
  block: PhilosophyBlock;
  slideFrom: "left" | "right";
  badgeOnLeft: boolean;
}) {
  return (
    <div
      data-philosophy-content
      data-slide-from={slideFrom}
      className={cn(
        "grid w-full items-start gap-x-6 xl:gap-x-8",
        badgeOnLeft
          ? "grid-cols-[5rem_minmax(0,1fr)]"
          : "grid-cols-[minmax(0,1fr)_5rem]",
      )}
    >
      {badgeOnLeft && (
        <div className="flex justify-center">
          <TimelineBadge number={block.number} />
        </div>
      )}

      <PhilosophyCopy block={block} />

      {!badgeOnLeft && (
        <div className="flex justify-center">
          <TimelineBadge number={block.number} />
        </div>
      )}
    </div>
  );
}

function PhilosophyRow({
  block,
  slideFrom,
  index,
  total,
}: {
  block: PhilosophyBlock;
  slideFrom: "left" | "right";
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;

  return (
    <article
      data-philosophy-row
      className={cn("relative", !isLast && "pb-24 lg:pb-32")}
    >
      {/* Hollow dots on the spine between steps */}
      {!isLast && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-11 left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-5 lg:flex"
        >
          <span
            className="size-2.5 rounded-full border-2 bg-white"
            style={{ borderColor: LINE }}
          />
          <span
            className="size-2.5 rounded-full border-2 bg-white"
            style={{ borderColor: LINE }}
          />
        </div>
      )}

      {/*
        Desktop 3-col spine:
        [ image | badge+copy ]  or  [ copy+badge | image ]
        Badge always sits in the center 5rem track so the
        continuous vertical line threads through 01 → 02 → 03.
      */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] lg:items-center">
        {block.imageLeft ? (
          <>
            <div className="min-w-0 pr-8 xl:pr-12">
              <PhilosophyMedia block={block} />
            </div>
            {/* badge + copy span center + right columns */}
            <div className="col-span-2 min-w-0 pl-0">
              <TextCluster
                block={block}
                slideFrom={slideFrom}
                badgeOnLeft
              />
            </div>
          </>
        ) : (
          <>
            {/* copy + badge span left + center columns */}
            <div className="col-span-2 min-w-0">
              <TextCluster
                block={block}
                slideFrom={slideFrom}
                badgeOnLeft={false}
              />
            </div>
            <div className="min-w-0 pl-8 xl:pl-12">
              <PhilosophyMedia block={block} />
            </div>
          </>
        )}
      </div>

      {/* Mobile / tablet */}
      <div className="flex flex-col gap-8 lg:hidden">
        <PhilosophyMedia block={block} />

        <div
          data-philosophy-content
          data-slide-from={slideFrom}
          className="relative flex gap-4 pl-1 sm:gap-5"
        >
          <div className="relative flex w-14 shrink-0 flex-col items-center">
            <TimelineBadge number={block.number} />
            {!isLast && (
              <>
                <span
                  className="mt-3 min-h-[3.5rem] w-px flex-1"
                  style={{ backgroundColor: LINE }}
                />
                <span
                  className="absolute left-1/2 top-[5.25rem] size-2 -translate-x-1/2 rounded-full border-2 bg-white"
                  style={{ borderColor: LINE }}
                />
                <span
                  className="absolute left-1/2 top-[6.75rem] size-2 -translate-x-1/2 rounded-full border-2 bg-white"
                  style={{ borderColor: LINE }}
                />
              </>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-2">
            <PhilosophyCopy block={block} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function AboutPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const blobs = root.querySelectorAll<HTMLElement>("[data-philosophy-blob]");
      if (!reducedMotion && blobs.length) {
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            y: i % 2 === 0 ? 14 : -10,
            x: i % 2 === 0 ? 8 : -6,
            duration: 8 + i * 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }

      const rows = root.querySelectorAll<HTMLElement>("[data-philosophy-row]");
      rows.forEach((row) => {
        if (reducedMotion) return;

        const media = row.querySelectorAll<HTMLElement>(
          "[data-philosophy-media]",
        );
        const contents = row.querySelectorAll<HTMLElement>(
          "[data-philosophy-content]",
        );
        const cards = row.querySelectorAll<HTMLElement>(
          "[data-philosophy-card]",
        );

        media.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 36, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        contents.forEach((el) => {
          const fromRight = el.dataset.slideFrom === "right";
          const isMobile = window.matchMedia("(max-width: 1023px)").matches;

          gsap.fromTo(
            el,
            {
              autoAlpha: 0,
              x: isMobile ? 0 : fromRight ? 36 : -36,
              y: isMobile ? 24 : 0,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.9,
              delay: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        cards.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, scale: 0.9, y: 10 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.65,
              delay: 0.28,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-philosophy-heading"
      className="relative overflow-hidden bg-white pt-24 sm:pt-32 lg:pt-40"
    >
      <div
        aria-hidden
        data-philosophy-blob
        className="pointer-events-none absolute -left-[12%] top-[6%] h-[30rem] w-[30rem] rounded-full bg-[#6B5CFF]/[0.07] blur-[160px]"
      />
      <div
        aria-hidden
        data-philosophy-blob
        className="pointer-events-none absolute -right-[10%] top-[14%] h-[28rem] w-[28rem] rounded-full bg-[#FF2E72]/[0.07] blur-[170px]"
      />
      <div
        aria-hidden
        data-philosophy-blob
        className="pointer-events-none absolute bottom-[8%] left-[40%] h-[24rem] w-[24rem] rounded-full bg-[#6B5CFF]/[0.05] blur-[150px]"
      />

      <Container className="relative max-w-[90rem]">
        <header className="mx-auto max-w-[48rem] text-center">
          <p
            className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.35em]"
            style={{ color: NAVY }}
          >
            <span
              aria-hidden
              className="h-px w-7 sm:w-9"
              style={{ backgroundColor: PINK }}
            />
            {philosophyHeader.eyebrow}
          </p>

          <h2
            id="about-philosophy-heading"
            className="mt-5 font-display text-[clamp(1.85rem,4.6vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.035em] sm:mt-6"
            style={{ color: NAVY }}
          >
            {philosophyHeader.headingBefore}
            <span style={{ color: PINK }}>
              {philosophyHeader.headingAccent}
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-[760px] text-base leading-[1.8] sm:mt-6 sm:text-lg"
            style={{ color: GRAY }}
          >
            <RichText text={philosophyHeader.description} />
          </p>
        </header>

        <div className="relative mt-16 sm:mt-20 lg:mt-[6.25rem]">
          {/* Continuous center spine through all badges */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-12 left-1/2 top-5 z-0 hidden w-px -translate-x-1/2 lg:block"
            style={{ backgroundColor: LINE }}
          />

          <div className="relative z-[2]">
            {philosophyBlocks.map((block, index) => (
              <PhilosophyRow
                key={block.id}
                block={block}
                index={index}
                total={philosophyBlocks.length}
                slideFrom={block.imageLeft ? "right" : "left"}
              />
            ))}
          </div>
        </div>
      </Container>

      <div className="h-16 sm:h-20 lg:h-24" aria-hidden />
    </section>
  );
}
