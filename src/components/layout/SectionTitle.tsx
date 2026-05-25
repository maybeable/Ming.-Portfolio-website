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
    <div className={cn("mb-16 max-w-2xl", className)}>
      <span className="text-caption uppercase tracking-[0.08em] text-primary font-medium">
        {label}
      </span>
      <h2 className="text-h2 mt-3">{title}</h2>
      {description && (
        <p className="text-body-lg text-foreground-muted mt-4">{description}</p>
      )}
    </div>
  );
}
