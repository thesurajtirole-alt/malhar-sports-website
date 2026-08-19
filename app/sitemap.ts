import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { business } from "@/lib/business";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${business.siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${business.siteUrl}/sports-hub`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${business.siteUrl}/khelo`, changeFrequency: "daily", priority: 0.8 },
    { url: `${business.siteUrl}/khelo/sports-personality`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${business.siteUrl}/khelo/aaj-ka-challenge`, changeFrequency: "daily", priority: 0.6 },
    { url: `${business.siteUrl}/khelo/guess-the-player`, changeFrequency: "daily", priority: 0.6 },
    { url: `${business.siteUrl}/khelo/sports-fact`, changeFrequency: "daily", priority: 0.6 },
    { url: `${business.siteUrl}/khelo/calculators/bmi`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${business.siteUrl}/khelo/calculators/running`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${business.siteUrl}/khelo/calculators/water-intake`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${business.siteUrl}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${business.siteUrl}/indore/academies`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${business.siteUrl}/turfs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${business.siteUrl}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${business.siteUrl}/store`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${business.siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${business.siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${business.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let turfRoutes: MetadataRoute.Sitemap = [];
  if (isSupabaseConfigured() && supabase) {
    const { data } = await supabase
      .from("turfs")
      .select("id")
      .eq("is_active", true)
      .eq("is_approved", true);
    turfRoutes = (data ?? []).map((t) => ({
      url: `${business.siteUrl}/turfs/${t.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...blogRoutes, ...turfRoutes];
}
