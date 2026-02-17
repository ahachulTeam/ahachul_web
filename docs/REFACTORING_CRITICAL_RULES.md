# Refactoring Critical Rules (Validator Priority)

## Purpose

Define non-negotiable guardrails that the `Perfectionist Validator` must check before accepting any FE refactor task.

## Rules

1. Behavior preservation first.
   - Refactor tasks must not change feature behavior unless the task scope explicitly includes behavior change.
2. No overengineering.
   - Avoid unnecessary abstractions, patterns, and indirection layers.
3. Touched-area discipline.
   - Do not add/modify/remove comments, docstrings, or type annotations in untouched code regions.
4. Modern React alignment.
   - React code should follow recent React guidance: derive data first, keep effects minimal, avoid effect-based mirror state.

## Validator Checklist Mapping

- Gate command coverage:
  - `pnpm validate:api-contract`
  - `pnpm validate:react-style`
  - `pnpm validate:type`
  - `pnpm validate:lint`
  - `pnpm validate:test`
  - `pnpm validate:build`
- Manual review coverage:
  - Guardrail rule 1-4 confirmation
  - Scope creep and over-abstraction rejection
