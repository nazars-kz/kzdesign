/**
 * Filmtoro, second part of the page: the app features (home and navigation, reels, posts,
 * profile, creating posts and lists, quizzes) and the team.
 */
import { Fragment } from 'react';

import { SiteImage } from '../../components/ui/site-image';
import { type FilmtoroContent, Head, Picture, Rows, SIZES } from './filmtoro-parts';

export function FilmtoroHome({ home }: { home: FilmtoroContent['home'] }) {
  return (
    <section className="filmtoro-home" aria-labelledby="filmtoro-home-title">
      <Head id="filmtoro-home-title" head={home} className="filmtoro-head--split" />
      <Picture image={home.phones} sizes={SIZES.wide} className="filmtoro-home__phones" />
      <div className="filmtoro-split filmtoro-discover">
        <span className="filmtoro-panel filmtoro-panel--coral" />
        <span className="filmtoro-panel filmtoro-panel--dark" />
        <Picture
          image={home.searchPhone}
          sizes={SIZES.phone}
          className="filmtoro-discover__search"
        />
        <Picture
          image={home.notificationsPhone}
          sizes={SIZES.phone}
          className="filmtoro-discover__notifications"
        />
        {home.discoverNote ? (
          <p className="filmtoro-note filmtoro-split__note">{home.discoverNote}</p>
        ) : null}
      </div>
    </section>
  );
}

export function FilmtoroReels({ reels }: { reels: FilmtoroContent['reels'] }) {
  return (
    <section className="filmtoro-reels" aria-labelledby="filmtoro-reels-title">
      <Picture
        image={reels.background}
        sizes={SIZES.full}
        decorative
        className="filmtoro-reels__bg"
      />
      <Head id="filmtoro-reels-title" head={reels} className="filmtoro-head--split" />
      <Picture image={reels.phones} sizes={SIZES.wide} className="filmtoro-reels__phones" />
    </section>
  );
}

export function FilmtoroPosts({ posts }: { posts: FilmtoroContent['posts'] }) {
  return (
    <section className="filmtoro-posts" aria-labelledby="filmtoro-posts-title">
      <Head id="filmtoro-posts-title" head={posts} className="filmtoro-head--pair" />
      <Picture image={posts.phones} sizes={SIZES.wide} className="filmtoro-posts__phones" />
    </section>
  );
}

export function FilmtoroProfile({ profile }: { profile: FilmtoroContent['profile'] }) {
  return (
    <section className="filmtoro-profile" aria-labelledby="filmtoro-profile-title">
      <Head
        id="filmtoro-profile-title"
        head={{ title: profile.title, lead: profile.lead }}
        className="filmtoro-head--stack"
      />
      <div className="filmtoro-split filmtoro-profile__scene">
        <span className="filmtoro-panel filmtoro-panel--coral" />
        <span className="filmtoro-panel filmtoro-panel--dark" />
        <Picture
          image={profile.postsPhone}
          sizes={SIZES.phone}
          className="filmtoro-profile__posts"
        />
        <Picture
          image={profile.followersPhone}
          sizes={SIZES.phone}
          className="filmtoro-profile__followers"
        />
        {profile.note ? <p className="filmtoro-note filmtoro-split__note">{profile.note}</p> : null}
      </div>
    </section>
  );
}

export function FilmtoroCreate({ create }: { create: FilmtoroContent['create'] }) {
  return (
    <section className="filmtoro-create" aria-labelledby="filmtoro-create-title">
      <Head
        id="filmtoro-create-title"
        head={{ title: create.title, note: create.lead }}
        className="filmtoro-head--split"
      />
      <div className="filmtoro-phones filmtoro-create__phones">
        <Picture image={create.post} sizes={SIZES.phone} className="filmtoro-create__post" />
        <Picture image={create.list} sizes={SIZES.phone} className="filmtoro-create__list" />
        <Picture image={create.review} sizes={SIZES.phone} className="filmtoro-create__review" />
        <Picture image={create.gif} sizes={SIZES.phone} className="filmtoro-create__gif" />
        {create.note ? <p className="filmtoro-note filmtoro-create__note">{create.note}</p> : null}
      </div>
    </section>
  );
}

export function FilmtoroLists({ lists }: { lists: FilmtoroContent['lists'] }) {
  return (
    <section className="filmtoro-lists" aria-labelledby="filmtoro-lists-title">
      <Head id="filmtoro-lists-title" head={lists} className="filmtoro-head--pair" />
      <div className="filmtoro-lists__row">
        <Picture
          image={lists.tile}
          sizes={SIZES.half}
          className="filmtoro-tile filmtoro-lists__tile"
        />
        <Picture image={lists.phone} sizes={SIZES.phone} className="filmtoro-lists__phone" />
      </div>
      <div className="filmtoro-band">
        <Picture image={lists.bandPhone} sizes={SIZES.wide} className="filmtoro-band__phone" />
      </div>
    </section>
  );
}

export function FilmtoroQuizzes({ quizzes }: { quizzes: FilmtoroContent['quizzes'] }) {
  return (
    <section className="filmtoro-quizzes" aria-labelledby="filmtoro-quizzes-title">
      <Head
        id="filmtoro-quizzes-title"
        head={{ title: quizzes.title, note: quizzes.lead }}
        className="filmtoro-head--split"
      />
      <div className="filmtoro-phones filmtoro-quizzes__phones">
        <Picture image={quizzes.intro} sizes={SIZES.phone} className="filmtoro-quizzes__intro" />
        <Picture
          image={quizzes.ranking}
          sizes={SIZES.phone}
          className="filmtoro-quizzes__ranking"
        />
        <Picture image={quizzes.result} sizes={SIZES.phone} className="filmtoro-quizzes__result" />
        <Picture
          image={quizzes.question}
          sizes={SIZES.phone}
          className="filmtoro-quizzes__question"
        />
        {quizzes.note ? (
          <p className="filmtoro-note filmtoro-quizzes__note">{quizzes.note}</p>
        ) : null}
      </div>
    </section>
  );
}

/** How many times the word behind the team is repeated (it is cut at the window edge). */
const WORD_REPEAT = 6;

export function FilmtoroOutro({ outro }: { outro: FilmtoroContent['outro'] }) {
  return (
    <section className="filmtoro-outro" aria-labelledby="filmtoro-outro-title">
      <h2 id="filmtoro-outro-title" className="filmtoro-outro__title">
        <Rows text={outro.title} />
      </h2>
      {outro.team.length > 0 ? (
        <div className="filmtoro-team">
          {outro.word ? (
            <p className="filmtoro-team__word" aria-hidden="true">
              {Array.from({ length: WORD_REPEAT }, (_, index) => (
                <Fragment key={index}>{outro.word}</Fragment>
              ))}
            </p>
          ) : null}
          <ul className="filmtoro-team__faces" aria-hidden="true">
            {outro.team.map((member) => (
              <li key={member._key}>
                <SiteImage
                  image={member.photo ? { ...member.photo, alt: '' } : null}
                  sizes="6rem"
                  className="filmtoro-team__photo"
                />
              </li>
            ))}
          </ul>
          <ul className="filmtoro-team__list">
            {outro.team.map((member) => (
              <li key={member._key} className="filmtoro-member">
                {member.role ? <span className="filmtoro-member__role">{member.role}</span> : null}
                <span className="filmtoro-member__name">{member.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
