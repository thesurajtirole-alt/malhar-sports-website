# Malhar Sports and Shoes — Website

Indore ka sports adda. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and MDX.

Live at: https://malhar-sports-website.vercel.app (connect `malharsportsandshoes.in` per the domain guide you already have)

## What's built (Slice 2 — full site)

### Foundation
- **Design system** — `app/globals.css`. Palette: Court Orange `#FF6A1A`, Stadium Black `#0E0F10`, Turf Green `#1C8A4B`. Fonts: Anton (display), Plus Jakarta Sans (body), JetBrains Mono (scoreboard/ticker).
- **Real business data** — `lib/business.ts` is the single source of truth (address, phone, WhatsApp, hours, rating). Everything reads from here.
- **SEO/schema** — `lib/schema.ts` generates `SportingGoodsStore` LocalBusiness JSON-LD, plus per-article `Article` and `FAQPage` schema (auto-extracted from each MDX file's FAQ section).
- **Gamification** — `lib/gamification.ts`: points, badges, and daily streaks, all via `localStorage`. No auth, no backend.

### Pages
| Route | What it is |
|---|---|
| `/` | Homepage — hero sport-picker, Matchday Ticker, quiz teaser, daily challenge teaser |
| `/sports-hub` | Category directory — links every sport to its guides/tools/games |
| `/khelo` | Games & calculators index |
| `/khelo/sports-personality` | Interactive 4-question quiz → personality result → badge unlock → WhatsApp share |
| `/khelo/aaj-ka-challenge` | Daily quiz question (rotates by date), streak tracking |
| `/khelo/guess-the-player` | Progressive-clue guessing game (rotates daily) |
| `/khelo/sports-fact` | Sports Fact of the Day (rotates daily) |
| `/khelo/calculators/bmi` | BMI calculator (general indicator only, no diet/exercise prescriptions) |
| `/khelo/calculators/running` | Pace → 5K/10K/HM/FM time calculator |
| `/khelo/calculators/water-intake` | Water intake calculator by weight + activity |
| `/blog` | Article listing |
| `/blog/[slug]` | MDX article renderer — Article + FAQ schema injected automatically |
| `/indore/academies` | Real Indore grounds/stadiums/academies directory (Nehru Stadium, Holkar Stadium, Abhay Prashal, ICC, MPCA, Indore Badminton Academy) |
| `/about` | Store story |
| `/store` | Address, hours, phone, WhatsApp, embedded Google Map |
| 404 | "Lagta Hai Ball Boundary Ke Bahar Chali Gayi 😅" |

### Blog / MDX system
- Articles live in `content/blog/*.mdx` with frontmatter (`title`, `description`, `category`, `date`, `readingMinutes`).
- Follows the brief's article format: Question → Quick Answer → Detailed Guide → Mistakes → Expert Tip → FAQs → Related → Visit Store CTA.
- Two real articles included: running shoes buying guide, cricket bat sizing guide.
- **To add a new article:** drop a new `.mdx` file in `content/blog/` with the same frontmatter shape — it's picked up automatically, no code changes needed.

### "Daily" content, no backend
`lib/daily-content.ts` picks today's quiz question / player / fact deterministically from the date, so every visitor sees the same "today's challenge" without a database. Content pools currently have ~5 items each — add more entries to `guessThePlayerPool`, `sportsFactPool`, `dailyChallengePool` to extend the rotation.

## Not yet built
- Guess the Shoe / Guess the Logo, Sports Memory Game, Crossword, Word Hunt, Build Your Dream Kit, Sports Poll (spec lists these; the core game *pattern* is now established in `components/interactive/` if you want more built the same way)
- Events calendar, school sports calendar
- Dark mode toggle (tokens exist in `globals.css`, toggle UI not wired)
- Real photos/logo — none used yet, nothing broken, just no images in `/public`

## Before going live — action items
1. **Verify the Indore academies directory** (`lib/indore-venues.ts`) — this was built from public search results (Justdial, Wikipedia, academy sites), not your own confirmed contacts. Addresses/phone numbers for third-party academies are not guaranteed current. Update or remove entries you can't verify before publishing, and note the reviews/rating count in `lib/business.ts` may drift — recheck it periodically.
2. Add real photos/logo to `/public`.
3. Replace placeholder `geo.lat`/`geo.lng` in `lib/business.ts` with your exact Google Business Profile pin.
4. Add Google Analytics / Search Console / Microsoft Clarity IDs once ready.
5. Write more blog articles as MDX files — the system scales without touching code.

## Running locally

```bash
npm install
npm run dev
```

**Note on fonts:** `next/font/google` needs normal internet access at build time — works fine on your machine and on Vercel. It only fails in the sandboxed environment I build in here (limited domain allowlist); already verified the rest of the app compiles cleanly.

## Slice 3 — Premium platform upgrade

### New environment variable
- `CRICKET_API_KEY` — optional. Get a free key at [cricapi.com](https://cricapi.com), add it in Vercel → Settings → Environment Variables. **Without it, the Live Score widget quietly shows "No Live Match Currently" forever** — it never breaks, it just has nothing to show. This was not testable end-to-end in the sandbox (cricapi.com isn't on my build environment's domain allowlist) — the code is written defensively (try/catch, 30s server cache, graceful fallback chain: live → upcoming → completed → none) but you should verify the real API response shape matches once you add a key, since free-tier APIs sometimes change their JSON structure.

### What's new
- **Typography** — swapped Anton/JetBrains Mono for **General Sans** (heading, loaded via Fontshare `<link>` in `app/layout.tsx` since it's not on Google Fonts) + **Space Grotesk** (numbers/scores) + Plus Jakarta Sans stays as body.
- **Live Score Widget** (`components/ui/LiveScoreWidget.tsx` + `hooks/useLiveScore.ts` + `app/api/live-score/route.ts`) — sits top-right of Hero, polls every 60s, animated LIVE pulse, opens full scorecard in a new tab.
- **Custom cursor** (`components/ui/CustomCursor.tsx` + `hooks/useMousePosition.ts` + `hooks/useIdleCursor.ts`) — glass dot that expands into a label on hover (`data-cursor="..."` or `data-cursor-sport="cricket"` on any element), morphs into a cycling sport emoji after 3s idle. Auto-disables on touch devices, non-hover devices, and `prefers-reduced-motion`.
- **Floating Enquire button** (`components/ui/FloatingEnquireButton.tsx` + `hooks/useScrollDirection.ts`) — appears after 200px scroll, hides on scroll-down, reappears on scroll-up, pulses periodically, links to your Google Form, positioned to never overlap the WhatsApp button.
- **Scroll progress bar** (`components/ui/ScrollProgress.tsx`) — thin bar under the very top edge.
- **Layered backgrounds** (`components/ui/BackgroundEffects.tsx`) — aurora/mesh gradient + grain texture, currently applied to Hero. Drop `<BackgroundEffects variant="aurora" | "conic" | "dots" />` into any `position: relative` section to extend this to other sections.
- **Magnetic CTA** (`components/ui/Magnetic.tsx`) — wraps the Hero's WhatsApp button with a subtle cursor-pull effect.
- **Bigger navbar logo** — 48px mobile / 60px desktop, navbar height unchanged (still `h-16`).

### Honest gaps vs. the full 14-task brief
- Backgrounds are built and applied to **Hero only** — extending aurora/conic/grain to every section (Task 3's "no section should look empty") needs a pass through each section component.
- Micro-interactions (card lift/glow, button ripple, image parallax, section stagger-on-scroll-reveal) are partially in place (card hovers already existed; ripple and scroll-reveal are not yet built).
- Dynamic import / code-splitting for the cursor and heavy animation code (Task 12) hasn't been done — everything currently loads in the main bundle.
- Breadcrumb schema (Task 13) isn't added yet (Article/FAQ/LocalBusiness schema already were, from Slice 2).
