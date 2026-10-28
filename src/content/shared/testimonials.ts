/**
 * SHARED SECTION: "Testimonials from Our Partners" slider (Home, About, Reviews).
 * Editors add a testimonial as a new item of the list.
 */
import { f } from '@/core/content/fields';
import { defineSharedSection } from '@/core/content/shared-section';

const CASE_KINDS = [
  { value: 'none', label: 'No case study' },
  { value: 'link', label: 'Link to a case study' },
  { value: 'soon', label: 'Case study is coming soon' },
] as const;

type Kind = (typeof CASE_KINDS)[number]['value'];

interface Seed {
  name: string;
  photo: string;
  flag: [asset: string, alt: string];
  role: string;
  project: string;
  quote: readonly string[];
  caseKind?: Kind;
  caseName?: string;
  caseImage?: string;
  caseSlug?: string;
}

const USA: [string, string] = ['flag-usa.png', 'USA'];
const UK: [string, string] = ['flag-uk.png', 'UK'];

const ITEMS: readonly Seed[] = [
  {
    name: 'Mike Hapner',
    photo: 'testi-mike-hapner.jpg',
    flag: USA,
    role: 'CTO, Valorian Solutions',
    project: 'SaaS Web & Mobile apps for industrial service providers',
    quote: [
      'Our developers were provided a GREAT UI design in Figma that was easy to implement.',
      'They have a fantastic ability to listen to our business problems and process flows and quickly turn them into something beautiful to implement in the user interface.',
      'Everyone loves working with the K&Z team.',
    ],
  },
  {
    name: 'Andrei Sota',
    photo: 'testi-andrei-sota.jpg',
    flag: UK,
    role: 'Founder & CEO, Signal Sigma',
    project: 'Investment Fintech SaaS',
    quote: [
      'Post-launch, user engagement metrics showed a 40% increase in average session duration, reflecting the intuitive and engaging design of the frontend.',
      'User onboarding completion rates improved by 25%, thanks to the streamlined UX that made complex financial tools accessible to both novice and expert users.',
      'The app’s Net Promoter Score (NPS) jumped to 85, indicating high user satisfaction with the interface and functionality.',
      'Development efficiency also saw a boost, with a 30% reduction in frontend implementation time due to the detailed Figma layouts and clear documentation provided by K&Z Design.',
      'What stood out most about K&Z Design was their ability to combine creative excellence with pragmatic execution. I was particularly struck by how they balanced my vision with their expertise, knowing exactly when to push boundaries for innovation and when to reel things in for practicality. The handoff from Figma layouts to code was seamless.',
    ],
    caseKind: 'link',
    caseName: 'Signal Sigma',
    caseImage: 'testi-case-signal-sigma.jpg',
    caseSlug: 'signal-sigma',
  },
  {
    name: 'Mark Feinberg',
    photo: 'testi-mark-feinberg.webp',
    flag: USA,
    role: 'Chief Executive Officer, National Quality Systems',
    project: 'Trauma center software and staffing web & mobile platform',
    quote: [
      'They understood our vision and helped bring it to life through exceptional UI/UX design.',
      'Their contribution to putting together the logic behind the user workflow was invaluable. Deliverables were delivered on time, demonstrating a commitment to quality. Their management and communication were on point, making the collaboration smooth and effective.',
      'I highly recommend K&Z Design Agency for anyone seeking top-notch design and workflow solutions.',
    ],
    caseKind: 'link',
    caseName: 'MyNQS',
    caseImage: 'testi-case-mynqs.webp',
    caseSlug: 'mynqs',
  },
  {
    name: 'Reece Samani',
    photo: 'testi-reece-samani.jpg',
    flag: UK,
    role: 'Forbes 30 Under 30, Founder & Director, Signature Pharmacy & Locum App',
    project: 'Multiple SaaS for Pharmacy Management',
    quote: [
      'System design looked better and completed the job more efficiently.',
      'They delivered items on time and they were very responsive to details and feedback',
      'I was impressed with their attention to detail!',
      'They had a unique but effective approach to design work. They have a good eye for design and know what looks good.',
    ],
    caseKind: 'link',
    caseName: 'Signature Pharmacy',
    caseImage: 'testi-case-signature-pharmacy.jpg',
    caseSlug: 'signature-pharmacy',
  },
  {
    name: 'Joe',
    photo: 'testi-joe.webp',
    flag: USA,
    role: 'COO, Persuasion System',
    project: 'Healthcare CRM',
    quote: [
      "We hired K&Z Design to design a web platform for us in Figma, and we couldn't be happier with the results.",
      'From the start, they demonstrated a strong understanding of our needs and provided valuable insights that improved our initial concept. The design process was smooth and efficient, with clear communication and timely updates.',
      'The final product exceeded our expectations. The user interface is intuitive and visually appealing, showcasing their attention to detail and expertise in web design. They were always responsive to feedback and made revisions quickly, ensuring that the final design aligned perfectly with our vision.',
    ],
    caseKind: 'link',
    caseName: 'Persuasion Systems',
    caseImage: 'testi-case-persuasion-systems.webp',
    caseSlug: 'persuasion-systems',
  },
  {
    name: 'Yashar Behzadi',
    photo: 'testi-yashar-behzadi.jpg',
    flag: USA,
    role: 'CEO & Founder at Synthesis AI',
    project: 'Multiple AI powered SaaS web apps',
    quote: [
      'I appreciated that their designs were functional, easy to use, and covered all of our required functionality.',
      'They were responsive to feedback and always willing to make revisions to ensure the final product met our expectations.',
    ],
  },
  {
    name: 'Kwabena Osei-Larbi',
    photo: 'testi-kwabena-osei-larbi.jpg',
    flag: USA,
    role: 'Founder, 2step',
    project: 'Mobile app for event organization for dancers',
    quote: [
      "Couldn't be happier with the work K&Z did.",
      "From the very beginning, the team took the time to ensure they fully understood the problem we were solving. This set the foundation for the design process and ensured we were on the same page from the start. This made everything more efficient: there was minimal rework, and the design team's first attempts were always very close to what I envisioned.",
      'The quality and professionalism of their work, and the speed of their revisions, were exceptional. The team pays close attention to detail, and it showed in the end product, which was delivered on schedule.',
      "Overall, I'm really glad we chose to work with them. They brought the project to life better than we could have imagined, and I would highly recommend them. Planning to work with them again on future design needs",
    ],
    caseKind: 'soon',
  },
  {
    name: 'Denis Salatin',
    photo: 'testi-denis-salatin.jpg',
    flag: ['flag-uae.webp', 'UAE'],
    role: 'CEO, Lumitech',
    project: 'Custom Software Development Company',
    quote: [
      "We completed 10+ project together. They're extremely professional.",
      "Exceptional analysis skills. They've just looked at clients' requirements which was only a few sentences and translated it into prototypes and later a high-fidelity UI/UX design. They lead the design process and communicate extremely efficient.",
    ],
  },
  {
    name: 'Sideeq Youssef',
    photo: 'testi-sideeq-youssef.jpg',
    flag: ['flag-saudi-arabia.webp', 'Saudi Arabia'],
    role: 'CEO, IT Company',
    project: 'SaaS for Marketing Management',
    quote: [
      'They truly excelled on our project.',
      'K&Z Design did an outstanding job managing and delivering our project. Their team is highly professional and demonstrates a deep understanding of their craft. We were particularly impressed by their structured approach to project management',
    ],
  },
  {
    name: 'Benn Eames',
    photo: 'testi-benn-eames.jpg',
    flag: UK,
    role: 'CEO of VidSprint',
    project: 'SaaS Web App for Marketing Agency',
    quote: [
      'The quality of the work is top-notch, while the communication and responses were excellent.',
      'Genuinely I would find it hard to think of any improvements',
    ],
    caseKind: 'link',
    caseName: 'VidSprint',
    caseImage: 'testi-case-vidsprint.jpg',
    caseSlug: 'vidsprint',
  },
  {
    name: 'Andy Jennings',
    photo: 'testi-andy-jennings.jpg',
    flag: USA,
    role: 'President at Playback Rewards',
    project: 'Mobile app - rewards platform for mobile game players',
    quote: [
      'I honestly would say that all of their work, from start to finish, has been top-notch.',
      'Their ability to take work with varying level of specifications was impressive. They quickly tackled new work and delivered quality finished results all while keeping communication and expectations clear',
    ],
  },
  {
    name: 'Dylan Halliday',
    photo: 'testi-dylan-halliday.webp',
    flag: ['flag-australia.png', 'Australia'],
    role: 'CTO, Pound Group Pty Ltd',
    project: 'Buyer Agency Real Estate CRM',
    quote: [
      'Love the team, would use them again',
      'The project led to a cleaner, more intuitive UI that improved user navigation and overall experience. The interactive prototypes helped refine workflows before development, saving time and effort. The design system also made it easier to scale and maintain consistency. Overall, the team’s work made a big difference in usability and functionality.',
      'From the start, I had a good feeling about the team—their roles were well-defined, and they had a solid, professional approach to communication. They managed the project efficiently, keeping everything on track and delivering on time. Whenever we had feedback or adjustments, they were responsive and easy to work with, making sure our needs were met without any hassle.',
    ],
  },
  {
    name: 'Denis Bondar',
    photo: 'testi-denis-bondar.jpg',
    flag: ['flag-luxembourg.webp', 'Luxembourg'],
    role: 'Founder, Touren App',
    project: 'Mobile app for bike trails',
    quote: [
      'An excellent UX/UI designers from K&Z!',
      'Delivered a beautifully crafted, user-friendly mobile app design that exceeded expectations.',
      'Communicative, detail-oriented, and quick to incorporate feedback. Highly recommend for any app design projects!',
    ],
    caseKind: 'link',
    caseName: 'Touren',
    caseImage: 'testi-case-touren.jpg',
    caseSlug: 'touren',
  },
  {
    name: 'Matthieu Salvy',
    photo: 'testi-matthieu-salvy.jpg',
    flag: ['flag-switzerland.webp', 'Switzerland'],
    role: 'Founder, GettingDigit',
    project: 'CRM platform for complex workflow management',
    quote: [
      'K&Z are an absolute pleasure to work with.',
      'Knowledgable, flexible, collaborative, they have achieved in record times an excellent work.',
    ],
    caseKind: 'soon',
  },
  {
    name: 'Julian Rodriguez',
    photo: 'testi-julian-rodriguez.jpg',
    flag: USA,
    role: 'CEO, Momento AI',
    project: 'Blockchain social media web & mobile app',
    quote: [
      'I’m impressed with their ability to adapt.',
      'They were a full design team for us, consistently delivering all required materials.',
    ],
    caseKind: 'link',
    caseName: 'Momento AI',
    caseImage: 'testi-case-momento.jpg',
    caseSlug: 'momento',
  },
];

export const testimonialsShared = defineSharedSection({
  id: 'testimonials',
  label: 'Testimonials',
  description: 'The testimonials slider. Add a testimonial as a new item of the list.',
  fields: {
    eyebrow: f.text({ label: 'Label above the title', max: 40 }),
    title: f.text({ label: 'Title', required: true, max: 120 }),
    items: f.list({
      label: 'Testimonials',
      itemLabelField: 'name',
      of: {
        name: f.text({ label: 'Name', required: true, max: 60 }),
        photo: f.image({ label: 'Photo', localized: false, recommendedSize: '616×714' }),
        flag: f.image({ label: 'Country flag', localized: false, recommendedSize: '40×40' }),
        role: f.text({ label: 'Role and company', max: 120 }),
        project: f.text({ label: 'Project', max: 120 }),
        quote: f.textarea({
          label: 'Testimonial',
          max: 3000,
          rows: 10,
          help: 'Separate paragraphs with an empty line.',
        }),
        caseKind: f.select({ label: 'Case study', options: CASE_KINDS }),
        caseName: f.text({ label: 'Case study name', max: 60 }),
        caseImage: f.image({
          label: 'Case study picture',
          localized: false,
          recommendedSize: '92×92',
        }),
        caseSlug: f.text({
          label: 'Case study address',
          max: 100,
          help: 'The end of the case study address, e.g. “touren” for /cases/touren.',
        }),
      },
    }),
    readReviews: f.link({ label: 'Link below the slider' }),
    clutchLabel: f.text({ label: 'Clutch: small label', max: 30 }),
    clutchCount: f.text({ label: 'Clutch: number of reviews', max: 30 }),
    clutchLink: f.link({ label: 'Clutch: link' }),
  },
  seed: {
    en: {
      eyebrow: 'Testimonials',
      title: 'Testimonials from Our Partners',
      items: ITEMS.map((item) => ({
        name: item.name,
        photo: { asset: item.photo, alt: item.name },
        flag: { asset: item.flag[0], alt: item.flag[1] },
        role: item.role,
        project: item.project,
        quote: item.quote.join('\n\n'),
        caseKind: item.caseKind ?? 'none',
        ...(item.caseName ? { caseName: item.caseName } : {}),
        ...(item.caseImage
          ? { caseImage: { asset: item.caseImage, alt: item.caseName ?? item.name } }
          : {}),
        ...(item.caseSlug ? { caseSlug: item.caseSlug } : {}),
      })),
      readReviews: { label: 'Read our reviews', href: '/reviews', external: false },
      clutchLabel: 'Reviewed on',
      clutchCount: '59 reviews',
      clutchLink: {
        label: 'Reviewed on Clutch — 59 reviews',
        href: 'https://clutch.co/profile/kz-design#reviews',
        external: true,
      },
    },
  },
});
