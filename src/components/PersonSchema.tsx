// src/components/PersonSchema.tsx
export function PersonSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gilberto Alejandro Haro',
    jobTitle: 'Web Engineer & Content Systems',
    description:
      'Web engineer focused on content platforms, marketing systems, and polished UX, blending creative media roots with modern frontend engineering.',
    url: 'https://gilbertoharo.com',
    sameAs: [
      'https://www.linkedin.com/in/gilberto-haro-2b108222b/',
      'https://github.com/gah-code',
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
