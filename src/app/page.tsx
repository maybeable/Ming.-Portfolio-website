import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { ProjectCard } from "@/components/cards/ProjectCard";

const projects = [
  {
    title: "品牌视觉识别系统",
    category: "品牌设计",
    coverSrc: "https://picsum.photos/seed/design1/800/600",
    coverAlt: "品牌视觉识别系统封面",
  },
  {
    title: "2026 春季展览海报",
    category: "海报设计",
    coverSrc: "https://picsum.photos/seed/design2/800/600",
    coverAlt: "春季展览海报封面",
  },
  {
    title: "极简杂志编排设计",
    category: "编辑设计",
    coverSrc: "https://picsum.photos/seed/design3/800/600",
    coverAlt: "杂志编排设计封面",
  },
];

export default function Home() {
  return (
    <>
      <Section>
        <Container size="narrow">
          <h1 className="text-display">创造有意义的设计</h1>
          <p className="text-body-lg text-foreground-muted mt-6 max-w-xl">
            专注平面设计与视觉传达，探索形式与功能的平衡。
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols={3}>
            {projects.map((project) => (
              <ProjectCard
                key={project.coverSrc}
                title={project.title}
                category={project.category}
                coverSrc={project.coverSrc}
                coverAlt={project.coverAlt}
              />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
