/**
 * FORM: "Send a message" tab of the contact panel (opened by every "Get in touch" button).
 * The chips "What do you need?" and "Budget" arrive as comma-separated text; their option
 * texts are interface texts (Pages → Interface texts → Contact panel). Requests land in the
 * admin inbox. See docs/CONTENT_SCHEMA.md § Forms.
 */
import { defineForm, FormFieldType } from '@/core/forms/define';

import type { RichTextDoc } from '@/core/content/rich-text';

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

export const projectForm = defineForm({
  id: 'project',
  label: 'Project request (contact panel)',
  uiTexts: ['forms'],
  fields: {
    name: { type: FormFieldType.Text, required: true, max: 100, label: 'Name' },
    email: { type: FormFieldType.Email, required: true, label: 'Email' },
    company: { type: FormFieldType.Text, max: 100, label: 'Company' },
    needs: { type: FormFieldType.Text, max: 400, label: 'What do you need?' },
    budget: { type: FormFieldType.Text, max: 60, label: 'Budget' },
    source: {
      type: FormFieldType.Select,
      options: ['clutch', 'google', 'linkedin', 'dribbble', 'behance', 'referral', 'other'],
      label: 'How did you hear about us?',
    },
    message: { type: FormFieldType.Textarea, max: 3000, label: 'About the project' },
    nda: { type: FormFieldType.Checkbox, label: 'Send me an NDA before we talk' },
    privacy: { type: FormFieldType.Consent, required: true },
  },
  seed: {
    en: {
      name: { label: 'Name' },
      email: { label: 'Email' },
      company: { label: 'Company (optional)', placeholder: 'Company (optional)' },
      needs: { label: 'What do you need?' },
      budget: { label: 'Budget' },
      source: {
        label: 'How did you hear about us?',
        option_clutch: 'Clutch',
        option_google: 'Google search',
        option_linkedin: 'LinkedIn',
        option_dribbble: 'Dribbble',
        option_behance: 'Behance',
        option_referral: 'Referral',
        option_other: 'Other',
      },
      message: {
        label: 'About the project',
        placeholder: 'About the project: goals, stage, timeline',
      },
      nda: { label: 'Send me an NDA before we talk' },
      privacy: { label: CONSENT },
      messages: {
        submit: 'Send message',
        successTitle: 'Your Form Was Successfully Submitted!',
        successMessage: 'We will be in touch with you shortly!',
      },
    },
  },
});
