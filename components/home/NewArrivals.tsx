import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
}

async function getNewArrivals(): Promise<{
  products: Product[];
  categoryNameById: Map<string, string>;
}> {
  if (!isSupabaseConfigured() || !supabase) {
    return { products: [], categoryNameById: new Map() };
  }

  // Two plain queries instead of a relational embed (`categories(name)`)
  // — embeds depend on Supabase's API layer already recognizing the
  // foreign key, which can lag right after a migration adds one. Two
  // simple queries have no such dependency and fail loudly if something
  // really is wrong, instead of silently returning nothing.
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, description, price, image_url, category_id")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (productsError) {
    console.error("[NewArrivals] Failed to load products:", productsError.message);
    return { products: [], categoryNameById: new Map() };
  }

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name");

  if (categoriesError) {
    console.error("[NewArrivals] Failed to load categories:", categoriesError.message);
  }

  const categoryNameById = new Map(
    ((categories as Category[]) ?? []).map((c) => [c.id, c.name])
  );

  return { products: (products as Product[]) ?? [], categoryNameById };
}

export async function NewArrivals() {
  const { products, categoryNameById } = await getNewArrivals();
  if (products.length === 0) return null; // nothing to show, don't render an empty section

  return (
    <section className="relative overflow-hidden py-16">
      <BackgroundEffects variant="dots" grain={false} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <RevealOnScroll>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">
            Naya Kya Aaya
          </p>
          <h2 className="mt-1 font-display text-3xl md:text-4xl">
            New Arrivals
          </h2>
        </RevealOnScroll>

        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => {
            const categoryName = p.category_id
              ? categoryNameById.get(p.category_id)
              : null;
            return (
              <StaggerItem key={p.id}>
                <div className="overflow-hidden rounded-card border border-tape">
                  <div className="aspect-square bg-surface">
                    {p.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold">{p.name}</p>
                    {categoryName && (
                      <p className="text-xs text-ink/50">{categoryName}</p>
                    )}
                    {p.price && (
                      <p className="mt-1 text-sm font-semibold text-orange">
                        Starting from ₹{p.price}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
