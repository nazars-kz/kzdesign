/**
 * Signal Sigma case study (/cases/signal-sigma): a unique page.
 * Styles: src/site/theme/case-signal-sigma.css (every class starts with `sigma-`).
 */
import type { PageViewProps } from '@/core/content/page-route';

import { signalSigmaFontVariables } from '../../theme/fonts';
import { CaseAbout } from '../case-about';
import { CaseIntro } from '../case-intro';
import { RelatedCases } from '../related-cases';
import {
  SigmaAbout,
  SigmaFeedback,
  SigmaHero,
  SigmaOverview,
  SigmaResearch,
  Wide,
} from './sigma-intro';
import { SigmaMotion } from './sigma-motion';
import { SigmaOutro, SigmaSummary } from './sigma-outro';
import {
  SigmaFundamentals,
  SigmaJournal,
  SigmaMeasurements,
  SigmaOrders,
  SigmaScreener,
  SigmaTechnical,
  SigmaUi,
  SigmaWatchlist,
} from './sigma-product';

/** The chapters of each part, in page order: a strip shows its part up to the current chapter. */
const upTo = (labels: readonly string[], index: number) => labels.slice(0, index + 1);

export function SignalSigmaView({ content, locale }: PageViewProps<'case-signal-sigma'>) {
  const story = [content.overview.chapter, content.feedback.chapter, content.about.chapter];
  const product = [
    content.ui.chapter,
    content.orders.chapter,
    content.watchlist.chapter,
    content.screener.chapter,
    content.journal.chapter,
    content.technical.chapter,
  ];
  return (
    <>
      <CaseIntro content={content.intro} name={content.card.title} />
      <div className={`sigma-case ${signalSigmaFontVariables}`}>
        <SigmaMotion />
        <SigmaHero hero={content.hero} />
        <SigmaOverview overview={content.overview} strip={upTo(story, 0)} />
        <SigmaFeedback feedback={content.feedback} strip={upTo(story, 1)} />
        <SigmaAbout about={content.about} strip={upTo(story, 2)} />
        <SigmaResearch research={content.research} />
        <Wide image={content.showcase.image} className="sigma-showcase" />
        <SigmaUi ui={content.ui} strip={upTo(product, 0)} />
        <SigmaMeasurements measurements={content.measurements} />
        <SigmaOrders orders={content.orders} strip={upTo(product, 1)} />
        <SigmaWatchlist watchlist={content.watchlist} strip={upTo(product, 2)} />
        <SigmaScreener screener={content.screener} strip={upTo(product, 3)} />
        <SigmaJournal journal={content.journal} strip={upTo(product, 4)} />
        <SigmaTechnical technical={content.technical} strip={upTo(product, 5)} />
        <SigmaFundamentals fundamentals={content.fundamentals} />
        <SigmaSummary summary={content.summary} strip={[content.summary.chapter]} />
        <SigmaOutro outro={content.outro} />
      </div>
      <CaseAbout content={content['about-project']} />
      <RelatedCases content={content.related} current="signal-sigma" locale={locale} />
    </>
  );
}
