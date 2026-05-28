type ProjectOverviewProps = {
  category: string;
  year: string;
  description: string;
};

export function ProjectOverview({
  category,
  year,
  description,
}: ProjectOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-20">
      {/* 元数据 */}
      <aside className="space-y-8 lg:pt-1">
        <div>
          <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted/50 font-medium">
            Category
          </span>
          <p className="text-body text-foreground mt-1.5 font-medium">{category}</p>
        </div>
        <div>
          <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted/50 font-medium">
            Year
          </span>
          <p className="text-body text-foreground mt-1.5 font-medium">{year}</p>
        </div>
      </aside>

      {/* 描述 */}
      <div>
        <p className="text-body-lg text-foreground-muted leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}
