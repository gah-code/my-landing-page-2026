
# narrative-interface-system

Next: **Interface & Narrative Toolkit**  
**Bucket 1 – Personal Landing**

[![Version](https://img.shields.io/badge/version-v0.1.0-blue)](./VERSION)  
[![Last Commit](https://img.shields.io/github/last-commit/gah-code/narrative-interface-system)](https://github.com/gah-code/narrative-interface-system/commits/main)  
[![Node](https://img.shields.io/badge/node-%E2%89%A520-orange?logo=node.js&logoColor=white)](https://nodejs.org/)  
[![Netlify Status](https://api.netlify.com/api/v1/badges/80b7e809-3810-4be9-aee4-a5004d9ac7fd/deploy-status)](https://app.netlify.com/projects/narrative-interface-system/deploys)

> **Narrative Interface System** is a high-signal personal landing page that treats SEO, narrative, and content modeling as one system.  
> Built UI-first, CMS-second, with **Contentful** + **Agent-assisted reviews** to keep the landing page sharp.

Structure version: `v0.1.0`  
See [`VERSION`](./VERSION) and [`CHANGELOG.md`](./CHANGELOG.md) for history.

---

## Table of Contents

1. [Project Goals](#1-project-goals)  
2. [Status & Metrics](#2-status--metrics)  
3. [Tech Stack](#3-tech-stack)  
4. [Architecture & Folder Structure](#4-architecture--folder-structure)  
5. [Data & Agent Flow](#5-data--agent-flow)  
6. [Getting Started](#6-getting-started)  
7. [Development Scripts](#7-development-scripts)  
8. [Phases (0–9)](#8-phases-0–9)  
9. [Next Steps – Landing Page To-Dos](#9-next-steps--landing-page-to-dos)  
10. [AgentOps Workflow](#10-agentops-workflow)  
11. [Deployment (Netlify)](#11-deployment-netlify)

---

## 1. Project Goals

**Core focus: a strong landing page**

- Build a **single-page personal landing** that:
  - Reads clearly for **recruiters, hiring managers, collaborators**.
  - Shows **SEO sense, content thinking, and frontend craft**.
- Treat the page as an **Interface & Narrative Toolkit**:
  - Clear positioning, key projects, and “Now / Learning” sections that tell a coherent story.

**SEO & Content**

- Go beyond “SEO is configured” into **SEO that actually sells you**:
  - Good headings, clear copy, structured data, and compelling social previews.
- Use **Contentful** to keep copy and sections flexible:
  - One bucket (Bucket 1 – Personal Landing) for this repo.
  - Other buckets (Blog/Notes, Projects index, etc.) live in other repos/docs.

**Agents**

- Use **Agent Checkpoints** to:
  - Review structure, copy, SEO, and UX.
  - Capture decisions in `agent/CHECKPOINT_LOG.md` for traceability.

---

## 2. Status & Metrics

- **Structure version:** `v0.1.0`
- **Changelog:** [`CHANGELOG.md`](./CHANGELOG.md)

**Latest Lighthouse (Netlify plugin):**

- Performance: **99**
- Accessibility: **96**
- Best Practices: **100**
- SEO: **100**
- PWA: **30** (PWA is explicitly not a goal for this project)

**Phase status (Bucket 1 – Personal Landing):**

- Phases **0–9**: ✅ **complete**

This repo is now “Phase 9 complete” – a solid, tested, deployed landing page.  
Everything under “Next Steps” is **optional polish** to keep sharpening the same page.

---

## 3. Tech Stack

### Core

- **Vite + React** (SPA)
- **TypeScript**
- **CSS with design tokens**
  - `tokens.css` – colors, typography, spacing, radii.
  - `layout.css` – layout, sections, header, responsive behavior.

### Content & Modeling

- **Contentful** (e.g. `master` environment)
  - Content model for Bucket 1 lives in sibling repo: `gharo-content-models`.
  - This app reads a single `pagePersonalLanding` entry with:
    - `slug: "/"`,
    - ordered `sections[]` referencing:
      - `sectionHero`, `sectionTimeline`, `sectionSkills`,
      - `sectionProjects`, `sectionLearning`, `sectionContact`.
- **Static TS fallback**
  - `personalLandingPage` object matches the Contentful-backed TS types.
  - Used as a typed fallback when CMS fetch fails or for local development.

### SEO

- `Seo.tsx` – manages `<title>` + `<meta name="description">` for SPA.
- `PersonSchema.tsx` – JSON-LD Person schema for personal-brand queries.

### Agents

- **AgentOps loop**
  - Checkpoint prompts + payloads in `agent/checkpoints/`.
  - Helper: `agent/scripts/buildCheckpointPayload.mjs`.
- Used to review:
  - Data modeling, mapping, SEO choices, UX, and layout.

### Deploy & Quality

- **Netlify**
  - Build: `npm run build`
  - Publish: `dist`
- **Env vars**
  - `VITE_CONTENTFUL_SPACE_ID`
  - `VITE_CONTENTFUL_ENVIRONMENT`
  - `VITE_CONTENTFUL_DELIVERY_TOKEN`
  - `SECRETS_SCAN_OMIT_KEYS`
- **Lighthouse CI**
  - `@netlify/plugin-lighthouse` via `netlify.toml`.

---

## 4. Architecture & Folder Structure

```text
narrative-interface-system/
├── VERSION
├── README.md
├── CHANGELOG.md
├── package.json
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── .env.example             # template for Contentful env vars (no secrets)
├── .nvmrc                   # Node version hint for CI/Netlify
├── netlify.toml             # Netlify build + Lighthouse plugin config
├── agent/
│   ├── CHECKPOINT_LOG.md    # log of agent checkpoints + decisions
│   ├── checkpoints/         # markdown payloads/prompts per phase
│   └── scripts/
│       └── buildCheckpointPayload.mjs
├── src/
│   ├── main.tsx             # Vite entrypoint, mounts <App />
│   ├── App.tsx              # wraps the Page component
│   ├── data/
│   │   └── page-personal-landing.ts
│   ├── services/
│   │   ├── contentfulClient.ts
│   │   └── fetchPersonalLandingPage.ts
│   ├── components/
│   │   ├── layout/
│   │   │   └── Page.tsx
│   │   ├── sections/
│   │   │   ├── SectionRenderer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── LearningSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── Seo.tsx
│   │   └── PersonSchema.tsx
│   ├── styles/
│   │   ├── tokens.css
│   │   └── layout.css
│   └── __tests__/           # or co-located *.test.ts files
└── public/
    # static assets (favicons, etc.) – optional
````

---

## 5. Data & Agent Flow

### 5.1 CMS → Typed Data

- `contentfulClient.ts`:

  - Uses `VITE_CONTENTFUL_*` env vars to create a CDA client.
- `fetchPersonalLandingPage.ts`:

  - Fetches `pagePersonalLanding` with `slug: "/"`.
  - Uses `include` depth to pull in all linked sections/items.
  - Maps into:

    - `PersonalLandingPage`
    - Section types (`HeroSection`, `TimelineSection`, `SkillsSection`, `ProjectsSection`, `LearningSection`, `ContactSection`).
  - Uses:

    - Section mapper registry (`contentTypeId` → mapper).
    - Safe array helpers and defensive defaults.
    - Unknown section types are logged and skipped instead of crashing.

### 5.2 Typed Data → UI

- `Page.tsx`:

  - Loads CMS data on mount; falls back to `personalLandingPage` on error.
  - Renders:

    - Skip link, sticky header, nav, and all sections via `SectionRenderer`.
    - `<Seo />` + `<PersonSchema />` for SEO and structured data.
- `SectionRenderer.tsx`:

  - Switches on `section.sectionType` and renders the appropriate section component.

### 5.3 Agent Flow

- Use `agent:build` or checkpoint `.md` files to:

  - Bundle code + context for review.
  - Ask about SEO, layout, types, mapping, or narrative.
- Apply suggestions and log them in `agent/CHECKPOINT_LOG.md`.

---

## 6. Getting Started

### Prerequisites

- Node **18+** or **20+**
- npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

```bash
cp .env.example .env.local
```

Then fill:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ENVIRONMENT=master
VITE_CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
```

### Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173`.

### Production build & preview

```bash
npm run build
npm run preview
```

Open `http://localhost:4173`.

---

## 7. Development Scripts

```jsonc
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint \"src/**/*.{ts,tsx}\"",
  "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
  "test": "vitest",
  "test:watch": "vitest --watch",
  "agent:build": "node agent/scripts/buildCheckpointPayload.mjs"
}
```

- `npm run dev` – dev server.
- `npm run build` – production build.
- `npm run preview` – preview built site.
- `npm run lint` – ESLint.
- `npm run format` – Prettier.
- `npm run test` / `test:watch` – tests (mappers, components).
- `npm run agent:build` – build an Agent checkpoint payload.

---

## 8. Phases (0–9)

All **complete** for Bucket 1 – Personal Landing:

- **Phase 0 – Setup** – scaffold, tooling, Agent skeleton.
- **Phase 1 – Static Data Shape** – TS types + static `personalLandingPage`.
- **Phase 2 – Layout** – `Page.tsx`, `SectionRenderer`, sections.
- **Phase 3 – Visual Design & Tokens** – tokens + layout CSS.
- **Phase 4 – UX & Accessibility** – skip link, focus, headings, sticky nav.
- **Phase 5 – Contentful Model** – Bucket 1 model in `gharo-content-models`.
- **Phase 6 – Seed Content** – real data in Contentful.
- **Phase 7 – Integration & Mapping** – CMS → TS mapping, safe patterns.
- **Phase 8 – Go Live + SEO / Lighthouse** – Netlify deploy, plugin, SPA SEO basics.
- **Phase 9 – Hardening & Beyond** – JSON-LD Person, Vitest, CI workflow (lint + test + build).

From here on out, changes are incremental polish on this **one landing page**.

---

## 9. Next Steps – Landing Page To-Dos

Phase 9 – Hardening & Beyond is complete for this repo:  
the landing page is live, tested, mapped to Contentful, and has solid SEO basics.

What follows are **focused, incremental improvements** for this landing page only.  
Deeper modeling work now lives in **`landing-page-content-models` v2**.

---

### 9.1 SEO polish (landing-page only)

- [X] **Finalize structured data**
  - Fill real `sameAs` links in `src/components/PersonSchema.tsx`:
    - LinkedIn, GitHub, portfolio domain.
  - Confirm `url` points at the production domain (e.g. `https://gilbertoharo.com`).
- [X] **Lock in title & meta description pattern**
  - In `Seo.tsx`, codify a final title format, for example:
    - `Gilberto Haro – Web Engineer & Content Systems`
  - Ensure the meta description:
    - Mentions **web engineering**, **content platforms**, and **UX** in a natural, scannable sentence.
- [X] **Social preview card**
  - Add an OG image asset, e.g. `public/og/landing-default.png` with:
    - Name, role, and a clean gradient or subtle graphic.
  - Add OG tags (either in `index.html` or via `Seo.tsx`):
    - `og:title`, `og:description`, `og:url`, `og:type=website`, `og:image`.

---

### 9.2 UI visuals – images, color, layout

- [x] **Hero presentation (configurable)**
  - Hero now supports **typographic**, **avatar**, and **image** modes via:
    - `heroStyle: "typographic" | "avatar" | "image"`
    - Optional `avatarUrl` / `heroImageUrl` mapped from Contentful assets.
  - `HeroSection.tsx` renders the three variants with safe fallbacks:
    - Defaults to `typographic` if `heroStyle` is missing or assets are not set.
    - Uses proper `alt` text for avatar portraits; hero image uses decorative `alt=""` unless needed.
  - `layout.css` adds responsive layout styles:
    - Split layout on desktop for avatar/image modes.
    - Stacked layout on mobile for all modes.
  - Tests:
    - `fetchPersonalLandingPage.test.ts` covers heroStyle defaults, avatar/image asset handling, and fallback behavior.

---

- [x] **Global spacing & layout rhythm**
  - Define a simple vertical spacing scale in `tokens.css` (e.g. `--space-4`, `--space-6`, `--space-8`, `--space-12`) and use it consistently for:
    - Section top/bottom padding.
    - Gaps between headings and body text.
    - Gaps between cards (projects, timeline items).
  - In `layout.css`:
    - Aim for ~3–4rem vertical space between major sections on desktop.
    - Ensure there is clear separation between hero, experience, skills, projects, learning, and contact.

- [ ] **Typography scale & hierarchy**
  - In `tokens.css`, define an explicit type scale and stick to it:
    - `--font-size-h1` (hero title), `--font-size-h2` (section titles), `--font-size-h3` (card/section sub-headings).
  - Update headings to use this scale:
    - `h1` → hero name.
    - `h2` → section headings (`Experience`, `Skills`, `Projects`, `Learning`, `Contact`).
    - `h3` → project titles, timeline items, skill group titles (if needed).
  - Check mobile:
    - Slightly reduce heading sizes where necessary so text doesn’t wrap awkwardly on small screens.
    - Ensure line-height is comfortable for reading (especially in hero intro and section intros).

- [ ] **Color & contrast polish**
  - In `tokens.css`:
    - Verify `--color-muted` remains readable against the background (meets contrast guidelines).
    - Add/verify a `--color-focus-ring` token and use it for `:focus-visible` outlines.
  - In `layout.css`:
    - Make sure focus outlines and hover states are clearly visible on links and buttons (especially in the header and hero CTAs).
    - Ensure any borders (project cards, timeline items) use `--color-border` or a subtle variant for consistency.

---

- [ ] **Hero mode verification in Contentful**
  - Flip `heroStyle` + asset combinations in Contentful to visually verify all three modes:
    - `heroStyle = typographic` with no images.
    - `heroStyle = avatar` with `avatarImage` set.
    - `heroStyle = image` with `heroImage` set.
  - Check each mode on:
    - Desktop (spacing, alignment, avatar/image size).
    - Mobile (stacking, readability, tap target spacing).
  - Once visually confirmed, run the `agent/checkpoints/cp-hero-visuals.md` checkpoint (with screenshots) for an Agent review of the visual/UX choices.

---

- [ ] **Project visuals (lightweight)**
  - Decide how to present 1–2 flagship projects:
    - Text-only cards, or
    - Small thumbnail/icon + text.
  - If using thumbnails:
    - Add an optional `thumbnail` field to the `project` content type in `landing-page-content-models` v2.
    - Map it into the UI and render with meaningful `alt` text (e.g. “Screenshot of project dashboard for …”).
    - Keep layout simple and responsive: image + text on desktop, stacked on mobile.

- [ ] **Tokens & readability check**
  - In `tokens.css`:
    - Reconfirm `--color-text`, `--color-muted`, and body font-size are comfortable for sustained reading.
  - In `layout.css`:
    - Slightly increase line-height on mobile paragraphs (e.g. `1.6–1.8`) for better readability.
    - Confirm that long sections (Experience, Projects, Learning) don’t feel cramped or overly dense.

---

### 9.3 Content & narrative tweaks

- [ ] **Sharpen hero copy**
  - One sentence that clearly says:
    - Who you are, what you do, and the kind of work you want.
- [ ] **Section intros**
  - For each section (Experience, Skills, Projects, Learning, Contact), add or refine a **single intro line** that:
    - Explains what the section is for in recruiter-friendly language.
- [ ] **Contact CTA**
  - In Contact section:
    - Make the main CTA explicit (“Email me about X / Y / Z types of roles or collaborations”).
    - Ensure email + social links are easily tappable on mobile.

---

### 9.4 Modeling work (lives in `landing-page-content-models` v2)

The landing-page code is stable; modeling evolution now lives in the dedicated repo:

- [ ] **Document Bucket 1 v2**
  - In `landing-page-content-models` v2:
    - Update IA/decisions docs to reflect any new fields (hero avatar, project thumbnails, etc.).
- [ ] **Link map for the landing page**
  - Maintain a simple diagram or doc describing:
    - `pagePersonalLanding` → section entries → nested items (timeline items, skills, projects).
  - Keep it aligned with what the landing-page UI actually uses.

---

### 9.5 AgentOps & automation improvements

After SEO polish, the next big win is making your **AgentOps workflow smoother and more automated**.

- [ ] **Checkpoint metadata & structure**
  - Standardize checkpoint files under `agent/checkpoints/` with:
    - A short header (Phase, focus, date).
    - Explicit `Artifacts` list (files + paths).
    - Explicit `Questions` section.
  - Consider using a mini front-matter block (YAML or JSON) at the top of each checkpoint for easier parsing.
- [ ] **Automatic context snapshots**
  - Add a small script (e.g. `agent/scripts/snapshotStatus.ts`) that:
    - Reads Lighthouse scores (from the latest report or CI logs).
    - Reads `post-launch-status.md` (if present).
    - Outputs a short status summary you can paste into checkpoints.
- [ ] **AgentOps logging discipline**
  - Any time you:
    - Change content meaningfully in Contentful, or
    - Modify a section’s structure or copy in code,
  - Add a 1–2 bullet summary in `agent/CHECKPOINT_LOG.md`:
    - “What changed?”
    - “Why (SEO/UX/system reason)?”

These make it much easier for future agents (and future you) to reconstruct context quickly.

---

### 9.6 Developer workspace – using ChatGPT Pro effectively

A few high-impact ways to use your ChatGPT Pro account **just for this landing page**:

- [ ] **Dedicated Project for this repo**
  - Create a ChatGPT **Project** named `narrative-interface-system`.
  - Upload:
    - `README.md`
    - Latest `lighthouse-report.html` (from Netlify or local run)
    - Key modeling doc excerpts from `landing-page-content-models` v2 (Bucket 1 only).
  - Use this project as the default context for AgentOps checkpoints related to the landing page.
- [ ] **Checkpoint templates as reusable prompts**
  - Save 2–3 prompt templates in your workspace:
    - “SEO & Copy Review” (Hero + sections).
    - “UI/UX Review” (layout + tokens).
    - “Mapping/Modeling Review” (for when you touch mapping or fields).
  - This keeps the questions consistent and reduces friction each time you run a checkpoint.
- [ ] **Attach artifacts directly in sessions**
  - When doing a checkpoint:
    - Attach the exact files you’re working with (e.g. `HeroSection.tsx`, `Seo.tsx`, `PersonSchema.tsx`, relevant CSS).
    - Include any recent Lighthouse or content snapshots.
  - This lets the agent give more precise, code-aware feedback without you copy/pasting huge chunks every time.

These aren’t required for the landing page to work—but they make your **review loop** faster, more consistent, and more clearly demonstrable as an engineering practice.

---

## 10. AgentOps Workflow

For future tweaks:

1. Pick one focus: **SEO**, **Hero UI**, or **copy**.
2. Use `agent:build` to package:

   - Relevant components (Hero, Seo, PersonSchema, etc.).
   - Any updated copy or Lighthouse notes.
3. Ask your agent:

   - “How can I tighten this for hiring managers?”
   - “What small SEO adjustments would help without changing architecture?”
4. Apply changes and update:

   - `agent/CHECKPOINT_LOG.md` with what changed and why.

---

## 11. Deployment (Netlify)

### Link site (CLI)

```bash
netlify login
netlify link    # choose your Netlify site (e.g. narrative-interface-system)
```

### Set environment variables (CLI)

```bash
netlify env:set VITE_CONTENTFUL_SPACE_ID your_space_id
netlify env:set VITE_CONTENTFUL_ENVIRONMENT master
netlify env:set VITE_CONTENTFUL_DELIVERY_TOKEN your_delivery_token

# Ignore non-sensitive space ID in secrets scan
netlify env:set SECRETS_SCAN_OMIT_KEYS VITE_CONTENTFUL_SPACE_ID
```

### Deploy

```bash
npm run build
netlify deploy --prod
# Build command: npm run build
# Publish directory: dist
```
