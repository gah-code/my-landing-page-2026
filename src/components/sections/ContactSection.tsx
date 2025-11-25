import type { ContactSection } from '../../data/page-personal-landing';

interface Props {
  section: ContactSection;
}

export function ContactSectionView({ section }: Props) {
  return (
    <div className="contact">
      <h2>{section.title}</h2>
      <p className="contact-intro">{section.intro}</p>
      <div className="contact-links">
        <a href={`mailto:${section.email}`} className="button button-primary">
          Email me
        </a>
        {section.links.map((link) => (
          <a key={link.id} href={link.href} className="button button-secondary">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

//
