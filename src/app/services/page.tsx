import type { Metadata } from "next";
import Link from "next/link";
import { ServiceIconTile } from "@/components/icons/service-icons";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Section } from "@/components/layout/section";
import { serviceCategories } from "@/config/services";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <div>
      <PageIntro
        title="Services"
        description="From app and web development to software platforms and UI/UX design, every service we offer is listed clearly below."
      />

      <Section size="sm" className="pt-0">
        <Container className="ds-stack-loose">
          {serviceCategories.map((category) => (
            <section key={category.id} aria-labelledby={category.id}>
              <div className="max-w-3xl">
                <h2
                  id={category.id}
                  className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl"
                >
                  {category.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {category.description}
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {category.services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/30 hover:shadow-[0_24px_50px_-32px_rgba(67,1,178,0.55)] sm:p-6"
                    >
                      <ServiceIconTile name={service.icon} />
                      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        {service.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </Section>
    </div>
  );
}
