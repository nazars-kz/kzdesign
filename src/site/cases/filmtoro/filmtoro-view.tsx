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
  FilmtoroAbout,
  FilmtoroArchitecture,
  FilmtoroBrand,
  FilmtoroCommunity,
  FilmtoroCreate,
  FilmtoroDetails,
  FilmtoroDiscover,
  FilmtoroHero,
  FilmtoroHome,
  FilmtoroIdentity,
  FilmtoroLists,
  FilmtoroPosts,
  FilmtoroProcess,
  FilmtoroProfile,
  FilmtoroQuizzes,
  FilmtoroReels,
  FilmtoroShowcase,
} from './filmtoro-blocks';
import { FilmtoroMotion } from './filmtoro-motion';

export function FilmtoroView({ content, locale }: PageViewProps<'case-filmtoro'>) {
  return (
    <>
      <CaseIntro content={content.intro} name={content.card.title} />
      <div className={`filmtoro-case ${filmtoroFontVariables}`}>
        <FilmtoroMotion />
        <FilmtoroHero content={content.hero} />
        <FilmtoroAbout content={content.about} />
        <FilmtoroProcess content={content.process} />
        <FilmtoroCommunity content={content.community} />
        <FilmtoroBrand content={content.brand} />
        <FilmtoroArchitecture content={content.architecture} />
        <FilmtoroShowcase content={content.showcase} />
        <FilmtoroIdentity content={content.identity} />
        <FilmtoroHome content={content.home} />
        <FilmtoroDiscover content={content.discover} />
        <FilmtoroReels content={content.reels} />
        <FilmtoroPosts content={content.posts} />
        <FilmtoroProfile content={content.profile} />
        <FilmtoroDetails content={content.details} />
        <FilmtoroCreate content={content.create} />
        <FilmtoroLists content={content.lists} />
        <FilmtoroQuizzes content={content.quizzes} />
      </div>
      <CaseAbout content={content['about-project']} />
      <RelatedCases content={content.related} current="filmtoro" locale={locale} />
    </>
  );
}
