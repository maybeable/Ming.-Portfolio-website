type ProcessSectionProps = {
  content: string;
};

export function ProcessSection({ content }: ProcessSectionProps) {
  const paragraphs = content
    .split(/\n\n/)
    .filter((p) => p.trim().length > 0);

  return (
    <div className="space-y-12 md:space-y-16">
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16"
        >
          {/* 序号 */}
          <div className="lg:pt-1">
            <span className="text-[4rem] md:text-[5rem] leading-none font-bold text-border/60 select-none tabular-nums">
              {(index + 1).toString().padStart(2, "0")}
            </span>
          </div>

          {/* 正文 */}
          <div className="lg:border-l lg:border-border/30 lg:pl-16">
            <p className="text-body-lg text-foreground-muted leading-relaxed max-w-2xl">
              {paragraph.replace(/^##\s+.*\n?/, "").trim()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
