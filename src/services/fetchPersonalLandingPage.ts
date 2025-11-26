// src/services/fetchPersonalLandingPage.ts
import type {
  PersonalLandingPage,
  PageSection,
  HeroSection,
  HeroStyle,
  TimelineSection,
  SkillsSection,
  ProjectsSection,
  LearningSection,
  ContactSection,
} from '../data/page-personal-landing';
import { contentfulClient } from './contentfulClient';

export type AnyEntry = {
  sys: {
    id: string;
    contentType: { sys: { id: string } };
  };
  fields: Record<string, unknown>;
};

interface PagePersonalLandingFields {
  slug: string;
  metaTitle: string;
  metaDescription?: string;
  sections?: AnyEntry[];
}

const SECTION_MAPPERS: Record<string, ((entry: AnyEntry) => PageSection) | undefined> = {
  sectionHero: mapHeroSection,
  sectionTimeline: mapTimelineSection,
  sectionSkills: mapSkillsSection,
  sectionProjects: mapProjectsSection,
  sectionLearning: mapLearningSection,
  sectionContact: mapContactSection,
};

// fetch the page entry and map it into your existing TS shape
export async function fetchPersonalLandingPage(): Promise<PersonalLandingPage> {
  const response = await contentfulClient.getEntries<PagePersonalLandingFields>({
    content_type: 'pagePersonalLanding',
    'fields.slug': '/',
    include: 4,
  });

  const entry = response.items[0];

  if (!entry) {
    throw new Error("pagePersonalLanding with slug '/' not found");
  }

  const fields = entry.fields;

  const sections: PageSection[] = safeArray(fields.sections)
    .map(mapSectionFromEntry)
    .filter(Boolean) as PageSection[];

  return {
    slug: fields.slug,
    meta: {
      title: fields.metaTitle,
      description: fields.metaDescription ?? '',
    },
    sections,
  };
}

// ---- Section mappers ----

export function mapSectionFromEntry(entry: AnyEntry): PageSection | null {
  const typeId = entry.sys.contentType.sys.id;
  const mapper = SECTION_MAPPERS[typeId];

  if (!mapper) {
    console.warn('[mapSectionFromEntry] Unsupported section type', typeId);
    return null;
  }

  return mapper(entry);
}

// HERO

export function mapHeroSection(entry: AnyEntry): HeroSection {
  const f = entry.fields;

  const rawStyle = f.heroStyle as string | undefined;
  const allowedStyles: HeroStyle[] = ['typographic', 'avatar', 'image'];
  const heroStyle: HeroStyle =
    rawStyle && allowedStyles.includes(rawStyle as HeroStyle) ? (rawStyle as HeroStyle) : 'typographic';

  const avatarAsset = f.avatarImage as AnyEntry | undefined;
  const heroImageAsset = f.heroImage as AnyEntry | undefined;

  const avatarUrl =
    avatarAsset?.fields?.file?.url ? ensureAssetUrl(avatarAsset.fields.file.url as string) : undefined;

  const heroImageUrl =
    heroImageAsset?.fields?.file?.url ? ensureAssetUrl(heroImageAsset.fields.file.url as string) : undefined;

  const effectiveStyle: HeroStyle =
    heroStyle === 'avatar' && avatarUrl
      ? 'avatar'
      : heroStyle === 'image' && heroImageUrl
        ? 'image'
        : 'typographic';

  return {
    id: entry.sys.id,
    sectionType: 'hero',
    anchorId: f.anchorId ?? entry.sys.id,
    title: f.title,
    eyebrow: f.eyebrow,
    tagline: f.tagline,
    intro: f.intro,
    primaryAction: f.primaryActionLabel
      ? {
          label: f.primaryActionLabel,
          href: f.primaryActionHref,
          kind: 'primary',
        }
      : undefined,
    secondaryAction: f.secondaryActionLabel
      ? {
          label: f.secondaryActionLabel,
          href: f.secondaryActionHref,
          kind: 'secondary',
        }
      : undefined,
    highlights: f.highlights || [],
    heroStyle: effectiveStyle,
    avatarUrl,
    heroImageUrl,
  };
}

// TIMELINE

function mapTimelineSection(entry: AnyEntry): TimelineSection {
  const f = entry.fields;
  const items = safeArray(f.items);

  return {
    id: entry.sys.id,
    sectionType: 'timeline',
    anchorId: f.anchorId ?? entry.sys.id,
    title: f.title,
    items: items.map((item: AnyEntry) => {
      const it = item.fields;
      return {
        id: item.sys.id,
        kind: it.kind,
        title: it.title,
        organization: it.organization,
        location: it.location,
        startDate: it.startDate,
        endDate: it.endDate,
        summary: it.summary,
        highlights: it.highlights || [],
        tags: it.tags || [],
      };
    }),
  };
}

// SKILLS

function mapSkillsSection(entry: AnyEntry): SkillsSection {
  const f = entry.fields;
  const groups = safeArray(f.groups);

  return {
    id: entry.sys.id,
    sectionType: 'skills',
    anchorId: f.anchorId ?? entry.sys.id,
    title: f.title,
    groups: groups.map((group: AnyEntry) => {
      const gf = group.fields;
      const skills = safeArray(gf.skills);

      return {
        id: group.sys.id,
        label: gf.label,
        skills: skills.map((skill: AnyEntry) => {
          const sf = skill.fields;
          return {
            id: skill.sys.id,
            name: sf.name,
            level: sf.level,
            keywords: sf.keywords || [],
          };
        }),
      };
    }),
  };
}

// PROJECTS

function mapProjectsSection(entry: AnyEntry): ProjectsSection {
  const f = entry.fields;
  const projects = safeArray(f.projects);

  return {
    id: entry.sys.id,
    sectionType: 'projects',
    anchorId: f.anchorId ?? entry.sys.id,
    title: f.title,
    // You can add `featured` later if you model it
    projects: projects.map((project: AnyEntry) => {
      const pf = project.fields;
      const links = safeArray(pf.links);

      return {
        id: project.sys.id,
        name: pf.name,
        tagline: pf.tagline,
        summary: pf.summary,
        role: pf.role,
        period: pf.period,
        techStack: pf.techStack || [],
        links: links.map((link: AnyEntry) => {
          const lf = link.fields;
          return {
            label: lf.label,
            href: lf.url,
            kind: lf.kind,
          };
        }),
      };
    }),
  };
}

// LEARNING

function mapLearningSection(entry: AnyEntry): LearningSection {
  const f = entry.fields;
  const items = safeArray(f.items);

  return {
    id: entry.sys.id,
    sectionType: 'learning',
    anchorId: f.anchorId ?? entry.sys.id,
    title: f.title,
    items: items.map((item: AnyEntry) => {
      const lf = item.fields;
      return {
        id: item.sys.id,
        topic: lf.topic,
        description: lf.description,
        status: lf.status,
        linkHref: lf.linkUrl,
        linkLabel: lf.linkLabel,
      };
    }),
  };
}

// CONTACT

function mapContactSection(entry: AnyEntry): ContactSection {
  const f = entry.fields;
  const links = safeArray(f.links);

  return {
    id: entry.sys.id,
    sectionType: 'contact',
    anchorId: f.anchorId ?? entry.sys.id,
    title: f.title,
    intro: f.intro,
    email: f.email,
    links: links.map((link: AnyEntry) => {
      const lf = link.fields;
      return {
        id: link.sys.id,
        label: lf.label,
        href: lf.url,
        kind: lf.kind,
      };
    }),
  };
}

// ---- helpers ----
function safeArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function ensureAssetUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return `https:${url}`;
}
