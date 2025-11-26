import { describe, expect, it } from 'vitest';
import type { HeroSection } from '../data/page-personal-landing';
import type { AnyEntry } from './fetchPersonalLandingPage';
import { mapSectionFromEntry, mapHeroSection } from './fetchPersonalLandingPage';

function makeEntry(typeId: string, fields: Record<string, unknown>) {
  return {
    sys: {
      id: 'test-id',
      contentType: { sys: { id: typeId } },
    },
    fields,
  };
}

describe('mapSectionFromEntry', () => {
  it('maps a sectionHero entry into a HeroSection', () => {
    const entry = makeEntry('sectionHero', {
      anchorId: 'top',
      title: 'Gilberto Haro',
      eyebrow: 'Web Engineer',
      tagline: 'I build web platforms.',
      intro: 'Short intro.',
      primaryActionLabel: 'View projects',
      primaryActionHref: '#projects',
      highlights: ['Highlight one', 'Highlight two'],
    });

    const mapped = mapSectionFromEntry(entry) as HeroSection;

    expect(mapped?.sectionType).toBe('hero');
    expect(mapped?.anchorId).toBe('top');
    expect(mapped?.title).toBe('Gilberto Haro');
    expect(mapped?.primaryAction).toEqual({
      label: 'View projects',
      href: '#projects',
      kind: 'primary',
    });
    expect(mapped?.highlights).toEqual(['Highlight one', 'Highlight two']);
  });

  it('returns null for unsupported content types', () => {
    const badEntry = makeEntry('unknownType', {}) as AnyEntry;

    const result = mapSectionFromEntry(badEntry);

    expect(result).toBeNull();
  });
});

function makeHeroEntry(fields: Record<string, unknown>) {
  return {
    sys: {
      id: 'hero-id',
      contentType: { sys: { id: 'sectionHero' } },
    },
    fields,
  } as AnyEntry;
}

describe('mapHeroSection heroStyle mapping', () => {
  it('defaults to typographic when heroStyle is missing', () => {
    const entry = makeHeroEntry({
      anchorId: 'top',
      title: 'Gilberto Haro',
      tagline: 'Tagline',
      intro: 'Intro',
    });

    const mapped = mapHeroSection(entry) as HeroSection;
    expect(mapped.heroStyle).toBe('typographic');
  });

  it('maps avatar style and avatarUrl when asset is present', () => {
    const entry = makeHeroEntry({
      anchorId: 'top',
      title: 'Gilberto Haro',
      tagline: 'Tagline',
      intro: 'Intro',
      heroStyle: 'avatar',
      avatarImage: {
        fields: { file: { url: '//images.ctfassets.net/some-avatar.png' } },
      },
    });

    const mapped = mapHeroSection(entry) as HeroSection;
    expect(mapped.heroStyle).toBe('avatar');
    expect(mapped.avatarUrl).toContain('https://');
  });

  it('falls back to typographic if avatar style has no avatar image', () => {
    const entry = makeHeroEntry({
      anchorId: 'top',
      title: 'Gilberto Haro',
      tagline: 'Tagline',
      intro: 'Intro',
      heroStyle: 'avatar',
    });

    const mapped = mapHeroSection(entry) as HeroSection;
    expect(mapped.heroStyle).toBe('typographic');
    expect(mapped.avatarUrl).toBeUndefined();
  });

  it('falls back to typographic if image style has no hero image', () => {
    const entry = makeHeroEntry({
      anchorId: 'top',
      title: 'Gilberto Haro',
      tagline: 'Tagline',
      intro: 'Intro',
      heroStyle: 'image',
    });

    const mapped = mapHeroSection(entry) as HeroSection;
    expect(mapped.heroStyle).toBe('typographic');
    expect(mapped.heroImageUrl).toBeUndefined();
  });
});
