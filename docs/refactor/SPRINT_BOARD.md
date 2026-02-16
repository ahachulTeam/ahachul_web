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
- FE Lead: FE architecture, convention ownership, final FE implementation sign-off
- FE Specialist A: shared utility/query architecture and cross-app technical consistency
- FE Specialist B: migration execution, UI adoption, and regression-focused implementation
- Infra Engineer: Nx, CI/CD, cache, deploy stability, rollback strategy
- QA Engineer: test matrix, regression, gate automation
- Technical Writer: decisions, conventions, runbook, changelog
- Perfectionist Validator: blocking gate owner, final task acceptance

## Sprint Backlog

| ID     | Sprint | Task                                                     | Owner             | Status        | Commit   | Notes                                                                                  |
| ------ | ------ | -------------------------------------------------------- | ----------------- | ------------- | -------- | -------------------------------------------------------------------------------------- |
| RF-000 | 0      | Governance docs and persistent memory files              | Technical Writer  | Done          | c289a8da | Initial baseline artifacts                                                             |
| RF-020 | 0      | Real-time team visibility dashboard                      | Technical Writer  | Done          | 4ab80056 | Added live team status viewer and handoff log contract                                 |
| RF-100 | 1      | Nx workspace boundary and shared architecture baseline   | Infra             | Done          | dc0dea64 | Added Nx tags, module-boundary lint rule, and affected scripts; gate pass complete     |
| RF-200 | 2      | Introduce shared packages (`domain/http/seo/routes`)     | FE                | Done          | 336e1eb5 | Shared package skeleton + Next SEO integration baseline                                |
| RF-300 | 3      | Fix critical Next defects                                | FE                | Done          | 24b05f60 | Endpoint/env/middleware/auth cookie/fetch contract defects fixed                       |
| RF-400 | 4      | Next route parity implementation (`complaint/me/user`)   | FE                | Done          | 007bd52b | Complaint list parity + my/messages/notifications/user routes + auth flow completion   |
| RF-410 | 4      | Lost-found create/edit full parity in Next               | FE                | Done          | 0654599a | Real create/edit forms, multipart submit, edit prefill, auth guard, route linkage      |
| RF-500 | 5      | Integrate reusable SEO architecture in Next              | FE                | Done          | 6b5966c4 | Detail-page metadata + robots/sitemap + canonicalized redirects                        |
| RF-600 | 6      | Harden CI/CD for cache-safe immutable deploys            | Infra             | Done          | 7a85c08c | Immutable image tagging + non-destructive static deploy + workflow trigger hardening   |
| RF-610 | 6      | Validator pass and lockfile synchronization              | QA                | Done          | a6ab84e6 | `pnpm validate:full` pass and lockfile refresh                                         |
| RF-620 | 7      | RF-400 commit/documentation synchronization              | Technical Writer  | Done          | 09531abf | Updated sprint board commit map and final team dashboard state                         |
| RF-700 | 6      | Deploy smoke/chunk verification hardening                | Infra             | Done          | fff6f1b6 | Added blocking smoke script + deploy wait steps + runbook/checklist hardening          |
| RF-710 | 7      | Final regression and release approval pack               | Validator         | Done          | 48e7148e | Final `validate:full` gate pass and release approval synchronization                   |
| RF-800 | 8      | FE convention governance upgrade (`FE Lead + FE x2`)     | FE Lead           | Done          | aae1cf16 | Primary-source research synthesis + FE rulebook + team role realignment                |
| RF-810 | 8      | Utility convention phase-1 enforcement                   | FE Specialist A/B | Done          | aae1cf16 | Shared lexical utility consolidation + object/query utility hardening                  |
| RF-820 | 8      | React Query convention rollout (`key/invalidation/time`) | FE Lead           | ValidatorPass | pending  | Shared key factory, stable invalidation scope, stale/gc-time standard across dual apps |

## Rule

A task can move to `Done` only after `Perfectionist Validator` confirms all checks in `VALIDATOR_CHECKLIST.md`.
