import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
  secondary:
    "bg-foreground text-white hover:bg-foreground/85 active:bg-foreground/75",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-hover active:bg-hover/70",
  ghost:
    "bg-transparent text-foreground hover:bg-hover active:bg-hover/70",
  link: "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
} as const;

const sizes = {
  sm: "h-8 px-4 text-body-sm rounded-md gap-1.5",
  md: "h-10 px-6 text-body rounded-lg gap-2",
  lg: "h-12 px-8 text-body-lg rounded-xl gap-2.5",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-40",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
