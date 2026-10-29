"""Builds the 16 case study pages (pages/cases/<slug>.html) from tools/cases_data.py.
Markup is written with paths from the site root; kzsite.place() rewrites them for the page folder.
Shared blocks (header, footer) come from index.html. Re-run after editing index.html or the data."""
import html
import os, re
from kzsite import place, page_path
from build_services import header, footer, nav_fix, CDN, ROOT, e, LOCAL_PAGES
from build_cases import CASES as LIST
from cases_data import CASES, SLIDER_CARDS

NAMES = {c[0]: c[1] for c in LIST}
# natural sizes of the feedback visuals (for width/height attributes, no layout shift)
VISUAL_SIZE = {'6978bb9587f53c3ce597cd19_8da7c88d25aabb67cae65d6d6e0a7af5_MacBook%20Air%20%282022%29.webp': (2460, 1845),
  '688b59a3693b2590c19c96dc_touren-feedback-img.webp': (1680, 2284),
  '688b7209e90febc7a2bcdf55_98b4254f10d24f5631b95e84970b02c4_vidsprint-feedback-img.webp': (889, 614),
  '6891ec830fcb5dfdeae3b509_vidsprint-feedback-img.webp': (949, 738),
  '688b89d8fb7caf1a95427fd5_signaturepharm-feedback-img.webp': (1763, 1322),
  '68fba0e9c6096eef57795b9c_mac.webp': (1167, 705), '68fb9e14664367fe2431e495_Midnight.webp': (1277, 976)}
CASE_FILES = {slug: f'cases/{slug}.html' for slug in CASES}

def txt(s):  # escape, keep line breaks (rendered with white-space: pre-line)
    return html.escape(s, quote=False)

def author(f, section=False):
    photo = f.get('photo_section') if section and f.get('photo_section') else f['photo']
    flag = f['flag_section'] if section else f['flag']
    return f'''<div class="author">
          <img src="{CDN}{photo}" alt="{e(f['name'])}" width="64" height="64" loading="lazy">
          <div><p class="author__name">{e(f['name'])} <img src="{CDN}{flag}" alt="" width="20" height="27"></p><p class="author__role">{e(f['role'])}</p></div>
        </div>'''

def slide(slug):
    name, desc, tags, img = SLIDER_CARDS[slug]
    href = CASE_FILES.get(slug, f'https://www.kz.design/{slug}')
    return f'''      <a class="case" href="{href}">
        <picture><img src="{CDN}{img}" alt="{e(name)} — {e(desc)}" loading="lazy" width="1103" height="637"></picture>
        <div class="case__shade"></div>
        <div class="case__body">
          <div><h3 class="case__name">{e(name)}</h3><p class="case__desc">{e(desc)}</p></div>
          <div class="case__tags">{''.join(f'<span>{e(t)}</span>' for t in tags)}</div>
        </div>
      </a>'''

def page(slug):
    C = CASES[slug]
    f = C['feedback']
    name = NAMES[slug]
    rows = '\n'.join(f'          <div class="cd__row"><dt>{e(a)}</dt><dd>{e(b)}</dd></div>' for a, b in C['rows'])
    quote_group = f'''
      <div class="cd__group">
        <p class="cd__label">Client feedback:</p>
        <div class="cd__quote">
          <blockquote>{txt(f['quote'])}</blockquote>
          {author(f)}
        </div>
      </div>''' if f else ''
    alt = e(C['title'].replace('\n', ' '))
    desk = '\n'.join(f'    <img src="{CDN}{x}" alt="{alt} — screen {i}" loading="lazy">' for i, x in enumerate(C['desk'], 1))
    mob = '\n'.join(f'    <img src="{CDN}{x}" alt="{alt} — mobile screen {i}" loading="lazy">' for i, x in enumerate(C['mob'], 1))
    feedback = f'''
<!-- ================= Client feedback ================= -->
<section class="cfb">
  <div class="container">
    <div class="cfb__text">
      <p class="eyebrow">Client feedback:</p>
      <p class="cfb__lead">{txt(f['lead'])}</p>
      <div class="cfb__body">{''.join(f'<p>{txt(p)}</p>' for p in f['body'])}</div>
      {author(f, section=True)}
    </div>
    {f'<img class="cfb__visual" src="{CDN}{f["visual"]}" alt="" width="{VISUAL_SIZE[f["visual"]][0]}" height="{VISUAL_SIZE[f["visual"]][1]}" loading="lazy">' if f.get('visual') else ''}
  </div>
</section>
''' if f else ''
    first_line = C['title'].split('\n')[0]
    out = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(name)} Case Study | K&amp;Z Design</title>
  <meta name="description" content="{e(C['title'].replace(chr(10), ' '))}. UX/UI design case study by K&amp;Z Design: {e(', '.join(b for a, b in C['rows']))}.">
  <link rel="icon" href="assets/mark-orange.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link rel="preload" href="fonts/google-sans-flex-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,500,700,701&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design-system/tokens.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/drawer.css">
  <link rel="stylesheet" href="css/service.css">
  <link rel="stylesheet" href="css/case.css">
  <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Case studies","item":"https://www.kz.design/cases"}},{{"@type":"ListItem","position":2,"name":"{e(name)}","item":"https://www.kz.design/{slug}"}}]}}</script>
</head>
<body>

{nav_fix(header, 'cases')}

<main>

<!-- ================= Details ================= -->
<section class="cd">
  <div class="container">
    <div class="cd__box">
      <nav class="cd__crumbs" aria-label="Breadcrumb"><ol><li><a href="cases.html">Case studies</a></li><li aria-current="page">{e(name)}</li></ol></nav>
      <h1 class="cd__title">{txt(C['title'])}</h1>
      <div class="cd__group">
        <p class="cd__label">Details:</p>
        <dl class="cd__rows">
{rows}
        </dl>
      </div>{quote_group}
    </div>
  </div>
</section>

<!-- ================= Screens ================= -->
<div class="cshots cshots--desk">
{desk}
</div>
<div class="cshots cshots--mob">
{mob}
</div>
{feedback}
<!-- ================= CTA ================= -->
<section class="ccta dark">
  <div class="container">
    <div class="ccta__text">
      <p class="eyebrow">Get in touch</p>
      <h2 class="ccta__title">Take your <b>product</b> to the next level</h2>
      <p class="ccta__sub">No calls with sales. Contact us and get to chat with our CEO.</p>
      <a class="btn btn--light" href="pages/contact-us.html" data-drawer="book">Get in touch<i class="btn__arrow"></i></a>
    </div>
    <div class="ccta__logo" data-kz-logo aria-hidden="true"></div>
    <div class="ccta__card">
      <div class="author">
        <img src="{CDN}6846dac160b7d4f40d4e4b01_image.png" alt="Vlad Kyrieiev" width="48" height="48" loading="lazy">
        <div><p class="author__name">Vlad Kyrieiev</p><p class="author__role">Founder &amp; CEO</p></div>
      </div>
      <p>Serial design entrepreneur &amp; leader with 10+ years of experience solving the most challenging UX issues.</p>
      <p>Ex-Head of Design in US ERP product.</p>
    </div>
  </div>
</section>

<!-- ================= Other case studies ================= -->
<section class="cother dark">
  <div class="container cother__head">
    <div>
      <p class="eyebrow">Other Case Studies</p>
      <h2 class="cother__title">If you liked the previous works, you will definitely like these ones</h2>
    </div>
    <div class="cother__nav">
      <button class="round-btn round-btn--prev" type="button" aria-label="Previous case" disabled></button>
      <button class="round-btn round-btn--next" type="button" aria-label="Next case"></button>
    </div>
  </div>
  <div class="cother__track">
{chr(10).join(slide(s) for s in C['other'])}
  </div>
</section>

</main>

{nav_fix(footer, 'cases')}

<script src="js/main.js"></script>
<script src="js/drawer.js"></script>
<script src="js/case.js" defer></script>
<script src="js/ccta-logo.js" defer></script>
</body>
</html>
'''
    out = out.replace('href="https://www.kz.design/' + slug + '"', f'href="cases/{slug}.html"')
    dest = page_path(slug)
    os.makedirs(os.path.dirname(ROOT + dest), exist_ok=True)
    open(ROOT + dest, 'w').write(place(out, dest))
    return dest, len(out)


if __name__ == '__main__':
    for s in CASES: print(page(s))
