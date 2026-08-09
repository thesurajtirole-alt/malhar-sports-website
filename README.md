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
