# Refactor Conventions

## Workflow

- Task lifecycle: `Todo -> InProgress -> QAReady -> ValidatorPass -> Committed -> Done`
- Failure path: `* -> Rework -> QAReady`
- One task per commit.

## Git

- Branch naming: `codex/<scope>`
- Commit message format: `refactor(scope): [Task-ID] summary`

## Engineering

- Node: `20.13.0`
- Package manager: `pnpm@9.x`
- Dual-product strategy: keep both Vite and Next production-grade
- Styling strategy: keep Emotion (Vite) and Tailwind (Next), share tokens and domain logic
- Test strategy: Vitest (Vite), Jest (Next), common E2E/smoke gate
- Nx tag model: `type:app`, `type:shared`, `type:tooling`
- Boundary guard: `@nx/enforce-module-boundaries` must pass in `validate:lint`
- Affected commands: `affected:type`, `affected:lint`, `affected:test`, `affected:build`
- FE pod model: `FE Lead` + `FE Specialist A/B` with rule authority in `docs/refactor/FE_RULEBOOK.md`
- FE rulebook change tracking is mandatory in `docs/refactor/FE_RULEBOOK_CHANGELOG.md`
- FE meeting logs are timestamped files under `docs/refactor/fe-meetings` with index sync in `docs/refactor/FE_MEETING_LOG.md`
- Utility convention baseline: shared utils are pure-first, `any`-free signatures, and parse/encode via platform primitives
- React Query baseline: shared key factories/signature normalization + stale/gc-time and invalidation policy from `@ahhachul/domain`
- Date formatting baseline: `formatDisplayDate` in `@ahhachul/utils` is the only app-layer entrypoint (lint-enforced)
- Validation baseline: shared validators in `@ahhachul/utils` (`validateNickname`, `validateRequiredLexicalContent`, `isBlankText`) are mandatory
- Number/price baseline: `formatDisplayNumber`/`formatDisplayPrice` in `@ahhachul/utils` are mandatory display entrypoints (lint-enforced)
- Subway/common baseline: filter/line-map/arrival/content/file-extension helpers must use shared `@ahhachul/utils` contracts
- Shared utility regression baseline: validate/format utility changes must ship with unit tests and pass `@ahhachul/utils:test`
- Design-system color baseline: Vite/Next style layers must consume shared tokens from `@ahhachul/design-system`; direct inline hex is blocked in one-app and blocked in Vite Emotion/styled except approved legacy exception files.
- Shared component baseline: promote UI primitives to `packages/ui` only when they pass FE Rulebook Rule 8 (cross-app reuse + presentational scope + Storybook external narrative value) and block merge unless `CI=1 pnpm ui:storybook:build` passes.

## Validation Authority

- `Perfectionist Validator` is blocking authority.
- No task proceeds until validator pass is recorded in `WORKLOG.md`.
