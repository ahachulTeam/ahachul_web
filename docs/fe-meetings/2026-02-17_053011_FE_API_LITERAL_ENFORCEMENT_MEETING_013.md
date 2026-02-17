# FE API Literal Enforcement Council 013

- DateTime (KST): 2026-02-17 05:30:11
- Task ID: RF-930
- Participants: FE Lead, FE Specialist A, FE Specialist B, Infra Engineer, QA Engineer, Technical Writer, Perfectionist Validator

## Agenda

1. Convert API endpoint literal policy from documentation/review-only to automatic blocking.
2. Define dual enforcement architecture (ESLint + AST scan + CI gate).
3. Decide exception boundary for internal API routes and contract files.

## Discussion Summary

- FE Lead: policy must fail fast at developer lint stage and CI stage, not only FE review.
- FE Specialist A: add AST scan script to catch literal endpoint usage in network call arguments across Vite/Next/packages.
- FE Specialist B: remove remaining literal usage in one-app auth refresh call and centralize it into internal API contract constants.
- Infra Engineer: add dedicated CI step (`validate:api-contract`) before Nx affected pipeline.
- QA Engineer: validator requires full gate pass and explicit scan success output.
- Perfectionist Validator: any direct endpoint string in network calls outside approved contract files must hard-fail.

## Decision

- Enforcement stack:
  - ESLint no-restricted-syntax rule for literal first-arg network calls (`fetch/fetchClient/request`, `axios/axiosInstance`)
  - AST scan script `scripts/scan-api-endpoint-literals.mjs` for endpoint-fragment detection in string/template arguments
  - CI hard gate in `.github/workflows/ci.yml`: `pnpm validate:api-contract`
  - `validate:full` includes `validate:api-contract` as first step
- Approved endpoint-literal definition files:
  - `packages/http/src/api-contract.ts`
  - `services/one-app/src/lib/internal-api-contract.ts`

## Validator Gate

- `pnpm validate:full` => PASS

## Action Items

1. FE Specialist A: keep scan patterns synchronized with shared API contract growth.
2. FE Specialist B: migrate any future internal route literals into centralized internal contract modules.
3. Technical Writer: keep rulebook/checklist/sprint/worklog/team-memory artifacts aligned with RF-930.
