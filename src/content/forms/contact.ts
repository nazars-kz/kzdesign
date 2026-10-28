/**
 * FORM: the contact form of the "Let's take your product to the next level"
 * block. Fields are fixed here; labels, placeholders and messages are edited in
 * Pages → Forms → Contact form → Texts. Requests land in the admin inbox.
 * See docs/CONTENT_SCHEMA.md § Forms.
 */
import { defineForm, FormFieldType } from '@/core/forms/define';

export const contactForm = defineForm({
  id: 'contact',
  label: 'Contact form',
  uiTexts: ['forms'],
  fields: {
    name: { type: FormFieldType.Text, required: true, max: 100, label: 'Name' },
    email: { type: FormFieldType.Email, required: true, label: 'Email address' },
    message: { type: FormFieldType.Textarea, max: 3000, label: 'Message (optional)' },
  },
  seed: {
    en: {
      name: { label: 'Name' },
      email: { label: 'Email address' },
      message: { label: 'Message (optional)', placeholder: 'Message (optional)' },
      messages: {
        submit: 'Submit',
        successTitle: 'Thank you!',
        successMessage: 'We received your message and will get back to you soon.',
      },
    },
  },
});
