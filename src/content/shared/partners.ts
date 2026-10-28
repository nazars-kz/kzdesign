/** SHARED SECTION: "Partners who trust us" logo grid (Home; the services marquee reuses it later). */
import { f } from '@/core/content/fields';
import { defineSharedSection } from '@/core/content/shared-section';

/** [logo file, name, case study address (optional)] */
const TILES: readonly (readonly [string, string, string?])[] = [
  ['partner-01.png', 'NQS', 'mynqs'],
  ['partner-02.png', 'Coptain'],
  ['partner-03.png', 'Signature Pharmacy', 'signature-pharmacy'],
  ['partner-04.png', 'Lopic'],
  ['partner-05.png', 'Filmtoro', 'filmtoro'],
  ['partner-06.png', 'TrustSpace'],
  ['partner-07.png', 'Valorian'],
  ['partner-08.png', 'VidSprint', 'vidsprint'],
  ['partner-09.png', 'AI Hub'],
  ['partner-10.png', 'Amunet'],
  ['partner-11.png', 'lifedata'],
  ['partner-12.jpg', 'Persuasion Systems', 'persuasion-systems'],
  ['partner-13.png', 'Lucidmark'],
  ['partner-14.png', 'stack'],
  ['partner-15.png', 'TACH'],
  ['partner-16.png', 'Hardcopy'],
  ['partner-17.png', 'playback'],
  ['partner-18.png', 'Momento', 'momento'],
  ['partner-19.png', 'Lumitech'],
  ['partner-20.png', 'myfuel'],
  ['partner-21.png', 'Touren', 'touren'],
  ['partner-22.png', 'Onground', 'onground'],
  ['partner-23.png', 'Mach Labs'],
  ['partner-24.png', 'SONIK'],
];

export const partnersShared = defineSharedSection({
  id: 'partners',
  label: 'Partners',
  description: 'Logo tiles; a tile with a case study address links to that case study.',
  fields: {
    eyebrow: f.text({ label: 'Label above the title', max: 40 }),
    title: f.text({ label: 'Title', required: true, max: 160 }),
    tiles: f.list({
      label: 'Logos',
      itemLabelField: 'caseSlug',
      of: {
        logo: f.image({
          label: 'Logo',
          localized: false,
          recommendedSize: '407×193',
          help: 'The image description is the partner’s name.',
        }),
        caseSlug: f.text({
          label: 'Case study address',
          max: 100,
          help: 'Optional. The end of the case study address, e.g. “touren” for /cases/touren.',
        }),
      },
    }),
  },
  seed: {
    en: {
      eyebrow: 'Partners',
      title: 'Partners who trust us their user experience',
      tiles: TILES.map(([asset, name, slug]) => ({
        logo: { asset, alt: name },
        ...(slug ? { caseSlug: slug } : {}),
      })),
    },
  },
});
