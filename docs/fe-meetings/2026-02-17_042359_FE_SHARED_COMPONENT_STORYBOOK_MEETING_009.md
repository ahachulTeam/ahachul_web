# FE Shared Component + Storybook Council 009

- DateTime (KST): 2026-02-17 04:23:59
- Task ID: RF-900
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator

## Agenda

1. Decide extraction boundary for shared components.
2. Define Storybook exposure policy for externally shareable service tone.
3. Approve migration target list for initial `@ahhachul/ui` rollout.

## Discussion Summary

- FE Lead: shared promotion must be strict; only presentation primitives with cross-app reuse are eligible.
- FE Specialist A: extracted components should be token-driven and app-agnostic, with stable API props.
- FE Specialist B: app-specific orchestration should stay local with thin wrapper/re-export for migration safety.
- QA Engineer: promotion is accepted only when `pnpm validate:full` and `CI=1 pnpm ui:storybook:build` both pass.
- Perfectionist Validator: gate is blocking; any missing story contract or build failure returns task to rework.

## Decision

- Promote only the following first-wave components to `@ahhachul/ui`:
  - `ServiceBadge`
  - `SearchEmptyState`
  - `CommentEmptyState`
  - `BaseSkeleton`
  - `ConditionalRender`
- Keep domain orchestration components local in each app.
- Storybook taxonomy:
  - `Service/*` for product-facing components
  - `Utility/*` for lower-level render helpers

## Validator Gate

- `pnpm validate:full` => PASS
- `CI=1 pnpm ui:storybook:build` => PASS

## Action Items

1. FE Specialist A: maintain shared package baseline (`packages/ui`) and Storybook config.
2. FE Specialist B: complete dual-app migration and remove duplicated badge/styled implementations.
3. Technical Writer: sync FE rulebook, changelog, sprint board, and team status for RF-900.
