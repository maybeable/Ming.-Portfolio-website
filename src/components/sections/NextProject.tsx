import Link from "next/link";
import { ArrowRight } from "lucide-react";

type NextProjectProps = {
  title: string;
  slug: string;
};

export function NextProject({ title, slug }: NextProjectProps) {
  return (
    <Link
      href={`/works/${slug}`}
      className="group flex items-center justify-between border-t border-border pt-12 hover:border-primary transition-colors duration-300"
    >
      <div>
        <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted">
          下一个项目
        </span>
        <p className="text-h3 mt-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </p>
      </div>
      <ArrowRight
        size={28}
        className="text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
      />
    </Link>
  );
}
