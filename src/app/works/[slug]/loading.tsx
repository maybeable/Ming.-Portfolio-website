import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function ProjectLoading() {
  return (
    <>
      <Section className="pt-44 md:pt-60 pb-0">
        <Container size="narrow">
          <div className="animate-pulse">
            <div className="h-4 w-20 bg-border/60 rounded" />
            <div className="h-12 w-2/3 bg-border/40 rounded mt-6" />
            <div className="h-96 bg-border/20 rounded-xl mt-12" />
          </div>
        </Container>
      </Section>
      <Section>
        <Container size="narrow">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-1/4 bg-border/60 rounded" />
            <div className="h-4 w-3/4 bg-border/40 rounded" />
            <div className="h-4 w-2/3 bg-border/40 rounded" />
          </div>
        </Container>
      </Section>
    </>
  );
}
