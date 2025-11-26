import type { HeroSection } from '../../data/page-personal-landing';

interface Props {
  section: HeroSection;
}

export function HeroSectionView({ section }: Props) {
  const {
    heroStyle = 'typographic',
    avatarUrl,
    heroImageUrl,
    eyebrow,
    title,
    tagline,
    intro,
    primaryAction,
    secondaryAction,
    highlights,
  } = section;

  const effectiveStyle =
    heroStyle === 'avatar' && avatarUrl
      ? 'avatar'
      : heroStyle === 'image' && heroImageUrl
        ? 'image'
        : 'typographic';

  return (
    <div className={`hero hero--${effectiveStyle}`}>
      <div className="hero-main">
        {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
        <h1 className="hero-title">{title}</h1>
        <p className="hero-tagline">{tagline}</p>
        <p className="hero-intro">{intro}</p>

        <div className="hero-actions">
          {primaryAction && (
            <a href={primaryAction.href} className="button button-primary">
              {primaryAction.label}
            </a>
          )}
          {secondaryAction && (
            <a href={secondaryAction.href} className="button button-secondary">
              {secondaryAction.label}
            </a>
          )}
        </div>

        {highlights && highlights.length > 0 && (
          <ul className="hero-highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {effectiveStyle === 'avatar' && avatarUrl && (
        <div className="hero-side hero-side--avatar">
          <img src={avatarUrl} alt={`Portrait of ${title}`} className="hero-avatar" />
        </div>
      )}

      {effectiveStyle === 'image' && heroImageUrl && (
        <div className="hero-side hero-side--image">
          <img src={heroImageUrl} alt="" className="hero-image" />
        </div>
      )}
    </div>
  );
}
