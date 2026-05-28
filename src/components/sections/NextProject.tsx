import Link from "next/link";
import { ArrowRight } from "lucide-react";

type NextProjectProps = {
  order?: number;
  title: string;
  slug: string;
};

export function NextProject({ order, title, slug }: NextProjectProps) {
  return (
    <Link
      href={`/works/${slug}`}
      className="group block border-t border-border/50 pt-12 md:pt-16 hover:border-primary/30 transition-colors duration-500"
    >
      <span className="text-caption uppercase tracking-[0.1em] text-foreground-muted/50 font-medium">
        Next Project
      </span>
      <div className="flex items-end justify-between mt-3">
        <div className="max-w-lg">
          {order && (
            <span className="block text-caption text-foreground-muted/40 font-mono mb-1">
              {String(order).padStart(2, "0")}
            </span>
          )}
          <p className="text-h3 md:text-h2 group-hover:text-primary/80 transition-colors duration-300">
            {title}
          </p>
        </div>
        <ArrowRight
          size={24}
          className="shrink-0 text-foreground-muted/30 group-hover:text-primary/60 group-hover:translate-x-1.5 transition-all duration-400 mb-1"
        />
      </div>
    </Link>
  );
}
