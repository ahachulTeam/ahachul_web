# Validator Checklist (Blocking)

## Required Gates (all must pass)

1. `pnpm validate:api-contract`
2. `pnpm validate:react-style`
3. `pnpm validate:services-quality:report`
   - RF-1050 baseline rule: this is a visibility gate only (report artifact generation), not a blocking quality-threshold gate.
4. `pnpm validate:type`
5. `pnpm validate:lint`
6. `pnpm validate:test`
7. `pnpm validate:build`
8. Next SEO checks: metadata/canonical/og/robots/sitemap consistency
9. Smoke checks after deploy: key routes and static chunks reachable
   - Vite: `node scripts/deploy-smoke-check.mjs --product=vite --base-url=<url> --routes="/,/community,/complaint,/lostFound"`
   - Next: `node scripts/deploy-smoke-check.mjs --product=next --base-url=<url> --routes="/,/community,/complaint,/lost-found,/login"`
10. Game-day rehearsal report gate

- `node scripts/deploy-game-day-report.mjs --environment=<production|staging> --vite-base-url=<vite-url> --next-base-url=<next-url> --s3-bucket=<bucket> --ecs-cluster=<cluster> --ecs-service=<service> --output=artifacts/game-day-report.md`

11. Release-ops manual rehearsal gate (release approval scope)

- `docs/GAME_DAY_MANUAL_CHECKLIST.md` 순서(`staging -> production`)대로 실행하고, 두 환경의 run URL + artifact 경로를 증빙으로 남길 것.

12. Refactor critical rules gate

- `docs/REFACTORING_CRITICAL_RULES.md` rule 1-4를 수동 검증 기록으로 남길 것.

13. Mock-mode isolation gate (RF-980+)

14. Services quality blocking promotion gate (RF-1050+)

- `pnpm validate:services-quality:block` is executed only in promotion phases (partial/expanded block), not in baseline-only governance phase.

- Vite mock mode: `pnpm --filter @ahhachul/app dev --mode mock` 환경에서 핵심 라우트 진입 시 백엔드 호출 누수(미핸들 API 요청)가 없어야 함.
- Next mock mode: `pnpm --filter @ahhachul/one-app dev:mock` 환경에서 핵심 라우트 진입 시 백엔드 호출 누수(미핸들 API 요청)가 없어야 함.
- Shared handler regression: `pnpm --filter @ahhachul/mock-api test` must pass.

## Rule

- Any failed gate returns task to `Rework`.
- Validator sign-off is mandatory before commit is marked `Done` in `SPRINT_BOARD.md`.
