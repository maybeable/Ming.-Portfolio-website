import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";
import { FeedbackForm } from "@/components/sections/FeedbackForm";
import { ThoughtList } from "@/components/sections/ThoughtList";
import { supabase } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "想法",
  description: "对作品与网站的简洁感受——留下你的想法。",
};

interface Feedback {
  id: string;
  content: string;
  name: string | null;
  featured: boolean;
  created_at: string;
  author_reply: string | null;
  author_replied_at: string | null;
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

export default async function ThoughtsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { featured, recent } = await getFeedback();
  const { key } = await searchParams;
  const isAdmin = !!(key && key === process.env.REPLY_SECRET);

  return (
    <>
      {/* ==================== Hero ==================== */}
      <Section className="pt-44 pb-0 md:pt-60 md:pb-0">
        <Container size="narrow">
          <AnimatedContainer>
            <p className="text-caption uppercase tracking-[0.12em] text-primary/70 font-medium">
              Thoughts
            </p>
            <h1 className="text-display mt-6 max-w-2xl leading-[1.08]">
              留下你的
              <br />
              想法
            </h1>
            <p className="text-body-lg text-foreground-muted/70 mt-10 max-w-lg leading-relaxed">
              对作品、对网站，或任何你想说的——
              <br />
              这里是访客的声音。
            </p>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Input ==================== */}
      <Section className="pt-24 pb-0 md:pt-32 md:pb-0">
        <Container size="narrow">
          <AnimatedContainer delay={0.15}>
            <div className="border-t border-border/50 pt-16 md:pt-20">
              <FeedbackForm />
            </div>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Thoughts ==================== */}
      <Section className="pt-24 pb-32 md:pt-32 md:pb-40">
        <Container size="narrow">
          <AnimatedContainer delay={0.2}>
            <ThoughtList featured={featured} recent={recent} isAdmin={isAdmin} adminKey={key || ""} />
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
