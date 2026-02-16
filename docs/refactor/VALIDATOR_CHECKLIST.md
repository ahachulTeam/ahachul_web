# Validator Checklist (Blocking)

## Required Gates (all must pass)
1. `pnpm validate:type`
2. `pnpm validate:lint`
3. `pnpm validate:test`
4. `pnpm validate:build`
5. Next SEO checks: metadata/canonical/og/robots/sitemap consistency
6. Smoke checks after deploy: key routes and static chunks reachable

## Rule
- Any failed gate returns task to `Rework`.
- Validator sign-off is mandatory before commit is marked `Done` in `SPRINT_BOARD.md`.
