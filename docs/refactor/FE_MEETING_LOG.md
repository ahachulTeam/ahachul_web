# FE Convention Meeting Log

## Meeting 001

- DateTime (KST): 2026-02-17
- Facilitator: FE Lead
- Participants: FE Lead, FE Specialist A, FE Specialist B, Team Lead, QA Engineer, Perfectionist Validator
- Objective: Define high-quality FE conventions with external primary-source grounding and start utility-function enforcement.

## Agenda

1. FE pod restructuring and ownership model
2. Convention research synthesis (React Query, utility design, date formatting)
3. Utility convention phase-1 implementation scope
4. Validator gate criteria

## Decisions

1. Existing FE Engineer is promoted to `FE Lead` and owns FE convention sign-off.
2. Two additional FE specialists are added:
   - `FE Specialist A`: shared utility/query architecture
   - `FE Specialist B`: migration and app-layer adoption
3. First enforcement scope is utility functions:
   - shared lexical parsing consolidation
   - shared object/query parsing hardening
   - `any` elimination in shared utility signatures
4. React Query and date formatting conventions are formalized in `FE_RULEBOOK.md` and become mandatory for new code.
5. `Perfectionist Validator` remains blocking authority; no task closes without gate pass.

## Action Items

- RF-800 (InProgress): FE rulebook publication + team role realignment
- RF-810 (InProgress): utility convention phase-1 code enforcement
- QA Gate: `pnpm validate:full`

## Notes

- The team chose primary-source-only references to avoid style-guide folklore.
- Utility-level correctness and determinism were prioritized before broader UI migration.

## Meeting 002

- DateTime (KST): 2026-02-17
- Facilitator: FE Lead
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Objective: Define and enforce utility phase-2 conventions for validation and number/price formatting.

## Agenda

1. Validation rule consolidation (nickname/content/empty-text checks)
2. Number/price display entrypoint policy
3. Lint-level enforcement scope and exception boundaries
4. Migration targets across Vite/Next

## Decisions

1. `validateNickname` is the single nickname validation contract for both products.
2. Required content validation for lexical editor uses `validateRequiredLexicalContent`.
3. Generic empty-text checks use `isBlankText`; normalization uses `normalizeInputText (NFC + trim)`.
4. Number/price display contract:
   - `formatDisplayNumber`
   - `formatDisplayPrice`
5. Direct app-layer `Intl.NumberFormat` and direct `toLocaleString` usage is lint-blocked, with shared utility file exception only.
6. `Perfectionist Validator` gate for this tranche remains `pnpm validate:full`.

## Action Items

- RF-840 (InProgress): utility convention phase-2 (`validate` + `number/price`) migration and enforcement.
- QA Gate: `pnpm validate:full`

## Notes

- Primary references used: MDN (`Intl.NumberFormat`, `Number.toLocaleString`, `String.normalize`) and OWASP Input Validation Cheat Sheet.
