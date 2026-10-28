/**
 * Helpers for seed content: rich text with bold / italic fragments.
 * A paragraph is a list of parts; a part is plain text or `{ bold }` / `{ italic }`.
 */
import type { RichTextDoc, RichTextInline } from '@/core/content/rich-text';

export type RichPart = string | { readonly bold: string } | { readonly italic: string };

function inline(part: RichPart): RichTextInline {
  if (typeof part === 'string') return { type: 'text', text: part };
  if ('bold' in part) return { type: 'text', text: part.bold, marks: [{ type: 'bold' }] };
  return { type: 'text', text: part.italic, marks: [{ type: 'italic' }] };
}

export function richParagraphs(...paragraphs: readonly (readonly RichPart[])[]): RichTextDoc {
  return {
    type: 'doc',
    content: paragraphs.map((parts) => ({ type: 'paragraph', content: parts.map(inline) })),
  };
}
