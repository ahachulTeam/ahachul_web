# Validator Checklist (Blocking)

## Required Gates (all must pass)

1. `pnpm validate:api-contract`
2. `pnpm validate:type`
3. `pnpm validate:lint`
4. `pnpm validate:test`
5. `pnpm validate:build`
6. Next SEO checks: metadata/canonical/og/robots/sitemap consistency
7. Smoke checks after deploy: key routes and static chunks reachable
   - Vite: `node scripts/deploy-smoke-check.mjs --product=vite --base-url=<url> --routes="/,/community,/complaint,/lostFound"`
   - Next: `node scripts/deploy-smoke-check.mjs --product=next --base-url=<url> --routes="/,/community,/complaint,/lost-found,/login"`
8. Game-day rehearsal report gate
   - `node scripts/deploy-game-day-report.mjs --environment=<production|staging> --vite-base-url=<vite-url> --next-base-url=<next-url> --s3-bucket=<bucket> --ecs-cluster=<cluster> --ecs-service=<service> --output=artifacts/game-day-report.md`

## Rule

- Any failed gate returns task to `Rework`.
- Validator sign-off is mandatory before commit is marked `Done` in `SPRINT_BOARD.md`.
