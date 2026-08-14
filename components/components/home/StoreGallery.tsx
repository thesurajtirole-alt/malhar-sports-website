import Image from "next/image";
import Link from "next/link";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

const photos = [
  {
    src: "/store-photos/interior-counter.jpg",
    alt: "Malhar Sports store interior — counter and shelves",
  },
  {
    src: "/store-photos/shoes-wall.jpg",
    alt: "Wall of sports shoes and cricket balls at Malhar Sports",
  },
  {
    src: "/store-photos/apparel-wall.jpg",
    alt: "Sportswear and jerseys display at Malhar Sports",
  },
];

export function StoreGallery() {
  return (
    <section className="relative overflow-hidden py-16">
      <BackgroundEffects variant="conic-soft" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <RevealOnScroll>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange">
                Andar Se Ek Jhalak
              </p>
              <h2 className="mt-1 font-display text-3xl md:text-4xl">
                Dukaan Andar Se Kaisi Hai
              </h2>
            </div>
            <Link
              href="/store"
              data-cursor="Explore →"
              className="hidden text-sm font-semibold text-orange hover:underline sm:block"
            >
              Poora Address Dekho →
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerGroup className="grid gap-4 sm:grid-cols-3">
          {photos.map((photo) => (
            <StaggerItem key={photo.src}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-card">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Link
          href="/store"
          className="mt-6 block text-center text-sm font-semibold text-orange hover:underline sm:hidden"
        >
          Poora Address Dekho →
        </Link>
      </div>
    </section>
  );
}
