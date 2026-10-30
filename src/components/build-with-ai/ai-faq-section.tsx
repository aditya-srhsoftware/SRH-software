"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { buildWithAiFaq } from "@/content/build-with-ai";

export function AiFaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const baseId = useId();
  const [openId, setOpenId] = useState<string>(buildWithAiFaq.items[0]?.id ?? "");

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-faq-fade]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
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

  return (
    <section
      ref={sectionRef}
      id={buildWithAiFaq.id}
      className="relative scroll-mt-28 overflow-hidden pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.14),transparent_68%)] blur-3xl"
      />

      <Container className="relative max-w-[86rem]">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-24">
          {/* Left — CTA copy */}
          <div data-faq-fade className="max-w-[32rem]">
            <h2 className="font-heading-manrope text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#151C4B]">
              {buildWithAiFaq.heading}
            </h2>
            <p className="mt-5 font-body-poppins text-[0.95rem] font-normal leading-[1.75] text-[#6B7280] sm:mt-6 sm:text-[1.0625rem]">
              {buildWithAiFaq.description}
            </p>
            <Link
              href={buildWithAiFaq.cta.href}
              className="mt-8 inline-flex h-[3.15rem] items-center justify-center rounded-full bg-[#151C4B] px-7 text-[0.9375rem] font-semibold tracking-[-0.01em] text-white transition-all duration-300 hover:bg-[#1B2458] hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151C4B] sm:mt-10"
            >
              {buildWithAiFaq.cta.label}
            </Link>
          </div>

          {/* Right — Accordion */}
          <div data-faq-fade className="w-full min-w-0">
            <ul className="m-0 list-none divide-y divide-[#E8E8EC] border-y border-[#E8E8EC] p-0">
              {buildWithAiFaq.items.map((item) => {
                const isOpen = openId === item.id;
                const panelId = `${baseId}-${item.id}-panel`;
                const buttonId = `${baseId}-${item.id}-button`;

                return (
                  <li key={item.id}>
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenId((current) =>
                            current === item.id ? "" : item.id,
                          )
                        }
                        className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors sm:py-6"
                      >
                        <span
                          className={cn(
                            "font-heading-manrope text-[1.05rem] font-bold leading-snug tracking-[-0.02em] text-[#151C4B] sm:text-[1.15rem]",
                            isOpen && "text-[#151C4B]",
                          )}
                        >
                          {item.question}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "border-[#E81E62]/25 bg-[#E81E62]/10 text-[#E81E62]"
                              : "border-[#E5E5EA] bg-white text-[#151C4B] group-hover:border-[#D8D8DE]",
                          )}
                        >
                          {isOpen ? (
                            <Minus className="size-3.5" strokeWidth={2.25} />
                          ) : (
                            <Plus className="size-3.5" strokeWidth={2.25} />
                          )}
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 font-body-poppins text-[0.95rem] font-normal leading-[1.75] text-[#6B7280] sm:pb-6 sm:text-[1rem]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
