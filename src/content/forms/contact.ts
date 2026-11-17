/**
 * FORM: "Send a message", shown in the contact block (Home, Contact us) and in the slide-in
 * panel of every "Get in touch" button (`./message-fields.ts`). Labels,
 * placeholders and messages are edited in Pages → Forms → Texts; requests land in the
 * admin inbox. See docs/CONTENT_SCHEMA.md § Forms.
 */
import { defineForm } from '@/core/forms/define';

import { MESSAGE_FIELDS, MESSAGE_SEED } from './message-fields';

export const contactForm = defineForm({
  id: 'contact',
  label: 'Contact form (contact block and Get in touch panel)',
  uiTexts: ['forms'],
  fields: MESSAGE_FIELDS,
  seed: { en: MESSAGE_SEED },
});
