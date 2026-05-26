# Staicha — Website

The production website for Staicha LLP — a London chartered accountancy and advisory firm.

> _Numbers, with conviction._

## Stack

- **Framework** — Next.js 14 (App Router) + TypeScript
- **Styling** — Tailwind CSS with brand tokens (Ink, Bone, Oxblood)
- **Type** — Source Serif 4, Hanken Grotesk, JetBrains Mono (via `next/font/google`)
- **Animation** — Framer Motion (scroll/page motion), Lenis (smooth scroll), GSAP available for future scroll-trigger work
- **Content** — File-based, in `src/content/*.ts`. Strongly typed.
- **Admin** — `/admin` (basic-auth protected via middleware). Provides a read view of all content and points to the source files.

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, positioning, services showcase, figures, testimonials, insights, CTA |
| `/about` | Firm story, mission, vision, values |
| `/services` | Index of all twelve services |
| `/services/[slug]` | Individual service page |
| `/team` | Founding partners |
| `/insights` | Article listing |
| `/insights/[slug]` | Individual article |
| `/careers` | Open positions and values in practice |
| `/contact` | Contact form, office details |
| `/admin` | Protected content dashboard |

## Local development

```bash
npm install
npm run dev
```

Then visit http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://staicha.co.uk
ADMIN_USERNAME=staicha_admin
ADMIN_PASSWORD=change-me
CONTACT_EMAIL=contact@staicha.com
```

## Build & deploy

```bash
npm run build
npm run start
```

### Replit

The `.replit` file is configured for Cloud Run-style deployment. Add the
environment variables above in **Secrets** before the first deploy.

## Editing content

All content lives in `src/content/`:

- `services.ts` — service taxonomy, descriptions, process steps
- `team.ts` — founding partners
- `testimonials.ts` — client quotes
- `insights.ts` — thought-leadership articles
- `careers.ts` — open positions

Edit, commit, and redeploy. Each file is typed; the editor will warn on missing fields.

## Brand assets

Logos live in `public/logos/` (svg/ and png/). Do not apply CSS filters, shadows
or transforms (except `scale`) to the wordmark. Never omit the precision dot.

## Accessibility

- WCAG 2.1 AA target across all pages
- Custom-cursor and magnetic effects respect `prefers-reduced-motion` and touch
- Skip link, semantic landmarks, focus-visible styles throughout
