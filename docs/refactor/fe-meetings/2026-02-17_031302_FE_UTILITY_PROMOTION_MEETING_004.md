# FE Utility Promotion Meeting 004

- DateTime (KST): 2026-02-17 03:13:02
- Facilitator: FE Lead
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Objective: Complete RF-840 follow-up by promoting remaining app-local subway/common utilities to shared contracts.

## Agenda

1. Remaining local utility inventory (`subway`, `common`)
2. Shared 승격 범위 결정 (`@ahhachul/utils`)
3. Dual-app migration plan and compatibility handling
4. Validator gate and regression risk review

## Decisions

1. Promote the following pure utility contracts to `@ahhachul/utils`:
   - `formatSubwayFilterOption`
   - `formatSubwayLineInfo`
   - `getFirstParentLineId`
   - `formatLost112Content`
   - `formatSubwayArrivalTime`
   - `parseFileExtOfName`
2. Keep app-local wrappers only for side-effect helpers (`downloadFile`, `getUserAgent`) and path-compat needs.
3. Vite service/components must import promoted subway/common utilities from shared package directly.
4. Next local subway util remains as a thin compatibility wrapper over shared utility (no duplicated logic allowed).

## Action Items

- RF-860 (InProgress):
  - Add `packages/utils/src/subway.ts`, `packages/utils/src/file.ts`
  - Migrate Vite `services/*` and domain components to shared imports
  - Replace local train arrival formatter with shared `formatSubwayArrivalTime`
  - Remove duplicated implementation bodies from app-local utility modules
- QA Gate: `pnpm validate:full`

## Notes

- Promotion scope intentionally excludes side-effectful browser utilities.
- Validator requested post-migration check for ghost local copies before task closure.
