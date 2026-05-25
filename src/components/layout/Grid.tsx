import { cn } from "@/lib/utils";

type GridProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
  className?: string;
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

const colClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-4 sm:grid-cols-6 lg:grid-cols-12",
};

export function Grid({
  children,
  cols = 3,
  gap = "md",
  className,
}: GridProps) {
  return (
    <div
      className={cn("grid", colClasses[cols], gapClasses[gap], className)}
    >
      {children}
    </div>
  );
}
