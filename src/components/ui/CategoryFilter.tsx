"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/categories";
import type { CategoryWithCount } from "@/lib/mdx";

interface CategoryFilterProps {
  categoriesWithCount: CategoryWithCount[];
}

export function CategoryFilter({ categoriesWithCount }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? null;

  function handleFilter(category: Category | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    const query = params.toString();
    router.push(`/works${query ? `?${query}` : ""}`, { scroll: false });
  }

  const totalCount = categoriesWithCount.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterPill
        label="All"
        sublabel="全部"
        count={totalCount}
        isActive={activeCategory === null}
        onClick={() => handleFilter(null)}
      />
      {categoriesWithCount.map(({ category, count }) => (
        <FilterPill
          key={category}
          label={CATEGORY_LABELS[category].en}
          sublabel={CATEGORY_LABELS[category].zh}
          count={count}
          isActive={activeCategory === category}
          onClick={() => handleFilter(category)}
        />
      ))}
    </div>
  );
}

function FilterPill({
  label,
  sublabel,
  count,
  isActive,
  onClick,
}: {
  label: string;
  sublabel: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`
        relative inline-flex flex-col items-center px-4 py-2
        rounded-full border transition-colors duration-300 min-w-[4.5rem]
        ${
          isActive
            ? "bg-primary text-white border-primary"
            : count === 0
              ? "text-foreground-muted/25 border-transparent cursor-default"
              : "text-foreground-muted border-border/60 hover:border-primary/40 hover:text-foreground"
        }
      `}
      disabled={count === 0}
    >
      <span className="inline-flex items-center gap-2 text-caption uppercase tracking-[0.06em] font-medium">
        {label}
        <span
          className={`tabular-nums text-[0.65rem] tracking-normal ${
            isActive ? "text-white/70" : "text-foreground-muted/30"
          }`}
        >
          {String(count).padStart(2, "0")}
        </span>
      </span>
      <span
        className={`text-[0.65rem] leading-tight mt-0.5 ${
          isActive ? "text-white/60" : "text-foreground-muted/30"
        }`}
      >
        {sublabel}
      </span>
    </motion.button>
  );
}
