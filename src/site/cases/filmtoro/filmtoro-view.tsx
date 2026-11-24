/**
 * Filmtoro case study (/cases/filmtoro): a unique page.
 * Styles: src/site/theme/case-filmtoro.css (every class starts with `filmtoro-`).
 */
import type { PageViewProps } from '@/core/content/page-route';

import { filmtoroFontVariables } from '../../theme/fonts';
import { CaseAbout } from '../case-about';
import { CaseIntro } from '../case-intro';
import { RelatedCases } from '../related-cases';
import {
  FilmtoroCreate,
  FilmtoroHome,
  FilmtoroLists,
  FilmtoroOutro,
  FilmtoroPosts,
  FilmtoroProfile,
  FilmtoroQuizzes,
  FilmtoroReels,
} from './filmtoro-app';
import {
  FilmtoroAbout,
  FilmtoroArchitecture,
  FilmtoroBrand,
  FilmtoroCommunity,
  FilmtoroHero,
  FilmtoroIdentity,
  FilmtoroProcess,
  FilmtoroShowcase,
} from './filmtoro-intro';
import { FilmtoroMotion } from './filmtoro-motion';

export function FilmtoroView({ content, locale }: PageViewProps<'case-filmtoro'>) {
  return (
    <>
      <CaseIntro content={content.intro} name={content.card.title} />
      <div className={`filmtoro-case ${filmtoroFontVariables}`}>
        <FilmtoroMotion />
        <FilmtoroHero hero={content.hero} />
        <FilmtoroAbout about={content.about} />
        <FilmtoroProcess process={content.process} />
        <FilmtoroCommunity community={content.community} />
        <FilmtoroBrand brand={content.brand} />
        <FilmtoroArchitecture architecture={content.architecture} />
        <FilmtoroShowcase showcase={content.showcase} />
        <FilmtoroIdentity identity={content.identity} />
        <FilmtoroHome home={content.home} />
        <FilmtoroReels reels={content.reels} />
        <FilmtoroPosts posts={content.posts} />
        <FilmtoroProfile profile={content.profile} />
        <FilmtoroCreate create={content.create} />
        <FilmtoroLists lists={content.lists} />
        <FilmtoroQuizzes quizzes={content.quizzes} />
        <FilmtoroOutro outro={content.outro} />
      </div>
      <CaseAbout content={content['about-project']} />
      <RelatedCases content={content.related} current="filmtoro" locale={locale} />
    </>
  );
}
