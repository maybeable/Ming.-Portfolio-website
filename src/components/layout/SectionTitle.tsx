import { cn } from "@/lib/utils";

type SectionTitleProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionTitle({
  label,
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      {/* 标签行 + 装饰线 */}
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-5 h-px bg-primary/50" />
        <span className="text-caption uppercase tracking-[0.1em] text-primary/70 font-medium">
          {label}
        </span>
      </div>

      <h2 className="text-h2 md:text-h1 max-w-2xl">{title}</h2>

      {description && (
        <p className="text-body-lg text-foreground-muted mt-4 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
