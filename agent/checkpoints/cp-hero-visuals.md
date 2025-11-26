# Agent Checkpoint: Hero Visuals & Layout Review

## Context

Configurable hero implemented in `my-landing-page-2026`:

- Single `sectionHero` entry in Contentful.
- New `heroStyle` field: `"typographic" | "avatar" | "image"`.
- Optional `avatarImage` and `heroImage` assets mapped to `avatarUrl` / `heroImageUrl`.
- UI renders three variants with safe fallbacks:
  - `typographic` → text-only.
  - `avatar` → text + small avatar portrait.
  - `image` → text + larger hero image block.
- Layout: stacked on mobile, side-by-side for avatar/image on desktop via `layout.css`.

## Artifacts

- `src/components/sections/HeroSection.tsx`
- `src/styles/layout.css` (hero-related rules)
- Screenshots or descriptions of:
  - Typographic mode (desktop + mobile)
  - Avatar mode (desktop + mobile)
  - Image mode (desktop + mobile)

## Questions

1. Do the three hero styles feel visually consistent and on-brand when toggled via content?
2. Any layout or accessibility concerns (image sizes, alt text, mobile stacking, focus order) that should be addressed now?
3. For recruiters/hiring managers landing on this page, which hero style is strongest, and what small changes would make that style even more effective?
