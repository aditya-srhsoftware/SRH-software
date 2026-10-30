"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioProjects } from "@/components/portfolio/portfolio-data";
import { Container } from "@/components/layout/container";
import { smoothScrollTo } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const PROJECT_COUNT = portfolioProjects.length;
const STEP = PROJECT_COUNT > 1 ? 1 / (PROJECT_COUNT - 1) : 1;
const EASE = "power2.inOut";
const TRANSITION_DUR = 0.85;
const DESKTOP_MQ = "(min-width: 1024px)";

/**
 * Desktop (lg+): pinned vertical timeline + preview.
 * Mobile / tablet: image-first card + horizontal project chips (no pin).
 */
export function FeaturedShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileSlideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeProjectIndexRef = useRef(0);
  const displayedIndexRef = useRef(0);
  const tweenRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const scrollToIndexRef = useRef<((index: number) => void) | null>(null);
  const syncFromScrollRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const progressHeightForRef = useRef<(index: number) => number>(() => 0);
  const isDesktopRef = useRef(false);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const getSlides = useCallback(() => {
    const source = isDesktopRef.current ? slideRefs : mobileSlideRefs;
    return portfolioProjects
      .map((_, i) => source.current[i])
      .filter(Boolean) as HTMLDivElement[];
  }, []);

  const runTransition = useCallback((next: number) => {
    const slides = getSlides();
    const from = displayedIndexRef.current;
    if (next === from) return;

    const oldEl = slides[from];
    const newEl = slides[next];
    if (!oldEl || !newEl) return;

    tweenRef.current?.kill();

    slides.forEach((el, i) => {
      if (!el || i === from || i === next) return;
      gsap.set(el, {
        autoAlpha: 0,
        yPercent: 0,
        scale: 1,
        zIndex: 1,
      });
    });

    if (reducedMotionRef.current) {
      gsap.set(oldEl, { autoAlpha: 0, yPercent: 0, scale: 1, zIndex: 1 });
      gsap.set(newEl, { autoAlpha: 1, yPercent: 0, scale: 1, zIndex: 3 });
      displayedIndexRef.current = next;
      return;
    }

    gsap.set(oldEl, { zIndex: 2 });
    gsap.set(newEl, {
      autoAlpha: 0,
      yPercent: 14,
      scale: 0.985,
      zIndex: 4,
    });

    const tl = gsap.timeline({
      defaults: { ease: EASE, overwrite: "auto" },
      onComplete: () => {
        displayedIndexRef.current = next;
      },
    });

    tl.to(
      oldEl,
      {
        yPercent: -10,
        autoAlpha: 0,
        scale: 0.985,
        duration: TRANSITION_DUR,
      },
      0,
    );

    tl.to(
      newEl,
      {
        yPercent: 0,
        autoAlpha: 1,
        scale: 1,
        duration: TRANSITION_DUR,
      },
      0,
    );

    tweenRef.current = tl;
  }, [getSlides]);

  const applyActive = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(PROJECT_COUNT - 1, index));
      if (next === activeProjectIndexRef.current) return;

      activeProjectIndexRef.current = next;
      setActiveProjectIndex(next);
      runTransition(next);

      const progressEl = progressRef.current;
      if (progressEl && isDesktopRef.current) {
        gsap.to(progressEl, {
          height: progressHeightForRef.current(next),
          duration: reducedMotionRef.current ? 0 : 0.45,
          ease: EASE,
          overwrite: true,
        });
      }
    },
    [runTransition],
  );

  const handleActivate = useCallback(
    (index: number, opts?: { scroll?: boolean }) => {
      const next = Math.max(0, Math.min(PROJECT_COUNT - 1, index));
      applyActive(next);
      if (opts?.scroll && isDesktopRef.current) {
        syncFromScrollRef.current = false;
        scrollToIndexRef.current?.(next);
      }
    },
    [applyActive],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ctx: gsap.Context | null = null;
    let cancelled = false;
    const desktopMq = window.matchMedia(DESKTOP_MQ);

    const initSlidesVisible = (slides: HTMLDivElement[]) => {
      gsap.set(slides, {
        autoAlpha: 0,
        yPercent: 0,
        scale: 1,
        zIndex: 1,
      });
      if (slides[0]) {
        gsap.set(slides[0], {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          zIndex: 3,
        });
      }
      displayedIndexRef.current = 0;
      activeProjectIndexRef.current = 0;
      setActiveProjectIndex(0);
    };

    const setup = () => {
      if (cancelled) return;

      isDesktopRef.current = desktopMq.matches;
      const slides = getSlides();

      if (slides.length !== PROJECT_COUNT) {
        requestAnimationFrame(setup);
        return;
      }

      ctx?.revert();
      ctx = null;
      stRef.current = null;
      scrollToIndexRef.current = null;

      ctx = gsap.context(() => {
        initSlidesVisible(slides);

        if (!desktopMq.matches) {
          // Mobile / tablet: no pin — tap chips to switch previews
          return;
        }

        const progressEl = progressRef.current;

        const measureProgressSpan = () => {
          if (!progressEl) return 0;
          const list = progressEl.parentElement;
          if (!list) return 0;
          const dots = list.querySelectorAll<HTMLElement>("[data-timeline-dot]");
          const first = dots[0];
          const last = dots[dots.length - 1];
          if (!first || !last) return 0;

          const listTop = list.getBoundingClientRect().top;
          const firstCenter =
            first.getBoundingClientRect().top +
            first.getBoundingClientRect().height / 2 -
            listTop;
          const lastCenter =
            last.getBoundingClientRect().top +
            last.getBoundingClientRect().height / 2 -
            listTop;

          progressEl.style.top = `${firstCenter}px`;
          return Math.max(0, lastCenter - firstCenter);
        };

        let trackSpan = measureProgressSpan();

        progressHeightForRef.current = (index: number) => {
          if (PROJECT_COUNT <= 1) return trackSpan;
          return trackSpan * (index / (PROJECT_COUNT - 1));
        };

        if (progressEl) {
          gsap.set(progressEl, {
            height: progressHeightForRef.current(0),
          });
        }

        const endDistance = () =>
          Math.round(window.innerHeight * PROJECT_COUNT);

        const indexFromProgress = (progress: number) =>
          Math.min(
            PROJECT_COUNT - 1,
            Math.round(progress * (PROJECT_COUNT - 1)),
          );

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: endDistance,
          pin,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: reducedMotionRef.current
            ? { snapTo: STEP, duration: 0.25, ease: EASE }
            : {
                snapTo: STEP,
                duration: { min: 0.25, max: 0.55 },
                ease: EASE,
                delay: 0.02,
              },
          onRefresh: () => {
            trackSpan = measureProgressSpan();
            if (progressEl) {
              gsap.set(progressEl, {
                height: progressHeightForRef.current(
                  activeProjectIndexRef.current,
                ),
              });
            }
          },
          onUpdate: (self) => {
            const next = indexFromProgress(self.progress);

            if (!syncFromScrollRef.current) {
              if (next === activeProjectIndexRef.current) {
                syncFromScrollRef.current = true;
              }
              return;
            }

            applyActive(next);
          },
        });

        stRef.current = st;

        scrollToIndexRef.current = (index: number) => {
          const target = st.start + (st.end - st.start) * (index * STEP);
          smoothScrollTo(target);
        };
      }, section);
    };

    setup();

    const onBreakpoint = () => {
      tweenRef.current?.kill();
      setup();
      ScrollTrigger.refresh();
    };

    desktopMq.addEventListener("change", onBreakpoint);

    return () => {
      cancelled = true;
      desktopMq.removeEventListener("change", onBreakpoint);
      tweenRef.current?.kill();
      ctx?.revert();
      stRef.current = null;
      scrollToIndexRef.current = null;
    };
  }, [applyActive, getSlides]);

  const activeProject = portfolioProjects[activeProjectIndex];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-showcase-heading"
      className="relative bg-neutral-100"
    >
      <div
        ref={pinRef}
        className="relative z-10 flex min-h-0 flex-col justify-center lg:min-h-[100dvh]"
      >
        <Container className="flex w-full flex-col py-12 sm:py-14 lg:py-16">
          {/* ── Mobile / Tablet ───────────────────────────────────── */}
          <div className="flex flex-col lg:hidden">
            <header className="mb-7 max-w-md sm:mb-8">
              <h2
                id="featured-showcase-heading"
                className="font-display text-[clamp(1.75rem,7vw,2.4rem)] font-bold tracking-[-0.03em] text-foreground"
              >
                Featured <span className="text-[#E81E62]">Projects</span>
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-[0.95rem]">
                Selected digital products crafted with clarity, innovation and
                lasting impact.
              </p>
            </header>

            {/* Preview first — dominant visual */}
            <div
              className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.35rem] shadow-[0_20px_48px_-20px_rgba(26,16,48,0.35)] sm:aspect-[16/10] sm:rounded-[1.6rem]"
              aria-live="polite"
              aria-atomic="true"
            >
              {portfolioProjects.map((project, index) => (
                <div
                  key={`m-${project.id}`}
                  ref={(node) => {
                    mobileSlideRefs.current[index] = node;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{
                    pointerEvents:
                      index === activeProjectIndex ? "auto" : "none",
                  }}
                  aria-hidden={index !== activeProjectIndex}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 0px"
                    className="object-cover object-center"
                    priority={index === 0}
                    draggable={false}
                  />
                </div>
              ))}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent"
              />
              {activeProject ? (
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-body-poppins text-[0.7rem] font-semibold tracking-[0.16em] text-white/80">
                    {activeProject.number}
                  </p>
                  <p className="mt-0.5 font-heading-manrope text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
                    {activeProject.name}
                  </p>
                  <p className="mt-0.5 text-sm text-white/75">
                    {activeProject.meta}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Horizontal project chips */}
            <nav
              aria-label="Featured projects"
              className="mt-6 -mx-4 sm:mx-0 sm:mt-7"
            >
              <ul className="flex list-none gap-2.5 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] sm:gap-3 sm:px-0 [&::-webkit-scrollbar]:hidden">
                {portfolioProjects.map((project, index) => {
                  const isActive = index === activeProjectIndex;

                  return (
                    <li key={project.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => handleActivate(index)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex min-w-[9.5rem] flex-col rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E81E62] sm:min-w-[10.5rem] sm:px-5",
                          isActive
                            ? "border-[#E81E62]/35 bg-white shadow-[0_12px_28px_-14px_rgba(232,30,98,0.35)]"
                            : "border-[#E4E6EF] bg-white/70 text-neutral-500 hover:border-[#D5D8E4] hover:bg-white",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[0.65rem] font-semibold tracking-[0.14em]",
                            isActive ? "text-[#E81E62]" : "text-neutral-400",
                          )}
                        >
                          {project.number}
                        </span>
                        <span
                          className={cn(
                            "mt-1 font-heading-manrope text-[0.95rem] font-bold tracking-[-0.02em]",
                            isActive ? "text-[#151C4B]" : "text-neutral-500",
                          )}
                        >
                          {project.name}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 text-[0.75rem]",
                            isActive ? "text-[#6E7288]" : "text-neutral-400",
                          )}
                        >
                          {project.meta}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Dot progress */}
              <div
                aria-hidden
                className="mt-5 flex items-center justify-center gap-2"
              >
                {portfolioProjects.map((project, index) => (
                  <span
                    key={project.id}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      index === activeProjectIndex
                        ? "w-6 bg-[#E81E62]"
                        : "w-1.5 bg-[#D5D8E4]",
                    )}
                  />
                ))}
              </div>
            </nav>

            <Link
              href="/portfolio"
              className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full bg-white px-5 text-sm font-semibold text-[#151C4B] shadow-[0_8px_24px_-12px_rgba(26,16,48,0.18)] ring-1 ring-[#E4E6EF] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E81E62] sm:mt-8 sm:w-auto sm:self-start"
            >
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[#E81E62]"
              />
              View All Work
            </Link>
          </div>

          {/* ── Desktop ─────────────────────────────────────────── */}
          <div className="hidden items-start gap-12 lg:grid lg:grid-cols-[minmax(16rem,0.32fr)_minmax(0,0.68fr)] xl:gap-16">
            <div className="flex flex-col">
              <header className="mb-10 max-w-sm">
                <h2 className="font-display text-[clamp(1.65rem,6vw,2.5rem)] font-bold tracking-[-0.03em] text-foreground">
                  Featured <span className="text-[#E81E62]">Projects</span>
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Selected digital products crafted with clarity, innovation and
                  lasting impact.
                </p>
              </header>

              <nav aria-label="Featured projects" className="relative">
                <ol className="relative m-0 flex list-none flex-col p-0">
                  {portfolioProjects.map((project, index) => {
                    const isActive = index === activeProjectIndex;
                    const isLast = index === PROJECT_COUNT - 1;

                    return (
                      <li key={project.id} className="relative">
                        {!isLast ? (
                          <span
                            aria-hidden
                            className="absolute left-[9px] top-[1.15rem] -bottom-[1.15rem] z-0 w-px bg-blue-200"
                          />
                        ) : null}
                        <button
                          type="button"
                          onClick={() =>
                            handleActivate(index, { scroll: true })
                          }
                          onFocus={() =>
                            handleActivate(index, { scroll: true })
                          }
                          aria-current={isActive ? "true" : undefined}
                          className="group relative grid w-full grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3 py-4 text-left transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                        >
                          <span className="relative flex justify-center pt-[0.35rem]">
                            <span
                              aria-hidden
                              data-timeline-dot
                              className={cn(
                                "relative z-10 size-2.5 shrink-0 rounded-full transition-all duration-500",
                                isActive
                                  ? "bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.18)]"
                                  : "bg-blue-300 group-hover:bg-blue-400",
                              )}
                            />
                          </span>

                          <span className="min-w-0">
                            <span
                              className={cn(
                                "block text-[0.7rem] font-semibold tracking-[0.12em] transition-colors duration-500",
                                isActive ? "text-blue-600" : "text-neutral-400",
                              )}
                            >
                              {project.number}
                            </span>
                            <span
                              className={cn(
                                "mt-1 block font-display text-lg font-semibold tracking-[-0.02em] transition-colors duration-500 sm:text-xl",
                                isActive
                                  ? "text-foreground"
                                  : "text-neutral-400 group-hover:text-neutral-600",
                              )}
                            >
                              {project.name}
                            </span>
                            <span
                              className={cn(
                                "mt-1 block text-sm transition-colors duration-500",
                                isActive
                                  ? "text-muted-foreground"
                                  : "text-neutral-400",
                              )}
                            >
                              {project.meta}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}

                  <span
                    aria-hidden
                    ref={progressRef}
                    className="pointer-events-none absolute left-[9px] top-[1.15rem] z-[1] w-px origin-top bg-blue-600 will-change-[height]"
                    style={{ height: `${100 / PROJECT_COUNT}%` }}
                  />
                </ol>

                <Link
                  href="/portfolio"
                  className="mt-6 ml-8 inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-5 text-sm font-semibold text-foreground shadow-[0_8px_24px_-12px_rgba(26,16,48,0.18)] ring-1 ring-border transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-blue-600"
                  />
                  View All Work
                </Link>
              </nav>
            </div>

            <div
              className="relative min-h-[min(70vh,42rem)] w-full self-stretch overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              {portfolioProjects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{
                    pointerEvents:
                      index === activeProjectIndex ? "auto" : "none",
                  }}
                  aria-hidden={index !== activeProjectIndex}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(26,16,48,0.4)]">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="65vw"
                      className="object-cover object-center"
                      priority={index === 0}
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
              <p className="sr-only">
                {activeProject
                  ? `${activeProject.number} ${activeProject.name} — ${activeProject.meta}`
                  : null}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
