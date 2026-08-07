import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Sports Gyaan — Blog",
  description:
    "Running, cricket, badminton, football aur fitness ke baare mein practical guides — real coach ki tarah, bina bakwaas ke.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="relative overflow-hidden">
      <BackgroundEffects variant="conic-soft" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 md:px-6">
        <RevealOnScroll>
          <h1 className="text-center font-display text-4xl md:text-5xl">
            Sports Gyaan
          </h1>
          <p className="mx-auto mt-3 max-w-md text-center text-ink/70">
            Practical guides — jo actually kaam ki hai, jaise koi coach dost
            samjha raha ho.
          </p>
        </RevealOnScroll>

        <StaggerGroup className="mt-12 grid gap-5">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                data-cursor="Play →"
                className="group block rounded-card border border-tape bg-paper p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-orange/10 md:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-orange">
                  {post.category}
                </p>
                <h2 className="mt-2 font-display text-2xl normal-case tracking-normal">
                  {post.title}
                </h2>
                <p className="mt-2 text-ink/70">{post.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-orange opacity-0 transition-opacity group-hover:opacity-100">
                  Aur Dekho 👀
                </span>
              </Link>
            </StaggerItem>
          ))}

          {posts.length === 0 && (
            <p className="text-center text-ink/50">
              Abhi Match Baaki Hai 😄 — articles jaldi aa rahe hai.
            </p>
          )}
        </StaggerGroup>
      </div>
    </div>
  );
}
