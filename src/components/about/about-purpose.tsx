import { Eye, Target } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const pillars = [
  {
    number: "01",
    title: "Vision",
    accent: "Vision",
    description:
      "To become the most trusted name in custom software development — known for clarity, craft, and products that scale with ambition.",
    icon: Eye,
    iconWrap: "bg-[#F3EEFF] text-brand-600",
  },
  {
    number: "02",
    title: "Mission",
    accent: "Mission",
    description:
      "To solve real-world problems with secure, scalable, and performance-driven software that helps businesses move faster with confidence.",
    icon: Target,
    iconWrap: "bg-[#FCE7F0] text-[#E81E62]",
  },
] as const;

export function AboutPurpose() {
  return (
    <Section
      aria-labelledby="about-purpose-heading"
      className="relative bg-white"
    >
      <Container>
        <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[#E81E62]"
              />
              Our Purpose
            </p>
            <h2
              id="about-purpose-heading"
              className="mt-3 font-display text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.035em] text-brand-900 sm:mt-4"
            >
              Experienced Developers Creating{" "}
              <span className="text-[#E81E62]">
                World-Class Software Solutions
              </span>
              .
            </h2>
          </div>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base lg:pb-1 lg:text-[1.05rem]">
            We are a dependable software partner for teams that need more than
            delivery — they need a studio that stays accountable from first
            sketch to production scale.
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 sm:gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:mt-16 lg:gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.number}
                className="relative overflow-hidden rounded-[1.25rem] border border-[#E6E8EF] bg-[#FAFBFC] p-6 shadow-[0_18px_44px_-28px_rgba(26,16,48,0.22)] sm:rounded-[1.35rem] sm:p-8 lg:p-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 font-display text-[3.75rem] font-extrabold leading-none tracking-[-0.06em] text-[#151C4B]/[0.14] sm:right-7 sm:top-5 sm:text-[5.5rem]"
                >
                  {item.number}
                </span>

                <span
                  className={`relative inline-flex size-12 items-center justify-center rounded-2xl sm:size-14 ${item.iconWrap}`}
                >
                  <Icon className="size-6 sm:size-7" strokeWidth={1.6} />
                </span>

                <h3 className="relative mt-5 font-display text-xl font-bold tracking-[-0.03em] text-brand-900 sm:mt-7 sm:text-2xl">
                  Our <span className="text-[#E81E62]">{item.accent}</span>
                </h3>
                <p className="relative mt-2.5 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
