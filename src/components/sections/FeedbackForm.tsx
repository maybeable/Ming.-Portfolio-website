"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function FeedbackForm({ isAdmin = false, adminKey = "" }: { isAdmin?: boolean; adminKey?: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(async () => {
    if (content.trim().length < 2) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          name: isAdmin ? "作者" : (name.trim() || null),
          key: isAdmin ? adminKey : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "出了点问题，请稍后再试。");
        setStatus("error");
        return;
      }

      setStatus("success");
      setContent("");
      setName("");
      router.refresh();
    } catch {
      setErrorMessage("网络出了点问题，请稍后再试。");
      setStatus("error");
    }
  }, [content, name, isAdmin, adminKey]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleRetry = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="py-16 md:py-24"
          >
            <p className="text-h3 font-medium text-foreground">
              谢谢你的想法。
            </p>
            <p className="text-body-lg text-foreground-muted mt-3">
              每一段留言都会让这里变得更好。
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-10 text-body-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
            >
              再写一条
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* 输入区域 */}
            <div
              className={cn(
                "relative rounded-xl border transition-colors duration-300",
                "bg-background-soft/50",
                "focus-within:bg-white focus-within:border-primary/30 focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.04)]",
                status === "error" && "border-red-200",
                status !== "error" && "border-border",
              )}
            >
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage("");
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder={isAdmin ? "以作者身份发布想法…" : "写下你的感受、想法，或任何想说的话…"}
                rows={5}
                maxLength={800}
                disabled={status === "submitting"}
                className={cn(
                  "w-full resize-none bg-transparent px-6 pt-6 pb-4",
                  "text-body-lg text-foreground placeholder:text-foreground-muted/40",
                  "outline-none",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              />

              {/* 底部栏：名字 + 提交 */}
              <div className="flex items-center justify-between gap-4 px-6 pb-4">
                {isAdmin ? (
                  <span className="flex-1 text-body-sm font-medium text-primary/60">
                    作者
                  </span>
                ) : (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="你的名字，或保持匿名"
                    maxLength={30}
                    disabled={status === "submitting"}
                    className={cn(
                      "flex-1 bg-transparent text-body-sm text-foreground-muted",
                      "placeholder:text-foreground-muted/30",
                      "outline-none",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                    )}
                  />
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={content.trim().length < 2 || status === "submitting"}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 text-body-sm font-medium transition-all duration-200",
                    content.trim().length >= 2 && status !== "submitting"
                      ? "text-primary hover:text-primary/80"
                      : "text-foreground-muted/25 cursor-not-allowed",
                  )}
                >
                  {status === "submitting" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      发送中
                    </span>
                  ) : (
                    <>
                      留下想法
                      <span className="text-base leading-none">&rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 字数提示 & 快捷键提示 */}
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-caption text-foreground-muted/35">
                {content.length > 0
                  ? `${content.length} / 800`
                  : "⌘ + Enter 发送"}
              </p>
              {status === "error" && errorMessage && (
                <p className="text-caption text-red-500 flex items-center gap-2">
                  {errorMessage}
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="underline underline-offset-2 hover:text-red-600 transition-colors"
                  >
                    重试
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
