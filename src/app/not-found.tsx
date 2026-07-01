import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Section className="pt-44 md:pt-60">
      <Container size="narrow">
        <p className="text-caption uppercase tracking-[0.12em] text-primary/70 font-medium">
          404
        </p>
        <h1 className="text-display mt-6 max-w-2xl leading-[1.08]">
          页面
          <br />
          不存在
        </h1>
        <p className="text-body-lg text-foreground-muted/70 mt-10 max-w-lg leading-relaxed">
          你访问的页面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
        >
          返回首页
          <span aria-hidden>&rarr;</span>
        </Link>
      </Container>
    </Section>
  );
}
