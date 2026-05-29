import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";
import { FeedbackForm } from "@/components/sections/FeedbackForm";
import { ThoughtList } from "@/components/sections/ThoughtList";

export const metadata: Metadata = {
  title: "联系",
  description: "留下你的想法——每个声音都让这里变得更好。",
};

interface Feedback {
  id: string;
  content: string;
  name: string | null;
  featured: boolean;
  createdAt: string;
}

async function getFeedback() {
  try {
    const dataPath = path.join(process.cwd(), "data", "feedback.json");
    const raw = await readFile(dataPath, "utf-8");
    const items: Feedback[] = JSON.parse(raw);

    const featured = items
      .filter((item) => item.featured)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    const recent = items
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 20);

    return { featured, recent };
  } catch {
    return { featured: [], recent: [] };
  }
}

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default async function ContactPage() {
  const { featured, recent } = await getFeedback();

  return (
    <>
      {/* ==================== Hero ==================== */}
      <Section className="pt-40 pb-12 md:pt-56 md:pb-16">
        <Container size="narrow">
          <AnimatedContainer>
            <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium">
              Context
            </p>
            <h1 className="text-display mt-4 max-w-3xl">
              留下你的想法
            </h1>
            <p className="text-body-lg text-foreground-muted mt-8 max-w-xl leading-relaxed">
              浏览完作品后，如果你有任何感受、想法或反馈——
              无论是一个灵感、一个问题，还是一句简单的问候，
              都可以留在这里。匿名也可以。
            </p>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Feedback Form ==================== */}
      <Section className="pt-0 pb-12 md:pb-16">
        <Container size="narrow">
          <AnimatedContainer delay={0.1}>
            <FeedbackForm />
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Recent Thoughts ==================== */}
      <Section className="pt-0 pb-16 md:pb-24">
        <Container size="narrow">
          <AnimatedContainer delay={0.15}>
            <ThoughtList featured={featured} recent={recent} />
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Contact Info ==================== */}
      <Section className="pt-0 pb-24 md:pb-32">
        <Container size="narrow">
          <AnimatedContainer delay={0.2}>
            <div className="border-t border-border pt-16 md:pt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* Email */}
                <div>
                  <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium mb-6">
                    Email
                  </p>
                  <a
                    href="mailto:xiaomingmin8848@gmail.com"
                    className="group inline-block"
                  >
                    <p className="text-h4 font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                      xiaomingmin8848@gmail.com
                    </p>
                  </a>
                </div>

                {/* Social */}
                <div>
                  <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium mb-6">
                    Social
                  </p>
                  <ul className="space-y-4">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-body-lg text-foreground-muted hover:text-foreground transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
