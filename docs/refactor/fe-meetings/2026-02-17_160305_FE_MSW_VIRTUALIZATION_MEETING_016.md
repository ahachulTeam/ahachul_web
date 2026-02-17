# FE Meeting 016 - MSW Virtualization (RF-980)

- DateTime (KST): 2026-02-17 16:03:05
- Task ID: RF-980
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, Infra Engineer, QA Engineer, Perfectionist Validator, Technical Writer

## Agenda

1. Vite/Next dual-app mock-mode architecture unification
2. Shared handler ownership and deterministic state strategy
3. Next runtime boundary design (`browser` vs `node` vs `edge`)
4. Validator gate and regression evidence definition

## Discussion Summary

- FE Lead proposed a shared-first architecture: all API handlers/state live in `@ahhachul/mock-api`; app-level files remain runtime bootstrap only.
- FE Specialist A presented deterministic in-memory state + `resetMockApiState` to keep test/runtime behavior reproducible.
- FE Specialist B migrated both apps to shared handlers and removed fragmented one-app legacy `src/mock/*` modules.
- Infra Engineer identified Next bundling boundary risks and fixed them using webpack runtime-aware aliasing:
  - server: block `msw/browser`
  - client/edge: block `msw/node`
- QA required blocking evidence from `pnpm validate:full` and shared handler tests.
- Validator approved progression only after full gate pass and zero unhandled mock API leakage policy confirmation.

## Decisions

1. `@ahhachul/mock-api` is the single source of truth for API mocking contracts.
2. Next mock runtime keeps dual path:
   - client worker via `MSWComponent`
   - node runtime via `src/instrumentation.ts`
3. Strict unhandled API policy remains mandatory to prevent backend dependency in mock mode.
4. RF-980 completion requires `pnpm validate:full` + `pnpm --filter @ahhachul/mock-api test` evidence.

## Action Items

- FE Lead: finalize rulebook Rule 12 and checklist updates.
- Technical Writer: sync sprint board/worklog/decisions/team status artifacts.
- QA: schedule route-level mock-mode smoke artifact task in next sprint.

## Validator Verdict

- Status: `ValidatorPass`
- Reason: All required gates for RF-980 passed and runtime boundary issues were resolved without behavior regression.
