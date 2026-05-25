import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide";
  className?: string;
};

export function Container({
  children,
  size = "default",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        {
          "container-base": size === "default",
          "container-narrow": size === "narrow",
          "container-wide": size === "wide",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
