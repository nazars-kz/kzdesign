/**
 * FORM: "Send a message" of the slide-in panel (every "Get in touch" button). The same
 * fields and default texts as the contact block's form (`./message-fields.ts`).
 */
import { defineForm } from '@/core/forms/define';

import { MESSAGE_FIELDS, MESSAGE_SEED } from './message-fields';

export const projectForm = defineForm({
  id: 'project',
  label: 'Contact form (Get in touch panel)',
  uiTexts: ['forms'],
  fields: MESSAGE_FIELDS,
  seed: { en: MESSAGE_SEED },
});
