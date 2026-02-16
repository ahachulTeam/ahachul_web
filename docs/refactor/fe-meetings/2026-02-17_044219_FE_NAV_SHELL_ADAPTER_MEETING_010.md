# FE Nav Shell/Adapter Council 010

- DateTime (KST): 2026-02-17 04:42:19
- Task ID: RF-901
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator

## Agenda

1. Decide whether NavBar should be promoted as a shared component.
2. Define extraction boundary for navigation components under Rule 8.
3. Confirm validator gate for shared nav migration.

## Discussion Summary

- FE Lead: full nav component sharing is risky because route policy/auth gating diverges by app; share only presentation shell/item primitives.
- FE Specialist A: introduce `BottomNav` and `BottomNavItem` in `@ahhachul/ui` with design-system token styling and stable props.
- FE Specialist B: keep app adapters local (`Gnb`, `NavMenu`) to preserve router integration and app-specific visibility rules.
- QA Engineer: accept only when dual-app build/test and Storybook build both pass.
- Perfectionist Validator: block if app-level orchestration leaks into shared package.

## Decision

- Approved architecture:
  - shared package (`@ahhachul/ui`): `BottomNav`, `BottomNavItem` presentational primitives
  - app layer (`services/*`): route matching, navigation side effects, auth/visibility policy
- Storybook scope includes nav shell and nav item stories.

## Validator Gate

- `pnpm validate:full` => PASS
- `CI=1 pnpm ui:storybook:build` => PASS

## Action Items

1. FE Specialist A: maintain nav primitive API stability and Storybook docs.
2. FE Specialist B: keep Vite/Next adapters thin and app-local.
3. Technical Writer: sync rulebook/changelog/sprint/worklog/team status artifacts for RF-901.
