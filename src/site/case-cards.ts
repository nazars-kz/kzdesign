import { casePages, caseSlugOf } from '@/content/cases';
import type { ResolvedImage } from '@/core/content/define';
import { getPageContent } from '@/core/content/loader';
import { localizeHref } from '@/core/i18n/href';

/** What the site needs to show a case study as a card (lists, Home, Industries, service pages). */
export interface CaseCardData {
  readonly slug: string;
  /** Localized address of the case page. */
  readonly href: string;
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly categories: readonly string[];
  readonly cover: ResolvedImage | null;
  readonly coverMobile: ResolvedImage | null;
  readonly hidden: boolean;
  readonly showOnHome: boolean;
  readonly homeOrder: number | null;
  readonly homeDescription: string;
  readonly homeTags: readonly string[];
  readonly industries: readonly string[];
  readonly industryLabel: string;
  readonly industryThumb: ResolvedImage | null;
  readonly industryOrder: number | null;
}

/**
 * The cards of every case study (the "Card" section of each case page), in the order of the
 * lists. Reads the pages through the content loaders, so unedited fields come from the seeds.
 */
export async function getCaseCards(locale: string): Promise<CaseCardData[]> {
  const cards = await Promise.all(
    casePages.map(async (page): Promise<CaseCardData> => {
      const { card } = await getPageContent(page.id, locale);
      return {
        slug: caseSlugOf(page),
        href: await localizeHref(page.path),
        order: card.order,
        title: card.title,
        description: card.description,
        tags: card.tags,
        categories: card.categories,
        cover: card.cover,
        coverMobile: card.coverMobile,
        hidden: card.hidden,
        showOnHome: card.showOnHome,
        homeOrder: card.homeOrder || null,
        homeDescription: card.homeDescription,
        homeTags: card.homeTags,
        industries: card.industries,
        industryLabel: card.industryLabel,
        industryThumb: card.industryThumb,
        industryOrder: card.industryOrder || null,
      };
    }),
  );
  return cards.sort((a, b) => a.order - b.order);
}

/** The cards shown on the lists (everything not hidden). */
export async function getListedCases(locale: string): Promise<CaseCardData[]> {
  return (await getCaseCards(locale)).filter((card) => !card.hidden);
}
