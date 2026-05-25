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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
      {/* 元数据侧边栏 */}
      <aside className="lg:col-span-1 space-y-8">
        <div>
          <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
            类别
          </span>
          <p className="text-body text-foreground mt-1">{category}</p>
        </div>
        <div>
          <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
            年份
          </span>
          <p className="text-body text-foreground mt-1">{year}</p>
        </div>
      </aside>

      {/* 概述 */}
      <div className="lg:col-span-2">
        <p className="text-body-lg text-foreground-muted leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
