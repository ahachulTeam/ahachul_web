# FE Rulebook Changelog

Track every modification to `FE_RULEBOOK.md` in chronological order.

## Entry Template

- DateTime (KST):
- Task ID:
- Author/Owner:
- Change Type: `Added` | `Changed` | `Removed`
- Section(s):
- Summary:
- Follow-up:

## Entries

- DateTime (KST): 2026-02-17 01:54:04
- Task ID: RF-800
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Scope, FE Pod Structure, Rule 1, Rule 2, Rule 3, Sources
- Summary: Initial FE rulebook published with utility/react-query/date convention baseline.
- Follow-up: Enforce phase-1 utility conventions in code.

- DateTime (KST): 2026-02-17 02:19:53
- Task ID: RF-820
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 2 (Query keys/defaults/invalidation)
- Summary: React Query convention details expanded with key factory, stale/gc-time, and invalidation policy.
- Follow-up: Migrate dual-app query modules.

- DateTime (KST): 2026-02-17 02:28:28
- Task ID: RF-830
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 3 (Date/Time)
- Summary: `formatDisplayDate` single-entrypoint rule and lint enforcement clarified.
- Follow-up: Remove legacy date-format callsites.

- DateTime (KST): 2026-02-17 02:41:00
- Task ID: RF-840
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Validation Baseline, Number/Price Formatting Baseline, Rule 4
- Summary: Added validation and numeric display conventions (`validateNickname`, `isBlankText`, `formatDisplayNumber`, `formatDisplayPrice`).
- Follow-up: Expand migration coverage across remaining utility callsites.

- DateTime (KST): 2026-02-17 03:15:00
- Task ID: RF-850
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Scope, Rulebook Operations
- Summary: Established mandatory rulebook-change logging process and timestamped FE meeting-log file management.
- Follow-up: Keep this changelog updated in every future FE rulebook edit commit.

- DateTime (KST): 2026-02-17 03:13:02
- Task ID: RF-860
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 1 (Subway/Common Utility Baseline), Implementation Checklist
- Summary: Added shared-entrypoint mandate for subway/common utilities (`formatSubwayFilterOption`, `formatSubwayLineInfo`, `getFirstParentLineId`, `formatLost112Content`, `formatSubwayArrivalTime`, `parseFileExtOfName`) and checklist enforcement item.
- Follow-up: Complete remaining utility migration and enforce through validator gate in every new FE task.

- DateTime (KST): 2026-02-17 03:19:49
- Task ID: RF-870
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 6 (Shared Utility Test Conventions), Implementation Checklist
- Summary: Added mandatory unit-test conventions for shared utility contracts and required `@ahhachul/utils:test` inclusion in validator test gate.
- Follow-up: Apply the same test-first rule to all future shared utility changes.

- DateTime (KST): 2026-02-17 03:34:41
- Task ID: RF-880
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Scope priority, Rule 7 (Design System Token Conventions), Implementation Checklist
- Summary: Added design-system governance requiring Vite palette authority in `@ahhachul/design-system`, shared token consumption by Vite/Next, and dual-app token subscription rule.
- Follow-up: Replace residual app-local ad-hoc hex literals with semantic/shared tokens in follow-up refactor tasks.

- DateTime (KST): 2026-02-17 03:45:50
- Task ID: RF-890
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 7 (Design System Token Conventions), Implementation Checklist
- Summary: Added strict no-inline-hex policy for one-app (`className` arbitrary hex and JSX/SVG hex literals) and documented shared-token-only enforcement with scan checklist.
- Follow-up: Expand identical no-inline-hex enforcement to phased Vite legacy migration tasks (RF-891+).

- DateTime (KST): 2026-02-17 03:59:25
- Task ID: RF-891
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 7 (Design System Token Conventions), Implementation Checklist
- Summary: Expanded no-inline-hex policy to Vite Emotion/styled layer with explicit exception scope (`assets/icons/jsx/icons.tsx`, `constants/subway.tsx`) and added required residual-hex scan command for validator gate.
- Follow-up: Remove exception scopes in dedicated icon/subway tokenization tasks and keep scan check mandatory for all future Vite style refactors.

- DateTime (KST): 2026-02-17 04:23:59
- Task ID: RF-900
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Scope priority, Rule 8 (Shared Component + Storybook Conventions), Implementation Checklist
- Summary: Added shared component promotion criteria, non-promotion boundaries, Storybook delivery baseline (`Playground/Service Context/Edge`), and blocking `ui:storybook:build` gate for all shared component extraction tasks.
- Follow-up: Apply Rule 8 to subsequent component promotions and keep app-local feature orchestration components out of `packages/ui`.

- DateTime (KST): 2026-02-17 04:42:19
- Task ID: RF-901
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 8 (Navigation Component Boundary), Implementation Checklist
- Summary: Added navbar/bottom-nav shell-adapter policy: keep shared package limited to presentational nav primitives and enforce app-local route/auth/orchestration ownership.
- Follow-up: Apply the same boundary to any future tab/header navigation promotion tasks.

- DateTime (KST): 2026-02-17 04:57:19
- Task ID: RF-910
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Rule 9 (API Contract Layer Conventions), Implementation Checklist
- Summary: Added API contract convention that preserves app transport runtime (Vite=axios, Next=fetch) while enforcing shared endpoint/default contracts from `@ahhachul/http`.
- Follow-up: Extend API contract usage to newly added API modules by default and block raw endpoint literals in FE review.

- DateTime (KST): 2026-02-17 05:21:49
- Task ID: RF-920
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Rule 10 (Shared Type Contract Conventions), Implementation Checklist
- Summary: Added canonical shared type-contract policy for `ApiResponse`/pagination/id types in `@ahhachul/domain` and prohibited app-local re-declaration of canonical response structures.
- Follow-up: Expand migration from alias layers to direct shared imports where safe, and keep contract updates centralized in domain package.

- DateTime (KST): 2026-02-17 05:30:11
- Task ID: RF-930
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 9 (Automatic Enforcement Gate), Implementation Checklist
- Summary: Upgraded endpoint literal policy from review-only to automatic blocking via lint restriction and `validate:api-contract` AST scan gate; documented approved contract-file exception boundary.
- Follow-up: Keep scan pattern list synchronized with API contract growth and fail CI on any newly introduced network-call endpoint literal.

- DateTime (KST): 2026-02-17 05:36:23
- Task ID: RF-940
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 7 (Design System Token Conventions), Implementation Checklist
- Summary: Removed RF-891 temporary exception scope by fully tokenizing Vite icon/subway files and upgraded residual-hex policy to zero-exception scan across Vite source.
- Follow-up: Keep all future icon/subway color additions token-first in `@ahhachul/design-system` and reject any inline hex reintroduction.

- DateTime (KST): 2026-02-17 15:40:00
- Task ID: RF-970
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Rule 11 (Micro React Coding Style), Implementation Checklist, Sources
- Summary: Added micro FE coding-style conventions for nested ternary prohibition, derived-state/useEffect boundaries, `useDeferredValue` input filtering pattern, naming/file typo hygiene, and refactor guardrails; linked new automated `validate:react-style` gate and research synthesis document.
- Follow-up: Keep all future FE refactor tasks blocked unless `validate:react-style` and `no-nested-ternary` gates pass.

- DateTime (KST): 2026-02-17 16:26:00
- Task ID: RF-972
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rulebook Operations, Implementation Checklist
- Summary: Added explicit reference to repository-level merge governance (`CONVENTIONS.md` `Merge Policy`) and required FE PR merge-method compliance in the checklist.
- Follow-up: Apply merge-method policy consistently (`Merge Commit` for large refactors/ops, `Squash` for small noisy PRs, constrained `Rebase` usage only when eligible).

- DateTime (KST): 2026-02-17 16:35:00
- Task ID: RF-980
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Scope priority, Rule 12 (Mock-Mode Virtualization Conventions), Implementation Checklist
- Summary: Added shared MSW virtualization conventions for dual-app runtime boundaries, deterministic state reset, strict unhandled API policy, and mandatory shared mock-handler regression test gate.
- Follow-up: Add explicit route-level mock-mode E2E smoke artifact as follow-up validator evidence.

- DateTime (KST): 2026-02-17 18:37:23
- Task ID: RF-1020
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 13 (Static i18n Conventions)
- Summary: Added locale-selector transition determinism rule to prevent delayed-apply behavior in rewrite-based locale routes (single-step navigation after cookie update; no push+refresh chaining).
- Follow-up: Maintain the same deterministic selector behavior when adding future locale switcher variants (header, settings drawer, modal).

- DateTime (KST): 2026-02-17 18:19:35
- Task ID: RF-1010
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Scope priority, Rule 13 (Static i18n Conventions), Implementation Checklist
- Summary: Added Next-only static i18n governance: fixed locale set (`ko/en/th/cn`), default-locale canonical URL policy, middleware locale normalization/cookie/header sync, home-footer + my-page language selector baseline, and explicit server/client import boundary (`@/i18n/server`).
- Follow-up: Keep dynamic translation dependencies out of scope until separately approved and extend static-message coverage route-by-route with the same boundary rules.

- DateTime (KST): 2026-02-17 19:02:13
- Task ID: RF-1040
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 13 (Static i18n Conventions), Implementation Checklist
- Summary: Added locale-aware SEO enforcement (`openGraph.locale`, `hreflang alternates`, JSON-LD `inLanguage`) and updated checklist rules to require shared helper-based metadata locale mapping and localized structured-data navigation payloads.
- Follow-up: Apply the same locale SEO helper pattern to all newly added indexable routes and avoid per-page locale string literals.

- DateTime (KST): 2026-02-18 14:50:00
- Task ID: RF-1050
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Rule 14 (Services Code Quality Governance Conventions), Implementation Checklist
- Summary: Added services-scope FE quality governance rule set (12-rule catalog), phased rollout policy (`report -> partial block -> expanded block`), scanner/artifact contract (`scan-services-code-quality`), and related checklist items for non-blocking report gate introduction.
- Follow-up: Run report gate continuously, then promote low-risk rules (`1/2/3/6`) to blocking mode after baseline and false-positive verification.
