import type { SiteCollectionItem } from '@/core/collections/loader';

type CaseContent = SiteCollectionItem<'cases'>['content'];

/** A case is on the Cases page and in "Other case studies" unless an editor hides it. */
export function isListedCase(content: CaseContent): boolean {
  return !content.hideInList;
}

/** The cover of a case card on the Cases page: its own, or the one of the Home block. */
export function listCoverOf(content: CaseContent) {
  return content.listCover ?? content.cover;
}
