# Deploy status: K&Z Design

Template version: v1.8.3 · Hosting: Vercel · Database: Neon ·
Updated: 2026-10-28

Mark each item `yes`, `no` or `unknown`, and how you know (user said / verified).
Never write secret values here.

## Repository and branches

| Item                                                       | Status | How we know                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code committed                                             | yes    | verified: `git log`                                                                                                                                                                                                                                                                                                               |
| Designs committed in `design/` (26 MB, no file over 20 MB) | yes    | verified: `git ls-files design`                                                                                                                                                                                                                                                                                                   |
| GitHub repository created and pushed (`origin`)            | yes    | verified: `git@github-kz:nazars-kz/kzdesign.git` (SSH key `~/.ssh/id_ed25519_kzdesign`)                                                                                                                                                                                                                                           |
| `staging` branch created and set as default                | yes    | verified with `gh repo view` (default branch `staging`)                                                                                                                                                                                                                                                                           |
| `main` and `staging` protected (PR + CI)                   | no     | GitHub refused (HTTP 403): private repositories need GitHub Pro; decision in issue #18                                                                                                                                                                                                                                            |
| Hosting site created from the repository                   | yes    | user said 2026-10-29: Vercel project `kzdesign` (team nazars-kz), Production Branch `main`                                                                                                                                                                                                                                        |
| Branch deploys on for `staging`                            | yes    | user said: `staging` deploys as a Preview (`kzdesign-git-staging-nazars-kz.vercel.app`)                                                                                                                                                                                                                                           |
| Vercel Deployment Protection off for Preview deployments   | no     | the site's proxy loads its state by calling its own `/api/site-state`; with protection on that call gets the Vercel login page and the staging site answers "This page could not be found" (logs: `[proxy] could not load site state … Unexpected token '<'`). Settings → Deployment Protection → Vercel Authentication: Disabled |

## Databases

| Item                                               | Production | Staging | How we know                      |
| -------------------------------------------------- | ---------- | ------- | -------------------------------- |
| Database created (Neon branch)                     | no         | no      | provider chosen: Neon; issue #11 |
| File storage ready (Neon storage / R2 / Supabase)  | no         | no      | —                                |
| `DATABASE_URL` set for this environment only       | no         | no      | —                                |
| `AUTH_SECRET` set (different per environment)      | no         | no      | —                                |
| Storage variables (`S3_*` or Supabase keys)        | no         | no      | —                                |
| `PREVIEW_DATABASE_ISOLATED=true` (staging only)    | —          | no      | —                                |
| No database variables on PR previews               | —          | —       | —                                |
| Deployed, migration in the build log               | no         | no      | —                                |
| Admin created                                      | no         | no      | —                                |
| Dev admin (`admin@localhost.test`) absent/disabled | n/a        | n/a     | local only                       |

## Launch

| Item                                                          | Status | How we know                                   |
| ------------------------------------------------------------- | ------ | --------------------------------------------- |
| Live URL / custom domain                                      | no     | domain comes later (user said)                |
| `NEXT_PUBLIC_SITE_URL` (custom domain)                        | no     | —                                             |
| Client's admin account (developer mode off)                   | no     | —                                             |
| Form emails (Settings → Integrations) and recipients          | no     | recipients to be added by the team            |
| Google Analytics and Hotjar (Settings → Integrations)         | no     | to be connected by the team                   |
| "Private site" off, "Show the site in Google" on (production) | no     | —                                             |
| `pnpm audit --prod` clean of critical/high                    | yes    | verified 2026-10-28: no known vulnerabilities |
| Database handed to the client (Neon transfer / Supabase org)  | no     | —                                             |

## Next step for the user

Create the Neon project with the `production` and `staging` branches (issue #11, I guide you step by step), then connect Vercel (issue #12).
