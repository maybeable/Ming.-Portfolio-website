type EditingProcessItem = {
  step: number;
  title: string;
  description: string;
};

type EditingProcessSectionProps = {
  items: EditingProcessItem[];
};

export function EditingProcessSection({ items }: EditingProcessSectionProps) {
  return (
    <div>
      {/* 桌面端：水平流程 */}
      <div className="hidden md:flex items-start">
        {items.map((item, index) => (
          <div key={item.step} className="flex items-start flex-1 min-w-0">
            {/* 单步内容 */}
            <div className="flex flex-col items-start flex-1">
              {/* 圆点 */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-white">
                <span className="text-caption font-bold text-primary tabular-nums">
                  {(item.step ?? index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              {/* 文字 */}
              <div className="mt-5">
                <h3 className="text-h4 mb-2">{item.title}</h3>
                <p className="text-body-sm text-foreground-muted leading-relaxed max-w-56">
                  {item.description}
                </p>
              </div>
            </div>

            {/* 连接线 */}
            {index < items.length - 1 && (
              <div className="flex-1 h-px bg-border/40 mt-5 -ml-2 mr-2" />
            )}
          </div>
        ))}
      </div>

      {/* 移动端：垂直流程 */}
      <div className="md:hidden space-y-0">
        {items.map((item, index) => (
          <div key={item.step} className="flex gap-4">
            {/* 左侧：圆点 + 竖线 */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-white">
                <span className="text-caption font-bold text-primary tabular-nums">
                  {(item.step ?? index + 1).toString().padStart(2, "0")}
                </span>
              </div>
              {index < items.length - 1 && (
                <div className="w-px flex-1 min-h-8 bg-border/40" />
              )}
            </div>

            {/* 右侧：文字 */}
            <div className="pb-10">
              <h3 className="text-h4 mb-2">{item.title}</h3>
              <p className="text-body-sm text-foreground-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
