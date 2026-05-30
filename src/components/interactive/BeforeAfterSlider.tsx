"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type BeforeAfterSliderProps = {
  original: string;
  refined: string;
  alt: string;
  aspectRatio?: string;
};

export function BeforeAfterSlider({
  original,
  refined,
  alt,
  aspectRatio = "16/9",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const onEnd = () => setIsDragging(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden border border-border/20 bg-background-soft select-none"
      style={{ aspectRatio }}
    >
      {/* Layer 1: Original — 全宽底层 */}
      <Image
        src={original}
        alt={`${alt} - Original`}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        className="object-cover"
        draggable={false}
      />

      {/* Layer 2: Refined — 叠加层，通过 clip-path 从左侧裁剪 */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={refined}
          alt={`${alt} - Refined`}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* 角标 */}
      {!isDragging && (
        <>
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-background/85 backdrop-blur-sm border border-border/30 pointer-events-none">
            <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted/70 font-medium">
              Original
            </span>
          </div>
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-background/85 backdrop-blur-sm border border-border/30 pointer-events-none">
            <span className="text-caption uppercase tracking-[0.08em] text-foreground-muted/70 font-medium">
              Refined
            </span>
          </div>
        </>
      )}

      {/* 分割线 + 手柄 */}
      <motion.div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        animate={{ left: `${position}%` }}
        transition={{
          duration: isDragging ? 0 : 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {/* 竖线 */}
        <div className="absolute top-0 bottom-0 w-px -translate-x-1/2 bg-white/80 shadow-[0_0_6px_rgba(0,0,0,0.08)]" />

        {/* 手柄 */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize pointer-events-auto"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
        >
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-primary/60 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.08, borderColor: "rgba(37,99,235,0.9)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary/70"
            >
              <path d="M8 3l-5 5 5 5" />
              <path d="M16 21l5-5-5-5" />
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
