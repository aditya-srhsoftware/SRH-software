import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function BlogsPage() {
  return (
    <PageIntro
      title="Blogs"
      description="Notes on software delivery, product decisions, and the work behind reliable systems."
    />
  );
}
