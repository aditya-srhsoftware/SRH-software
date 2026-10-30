import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

type PageIntroProps = {
  title: string;
  description: string;
};

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <Section clearHeader size="sm" className="pb-8 lg:pb-10">
      <Container>
        <h1 className="max-w-3xl font-serif text-[clamp(1.85rem,5vw,3rem)] font-bold leading-tight tracking-[-0.015em] text-foreground">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      </Container>
    </Section>
  );
}
