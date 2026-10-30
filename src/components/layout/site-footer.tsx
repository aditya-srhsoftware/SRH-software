import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { Container } from "@/components/layout/container";
import {
  footerCompanyLinks,
  footerServiceLinks,
  footerSocialLinks,
} from "@/config/footer";
import { siteConfig } from "@/config/site";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <span>{children}</span>
        {external ? (
          <ArrowUpRight
            aria-hidden
            className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
          />
        ) : null}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
      />

      <Container className="pt-16 lg:pt-20">
        {/* Top CTA band */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-10 sm:gap-6 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-16">
          <div className="max-w-xl">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
              Start a project
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.6rem,6.5vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              Let’s build something reliable together.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">
              {siteConfig.description}
            </p>
          </div>

          <Link
            href={siteConfig.cta.href}
            className="group inline-flex h-12 w-full shrink-0 touch-manipulation items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-navy transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            {siteConfig.cta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_repeat(3,minmax(0,1fr))] lg:gap-12 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label={siteConfig.name}
              className="inline-flex w-fit items-center rounded-xl bg-white px-3 py-2 transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src={logo}
                alt={siteConfig.name}
                width={140}
                height={45}
                className="h-8 w-auto"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Custom software, SaaS products, and AI-powered platforms for teams
              that need clarity, speed, and lasting quality.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {footerSocialLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-white/15 px-3.5 text-xs font-medium text-white/70 transition-colors duration-200 hover:border-white/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Company">
            {footerCompanyLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {footerServiceLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/services">All services</FooterLink>
          </FooterColumn>

          <FooterColumn title="Connect">
            <FooterLink href="/contact">Contact us</FooterLink>
            <FooterLink href="/portfolio">View portfolio</FooterLink>
            <FooterLink href="/blogs">Insights & blog</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-8">
          <p className="text-sm text-white/45">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-white/35">
            Web · Mobile · AI · Cloud
          </p>
        </div>
      </Container>
    </footer>
  );
}
