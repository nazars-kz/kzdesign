/** Signal Sigma, the end of the page: the summary list and the team over the rocks. */
import { SiteImage } from '../../components/ui/site-image';
import { BlockHead, type SigmaContent } from './sigma-intro';
import { Clover, Rows } from './sigma-parts';

export function SigmaSummary({
  summary,
  strip,
}: {
  summary: SigmaContent['summary'];
  strip: readonly string[];
}) {
  return (
    <section className="sigma-summary" aria-labelledby="sigma-summary-title">
      <BlockHead strip={strip} title={summary.title} text={summary.text} id="sigma-summary-title" />
      {summary.items.length > 0 ? (
        <ul className="sigma-results">
          {summary.items.map((item) => (
            <li key={item._key} className="sigma-result">
              <h3 className="sigma-result__title">
                <span className="sigma-result__mark" aria-hidden="true">
                  <Clover />
                </span>
                {item.title}
              </h3>
              {item.text ? <p className="sigma-result__text">{item.text}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function SigmaOutro({ outro }: { outro: SigmaContent['outro'] }) {
  return (
    <section className="sigma-outro" aria-labelledby="sigma-outro-title">
      <SiteImage
        image={outro.background ? { ...outro.background, alt: '' } : null}
        sizes="(max-width: 63.9375rem) 250vw, (min-width: 120rem) 1920px, 100vw"
        className="sigma-outro__bg"
      />
      <h2 id="sigma-outro-title" className="sigma-outro__title">
        <Rows text={outro.title} />
      </h2>
      {outro.team.length > 0 ? (
        <ul className="sigma-team">
          {outro.team.map((member) => (
            <li key={member._key} className="sigma-member">
              <SiteImage image={member.photo} sizes="8.5rem" className="sigma-member__photo" />
              <p className="sigma-member__name">{member.name}</p>
              {member.role ? <p className="sigma-member__role">{member.role}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {outro.closing ? <p className="sigma-outro__closing">{outro.closing}</p> : null}
    </section>
  );
}
