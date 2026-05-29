import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";

export const metadata: Metadata = {
  title: "联系",
  description: "直接联系我——合作、设计需求，或只是聊聊。",
};

export default function ContactPage() {

  return (
    <>
      {/* ==================== Hero ==================== */}
      <Section className="pt-40 pb-12 md:pt-56 md:pb-16">
        <Container size="narrow">
          <AnimatedContainer>
            <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium">
              Contact
            </p>
            <h1 className="text-display mt-4 max-w-3xl">
              联系我
            </h1>
            <p className="text-body-lg text-foreground-muted mt-8 max-w-xl leading-relaxed">
              如果你有合作想法、设计需求，或只是想聊聊——
              欢迎随时联系。
            </p>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Contact Info ==================== */}
      <Section className="pt-0 pb-16 md:pb-20">
        <Container size="narrow">
          <AnimatedContainer delay={0.1}>
            {/* Email — 视觉焦点 */}
            <div className="mb-24 md:mb-28">
              <p className="text-caption uppercase tracking-[0.08em] text-primary/40 font-medium mb-3">
                Email
              </p>
              <a
                href="mailto:xiaomingmin8848@gmail.com"
                className="group relative inline-block"
              >
                <span className="block text-[3rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-primary">
                  xiaomingmin8848
                  <wbr />
                  @gmail.com
                </span>
                <span className="absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-500 ease-out w-0 group-hover:w-full" />
              </a>
            </div>

            {/* Phone — 次要 */}
            <div className="mb-16 md:mb-20">
              <p className="text-caption uppercase tracking-[0.08em] text-primary/40 font-medium mb-3">
                Phone
              </p>
              <a
                href="tel:+8615970032990"
                className="group inline-block"
              >
                <p className="text-h4 font-medium text-foreground-muted/60 transition-colors duration-300 group-hover:text-primary">
                  +86 159-7003-2990
                </p>
              </a>
            </div>

            {/* Supporting text */}
            <p className="text-body-lg text-foreground-muted/60 max-w-lg leading-relaxed">
              期待你的来信。
              <br />
              也可以去{" "}
              <a
                href="/thoughts"
                className="text-primary hover:text-primary/80 underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60 transition-colors duration-200"
              >
                Thoughts
              </a>{" "}
              页面留下你的想法。
            </p>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
