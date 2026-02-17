# FE API Contract Layer Council 011

- DateTime (KST): 2026-02-17 04:57:19
- Task ID: RF-910
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator

## Agenda

1. Define what should be shared in API layer while keeping transport split (Vite axios / Next fetch).
2. Select concrete shared contracts to avoid endpoint drift.
3. Decide migration scope and blocking gate.

## Discussion Summary

- FE Lead: transport runtime must stay app-local; sharedization target is API contract, not client implementation.
- FE Specialist A: promote endpoint/path/default constants into `@ahhachul/http` to remove cross-app string drift.
- FE Specialist B: migrate both apps to contract constants and keep current request abstraction shape intact.
- QA Engineer: validate that no behavior change occurs in auth/list/detail/comment flows after path replacement.
- Perfectionist Validator: gate fails if transport is force-unified or if raw endpoint literals remain in production callsites.

## Decision

- Approved shared layer:
  - `API_PATHS`
  - `API_SERVICE_PATHS`
  - `API_PAGE_SIZE`
  - `API_SORT`
  - `ApiServicePath` type
- Keep runtime split:
  - Vite: `axiosInstance` + `axios`
  - Next: `fetch` + `fetchClient`

## Validator Gate

- `pnpm validate:full` => PASS (target)

## Action Items

1. FE Specialist A: implement API contract module in `@ahhachul/http`.
2. FE Specialist B: migrate one-app + ahhachul.com API callsites to shared contracts.
3. Technical Writer: sync rulebook/changelog/sprint/worklog/team status artifacts for RF-910.
