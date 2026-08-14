import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Star } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-ink text-paper">
      <BackgroundEffects variant="aurora-soft" />
      <div className="relative">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="inline-block rounded-2xl bg-white p-2">
            <Image
              src="/logo.png"
              alt="Malhar Sports and Shoes"
              width={56}
              height={56}
              className="h-14 w-14"
            />
          </div>
          <p className="mt-3 max-w-xs text-sm text-paper/70">
            Indore ka sports adda — jaha sirf saman nahi milta, sahi salaah
            bhi milti hai.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-sm text-paper/80">
            <Star className="h-4 w-4 fill-orange text-orange" />
            <span className="font-semibold">{business.rating.value}</span>
            <span className="text-paper/60">
              ({business.rating.count} Google reviews)
            </span>
          </div>
          {business.social.instagram && (
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-paper/80 hover:text-orange"
            >
              <InstagramIcon className="h-4 w-4" />
              @malhar_sports_and_shoes_
            </a>
          )}
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper/50">
            Dukaan Tak Aao
          </p>
          <a
            href={business.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-sm text-paper/80 hover:text-orange"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{business.address.full}</span>
          </a>
          <div className="mt-3 flex items-center gap-2 text-sm text-paper/80">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{business.hours.display}</span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper/50">
            Baat Karo
          </p>
          <a
            href={business.telLink}
            className="flex items-center gap-2 text-sm text-paper/80 hover:text-orange"
          >
            <Phone className="h-4 w-4" />
            {business.phone}
          </a>
          <a
            href={business.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-pill bg-turf px-4 py-2 text-sm font-semibold text-white"
          >
            WhatsApp Karo
          </a>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-paper/50">
            Explore Karo
          </p>
          <ul className="space-y-2 text-sm text-paper/80">
            <li>
              <Link href="/sports-hub" className="hover:text-orange">
                Sports Hub
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-orange">
                Sports Gyaan (Blog)
              </Link>
            </li>
            <li>
              <Link href="/indore/academies" className="hover:text-orange">
                Indore Sports Academies
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange">
                Hamari Kahani
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-paper/50 md:px-6">
        © {new Date().getFullYear()} Malhar Sports and Shoes, Indore. Sab
        rights reserved. Made with ❤️ for Indore.
        {" · "}
        <Link href="/privacy" className="hover:text-orange">
          Privacy Policy
        </Link>
        {" · "}
        <Link href="/terms" className="hover:text-orange">
          Terms
        </Link>
      </div>
      </div>
    </footer>
  );
}
