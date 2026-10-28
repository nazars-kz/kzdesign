import { getTranslations } from 'next-intl/server';

import { PREVIEW_EXIT_PATH } from '@/core/collections/preview-paths';

import { Container } from './ui/layout';
import { Text } from './ui/typography';

/**
 * Bar shown to staff while they preview an unpublished item (Draft Mode): says so and leaves
 * the preview, which brings the 404 back for visitors-like browsing.
 */
export async function PreviewNotice({ returnTo }: { returnTo: string }) {
  const t = await getTranslations('preview');
  return (
    <div role="status" className="bg-surface text-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Text variant="body-sm">{t('notice')}</Text>
        <form method="post" action={PREVIEW_EXIT_PATH}>
          <input type="hidden" name="returnTo" value={returnTo} />
          <button type="submit" className="link-cta text-button">
            {t('exit')}
          </button>
        </form>
      </Container>
    </div>
  );
}
