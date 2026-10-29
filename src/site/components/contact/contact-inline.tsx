'use client';

import { useState } from 'react';

import { ContactPanel, type ContactPanelProps, type PanelTab } from './contact-panel';

/** The contact block's form: the same panel as the drawer, embedded (no overlay, no ×). */
export function ContactInline(
  props: Omit<ContactPanelProps, 'mode' | 'tab' | 'onTabChange' | 'onClose'>,
) {
  const [tab, setTab] = useState<PanelTab>('message');
  return (
    <div className="dw dw--inline is-open" data-contact-inline>
      <ContactPanel {...props} mode="inline" tab={tab} onTabChange={setTab} />
    </div>
  );
}
