import { cn } from "@/lib/utils";

interface Feedback {
  id: string;
  content: string;
  name: string | null;
  featured: boolean;
  created_at: string;
}

interface ThoughtListProps {
  featured: Feedback[];
  recent: Feedback[];
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "刚刚";
  if (diffMin < 60) return `${diffMin} 分钟前`;
  if (diffHr < 24) return `${diffHr} 小时前`;
  if (diffDay < 7) return `${diffDay} 天前`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} 周前`;
  return `${Math.floor(diffDay / 30)} 个月前`;
}

function ThoughtCard({
  message,
  featured: isFeatured,
}: {
  message: Feedback;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "group py-8 md:py-10 transition-colors duration-300",
        "border-b border-border/50 last:border-b-0",
        isFeatured &&
          "relative pl-6 md:pl-8 border-l-[3px] border-l-primary border-b-0 bg-background-soft/30 -mx-6 md:-mx-8 px-6 md:px-8 rounded-r-lg",
      )}
    >
      <p className="text-body-lg md:text-h4 leading-relaxed text-foreground">
        {message.content}
      </p>
      <div className="flex items-center gap-3 mt-4">
        <span className="text-body-sm font-medium text-foreground-muted">
          {message.name || "匿名"}
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="text-caption text-foreground-muted/50">
          {relativeTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}

export function ThoughtList({ featured, recent }: ThoughtListProps) {
  const hasContent = featured.length > 0 || recent.length > 0;

  if (!hasContent) {
    return (
      <div className="py-20 text-center">
        <p className="text-body-lg text-foreground-muted/35">
          还没有留言，成为第一个留下想法的人。
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-12">
          <p className="text-caption uppercase tracking-[0.08em] text-primary/60 font-medium mb-6">
            Featured
          </p>
          <div>
            {featured.map((msg) => (
              <ThoughtCard key={msg.id} message={msg} featured />
            ))}
          </div>
        </div>
      )}

      {/* Recent */}
      <div>
        {featured.length > 0 && (
          <p className="text-caption uppercase tracking-[0.08em] text-primary/60 font-medium mb-6">
            Recent Thoughts
          </p>
        )}
        <div>
          {recent.map((msg) => (
            <ThoughtCard key={msg.id} message={msg} />
          ))}
        </div>
      </div>
    </div>
  );
}
