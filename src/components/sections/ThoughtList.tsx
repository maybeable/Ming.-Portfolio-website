"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Feedback } from "@/types/feedback";

interface ThoughtListProps {
  featured: Feedback[];
  recent: Feedback[];
  isAdmin: boolean;
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
}: {
  message: Feedback;
  featured?: boolean;
  isAdmin: boolean;
}) {
  const router = useRouter();

  // ─── 回复状态 ───
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyStatus, setReplyStatus] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const [replyError, setReplyError] = useState("");

  // ─── 管理操作状态 ───
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPermanentDeleteConfirm, setShowPermanentDeleteConfirm] =
    useState(false);
  const [adminActionLoading, setAdminActionLoading] = useState<
    "delete" | "restore" | "permanent-delete" | "pin" | "unpin" | null
  >(null);

  const isDeleted = message.deleted;

  // ─── 回复 ───
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
      toast.success("回复已发送。");
      router.refresh();
    } catch {
      setReplyError("网络出了点问题，请稍后再试。");
      setReplyStatus("error");
    }
  }, [replyContent, message.id, router]);

  // ─── 软删除 ───
  const handleDelete = useCallback(async () => {
    setAdminActionLoading("delete");
    try {
      const res = await fetch("/api/feedback/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: message.id,
          action: "delete",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("留言已从前台隐藏。");
      setShowDeleteConfirm(false);
      router.refresh();
    } catch {
      toast.error("操作失败，请稍后再试。");
    } finally {
      setAdminActionLoading(null);
    }
  }, [message.id, router]);

  // ─── 恢复 ───
  const handleRestore = useCallback(async () => {
    setAdminActionLoading("restore");
    try {
      const res = await fetch("/api/feedback/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: message.id,
          action: "restore",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("留言已恢复。");
      router.refresh();
    } catch {
      toast.error("操作失败，请稍后再试。");
    } finally {
      setAdminActionLoading(null);
    }
  }, [message.id, router]);

  // ─── 永久删除 ───
  const handlePermanentDelete = useCallback(async () => {
    setAdminActionLoading("permanent-delete");
    try {
      const res = await fetch("/api/feedback/manage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: message.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("留言已永久删除。");
      router.refresh();
    } catch {
      toast.error("操作失败，请稍后再试。");
    } finally {
      setAdminActionLoading(null);
    }
  }, [message.id, router]);
  const handlePin = useCallback(async () => {
    setAdminActionLoading("pin");
    try {
      const res = await fetch("/api/feedback/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: message.id,
          action: "pin",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("已置顶。");
      router.refresh();
    } catch {
      toast.error("操作失败，请稍后再试。");
    } finally {
      setAdminActionLoading(null);
    }
  }, [message.id, router]);

  // ─── 取消置顶 ───
  const handleUnpin = useCallback(async () => {
    setAdminActionLoading("unpin");
    try {
      const res = await fetch("/api/feedback/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: message.id,
          action: "unpin",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("已取消置顶。");
      router.refresh();
    } catch {
      toast.error("操作失败，请稍后再试。");
    } finally {
      setAdminActionLoading(null);
    }
  }, [message.id, router]);

  const isPinned = message.is_pinned && !isDeleted;

  return (
    <div
      className={cn(
        "group py-8 md:py-10 transition-all duration-300",
        "border-b border-border/50 last:border-b-0",
        isFeatured &&
          !isDeleted &&
          "relative pl-6 md:pl-8 border-l-[3px] border-l-primary border-b-0 bg-background-soft/30 -mx-6 md:-mx-8 px-6 md:px-8 rounded-r-lg",
        isDeleted &&
          "opacity-60 hover:opacity-75",
        isPinned &&
          !isFeatured &&
          "relative pl-6 md:pl-8 border-l-[3px] border-l-primary/60 border-b-0 bg-primary/[0.02] -mx-6 md:-mx-8 px-6 md:px-8 rounded-r-lg",
      )}
    >
      {/* ─── 置顶标识 ─── */}
      {isPinned && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1.5 text-caption font-medium text-primary/70 bg-primary/5 border border-primary/10 rounded-full px-2.5 py-0.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-primary/60">
              <path d="M2.5 7.5L1 11L4.5 9.5L2.5 7.5Z" fill="currentColor" />
              <path d="M4.5 1L2 5.5L6 7L8 2.5L4.5 1Z" fill="currentColor" fillOpacity="0.6" />
              <path d="M6 7V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            置顶
          </span>
        </div>
      )}

      {/* ─── 访客留言内容 ─── */}
      <p
        className={cn(
          "text-body-lg md:text-h4 leading-relaxed transition-colors duration-300",
          isDeleted
            ? "text-foreground-muted/35 line-through"
            : "text-foreground",
        )}
      >
        {message.content}
      </p>

      {/* ─── 已删除标注（仅管理员） ─── */}
      {isDeleted && isAdmin && (
        <div className="flex items-center gap-2 mt-3">
          <span className="inline-flex items-center gap-1 text-caption font-medium text-red-400/70">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
            已删除
          </span>
          {message.deleted_at && (
            <>
              <span className="w-0.5 h-0.5 rounded-full bg-foreground-muted/20" />
              <span className="text-caption text-foreground-muted/30">
                {relativeTime(message.deleted_at)}
              </span>
            </>
          )}
        </div>
      )}

      {/* ─── 元信息：名字 + 时间 ─── */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-body-sm font-medium text-foreground-muted">
          {message.name || "匿名"}
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="text-caption text-foreground-muted/50">
          {relativeTime(message.created_at)}
        </span>
      </div>

      {/* ─── 作者认证标签 ─── */}
      {message.is_author && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-1.5 text-caption font-medium text-primary/70 bg-primary/5 border border-primary/10 rounded-full px-2.5 py-0.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-primary/60">
              <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="currentColor" />
            </svg>
            站长
          </span>
        </div>
      )}

      {/* ─── 回复列表 ─── */}
      {message.replies && message.replies.length > 0 && (
        <div className="mt-6 ml-0 md:ml-6 border-l-2 border-primary/15 pl-4 md:pl-6 space-y-5">
          {message.replies.map((reply) => (
            <div key={reply.id}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-caption font-medium text-primary/60">
                  回复
                </span>
                {reply.is_author && (
                  <span className="inline-flex items-center gap-1 text-caption text-primary/60 bg-primary/5 border border-primary/10 rounded-full px-1.5 py-0.5">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-primary/50">
                      <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="currentColor" />
                    </svg>
                    站长
                  </span>
                )}
              </div>
              <p className="text-body text-foreground-muted leading-relaxed">
                {reply.content}
              </p>
              <p className="text-caption text-foreground-muted/35 mt-1.5">
                {relativeTime(reply.created_at)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ─── 兼容旧数据：author_reply 字段（迁移前已存在的回复） ─── */}
      {!message.replies?.length && message.author_reply && (
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

      {/* ─── 管理员操作区 ─── */}
      {isAdmin && (
        <div className="mt-5 flex items-center gap-4 flex-wrap">
          {/* 回复按钮（仅未删除时显示） */}
          {!isDeleted && (
            <AnimatePresence mode="wait">
              {!showReplyForm ? (
                <motion.button
                  key="reply-trigger"
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
                  key="reply-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
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
                            <span className="inline-flex items-center gap-1.5">
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
          )}

          {/* ─── 置顶 / 取消置顶按钮（仅未删除时显示） ─── */}
          {!isDeleted && (
            <>
              {message.is_pinned ? (
                <button
                  type="button"
                  onClick={handleUnpin}
                  disabled={adminActionLoading !== null}
                  className={cn(
                    "text-caption font-medium transition-colors duration-200",
                    adminActionLoading === "unpin"
                      ? "text-amber-300 cursor-not-allowed"
                      : "text-amber-500/70 hover:text-amber-600",
                  )}
                >
                  {adminActionLoading === "unpin" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 border-2 border-amber-300 border-t-amber-500 rounded-full animate-spin" />
                      处理中
                    </span>
                  ) : (
                    "取消置顶"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePin}
                  disabled={adminActionLoading !== null}
                  className={cn(
                    "text-caption font-medium transition-colors duration-200",
                    adminActionLoading === "pin"
                      ? "text-primary/30 cursor-not-allowed"
                      : "text-primary/50 hover:text-primary",
                  )}
                >
                  {adminActionLoading === "pin" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                      处理中
                    </span>
                  ) : (
                    "置顶"
                  )}
                </button>
              )}
            </>
          )}

          {/* ─── 删除按钮（仅未删除留言） ─── */}
          {!isDeleted && (
            <AnimatePresence mode="wait">
              {!showDeleteConfirm ? (
                <motion.button
                  key="del-trigger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-caption font-medium text-red-400/60 hover:text-red-500 transition-colors duration-200"
                >
                  删除
                </motion.button>
              ) : (
                <motion.div
                  key="del-confirm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
                >
                  <div className="rounded-lg border border-red-200/30 bg-red-50/20 px-4 py-3">
                    <p className="text-caption text-foreground-muted/70 mb-3">
                      确认删除该留言吗？留言将从前台隐藏，可后续恢复。
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={adminActionLoading === "delete"}
                        className="text-caption text-foreground-muted/40 hover:text-foreground-muted transition-colors duration-200"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={adminActionLoading === "delete"}
                        className={cn(
                          "text-caption font-medium transition-all duration-200",
                          adminActionLoading === "delete"
                            ? "text-red-300 cursor-not-allowed"
                            : "text-red-500 hover:text-red-600",
                        )}
                      >
                        {adminActionLoading === "delete" ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-3 h-3 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                            处理中
                          </span>
                        ) : (
                          "确认删除"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ─── 恢复按钮（仅已删除留言） ─── */}
          {isDeleted && (
            <button
              type="button"
              onClick={handleRestore}
              disabled={adminActionLoading !== null}
              className={cn(
                "text-caption font-medium transition-colors duration-200",
                adminActionLoading === "restore"
                  ? "text-emerald-300 cursor-not-allowed"
                  : "text-emerald-500/70 hover:text-emerald-600",
              )}
            >
              {adminActionLoading === "restore" ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 border-2 border-emerald-300 border-t-emerald-500 rounded-full animate-spin" />
                  恢复中
                </span>
              ) : (
                "恢复"
              )}
            </button>
          )}

          {/* ─── 永久删除按钮（仅已删除留言） ─── */}
          {isDeleted && (
            <AnimatePresence mode="wait">
              {!showPermanentDeleteConfirm ? (
                <motion.button
                  key="perm-del-trigger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="button"
                  onClick={() => setShowPermanentDeleteConfirm(true)}
                  className="text-caption font-medium text-red-400/50 hover:text-red-500 transition-colors duration-200"
                >
                  永久删除
                </motion.button>
              ) : (
                <motion.div
                  key="perm-del-confirm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full"
                >
                  <div className="rounded-lg border-2 border-red-300/40 bg-red-50/30 px-4 py-3">
                    <p className="text-caption text-red-600/80 font-medium mb-3">
                      此操作不可撤销，确定永久删除吗？
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowPermanentDeleteConfirm(false)}
                        disabled={adminActionLoading === "permanent-delete"}
                        className="text-caption text-foreground-muted/40 hover:text-foreground-muted transition-colors duration-200"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={handlePermanentDelete}
                        disabled={adminActionLoading === "permanent-delete"}
                        className={cn(
                          "text-caption font-medium transition-all duration-200",
                          adminActionLoading === "permanent-delete"
                            ? "text-red-300 cursor-not-allowed"
                            : "text-red-600 hover:text-red-700",
                        )}
                      >
                        {adminActionLoading === "permanent-delete" ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-3 h-3 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                            删除中
                          </span>
                        ) : (
                          "确认永久删除"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}

export function ThoughtList({
  featured,
  recent,
  isAdmin,
}: ThoughtListProps) {
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
