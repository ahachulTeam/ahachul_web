# Deploy Runbook (Draft)

## Objectives
- Eliminate ghost cache and transient chunk load failures.
- Ensure atomic, immutable artifact availability.

## Vite Deploy Policy
- Do not delete bucket content during deploy.
- Upload immutable static assets with long cache TTL.
- Upload HTML with `no-cache` headers.
- Invalidate CloudFront paths after upload.

## Next Deploy Policy
- Build and push image with immutable SHA tag.
- Register new ECS task definition revision pinned to immutable image digest/tag.
- Deploy via CodeDeploy using the new task definition revision.

## Rollback
- Vite: revert HTML entry point to prior release references.
- Next: redeploy previous ECS task definition revision.
