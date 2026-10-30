"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import {
  offices,
  officesHeader,
  type OfficeLocation,
} from "@/content/about-offices";

function FlagBadge({ country }: { country: OfficeLocation["country"] }) {
  return (
    <span
      data-office-flag
      className="relative inline-flex size-12 shrink-0 items-center justify-center sm:size-[3.25rem]"
    >
      <span
        aria-hidden
        className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#E81E62]/20 blur-[3px]"
      />
      <span className="relative size-full overflow-hidden rounded-full border-[2.5px] border-white shadow-[0_8px_24px_-10px_rgba(21,28,75,0.35)] ring-1 ring-[#ECECF3]">
        {country === "IN" ? <IndiaFlag /> : null}
        {country === "AE" ? <UaeFlag /> : null}
        {country === "CA" ? <CanadaFlag /> : null}
      </span>
    </span>
  );
}

function IndiaFlag() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden>
      <rect width="48" height="16" y="0" fill="#FF9933" />
      <rect width="48" height="16" y="16" fill="#FFFFFF" />
      <rect width="48" height="16" y="32" fill="#138808" />
      <circle cx="24" cy="24" r="5.2" fill="none" stroke="#000080" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="1.1" fill="#000080" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <line
            key={i}
            x1={24}
            y1={24}
            x2={24 + Math.cos(a) * 5}
            y2={24 + Math.sin(a) * 5}
            stroke="#000080"
            strokeWidth="0.55"
          />
        );
      })}
    </svg>
  );
}

function UaeFlag() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden>
      <rect width="48" height="16" y="0" fill="#00732F" />
      <rect width="48" height="16" y="16" fill="#FFFFFF" />
      <rect width="48" height="16" y="32" fill="#000000" />
      <rect width="14" height="48" x="0" y="0" fill="#FF0000" />
    </svg>
  );
}

function CanadaFlag() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden>
      <rect width="48" height="48" fill="#FFFFFF" />
      <rect width="10" height="48" x="0" fill="#FF0000" />
      <rect width="10" height="48" x="38" fill="#FF0000" />
      <path
        fill="#FF0000"
        d="M24 11l1.15 3.55 2.1-1.05-.2 2.35 2.55.35-1.85 1.7 1.55 1.95-2.45-.55-.55 2.4L24 19.5l-2.3 2.2-.55-2.4-2.45.55 1.55-1.95-1.85-1.7 2.55-.35-.2-2.35 2.1 1.05L24 11zm-1.15 17.2h2.3v5.6h-2.3z"
      />
    </svg>
  );
}

function OfficeItem({
  office,
  className,
}: {
  office: OfficeLocation;
  className?: string;
}) {
  return (
    <article
      data-office-card
      className={cn(
        "group relative flex items-start gap-4 sm:gap-5",
        className,
      )}
    >
      <FlagBadge country={office.country} />

      <div className="min-w-0 pt-0.5">
        <h3 className="font-heading-manrope text-[1.05rem] font-bold tracking-[-0.02em] text-[#151C4B] transition-colors duration-300 group-hover:text-[#E81E62] sm:text-[1.15rem]">
          {office.title}
        </h3>

        {office.status === "coming-soon" ? (
          <p className="mt-2 inline-flex items-center gap-2 font-body-poppins text-[0.85rem] text-[#6E7288]">
            <span
              aria-hidden
              className="inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#E81E62]"
            />
            <span className="font-medium tracking-wide text-[#E81E62]">
              Coming soon
            </span>
          </p>
        ) : (
          <p className="mt-1.5 font-body-poppins text-[0.85rem] leading-[1.65] text-[#6E7288] sm:text-[0.9rem]">
            {office.lines?.map((line, i) => (
              <span key={line}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

export function AboutOffices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.fromTo(
        root.querySelectorAll<HTMLElement>("[data-office-card]"),
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-office-grid]"),
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        root.querySelectorAll<HTMLElement>("[data-office-flag]"),
        { scale: 0.75 },
        {
          scale: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: root.querySelector("[data-office-grid]"),
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-offices-heading"
      className="relative overflow-hidden border-t border-[#ECECF3] bg-[#F8F9FC] py-14 sm:py-16 lg:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-1/2 size-44 -translate-y-1/2 rounded-full bg-[#E81E62]/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 size-40 -translate-y-1/2 rounded-full bg-[#7C3AED]/[0.05] blur-3xl"
      />

      <Container className="relative max-w-[100rem]">
        <header className="mx-auto max-w-[40rem] text-center">
          <p className="inline-flex items-center gap-2.5 font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#E81E62]">
            <span aria-hidden className="h-px w-5 bg-current" />
            {officesHeader.eyebrow}
          </p>
          <h2
            id="about-offices-heading"
            className="mt-3 font-heading-manrope text-[clamp(1.55rem,3.2vw,2.25rem)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#151C4B]"
          >
            {officesHeader.headingBefore}
            <span className="text-[#E81E62]">
              {officesHeader.headingAccent}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[32rem] font-body-poppins text-[0.9rem] leading-[1.7] text-[#6E7288] sm:text-[0.95rem]">
            {officesHeader.description}
          </p>
        </header>

        <div
          data-office-grid
          className="mt-10 grid grid-cols-1 gap-0 sm:mt-12 lg:mt-14 lg:grid-cols-3"
        >
          {offices.map((office, index) => (
            <div
              key={office.id}
              className={cn(
                "relative px-1 py-7 sm:px-4 sm:py-8 lg:px-8 lg:py-3 xl:px-10",
                index > 0 && "border-t border-[#E4E6EF] lg:border-t-0",
              )}
            >
              {/* Floating mid-height divider (reference) */}
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-[58%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#D5D8E4] to-transparent lg:block"
                />
              ) : null}
              <OfficeItem
                office={office}
                className="mx-auto max-w-[22rem] lg:mx-0 lg:max-w-none"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
