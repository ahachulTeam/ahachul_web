# FE API Type Contract Council 012

- DateTime (KST): 2026-02-17 05:21:49
- Task ID: RF-920
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator

## Agenda

1. Decide shared ownership for `ApiResponse` and pagination contract types.
2. Define migration boundary between app-local aliases and shared canonical types.
3. Confirm validator gate and regression criteria.

## Discussion Summary

- FE Lead: response/pagination contracts must be single-source in `@ahhachul/domain` to avoid Vite/Next drift.
- FE Specialist A: add `packages/domain/src/api.ts` and export canonical response/pagination/id contracts.
- FE Specialist B: keep app-local `types/common.ts` as thin aliases to minimize import churn while removing duplicated definitions.
- QA Engineer: gate requires full workspace regression (`validate:full`) after alias migration.
- Perfectionist Validator: reject if duplicated response/pagination structs remain as parallel sources.

## Decision

- Canonical shared contracts moved to `@ahhachul/domain`:
  - `APIResponseCode`
  - `ApiResponse` (`IResponse` alias)
  - `CursorPagination`
  - `PaginatedList`
  - `WithPostId`
- App-local `types/common.ts` stays as compatibility alias layer only.

## Validator Gate

- `pnpm validate:full` => PASS

## Action Items

1. FE Specialist A: maintain shared contract backward compatibility when extending API response schema.
2. FE Specialist B: keep alias-only pattern in app-local common type modules.
3. Technical Writer: sync sprint/worklog/rulebook/team-memory artifacts for RF-920.
