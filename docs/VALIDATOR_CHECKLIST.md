# Validator Checklist (Blocking)

## Required Gates (all must pass)

1. `pnpm validate:api-contract`
2. `pnpm validate:react-style`
3. `pnpm validate:services-quality:report`
   - RF-1050 baseline rule: visibility gate only (report artifact generation), not threshold blocking.
4. `pnpm validate:services-file-conventions:report`
   - RF-1060 baseline rule: visibility gate only (report artifact generation), not threshold blocking.
5. `pnpm validate:type`
6. `pnpm validate:lint`
7. `pnpm validate:test`
8. `pnpm validate:build`
9. Next SEO checks: metadata/canonical/og/robots/sitemap consistency.
10. Smoke checks after deploy: key routes and static chunks reachable.

- Vite: `node scripts/deploy-smoke-check.mjs --product=vite --base-url=<url> --routes="/,/community,/complaint,/lostFound"`
- Next: `node scripts/deploy-smoke-check.mjs --product=next --base-url=<next-url> --routes="/,/community,/complaint,/lost-found,/login"`

11. Game-day rehearsal report gate.

- `node scripts/deploy-game-day-report.mjs --environment=<production|staging> --vite-base-url=<vite-url> --next-base-url=<next-url> --s3-bucket=<bucket> --ecs-cluster=<cluster> --ecs-service=<service> --output=artifacts/game-day-report.md`

12. Release-ops manual rehearsal gate (release approval scope).

- Execute by `docs/GAME_DAY_MANUAL_CHECKLIST.md` order (`staging -> production`) and archive run URL + artifact path evidence.

13. Refactor critical rules gate.

- Leave manual verification record for rule 1-4 in `docs/REFACTORING_CRITICAL_RULES.md`.

14. Mock-mode isolation gate (RF-980+).

- Vite mock mode: `pnpm --filter @ahhachul/app dev --mode mock` must not leak unhandled backend API requests.
- Next mock mode: `pnpm --filter @ahhachul/one-app dev:mock` must not leak unhandled backend API requests.
- Shared handler regression: `pnpm --filter @ahhachul/mock-api test` must pass.

15. Services quality blocking promotion gate (RF-1050+).

- `pnpm validate:services-quality:block` is executed only in promotion phases (partial/expanded block), not in baseline-only governance phase.

16. Services file-convention blocking promotion gate (RF-1060+).

- `pnpm validate:services-file-conventions:block` is executed only after low-false-positive verification and remediation playbook publication.

## Rule

- Any failed gate returns task to `Rework`.
- Validator sign-off is mandatory before commit is marked `Done` in `SPRINT_BOARD.md`.
