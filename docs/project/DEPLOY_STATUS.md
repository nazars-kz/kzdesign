# Deploy status: K&Z Design

Template version: v1.8.2 · Hosting: Vercel · Database: not chosen yet (Neon recommended) ·
Updated: 2026-10-28

Mark each item `yes`, `no` or `unknown`, and how you know (user said / verified).
Never write secret values here.

## Repository and branches

| Item                                            | Status | How we know                                                                                                   |
| ----------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| Code committed                                  | yes    | verified: `git log`                                                                                           |
| GitHub repository created and pushed (`origin`) | yes    | verified: `git@github-kz:nazars-kz/kzdesign.git` (SSH key `~/.ssh/id_ed25519_kzdesign`)                       |
| `staging` branch created and set as default     | partly | branch created and pushed (verified); default branch not changed yet (needs `gh` or the GitHub settings page) |
| `main` and `staging` protected (PR + CI)        | no     | needs GitHub admin rights and `gh`; private repos need a paid plan                                            |
| Hosting site created from the repository        | no     | —                                                                                                             |
| Branch deploys on for `staging`                 | no     | —                                                                                                             |

## Databases

| Item                                               | Production | Staging | How we know         |
| -------------------------------------------------- | ---------- | ------- | ------------------- |
| Database created (Neon branch / Supabase project)  | no         | no      | provider not chosen |
| File storage ready (Neon storage / R2 / Supabase)  | no         | no      | —                   |
| `DATABASE_URL` set for this environment only       | no         | no      | —                   |
| `AUTH_SECRET` set (different per environment)      | no         | no      | —                   |
| Storage variables (`S3_*` or Supabase keys)        | no         | no      | —                   |
| `PREVIEW_DATABASE_ISOLATED=true` (staging only)    | —          | no      | —                   |
| No database variables on PR previews               | —          | —       | —                   |
| Deployed, migration in the build log               | no         | no      | —                   |
| Admin created                                      | no         | no      | —                   |
| Dev admin (`admin@localhost.test`) absent/disabled | n/a        | n/a     | local only          |

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

Choose the database (Neon or Supabase), install and log in to the GitHub CLI, then I set up `staging`, its protection and the task issues.
