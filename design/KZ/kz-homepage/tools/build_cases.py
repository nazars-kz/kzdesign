"""Builds cases.html (case studies list with category filters).
Shared blocks come from index.html via build_services helpers. Re-run after editing index.html."""
from build_services import block, header, contact, footer, nav_fix, CDN, ROOT, e

# name, description, visible tags, filter categories, desktop cover, mobile cover
# Filter categories: the live site's data is wrong for 7 cases (they all carry "Gaming, B2C, Mobile"),
# so categories here are taken from each card's visible tags and mapped to the filter names.
CASES = [
 ('signal-sigma', 'Signal Sigma', 'Investment Strategy Platform', ['FinTech', 'Web App', 'UI/UX Design'], ['Web'], '6980c0f3b209f59ad8dfbe97_ss-cover-desk.webp', '6980c100040671c9f29e971f_ss-cover-mob.webp'),
 ('touren', 'Touren', 'Off-road navigation & community platform', ['sport', 'Saas', 'Web', 'navigation', 'b2c'], ['SaaS', 'Web', 'B2C'], '685ebc4571c27cacbb2d5bba_49e11cc85160f9c6754a54576de097d6_touren-cover.webp', None),
 ('filmtoro', 'Filmtoro', 'Creative Tech & Marketing', ['Marketing', 'APP', 'UI/UX Design'], ['Marketing', 'Mobile'], '6980c088e9d773acd28a7e03_filmtoro-desk-cover.webp', '6980c0917a9c0fed664d17a4_filmtoro-mob-cover.webp'),
 ('print-buy', 'Print buy', 'Creative Tech & Marketing', ['Saas', 'web', 'UI/UX Design'], ['SaaS', 'Web'], '6980bf450e234e583bdd6b38_pp-cover-desk.webp', '6980bfa1378df4c5673c0b30_pp-cover-mob.webp'),
 ('onground', 'Onground', 'Private jet cleaning platform', ['SAAS', 'Web', 'Ui/ux design'], ['SaaS', 'Web'], '685ebc45e9a6a5582fcdafae_89fed884cc985870081400744711565f_onground-cover.webp', '6895cf710fda0f5332781162_onground-cover-mobile.webp'),
 ('vidsprint', 'VidSprint', 'Order management & CRM for marketing agency', ['Marketing', 'CRM', 'SaaS', 'B2B', 'Web', 'Mobile'], ['Marketing', 'CRM', 'SaaS', 'B2B', 'Web', 'Mobile'], '67bdc861d1e1b7914e633a78_0df011d58e4d006e28f3af17fd526420_Frame%202087327192.webp', '6895d22113ceedce19f4cee7_vidsprint-cover-mobile.webp'),
 ('listen-upp', 'Listen Upp', 'Social & mental health app', ['Health', 'Mobile'], ['Healthcare', 'Mobile'], '685ebc46df82f23058fa516a_listenupp-cover.webp', '6895d35995b6669bc1093abb_listenupp-cover-mobile.webp'),
 ('signature-pharmacy', 'Signature Pharmacy', 'SaaS web & mobile app for pharmacy order management and delivery', ['Healthcare', 'Logistics', 'SaaS', 'B2B', 'Web', 'Mobile'], ['SaaS', 'Logistics', 'Healthcare', 'B2B', 'Web', 'Mobile'], '67bca4507c756514f91c5051_774b0ffe8e763c75cb248e0d62eb620a_signature-cover.webp', '6895d4049164418542eafa97_signaturepharm-cover-mobile.webp'),
 ('hr-hub', 'HR Hub', 'SaaS web & mobile app for employee management', ['HR', 'ERP', 'SaaS', 'B2B', 'Web', 'Mobile'], ['HR', 'ERP', 'SaaS', 'B2B', 'Web', 'Mobile'], '67bd84771e0cc83385cd68b3_278fd629b50804732d6fcabbb4b94115_hrhub-cover.webp', '6895d4fc0d09a69b0c9f1fda_hrhub-cover-mobile.webp'),
 ('persuasion-systems', 'Persuasion Systems', 'CRM for Healthcate', ['Healthcare', 'CRM', 'SaaS', 'B2B', 'Web'], ['Healthcare', 'CRM', 'SaaS', 'B2B', 'Web'], '6900d29a5b411f34b3b962bc_46648e2763a1792b11f7d31697f737cb_ps.webp', '6900d4522b3927d96771187b_22386f3f09bef9e58856f74ecb9ade9b_ps-mob.png'),
 ('brightgate', 'Brightgate', 'LMS for course management', ['LMS', 'SaaS', 'B2B', 'Web', 'Mobile'], ['LMS', 'SaaS', 'B2B', 'Web', 'Mobile'], '6900d218eac65bf3a4a832d7_brgt.webp', '6900d408924609f49bce9d7b_brgt-mob.webp'),
 ('quintessia', 'Quintessia', 'Marketplace', ['E-Commerce', 'Marketplace', 'B2B', 'Web'], ['E-Commerce', 'Marketplace', 'B2B', 'Web'], '67bdc93c878520b7ed7ce128_d6dafba6d9d4eb485374a4b634de3509_quintessia-cover.webp', '6895d585c7f26d08db9a232e_quintessia-cover-mobile.webp'),
 ('hotsheet', 'HotSheet', 'CRM for real estate agents', ['Proptech', 'CRM', 'B2B', 'Web', 'Mobile'], ['Proptech', 'CRM', 'B2B', 'Web', 'Mobile'], '67bdca0defec4eae92056b90_3b6572e729f7e0864a632785cd24dfd1_image%20790.webp', None),
 ('momento', 'Momento', 'Social media mobile app', ['Web3', 'Social Media', 'B2C', 'Mobile'], ['Web3', 'Social Media', 'B2C', 'Mobile'], '67bdcb89d1255f06c738f418_49de85024855e83ad116e8f9e4a7d046_momento-cover.webp', '6895d6eb3291078216af3688_momento-cover-mobile.webp'),
 ('whodunnit-2-0', 'Whodunnit', 'Party game mobile app', ['Gaming', 'B2C', 'Mobile'], ['Gaming', 'B2C', 'Mobile'], '6900d198d9250957b0fdbd1a_whod.webp', '6900d3acc2f03179f5b71ee9_whod-mob.webp'),
 ('mynqs', 'MyNQS', 'Injury registry platform for the US National Quality System', ['Health', 'SaaS', 'Web'], ['Healthcare', 'SaaS', 'Web'], '6900d4da78d52f72405da614_myn.webp', '6900d51a27cb21d3c8b516d1_myn-mob.webp'),
]
FILTERS = ['All', 'HR', 'Healthcare', 'SaaS', 'Logistics', 'B2B', 'Web', 'Mobile', 'E-Commerce', 'CRM', 'Proptech', 'Web3', 'Gaming', 'Marketplace', 'B2C', 'LMS', 'ERP', 'Marketing', 'Social Media']
STATS = [('Web apps', '100'), ('Mobile apps', '75'), ('Websites', '125'), ('Totally', '300+')]

def card(c):
    slug, name, desc, tags, cats, desk, mob = c
    src = f'<source media="(max-width: 767px)" srcset="{CDN}{mob}">' if mob else ''
    return f'''      <a class="case" href="{slug}.html" data-cats="{e('|'.join(cats))}">
        <picture>{src}<img src="{CDN}{desk}" alt="{e(name)} — {e(desc)}" loading="lazy" width="1320" height="637"></picture>
        <div class="case__shade"></div>
        <div class="case__body">
          <div><h2 class="case__name">{e(name)}</h2><p class="case__desc">{e(desc)}</p></div>
          <div class="case__tags">{''.join(f'<span>{e(t)}</span>' for t in tags)}</div>
        </div>
      </a>'''

def build():
    pills = '\n'.join(f'      <button class="pill{" is-active" if f == "All" else ""}" type="button" data-filter="{e(f)}" aria-pressed="{"true" if f == "All" else "false"}">{e(f)}</button>' for f in FILTERS)
    stats = '\n'.join(f'        <div class="cs-stat"><p class="cs-stat__label">{e(l)}</p><p class="cs-stat__num">{n}</p></div>' for l, n in STATS)
    out = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Case Studies | K&amp;Z Design</title>
  <meta name="description" content="Products that already benefited from our partnership. We put our knowledge and 11+ years of experience to help your digital product become the best version of itself.">
  <link rel="icon" href="assets/mark-orange.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link rel="preload" href="fonts/outfit-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,500,700,701&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design-system/tokens.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/service.css">
  <link rel="stylesheet" href="css/cases.css">
  <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Home","item":"https://www.kz.design/"}},{{"@type":"ListItem","position":2,"name":"Case studies","item":"https://www.kz.design/cases"}}]}}</script>
</head>
<body>

{nav_fix(header, 'cases')}

<main>

<!-- ================= Hero ================= -->
<section class="cs-hero dark">
  <img class="cs-hero__bg" src="{CDN}67bdce53bcbd82790b1d068a_46094da4b95826d0f3d6c36913fc434b_cases-cover.webp" alt="" fetchpriority="high">
  <nav class="crumbs" aria-label="Breadcrumb">
    <div class="container"><ol><li><a href="index.html">Home</a></li><li aria-current="page">Case studies</li></ol></div>
  </nav>
  <div class="container cs-hero__body">
    <p class="eyebrow">Case studies</p>
    <h1 class="cs-hero__title">Products that already<br>benefited from our<br>partnership</h1>
    <div class="cs-hero__foot">
      <p class="cs-hero__sub">We put our knowledge and 11+ years of experience to help your digital product become the best version of itself.</p>
      <div class="cs-stats">
{stats}
      </div>
    </div>
  </div>
</section>

<!-- ================= Filters + list ================= -->
<section class="cs-list" id="cases">
  <div class="container">
    <div class="cs-filters" role="group" aria-label="Filter case studies by category">
{pills}
    </div>
    <div class="cases__list cs-list__items">
{chr(10).join(card(c) for c in CASES)}
    </div>
  </div>
</section>

{contact}

</main>

{nav_fix(footer, 'cases')}

<script src="js/main.js"></script>
<script src="js/cases.js" defer></script>
</body>
</html>
'''
    open(ROOT + 'cases.html', 'w').write(out)
    return 'cases.html', len(out)

if __name__ == '__main__':
    print(build())
