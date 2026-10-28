"""Builds saas.html, mobile.html, web.html from one template.
Shared blocks (header, testimonials, contact, footer) are copied from index.html,
so every page uses identical markup. Re-run after editing index.html."""
import html, os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + os.sep
idx = open(ROOT + 'index.html').read()

def block(name, nxt):
    a = idx.index(f'<!-- ================= {name} ================= -->')
    b = idx.index(f'<!-- ================= {nxt} ================= -->') if nxt else idx.index('<script src="js/main.js">')
    return idx[a:b].rstrip()

header = block('Header', 'Hero').replace('\n<main>', '')
testi = block('Testimonials', 'Partners')
contact = block('Contact', 'Footer').replace('</main>', '').rstrip()
footer = block('Footer', None)

CDN = 'https://cdn.prod.website-files.com/66718c0f38efb9085e3bd104/'
ARROW = '<i class="btn__arrow"></i>'

PARTNERS = ['68a8b7ff3c8efc2d3a429350_Frame%201632528936.svg', '68a8b81b8917b4b5f073026d_Frame%201632528939.svg',
 '68a8b81b4be1a4ff1e1589b0_Frame%201632528950.svg', '68a8b81b15f3c5d927dd28ed_Frame%201632528955.svg',
 '68a8b81b73bc7cb53e60eb6f_Frame%201632528948.svg', '68a8b81b0c67a4fb68188869_Frame%201632528954.svg',
 '69a0b0287f88ba3083692ebb_Partner-003.svg', '69a0b0282ea3ca30fb2cb895_Partner-002.svg', '69a0b028c3674b543c39d0e1_Partner-004.svg',
 '69a0b02866c5e22a3ba7c155_Partner-008.svg', '69a0b02886a3ce5adc7db7f8_Partner-010.svg', '69a0b02831c05b2065d0bd8a_Partner-001.svg',
 '69a0b028c7803a85fbd5988d_Partner-007.svg', '69a0b0285b9c99cf71a257a9_Partner-006.svg', '69a0b028dd37119c08b0ad0c_Partner-009.svg',
 '69a0b0286e7b50cdb83700c1_Partner-011.svg', '69a0b0280ae43ea24d238b63_Partner-005.svg', '69a0b0280ae43ea24d238b6a_Partner-012.svg',
 '69a0b029e38e795e8a004909_Partner-013.svg', '69a0b029a19df64904a7cb35_Partner-018.svg', '69a0b029603b0d0ecea07722_Partner-016.svg',
 '69a0b0295b191a99bb4c25c1_Partner-014.svg', '69a0b02999625ea742779713_Partner-017.svg', '69a0b0296d167c3f086a09ca_Partner-015.svg']

CASES = {
 'signal-sigma': ('Signal Sigma', 'Investment Strategy Platform', ['FinTech', 'Web App', 'UI/UX Design'], '6980c0f3b209f59ad8dfbe97_ss-cover-desk.webp', '6980c100040671c9f29e971f_ss-cover-mob.webp'),
 'print-buy': ('Print buy', 'Creative Tech & Marketing', ['Saas', 'web', 'UI/UX Design'], '6980bf450e234e583bdd6b38_pp-cover-desk.webp', '6980bfa1378df4c5673c0b30_pp-cover-mob.webp'),
 'onground': ('Onground', 'Private jet cleaning platform', ['SAAS', 'Web', 'Ui/ux design'], '685ebc45e9a6a5582fcdafae_89fed884cc985870081400744711565f_onground-cover.webp', '6895cf710fda0f5332781162_onground-cover-mobile.webp'),
 'vidsprint': ('VidSprint', 'Order management & CRM for marketing agency', ['marketing', 'CRM', 'SaaS', 'b2b', 'Web', 'Mobile'], '67bdc861d1e1b7914e633a78_0df011d58e4d006e28f3af17fd526420_Frame%202087327192.webp', '6895d22113ceedce19f4cee7_vidsprint-cover-mobile.webp'),
 'filmtoro': ('Filmtoro', 'Creative Tech & Marketing', ['Marketing', 'APP', 'UI/UX Design'], '6980c088e9d773acd28a7e03_filmtoro-desk-cover.webp', '6980c0917a9c0fed664d17a4_filmtoro-mob-cover.webp'),
 'touren': ('Touren', 'Off-road navigation & community platform', ['sport', 'Saas', 'Web', 'navigation', 'b2c'], '685ebc4571c27cacbb2d5bba_49e11cc85160f9c6754a54576de097d6_touren-cover.webp', None),
 'listen-upp': ('Listen Upp', 'Social & mental health app', ['Health', 'mobile'], '685ebc46df82f23058fa516a_listenupp-cover.webp', '6895d35995b6669bc1093abb_listenupp-cover-mobile.webp'),
 'momento': ('Momento', 'Social media mobile app', ['web3', 'Social Media', 'b2c', 'mOBILE'], '67bdcb89d1255f06c738f418_49de85024855e83ad116e8f9e4a7d046_momento-cover.webp', '6895d6eb3291078216af3688_momento-cover-mobile.webp'),
 'quintessia': ('Quintessia', 'Marketplace', ['E-commerce', 'Marketplace', 'b2b', 'Web'], '67bdc93c878520b7ed7ce128_d6dafba6d9d4eb485374a4b634de3509_quintessia-cover.webp', '6895d585c7f26d08db9a232e_quintessia-cover-mobile.webp'),
}

SERVICES = {
 'saas': dict(file='saas.html', crumb='SaaS', title='SaaS, Web App, Software', next_title='SaaS, Web App, Software',
   next_desc='Business needs and industry specifics driven design with strong information architecture and design system foundation that creates the best solution for your users and effortless deals for your sales team.',
   next_img='697cd990b77be5223711d6ca_ssp-03.webp', hero='697b5d15e4e5828b1210ddb9_ssp-img-1.webp', device='697b7a6f043c70a1aa7fee2b_git-macbook.svg',
   about=['Business needs and industry specifics driven design with strong information architecture and design system foundation that creates the best solution for your users and effortless deals for your sales team.',
          'K&Z is driven by two founders who at the same time occupy C-level positions in SaaS startup themselves, also both founders have been Head of Designs in product companies before establishing K&Z. So we understand this world very well and know how to support business with design'],
   founders=True, cases=['signal-sigma', 'print-buy', 'onground', 'vidsprint'], next=['mobile', 'web'],
   meta='Business needs and industry specifics driven SaaS, web app and software design with strong information architecture and design system foundation.'),
 'mobile': dict(file='mobile.html', crumb='Mobile apps', title='Mobile apps', next_title='Mobile Apps',
   next_desc='User flow and employee performance driven mobile app design for your B2B product.',
   next_img='697cca226ec98cb3f81230e7_ssp-01.webp', hero='697cda24e7f28aa8b44a3011_mob-apps-bg.webp', device='697cd9173372110de9dffa0a_git-mob.webp',
   about=['User flow and employee performance driven mobile app design for your B2B product. User-centered and conversion-optimized mobile experience for your product to reach App Store and Google Play top for B2C.'],
   founders=False, cases=['filmtoro', 'touren', 'listen-upp', 'momento'], next=['saas', 'web'],
   meta='User flow and employee performance driven mobile app design for your B2B product. User-centered mobile experience to reach App Store and Google Play top.'),
 'web': dict(file='web.html', crumb='Websites', title='Websites', next_title='Web Design',
   next_desc='Conversion and brand positioning driven web design for your website to help leads and visitors find the fastest way to actions necessary for your business',
   next_img='697cd7c7159209b33a8d0f0c_ssp-02.webp', hero='697cdaf405eae4c4dc92966a_web-bg.png', device='697cdaa4806d524e75b0be16_Mac%20Studio.webp',
   about=['Conversion and brand positioning driven web design for your website to help leads and visitors find the fastest way to actions necessary for your business'],
   founders=False, cases=['touren', 'quintessia'], next=['mobile', 'saas'],
   meta='Conversion and brand positioning driven web design to help leads and visitors find the fastest way to actions necessary for your business.'),
}
# Order of "Next service" cards on the live pages: saas → Mobile, Web; mobile → SaaS, Web; web → Mobile, SaaS.

# Pages already ported to local HTML: live links to them are rewritten to the local file
LOCAL_PAGES = {'cases': 'cases.html', 'about-us': 'about-us.html'}
CASE_SLUGS = ['signal-sigma', 'touren', 'filmtoro', 'print-buy', 'onground', 'vidsprint', 'listen-upp', 'signature-pharmacy',
              'hr-hub', 'persuasion-systems', 'brightgate', 'quintessia', 'hotsheet', 'momento', 'whodunnit-2-0', 'mynqs']
LOCAL_PAGES.update({s: f'{s}.html' for s in CASE_SLUGS})

e = lambda s: html.escape(s, quote=False)

def case_card(slug):
    name, desc, tags, desk, mob = CASES[slug]
    pic = f'<picture>{f"<source media=\"(max-width: 767px)\" srcset=\"{CDN}{mob}\">" if mob else ""}<img src="{CDN}{desk}" alt="{e(name)} — {e(desc)}" loading="lazy" width="652" height="637"></picture>'
    tg = ''.join(f'<span>{e(t)}</span>' for t in tags)
    return f'''      <a class="case case--stack" href="{slug}.html">
        {pic}
        <div class="case__shade"></div>
        <div class="case__body">
          <div><h3 class="case__name">{e(name)}</h3><p class="case__desc">{e(desc)}</p></div>
          <div class="case__tags">{tg}</div>
        </div>
      </a>'''

FOUNDERS = f'''      <div class="svc-founders">
        <div class="founder">
          <img src="{CDN}69b2efb53f51f450d5a0acf5_vlad.webp" alt="Vlad Kyrieiev" width="94" height="113" loading="lazy">
          <div class="founder__text">
            <h3 class="founder__name">Vlad Kyrieiev</h3>
            <p class="eyebrow">(CEO)</p>
            <p class="founder__bio">Serial design entrepreneur &amp; leader with 10+ years of experience solving the most challenging UX issues.</p>
            <p class="founder__ex">Ex-Head of Design in US ERP product</p>
          </div>
        </div>
        <div class="founder">
          <img src="{CDN}69b2efdfdb60f7150624b100_nick.webp" alt="Nick Zhurenko" width="94" height="113" loading="lazy">
          <div class="founder__text">
            <h3 class="founder__name">Nick Zhurenko</h3>
            <p class="eyebrow">(COO &amp; Head of Design)</p>
            <p class="founder__bio">Design leader, AI-enthusiast, product builder, lecturer, design coach with 10+ years in the field.</p>
            <p class="founder__ex">Ex Head of Design in US CRM development company</p>
          </div>
        </div>
      </div>'''

def nav_fix(s, key):
    # Services → local files; mark Services active on service pages
    s = s.replace('href="https://www.kz.design/saas"', 'href="saas.html"').replace('href="https://www.kz.design/mobile"', 'href="mobile.html"').replace('href="https://www.kz.design/web"', 'href="web.html"')
    s = s.replace('href="#services"', 'href="index.html#services"')
    for slug, f in LOCAL_PAGES.items():
        s = s.replace(f'href="https://www.kz.design/{slug}"', f'href="{f}"')
    s = s.replace('class="nav__link is-active" href="index.html"', 'class="nav__link" href="index.html"')
    if key in SERVICES:
        s = s.replace('<a class="nav__link" href="index.html#services" aria-haspopup="true">', '<a class="nav__link is-active" href="index.html#services" aria-haspopup="true">')
        s = s.replace(f'<a href="{SERVICES[key]["file"]}">', f'<a href="{SERVICES[key]["file"]}" aria-current="page">', 1)
    return s

def page(key):
    S = SERVICES[key]
    about = '\n'.join(f'        <p>{e(p)}</p>' for p in S['about'])
    nxt = '\n'.join(f'''      <a class="case case--stack" href="{SERVICES[n]['file']}">
        <picture><img src="{CDN}{SERVICES[n]['next_img']}" alt="{e(SERVICES[n]['next_title'])}" loading="lazy" width="652" height="550"></picture>
        <div class="case__shade"></div>
        <div class="case__body"><div><h3 class="case__name">{e(SERVICES[n]['next_title'])}</h3><p class="case__desc">{e(SERVICES[n]['next_desc'])}</p></div></div>
      </a>''' for n in S['next'])
    logos = ''.join(f'<img src="{CDN}{p}" alt="" width="200" height="94" loading="lazy">' for p in PARTNERS)
    out = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(S['title'])} | K&amp;Z Design</title>
  <meta name="description" content="{e(S['meta'])}">
  <link rel="icon" href="assets/mark-orange.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link rel="preload" href="fonts/outfit-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,500,700,701&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design-system/tokens.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/service.css">
  <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Home","item":"https://www.kz.design/"}},{{"@type":"ListItem","position":2,"name":"{e(S['crumb'])}","item":"https://www.kz.design/{key}"}}]}}</script>
</head>
<body>

{nav_fix(header, key)}

<main>

<!-- ================= Hero image + breadcrumbs ================= -->
<div class="svc-hero" style="background-image:url({CDN}{S['hero']})">
  <nav class="crumbs" aria-label="Breadcrumb">
    <div class="container">
      <ol><li><a href="index.html">Home</a></li><li aria-current="page">{e(S['crumb'])}</li></ol>
    </div>
  </nav>
</div>

<!-- ================= Title ================= -->
<section class="svc-title">
  <div class="container"><h1>{e(S['title'])}</h1></div>
</section>

<!-- ================= About ================= -->
<section class="svc-about">
  <div class="container">
    <p class="eyebrow">About</p>
    <div>
      <div class="svc-about__text">
{about}
      </div>
{FOUNDERS if S['founders'] else ''}
    </div>
  </div>
</section>

<!-- ================= Features ================= -->
<section class="svc-features">
  <div class="container svc-features__list">
    <article class="feature">
      <div class="feature__text"><h2 class="feature__title">No middlemen.<br>Only design people</h2><p>No sales, no project managers, no business analysts – you always speak with designers. We believe that best products are born by direct communication between product and design sides.</p></div>
      <img src="{CDN}697b698a17d6cc40b37198b7_d5caac040e0bb1b65fc81e14a9849383_feat-1.svg" alt="Client connected directly to the design team" width="429" height="383" loading="lazy">
    </article>
    <article class="feature">
      <div class="feature__text"><h2 class="feature__title">Communication<br>&amp; Updates</h2><p>Daily updates on what is done today + requests/questions/blockers. Recurring meetings (at least 1 meeting per week for active design phase)</p></div>
      <img src="{CDN}697b6a0f7adafd6be9277514_feature-2.svg" alt="Timeline of daily updates and weekly meetings" width="429" height="383" loading="lazy">
    </article>
    <article class="feature">
      <div class="feature__text"><h2 class="feature__title">Designs created<br>to be developed</h2><p>Design system based on the libraries Devs use (Tailwind, Material ui, Shadcn, etc). Figma files organized by flows with inline documentation</p></div>
      <img src="{CDN}697b6a36adee6f369b86ac4c_feat-3.svg" alt="Figma components mapped to code" width="429" height="383" loading="lazy">
    </article>
  </div>
</section>

<!-- ================= Case studies ================= -->
<section class="svc-cases" id="cases">
  <div class="container">
    <p class="eyebrow">Case Studies</p>
    <h2 class="h-section svc-cases__title">Check how K&amp;Z keeps partners ahead<br>in the digital landscape</h2>
    <div class="svc-cases__grid">
{chr(10).join(case_card(c) for c in S['cases'])}
    </div>
    <div class="svc-cases__all">
      <a class="link-arrow" href="cases.html"><span class="link-arrow__text">See all cases</span><span class="link-arrow__icon"></span></a>
    </div>
  </div>
</section>

<!-- ================= Got an idea ================= -->
<section class="git">
  <div class="container">
    <div class="git__box">
      <h2 class="git__title">Got an Idea?<br>We're Ready to Listen.</h2>
      <a class="btn btn--light" href="https://www.kz.design/contact-us">Get in touch{ARROW}</a>
      <img class="git__device" src="{CDN}{S['device']}" alt="" loading="lazy">
    </div>
  </div>
</section>

<!-- ================= Process ================= -->
<section class="svc-process">
  <div class="container">
    <p class="eyebrow">Process</p>
    <h2 class="svc-process__title">Our Step-by-Step Guide to designing your product</h2>
    <div class="svc-process__rows">
      <div class="svc-process__row">
        <article class="step"><h3 class="step__head"><span>01</span> Discovery</h3><p>The first thing we do in K&amp;Z for every UX/UI design project is discovery or what we call 4W phase. In this phase we ask 4 questions - <b>What is the product about? Who are users &amp; what are their goals? What is the current product condition? What competitors do?</b> - and getting answers.</p></article>
        <article class="step"><h3 class="step__head"><span>02</span> Strategy (blueprint)</h3><p>Like for every construction work, good architecture blueprint/drawings is a must, strategy phase is a must for any UX/UI project. Here we define persona &amp; map user journey, design information architecture, prioritize features on value and effort, and build a design roadmap.</p></article>
      </div>
      <div class="svc-process__row">
        <article class="step"><h3 class="step__head"><span>03</span> UX/UI Design (The DESIGN, finally)</h3><p>The Design phase is an iterative process that begins with low-fidelity wireframes &amp; schematic flows and goes all the way up to fully-documented pixel-perfect high-fidelity mock-ups &amp; prototypes that ready for development.</p></article>
        <article class="step"><h3 class="step__head"><span>04</span> Prototyping</h3><p>Prototypes are somewhere between a design concept and a fully developed app. They allow you to prove the product value even before development via user testing or make a shiny pitch to potential investors.</p></article>
      </div>
    </div>
  </div>
</section>

<!-- ================= Partners ================= -->
<section class="svc-partners">
  <div class="container">
    <p class="eyebrow">Partners</p>
    <h2 class="svc-partners__title">Partners who trust us their user experience</h2>
    <div class="marquee" aria-label="Partner logos"><div class="marquee__track">{logos}</div></div>
  </div>
</section>

{testi}

{contact}

<!-- ================= Next service ================= -->
<section class="svc-next">
  <div class="container">
    <p class="eyebrow">Next service</p>
    <div class="svc-next__grid">
{nxt}
    </div>
  </div>
</section>

</main>

{nav_fix(footer, key)}

<script src="js/main.js"></script>
<script src="js/service.js" defer></script>
</body>
</html>
'''
    open(ROOT + S['file'], 'w').write(out)
    return S['file'], len(out)

if __name__ == '__main__':
    for k in SERVICES: print(page(k))
