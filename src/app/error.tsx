"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="pt-44 md:pt-60">
      <Container size="narrow">
        <p className="text-caption uppercase tracking-[0.12em] text-primary/70 font-medium">
          Error
        </p>
        <h1 className="text-display mt-6 max-w-2xl leading-[1.08]">
          出了点
          <br />
          问题
        </h1>
        <p className="text-body-lg text-foreground-muted/70 mt-10 max-w-lg leading-relaxed">
          页面加载时出现了意外错误，请稍后再试。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
        >
          重试
          <span aria-hidden>&rarr;</span>
        </button>
      </Container>
    </Section>
  );
}
