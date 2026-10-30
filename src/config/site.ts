import type { SiteConfig } from "@/types";
import { services } from "@/config/services";

export const siteConfig: SiteConfig = {
  name: "SRH Software",
  description:
    "Web, mobile, AI, and cloud software for teams that need reliable digital products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
      label: "Services",
      href: "/services",
      children: services.map(({ label, href }) => ({ label, href })),
    },
    { label: "Build with AI", href: "/build-with-ai" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Contact us", href: "/contact" },
};
