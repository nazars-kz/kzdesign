"""Builds pages/reviews.html: hero, the Clutch reviews widget (type 5, all reviews), a CTA card,
then the shared Contact block and footer. Texts copied from https://www.kz.design/reviews."""
from build_services import header, contact, footer, nav_fix, ROOT
from kzsite import place

def build():
    out = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reviews | K&amp;Z Design</title>
  <meta name="description" content="We turn ambitious ideas into thoughtful designs that change businesses. Read what our partners say about working with K&amp;Z Design on Clutch.">
  <link rel="icon" href="assets/mark-orange.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link rel="preload" href="fonts/google-sans-flex-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,500,700,701&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design-system/tokens.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/drawer.css">
  <link rel="stylesheet" href="css/service.css">
  <link rel="stylesheet" href="css/reviews.css">
  <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Home","item":"https://www.kz.design/"}},{{"@type":"ListItem","position":2,"name":"Reviews","item":"https://www.kz.design/reviews"}}]}}</script>
</head>
<body>

{nav_fix(header, 'reviews')}

<main>

<!-- ================= Breadcrumbs ================= -->
<nav class="crumbs" aria-label="Breadcrumb">
  <div class="container"><ol><li><a href="index.html">Home</a></li><li aria-current="page">Reviews</li></ol></div>
</nav>

<!-- ================= Hero ================= -->
<section class="rv-hero">
  <div class="container">
    <h1 class="rv-hero__title">Reviews</h1>
    <p class="rv-hero__sub">We turn ambitious ideas into thoughtful designs that change businesses. Every feedback is a reflection of our approach to work: individual solutions, creativity and maximum attention to detail in every project.</p>
  </div>
</section>

<!-- ================= Clutch reviews (third-party widget, all reviews) ================= -->
<section class="rv-list">
  <div class="container">
    <div class="rv-widget clutch-widget" data-url="https://widget.clutch.co" data-widget-type="5" data-height="auto" data-nofollow="true" data-expandifr="true" data-scale="100" data-header-color="#121212" data-footer-color="#121212" data-primary-color="#FC814A" data-secondary-color="#FC814A" data-clutchcompany-id="2218631"></div>
  </div>
</section>

<!-- ================= CTA ================= -->
<section class="rv-cta">
  <div class="container">
    <div class="rv-cta__card">
      <img class="rv-cta__mark" src="assets/mark-orange.svg" alt="" width="39" height="12">
      <h2 class="rv-cta__title">Let's increase chances<br>of your business for success with our expertise</h2>
      <p class="rv-cta__sub">Contact us to discover how exceptional design can drive your business forward.</p>
      <a class="btn btn--dark" href="pages/contact-us.html" data-drawer="book">Get in touch<i class="btn__arrow"></i></a>
    </div>
  </div>
</section>

{contact}

</main>

{nav_fix(footer, 'reviews')}

<script src="js/main.js"></script>
<script src="js/drawer.js"></script>
<script src="https://widget.clutch.co/static/js/widget.js" defer></script>
</body>
</html>
'''
    dest = 'pages/reviews.html'
    open(ROOT + dest, 'w').write(place(out, dest))
    return dest, len(out)

if __name__ == '__main__':
    print(build())
