# K&Z Design site: start here

For every person and every Claude joining this project. Read this first, then the files it
links. Everything below was decided with the client: don't ask these questions again.

- **Site**: marketing website of K&Z Design (UX/UI design agency) · Domain: `kz.design` (to be connected later)
- **Languages**: en (only) · **Database**: Neon · **Hosting**: Vercel
- **Template**: web-admin-panel v1.8.2 · Admin path: `/kzds-admin`
- **Team**: Nazar KZ — `nazars-kz` — lead (reviews and merges); two more designer-developers (names and GitHub logins are added here when they join)
- **Branches**: `main` = live site, `staging` = test site (no URL yet), work in
  `feature/<task>` → pull request into `staging`. Never commit to `main` or `staging`.
- **Tasks**: GitHub issues with label `task` — https://github.com/nazars-kz/kzdesign/issues.
  Take a free one (`status:todo`), never one assigned to someone else.

## Read next (in this order)

1. `docs/project/BRIEF.md`: every answer from the client and the defaults applied.
2. `docs/project/DESIGN_ANALYSIS.md`: pages, sections, components, motion.
3. `docs/project/PLAN.md`: page map, build order, who owns what, progress.
4. `docs/project/COMPONENTS.md`: the components that already exist (reuse them, never copy).
5. `design/`: the designs (HTML pages, CSS, JS, assets, the design system in
   `design/KZ/kz-homepage/design-system/`) — the source of truth for how things look.
6. `docs/project/CHANGES.md`: change requests from the client after review.
7. `docs/project/DEPLOY_STATUS.md` and `CORE_CHANGES.md`: what is online, what differs from the template.

## Current state

Updated by the lead's Claude after each merge into `staging`.

- Done: foundation (tokens, fonts, primitives, header, footer, 404), Home, collections `services` and `cases`
  (card data for all 16 cases), shared sections, contact form, placeholder pages for the rest.
- In review: PR #19 (alignment with the updated skill, designs in git, this file).
- Next free tasks: About us (#5), Cases list and case template (#6), service page template (#7).
- Not started online: Neon (#11), Vercel (#12), domain (#13).

## Run it locally

```bash
git remote add template https://github.com/Senavi/web-admin-panel.git   # once, for template updates
corepack enable pnpm && pnpm install
pnpm dev        # http://localhost:3000, admin at /kzds-admin
```

Login: `.data/dev-admin-credentials.txt` (your own local database, filled from the code). Never connect
local development to the staging or production database.

**Windows**: `corepack enable` may fail with "operation not permitted". Use `corepack pnpm <command>`
instead of `pnpm <command>`. If the build fails with `ERR_SWC_NATIVE_CACHE`, set the variable
`SWC_NATIVE_BINDING_CACHE` to a folder inside your user profile, e.g. `C:\Users\<you>\.swc-native`.

**Several GitHub accounts on one computer**: use your own `gh auth login` (the account that was added to the
repository) and clone with `gh repo clone nazars-kz/kzdesign`. Don't copy another person's SSH settings.

**`team-status.mjs` prints nothing on Windows** (its "run as main script" check compares a Unix-style path). Run it like this
(replace `<skill>` with the skill folder, forward slashes, and set `GH_REPO=nazars-kz/kzdesign` if your git remote is not a plain
`github.com` address):

```bash
node --input-type=module -e "process.argv[1]='/<skill>/scripts/team-status.mjs'; await import('file:///<skill>/scripts/team-status.mjs')"
```

## Rules in one place

- Texts and images go into the seeds (`src/content/**`), not only into your local admin.
- Only token classes in components; raw values live in `src/site/theme/` (`pnpm tokens:check`).
- Every repeated element is a component (`docs/project/COMPONENTS.md`); `className` is for placement only.
- Before a pull request: `git fetch origin && git merge origin/staging`, then
  `pnpm typecheck && pnpm lint && pnpm test && pnpm content:check && pnpm tokens:check`.
- `docs/TEAM.md` (template) explains the branch flow; the skill's `references/team.md` explains who works on what.
