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
  heroSrc,
  heroAlt,
}: ProjectHeroProps) {
  return (
    <section className="relative w-full">
      {/* 大图 */}
      <div className="relative w-full h-[70vh] min-h-[480px] max-h-[800px] overflow-hidden">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* 标题叠加 */}
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative -mt-24 bg-background rounded-card px-10 py-10 shadow-sm border border-border"
        >
          <div className="flex items-center gap-4 text-caption uppercase tracking-[0.08em] text-foreground-muted mb-4">
            <span className="text-primary font-medium">{category}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{year}</span>
          </div>
          <h1 className="text-h1">{title}</h1>
        </motion.div>
      </div>
    </section>
  );
}
