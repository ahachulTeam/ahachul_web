# Deploy Runbook (Draft)

## Objectives

- Eliminate ghost cache and transient chunk load failures.
- Ensure atomic, immutable artifact availability.
- Fail deployment automatically when post-deploy chunk availability checks fail.

## Smoke Script

- Script path: `scripts/deploy-smoke-check.mjs`
- Required input: `--base-url`
- Default checks:
  - Route HTML availability (`200`)
  - HTML-discovered static/chunk asset availability (`200`)
  - Immutable cache policy on static/chunk assets (`immutable` or `max-age>=31536000`)
- Example:
  - `node scripts/deploy-smoke-check.mjs --product=next --base-url=https://one-app.example.com --routes=\"/,/community,/complaint,/lost-found,/login\"`

## Vite Deploy Policy

- Do not delete bucket content during deploy.
- Upload immutable static assets with long cache TTL.
- Upload HTML with `no-cache` headers.
- Create CloudFront invalidation and wait until completion.
- Run post-deploy smoke check:
  - `node scripts/deploy-smoke-check.mjs --product=vite --base-url=$SMOKE_BASE_URL --routes=\"/,/community,/complaint,/lostFound\"`

## Next Deploy Policy

- Build and push image with immutable SHA tag.
- Register new ECS task definition revision pinned to immutable image digest/tag.
- Create CodeDeploy deployment and wait until `deployment-successful`.
- Run post-deploy smoke check:
  - `node scripts/deploy-smoke-check.mjs --product=next --base-url=$SMOKE_BASE_URL --routes=\"/,/community,/complaint,/lost-found,/login\"`

## Failure Handling

- Smoke check failure is blocking and marks workflow failed.
- Immediate actions:
  1. Vite: restore prior HTML references (or redeploy previous release manifest) and re-run invalidation.
  2. Next: redeploy previous ECS task definition revision via CodeDeploy.
  3. Re-run smoke check against rollback target before reopening traffic.

## Rollback

- Vite: revert HTML entry point to prior release references.
- Next: redeploy previous ECS task definition revision.

## Game-Day Rehearsal Automation

- Workflow: `.github/workflows/game-day-rehearsal-report.yml`
- Trigger:
  - Scheduled weekly (`Mon 02:00 UTC`)
  - Manual (`workflow_dispatch`) with `production|staging` target selection
- Report script: `scripts/deploy-game-day-report.mjs`
- Automated checks:
  1. Post-deploy smoke check for Vite and Next base URLs (route + chunk availability)
  2. Vite rollback readiness (at least two S3 release manifests under `releases/`)
  3. Next rollback readiness (previous ECS task definition revision resolvable)
- Outputs:
  - Workflow Summary markdown
  - Uploaded artifact `game-day-rehearsal-report`

## Manual Execution

- Example:
  - `pnpm ops:game-day-report -- --environment=production --vite-base-url=<vite-url> --next-base-url=<next-url> --s3-bucket=<bucket> --ecs-cluster=<cluster> --ecs-service=<service> --output=artifacts/game-day-report.md`
