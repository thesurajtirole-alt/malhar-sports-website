import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of use for the Malhar Sports and Shoes website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl md:text-5xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink/50">Last updated: August 2026</p>

      <div className="mt-8 space-y-8 text-ink/80">
        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            What this website is
          </h2>
          <p className="mt-2">
            This website is an informational and community platform for{" "}
            {business.name}, a physical sports retail store in Indore. It is
            not an e-commerce store — you cannot buy, order, or pay for
            products here. All purchases happen in person at our store.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Games, quizzes, and gamification
          </h2>
          <p className="mt-2">
            Points, badges, and streaks earned through the games on this site
            have no monetary value and cannot be redeemed for discounts or
            products unless we explicitly announce a promotion saying so.
            Daily content (challenges, facts, guess-the-player) rotates
            automatically and is provided for entertainment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Account security
          </h2>
          <p className="mt-2">
            Phone number + password login on this site does not use OTP
            verification. This means it is not appropriate for anything
            sensitive — treat it purely as a way to save your game progress,
            and don&apos;t reuse a password you use elsewhere. We&apos;re not
            liable for unauthorized access resulting from a guessed or
            reused password.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Calculators and health information
          </h2>
          <p className="mt-2">
            The BMI, running pace, and water intake calculators on this site
            provide general estimates only and are not medical advice.
            Consult a doctor or certified trainer for personalized health
            guidance.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Third-party information
          </h2>
          <p className="mt-2">
            The Indore Sports Directory (academies, grounds, clubs) is
            provided for informational purposes, compiled from publicly
            available sources. We don&apos;t guarantee the accuracy of
            third-party contact details, and recommend verifying directly
            with the listed organization before relying on this information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Changes
          </h2>
          <p className="mt-2">
            We may update these terms from time to time. Continued use of
            the site after changes means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Contact
          </h2>
          <p className="mt-2">
            Questions? Reach us at {business.phone} or visit us at{" "}
            {business.address.full}.
          </p>
        </section>
      </div>
    </div>
  );
}
