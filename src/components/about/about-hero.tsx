"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { ArrowUpRight, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import teamImg from "@/assets/images/about/team.jpg";
import officeImg from "@/assets/images/about/office.jpg";

const stats = [
  { end: 12, suffix: "+", label: "Years Experience" },
  { end: 150, suffix: "+", label: "Projects Delivered" },
  { end: 98, suffix: "%", label: "Client Satisfaction" },
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

function StatValue({
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

function TrustBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-2xl border border-[#E6E8EF] bg-white p-3 shadow-[0_16px_36px_-14px_rgba(26,16,48,0.28)] sm:gap-3 sm:p-3.5 ${className}`}
    >
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Users className="size-5" strokeWidth={1.75} />
      </span>
      <p className="min-w-0 flex-1 text-[0.75rem] font-semibold leading-snug tracking-[-0.01em] text-brand-900 sm:text-[0.8rem]">
        Trusted by Growing Businesses
      </p>
      <span
        aria-hidden
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white"
      >
        <ArrowUpRight className="size-3.5" />
      </span>
    </div>
  );
}

export function AboutHero() {
  const statsRef = useRef<HTMLDListElement>(null);
  const mobileStatsRef = useRef<HTMLDListElement>(null);
  const desktopInView = useInView(statsRef);
  const mobileInView = useInView(mobileStatsRef);
  const statsActive = desktopInView || mobileInView;

  return (
    <Section
      clearHeader
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden bg-[#FAFBFC] pb-12 sm:pb-16 lg:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 hidden size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.1),transparent_68%)] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-[0.35] lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(26,16,48,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 55% 50% at 78% 42%, black, transparent)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[#E81E62]"
              />
              About SRH
            </p>

            <h1
              id="about-hero-heading"
              className="mt-3 max-w-xl font-display text-[clamp(1.85rem,6.5vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.035em] text-brand-900 sm:mt-4"
            >
              Experienced Software Developers Building{" "}
              <span className="text-[#E81E62]">Modern Digital Products</span>.
            </h1>

            <div className="mt-4 max-w-lg space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-5 sm:space-y-4 sm:text-base md:text-[1.05rem]">
              <p>
                At SRH Software, we specialize in building scalable web and
                mobile applications that help businesses grow. Our experienced
                developers combine innovation, clean code, and agile
                methodology to deliver high-performance digital solutions.
              </p>
              <p className="hidden sm:block">
                From startups to enterprises, we partner with teams that need
                clarity, craft, and technology that lasts beyond launch.
              </p>
            </div>

            {/* Mobile stats — clean 3-up grid */}
            <dl
              ref={mobileStatsRef}
              className="mt-8 grid grid-cols-3 gap-2 rounded-2xl border border-[#E6E8EF] bg-white p-3 shadow-[0_12px_32px_-20px_rgba(26,16,48,0.18)] sm:hidden"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center px-1 py-2 text-center"
                >
                  <dd className="font-display text-xl font-extrabold tracking-[-0.04em] text-brand-900">
                    <StatValue
                      end={stat.end}
                      suffix={stat.suffix}
                      active={statsActive}
                    />
                  </dd>
                  <dt className="mt-1 text-[0.62rem] font-medium uppercase leading-tight tracking-[0.08em] text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            {/* Desktop / tablet stats — unchanged strip */}
            <dl
              ref={statsRef}
              className="mt-10 hidden items-stretch gap-0 divide-x divide-[#E6E8EF] border-y border-[#E6E8EF] py-5 sm:mt-12 sm:flex"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex min-w-[7.5rem] flex-1 flex-col px-4 first:pl-0 last:pr-0 sm:min-w-0 sm:px-6"
                >
                  <dt className="order-2 mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-display text-3xl font-extrabold tracking-[-0.04em] text-brand-900 md:text-[2.15rem]">
                    <StatValue
                      end={stat.end}
                      suffix={stat.suffix}
                      active={statsActive}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mobile media — stacked, no overflow collage */}
          <div className="w-full lg:hidden">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-neutral-200 shadow-[0_24px_48px_-22px_rgba(26,16,48,0.32)]">
              <Image
                src={teamImg}
                alt="SRH Software team collaborating around a laptop"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1023px) calc(100vw - 2rem), 0px"
                priority
                placeholder="blur"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-5 pb-5 pt-16">
                <p className="max-w-[14ch] font-display text-[1.45rem] font-bold leading-[1.15] tracking-[-0.03em] text-white">
                  Ideas Build Better{" "}
                  <span className="text-[#E81E62]">Software</span>.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[0.9fr_1.1fr] gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E6E8EF] shadow-[0_14px_32px_-16px_rgba(26,16,48,0.28)]">
                <Image
                  src={officeImg}
                  alt="Modern workspace and meeting room"
                  fill
                  className="object-cover"
                  sizes="45vw"
                  placeholder="blur"
                />
              </div>
              <TrustBadge className="h-full shadow-[0_14px_32px_-16px_rgba(26,16,48,0.22)]" />
            </div>
          </div>

          {/* Desktop media — shorter frame, matched to reference proportions */}
          <div className="relative mx-auto hidden w-full max-w-lg pb-8 lg:mx-0 lg:block lg:max-w-none">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-neutral-200 shadow-[0_28px_60px_-24px_rgba(26,16,48,0.35)] xl:aspect-[4/3]">
              <Image
                src={teamImg}
                alt="SRH Software team collaborating around a laptop"
                fill
                className="object-cover object-center"
                sizes="42vw"
                priority
                placeholder="blur"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent px-6 pb-6 pt-14">
                <p className="max-w-[14ch] font-display text-[1.5rem] font-bold leading-[1.15] tracking-[-0.03em] text-white">
                  Ideas Build Better{" "}
                  <span className="text-[#E81E62]">Software</span>.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 -left-5 w-[34%] overflow-hidden rounded-[1.15rem] border-[5px] border-[#FAFBFC] shadow-[0_18px_40px_-16px_rgba(26,16,48,0.4)] xl:-bottom-3 xl:-left-6 xl:w-[32%]">
              <div className="relative aspect-[4/3] -rotate-3">
                <Image
                  src={officeImg}
                  alt="Modern workspace and meeting room"
                  fill
                  className="object-cover"
                  sizes="160px"
                  placeholder="blur"
                />
              </div>
            </div>

            <TrustBadge className="absolute bottom-0 right-3 max-w-[12.5rem] xl:right-4" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
