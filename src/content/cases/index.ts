/**
 * The case studies of the site, one unique page each. A new case is added here (and gets its own
 * route and view): see docs/project/CASES.md.
 */
import { filmtoroCase } from './filmtoro';
import { printbuyCase } from './printbuy';
import { signalSigmaCase } from './signal-sigma';
import { tachCase } from './tach';
import { tourenCase } from './touren';

export { CASE_CATEGORIES, INDUSTRIES } from './card';

export const casePages = [
  tachCase,
  signalSigmaCase,
  tourenCase,
  filmtoroCase,
  printbuyCase,
] as const;

export type CasePage = (typeof casePages)[number];

/** The end of a case address: `/cases/tach` → `tach`. */
export function caseSlugOf(page: Pick<CasePage, 'path'>): string {
  return page.path.replace(/^\/cases\//, '');
}

/** Whether a case study page exists for this slug (links to missing cases are left out). */
export function caseExists(slug: string): boolean {
  return casePages.some((page) => caseSlugOf(page) === slug);
}
