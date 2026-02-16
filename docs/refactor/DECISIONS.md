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
13. React Query conventions are standardized via `@ahhachul/domain`: shared key factories, normalized list-key signatures, and fixed stale/gc-time + invalidation policies across Vite/Next.
14. Date formatting conventions are standardized via `@ahhachul/utils`: `formatDisplayDate` is the single app-layer entrypoint, with lint-level blocking for direct `date-fns`/`toLocale*`/`Intl.DateTimeFormat` usage.
15. Validation and numeric display conventions are standardized via `@ahhachul/utils`: `validateNickname`/`validateRequiredLexicalContent`/`isBlankText` and `formatDisplayNumber`/`formatDisplayPrice` are shared entrypoints with lint-level blocking for direct `Intl.NumberFormat` usage in app code.
16. FE governance artifacts are append-only and auditable: rulebook edits must be recorded in `FE_RULEBOOK_CHANGELOG.md`, and FE meeting logs must be timestamped files under `docs/refactor/fe-meetings`.
17. Form hooks in Vite domain flows are standardized with shared schema and orchestration primitives (`useSchemaForm`, `useLexicalValidatedSubmit`, image handler hooks); cross-app hook package elevation is deferred until Next form stack converges.
18. RF-840 follow-up utility promotion is mandatory: subway/common pure helpers (`formatSubwayFilterOption`, `formatSubwayLineInfo`, `getFirstParentLineId`, `formatLost112Content`, `formatSubwayArrivalTime`, `parseFileExtOfName`) must live in `@ahhachul/utils`, with app-local modules limited to wrappers/side effects.
19. Shared utility convention enforcement now includes regression tests: validate/format utility contract updates require unit tests in `@ahhachul/utils`, and validator gate must execute `@ahhachul/utils:test`.
20. Design-system color authority is centralized in `@ahhachul/design-system` and must follow the Vite hex palette as source of truth; Vite Emotion theme and Next Tailwind/global tokens must consume shared exports instead of duplicating palette literals.
21. One-app inline hex literals are disallowed for class-based styling: `className` with Tailwind arbitrary hex (`bg-[#...]` etc.) must be replaced by semantic/shared tokens from `@ahhachul/design-system`, and lint now blocks new occurrences.
22. Shared component extraction is selective, not exhaustive: only cross-app presentational primitives with Storybook external narrative value are promoted into `@ahhachul/ui`, while domain orchestration components remain app-local with optional wrappers/re-exports.
23. Navigation components follow a shell/adapter split: presentational nav primitives are shared in `@ahhachul/ui`, while route/auth/side-effect orchestration stays app-local.
24. API layer sharedization follows a contract-first model: Vite keeps `axios` runtime and Next keeps `fetch` runtime, while endpoint/default contracts are centralized in `@ahhachul/http` (`API_PATHS`, `API_SERVICE_PATHS`, `API_PAGE_SIZE`, `API_SORT`).
