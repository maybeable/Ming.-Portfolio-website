import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

const contentDir = path.join(process.cwd(), "content/works");

export interface ProjectFrontmatter {
  order?: number;
  title: string;
  category: string;
  year: string;
  cover: string;
  hero: string;
  description: string;
  colors: { name: string; hex: string }[];
  fonts: { name: string; category: string }[];
  images: { src: string; alt: string; aspectRatio?: string }[];
  beforeAfter?: { original: string; refined: string; alt: string }[];
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(contentDir, `${decodeURIComponent(slug)}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => getProject(slug))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}

export async function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} />
    </div>
  );
}
