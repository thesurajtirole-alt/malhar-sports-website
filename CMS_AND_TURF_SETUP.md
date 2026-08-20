# CMS + Turf Booking — Setup Guide

Two big new pieces: an admin panel to manage content without touching code, and a live turf-booking system.

## 1. Run the new database tables

Open **`supabase-setup-v2.sql`** (in this project's root), copy its full contents, paste into Supabase → **SQL Editor** → **New Query** → **Run**.

This creates:
- `products` — New Arrivals items shown on the homepage
- `academies` — replaces the old hardcoded Indore directory (your existing 6 venues get seeded in automatically, still marked unverified)
- `turfs` — the turfs you list for booking
- `turf_bookings` — every booking made
- A `product-images` storage bucket for photo uploads

## 2. Set who's allowed to log into `/admin`

Add these in Vercel → Settings → Environment Variables:

- `ADMIN_EMAILS` — comma-separated Google account emails, e.g. `thesurajtirole@gmail.com,staffmember@gmail.com`
- `ADMIN_PHONES` — comma-separated phone numbers (digits only, no spaces/symbols) for anyone using phone+password login, e.g. `9826323377,9876543210`

Anyone signing in whose email or phone matches one of these lists can access `/admin`. Everyone else sees a polite "not an admin" message, not an error.

**Why an env var instead of a fancy "manage admins" screen?** For 2-3 people, editing one env var and redeploying is simpler and safer than building (and then having to protect) a whole admin-management UI.

## 3. Redeploy

Vercel → Deployments → ⋯ → Redeploy.

## 4. Log in and try it

Go to `yoursite.com/admin` — sign in with an account listed in `ADMIN_EMAILS`/`ADMIN_PHONES`. You'll see 4 sections:

### New Arrivals (`/admin/new-arrivals`)
Add a product: name, category, price (optional), description (optional), and a photo (uploads directly to Supabase Storage — no separate image hosting needed). Toggle items active/hidden, or delete them. Active items show automatically on the homepage's "New Arrivals" section (top 4, most recent first) — no further steps needed, it's live the moment you add it.

### Indore Directory (`/admin/academies`)
Same add/edit/delete pattern as before, but now live-editable instead of requiring a code change from me. New: a **Verified** toggle — mark a listing verified once you've actually confirmed its details, and a green "✓ Verified" badge shows on the public page. Unverified listings still show (with the general disclaimer banner), verified ones stand out as trustworthy.

### Turfs (`/admin/turfs`)
Add a turf: name, address, area, the turf owner's contact number, sports offered, price/hour, opening/closing hours, and slot length (default 60 min). This is the core setup step for the booking feature — until you add at least one turf here, `/turfs` shows an empty state.

### Bookings (`/admin/bookings`)
Read-only table of every booking made, newest first, with a Cancel option (e.g. if a customer calls to cancel, or you need to block a slot manually).

## 5. How turf booking actually works (public side)

- `/turfs` — directory of all active turfs
- `/turfs/[id]` — a turf's detail page: address, hours, price, and a live slot picker (7-day date strip + time-slot grid)
- Booking is **instant** — no approval step, no payment. Person picks a slot, enters name + phone, submits, done. The database has a hard uniqueness constraint on (turf, date, time) so two people literally cannot book the same slot even if they click at the exact same moment — whoever's request lands first wins, the second gets a clear "someone just took this slot" message and the grid refreshes.
- **This is deliberately request-free and payment-free**, per your call — you handle any disputes or changes manually via the turf owner's contact number, same as before.

## 6. Important: these are not Malhar's own turfs

The turf detail page includes a visible note: "Ye turf Malhar Sports ka nahi hai — hum sirf booking mein madad kar rahe hai." This matters for two reasons — it sets correct expectations with customers, and it's the honest framing given you're listing third-party turfs, not ones you operate. If any turf ever becomes something Malhar directly runs, that note (and possibly the whole trust framing) should be revisited.

## 7. Known simplifications (being upfront about scope)

- No SMS/WhatsApp confirmation sent automatically after booking — the person just sees an on-screen confirmation. Could be added later via a WhatsApp Business API integration, which is a separate, more involved setup.
- No email/notification to you when a new booking comes in — you'd need to check `/admin/bookings` periodically, or I can add a notification later (e.g. a Slack/WhatsApp webhook) if that becomes a pain point.
- Timezone handling assumes IST implicitly (uses the server/browser's local date) — fine for an India-only audience, would need work for multi-timezone use.
- No recurring/multi-slot bookings (e.g. "every Sunday for a month") — one slot per booking for now.

## 8. Turf owner self-service login (new)

Turf owners can now log in and manage their own turf directly — see live bookings, adjust price/hours, or temporarily pause bookings.

### One more SQL step
Run **`supabase-setup-v3.sql`** (after v1 and v2) in Supabase's SQL Editor — adds owner fields to the turfs table.

### How you assign an owner
When adding or editing a turf in `/admin/turfs`, there are two optional fields: **Owner's Google email** and **Owner's phone number**. Fill in whichever the turf owner will actually use to sign in (you'll need to tell them which one to use, and they sign in the exact same way a customer would — via the site's normal Sign In button).

### What a turf owner can and can't do
They can only edit: **price per hour, opening/closing time, and a visible/hidden toggle** (for pausing bookings temporarily, e.g. maintenance). They **cannot** edit the turf's name, address, or contact number — those stay under your control, so an owner account can't quietly change the listing's identity or the number customers see. They can only ever see bookings for their own turf — never yours, never another owner's.

### The complete login flow, all three roles

| Role | URL | How they get access |
|---|---|---|
| **Customer** | `malharsportsandshoes.in` — browses freely, no login needed for browsing or booking | N/A |
| **You / staff (main admin)** | `malharsportsandshoes.in/admin` | Sign in via the site's normal Sign In button, using an email/phone listed in `ADMIN_EMAILS`/`ADMIN_PHONES` |
| **Turf owner** | `malharsportsandshoes.in/turf-owner` | Sign in via the same Sign In button, using the exact email/phone you entered for them in `/admin/turfs` |

**Nobody sees a nav link for either `/admin` or `/turf-owner`** — both are unlisted on purpose (per your call not to clutter the navbar for regular customers). You'll need to tell each turf owner their dashboard URL directly (e.g. via WhatsApp when you onboard them) — same as how you'll navigate to `/admin` yourself.

## 9. Public turf self-signup, with your approval required

Turf owners can now list their own turf directly on the site — but it stays completely invisible to customers until you approve it.

### One more SQL step
Run **`supabase-setup-v4.sql`** (after v1, v2, v3) in Supabase's SQL Editor. Adds an approval flag to turfs — existing turfs you've already added default to approved automatically, so nothing you've set up breaks.

### The flow
1. A turf owner visits `/turfs/list-your-turf` (there's a link to it right on the `/turfs` page — "Turf Owner Ho? Apna Turf List Karo").
2. They fill in their turf's details, plus their own email or phone (needed so they can log into `/turf-owner` afterward).
3. On submit, the turf is created but marked **not approved** — it does not show up on `/turfs`, doesn't show up in the sitemap, and can't actually be booked (checked at the database level, not just hidden in the page — someone can't book it even by guessing the URL).
4. They can immediately sign in and check `/turf-owner` — they'll see their turf listed with an "Approval Pending" badge.
5. **You** go to `/admin/turfs` — pending submissions now show in a separate "Approval Ka Wait Kar Rahe Hai" section at the top, with **Approve** and **Reject** buttons.
6. Click **Approve** → it instantly becomes visible and bookable on `/turfs`. Click **Reject** → it's deleted.

### Turfs you add yourself via `/admin/turfs` skip this entirely
Anything you add directly through the admin panel (not the public form) is automatically pre-approved — the approval queue is only for public self-submissions, since you already vetted it yourself by adding it.

## 10. Real categories/subcategories for New Arrivals

Products no longer use free-typed category text — you manage a real category list, and products pick from it via a dropdown.

### One more SQL step
Run **`supabase-setup-v5.sql`** (after v1-v4) in Supabase's SQL Editor. Creates a `categories` table and links `products` to it.

### How to use it
1. Go to **`/admin/categories`**.
2. Add a top-level category (e.g. "Cricket", "Running Shoes", "Apparel") — leave the dropdown on "Top-level category."
3. To add a subcategory (e.g. "Cricket Bats" under "Cricket"), add a new category, and this time pick "Subcategory under: Cricket" from the dropdown.
4. Go to **`/admin/new-arrivals`** — the category field is now a dropdown showing your real categories, with subcategories indented under their parent.

Deleting a top-level category also deletes its subcategories (you'll get a warning before this happens). Deleting a category a product is currently using doesn't delete the product — it just becomes uncategorized.

### Pricing now reads "Starting from"
Every place a product's price shows (homepage New Arrivals, admin list) now displays as **"Starting from ₹X"** instead of just "₹X" — since a single listed price is really a floor (sizes/variants vary), not a fixed price. This is just a label change, not a new field — you still enter one number per product.
