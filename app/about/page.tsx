import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Hamari Kahani — About Malhar Sports",
  description:
    "Malhar Sports and Shoes ki kahani — Indore ke sports lovers ke liye ek adda, sirf ek dukaan nahi.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <h1 className="text-center font-display text-4xl md:text-5xl">
        Hamari Kahani
      </h1>

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink/80">
        <p>
          Malhar Sports and Shoes Dravid Nagar, Indore mein hai — aur yaha
          sirf saman nahi milta, sahi salaah bhi milti hai.
        </p>
        <p>
          Chahe tu apna pehla cricket kit khareed raha ho, ya running shoes
          jo tere pronation ke hisaab se fit ho — hum samajhte hai ki sahi
          gear se farak padta hai. Isliye har customer se time lekar baat
          karte hai, sirf bechne ke liye nahi.
        </p>
        <p>
          {business.rating.count}+ Google reviews aur{" "}
          {business.rating.value}★ rating ke saath, Indore ke sports lovers
          ka trust humne saalon mein banaya hai — ek customer ek time pe.
        </p>
        <p>
          Ye website bhi isi soch ka extension hai — jaha aake tu sirf
          shopping nahi, kuch seekh bhi sake, khel bhi sake.
        </p>
      </div>

      <div className="mt-12 rounded-card bg-surface p-8 text-center">
        <p className="font-display text-xl normal-case tracking-normal">
          Mil Ke Baat Karte Hai
        </p>
        <p className="mt-2 text-ink/70">
          Store pe aao, ya WhatsApp pe seedha pucho.
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
