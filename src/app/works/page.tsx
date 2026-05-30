import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { BackLink } from "@/components/layout/BackLink";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import { getAllProjects, getCategoriesWithCount } from "@/lib/mdx";
import { isValidCategory } from "@/lib/categories";

export const metadata = {
  title: "作品",
  description: "平面设计作品集",
};

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const allProjects = getAllProjects();
  const categoriesWithCount = getCategoriesWithCount();
  const { category } = await searchParams;

  const filteredProjects = category && isValidCategory(category)
    ? allProjects.filter((p) => p.frontmatter.category === category)
    : allProjects;

  return (
    <>
      <Section className="pt-32 pb-16 md:pt-48 md:pb-24">
        <Container size="narrow">
          <AnimatedContainer>
            <BackLink />
          </AnimatedContainer>

          <AnimatedContainer delay={0.1}>
            <div className="mt-12 md:mt-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="block w-8 h-px bg-primary/50" />
                <span className="text-caption uppercase tracking-[0.1em] text-foreground-muted/60 font-medium">
                  {filteredProjects.length} Projects
                </span>
              </div>

              <h1 className="text-display max-w-3xl">
                作品
              </h1>
              <p className="text-body-lg text-foreground-muted mt-6 max-w-lg leading-relaxed">
                精选设计项目，每个作品都是对形式与功能的探索。
              </p>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <div className="mt-12">
              <Suspense
                fallback={
                  <div className="flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-9 w-24 rounded-full bg-background-soft animate-pulse"
                      />
                    ))}
                  </div>
                }
              >
                <CategoryFilter categoriesWithCount={categoriesWithCount} />
              </Suspense>
            </div>
          </AnimatedContainer>
        </Container>
      </Section>

      <Section className="pt-0 pb-24 md:pb-32">
        <Container>
          {filteredProjects.length === 0 ? (
            <AnimatedContainer>
              <div className="text-center py-32">
                <p className="text-h3 text-foreground-muted/30">暂无作品</p>
                <p className="text-body text-foreground-muted/40 mt-2">
                  该分类下的作品将陆续上线
                </p>
              </div>
            </AnimatedContainer>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20">
              {filteredProjects.map((project, i) => (
                <AnimatedContainer key={project.slug} delay={i * 0.08}>
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
          )}
        </Container>
      </Section>
    </>
  );
}
