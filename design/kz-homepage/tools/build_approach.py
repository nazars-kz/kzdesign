"""Builds approach.html. Shared blocks (header, industries, testimonials, contact, footer) come from index.html."""
from build_services import block, header, testi, contact, footer, nav_fix, CDN, ROOT, e

industries = block('Industries', 'FAQ').replace('<section class="industries dark">', '<section class="industries dark ap-industries">')

PHASES = [
 ('discovery', 'Discovery', 'Via user interviews and analytics, we get a picture of who your users are, what they need and what are their goals.',
  '679babb739bc2df0793c9a99_Discovery%20(4W)%20.json', [
  ('What is the product about? <span>aka workshops</span>', 'Here we establish a comprehensive understanding of your: &nbsp;business, vision, project goals. To make this understanding happen - we read your manifesto (and other relevant docs), meet with you &amp; your team, and collect all your-business knowledge we need/can.'),
  ('Who are user &amp; what are their goals? <span>aka user research</span>', 'Via user interviews and analytics, we get a picture of who your users are, what they need and what are their goals.'),
  ('What is the current product condition? <span>aka UX/UI audit</span>', 'If you do have an existing product, we evaluate its current state to check how it serves business objectives and project goals. This includes an audit of usability, clarity, and ease of task completion, use of design elements &amp; its consistency, etc. As the result, we prepare a prioritization matrix that considers recommended changes, their impact and required effort.'),
  ('What competitors do? <span>aka competitor analysis</span>', 'We analyze existing players to understand their value proposition and its execution to inform your competitive advantage. Looking at the similar products in the market helps us to determine which features are key ones and where the golden (or at least silver) opportunities lies.')]),
 ('strategy', 'Strategy', 'Like for every construction work, good architecture blueprint/drawings is a must, strategy phase is a must for any UX/UI project. Here we define persona &amp; map user journey, design information architecture, prioritize features on value and effort, and build a design roadmap.',
  '679babb630c5c4f2bf1becff_Strategy%20(blueprint)%20.json', [
  ('Persona &amp; User Journey Mapping', 'Here we create personas as consolidated picture of most probable customer archetypes for your product. The goal here is to make step further from understanding users to defining their user stories - how/why/when they use the product. As the result, we are able to see &amp; describe all the interactions, uncover potential pain points, bottlenecks &amp; opportunities.'),
  ('Information architecture', 'Based on the insights gathered through a discovery phase, we create an information architecture - a scheme, skeleton of the product that ensures straightforward simple navigation, and fast intuitive access to features &amp; data.'),
  ('Feature prioritization', "At this point we already know all the features that have to be created or updated - so next step is to define the priority &amp; order. That's where a prioritization matrix comes in handy. <br><br>In this matrix, we rank each feature based on two things: how valuable it is (to the user &amp; your business) and how much effort it'll take to get it done. Features in the top-left corner are Quick Wins – they're easy &amp; sweet and should be our top priority. Features in the bottom-right corner, on the other hand, are Time Sinks – they're not worth our time right now and should be put on the back burner."),
  ('Design roadmap', 'When features are prioritized, we build out a design roadmap for the project. The roadmap lays out the design tasks in detail for each 2-week sprint to provide clarity to you on what will be completed and by when. The roadmap is designed to be a living document that will evolve to reflect any priority update.')]),
 ('design', 'UX/UI design', 'The Design phase is an iterative process that begins with low-fidelity wireframes &amp; schematic flows and goes all the way up to fully-documented pixel-perfect high-fidelity mock-ups &amp; prototypes that ready for development.',
  '679babb67edbbcbe66495827_UX_UI%20Design%20(The%20DESIGN,%20finally)%20.json', [
  ('Iterative wireframing', "Here we create low fidelity sketches, screenshot collages, etc., discuss and analyze them with business &amp; product owners to define basic layouts, interactions, user journeys. <br><br>We don't buy the idea of traditional black and white wireframes. With the current sophistication of design systems, it's unnecessary time &amp; money wastage to create those when we can establish the visual style and produce nearly high-fidelity screens immediately."),
  ('Visual style &amp; design system', "We use client input and iterations to nail down the product's look and feel, aligning it with business vision and UX standards. Then, we set up a design system based on the defined style to ensure consistency and cost &amp; time effective design work."),
  ('High fidelity design', 'Produce screens flow by flow with underline documentation, logical action sequences based on the defined user journeys &amp; functionality.'),
  ('User testing', 'We see users as crucial participants in any product design process. By involving them in testing, we gain unique insights that almost impossible to get from stakeholders or internal testing. Alongside usability tests and interviews, we may engage users to give feedback on wireframes and help us ensure the product does what it was designed to do in real-world situations through user acceptance testing (UAT).'),
  ('Pre-development preparation &amp; hand-off', 'We provide structured Figma with design system, components &amp; variants, and all instructions for developers, so they will have all the required materials. Also, we conduct meetings with engineers to ensure their understanding of the product &amp; design ways.'),
  ('Development support &amp; post-development testing', 'We help developers providing on-demand explanation &amp; other design support. After development is done we perform design testing to support successful implementation and ensure that everything works and looks and it suppose to.')]),
 ('prototyping', 'Prototyping', 'Prototypes are somewhere between a design concept and a fully developed app. They allow you to prove the product value even before development via user testing or make a shiny pitch to potential investors.',
  '679babb72ad0bf8f2eb8d9ca_Prototyping.json', [
  ('Interactive (clickable) prototypes', "We create prototypes and test them to gain insights, refine, and enhance our partners' products. Via prototypes of different levels of fidelity, we validate hypotheses and uncover new questions, area for improvements, or opportunities well before our solutions meet market."),
  ('Animated video', 'Optionally, we produce a polished video showreel to spotlight the interface in action. These can be used in marketing materials to effectively communicate the value proposition and attract users.')]),
]

def phase(i, p):
    pid, label, intro, lottie, items = p
    rows = '\n'.join(f'          <div class="acc-row"><button class="acc-row__head" type="button" aria-expanded="false"><span class="acc-row__label">{t}</span><i class="plus"></i></button><div class="acc-row__body"><div><p>{a}</p></div></div></div>' for t, a in items)
    return f'''<section class="phase{' phase--rev' if i % 2 else ''}" id="{pid}">
  <div class="container">
    <div class="phase__inner">
      <div class="phase__text">
        <p class="eyebrow">{label}</p>
        <p class="phase__intro">{intro}</p>
        <div class="phase-acc js-accordion">
{rows}
        </div>
      </div>
      <div class="phase__visual js-lottie-hover"><div class="js-lottie" data-src="{CDN}{lottie}" aria-hidden="true"></div></div>
    </div>
  </div>
</section>'''

def build():
    out = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Approach | K&amp;Z Design</title>
  <meta name="description" content="We tackle the most complex UX/UI challenges. Whether you're adding new features, launching a new product, or improving an existing one, we got you covered.">
  <link rel="icon" href="assets/mark-orange.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link rel="preload" href="fonts/google-sans-flex-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,500,700,701&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design-system/tokens.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/drawer.css">
  <link rel="stylesheet" href="css/approach.css">
  <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"Home","item":"https://www.kz.design/"}},{{"@type":"ListItem","position":2,"name":"Approach","item":"https://www.kz.design/approach"}}]}}</script>
</head>
<body>

{nav_fix(header, 'approach')}

<main>

<!-- ================= Breadcrumbs ================= -->
<nav class="crumbs" aria-label="Breadcrumb">
  <div class="container"><ol><li><a href="index.html">Home</a></li><li aria-current="page">Approach</li></ol></div>
</nav>

<!-- ================= Hero ================= -->
<section class="ap-hero">
  <div class="container">
    <h1 class="ap-hero__title">Approach</h1>
    <div class="ap-hero__row">
      <div>
        <p class="ap-hero__sub">We tackle the most complex UX/UI challenges. Whether you're adding new features, launching a new product, or improving an existing one, we got you covered and help your business thrive.</p>
        <nav class="ap-pills" aria-label="Process steps"><a href="#discovery">Discovery</a><a href="#strategy">Strategy</a><a href="#design">UX/UI design</a><a href="#prototyping">Prototyping</a></nav>
      </div>
      <figure class="ap-quote">
        <blockquote>“Our whole process is quite big and sophisticated and could look a bit too much for your current situation - no worries, our main rule is <b>design for business, not design for design</b>. So, we’ll take only the steps necessary in your particular situation to get the best results within the current limitations.”</blockquote>
        <figcaption class="who"><img src="{CDN}6846dac160b7d4f40d4e4b01_image.png" alt="Vlad Kyrieiev" width="48" height="48"><span style="margin-left:0"><b>Vlad Kyrieiev</b><span>Founder &amp; CEO</span></span></figcaption>
      </figure>
    </div>
  </div>
</section>

<!-- ================= Phases ================= -->
{chr(10).join(phase(i, p) for i, p in enumerate(PHASES))}

<!-- ================= Industries (shared with Home) ================= -->
{industries}

{testi}

{contact}

</main>

{nav_fix(footer, 'approach')}

<script src="js/main.js"></script>
<script src="js/drawer.js"></script>
<script src="js/vendor/lottie_svg.min.js" defer></script>
<script src="js/lottie-hover.js" defer></script>
</body>
</html>
'''
    from kzsite import place
    open(ROOT + 'pages/approach.html', 'w').write(place(out, 'pages/approach.html'))
    return 'pages/approach.html', len(out)

if __name__ == '__main__':
    print(build())
