import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  coverSrc: string;
  coverAlt: string;
  href?: string;
  index?: number;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  category,
  coverSrc,
  coverAlt,
  href,
  index,
  priority = false,
  className,
}: ProjectCardProps) {
  const content = (
    <div
      className={cn(
        "group relative flex flex-col",
        className,
      )}
    >
      {/* 序号标记 */}
      {index !== undefined && (
        <span className="text-caption text-foreground-muted/40 font-medium tabular-nums mb-3 block">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      )}

      {/* 封面图 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background-soft border border-border/40 transition-colors duration-500 ease-out group-hover:border-border">
        <Image
          src={coverSrc}
          alt={coverAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]"
          priority={priority}
        />
      </div>

      {/* 信息区 */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-caption uppercase tracking-[0.06em] text-foreground-muted/60 font-medium">
            {category}
          </span>
          <h3 className="text-h4 text-foreground transition-colors duration-300 group-hover:text-primary/80">
            {title}
          </h3>
        </div>
        {/* 箭头 */}
        <span className="mt-1.5 text-foreground-muted/0 transition-all duration-500 ease-out group-hover:text-foreground-muted/40 text-lg leading-none select-none">
          &nearr;
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        {content}
      </Link>
    );
  }

  return content;
}
