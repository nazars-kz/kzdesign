/**
 * FORM: "Book a call" tab of the contact panel. The visitor picks a day and a time in the
 * panel; the chosen start (ISO, UTC) and the visitor's time zone arrive as hidden fields.
 * There is no calendar behind it yet: the request lands in the admin inbox and the team
 * confirms the time by email (docs/project/PLAN.md, issue "Real calendar").
 */
import { defineForm, FormFieldType } from '@/core/forms/define';

export const bookingForm = defineForm({
  id: 'booking',
  label: 'Call booking (contact panel)',
  uiTexts: ['forms'],
  fields: {
    start: { type: FormFieldType.Text, required: true, max: 40, label: 'Start (UTC)' },
    timezone: { type: FormFieldType.Text, max: 80, label: 'Visitor time zone' },
    name: { type: FormFieldType.Text, required: true, max: 100, label: 'Name' },
    email: { type: FormFieldType.Email, required: true, label: 'Email' },
    company: { type: FormFieldType.Text, max: 100, label: 'Company' },
    message: { type: FormFieldType.Textarea, max: 3000, label: 'Topic' },
  },
  seed: {
    en: {
      start: { label: 'Start (UTC)' },
      timezone: { label: 'Visitor time zone' },
      name: { label: 'Name' },
      email: { label: 'Email' },
      company: { label: 'Company (optional)', placeholder: 'Company (optional)' },
      message: {
        label: 'Topic',
        placeholder: 'What would you like to discuss? · optional',
      },
      messages: {
        submit: 'Book call',
        successTitle: 'Your Form Was Successfully Submitted!',
        successMessage: 'We will be in touch with you shortly!',
      },
    },
  },
});
