"""Builds pages/contact-us.html: the shared Contact block (same as on every page: founders + the contact drawer embedded as the form,
js/drawer.js mounts it into [data-contact-inline]). Re-run after editing index.html."""
import re
from build_services import header, contact, footer, nav_fix, ROOT
from kzsite import place

def build():
    c = contact
    # one H1 per page: the block title becomes the page title
    c = c.replace('<h2 class="contact__title">', '<h1 class="contact__title">', 1).replace('</h2>', '</h1>', 1)
    c = c.replace('<section class="contact dark" id="contact">', '<section class="contact contact--page dark" id="contact">', 1)
    out = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contact Us | K&amp;Z Design</title>
  <meta name="description" content="Let's take your product to the next level. No calls with sales: book an intro call or send a message and get to chat with our CEO. We reply within one business day.">
  <link rel="icon" href="assets/mark-orange.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link rel="preload" href="fonts/google-sans-flex-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,500,700,701&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design-system/tokens.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/drawer.css">
</head>
<body>

{nav_fix(header, 'contact-us')}

<main>

{c}

</main>

{nav_fix(footer, 'contact-us')}

<script src="js/main.js"></script>
<script src="js/drawer.js"></script>
</body>
</html>
'''
    dest = 'pages/contact-us.html'
    open(ROOT + dest, 'w').write(place(out, dest))
    return dest, len(out)

if __name__ == '__main__':
    print(build())
