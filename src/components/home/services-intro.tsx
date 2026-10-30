"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

/**
 * Fixed desktop design system — resolution-independent.
 * Horizontal layout NEVER uses window / vw / full-bleed width.
 */
const CARD_W = 320;
const CARD_H = 400; // fixed on every desktop — never tied to monitor height
const CARD_GAP = 24;
const PEEK = 0.2; // 20% of first card visible at rest
const SHELL_MAX = 1440; // px

const serviceCards = [
  {
    title: "Custom Web Development",
    href: "/services/web-application-development",
    points: [
      "Server-rendered performance",
      "Design system driven",
      "Headless CMS integration",
      "Full accessibility compliance",
    ],
  },
  {
    title: "Mobile App Development",
    href: "/services/cross-platform-app-development",
    points: [
      "Native-grade performance",
      "Offline-first architecture",
      "Push notifications & deep linking",
      "App store launch support",
    ],
  },
  {
    title: "UI/UX Design",
    href: "/services/website-ui-ux-design",
    points: [
      "User research & testing",
      "Interactive prototypes",
      "Design systems",
      "Accessibility-first design",
    ],
  },
  {
    title: "Custom Software Solutions",
    href: "/services/custom-software-development",
    points: [
      "SaaS product engineering",
      "ERP & CRM platforms",
      "Cloud-native architecture",
      "API development & integration",
    ],
  },
  {
    title: "Enterprise Applications",
    href: "/services/enterprise-application-development",
    points: [
      "Secure scalable systems",
      "Complex workflow support",
      "Integration-ready stacks",
      "Long-term maintainability",
    ],
  },
] as const;

const TRACK_WIDTH =
  serviceCards.length * CARD_W + (serviceCards.length - 1) * CARD_GAP;

export function ServicesIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !pin || !viewport || !track) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        track.querySelectorAll("[data-service-card]"),
      );

      if (reducedMotion) {
        gsap.set(track, { clearProps: "transform" });
        gsap.set(cards, { clearProps: "transform,opacity" });
        return;
      }

      /**
       * Viewport sits inside the 1440px frame, so clientWidth is identical
       * on every monitor ≥ 1440. Never use window.innerWidth / vw.
       */
      const getContentWidth = () => viewport.clientWidth;

      const getStartX = () => {
        const peekPx = CARD_W * PEEK;
        return Math.max(0, Math.round(getContentWidth() - peekPx));
      };

      const getTravel = () =>
        Math.max(0, TRACK_WIDTH - getContentWidth());

      const getEndDistance = () => Math.round(getStartX() + getTravel());

      const updateCardPresence = () => {
        const viewBox = viewport.getBoundingClientRect();
        cards.forEach((card) => {
          const box = card.getBoundingClientRect();
          const enter = gsap.utils.clamp(
            0,
            1,
            (viewBox.right - box.left) / (CARD_W * 0.45),
          );
          gsap.set(card, { opacity: enter });
        });
      };

      gsap.set(track, { x: getStartX() });
      updateCardPresence();

      const tween = gsap.fromTo(
        track,
        { x: () => getStartX() },
        {
          x: () => -getTravel(),
          ease: "none",
          onUpdate: updateCardPresence,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getEndDistance()}`,
            pin,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: updateCardPresence,
            onEnter: updateCardPresence,
            onEnterBack: updateCardPresence,
          },
        },
      );

      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
        gsap.set(cards, { clearProps: "transform,opacity" });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-intro-heading"
      className="relative bg-[#FAFBFC]"
    >
      {/* Desktop — content-sized pin (not 100vh) so card height stays identical */}
      <div ref={pinRef} className="relative hidden md:block">
        <div className="pt-12 pb-10 md:pt-14 md:pb-12 lg:pt-16 lg:pb-14">
          <div
            ref={frameRef}
            className="mx-auto w-full px-6 lg:px-8"
            style={{ maxWidth: SHELL_MAX }}
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-magenta-500">
                Services
              </p>
              <h2
                id="services-intro-heading"
                className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-foreground md:mt-4 md:text-4xl lg:text-[2.75rem]"
              >
                Every Type of IT{" "}
                <span className="text-[#E81E62]">Services Under</span>{" "}
                <span className="text-[#E81E62]">One Roof</span>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-[1.65] text-muted-foreground md:mt-4 lg:text-lg">
                From first sketch to production scale — we cover the entire
                product lifecycle so you don&apos;t have to stitch together
                vendors across design, engineering, and infrastructure.
              </p>
              <Link
                href="/services"
                className="mt-5 inline-flex h-11 items-center gap-2.5 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white shadow-[0_14px_34px_-14px_rgba(67,1,178,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 md:mt-6 md:h-12"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-white" />
                View All Services
              </Link>
            </div>

            <div
              ref={viewportRef}
              className="relative mt-8 w-full overflow-hidden md:mt-10"
              style={{ height: CARD_H }}
            >
              <div
                ref={trackRef}
                className="flex h-full w-max items-stretch will-change-transform"
                style={{
                  gap: CARD_GAP,
                  width: TRACK_WIDTH,
                  transform: "translate3d(0,0,0)",
                }}
              >
                {serviceCards.map((card, index) => (
                  <ServiceCard key={card.title} card={card} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Container className="py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-magenta-500">
            Services
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,7vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground">
            Every Type of IT{" "}
            <span className="text-[#E81E62]">Services Under</span>{" "}
            <span className="text-[#E81E62]">One Roof</span>
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
            From first sketch to production scale — we cover the entire product
            lifecycle so you don&apos;t have to stitch together vendors across
            design, engineering, and infrastructure.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-white" />
            View All Services
          </Link>

          <ul className="mt-10 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto p-0 py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {serviceCards.map((card, index) => (
              <li key={card.title} className="snap-center shrink-0 py-2">
                <ServiceCard card={card} index={index} compact />
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

function ServiceCard({
  card,
  index,
  compact = false,
}: {
  card: (typeof serviceCards)[number];
  index: number;
  compact?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={card.href}
      data-service-card
      className={cn("block shrink-0", compact && "w-[min(18rem,85vw)]")}
      style={compact ? undefined : { width: CARD_W, height: CARD_H }}
    >
      <article
        className={cn(
          "group relative isolate flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-solid border-[#D8DBE3] bg-white text-[#1A1A1F] sm:rounded-[1.75rem]",
          compact ? "min-h-[23.5rem] p-6" : "box-border p-6",
          "shadow-[0_2px_10px_-4px_rgba(26,16,48,0.06),0_16px_36px_-20px_rgba(26,16,48,0.12)]",
          "transition-[box-shadow,border-color,background-color] duration-[350ms] ease-out",
          "hover:border-[#C5C9D4] hover:bg-[#FAFBFC]",
          "hover:shadow-[0_8px_24px_-8px_rgba(26,16,48,0.1),0_28px_56px_-24px_rgba(26,16,48,0.16)]",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-3 font-display text-[4.5rem] font-extrabold leading-none tracking-[-0.06em] text-black/[0.04] md:right-3 md:top-5 md:text-[5.5rem]"
        >
          {number}
        </span>

        <div className="relative z-10 flex shrink-0 items-start justify-between gap-3">
          <span className="pt-1 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[#8B8F9C]">
            {number}
          </span>

          <span
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
              "border border-solid border-[#D8DBE3] bg-[#F7F8FA] text-[#1A1A1F]",
              "shadow-[0_4px_12px_-6px_rgba(26,16,48,0.12)]",
              "transition-[transform,background-color,border-color,box-shadow,color] duration-[350ms] ease-out",
              "group-hover:rotate-[15deg] group-hover:scale-[1.06]",
              "group-hover:border-[#E81E62] group-hover:bg-[#E81E62] group-hover:text-white",
              "group-hover:shadow-[0_10px_22px_-6px_rgba(232,30,98,0.5)]",
            )}
          >
            <ArrowUpRight className="size-4" strokeWidth={2} />
          </span>
        </div>

        <div className="relative z-10 min-h-0">
          <h3 className="max-w-[12ch] font-display text-[1.45rem] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#1A1A1F]">
            {card.title}
          </h3>

          <div
            aria-hidden
            className="mt-3 h-px w-9 origin-left bg-[#D8DBE3] transition-all duration-[350ms] ease-out group-hover:w-14 group-hover:bg-[#B8BCC8]"
          />

          <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-[1.5] text-[#8B8F9C]">
            {card.points.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-[#C5C9D4]"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}
