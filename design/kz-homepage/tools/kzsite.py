"""Site structure: where each page lives, and URL rewriting for pages in subfolders.

All markup in the builders and in index.html is written with paths relative to the site root
(kz-homepage/), e.g. "css/style.css", "pages/cases.html", "pages/cases/touren.html".
place() turns them into paths relative to the folder the page is written to.
Old flat names ("cases.html", "cases/touren.html") are still understood via MOVE."""
import os, re

CASE_SLUGS = ['signal-sigma', 'touren', 'filmtoro', 'print-buy', 'onground', 'vidsprint', 'listen-upp', 'signature-pharmacy',
              'hr-hub', 'persuasion-systems', 'brightgate', 'quintessia', 'hotsheet', 'momento', 'whodunnit-2-0', 'mynqs']
TOP_PAGES = ['about-us', 'approach', 'cases', 'saas', 'mobile', 'web', 'contact-us', 'reviews']

def page_path(name):
    """'touren' → pages/cases/touren.html, 'saas' → pages/saas.html, 'index' → index.html"""
    if name == 'index':
        return 'index.html'
    return f'pages/cases/{name}.html' if name in CASE_SLUGS else f'pages/{name}.html'

MOVE = {f'{p}.html': page_path(p) for p in TOP_PAGES}
MOVE.update({f'cases/{s}.html': page_path(s) for s in CASE_SLUGS})
MOVE.update({f'{s}.html': page_path(s) for s in CASE_SLUGS})

_SKIP = re.compile(r'^(?:[a-z][a-z0-9+.-]*:|//|#|/)', re.I)

def _rel(u, here):
    u = u.strip()
    if not u or _SKIP.match(u):
        return u
    path, sep, frag = u.partition('#')
    path = MOVE.get(path, path)
    r = os.path.relpath(path, here or '.').replace(os.sep, '/')
    return r + sep + frag

def place(html, out):
    """Rewrite root-relative URLs in `html` for a page written to `out` (path relative to the site root)."""
    here = os.path.dirname(out)
    def attr(m):
        name, val = m.group(1), m.group(2)
        if name == 'srcset':
            val = ', '.join(' '.join([_rel(p.strip().split(' ')[0], here)] + p.strip().split(' ')[1:]) for p in val.split(','))
        else:
            val = _rel(val, here)
        return f'{name}="{val}"'
    html = re.sub(r'\b(href|src|srcset|data-src|poster)="([^"]*)"', attr, html)
    html = re.sub(r'url\((["\']?)([^)"\']+)\1\)', lambda m: f'url({m.group(1)}{_rel(m.group(2), here)}{m.group(1)})', html)
    return html
