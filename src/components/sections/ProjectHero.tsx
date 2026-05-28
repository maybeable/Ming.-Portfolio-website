"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ProjectHeroProps = {
  title: string;
  category: string;
  year: string;
  heroSrc: string;
  heroAlt: string;
};

export function ProjectHero({
  title,
  category,
  year,
  heroAlt,
  heroSrc,
}: ProjectHeroProps) {
  return (
    <section className="relative w-full">
      {/* 大图区域 */}
      <div className="relative w-full h-[55vh] min-h-[400px] max-h-[720px] overflow-hidden">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* 极淡叠加层 — 仅用于保证文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
      </div>

      {/* 标题卡片 — 上浮叠加 */}
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative -mt-20 md:-mt-28 bg-background px-8 py-8 md:px-12 md:py-10 border border-border/50"
        >
          {/* 顶部装饰线 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-6 h-px bg-primary/60" />
            <span className="text-caption uppercase tracking-[0.1em] text-foreground-muted/60 font-medium">
              {category}
            </span>
            <span className="text-caption text-foreground-muted/30">&middot;</span>
            <span className="text-caption text-foreground-muted/60">{year}</span>
          </div>

          <h1 className="text-h1 md:text-display max-w-4xl">{title}</h1>
        </motion.div>
      </div>
    </section>
  );
}
