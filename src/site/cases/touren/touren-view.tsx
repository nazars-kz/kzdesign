/**
 * Touren case study (/cases/touren): a unique page.
 * Styles: src/site/theme/case-touren.css (every class starts with `touren-`).
 */
import type { PageViewProps } from '@/core/content/page-route';

import { tourenFontVariables } from '../../theme/fonts';
import { CaseAbout } from '../case-about';
import { CaseIntro } from '../case-intro';
import { RelatedCases } from '../related-cases';
import {
  TourenCommunity,
  TourenConditions,
  TourenExplore,
  TourenHazard,
  TourenHome,
  TourenIdentity,
  TourenMission,
  TourenNavigation,
  TourenProfile,
} from './touren-app';
import {
  TourenBrief,
  TourenGoals,
  TourenHero,
  TourenProcess,
  TourenQuote,
  TourenShowcase,
  TourenSitemap,
} from './touren-intro';
import { TourenMotion } from './touren-motion';
import { TourenHighlights, TourenMobile, TourenOutro, TourenPages, TourenWeb } from './touren-web';

export function TourenView({ content, locale }: PageViewProps<'case-touren'>) {
  return (
    <>
      <CaseIntro content={content.intro} name={content.card.title} />
      <div className={`touren-case ${tourenFontVariables}`}>
        <TourenMotion />
        <TourenHero hero={content.hero} />
        <TourenBrief brief={content.brief} />
        <TourenProcess process={content.process} />
        <TourenGoals goals={content.goals} />
        <TourenSitemap sitemap={content.sitemap} />
        <TourenQuote quote={content.quote} />
        <TourenShowcase showcase={content.showcase} />
        <TourenIdentity identity={content.identity} />
        <TourenHome home={content.home} />
        <TourenCommunity community={content.community} />
        <TourenExplore explore={content.explore} />
        <TourenProfile profile={content.profile} />
        <TourenNavigation navigation={content.navigation} />
        <TourenMission mission={content.mission} />
        <TourenConditions conditions={content.conditions} />
        <TourenHazard hazard={content.hazard} />
        <TourenWeb web={content.web} />
        <TourenMobile mobile={content.mobile} />
        <TourenPages pages={content.pages} />
        <TourenHighlights highlights={content.highlights} />
        <TourenOutro outro={content.outro} />
      </div>
      <CaseAbout content={content['about-project']} />
      <RelatedCases content={content.related} current="touren" locale={locale} />
    </>
  );
}
