# Game-Day Manual Execution Checklist

## Scope

- Target workflow: `.github/workflows/game-day-rehearsal-report.yml`
- Target environments: `staging`, `production`
- Success condition:
  - Workflow conclusion is `success`
  - Report summary table contains `PASS` for all checks
  - Artifact `game-day-rehearsal-report` is attached and archived

## Preconditions

- Confirm GitHub auth:
  - `gh auth status`
- Confirm repository context:
  - `gh repo view --json nameWithOwner --jq .nameWithOwner`
- Confirm workflow exists:
  - `gh workflow view game-day-rehearsal-report.yml`
- Dry-run command plan (no dispatch):
  - `pnpm ops:game-day:dispatch -- --environment=all --watch=true --download=true --dry-run=true`
- Confirm required secrets exist and are valid:
  - `DEV_META_DATA`, `DEV_REACT_APP_CONFIG`, `DEV_ONE_APP_CONFIG`
  - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
  - `S3_BUCKET_NAME`, `ECS_CLUSTER_NAME`, `ECS_SERVICE_NAME`

## Stage 1: Staging Rehearsal

1. Dispatch and watch:
   - `pnpm ops:game-day:dispatch -- --environment=staging --watch=true --download=true`
2. Open run URL and verify job `Deployment Rehearsal Report` completed.
3. Confirm report artifact download path:
   - `artifacts/game-day/staging/<runId>/game-day-report.md`
4. Confirm report `Summary` section:
   - `Vite smoke check = PASS`
   - `Next smoke check = PASS`
   - `Vite rollback readiness = PASS`
   - `Next rollback readiness = PASS`

## Stage 2 Gate (Before Production)

- If any staging check fails:
  - Stop here.
  - Raise incident and assign fix owner.
  - Re-run staging after fix.
- If all staging checks pass:
  - Continue to production rehearsal.

## Stage 3: Production Rehearsal

1. Dispatch and watch:
   - `pnpm ops:game-day:dispatch -- --environment=production --watch=true --download=true`
2. Open run URL and verify job `Deployment Rehearsal Report` completed.
3. Confirm report artifact download path:
   - `artifacts/game-day/production/<runId>/game-day-report.md`
4. Confirm report `Summary` section:
   - `Vite smoke check = PASS`
   - `Next smoke check = PASS`
   - `Vite rollback readiness = PASS`
   - `Next rollback readiness = PASS`

## Failure Handling Matrix

- `Vite smoke check = FAIL`
  - Block release approval.
  - Execute Vite rollback path from `DEPLOY_RUNBOOK.md` and rerun rehearsal.
- `Next smoke check = FAIL`
  - Block release approval.
  - Redeploy previous ECS task definition revision and rerun rehearsal.
- `Vite rollback readiness = FAIL`
  - Block release approval.
  - Ensure at least two valid release manifests exist in `s3://<bucket>/releases/`.
- `Next rollback readiness = FAIL`
  - Block release approval.
  - Ensure previous ECS task definition revision is resolvable and deployable.

## Evidence Template

| Environment | Run URL | Artifact Path                                              | Overall Result | Reviewer | Timestamp (KST)         |
| ----------- | ------- | ---------------------------------------------------------- | -------------- | -------- | ----------------------- |
| staging     | `<url>` | `artifacts/game-day/staging/<runId>/game-day-report.md`    | `PASS/FAIL`    | `<name>` | `<YYYY-MM-DD HH:mm:ss>` |
| production  | `<url>` | `artifacts/game-day/production/<runId>/game-day-report.md` | `PASS/FAIL`    | `<name>` | `<YYYY-MM-DD HH:mm:ss>` |

## One-Shot Command (Both Environments)

- `pnpm ops:game-day:dispatch -- --environment=all --watch=true --download=true`
