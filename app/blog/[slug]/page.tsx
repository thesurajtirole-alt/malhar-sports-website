import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getAllBlogSlugs,
  getBlogPostSource,
  extractFAQs,
} from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { getFAQSchema } from "@/lib/schema";
import { business } from "@/lib/business";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostSource(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostSource(slug);
  if (!post) notFound();

  const faqs = extractFAQs(post.content);
  const faqSchema = faqs.length > 0 ? getFAQSchema(faqs) : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name },
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <nav className="text-sm text-ink/50">
        <Link href="/blog" className="hover:text-orange">
          Sports Gyaan
        </Link>
        {" / "}
        <span>{post.frontmatter.category}</span>
      </nav>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange">
        {post.frontmatter.category}
      </p>
      <h1 className="mt-2 font-display text-3xl leading-tight md:text-5xl">
        {post.frontmatter.title}
      </h1>
      {post.frontmatter.readingMinutes && (
        <p className="mt-3 text-sm text-ink/50">
          {post.frontmatter.readingMinutes} min read
        </p>
      )}

      <article className="mt-8">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      <div className="mt-12 rounded-card bg-ink p-8 text-center text-white">
        <p className="font-display text-2xl normal-case tracking-normal">
          Confuse Ho? Pucho Na 😄
        </p>
        <p className="mt-2 text-white/70">
          Store pe aao ya WhatsApp pe pucho — sahi advice free hai.
        </p>
        <a
          href={business.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-pill bg-turf px-6 py-3 text-sm font-semibold text-white"
        >
          WhatsApp Karo
        </a>
      </div>
    </div>
  );
}
