import type { Metadata } from "next";
import { ContactLanding } from "@/components/contact/contact-landing";
import { contactMeta } from "@/content/contact";

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
};

export default function ContactPage() {
  return <ContactLanding />;
}
