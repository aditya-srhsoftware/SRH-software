import type { Metadata } from "next";
import {
  Inter,
  Manrope,
  Merriweather,
  Plus_Jakarta_Sans,
  Poppins,
} from "next/font/google";
import { PublicChrome } from "@/components/providers/public-chrome";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable} ${plusJakarta.variable} ${manrope.variable} ${poppins.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-dvh flex-col overflow-x-clip bg-background font-sans text-foreground antialiased"
        suppressHydrationWarning
      >
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
