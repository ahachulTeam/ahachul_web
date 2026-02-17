# FE Conventions (ahachul_web)

Scope: `ahachul_web` (Next.js + Vite + shared packages in this monorepo)

## Commit Message

- Format: `refactor(scope): [Task-ID] summary`
- Example: `refactor(seo): [RF-1000] harden internal linking and sitemap`

## Engineering Baseline

- Node: `20.13.0`
- Package manager: `pnpm@9.x`
- Dual-product strategy: keep both Vite and Next production-grade.
- Styling strategy: keep Emotion (Vite) and Tailwind (Next), share tokens and domain logic.
- Test strategy: Vitest (Vite), Jest (Next), and common E2E/smoke gate.

## Monorepo/Nx Baseline

- Nx tag model: `type:app`, `type:shared`, `type:tooling`
- Boundary guard: `@nx/enforce-module-boundaries` must pass in `validate:lint`.
- Affected targets: `affected:type`, `affected:lint`, `affected:test`, `affected:build`.

## FE Rulebook References

- FE authority: `docs/FE_RULEBOOK.md`
- Rulebook changelog: `docs/FE_RULEBOOK_CHANGELOG.md`
- FE meeting log index: `docs/FE_MEETING_LOG.md`
- Critical validator rule: `docs/REFACTORING_CRITICAL_RULES.md`
