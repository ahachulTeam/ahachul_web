# FE Micro Style Governance Council 015

- DateTime (KST): 2026-02-17 15:40:00
- Task ID: RF-970
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator

## Agenda

1. Review external frontend system-design sources and extract repo-applicable coding-style guidance.
2. Define micro FE coding rules (nested ternary, derived-state `useEffect`, naming conventions).
3. Convert policy from documentation-only to CI-blocking automation.
4. Confirm behavior-preserving refactor guardrails for validator.

## Discussion Summary

- FE Lead: prioritize readability and deterministic review diffs; nested ternary must be banned globally.
- FE Specialist A: derived-state mirror effects are recurring regression source; add scanner gate for obvious anti-pattern.
- FE Specialist B: execute safe migration on both apps without UX behavior changes.
- Technical Writer: persist research outcomes in repository artifact and sync rulebook/changelog/meeting index.
- QA Engineer: validator should run new style gate as part of `validate:full`.
- Perfectionist Validator: block any task violating behavior-preserving/overengineering guardrails.

## Decisions

1. Added research artifact: `docs/refactor/FE_SYSTEM_DESIGN_POSTS_RESEARCH_2026-02-17.md`.
2. Added Rule 11 to `FE_RULEBOOK.md` for micro React coding style conventions.
3. Added `scripts/scan-react-style-violations.mjs` and `validate:react-style` command.
4. Added ESLint blocking rule: `no-nested-ternary=error`.
5. Added validator guardrail file: `docs/refactor/REFACTORING_CRITICAL_RULES.md`.
6. Executed typo cleanup rename (`useTimeout`, `Complaint*`) and no-nested-ternary migration in dual apps.

## Validator Gate

- `pnpm validate:react-style` => PASS
- `pnpm validate:type` => PASS
- `pnpm validate:lint` => PASS
- `pnpm validate:full` => PASS

## Action Items

1. FE Specialist A: keep `scan-react-style-violations` patterns aligned with new anti-pattern learnings.
2. FE Specialist B: continue migrating remaining micro-style inconsistencies with behavior-preserving approach.
3. Technical Writer: update sprint/worklog/team dashboard artifacts after final `validate:full`.
4. Perfectionist Validator: verify critical guardrails document is referenced in every subsequent FE refactor task.
