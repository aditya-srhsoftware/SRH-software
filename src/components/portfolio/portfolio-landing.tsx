"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import {
  portfolioCapabilities,
  portfolioCases,
  portfolioCta,
  portfolioFilters,
  portfolioHero,
  portfolioIndustries,
  portfolioProcess,
  portfolioStack,
  portfolioStats,
  type PortfolioFilter,
} from "@/content/portfolio";

export function PortfolioLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<PortfolioFilter>("All");
  const featured = portfolioCases[0];

  const visibleCases = useMemo(
    () =>
      filter === "All"
        ? portfolioCases
        : portfolioCases.filter((item) => item.filters.includes(filter)),
    [filter],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-pf-hero]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.05,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-pf-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-pf-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-[#F7F5F1] text-[#151C4B]"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.11),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[8%] size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(21,28,75,0.08),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(21,28,75,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(21,28,75,0.03)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 lg:pt-[7.5rem] lg:pb-16">
        <Container className="relative max-w-[100rem]">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <p
                data-pf-hero
                className="inline-flex items-center gap-3 font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#E81E62]"
              >
                <span aria-hidden className="h-px w-8 bg-[#E81E62]/80" />
                {portfolioHero.eyebrow}
              </p>

              <p
                data-pf-hero
                className="mt-7 font-heading-manrope text-[clamp(1.1rem,2vw,1.35rem)] font-bold tracking-[-0.03em] text-[#151C4B]/55"
              >
                {portfolioHero.brand}
              </p>

              <h1
                data-pf-hero
                className="mt-3 max-w-[12ch] font-heading-manrope text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.055em] text-[#151C4B]"
              >
                <span className="block">{portfolioHero.headingLine1}</span>
                <span className="block">
                  {portfolioHero.headingLine2Before}
                  <span className="text-[#E81E62]">
                    {portfolioHero.headingAccent}
                  </span>
                </span>
              </h1>

              <p
                data-pf-hero
                className="mt-7 max-w-[28rem] font-body-poppins text-[1.05rem] leading-[1.75] text-[#6B7280] sm:text-[1.125rem]"
              >
                {portfolioHero.description}
              </p>

              <div data-pf-hero className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href={portfolioHero.primaryCta.href}
                  className="group inline-flex h-[3.25rem] items-center gap-2.5 rounded-full bg-[#151C4B] px-7 text-[0.9375rem] font-semibold text-white transition-all duration-300 hover:bg-[#1B2458]"
                >
                  {portfolioHero.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={portfolioHero.secondaryCta.href}
                  className="group inline-flex h-[3.25rem] items-center gap-2 rounded-full border border-[#151C4B]/15 bg-transparent px-6 text-[0.9375rem] font-semibold text-[#151C4B] transition-all duration-300 hover:border-[#151C4B]/30 hover:bg-white/60"
                >
                  {portfolioHero.secondaryCta.label}
                  <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Featured visual */}
            <div data-pf-hero className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-36px_rgba(21,28,75,0.45)] sm:rounded-[2rem]">
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
                  <div data-pf-parallax className="absolute inset-[-8%]">
                    <Image
                      src={featured.image}
                      alt={featured.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#151C4B]/75 via-[#151C4B]/15 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                      Featured · {featured.number}
                    </p>
                    <p className="mt-2 font-heading-manrope text-[1.65rem] font-bold tracking-[-0.03em] text-white sm:text-[2rem]">
                      {featured.name}
                    </p>
                    <p className="mt-1 font-body-poppins text-[0.9rem] text-white/75">
                      {featured.category}
                    </p>
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -left-6 -z-10 size-40 rounded-full bg-[#E81E62]/15 blur-3xl sm:size-56"
              />
            </div>
          </div>

          {/* Stats — editorial strip, not cards */}
          <ul
            data-pf-hero
            className="mt-14 flex list-none flex-wrap items-stretch gap-0 divide-x divide-[#151C4B]/10 border-y border-[#151C4B]/10 p-0 sm:mt-16"
          >
            {portfolioStats.map((stat) => (
              <li
                key={stat.label}
                className="min-w-[45%] flex-1 px-4 py-6 first:pl-0 last:pr-0 sm:min-w-0 sm:px-8 sm:py-8"
              >
                <p className="font-heading-manrope text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-[-0.04em] text-[#151C4B]">
                  {stat.value}
                </p>
                <p className="mt-1.5 font-body-poppins text-[0.8rem] uppercase tracking-[0.14em] text-[#8B90A0]">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Work ─────────────────────────────────────────────── */}
      <section id="work" className="relative scroll-mt-28 py-16 sm:py-20 lg:py-24">
        <Container className="relative max-w-[100rem]">
          <div
            data-pf-fade
            className="flex flex-col gap-8 border-b border-[#151C4B]/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-[34rem]">
              <p className="font-body-poppins text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#E81E62]">
                Case studies
              </p>
              <h2 className="mt-3 font-heading-manrope text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#151C4B]">
                Work that carries weight
              </h2>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter projects"
            >
              {portfolioFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={filter === item}
                  onClick={() => setFilter(item)}
                  className={cn(
                    "rounded-full px-4 py-2 font-body-poppins text-[0.8rem] font-semibold tracking-[-0.01em] transition-all duration-300",
                    filter === item
                      ? "bg-[#151C4B] text-white"
                      : "bg-transparent text-[#6B7280] ring-1 ring-[#151C4B]/12 hover:text-[#151C4B] hover:ring-[#151C4B]/25",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-0 list-none divide-y divide-[#151C4B]/10 p-0">
            {visibleCases.map((item, index) => {
              const reverse = index % 2 === 1;
              return (
                <li key={item.id} data-pf-fade className="py-12 sm:py-14 lg:py-16">
                  <article
                    className={cn(
                      "grid items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20",
                      reverse && "lg:[&>*:first-child]:order-2",
                    )}
                  >
                    <div className="group relative">
                      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#EDEAE4] shadow-[0_30px_60px_-34px_rgba(21,28,75,0.4)] sm:rounded-[1.75rem]">
                        <div className="relative aspect-[16/11] overflow-hidden">
                          <div
                            data-pf-parallax
                            className="absolute inset-[-10%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          >
                            <Image
                              src={item.image}
                              alt={item.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover object-top"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${item.accent}33, transparent 65%)`,
                        }}
                      />
                    </div>

                    <div className={cn(reverse && "lg:text-right")}>
                      <div
                        className={cn(
                          "flex flex-wrap items-center gap-3",
                          reverse && "lg:justify-end",
                        )}
                      >
                        <span
                          className="font-heading-manrope text-[0.75rem] font-bold tracking-[0.2em]"
                          style={{ color: item.accent }}
                        >
                          {item.number}
                        </span>
                        <span className="font-body-poppins text-[0.8rem] text-[#8B90A0]">
                          {item.year} · {item.industry}
                        </span>
                      </div>

                      <h3 className="mt-4 font-heading-manrope text-[clamp(1.75rem,3.2vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#151C4B]">
                        {item.name}
                      </h3>
                      <p className="mt-2 font-body-poppins text-[0.95rem] font-medium text-[#8B90A0]">
                        {item.category}
                      </p>
                      <p
                        className={cn(
                          "mt-5 max-w-[34rem] font-body-poppins text-[1.05rem] leading-[1.75] text-[#5C5370]",
                          reverse && "lg:ml-auto",
                        )}
                      >
                        {item.description}
                      </p>

                      <p
                        className={cn(
                          "mt-6 max-w-[32rem] border-l-[3px] pl-4 font-body-poppins text-[0.95rem] leading-[1.7] text-[#151C4B]",
                          reverse && "lg:ml-auto lg:border-l-0 lg:border-r-[3px] lg:pr-4 lg:pl-0",
                        )}
                        style={{ borderColor: item.accent }}
                      >
                        <span className="font-semibold">Outcome — </span>
                        {item.outcome}
                      </p>

                      <div
                        className={cn(
                          "mt-7 flex flex-wrap gap-2",
                          reverse && "lg:justify-end",
                        )}
                      >
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#151C4B]/[0.05] px-3 py-1.5 font-body-poppins text-[0.75rem] font-medium text-[#151C4B]/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/contact"
                        className={cn(
                          "group mt-8 inline-flex items-center gap-2 font-heading-manrope text-[0.95rem] font-bold tracking-[-0.02em] text-[#151C4B] transition-colors hover:text-[#E81E62]",
                          reverse && "lg:flex-row-reverse",
                        )}
                      >
                        Start a similar project
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          {visibleCases.length === 0 ? (
            <p className="py-16 text-center font-body-poppins text-[#6B7280]">
              No projects in this category yet — try another filter.
            </p>
          ) : null}
        </Container>
      </section>

      {/* ── Capabilities ─────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container className="relative max-w-[100rem]">
          <div data-pf-fade className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="font-body-poppins text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#E81E62]">
                {portfolioCapabilities.eyebrow}
              </p>
              <h2 className="mt-3 max-w-[12ch] font-heading-manrope text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#151C4B]">
                {portfolioCapabilities.heading}
              </h2>
              <p className="mt-5 max-w-[28rem] font-body-poppins text-[1.05rem] leading-[1.75] text-[#6B7280]">
                {portfolioCapabilities.description}
              </p>
            </div>

            <ul className="m-0 list-none divide-y divide-[#151C4B]/10 border-y border-[#151C4B]/10 p-0">
              {portfolioCapabilities.items.map((item, i) => (
                <li
                  key={item.title}
                  className="group grid grid-cols-[auto_1fr] gap-5 py-6 transition-colors sm:gap-8 sm:py-7"
                >
                  <span className="font-heading-manrope text-[1.1rem] font-bold tracking-[-0.03em] text-[#E81E62]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading-manrope text-[1.25rem] font-bold tracking-[-0.02em] text-[#151C4B] transition-colors group-hover:text-[#E81E62] sm:text-[1.4rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[36rem] font-body-poppins text-[0.95rem] leading-[1.7] text-[#6B7280]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container className="relative max-w-[100rem]">
          <div
            data-pf-fade
            className="relative overflow-hidden rounded-[2rem] bg-[#151C4B] px-6 py-14 sm:rounded-[2.5rem] sm:px-10 sm:py-16 lg:px-14 lg:py-20"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.28),transparent_65%)] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 bottom-0 size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_65%)] blur-3xl"
            />

            <header className="relative mx-auto max-w-[40rem] text-center">
              <p className="font-body-poppins text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/45">
                {portfolioProcess.eyebrow}
              </p>
              <h2 className="mt-3 font-heading-manrope text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-[-0.04em] text-white">
                {portfolioProcess.heading}
              </h2>
            </header>

            <ul className="relative mt-14 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
              {portfolioProcess.items.map((item, i) => (
                <li key={item.step} className="relative">
                  {i < portfolioProcess.items.length - 1 ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-5 left-[3.25rem] hidden h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-white/25 to-transparent lg:block"
                    />
                  ) : null}
                  <p className="font-heading-manrope text-[2.5rem] font-extrabold tracking-[-0.05em] text-white/15">
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-heading-manrope text-[1.25rem] font-bold tracking-[-0.02em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body-poppins text-[0.9rem] leading-[1.7] text-white/65">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Industries marquee + stack ───────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div data-pf-fade className="overflow-hidden border-y border-[#151C4B]/10 py-5">
          <div className="pf-marquee flex w-max gap-10 whitespace-nowrap">
            {[...portfolioIndustries.items, ...portfolioIndustries.items].map(
              (item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="inline-flex items-center gap-10 font-heading-manrope text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-[-0.04em] text-[#151C4B]/25"
                >
                  {item}
                  <span className="size-2 rounded-full bg-[#E81E62]/70" />
                </span>
              ),
            )}
          </div>
        </div>

        <Container className="relative mt-14 max-w-[100rem] sm:mt-16">
          <div data-pf-fade className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-body-poppins text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#E81E62]">
                {portfolioStack.eyebrow}
              </p>
              <h2 className="mt-3 max-w-[16ch] font-heading-manrope text-[clamp(1.85rem,3.5vw,2.75rem)] font-extrabold tracking-[-0.035em] text-[#151C4B]">
                {portfolioStack.heading}
              </h2>
            </div>
            <ul className="flex list-none flex-wrap gap-2.5 p-0 lg:max-w-[34rem] lg:justify-end">
              {portfolioStack.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[#151C4B]/12 bg-white/70 px-4 py-2 font-body-poppins text-[0.85rem] font-medium text-[#151C4B] backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-28">
        <Container className="relative max-w-[100rem]">
          <div
            data-pf-fade
            className="relative overflow-hidden rounded-[2rem] border border-[#151C4B]/10 bg-white px-6 py-14 text-center shadow-[0_40px_80px_-48px_rgba(21,28,75,0.35)] sm:rounded-[2.5rem] sm:px-12 sm:py-20"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 top-0 size-64 rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.12),transparent_70%)] blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 bottom-0 size-64 rounded-full bg-[radial-gradient(circle,rgba(21,28,75,0.08),transparent_70%)] blur-2xl"
            />

            <p className="relative font-body-poppins text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#E81E62]">
              {portfolioCta.eyebrow}
            </p>
            <h2 className="relative mx-auto mt-4 max-w-[18ch] font-heading-manrope text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#151C4B]">
              {portfolioCta.heading}
            </h2>
            <p className="relative mx-auto mt-5 max-w-[32rem] font-body-poppins text-[1.05rem] leading-[1.75] text-[#6B7280]">
              {portfolioCta.description}
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={portfolioCta.primaryCta.href}
                className="group inline-flex h-[3.25rem] items-center gap-2.5 rounded-full bg-[#E81E62] px-7 text-[0.9375rem] font-semibold text-white transition-all duration-300 hover:bg-[#D11857]"
              >
                {portfolioCta.primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={portfolioCta.secondaryCta.href}
                className="inline-flex h-[3.25rem] items-center gap-2 rounded-full border border-[#151C4B]/15 bg-transparent px-7 text-[0.9375rem] font-semibold text-[#151C4B] transition-all duration-300 hover:border-[#151C4B]/30"
              >
                {portfolioCta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
