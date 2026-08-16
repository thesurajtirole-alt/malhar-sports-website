import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number | null;
  image_url: string | null;
}

async function getNewArrivals(): Promise<Product[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  const { data } = await supabase
    .from("products")
    .select("id, name, description, category, price, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);
  return data ?? [];
}

export async function NewArrivals() {
  const products = await getNewArrivals();
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
          {products.map((p) => (
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
                  {p.category && (
                    <p className="text-xs text-ink/50">{p.category}</p>
                  )}
                  {p.price && (
                    <p className="mt-1 text-sm font-semibold text-orange">
                      ₹{p.price}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
