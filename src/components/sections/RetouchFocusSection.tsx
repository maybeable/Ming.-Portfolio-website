type RetouchFocusItem = {
  title: string;
  description: string;
};

type RetouchFocusSectionProps = {
  items: RetouchFocusItem[];
};

export function RetouchFocusSection({ items }: RetouchFocusSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-border/30">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="bg-white p-8 md:p-12 lg:p-16"
        >
          {/* 编号 */}
          <span className="block text-[clamp(2.5rem,1.5rem+4vw,5rem)] leading-none font-bold text-border/50 select-none tabular-nums">
            {(index + 1).toString().padStart(2, "0")}
          </span>

          {/* 标题 */}
          <h3 className="text-h3 mt-6 mb-3">{item.title}</h3>

          {/* 描述 */}
          <p className="text-body text-foreground-muted leading-relaxed max-w-md">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
