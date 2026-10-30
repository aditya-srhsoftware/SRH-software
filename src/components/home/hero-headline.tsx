"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";

const headlines = [
  {
    line1: "Web, mobile & AI solutions",
    line2Before: "built for ",
    line2Accent: "your business",
  },
  {
    line1: "Custom software &",
    line2Before: "digital products ",
    line2Accent: "that scale",
  },
  {
    line1: "Modern technology",
    line2Before: "built around ",
    line2Accent: "your vision",
  },
  {
    line1: "Transforming ideas into",
    line2Before: "powerful ",
    line2Accent: "digital experiences",
  },
  {
    line1: "Building intelligent software",
    line2Before: "for ",
    line2Accent: "future-ready businesses",
  },
] as const;

const HOLD_MS = 3.75;
const EXIT_MS = 0.7;
const GAP_MS = 0.18;
const ENTRY_MS = 0.7;
const LINE_STAGGER = 0.18;

export function HeroHeadline() {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!line1 || !line2) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const render = (index: number) => {
      const item = headlines[index];
      line1.textContent = item.line1;
      line2.innerHTML = "";

      if (item.line2Before) {
        line2.appendChild(document.createTextNode(item.line2Before));
      }

      const accent = document.createElement("span");
      accent.className =
        "bg-gradient-to-r from-magenta-200 via-magenta-500 to-brand-600 bg-clip-text text-transparent";
      accent.textContent = item.line2Accent;
      line2.appendChild(accent);
    };

    render(0);
    gsap.set([line1, line2], {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    });

    if (reducedMotion) return;

    let cancelled = false;
    let tween: gsap.core.Timeline | null = null;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;

    const playCycle = () => {
      if (cancelled) return;

      const nextIndex = (indexRef.current + 1) % headlines.length;

      tween = gsap.timeline({
        onComplete: () => {
          if (cancelled) return;
          holdTimer = setTimeout(playCycle, HOLD_MS * 1000);
        },
      });

      // Exit: second line first, then first line
      tween.to(
        line2,
        {
          y: -28,
          opacity: 0,
          filter: "blur(6px)",
          duration: EXIT_MS,
          ease: "power3.inOut",
        },
        0,
      );
      tween.to(
        line1,
        {
          y: -28,
          opacity: 0,
          filter: "blur(6px)",
          duration: EXIT_MS,
          ease: "power3.inOut",
        },
        LINE_STAGGER,
      );

      // Swap copy while empty
      tween.add(() => {
        indexRef.current = nextIndex;
        render(nextIndex);
        gsap.set([line1, line2], {
          y: 36,
          opacity: 0,
          filter: "blur(8px)",
        });
      });

      tween.to({}, { duration: GAP_MS });

      // Enter: first line, then second line
      tween.to(line1, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: ENTRY_MS,
        ease: "power4.out",
      });
      tween.to(
        line2,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: ENTRY_MS,
          ease: "power4.out",
        },
        `-=${ENTRY_MS - LINE_STAGGER}`,
      );
    };

    holdTimer = setTimeout(playCycle, HOLD_MS * 1000);

    return () => {
      cancelled = true;
      if (holdTimer) clearTimeout(holdTimer);
      tween?.kill();
    };
  }, []);

  return (
    <h1
      ref={rootRef}
      className="animate-fade-up animation-delay-100 mt-4 max-w-5xl font-serif text-balance text-[clamp(1.85rem,6.5vw,4.5rem)] font-bold leading-[1.15] tracking-[-0.015em] text-white sm:mt-5"
    >
      <span className="relative mx-auto block min-h-[2.3em]">
        <span className="flex flex-col items-center justify-center gap-0">
          <span
            ref={line1Ref}
            className="block will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            Web, mobile & AI solutions
          </span>
          <span
            ref={line2Ref}
            className="block will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            built for{" "}
            <span className="bg-gradient-to-r from-magenta-200 via-magenta-500 to-brand-600 bg-clip-text text-transparent">
              your business
            </span>
          </span>
        </span>
      </span>
      <span className="sr-only">
        Web, mobile & AI solutions built for your business. Custom software and
        digital products that scale. Modern technology built around your vision.
      </span>
    </h1>
  );
}
