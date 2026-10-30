import {
  ArrowUpRight,
  Layers2,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";

const reasons: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Layers2,
    title: "Built as complete products",
    description:
      "From discovery to launch, we design, engineer, and ship web, mobile, and AI systems that work together—not disconnected deliverables.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable engineering standards",
    description:
      "Clean architecture, careful testing, and maintainable codebases so your product stays stable as it grows and your team scales.",
  },
  {
    icon: MessageSquareQuote,
    title: "Clear partnership",
    description:
      "Straightforward communication, visible progress, and decisions you can follow. You always know what we are building and why.",
  },
  {
    icon: Sparkles,
    title: "Modern by default",
    description:
      "We apply current platforms, thoughtful UX, and practical AI where it creates real leverage—never novelty for its own sake.",
  },
];

export function WhySrh() {
  return (
    <Section
      aria-labelledby="why-srh-heading"
      className="relative overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-magenta-50 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <header className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-magenta-500">
              Why {siteConfig.name}
            </p>
            <h2
              id="why-srh-heading"
              className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground"
            >
              A partner for software that has to{" "}
              <span className="text-[#E81E62]">work in the real world</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem] sm:leading-[1.7]">
              Teams choose {siteConfig.name} when they need more than a vendor.
              We combine product thinking, disciplined engineering, and a
              collaborative process so your digital products ship with clarity
              and lasting quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                Start a project
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                About us
              </ButtonLink>
            </div>
          </header>

          <ul className="m-0 grid list-none gap-px overflow-hidden rounded-3xl border border-border bg-border p-0 shadow-[0_20px_50px_-28px_rgba(26,16,48,0.2)] sm:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <li
                  key={reason.title}
                  className="flex flex-col gap-4 bg-white p-6 transition-colors duration-300 hover:bg-brand-50/40 sm:p-7"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
