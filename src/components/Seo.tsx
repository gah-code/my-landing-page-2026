// src/components/Seo.tsx
import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

const DEFAULT_TITLE = 'Gilberto Haro – Web Engineer & Content Systems';
const DEFAULT_DESCRIPTION =
  'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.';
const DEFAULT_URL = 'https://gilbertoharo.com';
const DEFAULT_OG_IMAGE = 'https://gilbertoharo.com/og/landing-default.png';

function ensureMeta(target: { name?: string; property?: string }) {
  const selector = target.name
    ? `meta[name="${target.name}"]`
    : `meta[property="${target.property}"]`;

  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if (target.name) el.name = target.name;
    if (target.property) el.setAttribute('property', target.property);
    document.head.appendChild(el);
  }
  return el;
}

export function Seo(props: SeoProps) {
  const { title, description, url = DEFAULT_URL, imageUrl = DEFAULT_OG_IMAGE } = props;

  useEffect(() => {
    const nextTitle = title && title.trim().length > 0 ? title : DEFAULT_TITLE;
    const nextDescription =
      description && description.trim().length > 0 ? description : DEFAULT_DESCRIPTION;

    const prevTitle = document.title;
    document.title = nextTitle;

    // Meta description
    const metaDesc = ensureMeta({ name: 'description' });
    metaDesc.setAttribute('content', nextDescription);

    // Open Graph basics
    const ogTitle = ensureMeta({ property: 'og:title' });
    ogTitle.setAttribute('content', nextTitle);

    const ogDesc = ensureMeta({ property: 'og:description' });
    ogDesc.setAttribute('content', nextDescription);

    const ogType = ensureMeta({ property: 'og:type' });
    ogType.setAttribute('content', 'website');

    const ogUrl = ensureMeta({ property: 'og:url' });
    ogUrl.setAttribute('content', url);

    const ogImage = ensureMeta({ property: 'og:image' });
    ogImage.setAttribute('content', imageUrl);

    // Ensure lang is set if index.html missed it
    if (!document.documentElement.getAttribute('lang')) {
      document.documentElement.setAttribute('lang', 'en');
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, url, imageUrl]);

  return null;
}

// import { useEffect } from 'react';

// interface SeoProps {
//   title: string;
//   description?: string;
// }

// const DEFAULT_TITLE = 'Gilberto Haro – Web Engineer & Creative Technologist';
// const DEFAULT_DESCRIPTION =
//   'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.';

// export function Seo({ title, description }: SeoProps) {
//   useEffect(() => {
//     const prevTitle = document.title;
//     document.title = title;

//     const metaDesc =
//       document.querySelector('meta[name="description"]') ??
//       (() => {
//         const m = document.createElement('meta');
//         m.name = 'description';
//         document.head.appendChild(m);
//         return m;
//       })();

//     if (description) {
//       metaDesc.setAttribute('content', description);
//     }

//     return () => {
//       document.title = prevTitle;
//     };
//   }, [title, description]);

//   return null;
// }
