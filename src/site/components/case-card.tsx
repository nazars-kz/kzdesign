import Image from 'next/image';
import Link from 'next/link';

import type { ResolvedImage } from '@/core/content/define';

import { cx } from './ui/cn';
import { TagList } from './ui/tag';
import { Heading, type HeadingLevel, Text } from './ui/typography';

/**
 * Case study card: cover image with the name, description and tags on top.
 * One component for the Home block, the Cases list and the "other cases" sliders.
 */
export function CaseCard({
  href,
  title,
  description,
  tags,
  cover,
  headingLevel = 3,
  className,
}: {
  href: string;
  title: string;
  description?: string;
  tags: readonly string[];
  cover: ResolvedImage | null;
  headingLevel?: HeadingLevel;
  className?: string;
}) {
  return (
    <Link href={href} className={cx('case', className)}>
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1850px) 1850px, 100vw"
          placeholder={cover.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={cover.blurDataURL ?? undefined}
          className="case__image"
        />
      ) : null}
      <span className="case__shade" aria-hidden="true" />
      <div className="case__body">
        <div>
          <Heading level={headingLevel} variant="plain" className="case__name">
            {title}
          </Heading>
          {description ? (
            <Text variant="plain" className="case__desc">
              {description}
            </Text>
          ) : null}
        </div>
        <TagList tags={tags} className="case__tags" />
      </div>
    </Link>
  );
}
