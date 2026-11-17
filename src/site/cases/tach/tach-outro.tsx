import type { PageViewProps } from '@/core/content/page-route';

import { SiteImage } from '../../components/ui/site-image';
import { Accent, cssVars, Lines } from './tach-parts';

type Content = PageViewProps<'case-tach'>['content'];
type Founder = Content['outro']['founders'][number];

function FounderCard({ founder, side }: { founder: Founder; side: 'left' | 'right' }) {
  return (
    <figure className="tach-founder" data-side={side}>
      <SiteImage
        image={founder.photo}
        sizes="(min-width: 64rem) 18.75rem, 6rem"
        className="tach-founder__photo"
      />
      <figcaption className="tach-founder__caption">
        <span className="tach-founder__name">{founder.name}</span>
        <span className="tach-founder__role">{founder.role}</span>
      </figcaption>
    </figure>
  );
}

/** "See ya in the next case study" with the founders next to it, then the team of the case. */
export function TachOutro({ outro }: { outro: Content['outro'] }) {
  const lines = outro.title.split('\n');
  const [first, second] = outro.founders;
  const plainTitle = outro.title.replace(/\*/g, '').replace(/\n/g, ' ');
  return (
    <section className="tach-outro" aria-labelledby="tach-outro-title">
      <h2 id="tach-outro-title" className="sr-only">
        {plainTitle}
      </h2>
      <div className="tach-outro__lines">
        {lines.map((line, index) => (
          <div key={`${index}-${line}`} className="tach-outro__line" data-line={index}>
            {index === 1 && second ? <FounderCard founder={second} side="left" /> : null}
            <span className="tach-outro__text" aria-hidden="true">
              <Accent text={line} />
            </span>
            {index === 0 && first ? <FounderCard founder={first} side="right" /> : null}
          </div>
        ))}
      </div>
      <h3 className="sr-only">{outro.teamTitle}</h3>
      <ul className="tach-team">
        {outro.team.map((member) => (
          <li
            key={member._key}
            className="tach-member"
            style={cssVars({ '--tach-photo': member.photo?.width ?? 418 })}
          >
            <SiteImage
              image={member.photo}
              sizes="(min-width: 64rem) 16rem, 8rem"
              className="tach-member__photo"
            />
            <p className="tach-member__name">{member.name}</p>
            <p className="tach-member__role">
              <Lines text={member.role} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
