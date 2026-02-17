# FE Utility Test Hardening Meeting 005

- DateTime (KST): 2026-02-17 03:19:49
- Facilitator: FE Lead
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Objective: Harden regression safety by adding mandatory unit tests for shared validate/format utilities.

## Agenda

1. Utility test gap analysis (`@ahhachul/utils`)
2. Test coverage scope for validate/format contracts
3. Nx gate integration strategy for shared package tests
4. Validator pass criteria update

## Decisions

1. Add `vitest` test target to `@ahhachul/utils` and include it in workspace `validate:test`.
2. Add regression tests for:
   - validation (`normalizeInputText`, `isBlankText`, `validateNickname`, `validateRequiredText`, `validateRequiredLexicalContent`)
   - formatting (`formatDisplayNumber`, `formatDisplayPrice`, `formatDisplayDate`, subway/common formatters)
3. Shared utility features are not considered complete without contract-level tests in the same task.
4. `Perfectionist Validator` gate remains `pnpm validate:full` and must include shared package tests.

## Action Items

- RF-870 (InProgress):
  - Add `packages/utils` test scripts and `vitest` dependency
  - Implement validation and formatting utility tests
  - Verify `validate:test` executes `@ahhachul/utils:test` through Nx
- QA Gate: `pnpm validate:full`

## Notes

- Test scope is intentionally contract-level, not implementation-level snapshots.
- This meeting marks testing as a first-class requirement in FE utility convention enforcement.
