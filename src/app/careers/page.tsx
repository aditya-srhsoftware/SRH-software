import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join SRH Software — build web, mobile, and AI products with a team that values clarity, craft, and lasting quality.",
};

const openings = [
  {
    title: "Full-Stack Engineer",
    type: "Full-time · Remote / Hybrid",
    summary:
      "Ship production web apps with React, Next.js, and solid backend design — from APIs to deployment.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-time · Remote / Hybrid",
    summary:
      "Own product experience end to end: research, wireframes, design systems, and polished interfaces.",
  },
  {
    title: "Mobile Developer",
    type: "Full-time · Remote / Hybrid",
    summary:
      "Build cross-platform apps with native-grade performance, offline support, and clean release pipelines.",
  },
] as const;

const values = [
  {
    title: "Clarity over chaos",
    body: "We plan before we build, communicate early, and keep scope honest.",
  },
  {
    title: "Craft that lasts",
    body: "Readable code, accessible UI, and systems that stay maintainable after launch.",
  },
  {
    title: "Ownership",
    body: "You take real responsibility for outcomes — not just tickets.",
  },
] as const;

export default function CareersPage() {
  return (
    <div>
      <PageIntro
        title="Careers"
        description="Build products that matter with a team focused on reliable software, thoughtful design, and long-term partnerships."
      />

      <Section size="sm" className="pt-0">
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-xl font-bold tracking-[-0.03em] text-foreground sm:text-2xl md:text-[1.75rem]">
                Why join SRH Software
              </h2>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                We help startups and growing teams ship web, mobile, and
                AI-powered platforms. If you care about quality and clear
                collaboration, you will feel at home here.
              </p>

              <ul className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                {values.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-display text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.25rem] border border-[#E6E8EF] bg-[#FAFBFC] p-5 sm:rounded-[1.35rem] sm:p-6 md:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#E81E62]">
                Open roles
              </p>
              <ul className="mt-5 space-y-0">
                {openings.map((role, index) => (
                  <li
                    key={role.title}
                    className={
                      index === 0
                        ? "pb-5"
                        : "border-t border-[#E6E8EF] py-5 last:pb-0"
                    }
                  >
                    <h3 className="font-display text-base font-bold tracking-[-0.025em] text-brand-900 sm:text-lg">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
                      {role.type}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {role.summary}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-8 inline-flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-auto"
              >
                Apply via contact
                <ArrowUpRight className="size-4" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Don&apos;t see a perfect fit? Tell us what you do best — we keep
                strong people on the radar.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
