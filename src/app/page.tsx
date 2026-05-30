import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";
import { getFeaturedByCategory } from "@/lib/mdx";
import { CATEGORY_LABELS } from "@/lib/categories";

export default function Home() {
  const featured = getFeaturedByCategory();

  return (
    <>
      {/* ==================== Hero ==================== */}
      <Section className="pt-40 pb-20 md:pt-64 md:pb-32 relative overflow-hidden">
        {/* 装饰性几何元素 */}
        <div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] -translate-y-1/2 translate-x-1/4 rounded-full border border-border/30"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[28rem] h-[28rem] translate-y-1/3 -translate-x-1/4 rounded-full border border-border/20"
          aria-hidden="true"
        />

        <Container size="narrow">
          <AnimatedContainer>
            <p className="text-caption uppercase tracking-[0.1em] text-primary/70 font-medium mb-8">
              Portfolio &mdash; 2026
            </p>
            <h1 className="text-display max-w-4xl">
              创造有意义
              <br />
              <span className="text-primary">的设计</span>
            </h1>
            <p className="text-body-lg text-foreground-muted mt-8 max-w-lg leading-relaxed">
              专注平面设计与视觉传达，探索形式与功能的平衡。
              每一个项目都是对视觉语言的深度思考。
            </p>

            {/* 装饰性分隔 */}
            <div className="mt-16 flex items-center gap-6">
              <span className="block w-12 h-px bg-primary/40" />
              <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
                Selected Works
              </span>
            </div>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== Projects ==================== */}
      <Section className="pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {featured.map(({ category, project }, i) => (
              <AnimatedContainer key={category} delay={i * 0.12}>
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="text-caption uppercase tracking-[0.1em] text-primary/70 font-semibold">
                    {CATEGORY_LABELS[category].en}
                  </span>
                  <span className="text-caption text-foreground-muted/40 font-medium">
                    {CATEGORY_LABELS[category].zh}
                  </span>
                </div>
                <ProjectCard
                  title={project.frontmatter.title}
                  category={project.frontmatter.category}
                  coverSrc={project.frontmatter.cover}
                  coverAlt={project.frontmatter.title}
                  href={`/works/${project.slug}`}
                  index={i}
                />
              </AnimatedContainer>
            ))}
          </div>

          {/* 查看全部链接 */}
          <AnimatedContainer delay={0.3}>
            <div className="mt-16 text-center">
              <Link
                href="/works"
                className="inline-flex items-center gap-2 text-body font-medium text-foreground-muted hover:text-primary transition-colors duration-200"
              >
                查看全部作品
                <span className="text-lg leading-none">&rarr;</span>
              </Link>
            </div>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== CTA ==================== */}
      <Section>
        <Container size="narrow">
          <AnimatedContainer>
            <div className="border-t border-border pt-16 md:pt-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2 className="text-h2 md:text-h1 max-w-lg">
                  有项目要合作？
                </h2>
                <p className="text-body-lg text-foreground-muted mt-4 max-w-md">
                  无论品牌识别、编辑设计还是数字产品&mdash;&mdash;一起创造一些有意义的设计。
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-body-lg font-medium text-primary hover:text-primary/80 transition-colors duration-200 shrink-0"
              >
                取得联系
                <span className="text-xl leading-none">&rarr;</span>
              </Link>
            </div>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
