# Agent Checkpoint: Landing Page SEO Polish (Phase 9.1)

## Context

- Live on Netlify.
- Powered by Contentful (single `pagePersonalLanding` entry with `slug: "/"`).
- Already has baseline SEO (title, description, headings), JSON-LD Person schema, and Lighthouse plugin integrated.
- Goal: polish SEO for `<title>` + `<meta name="description">`, JSON-LD Person schema (`PersonSchema.tsx`), Open Graph meta tags + OG image, and narrative scan-ability for recruiters.

---

## 1. Site + Identity Data (fill these in)

**Canonical domain**
- domain: `https://gilbertoharo.com`

**Person / brand info**
- name: `Gilberto Alejandro Haro`
- role / tagline: `Web Engineer & Creative Technologist`
- about (short sentence): `Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.`

**Social profiles (for Person schema & Contact section)**
- LinkedIn: `https://www.linkedin.com/in/gilberto-haro-2b108222b/`
- GitHub: `https://github.com/gah-code`
- Portfolio (if different from domain): `[TBD]`
- Other (optional):
  - `https://x.com/[TBD]`
  - `https://[TBD]`

---

## 2. SEO Text Candidates

**Current / candidate `<title>`**
- currentTitle: `Gilberto Haro – Web Engineer & Creative Technologist` (from `page-personal-landing.meta.title` and `Seo.tsx` default)
- preferredPattern (ideal pattern, if different): `Gilberto Alejandro Haro – Web Engineer & Creative Technologist`

**Current / candidate `<meta name="description">`**
- currentDescription: `Web engineer focused on dynamic applications, content platforms, and polished UX. Blending creative media roots with modern frontend engineering.` (from `page-personal-landing.meta.description`)
- constraints / intent: Emphasize content platforms, marketing systems, UX, and frontend engineering; highlight openness to roles and collaborations.

---

## 3. OG / Social Preview Data

**OG image**
- ogImagePath: `[TBD - no OG image found in repo]`
- ogImageDescription: `[TBD - describe desired social card look/branding]`

**Preferred social share text (optional)**
- ogShareLine: `[TBD]`

---

## 4. Content Snippets (for narrative review)

**Hero copy (current)**
```
[Web Engineer · Creative Technologist/Gilberto Haro/Building thoughtful web systems where design and engineering actually talk to each other./I design and build responsive web platforms that connect marketing goals to stable, maintainable frontend architecture. From creative media to digital marketing to engineering, I've lived across the stack of how ideas become shipped experiences.]
```

**Section headings + intros**
- Experience section title + intro: `Experience & Path` — intro: `[No intro sentence currently in data]`
- Skills section title + intro: `Skills & Focus` — intro: `[No intro sentence currently in data]`
- Projects section title + intro: `Selected Projects` — intro: `[No intro sentence currently in data]`
- Learning section title + intro: `Currently Learning & Exploring` — intro: `[No intro sentence currently in data]`
- Contact section title + intro / CTA: `Let's Work on Something` — intro: `Interested in web platforms, content systems, or bringing more structure to your marketing site? I'm open to roles and collaborations where thoughtful engineering meets clear storytelling.`

---

## 5. Artifacts (code / config to review)

Files:

- `src/components/Seo.tsx`
```tsx
import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
}

const DEFAULT_TITLE = 'Gilberto Haro – Web Engineer & Creative Technologist';
const DEFAULT_DESCRIPTION =
  'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.';

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const prevTitle = document.title;
    const nextTitle = title || DEFAULT_TITLE;
    document.title = nextTitle;

    const metaDesc =
      document.querySelector('meta[name=\"description\"]') ??
      (() => {
        const m = document.createElement('meta');
        m.name = 'description';
        document.head.appendChild(m);
        return m;
      })();

    metaDesc.setAttribute(
      'content',
      description && description.trim().length > 0 ? description : DEFAULT_DESCRIPTION
    );

    // Optional: ensure lang is set, in case index.html forgot
    if (!document.documentElement.getAttribute('lang')) {
      document.documentElement.setAttribute('lang', 'en');
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);

  return null;
}
```

- `src/components/PersonSchema.tsx`
```tsx
export function PersonSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gilberto Haro',
    jobTitle: 'Web Engineer & Creative Technologist',
    description:
      'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.',
    url: 'https://gilbertoharo.com',
    sameAs: ['https://www.linkedin.com/in/your-handle', 'https://github.com/your-user'],
  };

  return <script type=\"application/ld+json\">{JSON.stringify(data)}</script>;
}
```

- `index.html` (head)
```html
<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>gharo-ui-prototype</title>
  </head>
```

- `netlify.toml` (Lighthouse plugin enabled)
```toml
[build]
  command = \"npm run build\"
  publish = \"dist\"

[build.environment]
  NODE_VERSION = \"20\"

[[plugins]]
  package = \"@netlify/plugin-lighthouse\"
  [plugins.inputs]
    output_path = \"lighthouse-report.html\"
```

---

## 6. Current Lighthouse summary (latest run)
- Performance: `[TBD]`
- Accessibility: `[TBD]`
- Best Practices: `[TBD]`
- SEO: `[TBD]`
- Any SEO or A11y warnings Lighthouse raised: `[TBD - list top 3-5 notes]`

---

## 7. Questions for the Agent

**SEO / content**
- Given the data and current implementation of `Seo.tsx` and `PersonSchema.tsx`, how would you refine: the `<title>` and meta description for my landing page? The JSON-LD Person schema (fields/wording) to better support personal-brand search? Does my current hero + section copy read clearly for recruiters and hiring managers?
- Suggest small, high-impact edits (phrasing, ordering) that improve scan-ability and clarity.

**Technical / implementation**
- Are there any issues or improvements you see in how I'm managing meta tags (title, description, OG), structured data injection (Person schema), or the way `Seo.tsx` updates the document head in a SPA?
- Is there anything else you would add to this landing page's SEO setup that does not require changing the architecture (still SPA) but meaningfully improves search and social previews?

---

## 8. Constraints / Preferences
- Keep this a single-page SPA.
- Do not add SSR/SSG right now. Do not turn this into a blog or multi-page site in this repo.
- Priorities: clarity for humans (recruiters, collaborators); solid SEO for my name + "web engineer / content systems / frontend" style queries; clean, maintainable implementation in `Seo.tsx` and `PersonSchema.tsx`.
