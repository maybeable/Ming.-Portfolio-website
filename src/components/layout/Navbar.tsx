"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "首页" },
  { href: "/works", label: "作品" },
  { href: "/about", label: "关于" },
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
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="container-base flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Portfolio
        </Link>

        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-body-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
