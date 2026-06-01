import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <Link
      href="/works"
      className="inline-flex items-center gap-2 text-body-sm text-foreground-muted hover:text-foreground transition-colors duration-200 py-2"
    >
      <ArrowLeft size={16} />
      返回作品列表
    </Link>
  );
}
