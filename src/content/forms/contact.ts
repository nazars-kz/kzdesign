/**
 * FORM: "Send a message" of the contact block (Home, later every page). Fields and default
 * texts are shared with the slide-in panel's form (`./message-fields.ts`). Labels,
 * placeholders and messages are edited in Pages → Forms → Texts; requests land in the
 * admin inbox. See docs/CONTENT_SCHEMA.md § Forms.
 */
import { defineForm } from '@/core/forms/define';

import { MESSAGE_FIELDS, MESSAGE_SEED } from './message-fields';

export const contactForm = defineForm({
  id: 'contact',
  label: 'Contact form (contact block)',
  uiTexts: ['forms'],
  fields: MESSAGE_FIELDS,
  seed: { en: MESSAGE_SEED },
});
