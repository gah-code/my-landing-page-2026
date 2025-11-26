// src/data/page-personal-landing.ts

// ---------- Section type discriminants ----------

export type SectionType = 'hero' | 'timeline' | 'skills' | 'projects' | 'learning' | 'contact';
export type HeroStyle = 'typographic' | 'avatar' | 'image';

interface BaseSection {
  id: string;
  sectionType: SectionType;
  anchorId: string; // used for in-page navigation
  title?: string;
}

// ---------- Hero ----------

export interface HeroSection extends BaseSection {
  sectionType: 'hero';
  title: string;
  eyebrow?: string;
  tagline: string;
  intro: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  highlights?: string[];
  heroStyle?: HeroStyle;
  avatarUrl?: string;
  heroImageUrl?: string;
}

export interface HeroAction {
  label: string;
  href: string;
  kind?: 'primary' | 'secondary';
}

// ---------- Timeline ----------

export interface TimelineSection extends BaseSection {
  sectionType: 'timeline';
  title: string;
  items: TimelineItem[];
}

export type TimelineItemKind = 'role' | 'education' | 'milestone';

export interface TimelineItem {
  id: string;
  kind: TimelineItemKind;
  title: string;
  organization?: string;
  location?: string;
  startDate: string; // ISO-ish, e.g. "2022-01"
  endDate?: string; // "present" or undefined
  summary?: string;
  highlights?: string[];
  tags?: string[];
}

// ---------- Skills ----------

export interface SkillsSection extends BaseSection {
  sectionType: 'skills';
  title: string;
  groups: SkillGroup[];
}

export interface SkillGroup {
  id: string;
  label: string; // e.g. "Frontend", "Content"
  skills: SkillItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  level?: 'working' | 'strong' | 'expert';
  keywords?: string[];
}

// ---------- Projects ----------

export interface ProjectsSection extends BaseSection {
  sectionType: 'projects';
  title: string;
  featured?: boolean;
  projects: ProjectItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline?: string;
  summary: string;
  role?: string;
  period?: string;
  techStack?: string[];
  links?: ProjectLink[];
}

export interface ProjectLink {
  label: string;
  href: string;
  kind?: 'code' | 'demo' | 'case-study' | 'article' | 'other';
}

// ---------- Learning ----------

export interface LearningSection extends BaseSection {
  sectionType: 'learning';
  title: string;
  items: LearningItem[];
}

export interface LearningItem {
  id: string;
  topic: string;
  description?: string;
  status?: 'exploring' | 'practicing' | 'shipping';
  linkHref?: string;
  linkLabel?: string;
}

// ---------- Contact ----------

export interface ContactSection extends BaseSection {
  sectionType: 'contact';
  title: string;
  intro: string;
  email: string;
  links: ContactLink[];
}

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  kind?: 'email' | 'linkedin' | 'github' | 'x' | 'portfolio' | 'other';
}

// ---------- Union & Page ----------

export type PageSection =
  | HeroSection
  | TimelineSection
  | SkillsSection
  | ProjectsSection
  | LearningSection
  | ContactSection;

export interface PageMeta {
  title: string;
  description: string;
}

export interface PersonalLandingPage {
  slug: string;
  meta: PageMeta;
  sections: PageSection[];
}

// ---------- Concrete page instance ----------

export const personalLandingPage: PersonalLandingPage = {
  slug: '/',
  meta: {
    title: 'Gilberto Haro – Web Engineer & Creative Technologist',
    description:
      'Web engineer focused on dynamic applications, content platforms, and polished UX. Blending creative media roots with modern frontend engineering.',
  },
  sections: [
    {
      id: 'hero',
      sectionType: 'hero',
      anchorId: 'top',
      title: 'Gilberto Haro',
      eyebrow: 'Web Engineer · Creative Technologist',
      tagline: 'Building thoughtful web systems where design and engineering actually talk to each other.',
      intro:
        'I design and build responsive web platforms that connect marketing goals to stable, maintainable frontend architecture. From creative media to digital marketing to engineering, I’ve lived across the stack of how ideas become shipped experiences.',
      primaryAction: {
        label: 'View selected projects',
        href: '#projects',
        kind: 'primary',
      },
      secondaryAction: {
        label: 'Download resume',
        href: '/resume.pdf',
        kind: 'secondary',
      },
      highlights: [
        'Frontend engineering with a strong UX + content focus',
        'Experience spanning creative media, marketing, and engineering',
        'Committed to improving systems, not just individual pages',
      ],
    },
    {
      id: 'timeline',
      sectionType: 'timeline',
      anchorId: 'experience',
      title: 'Experience & Path',
      items: [
        {
          id: 'timeline-current-role',
          kind: 'role',
          title: 'Web Engineer / Web Technology Specialist',
          organization: 'Various teams',
          location: 'Remote · US',
          startDate: '2022-01',
          endDate: 'present',
          summary:
            'Building and improving web applications with a focus on content platforms, marketing sites, and frontend architecture.',
          highlights: [
            'Shipped conversion-focused pages with design and marketing partners.',
            'Streamlined workflows around content updates and deployments.',
            'Improved code quality with patterns, docs, and reviews.',
          ],
          tags: ['Web engineering', 'Frontend', 'Content platforms'],
        },
        {
          id: 'timeline-digital-marketing',
          kind: 'role',
          title: 'Digital Marketing & Web Production',
          organization: 'Previous roles',
          location: 'US',
          startDate: '2018-01',
          endDate: '2021-12',
          summary: 'Bridged the gap between creative teams and web development by owning implementation details.',
          highlights: [
            'Launched campaigns where copy, design, and implementation stayed in sync.',
            'Learned to speak both “creative” and “engineering” while tracking business goals.',
          ],
          tags: ['Digital marketing', 'Web production', 'Collaboration'],
        },
        {
          id: 'timeline-creative-media',
          kind: 'education',
          title: 'Creative Media Background',
          organization: 'Creative / Media Work',
          startDate: '2014-01',
          endDate: '2017-12',
          summary:
            'Hands-on work with visual storytelling, photography, and media production that still informs how I design interfaces.',
          tags: ['Creative media', 'Photography', 'Storytelling'],
        },
      ],
    },
    {
      id: 'skills',
      sectionType: 'skills',
      anchorId: 'skills',
      title: 'Skills & Focus',
      groups: [
        {
          id: 'skills-frontend',
          label: 'Frontend & Web Engineering',
          skills: [
            {
              id: 'skill-react',
              name: 'React / SPA architecture',
              level: 'strong',
              keywords: ['React', 'TypeScript', 'SPA', 'state management'],
            },
            {
              id: 'skill-ui',
              name: 'UI implementation',
              level: 'strong',
              keywords: ['Responsive design', 'Design systems', 'Accessibility'],
            },
            {
              id: 'skill-tooling',
              name: 'Tooling & workflows',
              level: 'working',
              keywords: ['Vite', 'ESLint', 'Prettier', 'Git workflows'],
            },
          ],
        },
        {
          id: 'skills-content',
          label: 'Content & Platforms',
          skills: [
            {
              id: 'skill-cms',
              name: 'Content platforms & CMS',
              level: 'strong',
              keywords: ['Contentful', 'Content modeling', 'Marketing sites'],
            },
            {
              id: 'skill-collab',
              name: 'Cross-team collaboration',
              level: 'strong',
              keywords: ['Marketing', 'Design', 'Product'],
            },
          ],
        },
        {
          id: 'skills-human',
          label: 'Ways of Working',
          skills: [
            {
              id: 'skill-agile',
              name: 'Agile & iterative delivery',
              level: 'working',
              keywords: ['Incremental improvements', 'Feedback loops'],
            },
            {
              id: 'skill-communication',
              name: 'Clear written communication',
              level: 'expert',
              keywords: ['Documentation', 'Specs', 'Change logs'],
            },
          ],
        },
      ],
    },
    {
      id: 'projects',
      sectionType: 'projects',
      anchorId: 'projects',
      title: 'Selected Projects',
      featured: true,
      projects: [
        {
          id: 'project-personal-platform',
          name: 'Personal Portfolio & Blog Platform',
          tagline: 'Agent-assisted, CMS-ready personal site.',
          summary:
            'A single-page personal site designed as a system: static data → UI prototype → Contentful model → production-ready platform.',
          role: 'Web Engineer · System Designer',
          period: '2024–2025',
          techStack: ['React', 'TypeScript', 'Vite', 'Contentful'],
          links: [
            {
              label: 'Live site',
              href: 'https://gilbertoharo.com',
              kind: 'demo',
            },
            // Add GitHub link later when repo is public
          ],
        },
        {
          id: 'project-marketing-sites',
          name: 'Marketing & Campaign Pages',
          tagline: 'From briefs to shipped landing pages.',
          summary:
            'Implemented and maintained campaign pages where marketing, design, and development needed to move together quickly while staying on-brand and performant.',
          role: 'Web Engineer / Web Producer',
          techStack: ['React', 'HTML/CSS', 'Analytics'],
        },
      ],
    },
    {
      id: 'learning',
      sectionType: 'learning',
      anchorId: 'learning',
      title: 'Currently Learning & Exploring',
      items: [
        {
          id: 'learning-architecture',
          topic: 'Frontend architecture at scale',
          description:
            'Patterns for long-lived React codebases and clean boundaries between content, layout, and logic.',
          status: 'practicing',
        },
        {
          id: 'learning-automation',
          topic: 'Developer workflows & automation',
          description: 'Using agents, scripts, and CI to catch issues earlier and keep the repo healthy.',
          status: 'exploring',
        },
        {
          id: 'learning-design',
          topic: 'Design systems & tokens',
          description: 'Alignment between design tokens, components, and CMS data models.',
          status: 'practicing',
        },
      ],
    },
    {
      id: 'contact',
      sectionType: 'contact',
      anchorId: 'contact',
      title: 'Let’s Work on Something',
      intro:
        'Interested in web platforms, content systems, or bringing more structure to your marketing site? I’m open to roles and collaborations where thoughtful engineering meets clear storytelling.',
      email: 'hello@gilbertoharo.com',
      links: [
        {
          id: 'contact-email',
          label: 'Email',
          href: 'mailto:hello@gilbertoharo.com',
          kind: 'email',
        },
        {
          id: 'contact-linkedin',
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/your-handle',
          kind: 'linkedin',
        },
        {
          id: 'contact-github',
          label: 'GitHub',
          href: 'https://github.com/your-user',
          kind: 'github',
        },
      ],
    },
  ],
};
