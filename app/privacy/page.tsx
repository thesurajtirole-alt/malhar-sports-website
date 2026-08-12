import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Malhar Sports and Shoes collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <h1 className="font-display text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink/50">Last updated: August 2026</p>

      <div className="mt-8 space-y-8 text-ink/80">
        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            What we collect
          </h2>
          <p className="mt-2">
            This website ({business.siteUrl}) collects the following
            information, and only when you choose to provide it:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <strong>If you sign in with Google:</strong> your name, email
              address, and profile photo, as provided by Google. We don&apos;t
              receive your Google password.
            </li>
            <li>
              <strong>If you sign up with phone + password:</strong> your
              phone number and a password. Your password is never stored in
              plain text — it&apos;s hashed (one-way encrypted) before being
              saved, so we cannot see or recover your actual password.
            </li>
            <li>
              <strong>Gamification data:</strong> quiz results, points,
              badges, and daily-challenge streaks. This is stored in your
              browser (localStorage) and, only if you&apos;re signed in, also
              synced to our server so it follows you across devices.
            </li>
            <li>
              <strong>Basic usage data</strong> via Google Analytics, if
              enabled — pages visited, approximate location (city-level),
              device type. This is aggregate and not tied to your name unless
              you&apos;re signed in.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            What we don&apos;t collect
          </h2>
          <p className="mt-2">
            We don&apos;t sell products through this website, so we never
            collect payment details, card numbers, or billing addresses here.
            We don&apos;t verify phone numbers via OTP — phone login is a
            lightweight password-based system intended only for saving your
            gamification progress, not for anything sensitive.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            How we use your data
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>To let you log in and keep your streak/points/badges saved across devices.</li>
            <li>To respond to enquiries you send us via WhatsApp, call, or the enquiry form.</li>
            <li>To understand which parts of the site are useful (via analytics), so we can improve it.</li>
          </ul>
          <p className="mt-2">
            We do not sell or rent your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Where your data is stored
          </h2>
          <p className="mt-2">
            Account and streak data is stored using Upstash (a Redis
            database provider) and Vercel (our hosting provider). Both are
            reputable infrastructure providers; neither has any relationship
            with Malhar Sports and Shoes beyond providing hosting/storage
            services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Your rights
          </h2>
          <p className="mt-2">
            You can ask us to delete your account and associated data at any
            time by contacting us via WhatsApp or phone (details below).
            Clearing your browser&apos;s localStorage will also remove
            locally-stored gamification data on that device.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl normal-case tracking-normal text-ink">
            Contact us
          </h2>
          <p className="mt-2">
            Questions about this policy? Reach us at {business.phone} or via
            WhatsApp, or visit us at {business.address.full}.
          </p>
        </section>
      </div>
    </div>
  );
}
