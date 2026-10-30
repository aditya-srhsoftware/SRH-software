"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { buildWithAiTestimonials } from "@/content/build-with-ai";

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export function AiTestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useVisibleCount();
  const total = buildWithAiTestimonials.items.length;
  const maxIndex = Math.max(0, total - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.min(maxIndex, Math.max(0, next)));
    },
    [maxIndex],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused, maxIndex]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-t-fade]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const gapPx = 24;

  return (
    <section
      ref={sectionRef}
      id={buildWithAiTestimonials.id}
      className="relative scroll-mt-28 overflow-hidden pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(232,30,98,0.07),transparent_50%),radial-gradient(ellipse_at_90%_30%,rgba(123,92,255,0.05),transparent_45%)]"
      />

      <Container className="relative max-w-[86rem]">
        <h2
          data-t-fade
          className="text-center font-heading-manrope text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold tracking-[-0.03em] text-[#151C4B]"
        >
          {buildWithAiTestimonials.heading}
        </h2>

        <div data-t-fade className="relative mt-10 sm:mt-12 lg:mt-14">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                gap: gapPx,
                transform: `translateX(calc(${index} * -1 * (100% + ${gapPx}px) / ${visible}))`,
              }}
            >
              {buildWithAiTestimonials.items.map((item) => (
                <article
                  key={item.id}
                  className="flex min-h-[17.5rem] shrink-0 flex-col rounded-2xl border bg-white p-6 shadow-[0_10px_30px_-22px_rgba(21,28,75,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(21,28,75,0.24)] sm:min-h-[18.5rem] sm:p-7"
                  style={{
                    width: `calc((100% - ${(visible - 1) * gapPx}px) / ${visible})`,
                    borderColor: item.border,
                  }}
                >
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-[#E81E62] text-[#E81E62] sm:size-4"
                        strokeWidth={0}
                      />
                    ))}
                  </div>

                  <p className="mt-5 flex-1 font-body-poppins text-[0.95rem] font-normal leading-[1.75] text-[#5C5370] sm:text-[1rem]">
                    “{item.quote}”
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-bold text-white ring-2 ring-black/5"
                      style={{
                        background: `linear-gradient(135deg, ${item.avatarTone}, ${item.avatarTone}99)`,
                      }}
                    >
                      {item.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-heading-manrope text-[0.95rem] font-bold tracking-[-0.02em] text-[#151C4B]">
                        {item.name}
                      </p>
                      <p className="mt-0.5 truncate font-body-poppins text-[0.8rem] text-[#8B90A0]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={prev}
              disabled={index === 0}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border border-[#E5E5EA] bg-white text-[#151C4B] shadow-sm transition-all duration-300 hover:border-[#E81E62]/40 hover:bg-[#E81E62]/8",
                index === 0 &&
                  "cursor-not-allowed opacity-35 hover:border-[#E5E5EA] hover:bg-white",
              )}
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index
                      ? "w-7 bg-[#E81E62]"
                      : "w-2 bg-[#D4D4DA] hover:bg-[#B8B8C0]",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonials"
              onClick={next}
              disabled={index === maxIndex}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border border-[#E5E5EA] bg-white text-[#151C4B] shadow-sm transition-all duration-300 hover:border-[#E81E62]/40 hover:bg-[#E81E62]/8",
                index === maxIndex &&
                  "cursor-not-allowed opacity-35 hover:border-[#E5E5EA] hover:bg-white",
              )}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
