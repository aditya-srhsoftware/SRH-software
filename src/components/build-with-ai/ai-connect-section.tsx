"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import connectTeamImg from "@/assets/images/build-with-ai/connect-team.jpg";
import { Container } from "@/components/layout/container";
import { buildWithAiConnect } from "@/content/build-with-ai";

function SocialIcon({ id }: { id: (typeof buildWithAiConnect.social)[number]["id"] }) {
  const common = "size-[1.05rem]";
  switch (id) {
    case "pinterest":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.406.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.992 3.991-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.99-5.373 11.99-12C24 5.372 18.627.001 12 0z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.879L1.75 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
  }
}

export function AiConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-connect-fade]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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
      id={buildWithAiConnect.id}
      className="relative scroll-mt-28 overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 size-[20rem] rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.08),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(123,92,255,0.07),transparent_70%)] blur-3xl"
      />

      <Container className="relative max-w-[86rem]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <div data-connect-fade className="max-w-[34rem]">
            <h2 className="font-heading-manrope text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#151C4B]">
              {buildWithAiConnect.heading}
            </h2>
            <p className="mt-5 font-body-poppins text-[0.95rem] font-normal leading-[1.75] text-[#6B7280] sm:mt-6 sm:text-[1.0625rem]">
              {buildWithAiConnect.description}
            </p>

            <div className="mt-9 space-y-5 sm:mt-10">
              <div>
                <p className="font-heading-manrope text-[0.95rem] font-bold tracking-[-0.01em] text-[#151C4B]">
                  {buildWithAiConnect.email.label}
                </p>
                <Link
                  href={buildWithAiConnect.email.href}
                  className="mt-1.5 inline-block font-body-poppins text-[0.95rem] text-[#5C5370] transition-colors hover:text-[#E81E62] sm:text-[1rem]"
                >
                  {buildWithAiConnect.email.value}
                </Link>
              </div>

              <div>
                <p className="font-heading-manrope text-[0.95rem] font-bold tracking-[-0.01em] text-[#151C4B]">
                  {buildWithAiConnect.phone.label}
                </p>
                <Link
                  href={buildWithAiConnect.phone.href}
                  className="mt-1.5 inline-block font-body-poppins text-[0.95rem] text-[#5C5370] transition-colors hover:text-[#E81E62] sm:text-[1rem]"
                >
                  {buildWithAiConnect.phone.value}
                </Link>
              </div>
            </div>

            <div className="mt-9 sm:mt-10">
              <p className="font-heading-manrope text-[0.95rem] font-bold tracking-[-0.01em] text-[#151C4B]">
                {buildWithAiConnect.socialLabel}
              </p>
              <ul className="mt-4 flex list-none items-center gap-3 p-0">
                {buildWithAiConnect.social.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex size-10 items-center justify-center rounded-full bg-[#151C4B] text-white transition-all duration-300 hover:scale-105 hover:bg-[#E81E62]"
                    >
                      <SocialIcon id={item.id} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-connect-fade className="relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-5 rounded-[2.25rem] bg-[radial-gradient(circle_at_30%_20%,rgba(232,30,98,0.12),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(123,92,255,0.1),transparent_50%)] blur-2xl"
            />
            {/* Outer frame */}
            <div className="relative rounded-[1.5rem] border border-[#D8D8DE] bg-gradient-to-br from-white via-[#FAF8F4] to-[#F3F0EA] p-2.5 shadow-[0_28px_60px_-28px_rgba(21,28,75,0.35)] sm:rounded-[1.85rem] sm:p-3.5">
              {/* Inner matte + image */}
              <div className="relative overflow-hidden rounded-[1.1rem] border border-[#ECECEC] bg-white ring-1 ring-[#151C4B]/[0.06] sm:rounded-[1.35rem]">
                <Image
                  src={connectTeamImg}
                  alt="SRH Software AI experts collaborating in a modern workspace"
                  width={960}
                  height={720}
                  className="aspect-[4/3] h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
