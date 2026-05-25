import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { BackLink } from "@/components/layout/BackLink";
import { getAllProjects } from "@/lib/mdx";

export const metadata = {
  title: "作品",
  description: "平面设计作品集",
};

export default function WorksPage() {
  const projects = getAllProjects();

  return (
    <>
      <Section>
        <Container size="narrow">
          <BackLink />
          <h1 className="text-display mt-8">作品</h1>
          <p className="text-body-lg text-foreground-muted mt-4 max-w-lg">
            精选设计项目，每个作品都是对形式与功能的探索。
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          {projects.length === 0 ? (
            <p className="text-body text-foreground-muted text-center py-24">
              暂无作品
            </p>
          ) : (
            <Grid cols={3}>
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.frontmatter.title}
                  category={project.frontmatter.category}
                  coverSrc={project.frontmatter.cover}
                  coverAlt={project.frontmatter.title}
                  href={`/works/${project.slug}`}
                />
              ))}
            </Grid>
          )}
        </Container>
      </Section>
    </>
  );
}
