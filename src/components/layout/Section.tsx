import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article" | "aside";
};

export function Section({
  children,
  className,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "py-section-desktop max-sm:py-section-mobile",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
