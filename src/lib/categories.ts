export const CATEGORIES = [
  "Brand Identity",
  "Poster Design",
  "Portrait Retouching",
  "AI Visual Art",
  "Editorial Design",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isValidCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}

export function getCategoryLabel(category: Category): string {
  return category;
}

export const CATEGORY_LABELS: Record<Category, { en: string; zh: string }> = {
  "Brand Identity": { en: "Brand Identity", zh: "品牌识别" },
  "Poster Design": { en: "Poster Design", zh: "海报设计" },
  "Portrait Retouching": { en: "Portrait Retouching", zh: "人像修图" },
  "AI Visual Art": { en: "AI Visual Art", zh: "AI 视觉" },
  "Editorial Design": { en: "Editorial Design", zh: "编辑设计" },
};

export const CATEGORY_META: Record<Category, string> = {
  "Brand Identity": "Brand visual identity, logo design, and VI systems",
  "Poster Design": "Poster design, event promotion, and visual campaigns",
  "Portrait Retouching": "Portrait retouching, photo enhancement, and commercial post-production",
  "AI Visual Art": "AI-generated visuals, concept design, and creative experiments",
  "Editorial Design": "Magazine layouts, book design, and typographic systems",
};
