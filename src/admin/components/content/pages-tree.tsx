'use client';

import { ChevronDownIcon, FileTextIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { type ReactNode, useId, useMemo, useState } from 'react';

import { cn } from '@/admin/lib/utils';
import { Input } from '@/admin/ui/input';
import type { LocaleStatus } from '@/core/content/editor-types';
import { adminHref, AdminRoute } from '@/core/project/paths';

import { LocaleStatusChips } from './locale-status';

/** Extra sidebar group (Case studies, Collections, Site-wide, Forms): flat links with an optional count. */
export interface SidebarGroup {
  readonly id: string;
  readonly title: string;
  readonly items: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly href: string;
    /** Shown as a badge, e.g. item or unread count. */
    readonly count?: number;
    readonly countLabel?: string;
    /** Small second line, e.g. "Used on 2 pages". */
    readonly note?: string;
  }>;
}

/** Id of the section with the page tree; the only one open at first. */
const PAGES_SECTION = 'pages';

export interface TreeNode {
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly children: readonly TreeNode[];
}

function matches(node: TreeNode, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    node.label.toLowerCase().includes(q) ||
    node.path.includes(q) ||
    node.children.some((child) => matches(child, q))
  );
}

/**
 * Searchable Pages sidebar: the page tree with per-locale completeness, then
 * the collections / site-wide / forms groups. Search filters every group.
 */
export function PagesTree({
  tree,
  statuses,
  locales,
  groups = [],
}: {
  tree: readonly TreeNode[];
  statuses: Readonly<Record<string, Readonly<Record<string, LocaleStatus>>>>;
  locales: readonly string[];
  groups?: readonly SidebarGroup[];
}) {
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  const [toggled, setToggled] = useState<Readonly<Record<string, boolean>>>({});
  const searchParams = useSearchParams();
  const currentLocale = searchParams.get('locale');
  const visible = useMemo(() => tree.filter((node) => matches(node, query)), [tree, query]);
  const needle = query.trim().toLowerCase();
  const visibleGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => !needle || item.label.toLowerCase().includes(needle)),
        }))
        .filter((group) => group.items.length > 0),
    [groups, needle],
  );

  /** A section is open when the visitor toggled it, searched into it, or its page is the current one. */
  const holdsCurrent = (group: SidebarGroup) =>
    group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  const isOpen = (id: string, fallback: boolean) => (needle ? true : (toggled[id] ?? fallback));
  const toggle = (id: string, fallback: boolean) =>
    setToggled((state) => ({ ...state, [id]: !(state[id] ?? fallback) }));

  const renderNode = (node: TreeNode, depth: number) => {
    if (!matches(node, query)) return null;
    const href = `${adminHref(AdminRoute.Pages)}/${node.id}${currentLocale ? `?locale=${currentLocale}` : ''}`;
    const active = pathname === `${adminHref(AdminRoute.Pages)}/${node.id}`;
    return (
      <li key={node.id}>
        <Link
          href={href}
          aria-current={active ? 'page' : undefined}
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted',
            active && 'bg-muted font-medium',
          )}
          style={{ paddingInlineStart: `${0.5 + depth * 1}rem` }}
        >
          <FileTextIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate">{node.label}</span>
          <LocaleStatusChips locales={locales} statuses={statuses[node.id]} />
        </Link>
        {node.children.length > 0 ? (
          <ul>{node.children.map((child) => renderNode(child, depth + 1))}</ul>
        ) : null}
      </li>
    );
  };

  return (
    <nav aria-label="Pages" className="flex flex-col gap-3">
      <div className="relative">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages"
          aria-label="Search pages"
          className="ps-8"
        />
      </div>
      {visible.length === 0 && visibleGroups.length === 0 ? (
        <p className="px-2 text-sm text-muted-foreground">Nothing matches.</p>
      ) : null}
      {visible.length > 0 ? (
        <Fold
          title="Pages"
          open={isOpen(PAGES_SECTION, true)}
          onToggle={() => toggle(PAGES_SECTION, true)}
        >
          <ul className="flex flex-col gap-0.5">{tree.map((node) => renderNode(node, 0))}</ul>
        </Fold>
      ) : null}
      {visibleGroups.map((group) => (
        <Fold
          key={group.id}
          title={group.title}
          open={isOpen(group.id, holdsCurrent(group))}
          onToggle={() => toggle(group.id, holdsCurrent(group))}
        >
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted',
                      active && 'bg-muted font-medium',
                    )}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate">{item.label}</span>
                      {item.note ? (
                        <span className="truncate text-xs text-muted-foreground">{item.note}</span>
                      ) : null}
                    </span>
                    {item.count !== undefined ? (
                      <span
                        className="rounded-full bg-muted px-1.5 text-xs text-muted-foreground tabular-nums"
                        aria-label={item.countLabel ?? `${item.count}`}
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Fold>
      ))}
    </nav>
  );
}

/** A sidebar section that folds: its title is a button (`aria-expanded`), the list hides when closed. */
function Fold({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const bodyId = useId();
  return (
    <section aria-label={title} className="flex flex-col gap-0.5">
      <h2 className="pt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
          className="flex w-full items-center justify-between rounded-md px-2 py-1 text-start uppercase hover:bg-muted"
        >
          {title}
          <ChevronDownIcon
            aria-hidden
            className={cn('size-4 transition-transform', !open && '-rotate-90')}
          />
        </button>
      </h2>
      <div id={bodyId} hidden={!open}>
        {children}
      </div>
    </section>
  );
}
