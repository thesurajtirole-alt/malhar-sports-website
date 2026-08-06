import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  category: string;
  date: string;
  readingMinutes?: number;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return getAllBlogSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(
        path.join(BLOG_DIR, `${slug}.mdx`),
        "utf-8"
      );
      const { data } = matter(raw);
      return { slug, ...(data as BlogFrontmatter) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostSource(slug: string): {
  content: string;
  frontmatter: BlogFrontmatter;
} | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, frontmatter: data as BlogFrontmatter };
}

export function extractFAQs(
  content: string
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const regex = /\*\*Q: (.+?)\*\*\n(.+?)(?=\n\*\*Q:|\n##|$)/gs;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }
  return faqs;
}
