import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function HomeContact() {
  return (
    <Section
      aria-labelledby="home-contact-heading"
      className="relative bg-white"
    >
      <Container>
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <div className="order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-magenta-500 sm:text-sm">
              Get in touch
            </p>
            <h2
              id="home-contact-heading"
              className="mt-3 max-w-xl font-display text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-foreground"
            >
              Tell us what you want to{" "}
              <span className="text-[#E81E62]">build</span>
            </h2>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
              Share a short brief — product idea, rebuild, or support need. We
              will reply with the next practical step.
            </p>
            <ul className="mt-6 hidden space-y-3 text-sm text-muted-foreground sm:mt-8 sm:block">
              <li className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#E81E62]"
                />
                Typical reply within one business day
              </li>
              <li className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#E81E62]"
                />
                No spam — just a clear next step
              </li>
              <li className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#E81E62]"
                />
                Web, mobile, AI, and cloud projects welcome
              </li>
            </ul>
          </div>

          <div className="order-2 rounded-[1.25rem] border border-[#E6E8EF] bg-[#FAFBFC] p-5 shadow-[0_20px_48px_-28px_rgba(26,16,48,0.2)] sm:rounded-[1.35rem] sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
