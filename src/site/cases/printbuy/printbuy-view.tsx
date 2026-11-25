/**
 * PrintBuy case study (/cases/printbuy): a unique page.
 * Styles: src/site/theme/case-printbuy.css (every class starts with `printbuy-`).
 */
import type { PageViewProps } from '@/core/content/page-route';

import { printbuyFontVariables } from '../../theme/fonts';
import { CaseAbout } from '../case-about';
import { CaseIntro } from '../case-intro';
import { RelatedCases } from '../related-cases';
import {
  PrintbuyBrand,
  PrintbuyCurve,
  PrintbuyHero,
  PrintbuyMobile,
  PrintbuyOutro,
  PrintbuyOverview,
  PrintbuyPhones,
  PrintbuySchedules,
  PrintbuyScreens,
  PrintbuyStructure,
  PrintbuyStudio,
  PrintbuySync,
  PrintbuyWorkshop,
} from './printbuy-blocks';
import { PrintbuyMotion } from './printbuy-motion';

export function PrintbuyView({ content, locale }: PageViewProps<'case-printbuy'>) {
  return (
    <>
      <CaseIntro content={content.intro} name={content.card.title} />
      <div className={`printbuy-case ${printbuyFontVariables}`}>
        <PrintbuyMotion />
        <PrintbuyHero hero={content.hero} />
        <PrintbuyOverview overview={content.overview} focus={content.focus} />
        <PrintbuySchedules schedules={content.schedules} />
        <PrintbuyCurve curve={content.curve} />
        <PrintbuySync sync={content.sync} />
        <PrintbuyStructure structure={content.structure} />
        <PrintbuyWorkshop workshop={content.workshop} />
        <PrintbuyScreens control={content.control} screens={content.screens} />
        <PrintbuyMobile mobile={content.mobile} />
        <PrintbuyPhones phones={content.phones} />
        <PrintbuyStudio studio={content.studio} />
        <PrintbuyBrand brand={content.brand} />
        <PrintbuyOutro outro={content.outro} />
      </div>
      <CaseAbout content={content['about-project']} />
      <RelatedCases content={content.related} current="printbuy" locale={locale} />
    </>
  );
}
