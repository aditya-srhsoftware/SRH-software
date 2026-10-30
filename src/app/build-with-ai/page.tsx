import type { Metadata } from "next";
import { BuildWithAiLanding } from "@/components/build-with-ai/build-with-ai-landing";
import { buildWithAiMeta } from "@/content/build-with-ai";

export const metadata: Metadata = {
  title: buildWithAiMeta.title,
  description: buildWithAiMeta.description,
};

export default function BuildWithAiPage() {
  return <BuildWithAiLanding />;
}
