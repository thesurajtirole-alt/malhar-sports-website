# Malhar Sports and Shoes — Website

Indore ka sports adda. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## What's built so far (Slice 1: Foundation + Homepage)

- **Design system** — `app/globals.css` holds every color/font/radius token. Palette: Court Orange `#FF6A1A`, Stadium Black `#0E0F10`, Turf Green `#1C8A4B`, Chalk White, Tape Gray. Display font is **Anton** (condensed, jersey-numeral energy), body is **Plus Jakarta Sans**, and a monospace (**JetBrains Mono**) powers the scoreboard ticker.
- **Real business data** — `lib/business.ts` is the single source of truth for address, phone, WhatsApp, hours, and rating. Everything (schema, footer, nav CTA, WhatsApp button) reads from here — update once, it propagates everywhere.
- **SEO/schema** — `lib/schema.ts` generates `SportingGoodsStore` LocalBusiness JSON-LD with your real NAP (name/address/phone), hours, and aggregate rating, injected in `app/layout.tsx`. Metadata (title/description/OG/Twitter) is also wired with your target keywords (sports shop Indore, running shoes Indore, etc.)
- **Layout** — Sticky Navbar (mobile menu included), Footer with real address/hours/map link, floating WhatsApp CTA button (pre-filled message).
- **Homepage**
  - **Hero** — "Bhai... Aaj Kis Sport Ka Mood Hai?" with a working 6-sport picker (Cricket/Football/Badminton/Running/Gym/School) that swaps the line and category chips live.
  - **Matchday Ticker** — signature scoreboard-style scrolling strip (rating, sports covered, address, hours) — this is the page's one distinctive motif, used sparingly.
  - **Sports Personality teaser** — links out to the quiz (not yet built).
  - **Khelo Aaj (Daily Challenge)** strip — 3 cards linking to games (not yet built).
- **404 page** — "Lagta Hai Ball Boundary Ke Bahar Chali Gayi 😅" per the brief's microinteraction spec.

## Not yet built (next slices)

This is a large spec — the rest is intentionally sequenced so each piece is done properly rather than stubbed:
- Sports Personality Quiz, Daily Challenge, Guess the Player/Shoe/Logo, calculators (BMI/Running/Water)
- Blog/MDX system + sample articles
- Sports Hub category pages
- Indore academies/grounds/events directory (+ map)
- Gamification (points/badges via localStorage)
- Dark mode toggle (tokens are ready, toggle UI isn't wired yet)
- Real photos/logo (currently no images used — add yours to `/public`)

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

**Note:** `next/font/google` needs internet access to fetch Anton, Plus Jakarta Sans, and JetBrains Mono at build time. This works normally on your machine and on Vercel — it only failed in the sandboxed environment I built this in (which whitelists just a few domains). No action needed on your end.

## Before going live

1. Add real photos (store front, interior, shelves) to `/public` — currently images are used nowhere so there's nothing broken, but the design wants them.
2. Replace the placeholder `geo.lat`/`geo.lng` in `lib/business.ts` with your exact Google Business Profile pin (for map accuracy).
3. Buy `malharsportsandshoes.in` from a registrar (GoDaddy/BigRock/Namecheap — a `.in` domain itself isn't free, roughly ₹500–800/year, but hosting on **Vercel is free** for this traffic level).
4. Add Google Analytics, Search Console verification, and Microsoft Clarity IDs once the domain is live.
