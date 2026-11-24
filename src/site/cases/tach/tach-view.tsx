/** Tach case study (/cases/tach): a unique page. Styles: src/site/theme/case-tach.css. */
import type { PageViewProps } from '@/core/content/page-route';

import { tachFontVariables } from '../../theme/fonts';
import { CaseAbout } from '../case-about';
import { CaseIntro } from '../case-intro';
import { RelatedCases } from '../related-cases';
import { TachBrand } from './tach-brand';
import { TachHero } from './tach-hero';
import { TachOverview, TachScene, TachShowcase, TachWorkflow } from './tach-intro';
import { TachMotion } from './tach-motion';
import { TachOutro } from './tach-outro';
import { TachAssets, TachFinances, TachPlatform, TachVendors } from './tach-platform';

export function TachView({ content, locale }: PageViewProps<'case-tach'>) {
  return (
    <>
      <CaseIntro content={content.intro} name={content.card.title} />
      <div className={`tach-case ${tachFontVariables}`}>
        <TachMotion />
        <TachHero hero={content.hero} avatar={content.card.industryThumb} />
        <div className="tach-body">
          <TachScene scene={content.scene} />
          <TachOverview overview={content.overview} />
          <TachWorkflow workflow={content.workflow} />
          <TachShowcase showcase={content.showcase} />
          <TachBrand brand={content.brand} hero={content.hero} />
          <TachPlatform platform={content.platform} />
          <TachFinances finances={content.finances} />
          <TachVendors vendors={content.vendors} />
          <TachAssets assets={content.assets} />
          <TachOutro outro={content.outro} />
        </div>
      </div>
      <CaseAbout content={content['about-project']} />
      <RelatedCases content={content.related} current="tach" locale={locale} />
    </>
  );
}
