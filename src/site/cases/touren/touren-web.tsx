/**
 * Touren, the website part and the end of the page: the website block over the riders photo, the
 * mobile website, the website pages, the project summary cards and the team.
 */
import { SiteImage } from '../../components/ui/site-image';
import { Band, Shot } from './touren-intro';
import { Arrow, BlockHead, Icon, Intro, Lines, Rows, type TourenContent } from './touren-parts';

export function TourenWeb({ web }: { web: TourenContent['web'] }) {
  return (
    <section className="touren-feature touren-web" aria-labelledby="touren-web-title">
      <BlockHead head={web} id="touren-web-title" stacked />
      <Intro lead={web.lead} note={web.note} />
      <div className="touren-idea">
        <SiteImage
          image={web.photo}
          sizes="(min-width: 120rem) 1920px, (max-width: 47.9375rem) 200vw, 100vw"
          className="touren-idea__photo"
        />
        <div className="touren-idea__body">
          {web.photoTitle ? (
            <h3 className="touren-idea__title">
              <Lines text={web.photoTitle} />
            </h3>
          ) : null}
          <div className="touren-idea__bar">
            {web.photoText ? <p className="touren-idea__text">{web.photoText}</p> : null}
            {web.steps.length > 0 ? (
              <ul className="touren-idea__steps">
                {web.steps.map((step, index) => (
                  <li key={`${index}-${step}`}>
                    {step} <Arrow />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      <Band image={web.laptop} className="touren-web__laptop" />
    </section>
  );
}

export function TourenMobile({ mobile }: { mobile: TourenContent['mobile'] }) {
  return (
    <section className="touren-mobile" aria-labelledby="touren-mobile-title">
      <div className="touren-mobile__stage">
        <Shot
          image={mobile.phone}
          sizes="(max-width: 63.9375rem) 80vw, 40vw"
          className="touren-mobile__phone"
        />
      </div>
      <div className="touren-mobile__dark">
        <h2 id="touren-mobile-title" className="touren-mobile__title">
          <Rows text={mobile.title} />
        </h2>
        {mobile.lead ? <p className="touren-mobile__lead">{mobile.lead}</p> : null}
        {mobile.note ? <p className="touren-mobile__note">{mobile.note}</p> : null}
        {mobile.year ? (
          <p className="touren-mobile__year" aria-hidden="true">
            {mobile.year}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function TourenPages({ pages }: { pages: TourenContent['pages'] }) {
  return (
    <section className="touren-feature touren-pages" aria-labelledby="touren-pages-title">
      <BlockHead head={pages} id="touren-pages-title" stacked />
      <div className="touren-intro">
        {pages.lead ? <p className="touren-lead">{pages.lead}</p> : <span />}
        {pages.links.length > 0 ? (
          <ul className="touren-side touren-pages__links">
            {pages.links.map((link, index) => (
              <li key={`${index}-${link}`}>
                {link} <Arrow />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <Band image={pages.image} className="touren-pages__band" />
    </section>
  );
}

export function TourenHighlights({ highlights: h }: { highlights: TourenContent['highlights'] }) {
  return (
    <section className="touren-feature touren-highlights" aria-labelledby="touren-highlights-title">
      <BlockHead head={h} id="touren-highlights-title" className="touren-head--warm" />
      <ul className="touren-cards">
        <li className="touren-card touren-card--review">
          <figure className="touren-card__inner">
            <figcaption className="touren-card__person">
              <SiteImage image={h.reviewPhoto} sizes="5rem" className="touren-card__avatar" />
              <span>
                <span className="touren-card__name">
                  {h.reviewName}
                  {h.reviewFlag ? (
                    <SiteImage image={h.reviewFlag} sizes="1.5rem" className="touren-card__flag" />
                  ) : null}
                </span>
                {h.reviewRole ? <span className="touren-card__role">{h.reviewRole}</span> : null}
              </span>
            </figcaption>
            <blockquote className="touren-card__quote">
              {h.reviewTitle ? <p className="touren-card__title">{h.reviewTitle}</p> : null}
              {h.reviewTexts.length > 0 ? (
                <div className="touren-card__texts">
                  {h.reviewTexts.map((text, index) => (
                    <p key={`${index}-${text}`}>{text}</p>
                  ))}
                </div>
              ) : null}
            </blockquote>
          </figure>
        </li>
        <li className="touren-card touren-card--scope">
          <div className="touren-card__inner">
            <h3 className="touren-card__label">
              <span className="touren-card__badge">
                <Icon name="bars" />
              </span>
              {h.scopeTitle}
            </h3>
            {h.scopeText ? <p className="touren-card__title">{h.scopeText}</p> : null}
            {h.stats.length > 0 ? (
              <dl className="touren-stats">
                {h.stats.map((stat) => (
                  <div key={stat._key} className="touren-stat">
                    <dt className="touren-stat__label">{stat.label}</dt>
                    <dd className="touren-stat__value">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </li>
        <li className="touren-card touren-card--story">
          <SiteImage
            image={h.storyPhoto}
            sizes="(max-width: 63.9375rem) 90vw, 38vw"
            className="touren-card__photo"
          />
          <div className="touren-card__inner">
            <h3 className="touren-card__label">
              <span className="touren-card__badge">
                <Icon name="route" />
              </span>
              {h.storyTitle}
            </h3>
            {h.storyText ? <p className="touren-card__title">{h.storyText}</p> : null}
            {h.storyNote ? <p className="touren-card__note">{h.storyNote}</p> : null}
          </div>
        </li>
      </ul>
    </section>
  );
}

export function TourenOutro({ outro }: { outro: TourenContent['outro'] }) {
  return (
    <section className="touren-outro" aria-labelledby="touren-outro-title">
      <div className="touren-outro__circle">
        <h2 id="touren-outro-title" className="touren-outro__title">
          <Rows text={outro.title} />
        </h2>
      </div>
      {outro.team.length > 0 ? (
        <ul className="touren-team">
          {outro.team.map((member) => (
            <li key={member._key} className="touren-member">
              <SiteImage image={member.photo} sizes="7rem" className="touren-member__photo" />
              {member.role ? <p className="touren-member__role">{member.role}</p> : null}
              <p className="touren-member__name">{member.name}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
