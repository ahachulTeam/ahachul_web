# FE Rulebook

## Scope

- This rulebook applies to `services/one-app`, `services/ahhachul.com`, and shared FE utilities in `packages/*`.
- Priority order for rollout:
  1. Utility functions
  2. React Query conventions
  3. Date/time formatting conventions

## FE Pod Structure

- FE Lead (`fe-lead`): final technical decision owner for FE architecture and conventions.
- FE Specialist A (`fe-spec-a`): shared utility/API/query architecture.
- FE Specialist B (`fe-spec-b`): UI-layer adoption, migration execution, and regression safety.

## Rule 1: Utility Function Conventions (Phase 1)

### 1) Purity and Side Effects

- Shared utility functions in `packages/utils` must be pure by default.
- Shared utilities must not perform side effects (`window`, `document`, network I/O, `console.*`).
- If side effects are unavoidable, keep them in app layer utilities (`services/*/src/utils`) and mark them clearly.

### 2) Type Safety Baseline

- `any` is prohibited in shared utility function signatures.
- Prefer `unknown` + explicit narrowing/type guards for parsing and boundary inputs.
- Utility return types must be explicit and stable.

### 3) Parsing and Encoding Baseline

- Query-string handling must use platform primitives (`URLSearchParams`) over manual split/decode parsing.
- JSON parsing utilities must provide a safe fallback path and never throw for expected bad input.

### 4) Shared-First Reuse

- Duplicate pure utilities across apps must be promoted to `@ahhachul/utils`.
- App-level wrappers may re-export shared utilities when local import paths must stay stable.

### 5) Date Formatting Baseline

- User-visible date formatting entrypoint: `@ahhachul/utils` date helpers.
- Avoid repeated direct `Date.prototype.toLocale*` calls in render-heavy paths.
- If locale formatting is needed repeatedly, use reusable/cached `Intl.DateTimeFormat` strategy.

## Rule 2: React Query Conventions

### 1) Query Keys

- Use deterministic array keys and domain prefixes (`['lost-found', 'posts', ...]`).
- Query key factories are preferred for reusable domains.
- Canonical key factories live in `@ahhachul/domain`:
  - `communityQueryKeys`, `complaintQueryKeys`, `lostFoundQueryKeys`, `userQueryKeys`, `myQueryKeys`, `subwayQueryKeys`
- List keys must use signature normalization (`buildQuerySignature` + `normalizeQuerySignature`) to prevent equivalent-filter cache fragmentation.

### 2) Defaults and Freshness

- `staleTime` and `gcTime` must be intentionally set for user-facing feeds/details.
- No implicit reliance on default retry/refetch behavior for critical UX.
- Standard freshness policy:
  - Feed/List: `staleTime=1m`, `gcTime=5m`
  - Detail/Comments: `staleTime=5m`, `gcTime=10m`
  - User Profile/Favorites: `staleTime=30m`, `gcTime=60m`
  - Static dictionaries (e.g., subway lines): `staleTime=Infinity`, `gcTime=Infinity`
- Shared constants source: `@ahhachul/domain` (`QUERY_STALE_TIME`, `QUERY_GC_TIME`).

### 3) Mutation and Invalidation

- Mutation success handlers must explicitly invalidate or update the affected query domains.
- Invalidation scope must be minimal but sufficient to prevent stale UI.
- Invalidation baseline:
  - Create/Delete: invalidate domain `lists()` scope.
  - Edit/Status update: invalidate `lists()` and target `detail(id)`.
  - Comment create/edit/delete: invalidate target `comments(id)` key.
- Dynamic post actions must resolve invalidation domain through query-domain helpers (`resolvePostQueryDomain`, `resolvePostListInvalidationKey`) instead of string includes.

## Rule 3: Date/Time Formatting Conventions

- Relative/absolute date output format must be centralized in shared helpers.
- Fallback strategy for invalid date input must be deterministic and user-safe.
- Locale baseline for now: `ko-KR`.

## Implementation Checklist

- [ ] New utility function added with explicit input/output type.
- [ ] No `any` in shared utility signatures.
- [ ] No side effects in `packages/utils`.
- [ ] Query-string logic uses `URLSearchParams`.
- [ ] Duplicated pure utility considered for shared promotion.
- [ ] React Query key + invalidation reviewed for new data flows.

## Sources (Primary)

- React: Keeping Components Pure
  - [https://react.dev/learn/keeping-components-pure](https://react.dev/learn/keeping-components-pure)
- TanStack Query: Important Defaults
  - [https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- TanStack Query: Query Keys
  - [https://tanstack.com/query/latest/docs/framework/react/guides/query-keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- TanStack Query: Invalidations from Mutations
  - [https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- MDN: `Date.prototype.toLocaleDateString()`
  - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
- MDN: `URLSearchParams`
  - [https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- TypeScript Handbook: `unknown`
  - [https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)
- date-fns (official repo)
  - [https://github.com/date-fns/date-fns](https://github.com/date-fns/date-fns)
