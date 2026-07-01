"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AdminEntry() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const submit = useCallback(async () => {
    if (!key.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      router.refresh();
    } catch {
      setStatus("error");
    }
  }, [key, router]);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }, [router]);

  if (!show) {
    return (
      <button
        type="button"
        onClick={() => setShow(true)}
        className="text-caption text-foreground-muted/25 hover:text-foreground-muted/50 transition-colors duration-300"
      >
        Admin
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      <input
        type="password"
        value={key}
        onChange={(e) => {
          setKey(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder="密钥"
        className={cn(
          "w-48 bg-transparent border-b text-body-sm text-foreground-muted",
          "placeholder:text-foreground-muted/25 outline-none pb-1 transition-colors duration-200",
          status === "error"
            ? "border-red-300"
            : "border-border/50 focus:border-primary/40"
        )}
      />
      <button
        type="button"
        onClick={submit}
        disabled={!key.trim() || status === "loading"}
        className={cn(
          "text-caption font-medium transition-colors duration-200",
          key.trim() && status !== "loading"
            ? "text-primary/60 hover:text-primary"
            : "text-foreground-muted/25 cursor-not-allowed"
        )}
      >
        {status === "loading" ? "验证中" : "确认"}
      </button>
      <button
        type="button"
        onClick={() => {
          setShow(false);
          setKey("");
          setStatus("idle");
        }}
        className="text-caption text-foreground-muted/25 hover:text-foreground-muted/50 transition-colors duration-200"
      >
        取消
      </button>
      {status === "error" && (
        <span className="text-caption text-red-400/70">密钥错误</span>
      )}
    </motion.div>
  );
}
