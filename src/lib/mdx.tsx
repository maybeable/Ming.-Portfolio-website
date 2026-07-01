import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Category } from "@/lib/categories";
import { CATEGORIES } from "@/lib/categories";

const contentDir = path.join(process.cwd(), "content/works");

export interface ProjectFrontmatter {
  order?: number;
  title: string;
  category: string;
  year: string;
  cover: string;
  hero: string;
  description: string;
  colors?: { name: string; hex: string }[];
  colorPaletteDescription?: string;
  fonts?: { name: string; category: string }[];
  typographyDescription?: string;
  images: { src: string; alt: string; aspectRatio?: string }[];
  beforeAfter?: { original: string; refined: string; alt: string }[];
  retouchFocus?: { title: string; description: string }[];
  editingProcess?: { step: number; title: string; description: string }[];
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface CategoryWithCount {
  category: Category;
  count: number;
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function validateFrontmatter(data: Record<string, unknown>, slug: string): ProjectFrontmatter {
  const required = ["title", "category", "year", "cover", "hero", "description", "images"] as const
  const missing = required.filter((k) => !data[k])
  if (missing.length > 0) {
    throw new Error(`[${slug}] Missing required frontmatter fields: ${missing.join(", ")}`)
  }
  if (!Array.isArray(data.images)) {
    throw new Error(`[${slug}] "images" must be an array`)
  }
  return data as unknown as ProjectFrontmatter
}

export function getProject(slug: string): Project | null {
  const decoded = decodeURIComponent(slug)
  if (decoded.includes("..") || decoded.includes("/") || decoded.includes("\\")) {
    return null
  }
  const filePath = path.join(contentDir, `${decoded}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: validateFrontmatter(data as Record<string, unknown>, slug),
    content,
  };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => getProject(slug))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

export function getFeaturedByCategory(): { category: Category; project: Project }[] {
  const projects = getAllProjects();
  const result: { category: Category; project: Project }[] = [];

  for (const category of CATEGORIES) {
    const categoryProjects = projects.filter(
      (p) => p.frontmatter.category === category,
    );
    if (categoryProjects.length > 0) {
      result.push({ category, project: categoryProjects[0] });
    }
  }

  return result;
}

export function getCategoriesWithCount(): CategoryWithCount[] {
  const projects = getAllProjects();
  return CATEGORIES.map((category) => ({
    category,
    count: projects.filter((p) => p.frontmatter.category === category).length,
  }));
}

export async function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} />
    </div>
  );
}
