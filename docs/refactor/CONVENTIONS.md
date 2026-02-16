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

## Validation Authority
- `Perfectionist Validator` is blocking authority.
- No task proceeds until validator pass is recorded in `WORKLOG.md`.
