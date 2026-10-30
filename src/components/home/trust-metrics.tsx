"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Container } from "@/components/layout/container";

const metrics = [
  { end: 120, suffix: "+", label: "Products shipped" },
  { end: 98, suffix: "%", label: "Client retention" },
  { end: 40, suffix: "+", label: "Engineers & designers" },
  { end: 12, suffix: "", label: "Countries served" },
] as const;

const DURATION_MS = 1600;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useInView(ref: RefObject<HTMLElement | null>, once = true) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        if (once) observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, once]);

  return inView;
}

function MetricValue({
  end,
  suffix,
  active,
}: {
  end: number;
  suffix: string;
  active: boolean;
}) {
  const [value, setValue] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (!active) return;

    if (reducedMotion.current) {
      setValue(end);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setValue(Math.round(end * easeOutCubic(progress)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, end]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export function TrustMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-label="SRH Software at a glance"
      className="border-y border-white/15 bg-navy"
    >
      <Container>
        <ul className="m-0 grid list-none grid-cols-2 p-0 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
          {metrics.map((metric, index) => (
            <li
              key={metric.label}
              className={[
                "px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12",
                index % 2 === 0 ? "pl-0 sm:pl-0" : "border-l border-white/15 lg:border-l-0",
                index < 2 ? "border-b border-white/15 lg:border-b-0" : "",
                index === 0 ? "lg:pl-0" : "",
                index === metrics.length - 1 ? "lg:pr-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="font-display text-[1.85rem] font-bold tracking-[-0.03em] text-white sm:text-5xl">
                <MetricValue
                  end={metric.end}
                  suffix={metric.suffix}
                  active={inView}
                />
              </p>
              <p className="mt-2 text-[0.8rem] font-medium leading-snug text-white/65 sm:mt-3 sm:text-base">
                {metric.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
