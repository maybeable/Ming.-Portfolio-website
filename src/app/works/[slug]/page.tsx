import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";
import { BackLink } from "@/components/layout/BackLink";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectOverview } from "@/components/sections/ProjectOverview";
import { TypographySection } from "@/components/sections/TypographySection";
import { ColorPaletteSection } from "@/components/sections/ColorPaletteSection";
import { RetouchFocusSection } from "@/components/sections/RetouchFocusSection";
import { EditingProcessSection } from "@/components/sections/EditingProcessSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { NextProject } from "@/components/sections/NextProject";
import { getProject, getAllProjects } from "@/lib/mdx";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { getProjectSlugs } = await import("@/lib/mdx");
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "未找到" };

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { frontmatter, content } = project;
  const allProjects = getAllProjects();
  const currentOrder = frontmatter.order ?? 99;
  const currentIndex = allProjects.findIndex(
    (p) => (p.frontmatter.order ?? 99) === currentOrder
  );
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  return (
    <>
      {/* Hero */}
      <ProjectHero
        title={frontmatter.title}
        category={frontmatter.category}
        year={frontmatter.year}
        heroSrc={frontmatter.hero}
        heroAlt={frontmatter.title}
      />

      {/* 项目概述 + 返回链接 */}
      <Section className="pt-16 md:pt-24">
        <Container size="narrow">
          <AnimatedContainer>
            <BackLink />
          </AnimatedContainer>
          <AnimatedContainer delay={0.1}>
            <div className="mt-12">
              <ProjectOverview
                category={frontmatter.category}
                year={frontmatter.year}
                description={frontmatter.description}
              />
            </div>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* 分隔线 */}
      <Section className="py-0">
        <Container>
          <AnimatedContainer>
            <hr className="border-border/40" />
          </AnimatedContainer>
        </Container>
      </Section>

      {/* 图片画廊 */}
      {frontmatter.images.length > 0 && (
        <Section className="pt-8 md:pt-14">
          <Container>
            <SectionTitle
              label="Gallery"
              title="视觉展示"
              description="从不同角度呈现设计的视觉语言与细节表达。"
            />
            <div className="md:max-w-3xl mx-auto">
              <ProjectGallery images={frontmatter.images} />
            </div>
          </Container>
        </Section>
      )}

      {/* Before / After 对比 */}
      {frontmatter.beforeAfter && frontmatter.beforeAfter.length > 0 && (
        <Section>
          <Container size="wide">
            <SectionTitle
              label="Before / After"
              title="修图对比"
              description="拖动滑块查看原始图像与精修效果之间的细节变化。"
            />
            <BeforeAfterSection images={frontmatter.beforeAfter} />
          </Container>
        </Section>
      )}

      {/* Retouch Focus — 修图焦点模块 */}
      {frontmatter.retouchFocus && frontmatter.retouchFocus.length > 0 && (
        <Section>
          <Container>
            <AnimatedContainer>
              <SectionTitle
                label="Retouch Focus"
                title="修图焦点"
                description="专业人像精修的核心维度，每一步都为呈现自然通透的视觉质感服务。"
              />
              <RetouchFocusSection items={frontmatter.retouchFocus} />
            </AnimatedContainer>
          </Container>
        </Section>
      )}

      {/* Editing Process — 修图流程模块 */}
      {frontmatter.editingProcess && frontmatter.editingProcess.length > 0 && (
        <Section>
          <Container size="wide">
            <AnimatedContainer>
              <SectionTitle
                label="Editing Process"
                title="修图流程"
                description="从原始分析到最终增强，四步标准化流程确保每张作品的品质一致性。"
              />
              <EditingProcessSection items={frontmatter.editingProcess} />
            </AnimatedContainer>
          </Container>
        </Section>
      )}

      {/* 字体展示 */}
      {frontmatter.fonts && frontmatter.fonts.length > 0 && (
        <Section>
          <Container size="narrow">
            <AnimatedContainer>
              <SectionTitle
                label="Typography"
                title="字体系统"
                description="字体选择是品牌表达的核心，传达正确的语调与个性。"
              />
              <TypographySection fonts={frontmatter.fonts} />
            </AnimatedContainer>
          </Container>
        </Section>
      )}

      {/* 色彩方案 */}
      {frontmatter.colors && frontmatter.colors.length > 0 && (
        <Section>
          <Container>
            <AnimatedContainer>
              <SectionTitle
                label="Color Palette"
                title="色彩方案"
                description="色彩系统构建视觉层级，传递品牌情感与专业度。"
              />
              <ColorPaletteSection colors={frontmatter.colors} />
            </AnimatedContainer>
          </Container>
        </Section>
      )}

      {/* 设计过程 */}
      {content.trim().length > 0 && (
        <Section>
          <Container>
            <AnimatedContainer>
              <SectionTitle
                label="Process"
                title="设计过程"
                description="从概念到成品，每一步都为最终视觉语言服务。"
              />
              <ProcessSection content={content} />
            </AnimatedContainer>
          </Container>
        </Section>
      )}

      {/* 底部导航 */}
      <Section className="pb-16 md:pb-24">
        <Container size="narrow">
          <AnimatedContainer>
            <NextProject
              order={nextProject.frontmatter.order}
              title={nextProject.frontmatter.title}
              slug={nextProject.slug}
            />
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
