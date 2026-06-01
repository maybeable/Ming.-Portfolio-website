"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [
  { href: "/", label: "首页" },
  { href: "/works", label: "作品" },
  { href: "/about", label: "关于" },
  { href: "/thoughts", label: "想法" },
  { href: "/contact", label: "联系" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 pt-safe",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="container-base flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground shrink-0"
        >
          Portfolio
        </Link>

        {/* Desktop — centered links */}
        <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-body font-medium transition-colors duration-200 rounded-lg",
                    isActive
                      ? "text-primary"
                      : "text-foreground-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <MobileMenu />
      </nav>
    </header>
  );
}
