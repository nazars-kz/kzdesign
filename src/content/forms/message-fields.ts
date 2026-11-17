/**
 * Fields and default texts of the "Send a message" form (`contact`). It is shown twice: in the
 * contact block (Home, Contact us) and in the slide-in panel of every "Get in touch" button.
 * One form, so its texts are edited in one place; the two places use different element ids
 * (`idPrefix` of `useSiteForm`) and a hidden `origin` field tells them apart in the inbox.
 *
 * "What do you need?", the budget and "How did you hear about us?" are chips in the panel:
 * their answers arrive as comma-separated text and the options are interface texts
 * (Pages → Interface texts → Contact panel). "Attach file" of the design needs a file
 * upload that the form engine doesn't have yet (docs/project/PLAN.md).
 */
import type { RichTextDoc } from '@/core/content/rich-text';
import { FormFieldType } from '@/core/forms/define';

export const MESSAGE_FIELDS = {
  name: { type: FormFieldType.Text, required: true, max: 100, label: 'Your name' },
  email: { type: FormFieldType.Email, required: true, label: 'Email' },
  message: { type: FormFieldType.Textarea, max: 3000, label: 'How can we help you?' },
  needs: { type: FormFieldType.Text, max: 400, label: 'What do you need?' },
  scope: {
    type: FormFieldType.Select,
    options: ['mvp', 'full-scale'],
    label: 'Project scope',
  },
  company: { type: FormFieldType.Text, max: 100, label: 'Company' },
  competitors: { type: FormFieldType.Textarea, max: 1000, label: 'Competitors' },
  nda: { type: FormFieldType.Checkbox, label: 'Send me an NDA before we talk' },
  budget: { type: FormFieldType.Text, max: 60, label: 'Budget' },
  source: { type: FormFieldType.Text, max: 60, label: 'How did you hear about us?' },
  /** Hidden: where the request was sent from (`block` or `panel`), shown in the inbox. */
  origin: { type: FormFieldType.Text, max: 20, label: 'Sent from' },
  privacy: { type: FormFieldType.Consent, required: true },
} as const;

const CONSENT: RichTextDoc = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'I agree to the ' },
        {
          type: 'text',
          text: 'Privacy Policy',
          marks: [{ type: 'link', attrs: { href: '/privacy-policy', target: '_blank' } }],
        },
      ],
    },
  ],
};

export const MESSAGE_SEED = {
  name: { label: 'Your name' },
  email: { label: 'Email' },
  message: { label: 'How can we help you?', placeholder: 'How can we help you?' },
  needs: { label: 'What do you need?' },
  scope: { label: 'Project scope', option_mvp: 'MVP', option_full_scale: 'Full-scale' },
  company: { label: 'Company (optional)', placeholder: 'Company (optional)' },
  competitors: {
    label: 'Competitors',
    placeholder: 'Competitors: list them via comma',
  },
  nda: { label: 'Send me an NDA before we talk' },
  budget: { label: 'Budget' },
  source: { label: 'How did you hear about us?' },
  origin: { label: 'Sent from' },
  privacy: { label: CONSENT },
  messages: {
    submit: 'Submit',
    successTitle: 'Your Form Was Successfully Submitted!',
    successMessage: 'We will be in touch with you shortly!',
  },
} as const;
