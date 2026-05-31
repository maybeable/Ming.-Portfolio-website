"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Feedback {
  id: string;
  content: string;
  name: string | null;
  featured: boolean;
  created_at: string;
  author_reply: string | null;
  author_replied_at: string | null;
}

interface ThoughtListProps {
  featured: Feedback[];
  recent: Feedback[];
  isAdmin: boolean;
  adminKey: string;
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
  isAdmin,
  adminKey,
}: {
  message: Feedback;
  featured?: boolean;
  isAdmin: boolean;
  adminKey: string;
}) {
  const router = useRouter();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyStatus, setReplyStatus] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const [replyError, setReplyError] = useState("");

  const handleReplySubmit = useCallback(async () => {
    if (!replyContent.trim()) return;

    setReplyStatus("submitting");
    setReplyError("");

    try {
      const res = await fetch("/api/feedback/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: message.id,
          reply: replyContent.trim(),
          key: adminKey,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setReplyError(data.error || "出了点问题，请稍后再试。");
        setReplyStatus("error");
        return;
      }

      setReplyStatus("idle");
      setReplyContent("");
      setShowReplyForm(false);
      router.refresh();
    } catch {
      setReplyError("网络出了点问题，请稍后再试。");
      setReplyStatus("error");
    }
  }, [replyContent, message.id, adminKey, router]);

  return (
    <div
      className={cn(
        "group py-8 md:py-10 transition-colors duration-300",
        "border-b border-border/50 last:border-b-0",
        isFeatured &&
          "relative pl-6 md:pl-8 border-l-[3px] border-l-primary border-b-0 bg-background-soft/30 -mx-6 md:-mx-8 px-6 md:px-8 rounded-r-lg",
      )}
    >
      {/* 访客留言 */}
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

      {/* 作者回复 */}
      {message.author_reply && (
        <div className="mt-6 ml-0 md:ml-6 border-l-2 border-primary/15 pl-4 md:pl-6">
          <p className="text-caption uppercase tracking-[0.1em] text-primary/50 font-medium mb-2">
            作者回复
          </p>
          <p className="text-body text-foreground-muted leading-relaxed">
            {message.author_reply}
          </p>
          <p className="text-caption text-foreground-muted/35 mt-2">
            {message.author_replied_at
              ? relativeTime(message.author_replied_at)
              : ""}
          </p>
        </div>
      )}

      {/* 回复按钮（仅管理员可见，且尚未回复时） */}
      {isAdmin && !message.author_reply && (
        <div className="mt-5">
          <AnimatePresence mode="wait">
            {!showReplyForm ? (
              <motion.button
                key="trigger"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                type="button"
                onClick={() => setShowReplyForm(true)}
                className="text-caption font-medium text-primary/50 hover:text-primary transition-colors duration-200"
              >
                回复
              </motion.button>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className={cn(
                    "rounded-lg border transition-colors duration-300",
                    "bg-background-soft/40",
                    "focus-within:bg-white focus-within:border-primary/20",
                    replyStatus === "error"
                      ? "border-red-200"
                      : "border-border/50",
                  )}
                >
                  <textarea
                    value={replyContent}
                    onChange={(e) => {
                      setReplyContent(e.target.value);
                      if (replyStatus === "error") {
                        setReplyStatus("idle");
                        setReplyError("");
                      }
                    }}
                    placeholder="写下你的回复…"
                    rows={3}
                    maxLength={500}
                    disabled={replyStatus === "submitting"}
                    className={cn(
                      "w-full resize-none bg-transparent px-4 pt-3 pb-2",
                      "text-body-sm text-foreground placeholder:text-foreground-muted/40",
                      "outline-none",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                    )}
                  />
                  <div className="flex items-center justify-between px-4 pb-3">
                    <span className="text-caption text-foreground-muted/30">
                      {replyContent.length > 0
                        ? `${replyContent.length} / 500`
                        : ""}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowReplyForm(false);
                          setReplyContent("");
                          setReplyStatus("idle");
                          setReplyError("");
                        }}
                        disabled={replyStatus === "submitting"}
                        className="text-caption text-foreground-muted/40 hover:text-foreground-muted transition-colors duration-200"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={handleReplySubmit}
                        disabled={
                          !replyContent.trim() ||
                          replyStatus === "submitting"
                        }
                        className={cn(
                          "text-caption font-medium transition-all duration-200",
                          replyContent.trim() &&
                            replyStatus !== "submitting"
                            ? "text-primary hover:text-primary/80"
                            : "text-foreground-muted/25 cursor-not-allowed",
                        )}
                      >
                        {replyStatus === "submitting" ? (
                          <span className="inline-flex items-center gap-1">
                            <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            发送中
                          </span>
                        ) : (
                          "回复"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {replyStatus === "error" && replyError && (
                  <p className="text-caption text-red-500 mt-2">
                    {replyError}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export function ThoughtList({ featured, recent, isAdmin, adminKey }: ThoughtListProps) {
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
              <ThoughtCard
                key={msg.id}
                message={msg}
                featured
                isAdmin={isAdmin}
                adminKey={adminKey}
              />
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
            <ThoughtCard
              key={msg.id}
              message={msg}
              isAdmin={isAdmin}
              adminKey={adminKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
