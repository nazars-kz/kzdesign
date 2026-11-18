/** Onground case study (/cases/onground): a unique page. Styles: src/site/theme/case-onground.css. */
import type { PageViewProps } from '@/core/content/page-route';

import { ongroundFontVariables } from '../../theme/fonts';
import { RelatedCases } from '../related-cases';
import { OngroundMotion } from './onground-motion';
import { OngroundArchitecture, OngroundDashboard, OngroundTypography } from './onground-mid';
import {
  OngroundAdmin,
  OngroundBooking,
  OngroundDetails,
  OngroundInbox,
  OngroundOutro,
} from './onground-end';
import {
  OngroundGoals,
  OngroundHero,
  OngroundOverview,
  OngroundProcess,
  OngroundVisuals,
} from './onground-top';

export function OngroundView({ content, locale }: PageViewProps<'case-onground'>) {
  return (
    <>
      <div className={`og-case ${ongroundFontVariables}`}>
        <OngroundMotion />
        <OngroundHero hero={content.hero} />
        <OngroundOverview overview={content.overview} />
        <OngroundProcess process={content.process} />
        <OngroundVisuals visuals={content.visuals} video={content.video} />
        <OngroundGoals goals={content.goals} />
        <OngroundArchitecture architecture={content.architecture} />
        <OngroundTypography typography={content.typography} />
        <OngroundDashboard dashboard={content.dashboard} />
        <OngroundBooking booking={content.booking} />
        <OngroundDetails details={content.details} />
        <OngroundInbox inbox={content.inbox} />
        <OngroundAdmin admin={content.admin} />
        <OngroundOutro outro={content.outro} />
      </div>
      <RelatedCases content={content.related} current="onground" locale={locale} />
    </>
  );
}
