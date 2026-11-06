# SEO-бриф для сайту kz.design (HTML-версія, `kz-homepage/`)

Інструкція для Claude: впровадити SEO-покращення на всіх сторінках, **крім вмісту кейсів** (`pages/cases/*`). Кейси будуть окремим завданням. Шаблон кейсу (title, meta, посилання, alt обкладинок) — можна.

Дані про ключові слова: дослідження Ubersuggest, листопад 2026 (Канада й Австралія — цільові ринки). Обсяг = пошуків на місяць, складність 0–100.

---

## 0. Правила роботи

- **Сторінки генеруються скриптами в `tools/`** (`build_services.py`, `build_cases.py`, `kzsite.py` тощо). Зміни вносити в генератори та дані, а не лише в готові `.html`, інакше наступна збірка їх зітре. `index.html`, якщо він пишеться вручну, — редагувати напряму.
- Не змінювати візуальний дизайн, стилі й анімації. Якщо нова розмітка (наприклад, H1 з іншим текстом) впливає на верстку, зберегти вигляд через CSS.
- Увесь текст на сайті — англійською.
- Не вигадувати фактів: метрик, клієнтів, офісів, нагород. Якщо потрібні дані, яких немає, поставити `TODO:` і перелічити їх у підсумку.
- Після змін — прогнати перевірку з розділу 10 і дати список того, що зроблено, і того, що потребує рішення від нас.

---

## 1. URL-адреси та переїзд з Webflow

Зараз живий сайт на Webflow має адреси `/saas`, `/cases`, `/touren` тощо. Нова версія — `pages/saas.html`, `pages/cases/touren.html`. Якщо адреси зміняться без редиректів, Google втратить уже проіндексовані сторінки.

1. **Чисті URL без `.html` і без `/pages/`.** Цільова структура:

   | Сторінка | Адреса |
   |---|---|
   | Головна | `/` |
   | SaaS | `/saas` |
   | Mobile | `/mobile` |
   | Websites | `/web` |
   | Кейси (список) | `/cases` |
   | Кейс | `/cases/touren` (див. п. 2) |
   | Approach | `/approach` |
   | About | `/about-us` |
   | Reviews | `/reviews` |
   | Contact | `/contact-us` |

   На Vercel: `vercel.json` з `"cleanUrls": true`, `"trailingSlash": false` і `rewrites` з `/saas` на `/pages/saas.html` (або змінити структуру збірки так, щоб файли лежали в корені). Усі внутрішні посилання — від кореня: `href="/saas"`, не `pages/saas.html`.

2. **Кейси.** На Webflow кейси живуть у корені (`kz.design/touren`). Рекомендую новий формат `/cases/touren` і **301-редиректи** зі старих адрес: `/touren` → `/cases/touren` для кожного з `CASE_SLUGS`. Додати в `vercel.json` → `redirects` з `"permanent": true`.

3. **Інші редиректи:** `/services` → `/saas` (на старому сайті є посилання `/services#discovery` тощо), будь-які `index.html` → `/`.

4. **Посилання на старий сайт.** Зараз частина посилань веде на `https://www.kz.design/approach#strategy`, `/privacy-policy`, `/terms-of-service`, `/cancellation-and-refund-policy`. Зробити їх відносними (`/approach#strategy`). Для юридичних сторінок створити прості сторінки в новій збірці або залишити `TODO`, якщо тексту немає — після переїзду ці посилання стануть битими.

5. **Сторінка 404** з навігацією і посиланнями на головні розділи.

---

## 2. Title і meta description

Зараз title загальні («Websites | K&Z Design», «SaaS, Web App, Software | K&Z Design»), і жоден не містить запитів, які шукають клієнти. Замінити на такі (до ~60 символів для title, ~150–160 для description):

| Сторінка | Title | Description |
|---|---|---|
| `/` | `UI/UX Design Agency for SaaS & B2B Products \| K&Z Design` | `K&Z Design is a UI/UX design agency for SaaS, web and mobile products. Founder-led team, developer-ready Figma, design systems. Seed to Series D.` |
| `/saas` | `SaaS UI/UX Design Agency \| K&Z Design` | `SaaS UI/UX design for web apps, dashboards and B2B software. Research, information architecture and design systems your developers can build from.` |
| `/mobile` | `Mobile App Design Agency for B2B Products \| K&Z Design` | `Mobile app UI/UX design for B2B and SaaS products: user flows, iOS and Android interfaces, and design systems ready for development.` |
| `/web` | `Website Design for SaaS & Tech Companies \| K&Z Design` | `Conversion-focused website design for SaaS and tech companies: positioning, structure and pages that turn visitors into leads.` |
| `/cases` | `UI/UX Design Case Studies: SaaS, Mobile & Web \| K&Z Design` | `Selected UI/UX design case studies: SaaS platforms, dashboards, CRM and mobile apps designed by K&Z Design for startups and B2B companies.` |
| `/approach` | `Our UX/UI Design Process \| K&Z Design` | `How we design digital products: discovery, strategy, UX/UI design and prototyping. A clear process with daily updates and developer-ready files.` |
| `/about-us` | `About K&Z Design — Founder-Led UI/UX Design Studio` | Залишити поточний, додати слова «UI/UX design studio» і «founder-led». |
| `/reviews` | `K&Z Design Reviews — Client Feedback on Clutch` | Залишити поточний. |
| `/contact-us` | `Contact K&Z Design — Talk Directly to Our CEO` | Залишити поточний. |
| Кейс | `{Назва} — {тип продукту} UI/UX Case Study \| K&Z Design` | `{Однорядковий опис з cases_data.py}. UI/UX design by K&Z Design.` — генерувати з даних кейсу. |

Ключові запити, на яких ґрунтуються формулювання:

| Запит | CA | AU | Складність | Сторінка |
|---|---|---|---|---|
| saas ui ux design agency | 110 | 50 | 19 / 22 | `/saas` |
| ui ux design agency | 210 | 110 | 46 / 12 | `/` |
| ux design agency | 170 | 170 | 36 / 43 | `/` |
| product design agency | 40 | 30 | 16 / 17 | `/` (вторинний) |
| dashboard design | 480 | 390 | 30 / 29 | `/saas` (блок) |
| mobile app design agency | 10 | — | 9 | `/mobile` |

---

## 3. Заголовки (H1–H3)

1. **Один H1 на сторінку, і в ньому головний запит сторінки.** Візуально можна зберегти поточний стиль:
   - Головна: зараз «Your reliable UX/UI design partner» → `Your reliable UI/UX design partner for SaaS and B2B products` (або залишити фразу як є, а запит додати в підзаголовок-eyebrow над H1 — але тоді eyebrow не H-тег, а запит має бути в H1 або першому абзаці).
   - `/saas`: «SaaS, Web App, Software» → `SaaS UI/UX design agency` + підзаголовок «Web apps, dashboards and B2B software».
   - `/mobile`: «Mobile apps» → `Mobile app design for B2B and SaaS products`.
   - `/web`: «Websites» → `Website design for SaaS and tech companies`.
   - `/approach`: «Approach» → `Our UX/UI design process`.
   - `/reviews`: «Reviews» → `Client reviews`.
2. **Порядок заголовків.** H1 має йти першим у документі. На `/saas` імена засновників (`Vlad Kyrieiev`, `Nick Zhurenko`) розмічені як H3 до H1 — замінити на `<p>`/`<span>` з класом.
3. **Не загортати абзаци в заголовки.** На сервісних сторінках H2 містять увесь текст блоку («No middlemen. Only design people No sales, no project managers…»). Заголовок — лише перша фраза, опис — у `<p>`. Те саме для H3 етапів процесу («01 Discovery The first thing we do…»).
4. **Змістовні H2 замість загальних**, де це не ламає тон:
   - «We were asked these» → `FAQ: working with K&Z Design`.
   - «Check how K&Z keeps partners ahead…» → можна залишити, але додати поруч текстове посилання «See all case studies».

---

## 4. Навігація та внутрішні посилання

1. **Назви в меню** — такі, як шукають люди: `SaaS & Web Apps`, `Mobile Apps`, `Websites`, `Case Studies`, `Approach`, `About`, `Reviews`, `Contact`.
2. **Футер:** посилання на всі сервісні сторінки, `/cases`, `/approach`, `/about-us`, `/reviews`, `/contact-us`, юридичні сторінки, а також профілі (Clutch, LinkedIn, Behance, Dribbble).
3. **Текст посилань.** Замість однакових «View case study» / «Learn more» — описовий текст або `aria-label`: `View Touren case study`, `SaaS UI/UX design services`.
4. **Перехресні посилання:** кожна сервісна сторінка → 3–4 релевантні кейси (вже є) + посилання на `/cases`; кожен кейс → відповідна сервісна сторінка (`Touren` → `/mobile`, `HR Hub` → `/saas`) і 2–3 інших кейси. Відповідність «кейс → послуга» тримати в `cases_data.py`.
5. **Хлібні крихти** на внутрішніх сторінках (`Home › Case Studies › Touren`) — і візуально, і в розмітці BreadcrumbList (розділ 7).
6. Жодна важлива сторінка не має бути «сиротою»: на кожну веде хоча б одне посилання з меню чи футера.

---

## 5. Контент сервісних сторінок (без кейсів)

Окремі сторінки під enterprise UX, дизайн-системи й UX-аудит поки **не створювати**: дослідження показало майже нульовий попит. Натомість додати на `/saas` короткі текстові блоки (H2 + 2–4 речення кожен):

- `Dashboard and data-heavy interface design` — аналітика, операційні дашборди;
- `Enterprise software: ERP and CRM interfaces`;
- `Design systems your developers can use` — Tailwind, Material UI, shadcn (уже згадується в тексті, винести в окремий блок);
- `UX audit of existing products`.

На головній — один абзац звичайним текстом, який прямо каже, хто ви (для Google і AI-пошуку):

> K&Z Design is a founder-led UI/UX design studio that designs SaaS platforms, web apps, dashboards and mobile apps for startups and B2B companies in the US, Canada, Australia and Europe.

(Перелік країн — **уточнити в нас** перед публікацією.)

Сторінки для Канади й Австралії — **не створювати**, поки ми не підтвердимо, чи вони вже існують.

---

## 6. Зображення

1. **Alt-тексти.** Зараз на головній 49 зображень із порожнім alt.
   - Декоративні (іконки, стрілки, фонові фігури) — `alt=""` правильно, залишити.
   - Змістовні — заповнити: обкладинки кейсів (`Touren off-road navigation app UI design`), логотипи клієнтів (`Touren logo`), фото людей (ім'я + роль), бейджі Clutch (назва нагороди).
   - Прапорці країн (`alt="USA"`) у відгуках — краще `alt=""` і країна текстом поруч, або `alt="Client from USA"`.
2. **`width` і `height`** на кожному `<img>` (зараз лише 16 зі 119 на головній) — щоб верстка не «стрибала» під час завантаження.
3. **`loading="lazy"`** для всього нижче першого екрана; для зображень першого екрана — `fetchpriority="high"`, без lazy.
4. **Формати:** WebP/AVIF з fallback, розумні розміри (не віддавати 3000px там, де показується 600px).
5. **Назви файлів** — описові (`touren-mobile-app-design.webp`, а не `case-touren.jpg`), якщо це не ламає збірку.

---

## 7. Технічне SEO в `<head>`

На кожній сторінці:

```html
<link rel="canonical" href="https://www.kz.design/saas">
<meta property="og:type" content="website">
<meta property="og:title" content="...">        <!-- = title -->
<meta property="og:description" content="..."> <!-- = description -->
<meta property="og:url" content="https://www.kz.design/saas">
<meta property="og:image" content="https://www.kz.design/assets/og/saas.jpg"> <!-- 1200×630 -->
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
```

- Canonical — абсолютний, з `https://www.` (вирішити один варіант домену: з `www` чи без, і редиректити другий).
- OG-зображення: одне загальне для сайту + окремі для кейсів (обкладинка кейсу).
- `<html lang="en">` — уже є, залишити.

**Файли в корені:**

- `robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.kz.design/sitemap.xml
  ```
  Не блокувати `OAI-SearchBot`, `GPTBot`, `PerplexityBot`, `Googlebot`. Закрити від індексації службові папки (`/design-system/`, `/tools/`, демо-файли), якщо вони потрапляють у деплой.
- `sitemap.xml` — генерувати скриптом збірки з усіх публічних сторінок з чистими URL і `lastmod`.

**Preview / режим редагування на Vercel.** Preview-деплої та режим редагування не мають індексуватися: заголовок `X-Robots-Tag: noindex` для всіх доменів, крім продакшн `www.kz.design` (через `vercel.json` → `headers` з умовою по хосту або middleware). На продакшні `noindex` бути не повинно — перевірити окремо.

**Швидкість:**

- Шрифт Satoshi зараз тягнеться з `api.fontshare.com` — завантажити локально у `fonts/`, додати `font-display: swap` і `preload` для основного начертання.
- Відкласти завантаження скриптів анімацій (Lottie, 3D-логотип) — `defer`, або ініціалізація при появі в зоні видимості.
- Ціль — «зелені» Core Web Vitals у PageSpeed Insights для головної, `/saas` і одного кейсу (мобільна версія).

---

## 8. Структуровані дані (JSON-LD)

**Головна** — `Organization` + `WebSite`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "K&Z Design",
  "url": "https://www.kz.design",
  "logo": "https://www.kz.design/assets/logo.svg",
  "email": "hello@kz.design",
  "description": "Founder-led UI/UX design studio for SaaS, web and mobile products.",
  "founder": [
    {"@type": "Person", "name": "Vlad Kyrieiev"},
    {"@type": "Person", "name": "Nick Zhurenko"}
  ],
  "address": {"@type": "PostalAddress", "addressLocality": "Tallinn", "addressCountry": "EE"},
  "sameAs": [
    "https://clutch.co/profile/kz-design",
    "https://www.linkedin.com/company/kyzh-studio/",
    "https://www.behance.net/kz_design",
    "https://dribbble.com/kyzh-studio"
  ]
}
```

(Адресу й засновників — **звірити з нами**: беремо з футера живого сайту.)

**Внутрішні сторінки** — `BreadcrumbList`.
**FAQ на головній** — `FAQPage` можна додати, але лише з питаннями й відповідями, які реально видно на сторінці.
Не додавати рейтинги (`AggregateRating`) з Clutch у власну розмітку — Google це не показує для власних відгуків компанії і може вважати порушенням.

Перевірити все в Rich Results Test / Schema Markup Validator.

---

## 9. Аналітика

- Підготувати місця для коду Google Analytics 4 і мета-тегу підтвердження Search Console (`TODO`, ID дамо ми).
- Відстежувати як подію відправку форми / клік на бронювання дзвінка на `/contact-us` — це головна конверсія.

---

## 10. Перевірка перед здачею

- [ ] Усі сторінки відкриваються за чистими URL; старі адреси Webflow (`/touren` тощо) дають 301 на нові.
- [ ] Немає посилань на `https://www.kz.design/...` старого сайту і немає битих внутрішніх посилань (прогнати скриптом).
- [ ] На кожній сторінці: унікальні title і description, один H1, canonical, OG-теги.
- [ ] H1 — перший заголовок у документі; у H2/H3 немає цілих абзаців.
- [ ] Змістовні зображення мають alt, декоративні — `alt=""`; у всіх є `width`/`height`.
- [ ] `robots.txt` і `sitemap.xml` є і коректні; preview-деплої мають `noindex`, продакшн — ні.
- [ ] JSON-LD проходить валідацію.
- [ ] PageSpeed Insights (mobile) для головної, `/saas` і одного кейсу — записати результати.
- [ ] Вигляд сторінок не змінився (порівняти скриншоти до/після).
- [ ] Підсумок: що зроблено, список `TODO` і питань до нас.
