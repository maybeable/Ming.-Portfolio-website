import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  coverSrc: string;
  coverAlt: string;
  href?: string;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  category,
  coverSrc,
  coverAlt,
  href,
  priority = false,
  className,
}: ProjectCardProps) {
  const content = (
    <div
      className={cn(
        "group relative flex flex-col",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-1",
        className,
      )}
    >
      {/* 封面图 */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-background-soft">
        <Image
          src={coverSrc}
          alt={coverAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          priority={priority}
        />
        {/* 悬停渐变叠加层 */}
        <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 ease-out group-hover:bg-primary/[0.03]" />
      </div>

      {/* 信息区 */}
      <div className="mt-5 flex flex-col gap-1.5 px-0.5">
        <span className="text-caption uppercase tracking-[0.04em] text-foreground-muted">
          {category}
        </span>
        <h3 className="text-h4 text-foreground transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block outline-none focus-visible:rounded-card">
        {content}
      </Link>
    );
  }

  return content;
}
