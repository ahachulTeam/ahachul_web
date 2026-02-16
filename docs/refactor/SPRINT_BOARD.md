# Refactor Sprint Board

## Status Legend

- `Todo`
- `InProgress`
- `QAReady`
- `ValidatorPass`
- `Committed`
- `Done`
- `Rework`

## Team Roles

- Team Lead: backlog priority, risk and dependency arbitration, sprint sign-off
- FE Engineer: Vite/Next implementation and shared package adoption
- Infra Engineer: Nx, CI/CD, cache, deploy stability, rollback strategy
- QA Engineer: test matrix, regression, gate automation
- Technical Writer: decisions, conventions, runbook, changelog
- Perfectionist Validator: blocking gate owner, final task acceptance

## Sprint Backlog

| ID     | Sprint | Task                                                   | Owner            | Status | Commit   | Notes                                                                                |
| ------ | ------ | ------------------------------------------------------ | ---------------- | ------ | -------- | ------------------------------------------------------------------------------------ |
| RF-000 | 0      | Governance docs and persistent memory files            | Technical Writer | Done   | c289a8da | Initial baseline artifacts                                                           |
| RF-100 | 1      | Nx workspace boundary and shared architecture baseline | Infra            | Todo   | -        | -                                                                                    |
| RF-200 | 2      | Introduce shared packages (`domain/http/seo/routes`)   | FE               | Done   | 336e1eb5 | Shared package skeleton + Next SEO integration baseline                              |
| RF-300 | 3      | Fix critical Next defects                              | FE               | Done   | 24b05f60 | Endpoint/env/middleware/auth cookie/fetch contract defects fixed                     |
| RF-500 | 5      | Integrate reusable SEO architecture in Next            | FE               | Done   | 6b5966c4 | Detail-page metadata + robots/sitemap + canonicalized redirects                      |
| RF-600 | 6      | Harden CI/CD for cache-safe immutable deploys          | Infra            | Done   | 7a85c08c | Immutable image tagging + non-destructive static deploy + workflow trigger hardening |
| RF-610 | 6      | Validator pass and lockfile synchronization            | QA               | Done   | a6ab84e6 | `pnpm validate:full` pass and lockfile refresh                                       |

## Rule

A task can move to `Done` only after `Perfectionist Validator` confirms all checks in `VALIDATOR_CHECKLIST.md`.
