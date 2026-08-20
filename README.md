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

## Slice 4 — Backgrounds + micro-interactions everywhere

Extended the Slice 3 background/motion system to every remaining section, closing the "no section should look empty" gap flagged earlier.

### New reusable primitives
- **`components/ui/RevealOnScroll.tsx`** — fade/slide/rotate-in on scroll, fires once. Wraps server-rendered children fine (composition, not conversion).
- **`components/ui/StaggerGroup` / `StaggerItem`** (same file) — staggered grid/list reveal, used on every card grid site-wide.
- **`components/ui/RippleEffect.tsx`** — mounted once in `app/layout.tsx`. Delegated pointerdown listener spawns a ripple on any button/link tap, no per-element markup needed. Skips entirely under `prefers-reduced-motion`.
- **`bg-aurora-soft` / `bg-conic-soft`** (in `globals.css`) — low-alpha versions of the Hero's aurora/conic gradients, for use on white/light sections so they don't overpower body text.

### Where backgrounds landed
| Section | Variant |
|---|---|
| Hero | `aurora` (full strength, dark) |
| Footer | `aurora-soft` (dark section, toned down since it's a lot of text) |
| Homepage — Personality teaser | `conic-soft` |
| Homepage — Khelo Aaj strip | `dots` |
| Sports Hub | `conic-soft` |
| Khelo hub + every game/calculator page | `dots` |
| Blog listing + article page | `conic-soft` / `aurora-soft` |
| Store, About | `aurora-soft` / `conic-soft` |
| Indore Academies directory | `dots` |

### Micro-interactions added
- Every card grid site-wide now reveals with a stagger on scroll into view (games, calculators, blog posts, sports-hub categories, academies/grounds, store contact cards).
- Ripple feedback on every button/link tap, site-wide, automatically.
- Card hover lift (`-translate-y-1` + shadow) extended to contact cards, category cards, badge tiles that didn't have it before.

### Still not done from the original 14-task brief
- Image parallax — not applicable yet since the site doesn't use photographic images anywhere (no real store photos uploaded to `/public` besides the logo)
- Dynamic imports / code-splitting for animation-heavy components (Task 12)
- Breadcrumb schema (Task 13)
- `CRICKET_API_KEY` — still needs to be added once you have a real key from cricapi.com; response shape should be spot-checked against the live API since it wasn't testable in this sandbox

## Bugfix pass — Enquire button + idle cursor

### Real bug found: FloatingEnquireButton never reappeared
`useScrollDirection` set `direction: "down"` on a scroll event but **never reset it** once scrolling stopped. Since normal browsing is "scroll down, then stop reading," `direction` stayed stuck at `"down"` forever after the first downward scroll — so `visible = pastThreshold && direction !== "down"` was permanently `false` for most real usage. Fixed by adding an `isScrolling` flag that clears itself 150ms after the last scroll event, so the button reappears as soon as you stop scrolling (not just when you scroll back up).

### Real bug found: cursor labels/idle-icon were nearly invisible
The `.glass` style (`rgba(255,255,255,0.08)` background) was designed against Hero's dark background. Once backgrounds got added to every section (Slice 4), the same glass style was floating over **mostly light pages**, making white-on-near-transparent-white essentially invisible. Fixed:
- Hover label pill → solid `bg-ink` (dark) instead of glass — visible on every background.
- Resting cursor dot → solid orange with white ring instead of plain white.
- Idle-morph icon circle → solid `gradient-orange` instead of glass.
- Floating Enquire button → solid `gradient-orange` instead of glass (same root issue).

### Diagnostic aid (dev-only, safe to leave in)
- `components/ui/CustomCursor.tsx` logs `[CustomCursor] enabled: true/false {...}` to the browser console on mount in development, showing exactly which capability check (pointer/hover/reduced-motion) passed or failed.
- `window.__cursorDebug` is set (dev-only) with `{ isIdle, label, showIdleIcon }` — open DevTools console and type `__cursorDebug` any time to see live state.
- Both are gated by `process.env.NODE_ENV !== "production"` and compile away in the production build — they won't show up on your live site.

**If the idle-cursor still doesn't visually morph after this fix:** open your browser's DevTools console on the live-preview build (`npm run dev`), wait 3+ seconds without touching the mouse, and check `__cursorDebug` — if `isIdle` is `true` there but nothing shows on screen, it's a render/CSS issue I can dig into further; if `isIdle` stays `false`, the capability gate is failing (check the `[CustomCursor] enabled:` log for which check failed) and I'll adjust the gating logic to be less strict.

## Bugfix — cursor detection on touchscreen laptops

**Root cause found via debugging with the user:** on a touchscreen-capable Windows laptop, `window.matchMedia("(pointer: fine)")` and `(hover: hover)` returned `false` even while using a real mouse — a known Chrome/Edge-on-Windows quirk where these queries reflect "does this device have touch hardware at all," not "what is the person using right now."

**Fix:** `components/ui/CustomCursor.tsx` no longer gates on those media queries. It now listens for real `pointerdown`/`pointermove` events and checks `e.pointerType` directly — `"mouse"` turns the cursor on, `"touch"` turns it off. `prefers-reduced-motion` is still respected as a hard override (accessibility requirement, Task 11) — if that's on, the cursor never activates, by design.

This is more robust than the media-query approach for any hybrid device (Surface, 2-in-1 laptops, touchscreen All-in-Ones) and requires no configuration.

## Cursor v2 — simplified per feedback

Removed the hover-label system entirely (no "Explore →", no per-sport label swaps on the Hero buttons) — the cursor now has exactly two states:
1. **Resting** — a small tennis ball (SVG, hand-drawn seam curves) follows the mouse.
2. **Idle** (3s no movement) — morphs into the cycling sport-emoji circle, unchanged from before, cycling every 0.75s.

Also tightened the spring physics (`stiffness: 700, damping: 50, mass: 0.2`, up from `400/40/0.4`) so tracking feels closer to 1:1 instead of floaty/lagging behind the real pointer.

`data-cursor` / `data-cursor-sport` attributes still exist scattered across various components (Hero sport picker, card grids) from the earlier version — they're now inert/unused by CustomCursor and safe to ignore. Not removed from the markup since they're harmless, but flagging in case you go looking for why they're still there.

## Sign-in + streak sync, bigger/legible logo, nav cleanup

### 1. Sign-in (Google + phone, no OTP)

**⚠️ Security tradeoff, please read:** the phone login has **zero verification** — anyone who types any phone number is logged in as that number, full stop. This was implemented exactly as requested ("log in from a mobile phone without an OTP"), but it means someone could type your number and see/overwrite your streak. That's a reasonable risk for a gamification streak counter, but it is NOT safe for anything sensitive. If this ever needs to be more secure, swap `Credentials` in `auth.ts` for a real OTP provider (Twilio Verify, Firebase Phone Auth, etc.) — the rest of the sync system (below) doesn't need to change.

**What you need to set up before this works on your live site:**

1. **Google Sign-In** — go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → create an OAuth 2.0 Client ID (Web application) → add authorized redirect URI: `https://malharsportsandshoes.in/api/auth/callback/google` (and the same for your `.vercel.app` URL if you test there too). Copy the Client ID and Client Secret.
2. **Phone login** — needs no external setup, it's just a form. Works immediately.
3. In Vercel → Settings → Environment Variables, add:
   - `AUTH_SECRET` — any long random string (generate one at [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) or run `openssl rand -base64 32`)
   - `AUTH_GOOGLE_ID` — from step 1
   - `AUTH_GOOGLE_SECRET` — from step 1
4. Redeploy after adding these (env vars only apply to new deployments).

**Without these three variables set, Google sign-in will error when clicked** (phone login still works fine, since it needs no credentials).

### 2. Streak syncing across devices (optional, needs Redis)

Signing in works without this — it just means the streak stays local to that one browser (same as before). To make it follow you across devices/logins:

1. In Vercel dashboard → Storage → **Marketplace** → search "Redis" → add the free Upstash Redis integration to this project (or create one directly at [upstash.com](https://upstash.com), free tier).
2. This auto-adds `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your project's environment variables. If it doesn't (some integration flows require manual copy-paste), copy them from the Upstash dashboard yourself.
3. Redeploy.

**Without these two variables, sign-in still works, but streak data won't persist across devices** — `app/api/streak/route.ts` detects the missing config and quietly no-ops (same graceful-fallback pattern as the cricket score widget).

### 3. What syncing actually does
- On login, `components/auth/AuthSync.tsx` fetches your server-stored streak/points/badges and **merges** them into this device's localStorage (takes the higher value on each field — a fresh device pulls down your progress, a device that already has local progress doesn't lose it).
- Every time you earn points, unlock a badge, or bump your streak (`lib/gamification.ts`), it fires a background sync to `/api/streak` if you're signed in.
- Signed-out visitors: everything still works exactly as before, 100% localStorage, no account needed.

### 4. Navbar logo — bigger, legible, "3D"
- Replaced the full circular badge logo with a **cropped wordmark** (`public/logo-wordmark.png`) showing just "मल्हार" + the decorative swoosh — this reads far more clearly at small sizes than the full badge, which had the Devanagari script squeezed into a busy ring layout.
- Sized up: 44px tall on mobile → 64px on desktop (was 48px/60px, and the crop itself has way more visual weight per pixel than the old badge).
- Added a subtle bevel via layered `drop-shadow` filters (dark offset + light offset, simulating an embossed/3D look) plus a hover tilt (`perspective` + `rotateX`) for interactivity.
- The full circular badge (`public/logo.png`) is untouched and still used in the Footer, favicon, and OG/schema images — only the Navbar changed.

### 5. Nav changes
- **Removed** "Gyaan" (blog) from the header — both desktop nav and mobile menu. **Left untouched** in the Footer's "Explore Karo" column, exactly as requested.
- **Added** "Health Calculator" to the header, linking to `/khelo/calculators/bmi` (the BMI calculator — the most literal "health calculator" among the three that exist). If you meant something else by "Health Calculator" (e.g. a new combined page linking BMI + water intake + running), tell me and I'll build that instead of pointing straight at BMI.

## Correction — phone login now uses a real password

The earlier version of this feature had phone login accept *any* number with no verification at all. That's been replaced with real credentials:

- **Sign Up** (`POST /api/auth/signup`) — creates an account: phone number + password (min 6 characters), password hashed with bcrypt before storage. Rejects duplicate phone numbers.
- **Login** — verifies the password against the stored bcrypt hash via NextAuth's Credentials provider (`auth.ts`). Wrong password or unregistered number both fail with a generic "phone ya password galat hai" (doesn't leak which one was wrong).
- The Sign In modal now has a Login/Sign Up toggle above the phone+password fields.

**This changes the setup requirement:** phone login now *requires* Upstash Redis to be configured (it's where accounts are stored — see `lib/auth-users.ts`) — without it, signup returns a clear 503 error telling the person to use Google instead. This is a step up in real requirements from before, but a necessary one: password-based auth can't work without somewhere to store the password hash.

Google sign-in is unaffected by this — it still just needs `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` / `AUTH_SECRET` as documented above, no Redis needed for Google specifically (though Redis is still needed for the streak-sync feature to work across devices regardless of which login method is used).

## "Now" priorities — sitemap, robots, legal pages, analytics

### New environment variables
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — your GA4 Measurement ID (looks like `G-XXXXXXXXXX`). Get one at [analytics.google.com](https://analytics.google.com) → Admin → create a property for your site → Data Streams → Web. Without this, no analytics script loads at all — zero performance cost, zero tracking, until you add it.
- `GOOGLE_SITE_VERIFICATION` — the verification code from [Google Search Console](https://search.google.com/search-console) when you add your property via the "HTML tag" method (copy just the `content="..."` value, not the whole tag). Without this, the verification meta tag simply doesn't render — harmless, just means Search Console won't be able to confirm ownership yet.

Add both in Vercel → Settings → Environment Variables, then redeploy.

### What's new
- **`app/sitemap.ts`** — auto-generated XML sitemap covering every static route plus every blog article (pulls slugs from `content/blog/*.mdx` automatically — new articles appear here with zero code changes). Live at `/sitemap.xml`.
- **`app/robots.ts`** — allows all crawlers, disallows `/api/*`, points at the sitemap. Live at `/robots.txt`.
- **`/privacy`** — Privacy Policy, written to reflect what this site *actually* collects (Google OAuth data, phone+password for the credentials login, gamification data in localStorage + optionally synced to Redis). Linked in the footer.
- **`/terms`** — Terms of Service, including honest disclosure that phone login has no OTP verification, and that the Indore academies directory is unverified third-party data.
- **`components/analytics/GoogleAnalytics.tsx`** — loads GA4 only if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- **`lib/analytics.ts`** — a `trackEvent()` helper, safe to call anywhere (no-ops if GA isn't loaded). Wired into the three highest-intent actions on the site so far: the floating WhatsApp button, the Hero's WhatsApp CTA, the Hero's "get directions" link, and the floating Enquire button. Extend this to other buttons the same way as needed.

### Still outstanding from the "Now" list
- Real store/product photos — biggest remaining gap, not something I can generate for you (needs actual photos of your store)
- Verifying or removing unconfirmed entries in `lib/indore-venues.ts`

## Content + trust + tracking pass (while photos are pending)

### 6 new blog articles (2 → 8 total)
- Badminton racket buying guide
- Football studs/surface guide
- Gym essentials for beginners
- Sports shoes maintenance
- School sports day kit checklist
- Beginner running training guide

Every category the site references now has at least one real article behind it. Sitemap picked all of these up automatically (24 URLs now, was 16) — confirms the dynamic sitemap system works as designed, no manual step needed when adding content.

### Trust fix: unverified-data disclosure
`/indore/academies` now shows a visible warning banner to actual visitors ("this list is from public sources, not verified — confirm before visiting/calling"). Previously this caveat only existed in code comments and the README — visitors had no way to know. This was a real gap, now closed. The underlying data itself is still unverified — that part still needs you to confirm or remove entries you can't personally vouch for.

### Analytics: event tracking extended
Beyond the WhatsApp/Enquire clicks from before, now also tracking:
- `quiz_completed` — Sports Personality quiz finished
- `daily_streak_continued` — with the actual streak count as a parameter, so you can see streak distribution in GA4
- `login_click` (Google), `login_success` / `signup_success` (phone) — real funnel visibility into how people are actually signing in

All of this is inert until you add `NEXT_PUBLIC_GA_MEASUREMENT_ID` — same as before.

## Real store photos added

### A note on the source images
The 4 photos provided had been run through an AI photo enhancer before sending. Enhancers like this are known to hallucinate/distort text during upscaling (they're pattern-matching pixels, not reading language) — the storefront signage photo came back with garbled Devanagari and **two phone numbers that don't match the real business number** in `lib/business.ts`. That one photo was cropped to remove the signage band entirely before use, so no incorrect contact info is displayed anywhere on the site. The other 3 photos (counter/interior, shoes wall, apparel wall) had no readable text affected and were used directly.

**If you get a chance to send the original, unenhanced versions later**, the storefront shot in particular would be worth swapping back in — showing the real, correct signage is more valuable than a cropped interior-only shot.

### Where photos landed
- **Homepage** — new `StoreGallery` section (`components/home/StoreGallery.tsx`) right after the Matchday Ticker, showing 3 interior photos with a link to `/store`. This directly addresses the "no photos anywhere" gap flagged earlier — first-time visitors now see the real shop before anything else.
- **`/store`** — full 4-photo gallery (entrance + 3 interior shots) added above the contact cards.
- **`/about`** — one photo (interior/counter) added below the heading, giving the story a real face.
- **LocalBusiness schema** (`lib/schema.ts`) — now points at a real store photo instead of the logo for the `image` field, which is what Google's structured data guidelines actually prefer for this field.

### Technical notes
- All 4 images resized to max 1600px wide and re-compressed (JPEG, quality 82) before adding to the repo — originals were 2-2.7MB each as PNG, now 215-370KB each as JPEG. Total `/public/store-photos/` folder: ~1.3MB.
- All usages go through `next/image` with proper `sizes` attributes, so Vercel will further serve appropriately-sized/format-optimized versions per device automatically — these aren't just static `<img>` tags.

## Migrated from Upstash Redis to Supabase

Per request, swapped the storage backend from Redis to Supabase (Postgres). Both did the same job — this just moves where the data lives. Functionally identical from the site's perspective.

### What changed under the hood
- `lib/supabase.ts` — new server-side Supabase client (service role key, never exposed to the browser).
- `lib/auth-users.ts` — rewritten to query a Postgres `auth_users` table instead of Redis keys. Same exported functions (`getUserByPhone`, `createUser`, `isUserStoreConfigured`, `normalizePhone`), so `auth.ts` and the signup route needed zero changes.
- `app/api/streak/route.ts` — rewritten to read/write a `user_streaks` table instead of Redis.
- `@upstash/redis` removed from `package.json`, `@supabase/supabase-js` added.

### Setup steps (do these in order)

**1. Create the tables.** Open **`supabase-setup.sql`** (included in this project root) — copy its entire contents, paste into Supabase's Dashboard → **SQL Editor** → **New Query**, and click **Run**. This creates the two tables the site needs (`auth_users`, `user_streaks`) with Row Level Security enabled (safe default — your server routes use the service role key which bypasses RLS anyway).

**2. Get your credentials.** In your Supabase project dashboard → **Settings** → **API**:
   - Copy the **Project URL**
   - Copy the **`service_role` secret** key (NOT the `anon`/`public` key — this needs to be the one labeled "service_role", and Supabase will warn you it's secret, which is correct — never put this in client-side code, only server env vars)

**3. Add both to Vercel** → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your service_role key
   - Check all three environment boxes for each, Save

**4. Don't forget `AUTH_SECRET`** (from before — still required regardless of database choice, generate one at generate-secret.vercel.app/32 if you haven't already).

**5. Redeploy** — Deployments tab → ⋯ on latest → Redeploy.

**6. Test** — Sign Up with a phone number + password on your live site. If it works, check Supabase's **Table Editor** → `auth_users` — you should see your new row appear there.

## UX pass: homepage flow + tone

### Homepage restructure
Reordered around a clear hierarchy instead of throwing everything at the visitor at once:
1. **Hero** — value prop + one visually dominant primary CTA (WhatsApp), secondary "get directions" demoted to a plain text link instead of competing as an equal-weight button.
2. **`components/home/WhatYouCanDoHere.tsx`** (new) — a 4-tile visual sitemap right after the hero: Shop, Turf Booking, Khelo, Guides. Directly answers "what can I do here," which was the core complaint driving this pass.
3. **Trust** (Matchday Ticker, Store Gallery) — credibility before asking for more engagement.
4. **Secondary discovery** (New Arrivals, Quiz, Daily Challenge) — pushed further down, presented as optional exploration rather than competing with the primary path.

### Tone: "tu" → "tum", site-wide
Went through every file containing informal "tu/tera/teri/tere/tujhe/tune" and corrected both the pronoun and the verb conjugation it required (e.g. "tu karta hai" → "tum karte ho", not just a word swap) — 22 files: homepage components, all game/quiz pages, calculators, auth, turf-owner pages, admin turf page, about page, and all 6 blog articles. Verified zero remaining instances via a full-codebase search after the pass, not just spot-checked.

**Why this mattered:** "तू" is one of Hindi's most intimate registers — appropriate between close friends, inappropriate from a business addressing strangers, and genuinely risks reading as disrespectful to older customers, women, or anyone the site hasn't earned that familiarity with yet. "तुम" keeps the same energetic, non-corporate personality without that risk.
