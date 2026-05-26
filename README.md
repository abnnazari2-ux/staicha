# Staicha — Website

The production website for Staicha LLP — a London chartered accountancy and advisory firm.

> _Numbers, with conviction._

## Stack

- **Framework** — Next.js 14 (App Router) + TypeScript
- **Styling** — Tailwind CSS with brand tokens (Ink, Bone, Oxblood)
- **Type** — Source Serif 4, Hanken Grotesk, JetBrains Mono (via `next/font/google`)
- **Animation** — Framer Motion (scroll/page motion), Lenis (smooth scroll)
- **Content** — File-based, in `src/content/*.ts`. Strongly typed.
- **Admin** — `/admin` (basic-auth protected via middleware). Edit any collection as JSON; saves are persisted to `content-overrides/<collection>.json` on hosts with a writable filesystem (Replit Reserved VM, Render, any VM). Overrides take precedence over the typed defaults at runtime. On read-only/serverless hosts the editor falls back to source-file editing.

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
- `site.ts` — site-wide settings (contact, address, hours)

Two ways to edit:

1. **For permanent changes**: edit the typed source file, commit, and redeploy. The TypeScript compiler enforces the schema.
2. **For ad-hoc changes from the browser**: log into `/admin`, open a collection, edit as JSON, click Save. Changes write to `content-overrides/<collection>.json` and override the source at runtime. This requires a writable filesystem (Replit Reserved VM works; pure serverless does not).

## Generating brand assets

Re-render the OG image and favicon after a brand change:

```bash
npm run gen:og
```

## Brand assets

Logos live in `public/logos/` (svg/ and png/). Do not apply CSS filters, shadows
or transforms (except `scale`) to the wordmark. Never omit the precision dot.

## Accessibility

- WCAG 2.1 AA target across all pages
- Custom-cursor and magnetic effects respect `prefers-reduced-motion` and touch
- Skip link, semantic landmarks, focus-visible styles throughout
- Mobile menu closes on Escape, traps focus while open
- Horizontal scroll sections fall back to vertical stacks on mobile

## SEO

- Per-page metadata (title template, description, canonical URLs)
- Open Graph + Twitter Card metadata; OG image at `/og-image.png`
- JSON-LD structured data: `AccountingService`, `Service`, `Person`, `Article`, `BreadcrumbList`
- `sitemap.xml` auto-generated, `robots.txt` served from `app/robots.ts`
