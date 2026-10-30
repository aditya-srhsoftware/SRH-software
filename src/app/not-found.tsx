import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function NotFound() {
  return (
    <Section clearHeader size="md">
      <Container className="ds-stack-tight">
        <h1 className="font-serif text-[clamp(1.85rem,5vw,3rem)] font-bold leading-tight tracking-[-0.015em]">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          The page you requested does not exist.
        </p>
        <Link
          href="/"
          className="w-fit text-sm font-medium text-violet underline underline-offset-4"
        >
          Back home
        </Link>
      </Container>
    </Section>
  );
}
