"use client";

import { gsap } from "@/lib/gsap";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import discoverImg from "@/assets/images/process/discover.jpg";
import designImg from "@/assets/images/process/design.jpg";
import buildImg from "@/assets/images/process/build.jpg";
import testImg from "@/assets/images/process/test.jpg";
import launchImg from "@/assets/images/process/launch.jpg";
import supportImg from "@/assets/images/process/support.jpg";

const steps: {
  number: string;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
}[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Align on goals, users, and constraints before writing a line of code.",
    image: discoverImg,
    alt: "Team mapping goals and ideas on sticky notes during discovery workshop",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Prototype and validate the experience with real users, fast.",
    image: designImg,
    alt: "Designer sketching UI wireframes on a tablet",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Ship in weekly sprints with full visibility into progress.",
    image: buildImg,
    alt: "Close-up of application source code in a development editor",
  },
  {
    number: "04",
    title: "Test",
    description:
      "Validate quality, performance, and edge cases before anything goes live.",
    image: testImg,
    alt: "Team reviewing and validating software on a laptop",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Deploy with confidence — monitored rollouts and a clear go-live plan.",
    image: launchImg,
    alt: "Rocket launching into the sky at liftoff",
  },
  {
    number: "06",
    title: "Support",
    description:
      "Stay close after launch with iteration, maintenance, and growth support.",
    image: supportImg,
    alt: "Partners celebrating continued collaboration and support",
  },
];

const HIT = 44;
const MAX_PULL = 38;
const STIFFNESS = 260;
const DAMPING = 7.5;
const IMPULSE_GAIN = 2.1;
const MAX_IMPULSE = 42;
const DISPLACE_GAIN = 0.62;
const COOLDOWN_MS = 70;
const INFLUENCE = 18;

type StringState = {
  y: number;
  v: number;
  cx: number;
  width: number;
  midY: number;
  path: SVGPathElement | null;
  raf: number;
  lastX: number;
  lastY: number;
  hasLast: boolean;
  lastPluck: number;
};

function pathD(width: number, midY: number, cx: number, pull: number) {
  const c = Math.max(0, Math.min(width, cx));
  const left = c * 0.45;
  const right = c + (width - c) * 0.55;
  return `M 0 ${midY} C ${left} ${midY + pull * 0.35}, ${c} ${midY + pull}, ${c} ${midY + pull} C ${c} ${midY + pull}, ${right} ${midY + pull * 0.35}, ${width} ${midY}`;
}

function GuitarString() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const state = useRef<StringState>({
    y: 0,
    v: 0,
    cx: 0,
    width: 0,
    midY: HIT,
    path: null,
    raf: 0,
    lastX: 0,
    lastY: 0,
    hasLast: false,
    lastPluck: 0,
  });

  const draw = useCallback(() => {
    const s = state.current;
    if (!s.path || s.width <= 0) return;
    s.path.setAttribute("d", pathD(s.width, s.midY, s.cx, s.y));
  }, []);

  const tick = useCallback(() => {
    const s = state.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      s.y = 0;
      s.v = 0;
      draw();
      s.raf = 0;
      return;
    }

    const dt = 1 / 60;
    const force = -STIFFNESS * s.y;
    s.v += force * dt;
    s.v *= Math.exp(-DAMPING * dt);
    s.y += s.v * dt;

    if (Math.abs(s.y) < 0.04 && Math.abs(s.v) < 0.04) {
      s.y = 0;
      s.v = 0;
      draw();
      s.raf = 0;
      return;
    }

    draw();
    s.raf = requestAnimationFrame(tick);
  }, [draw]);

  const startLoop = useCallback(() => {
    const s = state.current;
    if (!s.raf) s.raf = requestAnimationFrame(tick);
  }, [tick]);

  const pluck = useCallback(
    (crossX: number, dir: number, speed: number) => {
      const s = state.current;
      const now = performance.now();
      if (now - s.lastPluck < COOLDOWN_MS) return;
      s.lastPluck = now;

      s.cx = Math.max(0, Math.min(s.width, crossX));
      const impulse = Math.min(MAX_IMPULSE, 10 + speed * IMPULSE_GAIN);
      const signed = dir === 0 ? 1 : dir;
      s.y = Math.max(
        -MAX_PULL,
        Math.min(MAX_PULL, s.y + signed * impulse * DISPLACE_GAIN),
      );
      s.v += signed * impulse;
      startLoop();
    },
    [startLoop],
  );

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const width = wrap.clientWidth;
    const s = state.current;
    s.width = width;
    s.midY = HIT;
    s.path = pathRef.current;
    if (s.cx <= 0) s.cx = width * 0.5;

    svg.setAttribute("viewBox", `0 0 ${width} ${HIT * 2}`);
    draw();
  }, [draw]);

  useEffect(() => {
    measure();
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);

    const localPoint = (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top - state.current.midY,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      const { x, y } = localPoint(e.clientX, e.clientY);
      const s = state.current;

      if (s.hasLast) {
        const prevX = s.lastX;
        const prevY = s.lastY;
        const prevDist = Math.abs(prevY);
        const currDist = Math.abs(y);
        const crossedZero =
          prevY !== y &&
          ((prevY < 0 && y >= 0) ||
            (prevY > 0 && y <= 0) ||
            (prevY === 0 && y !== 0));
        const enteredInfluence =
          prevDist > INFLUENCE && currDist <= INFLUENCE && currDist < prevDist;

        if (crossedZero || enteredInfluence) {
          const dy = y - prevY;
          const targetY = crossedZero ? 0 : Math.sign(prevY || y) * INFLUENCE;
          const t =
            dy !== 0 ? Math.min(1, Math.max(0, (targetY - prevY) / dy)) : 0;
          const crossX = prevX + (x - prevX) * t;
          const speed = Math.hypot(x - prevX, y - prevY);
          const dir = Math.sign(y - prevY) || Math.sign(y) || 1;
          pluck(crossX, dir, speed);
        }
      }

      s.lastX = x;
      s.lastY = y;
      s.hasLast = true;
    };

    const onPointerLeave = () => {
      state.current.hasLast = false;
    };

    wrap.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave);

    return () => {
      ro.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(state.current.raf);
    };
  }, [measure, pluck]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-auto relative z-10 mt-5 h-14 w-full md:mt-6"
      aria-hidden
    >
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 h-14 w-full -translate-y-1/2 overflow-visible"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="#E6E8EF"
          strokeWidth="1.35"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

const MOVE_EASE = "power4.out";
const IMG_EASE = "expo.out";
const EXIT_DUR = 0.55;
const ENTER_DUR = 1.05;
const ENTER_OFFSET = 0.08;
const MOVE_DUR = 0.55;
/** New image starts close-up and settles into place (zoom-in). */
const ENTER_SCALE = 1.28;
const EXIT_SCALE = 1.1;

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const displayedRef = useRef(0);
  const pendingRef = useRef(0);
  const imgTweenRef = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = useRef(false);

  const snapLayer = useCallback((index: number, visible: boolean) => {
    const el = layerRefs.current[index];
    if (!el) return;
    gsap.set(el, {
      autoAlpha: visible ? 1 : 0,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      zIndex: visible ? 2 : 1,
      transformOrigin: "50% 50%",
    });
  }, []);

  const commitDisplayed = useCallback(
    (index: number) => {
      layerRefs.current.forEach((_, i) => snapLayer(i, i === index));
      displayedRef.current = index;
      pendingRef.current = index;
    },
    [snapLayer],
  );

  const movePreviewTo = useCallback((index: number) => {
    const stage = stageRef.current;
    const preview = previewRef.current;
    const step = stepRefs.current[index];
    if (!stage || !preview || !step) return;

    const stageTop = stage.getBoundingClientRect().top;
    const stepRect = step.getBoundingClientRect();
    const previewH = preview.offsetHeight || 1;
    const stepCenter = stepRect.top - stageTop + stepRect.height / 2;
    const y = stepCenter - previewH / 2;

    if (reducedMotion.current) {
      gsap.set(preview, { y });
      return;
    }

    gsap.to(preview, {
      y,
      duration: MOVE_DUR,
      ease: MOVE_EASE,
      overwrite: true,
    });
  }, []);

  const transitionImage = useCallback(
    (next: number) => {
      if (next < 0 || next >= steps.length) return;

      // Finish any in-flight swap so displayedRef never goes stale
      if (imgTweenRef.current?.isActive()) {
        imgTweenRef.current.kill();
        commitDisplayed(pendingRef.current);
      }

      const from = displayedRef.current;
      if (from === next) {
        commitDisplayed(next);
        return;
      }

      const oldEl = layerRefs.current[from];
      const newEl = layerRefs.current[next];
      if (!oldEl || !newEl) {
        // Refs not ready yet — retry next frame
        requestAnimationFrame(() => transitionImage(next));
        return;
      }

      pendingRef.current = next;

      layerRefs.current.forEach((el, i) => {
        if (!el || i === from || i === next) return;
        snapLayer(i, false);
      });

      if (reducedMotion.current) {
        commitDisplayed(next);
        return;
      }

      gsap.set(oldEl, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px) brightness(1)",
        zIndex: 3,
        transformOrigin: "50% 50%",
      });
      gsap.set(newEl, {
        autoAlpha: 0,
        scale: ENTER_SCALE,
        filter: "blur(10px) brightness(0.94)",
        zIndex: 2,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: { ease: IMG_EASE },
        onComplete: () => {
          commitDisplayed(next);
          imgTweenRef.current = null;
        },
        onInterrupt: () => {
          // Handled by the next transitionImage kill+commit
        },
      });

      tl.to(
        oldEl,
        {
          autoAlpha: 0,
          scale: EXIT_SCALE,
          filter: "blur(6px)           brightness(1.02)",
          duration: EXIT_DUR,
          ease: "power3.in",
        },
        0,
      );

      tl.to(
        newEl,
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: ENTER_DUR,
        },
        ENTER_OFFSET,
      );

      imgTweenRef.current = tl;
    },
    [commitDisplayed, snapLayer],
  );

  const activate = useCallback(
    (index: number) => {
      if (index < 0 || index >= steps.length) return;

      const sameActive = index === activeRef.current;
      activeRef.current = index;
      setActiveIndex(index);
      movePreviewTo(index);

      // Always sync image — heals stuck/desynced preview
      if (!sameActive || displayedRef.current !== index) {
        transitionImage(index);
      }
    },
    [movePreviewTo, transitionImage],
  );

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    commitDisplayed(0);
    activeRef.current = 0;

    // Place preview on first step after layout
    requestAnimationFrame(() => movePreviewTo(0));

    const onResize = () => {
      movePreviewTo(activeRef.current);
      // Re-assert visible layer after layout shifts
      if (!imgTweenRef.current?.isActive()) {
        commitDisplayed(activeRef.current);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      imgTweenRef.current?.kill();
    };
  }, [commitDisplayed, movePreviewTo]);

  return (
    <section
      aria-labelledby="process-heading"
      className="relative bg-[#FAFBFC] text-foreground"
    >
      <Container className="py-20 md:py-24 lg:py-28">
        <h2
          id="process-heading"
          className="max-w-4xl font-display text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-brand-900"
        >
          A Process Built for{" "}
          <span className="text-[#E81E62]">Clarity, Not</span>{" "}
          <span className="text-[#E81E62]">Chaos</span>
        </h2>

        <div ref={stageRef} className="relative mt-14 lg:mt-20">
          <ol className="relative z-[1] m-0 w-full list-none overflow-visible p-0">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const isActive = index === activeIndex;
              return (
                <li
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="relative pt-8 first:pt-0 sm:pt-10 md:pt-12"
                  onMouseEnter={() => activate(index)}
                  onFocus={() => activate(index)}
                >
                  <button
                    type="button"
                    className="relative z-[1] w-full max-w-lg cursor-default border-0 bg-transparent p-0 text-left md:max-w-[min(100%,28rem)] lg:max-w-[min(100%,32rem)]"
                    onFocus={() => activate(index)}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-lg font-bold tracking-[-0.02em] text-[#E81E62] md:text-xl">
                        {step.number}
                      </span>
                      <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-brand-900 md:text-[1.75rem]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
                      {step.description}
                    </p>
                  </button>

                  <div className="relative z-[1] mt-6 aspect-[16/10] overflow-hidden rounded-2xl bg-[#EEF0F4] md:hidden">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 767px) calc(100vw - 2rem), 0px"
                      placeholder="blur"
                    />
                  </div>

                  {!isLast ? <GuitarString /> : null}
                </li>
              );
            })}
          </ol>

          {/* Preview above dividers so lines run behind the card, edge to edge */}
          <div
            ref={previewRef}
            className="pointer-events-none absolute top-0 right-0 z-30 hidden w-[min(48%,36rem)] will-change-transform md:block"
            style={{ transform: "translate3d(0,0,0)" }}
            aria-hidden
          >
            <div className="relative isolate aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#FAFBFC] shadow-[0_28px_56px_-18px_rgba(26,16,48,0.38)] ring-1 ring-black/[0.06] lg:rounded-[1.5rem]">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    layerRefs.current[index] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: "translate3d(0,0,0)" }}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 36rem, 0px"
                    placeholder="blur"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#E81E62]">
              {steps[activeIndex]?.number} · {steps[activeIndex]?.title}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
