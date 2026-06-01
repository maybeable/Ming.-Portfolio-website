"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function FloatingBackLink() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/works");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-[88px] left-6 max-sm:top-20 max-sm:left-4 z-40
        flex items-center gap-2 px-4 py-2.5 rounded-full
        bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg
        border border-border/50 shadow-sm
        text-body-sm text-foreground-muted
        transition-all duration-300 ease-out
        hover:text-foreground hover:bg-white/90 dark:hover:bg-slate-900/90 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      aria-label="返回作品列表"
    >
      <ArrowLeft size={16} className="shrink-0" />
      <span className="hidden sm:inline">返回作品列表</span>
    </button>
  );
}
