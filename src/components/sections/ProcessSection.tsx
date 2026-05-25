type ProcessSectionProps = {
  content: string;
};

export function ProcessSection({ content }: ProcessSectionProps) {
  const paragraphs = content
    .split(/\n\n/)
    .filter((p) => p.trim().length > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="relative pt-8 border-t border-border">
          <span className="text-[5rem] leading-none font-bold text-border absolute -top-6 right-0 select-none">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <p className="text-body text-foreground-muted leading-relaxed relative z-10 mt-4">
            {paragraph.replace(/^##\s+.*\n?/, "").trim()}
          </p>
        </div>
      ))}
    </div>
  );
}
