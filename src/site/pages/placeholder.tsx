/** Placeholder page: title and optional text until the page's real content is provided. */
import type { RichTextDoc } from '@/core/content/rich-text';

import { Container, Section } from '../components/ui/layout';
import { RichText } from '../components/ui/rich-text';
import { Heading } from '../components/ui/typography';

interface PlaceholderContent {
  readonly intro: { readonly title: string; readonly body: RichTextDoc | null };
}

export function PlaceholderView({ content }: { content: PlaceholderContent }) {
  const { title, body } = content.intro;
  return (
    <Section labelledBy="page-title" className="min-h-160">
      <Container className="flex flex-col gap-8">
        <Heading level={1} variant="h2" id="page-title">
          {title}
        </Heading>
        {body ? <RichText doc={body} className="max-w-prose" /> : null}
      </Container>
    </Section>
  );
}
