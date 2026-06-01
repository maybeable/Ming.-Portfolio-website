import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { Grid } from "@/components/layout/Grid";
import { AnimatedContainer } from "@/components/layout/AnimatedContainer";

const philosophies = [
  {
    id: "01",
    title: "功能决定形式",
    description:
      "设计不是为了装饰，而是为了解决问题。每一个视觉决策都始于对功能和用户的深入理解。",
  },
  {
    id: "02",
    title: "少即是多",
    description:
      "剔除一切不必要的元素，只保留最本质的表达。留白不是空无，而是给内容呼吸的空间。",
  },
  {
    id: "03",
    title: "细节见真章",
    description:
      "字距、行高、对齐、节奏——这些微小的决定累积起来，构成了设计的品质与气质。",
  },
];

const directions = [
  {
    title: "品牌识别设计",
    description:
      "从标志到视觉系统，构建统一而有力的品牌语言，让品牌在每一个触点都保持清晰与一致。",
  },
  {
    title: "编辑与排版设计",
    description:
      "探索文字排版的无限可能，将复杂信息转化为清晰、优雅的阅读体验。",
  },
  {
    title: "海报与印刷设计",
    description:
      "在有限的画面中创造张力，用色彩、构图与材质传递信息与情绪。",
  },
  {
    title: "数字产品设计",
    description:
      "将平面设计的原则带入数字界面，创造既美观又易用的交互体验。",
  },
];

const creativeProcess = [
  {
    id: "01",
    title: "Research",
    description: "收集资料与视觉参考。",
  },
  {
    id: "02",
    title: "Concept",
    description: "建立核心概念与设计方向。",
  },
  {
    id: "03",
    title: "Design",
    description: "完成视觉探索与方案执行。",
  },
  {
    id: "04",
    title: "Refine",
    description: "优化细节并形成最终成果。",
  },
];

const tools = [
  {
    category: "设计工具",
    items: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
  },
  {
    category: "开发工具",
    items: ["VS Code", "Git", "Next.js", "TailwindCSS", "Framer Motion"],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ==================== 1. About Hero ==================== */}
      <Section className="pt-40 pb-24 md:pt-56 md:pb-36">
        <Container size="narrow">
          <AnimatedContainer>
            <p className="text-caption uppercase tracking-[0.08em] text-primary font-medium">
              About
            </p>
            <h1 className="text-display mt-4 max-w-3xl">
              设计，不止于好看
            </h1>
            <p className="text-body-lg text-foreground-muted mt-8 max-w-xl leading-relaxed">
              我相信设计是一种解决问题的工具。好的设计不只是视觉上的愉悦，
              更是功能与美学的精确平衡——它让信息更清晰，让沟通更有效，
              让品牌更有力。
            </p>
          </AnimatedContainer>
        </Container>
      </Section>

      {/* ==================== 2. Personal Philosophy ==================== */}
      <Section className="bg-background-soft">
        <Container size="narrow">
          <AnimatedContainer>
            <SectionTitle
              label="Philosophy"
              title="设计理念"
              description="三条原则指导着我的每一次设计决策。"
            />
          </AnimatedContainer>

          <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-12">
            {philosophies.map((item, i) => (
              <AnimatedContainer key={item.id} delay={i * 0.1}>
                <span className="text-[clamp(3rem,2rem+5vw,6rem)] font-bold leading-none tracking-tighter text-primary/15">
                  {item.id}
                </span>
                <h3 className="text-h3 mt-4">{item.title}</h3>
                <p className="text-body text-foreground-muted mt-3 leading-relaxed">
                  {item.description}
                </p>
              </AnimatedContainer>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==================== 3. Design Direction ==================== */}
      <Section>
        <Container size="narrow">
          <AnimatedContainer>
            <SectionTitle
              label="Direction"
              title="设计方向"
            />
          </AnimatedContainer>

          <Grid cols={2} gap="lg">
            {directions.map((d, i) => (
              <AnimatedContainer key={d.title} delay={i * 0.1}>
                <div className="border-t border-border pt-8">
                  <h3 className="text-h4">{d.title}</h3>
                  <p className="text-body text-foreground-muted mt-3 leading-relaxed max-w-md">
                    {d.description}
                  </p>
                </div>
              </AnimatedContainer>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ==================== 4. Creative Process ==================== */}
      <Section className="bg-background-soft">
        <Container size="narrow">
          <AnimatedContainer>
            <SectionTitle
              label="Creative Process"
              title="创作方式"
            />
          </AnimatedContainer>

          <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
            {creativeProcess.map((item, i) => (
              <AnimatedContainer key={item.id} delay={i * 0.1}>
                <span className="text-[clamp(3rem,2rem+5vw,6rem)] font-bold leading-none tracking-tighter text-primary/15">
                  {item.id}
                </span>
                <h3 className="text-h3 mt-4">{item.title}</h3>
                <p className="text-body text-foreground-muted mt-3 leading-relaxed">
                  {item.description}
                </p>
              </AnimatedContainer>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==================== 5. Tools & Skills ==================== */}
      <Section>
        <Container size="narrow">
          <AnimatedContainer>
            <SectionTitle
              label="Capabilities"
              title="工具与技能"
            />
          </AnimatedContainer>

          <Grid cols={2} gap="lg">
            {tools.map((group, i) => (
              <AnimatedContainer key={group.category} delay={i * 0.1}>
                <div>
                  <h4 className="text-h4 mb-4">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-body-sm text-foreground-muted px-4 py-2 bg-background-soft border border-border rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedContainer>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ==================== 6. Contact CTA ==================== */}
      <Section className="bg-background-soft">
        <Container size="narrow">
          <AnimatedContainer>
            <div className="text-center py-12 md:py-20">
              <h2 className="text-h2 md:text-h1 max-w-2xl mx-auto">
                开始一个项目？
              </h2>
              <p className="text-body-lg text-foreground-muted mt-6 max-w-md mx-auto">
                无论是一个品牌项目、一张海报，还是一个完整的视觉系统——
                我期待与你合作。
              </p>
              <div className="mt-10">
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center justify-center h-12 px-8 text-body-lg rounded-xl font-medium bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
                >
                  取得联系
                </a>
              </div>
            </div>
          </AnimatedContainer>
        </Container>
      </Section>
    </>
  );
}
