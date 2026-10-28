# Core changes

Files of the template core (`src/core/**`, `src/admin/**`, admin/api routes, `scripts/**`) changed for this
project, with the reason. **None so far.**

Tooling files outside the core that differ from the template (for transparency):

| File                | Change                                                                                     | Reason                                                       |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `eslint.config.mjs` | `design/**` added to the global ignores                                                    | the client's design sources (git-ignored) must not be linted |
| `.prettierignore`   | `design` added                                                                             | same                                                         |
| `.gitignore`        | `/design/` removed, so the designs travel with the repository (skill `references/team.md`) | every teammate's Claude needs the designs                    |
| `package.json`      | `name` set to `kzdesign-website`                                                           | project name                                                 |
| `tests/**`          | demo-specific tests adapted to this project's pages (see `COMPONENTS.md` notes)            | the template tests referred to the demo pages                |
