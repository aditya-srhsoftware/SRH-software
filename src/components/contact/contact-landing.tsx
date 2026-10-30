"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import connectTeamImg from "@/assets/images/build-with-ai/connect-team.jpg";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { offices } from "@/content/about-offices";
import {
  contactDetails,
  contactFaq,
  contactHero,
  contactReasons,
  contactSocial,
} from "@/content/contact";

function SocialIcon({ id }: { id: (typeof contactSocial)[number]["id"] }) {
  const common = "size-[1rem]";
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

export function ContactLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const [openId, setOpenId] = useState(contactFaq[0]?.question ?? "");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-contact-hero]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.09,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-contact-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
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
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.13),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-12%] top-[6%] size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(21,28,75,0.08),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(21,28,75,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(21,28,75,0.035)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-[7.25rem] lg:pb-14">
        <Container className="relative max-w-[100rem]">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
            <div>
              <p
                data-contact-hero
                className="inline-flex items-center gap-3 font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#E81E62]"
              >
                <span aria-hidden className="h-px w-8 bg-[#E81E62]/80" />
                {contactHero.eyebrow}
              </p>

              <p
                data-contact-hero
                className="mt-7 font-heading-manrope text-[clamp(1.05rem,2vw,1.25rem)] font-bold tracking-[-0.03em] text-[#151C4B]/50"
              >
                {contactHero.brand}
              </p>

              <h1
                data-contact-hero
                className="mt-3 max-w-[14ch] font-heading-manrope text-[clamp(2.35rem,4.8vw,3.75rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#151C4B]"
              >
                <span className="block">{contactHero.headingLine1}</span>
                <span className="block text-[#E81E62]">
                  {contactHero.headingLine2Before}
                </span>
              </h1>

              <p
                data-contact-hero
                className="mt-7 max-w-[28rem] font-body-poppins text-[1.0625rem] leading-[1.75] text-[#6B7280] sm:text-[1.125rem]"
              >
                {contactHero.description}
              </p>
            </div>

            <div data-contact-hero className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-36px_rgba(21,28,75,0.45)] sm:rounded-[2rem]">
                <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3]">
                  <Image
                    src={connectTeamImg}
                    alt="SRH Software team collaborating"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#151C4B]/55 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                      Direct line to the team
                    </p>
                    <p className="mt-2 font-heading-manrope text-[1.35rem] font-bold tracking-[-0.03em] text-white sm:text-[1.5rem]">
                      Product, design & engineering — one conversation.
                    </p>
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -left-8 -z-10 size-48 rounded-full bg-[#E81E62]/18 blur-3xl"
              />
            </div>
          </div>

          {/* Contact strip */}
          <ul
            data-contact-hero
            className="mt-12 grid list-none grid-cols-1 gap-0 divide-y divide-[#151C4B]/10 border-y border-[#151C4B]/10 p-0 sm:mt-14 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {(
              [
                {
                  label: contactDetails.email.label,
                  value: contactDetails.email.value,
                  href: contactDetails.email.href,
                },
                {
                  label: contactDetails.phone.label,
                  value: contactDetails.phone.value,
                  href: contactDetails.phone.href,
                },
                {
                  label: contactDetails.hours.label,
                  value: contactDetails.hours.value,
                  href: null,
                },
              ] as const
            ).map((item) => (
              <li key={item.label} className="px-0 py-6 sm:px-8 sm:py-8 first:sm:pl-0 last:sm:pr-0">
                <p className="font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8B90A0]">
                  {item.label}
                </p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-2 inline-flex items-center gap-1.5 font-heading-manrope text-[1.15rem] font-bold tracking-[-0.02em] text-[#151C4B] transition-colors hover:text-[#E81E62] sm:text-[1.25rem]"
                  >
                    {item.value}
                    <ArrowUpRight className="size-4 opacity-40" />
                  </Link>
                ) : (
                  <p className="mt-2 font-heading-manrope text-[1.15rem] font-bold tracking-[-0.02em] text-[#151C4B] sm:text-[1.25rem]">
                    {item.value}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────── */}
      <section id="message" className="relative scroll-mt-28 py-10 sm:py-14 lg:py-16">
        <Container className="relative max-w-[100rem]">
          <div
            data-contact-fade
            className="relative rounded-[2rem] border border-[#ECECEC] bg-white px-6 py-10 shadow-[0_28px_70px_-36px_rgba(21,28,75,0.35)] sm:rounded-[2.25rem] sm:px-10 sm:py-12 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-0 lg:p-0"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
            >
              <div className="absolute -right-20 top-0 size-64 rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.1),transparent_70%)] blur-3xl" />
              <div className="absolute -left-16 bottom-0 size-52 rounded-full bg-[radial-gradient(circle,rgba(21,28,75,0.06),transparent_70%)] blur-3xl" />
            </div>

            {/* Left panel */}
            <div className="relative flex flex-col justify-between border-[#ECECEC] lg:border-r lg:bg-[#FAF8F4]/70 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
              <div>
                <p className="inline-flex items-center gap-2.5 font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#E81E62]">
                  <span aria-hidden className="h-px w-6 bg-[#E81E62]/70" />
                  Project brief
                </p>
                <h2 className="mt-4 max-w-[12ch] font-heading-manrope text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#151C4B]">
                  Tell us what you need
                </h2>
                <p className="mt-4 max-w-[24rem] font-body-poppins text-[0.95rem] leading-[1.75] text-[#6B7280] sm:text-[1rem]">
                  No long RFP required. A clear goal and rough timeline is
                  enough to start a useful conversation.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    "Reply within 24 hours",
                    "Clear next-step guidance",
                    "No obligation to start",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 font-body-poppins text-[0.875rem] text-[#5C5370]"
                    >
                      <span
                        aria-hidden
                        className="size-1.5 shrink-0 rounded-full bg-[#E81E62]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 hidden border-t border-[#151C4B]/10 pt-8 lg:block">
                <p className="font-heading-manrope text-[0.85rem] font-bold tracking-[-0.01em] text-[#151C4B]">
                  Follow along
                </p>
                <ul className="mt-4 flex list-none items-center gap-2.5 p-0">
                  {contactSocial.map((item) => (
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

            {/* Right form panel */}
            <div className="relative mt-8 lg:mt-0 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Reasons — editorial list ─────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container className="relative max-w-[100rem]">
          <div
            data-contact-fade
            className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"
          >
            <div>
              <p className="font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#E81E62]">
                Engagements
              </p>
              <h2 className="mt-3 max-w-[11ch] font-heading-manrope text-[clamp(1.85rem,3.8vw,3.15rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#151C4B]">
                What people usually come for
              </h2>
            </div>

            <ul className="m-0 list-none divide-y divide-[#151C4B]/10 border-y border-[#151C4B]/10 p-0">
              {contactReasons.map((item, i) => (
                <li
                  key={item.title}
                  className="group grid grid-cols-[auto_1fr] gap-5 py-6 sm:gap-8 sm:py-7"
                >
                  <span className="font-heading-manrope text-[1.15rem] font-bold tracking-[-0.03em] text-[#E81E62]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading-manrope text-[1.2rem] font-bold tracking-[-0.02em] text-[#151C4B] transition-colors group-hover:text-[#E81E62] sm:text-[1.35rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[34rem] font-body-poppins text-[0.95rem] leading-[1.7] text-[#6B7280]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Offices ──────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <Container className="relative max-w-[100rem]">
          <div
            data-contact-fade
            className="relative overflow-hidden rounded-[2rem] bg-[#151C4B] px-6 py-12 sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-0 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(232,30,98,0.3),transparent_65%)] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 bottom-0 size-[20rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.2),transparent_65%)] blur-3xl"
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/45">
                  Presence
                </p>
                <h2 className="mt-3 font-heading-manrope text-[clamp(1.85rem,3.6vw,2.85rem)] font-extrabold tracking-[-0.04em] text-white">
                  Where we work from
                </h2>
              </div>
              <p className="max-w-[24rem] font-body-poppins text-[0.95rem] leading-[1.7] text-white/55">
                India, Canada, and expanding into the UAE — close to the teams
                we build with.
              </p>
            </div>

            <ul className="relative mt-12 grid list-none grid-cols-1 gap-0 divide-y divide-white/10 border-y border-white/10 p-0 sm:mt-14 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {offices.map((office) => (
                <li key={office.id} className="py-7 sm:px-8 sm:py-8 first:sm:pl-0 last:sm:pr-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading-manrope text-[1.2rem] font-bold tracking-[-0.02em] text-white">
                      {office.title.replace(" Office", "")}
                    </h3>
                    {office.status === "coming-soon" ? (
                      <span className="rounded-full bg-[#E81E62]/25 px-2.5 py-0.5 font-body-poppins text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#FFB0CB]">
                        Soon
                      </span>
                    ) : null}
                  </div>
                  {office.lines ? (
                    <div className="mt-4 space-y-1">
                      {office.lines.map((line) => (
                        <p
                          key={line}
                          className="font-body-poppins text-[0.9rem] leading-[1.65] text-white/60"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 font-body-poppins text-[0.9rem] leading-[1.65] text-white/45">
                      Expanding soon.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 lg:pb-28 lg:pt-24">
        <Container className="relative max-w-[100rem]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div data-contact-fade>
              <p className="font-body-poppins text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#E81E62]">
                FAQ
              </p>
              <h2 className="mt-3 max-w-[10ch] font-heading-manrope text-[clamp(1.85rem,3.6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#151C4B]">
                Quick answers
              </h2>
              <p className="mt-4 max-w-[24rem] font-body-poppins text-[1rem] leading-[1.75] text-[#6B7280]">
                Still unsure? Send the brief anyway — we’ll help shape it.
              </p>
            </div>

            <ul
              data-contact-fade
              className="m-0 list-none divide-y divide-[#151C4B]/10 border-y border-[#151C4B]/10 p-0"
            >
              {contactFaq.map((item) => {
                const isOpen = openId === item.question;
                const panelId = `${baseId}-${item.question}-panel`;
                const buttonId = `${baseId}-${item.question}-button`;

                return (
                  <li key={item.question}>
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenId((current) =>
                            current === item.question ? "" : item.question,
                          )
                        }
                        className="flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
                      >
                        <span className="font-heading-manrope text-[1.1rem] font-bold leading-snug tracking-[-0.02em] text-[#151C4B] sm:text-[1.2rem]">
                          {item.question}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                            isOpen
                              ? "bg-[#E81E62] text-white"
                              : "bg-[#151C4B]/[0.06] text-[#151C4B]",
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
                        <p className="pb-5 max-w-[40rem] font-body-poppins text-[0.95rem] leading-[1.75] text-[#6B7280] sm:pb-6 sm:text-[1.05rem]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
