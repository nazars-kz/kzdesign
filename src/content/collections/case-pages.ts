/**
 * Seed content of the case pages (/cases/<slug>): details, client feedback and the exported
 * screens. Only these three cases have a full page; the others open the same template with the
 * parts they do not have left out. Add or change cases in Pages → Blog & lists → Case studies.
 */
import type { CasePageSeed } from './cases';

export const CASE_PAGES: Readonly<Record<string, CasePageSeed>> = {
  onground: {
    listCover: {
      asset: 'case-onground-list.webp',
      alt: 'Onground – Private Jet Cleaning Platform',
    },
    listCoverMobile: {
      asset: 'case-onground-list-mobile.webp',
      alt: 'Onground – Private Jet Cleaning Platform',
    },
    pageTitle: 'Onground – Private Jet Cleaning Platform',
    details: [
      { label: 'Industry', value: 'Cleaning' },
      { label: 'Platform', value: 'SaaS, Web App' },
      { label: 'Year', value: '2025' },
    ],
    quote:
      "K&Z Design completed the project on time and efficiently. K&Z Design completed the client's project on time and efficiently, meeting expectations. The team was responsive to the client's needs and provided timely deliverables throughout the engagement. Moreover, K&Z Design's communication and organization were hallmarks of their performance.",
    author: 'Executive',
    authorRole: 'Onground Systems',
    authorPhoto: { asset: 'case-onground-author.webp', alt: 'Executive' },
    authorFlag: { asset: 'flag-usa.png', alt: 'USA' },
    feedbackLead: 'K&Z Design completed the project on time and efficiently.',
    feedbackBody:
      "K&Z Design completed the client's project on time and efficiently, meeting expectations. The team was responsive to the client's needs and provided timely deliverables throughout the engagement. Moreover, K&Z Design's communication and organization were hallmarks of their performance.",
    feedbackVisual: {
      asset: 'case-onground-feedback.webp',
      alt: 'Onground – Private Jet Cleaning Platform client feedback',
    },
    screensDesktop: [
      {
        asset: 'case-onground-d01.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 1',
      },
      {
        asset: 'case-onground-d02.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 2',
      },
      {
        asset: 'case-onground-d03.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 3',
      },
      {
        asset: 'case-onground-d04.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 4',
      },
      {
        asset: 'case-onground-d05.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 5',
      },
      {
        asset: 'case-onground-d06.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 6',
      },
      {
        asset: 'case-onground-d07.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 7',
      },
      {
        asset: 'case-onground-d08.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 8',
      },
      {
        asset: 'case-onground-d09.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 9',
      },
      {
        asset: 'case-onground-d10.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 10',
      },
      {
        asset: 'case-onground-d11.webp',
        alt: 'Onground – Private Jet Cleaning Platform — screen 11',
      },
    ],
    screensMobile: [
      {
        asset: 'case-onground-m01.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 1',
      },
      {
        asset: 'case-onground-m02.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 2',
      },
      {
        asset: 'case-onground-m03.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 3',
      },
      {
        asset: 'case-onground-m04.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 4',
      },
      {
        asset: 'case-onground-m05.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 5',
      },
      {
        asset: 'case-onground-m06.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 6',
      },
      {
        asset: 'case-onground-m07.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 7',
      },
      {
        asset: 'case-onground-m08.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 8',
      },
      {
        asset: 'case-onground-m09.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 9',
      },
      {
        asset: 'case-onground-m10.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 10',
      },
      {
        asset: 'case-onground-m11.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 11',
      },
      {
        asset: 'case-onground-m12.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 12',
      },
      {
        asset: 'case-onground-m13.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 13',
      },
      {
        asset: 'case-onground-m14.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 14',
      },
      {
        asset: 'case-onground-m15.webp',
        alt: 'Onground – Private Jet Cleaning Platform — mobile screen 15',
      },
    ],
  },
  mynqs: {
    listCover: {
      asset: 'case-mynqs-list.webp',
      alt: 'MyNQS - Injury registry platform for the US National Quality System',
    },
    listCoverMobile: {
      asset: 'case-mynqs-list-mobile.webp',
      alt: 'MyNQS - Injury registry platform for the US National Quality System',
    },
    pageTitle: 'MyNQS - Injury registry platform for the US National Quality System',
    details: [
      { label: 'Industry', value: 'Health' },
      { label: 'Platform', value: 'SaaS, Web, UX/UI Design' },
      { label: 'Year', value: '2023' },
    ],
    quote:
      'They understood our vision and helped bring it to life through exceptional UI/UX design.\n\nI highly recommend K&Z Design Agency for anyone seeking top-notch design and workflow solutions.',
    author: 'Mark Feinberg',
    authorRole: 'Chief Executive Officer, National Quality Systems',
    authorPhoto: { asset: 'case-mynqs-author.webp', alt: 'Mark Feinberg' },
    authorFlag: { asset: 'flag-usa.png', alt: 'USA' },
    feedbackLead:
      'They understood our vision and helped bring it to life through exceptional UI/UX design.',
    feedbackBody:
      'Their contribution to putting together the logic behind the user workflow was invaluable. Deliverables were delivered on time, demonstrating a commitment to quality. Their management and communication were on point, making the collaboration smooth and effective.',
    feedbackVisual: {
      asset: 'case-mynqs-feedback.webp',
      alt: 'MyNQS - Injury registry platform for the US National Quality System client feedback',
    },
    screensDesktop: [
      {
        asset: 'case-mynqs-d01.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 1',
      },
      {
        asset: 'case-mynqs-d02.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 2',
      },
      {
        asset: 'case-mynqs-d03.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 3',
      },
      {
        asset: 'case-mynqs-d04.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 4',
      },
      {
        asset: 'case-mynqs-d05.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 5',
      },
      {
        asset: 'case-mynqs-d06.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 6',
      },
      {
        asset: 'case-mynqs-d07.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 7',
      },
      {
        asset: 'case-mynqs-d08.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 8',
      },
      {
        asset: 'case-mynqs-d09.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 9',
      },
      {
        asset: 'case-mynqs-d10.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 10',
      },
      {
        asset: 'case-mynqs-d11.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 11',
      },
      {
        asset: 'case-mynqs-d12.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 12',
      },
      {
        asset: 'case-mynqs-d13.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 13',
      },
      {
        asset: 'case-mynqs-d14.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — screen 14',
      },
    ],
    screensMobile: [
      {
        asset: 'case-mynqs-m01.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 1',
      },
      {
        asset: 'case-mynqs-m02.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 2',
      },
      {
        asset: 'case-mynqs-m03.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 3',
      },
      {
        asset: 'case-mynqs-m04.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 4',
      },
      {
        asset: 'case-mynqs-m05.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 5',
      },
      {
        asset: 'case-mynqs-m06.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 6',
      },
      {
        asset: 'case-mynqs-m07.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 7',
      },
      {
        asset: 'case-mynqs-m08.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 8',
      },
      {
        asset: 'case-mynqs-m09.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 9',
      },
      {
        asset: 'case-mynqs-m10.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 10',
      },
      {
        asset: 'case-mynqs-m11.webp',
        alt: 'MyNQS - Injury registry platform for the US National Quality System — mobile screen 11',
      },
    ],
  },
  vidsprint: {
    listCover: {
      asset: 'case-vidsprint-list.webp',
      alt: 'VidSprint – Efficient Video and Graphic Creation',
    },
    listCoverMobile: {
      asset: 'case-vidsprint-list-mobile.webp',
      alt: 'VidSprint – Efficient Video and Graphic Creation',
    },
    pageTitle: 'VidSprint – Efficient Video and Graphic Creation',
    details: [
      { label: 'Industry', value: 'Creative Tech & Marketing' },
      { label: 'Platform', value: 'SaaS, Web, UI/UX Design' },
      { label: 'Year', value: '2025' },
    ],
    quote:
      'The quality of the work is top-notch, while the communication and responses were excellent. Genuinely I would find it hard to think of any improvements',
    author: 'Benn Eames',
    authorRole: 'CEO of VidSprint',
    authorPhoto: { asset: 'case-vidsprint-author.webp', alt: 'Benn Eames' },
    authorFlag: { asset: 'flag-uk.png', alt: 'United Kingdom' },
    feedbackLead:
      'The quality of the work is top-notch, while the communication and responses were excellent.',
    feedbackBody: 'Genuinely I would find it hard to think of any improvements',
    feedbackVisual: {
      asset: 'case-vidsprint-feedback.webp',
      alt: 'VidSprint – Efficient Video and Graphic Creation client feedback',
    },
    screensDesktop: [
      {
        asset: 'case-vidsprint-d01.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 1',
      },
      {
        asset: 'case-vidsprint-d02.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 2',
      },
      {
        asset: 'case-vidsprint-d03.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 3',
      },
      {
        asset: 'case-vidsprint-d04.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 4',
      },
      {
        asset: 'case-vidsprint-d05.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 5',
      },
      {
        asset: 'case-vidsprint-d06.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 6',
      },
      {
        asset: 'case-vidsprint-d07.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 7',
      },
      {
        asset: 'case-vidsprint-d08.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 8',
      },
      {
        asset: 'case-vidsprint-d09.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 9',
      },
      {
        asset: 'case-vidsprint-d10.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 10',
      },
      {
        asset: 'case-vidsprint-d11.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 11',
      },
      {
        asset: 'case-vidsprint-d12.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 12',
      },
      {
        asset: 'case-vidsprint-d13.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 13',
      },
      {
        asset: 'case-vidsprint-d14.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 14',
      },
      {
        asset: 'case-vidsprint-d15.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 15',
      },
      {
        asset: 'case-vidsprint-d16.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — screen 16',
      },
    ],
    screensMobile: [
      {
        asset: 'case-vidsprint-m01.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 1',
      },
      {
        asset: 'case-vidsprint-m02.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 2',
      },
      {
        asset: 'case-vidsprint-m03.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 3',
      },
      {
        asset: 'case-vidsprint-m04.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 4',
      },
      {
        asset: 'case-vidsprint-m05.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 5',
      },
      {
        asset: 'case-vidsprint-m06.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 6',
      },
      {
        asset: 'case-vidsprint-m07.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 7',
      },
      {
        asset: 'case-vidsprint-m08.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 8',
      },
      {
        asset: 'case-vidsprint-m09.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 9',
      },
      {
        asset: 'case-vidsprint-m10.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 10',
      },
      {
        asset: 'case-vidsprint-m11.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 11',
      },
      {
        asset: 'case-vidsprint-m12.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 12',
      },
      {
        asset: 'case-vidsprint-m13.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 13',
      },
      {
        asset: 'case-vidsprint-m14.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 14',
      },
      {
        asset: 'case-vidsprint-m15.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 15',
      },
      {
        asset: 'case-vidsprint-m16.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 16',
      },
      {
        asset: 'case-vidsprint-m17.webp',
        alt: 'VidSprint – Efficient Video and Graphic Creation — mobile screen 17',
      },
    ],
  },
};
