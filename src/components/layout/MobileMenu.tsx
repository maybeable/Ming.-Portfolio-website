"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "首页" },
  { href: "/works", label: "作品" },
  { href: "/about", label: "关于" },
  { href: "/thoughts", label: "想法" },
  { href: "/contact", label: "联系" },
];

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 路由变化时关闭菜单
  useEffect(() => {
    close();
  }, [pathname, close]);

  // 锁定 body 滚动
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      {/* 三杠按钮 */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden relative z-50 p-2 -mr-2 text-foreground"
        aria-label="打开菜单"
      >
        <Menu size={24} />
      </button>

      {/* 蒙层 + 侧滑面板 — Portal 到 body 避免 header backdrop-filter 裁剪 */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* 蒙层 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-40 bg-black/40 md:hidden"
                  onClick={close}
                  aria-hidden="true"
                />

                {/* 面板 */}
                <motion.aside
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 260 }}
                  className="fixed top-0 right-0 bottom-0 z-50 w-2/4 max-w-sm bg-white/95 backdrop-blur-md md:hidden"
                >
                  {/* 关闭按钮 */}
                  <button
                    onClick={close}
                    className="absolute top-4 right-4 p-2 text-foreground-muted hover:text-foreground transition-colors"
                    aria-label="关闭菜单"
                  >
                    <X size={24} />
                  </button>

                  {/* 菜单项 */}
                  <nav className="h-full flex flex-col justify-center px-8">
                    <ul className="flex flex-col gap-1">
                      {links.map((link, i) => {
                        const isActive = pathname === link.href;
                        return (
                          <motion.li
                            key={link.href}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.06 * i }}
                          >
                            <Link
                              href={link.href}
                              onClick={close}
                              className={`
                                block py-4 text-xl font-medium transition-colors duration-200
                                border-b border-border/50
                                ${isActive ? "text-primary" : "text-foreground-muted hover:text-foreground"}
                              `}
                            >
                              {link.label}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
