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

| ID      | Sprint | Task                                                             | Owner             | Status | Commit   | Notes                                                                                                                                               |
| ------- | ------ | ---------------------------------------------------------------- | ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| RF-000  | 0      | Governance docs and persistent memory files                      | Technical Writer  | Done   | c289a8da | Initial baseline artifacts                                                                                                                          |
| RF-020  | 0      | Real-time team visibility dashboard                              | Technical Writer  | Done   | 4ab80056 | Added live team status viewer and handoff log contract                                                                                              |
| RF-100  | 1      | Nx workspace boundary and shared architecture baseline           | Infra             | Done   | dc0dea64 | Added Nx tags, module-boundary lint rule, and affected scripts; gate pass complete                                                                  |
| RF-200  | 2      | Introduce shared packages (`domain/http/seo/routes`)             | FE                | Done   | 336e1eb5 | Shared package skeleton + Next SEO integration baseline                                                                                             |
| RF-300  | 3      | Fix critical Next defects                                        | FE                | Done   | 24b05f60 | Endpoint/env/middleware/auth cookie/fetch contract defects fixed                                                                                    |
| RF-400  | 4      | Next route parity implementation (`complaint/me/user`)           | FE                | Done   | 007bd52b | Complaint list parity + my/messages/notifications/user routes + auth flow completion                                                                |
| RF-410  | 4      | Lost-found create/edit full parity in Next                       | FE                | Done   | 0654599a | Real create/edit forms, multipart submit, edit prefill, auth guard, route linkage                                                                   |
| RF-500  | 5      | Integrate reusable SEO architecture in Next                      | FE                | Done   | 6b5966c4 | Detail-page metadata + robots/sitemap + canonicalized redirects                                                                                     |
| RF-600  | 6      | Harden CI/CD for cache-safe immutable deploys                    | Infra             | Done   | 7a85c08c | Immutable image tagging + non-destructive static deploy + workflow trigger hardening                                                                |
| RF-610  | 6      | Validator pass and lockfile synchronization                      | QA                | Done   | a6ab84e6 | `pnpm validate:full` pass and lockfile refresh                                                                                                      |
| RF-620  | 7      | RF-400 commit/documentation synchronization                      | Technical Writer  | Done   | 09531abf | Updated sprint board commit map and final team dashboard state                                                                                      |
| RF-700  | 6      | Deploy smoke/chunk verification hardening                        | Infra             | Done   | fff6f1b6 | Added blocking smoke script + deploy wait steps + runbook/checklist hardening                                                                       |
| RF-710  | 7      | Final regression and release approval pack                       | Validator         | Done   | 48e7148e | Final `validate:full` gate pass and release approval synchronization                                                                                |
| RF-800  | 8      | FE convention governance upgrade (`FE Lead + FE x2`)             | FE Lead           | Done   | aae1cf16 | Primary-source research synthesis + FE rulebook + team role realignment                                                                             |
| RF-810  | 8      | Utility convention phase-1 enforcement                           | FE Specialist A/B | Done   | aae1cf16 | Shared lexical utility consolidation + object/query utility hardening                                                                               |
| RF-820  | 8      | React Query convention rollout (`key/invalidation/time`)         | FE Lead           | Done   | fbd3b006 | Shared key factory, stable invalidation scope, stale/gc-time standard across dual apps                                                              |
| RF-830  | 8      | Date formatting convention rollout (`single-entrypoint`)         | FE Lead           | Done   | afa44f41 | `formatDisplayDate` single entrypoint migration + lint guardrails for direct formatting                                                             |
| RF-840  | 8      | Utility convention phase-2 (`validate` + `number/price`)         | FE Lead           | Done   | 0abba1b9 | Shared validation/number-price entrypoints + dual-app migration + lint policy uplift                                                                |
| RF-850  | 9      | FE hooks elevation + meeting/rulebook audit workflow             | FE Lead           | Done   | 177b5501 | Form+Zod schema hook sharedization + FE governance audit logging workflow completed                                                                 |
| RF-860  | 9      | RF-840 follow-up utility promotion (`subway/common`)             | FE Lead           | Done   | db67ca42 | Promoted remaining app-local subway/common pure utils into `@ahhachul/utils`                                                                        |
| RF-870  | 9      | Utility regression hardening (`validate/format` tests)           | FE Specialist A/B | Done   | da25dac6 | Added unit tests and Nx test-target integration for shared validate/format contracts                                                                |
| RF-880  | 10     | Shared design-system foundation (`Vite` color authority)         | FE Lead           | Done   | 0f7faf8a | Added `@ahhachul/design-system` and migrated Vite/Next to consume shared color tokens                                                               |
| RF-890  | 10     | Inline hex eradication (`semantic/shared token` enforced)        | FE Lead           | Done   | pending  | Replaced one-app residual inline hex with shared semantic tokens and lint guardrail                                                                 |
| RF-891  | 10     | Vite legacy inline hex phase-out (`Emotion/styled`)              | FE Lead           | Done   | pending  | Removed Vite Emotion/styled inline hex via shared `legacy` semantic tokens with gated exception scope                                               |
| RF-900  | 11     | Shared UI extraction + Storybook public baseline                 | FE Lead           | Done   | pending  | Added `@ahhachul/ui`, migrated dual-app reusable primitives, and established Storybook-based promotion gate                                         |
| RF-901  | 11     | Shared nav shell extraction + app adapter split                  | FE Lead           | Done   | pending  | Added shared `BottomNav`/`BottomNavItem` and migrated Vite/Next nav to local adapters with Storybook docs                                           |
| RF-910  | 12     | API contract layer sharedization (`fetch/axios` 유지)            | FE Lead           | Done   | pending  | Centralized API endpoint/default contracts in `@ahhachul/http` and migrated dual-app callsites without transport unification                        |
| RF-920  | 12     | Shared API/domain type contract consolidation                    | FE Lead           | Done   | 5a386f91 | Promoted `ApiResponse`/pagination/id canonical contracts to `@ahhachul/domain` and migrated dual-app common types to aliases                        |
| RF-930  | 13     | Endpoint literal ban automation (`lint + scan + CI`)             | FE Lead           | Done   | 7e06d138 | Enforced API endpoint literal prohibition with ESLint, AST scan script, and CI blocking gate                                                        |
| RF-940  | 13     | Design-system exception removal (`icons/subway` tokenized)       | FE Lead           | Done   | 6ac6132e | Removed RF-891 exception files by tokenizing Vite icon/subway color literals into shared design-system tokens                                       |
| RF-950  | 13     | Deployment rollback/game-day rehearsal report automation         | Infra Engineer    | Done   | 22b4929a | Added scheduled+manual rehearsal workflow and report gate for smoke + rollback readiness checks                                                     |
| RF-960  | 13     | Game-day manual execution checklist (`staging/production`)       | Infra Engineer    | Done   | pending  | Added gh dispatch helper and operator checklist for staged+production rehearsal execution and evidence collection                                   |
| RF-970  | 14     | FE micro-style governance + automation + migration               | FE Lead           | Done   | pending  | Added FE system-design research artifact, micro React style rulebook/validator gates, no-nested-ternary rollout, typo rename                        |
| RF-980  | 15     | Dual-app full API MSW virtualization (`mock-api` shared)         | FE Lead           | Done   | pending  | Added shared deterministic MSW handlers and integrated Vite/Next browser+server mock mode with strict unhandled API policy                          |
| RF-990  | 16     | Next-first SEO metadata copy/architecture quality upgrade        | FE Lead           | Done   | pending  | Upgraded reusable SEO metadata builder, migrated Next route metadata copy/noindex policy, and aligned Vite single metadata                          |
| RF-1000 | 16     | Next SEO linking + structured data + sitemap index/RSS hardening | FE Lead           | Done   | pending  | Added crawlable internal links, global/breadcrumb JSON-LD, segmented sitemap index architecture, and resilient RSS generation                       |
| RF-1010 | 17     | Next static i18n reset (`ko/en/th/cn`) + locale selector rollout | FE Lead           | Done   | d8faa98a | Removed dynamic-translation plan dependency, added static locale resources, locale middleware routing, and shared selector on home footer + my page |
| RF-1020 | 17     | Locale switch UX + hydration mismatch hardening                  | FE Lead           | Done   | edb2618b | Fixed locale selector delayed-apply behavior via deterministic navigation and reduced extension-driven hydration mismatch noise on root layout      |
| RF-1030 | 18     | Static i18n coverage expansion for key routes                    | FE Lead           | Done   | edb2618b | Expanded localized static copy+metadata for login/messages/notifications/not-found routes and localized CTA/alert content                           |
| RF-1040 | 18     | Residual hardcoded-copy migration + SEO locale full localization | FE Lead           | Done   | pending  | Localized remaining Next user/detail copy blocks, enforced locale-aware OG/hreflang/JSON-LD metadata policy, and normalized locale-aware redirects  |
| RF-1050 | 19     | Services FE code-quality governance + staged scan gate           | FE Lead           | Done   | pending  | Added Rule 14, strategy/meeting/changelog artifacts, and non-blocking services-quality scanner/report gate baseline                                 |
| RF-1060 | 19     | Services file naming + folder structure convention normalization | FE Lead           | Done   | pending  | Normalized dual-app naming/folder contracts, added Rule 15 + scanner/report gate, and published file/folder convention books with web research      |

## Rule

A task can move to `Done` only after `Perfectionist Validator` confirms all checks in `VALIDATOR_CHECKLIST.md`.
