import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";
import { FeedbackForm } from "@/components/sections/FeedbackForm";
import { ThoughtList } from "@/components/sections/ThoughtList";
import { supabase } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "联系",
  description: "直接联系我——合作、设计需求，或只是聊聊。",
};

interface Feedback {
  id: string;
  content: string;
  name: string | null;
  featured: boolean;
  created_at: string;
}

async function getFeedback() {
  try {
    const { data: items } = await supabase
      .from("feedback")
      .select()
      .order("created_at", { ascending: false });

    if (!items) return { featured: [], recent: [] };

    const featured = (items as Feedback[])
      .filter((item) => item.featured)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

    const recent = (items as Feedback[])
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 20);

    return { featured, recent };
  } catch {
    return { featured: [], recent: [] };
  }
}

export default async function ContactPage() {
  const { featured, recent } = await getFeedback();

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
            {/* Phone */}
            <div className="mb-16 md:mb-20">
              <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium mb-4">
                Phone
              </p>
              <a
                href="tel:+8615970032990"
                className="group inline-block"
              >
                <p className="text-h2 font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  +86 159-7003-2990
                </p>
              </a>
            </div>

            {/* Email — main CTA */}
            <div className="mb-12 md:mb-16">
              <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium mb-4">
                Email
              </p>
              <a
                href="mailto:xiaomingmin8848@gmail.com"
                className="group inline-block"
              >
                <p className="text-h1 font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  xiaomingmin8848@gmail.com
                </p>
              </a>
            </div>

            {/* Supporting text */}
            <p className="text-body-lg text-foreground-muted/50 max-w-lg leading-relaxed">
              期待你的来信。或直接在下方留下你的想法，匿名也可以。
            </p>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Feedback ==================== */}
      <Section className="pt-0 pb-16 md:pb-24">
        <Container size="narrow">
          <AnimatedContainer delay={0.2}>
            <div className="border-t border-border pt-16 md:pt-20">
              <p className="text-caption uppercase tracking-[0.08em] text-primary/60 font-medium mb-8">
                Leave a Thought
              </p>
              <FeedbackForm />
            </div>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Recent Thoughts ==================== */}
      <Section className="pt-0 pb-24 md:pb-32">
        <Container size="narrow">
          <AnimatedContainer delay={0.25}>
            <ThoughtList featured={featured} recent={recent} />
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
