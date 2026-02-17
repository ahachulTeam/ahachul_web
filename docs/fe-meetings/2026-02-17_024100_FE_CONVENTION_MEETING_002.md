# FE Convention Meeting 002

- DateTime (KST): 2026-02-17 02:41:00
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
