# Refactor Decisions

## Accepted Decisions

1. Keep Nx and maximize affected/caching/module-boundary usage.
2. Keep existing AWS infrastructure and improve deploy architecture in-repo plus runbook.
3. Next parity target is full Vite parity, with route standardization and redirect compatibility.
4. SEO target scope is `ko-KR` single locale with reusable metadata architecture.
5. Keep Vite and Next both active products.
6. Commit granularity is one commit per task.
7. Enforce Nx dependency boundaries via project tags (`type:app`, `type:shared`, `type:tooling`) and lint rule gates.
8. Shared HTTP client must not force `application/json` when body is `FormData` to preserve multipart boundary correctness.
9. Next write routes (`/lost-found/new`, `/lost-found/:id/edit`) are authentication-required and guarded in middleware.
10. Both deploy workflows must block on post-deploy smoke checks that verify route HTML and referenced chunk/static asset reachability.
11. FE governance model is upgraded to `FE Lead + FE Specialist A/B`, and FE conventions are codified in a dedicated rulebook.
12. Utility functions are phase-1 convention enforcement target: pure-first design, `unknown`-first typing, and shared promotion for duplicated logic.
