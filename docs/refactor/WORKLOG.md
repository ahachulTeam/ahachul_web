# Refactor Worklog

## Template

- DateTime (KST):
- Task ID:
- Contributors:
- Summary:
- Validation Result:
- Follow-up:

## Entries

- DateTime (KST): 2026-02-17
- Task ID: RF-000
- Contributors: Team Lead, Technical Writer
- Summary: Created persistent refactor memory files and baseline collaboration protocol.
- Validation Result: Pass (documentation artifact presence)
- Follow-up: Start RF-100 and RF-200 implementation.

- DateTime (KST): 2026-02-17
- Task ID: RF-020
- Contributors: Technical Writer, Team Lead
- Summary: Added transparent team visibility layer with live dashboard script (`team:watch`), runtime status file, and append-only handoff log.
- Validation Result: Pass (`pnpm team:status` output verified)
- Follow-up: Keep `TEAM_STATUS.json` synchronized whenever ownership or state changes.

- DateTime (KST): 2026-02-17
- Task ID: RF-200
- Contributors: FE Engineer, Technical Writer
- Summary: Added shared workspace packages (`@ahhachul/domain`, `@ahhachul/http`, `@ahhachul/seo`, `@ahhachul/routes`) and applied reusable metadata/robots/sitemap to Next app.
- Validation Result: Pass (validated by `pnpm validate:full` after follow-up fixes)
- Follow-up: Continue RF-100 (Nx boundary enforcement) and RF-400 parity implementation.

- DateTime (KST): 2026-02-17
- Task ID: RF-300
- Contributors: FE Engineer, QA Engineer
- Summary: Fixed Next critical defects including complaint endpoint typo, auth cookie-key mismatch, middleware route mismatch, API base URL normalization, and fetch client contract misuse.
- Validation Result: Pass (validated by `pnpm validate:full`)
- Follow-up: Continue route parity implementation for placeholder pages.

- DateTime (KST): 2026-02-17
- Task ID: RF-500
- Contributors: FE Engineer
- Summary: Replaced duplicated detail-page SEO object construction with reusable metadata builder and centralized legacy URL redirect rules for canonical SEO routes.
- Validation Result: Pass (validated by `pnpm validate:full`)
- Follow-up: Expand SEO parity to remaining future routes.

- DateTime (KST): 2026-02-17
- Task ID: RF-600
- Contributors: Infra Engineer
- Summary: Hardened CI/CD by aligning pnpm version, broadening CI trigger scope, switching Vite deploy to non-destructive immutable asset upload, and deploying Next with immutable SHA image plus new ECS task definition revision.
- Validation Result: Partial Pass (local gate pass, GitHub Actions runtime verification pending)
- Follow-up: Execute live deploy smoke/rollback checklist in CI environment.

- DateTime (KST): 2026-02-17
- Task ID: RF-610
- Contributors: QA Engineer, Perfectionist Validator
- Summary: Synced lockfile after workspace package additions and executed full validator gate (`pnpm validate:type`, `pnpm validate:lint`, `pnpm validate:test`, `pnpm validate:build`, `pnpm validate:full`).
- Validation Result: Pass (local validator gate complete; Nx Cloud auth warning is non-blocking)
- Follow-up: Run live GitHub Actions deploy validation for RF-600.

- DateTime (KST): 2026-02-17
- Task ID: RF-100
- Contributors: Infra Engineer, QA Engineer, Perfectionist Validator
- Summary: Established Nx boundary enforcement by tagging every workspace project (`type:app`, `type:shared`, `type:tooling`), enabling `@nx/enforce-module-boundaries`, and adding affected-run scripts for type/lint/test/build.
- Validation Result: Pass (`pnpm validate:type`, `pnpm validate:lint`, `pnpm validate:test`, `pnpm validate:build`)
- Follow-up: Complete RF-400 route parity and run the same full gate before commit.

- DateTime (KST): 2026-02-17
- Task ID: RF-400
- Contributors: FE Engineer, QA Engineer, Perfectionist Validator
- Summary: Implemented complaint list parity (filters + infinite query + SSR prefetch), upgraded `/me`, `/messages`, `/notifications`, `/user/[username]`, activated callback nickname completion page, and normalized empty auth flow routes to canonical redirects.
- Validation Result: Pass (`pnpm validate:full`, including type/lint/test/build)
- Follow-up: Implement full create/edit form parity for `/lost-found/new` and `/lost-found/[id]/edit`.

- DateTime (KST): 2026-02-17
- Task ID: RF-620
- Contributors: Team Lead, Technical Writer
- Summary: Synchronized sprint artifacts after RF-400 commit by updating commit mapping, final team state, and handoff closeout records.
- Validation Result: Pass (`pnpm team:status`)
- Follow-up: Start next sprint backlog execution for remaining parity gaps.

- DateTime (KST): 2026-02-17
- Task ID: RF-410
- Contributors: FE Engineer, QA Engineer, Perfectionist Validator
- Summary: Replaced lost-found new/edit guide placeholders with real reusable editor flows, added multipart create/edit request helpers, linked list/detail-to-edit navigation, and expanded middleware auth protection for write routes.
- Validation Result: Pass (`pnpm validate:full`, including type/lint/test/build)
- Follow-up: Execute RF-700 deploy smoke/chunk automation and rerun blocking gate.

- DateTime (KST): 2026-02-17
- Task ID: RF-700
- Contributors: Infra Engineer, QA Engineer, Perfectionist Validator
- Summary: Added `deploy-smoke-check` automation script, hardened Vite/Next deploy workflows with completion wait gates, and enforced post-deploy chunk/static reachability checks with immutable cache policy validation.
- Validation Result: Pass (`pnpm validate:full` + `node scripts/deploy-smoke-check.mjs --product=test --base-url=https://example.com --routes=/`)
- Follow-up: Execute RF-710 final regression/release approval and close sprint artifacts.

- DateTime (KST): 2026-02-17
- Task ID: RF-710
- Contributors: Team Lead, QA Engineer, Perfectionist Validator, Technical Writer
- Summary: Executed final release gate by rerunning `validate:full`, confirmed validator queue drain, and synchronized sprint board/team status/handoff memory artifacts for sprint closure.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: None. Sprint backlog closed.

- DateTime (KST): 2026-02-17
- Task ID: RF-800
- Contributors: FE Lead, FE Specialist A, FE Specialist B, Technical Writer
- Summary: Upgraded FE pod structure to `FE Lead + FE Specialist A/B`, ran convention council with primary-source research, and published FE convention artifacts (`FE_RULEBOOK.md`, `FE_MEETING_LOG.md`).
- Validation Result: Pass (`pnpm team:status` + validator handoff synchronization)
- Follow-up: Continue utility convention phase-2 expansion after RF-810 commit.

- DateTime (KST): 2026-02-17
- Task ID: RF-810
- Contributors: FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Summary: Enforced utility phase-1 by consolidating lexical parsing helpers into `@ahhachul/utils`, removing duplicated app implementations, and hardening shared object/query utility typing/parsing with `URLSearchParams`.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: Expand shared utility migration to date/subway/domain formatting helpers.

- DateTime (KST): 2026-02-17
- Task ID: RF-820
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Summary: Applied React Query conventions end-to-end by introducing shared query key factories and query signature normalization in `@ahhachul/domain`, migrating Vite/Next query keys to factories, standardizing mutation invalidation scope (`lists/detail/comments`), and unifying stale/gc-time policy across query clients and domain hooks.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: Commit RF-820 and extend the same convention to any newly added domain modules by default.

- DateTime (KST): 2026-02-17
- Task ID: RF-830
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Summary: Migrated all user-facing date formatting calls to `formatDisplayDate` in `@ahhachul/utils`, left `formatDateTime` as compatibility alias, and added lint guardrails to block direct `date-fns`, `toLocale*`, and `Intl.DateTimeFormat` usage outside the shared date module.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: Mark RF-830 committed and keep date-format changes mandatory through the lint gate.

- DateTime (KST): 2026-02-17
- Task ID: RF-840
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Summary: Rolled out utility convention phase-2 by adding shared validation entrypoints (`validateNickname`, `validateRequiredText`, `validateRequiredLexicalContent`, `isBlankText`, `normalizeInputText`) and numeric display entrypoints (`formatDisplayNumber`, `formatDisplayPrice`) to `@ahhachul/utils`, then migrated dual-app nickname/content/count validation/formatting callsites and expanded lint policy to block direct `Intl.NumberFormat`.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: Mark RF-840 committed and continue replacing remaining app-local utility duplicates with shared contracts.

- DateTime (KST): 2026-02-17
- Task ID: RF-850
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer
- Summary: Elevated duplicated Vite domain form hooks into shared schema/orchestration primitives (`useSchemaForm`, `useLexicalValidatedSubmit`, `useCreatePostImageHandlers`, `useEditPostImageHandlers`), migrated community/lost-found/complaint form hooks, and upgraded FE governance with rulebook changelog + timestamped meeting-log folder workflow.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: Plan next tranche for cross-product generic hook elevation (`useIntersectionObserver`/timeout/debounce family) after parity readiness review.

- DateTime (KST): 2026-02-17
- Task ID: RF-860
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer
- Summary: Completed RF-840 follow-up by promoting remaining app-local subway/common pure utilities into `@ahhachul/utils` (`formatSubwayFilterOption`, `formatSubwayLineInfo`, `getFirstParentLineId`, `formatLost112Content`, `formatSubwayArrivalTime`, `parseFileExtOfName`), migrating Vite service/component callsites to shared imports, and converting Next local subway util to a shared-wrapper implementation.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: Execute RF-870 by adding utility regression tests for validate/format contracts.

- DateTime (KST): 2026-02-17
- Task ID: RF-870
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer
- Summary: Added `@ahhachul/utils` test target (`vitest`) and implemented contract-level regression tests for validation/format utilities (`validation.test.ts`, `format.test.ts`) covering nickname/required text/lexical validation, date/number/price formatting, subway/common formatters, and file extension parsing.
- Validation Result: Pass (`pnpm validate:full`, including `@ahhachul/utils:test`)
- Follow-up: Keep shared utility changes blocked from merge unless corresponding tests are updated in the same task.

- DateTime (KST): 2026-02-17 03:34:41
- Task ID: RF-880
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer
- Summary: Built `@ahhachul/design-system` as the shared color-token source using Vite palette as single authority, migrated Vite Emotion theme colors to shared export, migrated Next Tailwind colors + semantic colors to shared tokens, and subscribed both apps to shared `tokens.css`.
- Validation Result: Pass (`pnpm validate:full`, `pnpm install --frozen-lockfile`)
- Follow-up: Remove remaining app-inline hex literals incrementally by replacing them with design-system semantic tokens.

- DateTime (KST): 2026-02-17 03:45:50
- Task ID: RF-890
- Contributors: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer
- Summary: Removed residual inline hex usage in `services/one-app/src` by introducing shared semantic token groups (`badge/social/icon/skeleton/brand`) in `@ahhachul/design-system`, migrating Tailwind arbitrary hex classes (`bg-[#...]`) to semantic classes, and replacing inline SVG/styling hex literals with shared token references.
- Validation Result: Pass (`pnpm validate:full`)
- Follow-up: Apply the same semantic-token migration strategy to remaining Vite inline hex legacy files in phased RF-891 cleanup.
