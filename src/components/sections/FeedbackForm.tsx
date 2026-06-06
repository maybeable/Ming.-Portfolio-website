"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type VerifyPhase = "idle" | "verifying";

export function FeedbackForm({
  isAdmin = false,
  adminKey = "",
}: {
  isAdmin?: boolean;
  adminKey?: string;
}) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifyPhase, setVerifyPhase] = useState<VerifyPhase>("idle");
  const turnstileTokenRef = useRef<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submitForm = useCallback(
    async (token: string | null) => {
      setStatus("submitting");
      setErrorMessage("");
      setVerifyPhase("idle");

      try {
        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: content.trim(),
            name: isAdmin ? "作者" : name.trim() || null,
            key: isAdmin ? adminKey : null,
            turnstileToken: isAdmin ? null : token,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMessage(data.error || "出了点问题，请稍后再试。");
          setStatus("error");
          if (res.status === 403) {
            turnstileTokenRef.current = null;
          }
          return;
        }

        setStatus("success");
        setContent("");
        setName("");
        turnstileTokenRef.current = null;
        router.refresh();
      } catch {
        setErrorMessage("网络出了点问题，请稍后再试。");
        setStatus("error");
      }
    },
    [content, name, isAdmin, adminKey]
  );

  const handleClickSubmit = useCallback(() => {
    if (content.trim().length < 2) return;

    if (isAdmin) {
      submitForm(null);
      return;
    }

    // Trigger Turnstile challenge
    setVerifyPhase("verifying");
    setErrorMessage("");
  }, [content, isAdmin, submitForm]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleClickSubmit();
      }
    },
    [handleClickSubmit]
  );

  const handleRetry = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
    setVerifyPhase("idle");
    turnstileTokenRef.current = null;
  }, []);

  const canClick =
    content.trim().length >= 2 && status !== "submitting" && verifyPhase !== "verifying";

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
                status !== "error" && "border-border"
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
                placeholder={
                  isAdmin
                    ? "以作者身份发布想法…"
                    : "写下你的感受、想法，或任何想说的话…"
                }
                rows={5}
                maxLength={800}
                disabled={status === "submitting"}
                className={cn(
                  "w-full resize-none bg-transparent px-6 pt-6 pb-4",
                  "text-body-lg text-foreground placeholder:text-foreground-muted/40",
                  "outline-none",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              />

              {/* 底部栏：名字 + 提交 */}
              <div className="flex items-center justify-between gap-4 px-6 pb-4 flex-wrap">
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
                      "outline-none min-w-0",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  />
                )}
                <button
                  type="button"
                  onClick={handleClickSubmit}
                  disabled={!canClick}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 text-body-sm font-medium transition-all duration-200",
                    canClick
                      ? "text-primary hover:text-primary/80"
                      : "text-foreground-muted/25 cursor-not-allowed"
                  )}
                >
                  {status === "submitting" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      发送中
                    </span>
                  ) : verifyPhase === "verifying" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      验证中
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

            {/* Turnstile — 仅在点击「留下想法」后显示 */}
            {!isAdmin && verifyPhase === "verifying" && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex justify-end"
              >
                <Turnstile
                  siteKey={
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                    "1x00000000000000000000AA"
                  }
                  onSuccess={(token) => {
                    turnstileTokenRef.current = token;
                    submitForm(token);
                  }}
                  onError={() => {
                    setVerifyPhase("idle");
                    turnstileTokenRef.current = null;
                    setErrorMessage("人机验证加载失败，请刷新页面后重试。");
                    setStatus("error");
                  }}
                  onExpire={() => {
                    setVerifyPhase("idle");
                    turnstileTokenRef.current = null;
                  }}
                  options={{
                    theme: "auto",
                    language: "zh-cn",
                  }}
                />
              </motion.div>
            )}

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
