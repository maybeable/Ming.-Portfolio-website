import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";

export const metadata: Metadata = {
  title: "联系",
  description: "开始对话——每个项目都从一次沟通开始。",
};

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      {/* ==================== 1. Hero ==================== */}
      <Section className="pt-40 pb-16 md:pt-56 md:pb-24">
        <Container size="narrow">
          <AnimatedContainer>
            <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium">
              Contact
            </p>
            <h1 className="text-display mt-4 max-w-3xl">
              开始对话
            </h1>
            <p className="text-body-lg text-foreground-muted mt-8 max-w-xl leading-relaxed">
              每个项目都从一次对话开始。无论是品牌识别、编辑排版，
              还是全新的视觉系统——写下你的想法，我们一起来实现。
            </p>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== 2. Email ==================== */}
      <Section>
        <Container size="narrow">
          <AnimatedContainer delay={0.15}>
            <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium mb-8">
              Email
            </p>
            <a
              href="mailto:xiaomingmin8848@gmail.com"
              className="group inline-block"
            >
              <h2 className="text-h2 md:text-h1 xl:text-display font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                xiaomingmin8848@gmail.com
              </h2>
            </a>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== 3. Social ==================== */}
      <Section>
        <Container size="narrow">
          <AnimatedContainer delay={0.3}>
            <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium mb-8">
              Social
            </p>
            <ul className="space-y-5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-h3 text-foreground-muted hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
