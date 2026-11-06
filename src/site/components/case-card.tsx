import Image, { getImageProps } from 'next/image';
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
  coverMobile = null,
  headingLevel = 3,
  className,
}: {
  href: string;
  title: string;
  description?: string;
  tags: readonly string[];
  cover: ResolvedImage | null;
  /** Another cover for phones (art direction); the main cover is used when empty. */
  coverMobile?: ResolvedImage | null;
  headingLevel?: HeadingLevel;
  className?: string;
}) {
  return (
    <Link href={href} className={cx('case', className)}>
      {cover ? <CaseCover cover={cover} coverMobile={coverMobile} /> : null}
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

const COVER_SIZES = '(min-width: 1850px) 1850px, 100vw';
/** Matches the phone breakpoint of the theme (below 768px). */
const PHONE = '(max-width: 47.9375rem)';

/** The cover: one image, or a <picture> with its own image for phones. */
function CaseCover({
  cover,
  coverMobile,
}: {
  cover: ResolvedImage;
  coverMobile: ResolvedImage | null;
}) {
  if (!coverMobile) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={COVER_SIZES}
        placeholder={cover.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={cover.blurDataURL ?? undefined}
        className="case__image"
      />
    );
  }
  const { props } = getImageProps({
    src: cover.src,
    alt: cover.alt,
    fill: true,
    sizes: COVER_SIZES,
  });
  const {
    props: { srcSet: phoneSet },
  } = getImageProps({ src: coverMobile.src, alt: cover.alt, fill: true, sizes: '100vw' });
  return (
    <picture>
      <source media={PHONE} srcSet={phoneSet} sizes="100vw" />
      <img {...props} alt={cover.alt} className="case__image" />
    </picture>
  );
}
