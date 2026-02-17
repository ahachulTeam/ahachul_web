# FE Rulebook

## Scope

- This rulebook applies to `services/one-app`, `services/ahhachul.com`, and shared FE utilities in `packages/*`.
- Priority order for rollout:
  1. Utility functions
  2. React Query conventions
  3. Date/time formatting conventions
  4. Validation + number/price formatting conventions
  5. Form + Zod + schema hook conventions
  6. Design-system token conventions
  7. Shared component + Storybook conventions
  8. MSW mock-mode virtualization conventions
  9. Static i18n conventions (Next-only)

## FE Pod Structure

- FE Lead (`fe-lead`): final technical decision owner for FE architecture and conventions.
- FE Specialist A (`fe-spec-a`): shared utility/API/query architecture.
- FE Specialist B (`fe-spec-b`): UI-layer adoption, migration execution, and regression safety.

## Rulebook Operations

- Every edit to this rulebook must add one entry to `docs/refactor/FE_RULEBOOK_CHANGELOG.md` in the same commit.
- Every FE meeting record must be stored in `docs/refactor/fe-meetings` with `YYYY-MM-DD_HHMMSS_<TOPIC>.md`.
- `docs/refactor/FE_MEETING_LOG.md` is index-only and must be synchronized when adding a new meeting file.
- PR merge strategy governance is owned by `docs/refactor/CONVENTIONS.md` (`Merge Policy`) and FE PRs must follow that policy.

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

- User-visible date formatting single entrypoint: `formatDisplayDate` from `@ahhachul/utils`.
- Avoid repeated direct `Date.prototype.toLocale*` calls in render-heavy paths.
- If locale formatting is needed repeatedly, implement reusable/cached `Intl.DateTimeFormat` only inside shared date utility module.

### 6) Validation Baseline

- Shared validation entrypoints:
  - `validateNickname`
  - `validateRequiredText`
  - `validateRequiredLexicalContent`
  - `isBlankText`
- Form/UI validation must consume shared validation results (`isValid`, `message`, `normalized`) instead of duplicating regex/length logic per page.
- Input normalization baseline: `normalizeInputText` (`NFC + trim`) before length/format checks.

### 7) Number/Price Formatting Baseline

- User-visible number formatting entrypoint: `formatDisplayNumber`.
- User-visible price formatting entrypoint: `formatDisplayPrice`.
- Direct number locale formatting APIs in app layer are prohibited:
  - `Intl.NumberFormat`
  - `Number.prototype.toLocaleString`
- Exception scope: shared numeric formatter implementation file (`packages/utils/src/number.ts`).

### 8) Subway/Common Utility Baseline

- Subway filter conversion must use shared `formatSubwayFilterOption`.
- Subway line/station dedupe-map conversion must use shared `formatSubwayLineInfo`.
- Favorite-line aggregation must use shared `getFirstParentLineId`.
- Lost112 content text normalization must use shared `formatLost112Content`.
- Subway/train arrival countdown labeling must use shared `formatSubwayArrivalTime`.
- File extension parsing must use shared `parseFileExtOfName`.

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

- Relative/absolute date output format must be centralized in `formatDisplayDate`.
- Fallback strategy for invalid date input must be deterministic and user-safe.
- Locale baseline for now: `ko-KR`.
- Direct `date-fns` import in app layer, direct `toLocale*`, and direct `Intl.DateTimeFormat` are blocked by lint (except `packages/utils/src/date.ts` and `packages/utils/src/number.ts`).

## Rule 4: Validation and Numeric Display Conventions

- Nickname validation must use `validateNickname` as the shared contract across Vite/Next.
- Required lexical content validation must use `validateRequiredLexicalContent`.
- Generic empty-string checks must use `isBlankText` where reusable.
- Number labels/counters must use `formatDisplayNumber`.
- Price output (if/when introduced) must use `formatDisplayPrice`.

## Rule 5: Form + Zod + Schema Hook Conventions

- Form hooks should use schema-driven form setup (`useSchemaForm`) as the default baseline.
- Repeated image-upload/delete logic across post forms must use shared form hooks (`useCreatePostImageHandlers`, `useEditPostImageHandlers`).
- Lexical content required-validation for submit/error flows must use shared submit helper (`useLexicalValidatedSubmit`).
- Domain-specific differences (e.g., mutation target, default values) may remain local, but orchestration primitives must be shared first.

## Rule 6: Shared Utility Test Conventions

- Shared utility contracts in `@ahhachul/utils` must include unit tests in the same task when behavior changes or new helpers are added.
- Validation and format-related utilities are mandatory test scope:
  - validation: normalize/blank/nickname/required-text/required-lexical
  - formatting: date/number/price/subway/common formatting contracts
- `validate:test` must execute shared utility package tests via Nx (`@ahhachul/utils:test`).

## Rule 7: Design System Token Conventions

- Vite color palette is the canonical source and must be centralized in `@ahhachul/design-system`.
- Vite Emotion theme color export (`services/ahhachul.com/src/styles/theme/colors.ts`) must only re-export shared tokens.
- Next Tailwind color configuration must consume `tailwindColors` from `@ahhachul/design-system` and must not duplicate palette literals.
- Both apps must subscribe to shared CSS tokens (`@ahhachul/design-system/tokens.css`) at the app entry layer.
- Any new shared UI color token must be added in `@ahhachul/design-system` first, then consumed by apps; app-local ad-hoc hex literals are allowed only as temporary exceptions with follow-up task debt.
- One-app `className` must not use Tailwind arbitrary hex notation (`bg-[#...]`, `text-[#...]`, `border-[#...]`); use semantic shared token classes instead.
- One-app JSX/SVG inline color literals (`fill="#..."`, `stroke="#..."`, direct hex props) must use shared token references (`colors.*`) instead.
- Vite Emotion/styled layer must not use direct hex literals in `styled.*`, Emotion `css`, or inline style objects; use shared tokens (`theme.colors.*` or `var(--ah-color-*)`) from `@ahhachul/design-system`.
- Temporary exception scope is removed. Vite source has zero approved inline-hex exception files.

## Rule 8: Shared Component + Storybook Conventions

### 1) Promotion Criteria (Must-pass)

- Promote to shared (`packages/ui`) only when all criteria pass:
  - Reusability: used in both apps now, or confirmed cross-app reuse in next sprint scope.
  - Responsibility: presentational/UI primitive only (no route/domain orchestration, no API side effects).
  - Token alignment: style values come from shared tokens (`@ahhachul/design-system`) and are app-agnostic.
  - Public narrative value: component helps communicate service tone when exposed in Storybook.

### 2) Non-Promotion Criteria (Keep local)

- Do not promote when component is tightly coupled with:
  - route navigation, server actions, domain mutation flows, or feature-specific state orchestration
  - app-only layout contracts that are not reusable between Vite/Next

### 3) Storybook Delivery Baseline

- Every promoted shared component must provide Storybook stories:
  - `Playground` (args-first contract demo)
  - `Service Context` example (realistic product usage tone)
  - `Edge/Empty` example when applicable
- Story taxonomy must stay service-readable for external sharing:
  - `Service/*` for product-facing primitives
  - `Utility/*` for low-level rendering utilities
- Blocking gate for shared component tasks:
  - `CI=1 pnpm ui:storybook:build`

### 4) Migration Pattern

- Keep legacy app import paths stable with wrapper/re-export files when needed.
- Remove duplicated local implementations only after shared replacement passes `validate:full`.

### 5) Navigation Component Boundary

- Global navigation components (e.g., bottom nav/navbar) must be split by responsibility:
  - shared: presentational shell/item primitives (`@ahhachul/ui`)
  - app-local: route policy, auth gating, router/stackflow integration, haptic/side effects
- Do not move app-specific nav visibility rules or navigation orchestration into shared packages.
- Shared nav primitives must be token-based and story-documented before app migration.

## Rule 9: API Contract Layer Conventions

### 1) Transport Ownership (Keep As-Is)

- Vite keeps `axiosInstance`/`axios` as transport runtime.
- Next keeps `fetch`/`fetchClient` as transport runtime.
- Do not force transport unification if it increases app-specific risk.

### 2) Shared Contract Ownership

- API endpoint strings must be sourced from `@ahhachul/http`:
  - `API_PATHS`
  - `API_SERVICE_PATHS`
  - `API_PAGE_SIZE`
  - `API_SORT`
- Domain API modules in both apps must not hardcode endpoint literals when equivalent shared contracts exist.

### 3) URL Construction Baseline

- Relative request paths use `API_PATHS.*`.
- Absolute prefetch URLs in Vite must compose as:
  - `${BASE_URL.SERVER}${API_PREFIX}${API_PATHS.*}`
- `servicePath` payloads for comment/reply flows must use `ApiServicePath` typed values.

### 4) Exception Scope

- Raw endpoint literals are allowed only in test/mock fixtures or one-off migration stubs with explicit follow-up debt.
- New production API callsites with raw endpoint literals should fail FE review.

### 5) Automatic Enforcement Gate

- Endpoint literal policy is CI-blocking:
  - lint-time restriction (`.eslintrc.js`) blocks string-literal network endpoints in `fetch/fetchClient/request` and `axios/axiosInstance`.
  - AST scan (`pnpm validate:api-contract`) blocks endpoint fragments in network call string/template arguments.
- Approved endpoint-literal definition files are limited to:
  - `packages/http/src/api-contract.ts`
  - `services/one-app/src/lib/internal-api-contract.ts`

## Rule 10: Shared Type Contract Conventions

### 1) Canonical Ownership

- API response and pagination contracts must be canonical in `@ahhachul/domain`.
- Canonical types:
  - `APIResponseCode`
  - `ApiResponse` / `IResponse`
  - `CursorPagination`
  - `PaginatedList`
  - `WithPostId`

### 2) App-Layer Usage

- `services/*/src/types/common.ts` may keep alias exports for migration stability, but must not re-declare canonical structures.
- App code should prefer imports from shared contracts (directly or via local alias layer) instead of redefining response/pagination types per feature.

### 3) Change Management

- Any response/pagination schema change must be implemented once in `@ahhachul/domain`, then consumed by both apps.
- Parallel type forks across Vite/Next are prohibited for canonical contracts.

## Rule 11: Micro React Coding Style Conventions

### 1) Conditional Rendering Readability

- Nested ternary (`a ? b : c ? d : e`) is prohibited across FE source.
- Prefer explicit branching with:
  - `if/else` for business conditions
  - precomputed variables (`let label = ...`)
  - small render helpers for JSX-heavy branches
- Enforcement:
  - ESLint `no-nested-ternary=error`

### 2) Derived State and `useEffect`

- `useEffect(() => setState(prop), [prop])` mirror patterns are prohibited unless there is an explicit synchronization boundary requirement.
- Preferred order:
  1. derive directly from props/query/store in render (`useMemo` only if expensive)
  2. keep editable local state only when true user edits exist
  3. if sync is required, document the boundary and keep effect scope minimal
- Enforcement:
  - `pnpm validate:react-style` (`scan-react-style-violations.mjs`) blocks obvious mirror patterns.

### 3) Input/Search Responsiveness Pattern

- For expensive filtered views driven by text input:
  - keep controlled input state immediate
  - defer heavy list derivation with `useDeferredValue` pattern
- Avoid redundant state writes in one handler (`setState` + transition duplicate calls).

### 4) Naming Conventions

- Variable names:
  - booleans start with `is/has/can/should`
  - collection variables use plural nouns (`images`, `stations`)
  - ambiguous abbreviations are prohibited unless domain-standard (`id`, `url`, `api`)
- Function names:
  - event handlers start with `handle`
  - predicates start with `is/has/can`
  - format/parse functions start with `format/parse`
- File names:
  - no typo variants (`Timemout`, `Comlaint`, etc.)
  - hook file names must reflect exported hook (`useTimeout.ts` -> `useTimeout`)

### 5) Refactor Guardrails (Validator Priority)

- Refactors must preserve existing behavior unless task scope explicitly includes feature change.
- Avoid overengineering: do not introduce unnecessary abstraction layers.
- Do not add/modify/remove comments, docstrings, or type annotations in untouched code regions.
- React refactors must align with modern React guidance (data derivation first, minimal effect scope).

## Rule 12: Mock-Mode Virtualization Conventions

### 1) Shared Handler Ownership

- API mocking handlers/state must live in `@ahhachul/mock-api` and be consumed by both apps.
- App-local mock handlers are allowed only as temporary wrappers/bootstrap entrypoints.

### 2) Strict Unhandled Policy

- Mock mode must fail loudly for unhandled API requests (backend leak-through 금지).
- Non-API asset/document requests may bypass with warning-level handling only.

### 3) Runtime Boundaries

- Browser mocking: `msw/browser` only in client runtime.
- Next server mocking: `msw/node` only in node runtime (`instrumentation` path), never in edge/client bundle.
- Next webpack alias policy must block cross-runtime import resolution (`msw/browser` on server, `msw/node` on client/edge).

### 4) Deterministic State + Reset

- Shared mock state must be deterministic and resettable (`resetMockApiState`) for repeatable test/runtime behavior.
- Test setup files must reset handlers and mock state after each test.

### 5) Coverage Baseline

- Mock handlers must cover all contract paths in `@ahhachul/http` (`API_PATHS`, `API_SERVICE_PATHS`) used by runtime flows.
- Minimum coverage flows: auth/profile, list/detail/create/edit/delete, comment create/edit/delete, subway, presigned upload.

## Rule 13: Static i18n Conventions (Next-only)

### 1) Scope Guard

- Dynamic translation is out of scope for the current refactor round:
  - no DeepL integration
  - no runtime server translation proxy
- Locale copy source must be static message resources under `services/one-app/src/i18n/messages`.

### 2) Locale and URL Policy

- Supported locales are fixed to `ko`, `en`, `th`, `cn`.
- Default locale is `ko` and must keep canonical non-prefixed routes.
- Non-default locales use prefixed routes (`/en/*`, `/th/*`, `/cn/*`).
- Middleware is the single normalization point for:
  - locale extraction from path
  - locale cookie synchronization
  - locale request-header injection for server components

### 3) Locale UX Baseline

- Language selector must be present in:
  - home footer
  - my page
- Selector behavior requirements:
  - preserve current pathname (normalized then relocalized)
  - preserve current query string
  - update locale cookie
  - complete transition in a single deterministic navigation step (no multi-step push+refresh chaining)

### 4) Server/Client Boundary

- `next/headers`-dependent locale resolver must be isolated in `@/i18n/server`.
- Client-safe i18n barrel (`@/i18n`) must not re-export server-only modules.
- Server components importing locale resolver must use `@/i18n/server` explicitly.

### 5) Locale-aware SEO Boundary

- Metadata generation on localized routes must include locale-specific SEO fields from a single helper:
  - `openGraph.locale`
  - `alternates.languages` (`hreflang` map + `x-default`)
- Structured data must align with request locale:
  - `createWebsiteJsonLd(...inLanguage)` uses locale map output
  - navigation JSON-LD labels/URLs use localized copy + localized path
- Locale SEO mapping values are centralized and append-only (no per-page ad-hoc locale string literals).

## Implementation Checklist

- [ ] New utility function added with explicit input/output type.
- [ ] No `any` in shared utility signatures.
- [ ] No side effects in `packages/utils`.
- [ ] Query-string logic uses `URLSearchParams`.
- [ ] Duplicated pure utility considered for shared promotion.
- [ ] React Query key + invalidation reviewed for new data flows.
- [ ] User-facing date output uses `formatDisplayDate` (no direct locale/date-fns formatting in app code).
- [ ] Validation logic uses shared `@ahhachul/utils` validators (no duplicated regex/length blocks across apps).
- [ ] User-facing numeric labels/prices use `formatDisplayNumber` / `formatDisplayPrice`.
- [ ] Subway/common utility helpers use shared `@ahhachul/utils` contracts (no duplicated app-local implementation bodies).
- [ ] Shared utility behavior changes include corresponding unit tests in `@ahhachul/utils`.
- [ ] Shared color token changes are applied in `@ahhachul/design-system` first and consumed by both apps.
- [ ] One-app has no residual inline hex literals (`rg -n "#[0-9A-Fa-f]{3,8}" services/one-app/src`).
- [ ] Vite source has no residual inline hex literals (`rg -n "#[0-9A-Fa-f]{3,8}" services/ahhachul.com/src --glob '!**/*.svg'`).
- [ ] Shared component promotion criteria (Rule 8) are satisfied before extraction.
- [ ] New shared component includes Storybook stories and `CI=1 pnpm ui:storybook:build` passes.
- [ ] Navigation components follow shell/adaptor split (shared presentation + app-local routing/orchestration).
- [ ] API callsites use `@ahhachul/http` contracts (`API_PATHS/API_SERVICE_PATHS/API_PAGE_SIZE/API_SORT`) instead of raw endpoint literals.
- [ ] `pnpm validate:api-contract` passes (no endpoint literals in network calls outside approved contract files).
- [ ] API response/pagination contracts use shared canonical types from `@ahhachul/domain` (no app-local re-declaration of canonical structures).
- [ ] No nested ternary remains in FE source (`no-nested-ternary` lint pass).
- [ ] `pnpm validate:react-style` passes (no derived-state mirror `useEffect` pattern violations).
- [ ] Naming/file-path updates do not leave typo variants (`Timemout`, `Comlaint`, etc.).
- [ ] Refactor guardrails are checked before validator sign-off (behavior-preserving, no overengineering, touched-area-only docs/types/comments).
- [ ] FE PR merge method follows `docs/refactor/CONVENTIONS.md` `Merge Policy`.
- [ ] FE rulebook changes are recorded in `FE_RULEBOOK_CHANGELOG.md`.
- [ ] FE meeting records are added as timestamped files and indexed in `FE_MEETING_LOG.md`.
- [ ] Dual-app mock mode consumes shared handlers from `@ahhachul/mock-api` (no fragmented app-local handler ownership).
- [ ] Mock runtime boundary check passes (`msw/browser` client-only, `msw/node` node-only).
- [ ] `pnpm --filter @ahhachul/mock-api test` passes in the same task.
- [ ] Static i18n messages are owned in `services/one-app/src/i18n/messages` and no dynamic translation API dependency is introduced.
- [ ] Locale route policy is preserved (`ko` non-prefix canonical, `en/th/cn` prefixed).
- [ ] Language selector exists on home footer and my page and preserves path/query on locale change.
- [ ] Server-only locale resolver import boundary is preserved (`@/i18n/server` only).
- [ ] Localized metadata includes locale-aware `openGraph.locale` and `alternates.languages` from shared helper.
- [ ] Website/navigation JSON-LD uses locale-aware `inLanguage` and localized navigation labels/URLs.

## Sources (Primary)

- React: Keeping Components Pure
  - [https://react.dev/learn/keeping-components-pure](https://react.dev/learn/keeping-components-pure)
- React: Thinking in React
  - [https://react.dev/learn/thinking-in-react](https://react.dev/learn/thinking-in-react)
- TanStack Query: Important Defaults
  - [https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- TanStack Query: Query Keys
  - [https://tanstack.com/query/latest/docs/framework/react/guides/query-keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- TanStack Query: Invalidations from Mutations
  - [https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations](https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations)
- MDN: `Date.prototype.toLocaleDateString()`
  - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
- MDN: `Intl.NumberFormat`
  - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- MDN: `Number.prototype.toLocaleString()`
  - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
- MDN: `URLSearchParams`
  - [https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- MDN: `String.prototype.normalize()`
  - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
- TypeScript Handbook: `unknown`
  - [https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown)
- OWASP: Input Validation Cheat Sheet
  - [https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- Storybook: Why Storybook
  - [https://storybook.js.org/docs/get-started/why-storybook](https://storybook.js.org/docs/get-started/why-storybook)
- Storybook: React + Vite Framework
  - [https://storybook.js.org/docs/get-started/frameworks/react-vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)
- date-fns (official repo)
  - [https://github.com/date-fns/date-fns](https://github.com/date-fns/date-fns)
- React: You Might Not Need an Effect
  - [https://react.dev/learn/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)
- React: useDeferredValue
  - [https://react.dev/reference/react/useDeferredValue](https://react.dev/reference/react/useDeferredValue)
- MSW: Browser API (`setupWorker`)
  - [https://mswjs.io/docs/api/setup-worker](https://mswjs.io/docs/api/setup-worker)
- MSW: Node API (`setupServer`)
  - [https://mswjs.io/docs/api/setup-server](https://mswjs.io/docs/api/setup-server)
- Next.js: `instrumentation.js`
  - [https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)
- FE system design source synthesis (2026-02-17)
  - [./FE_SYSTEM_DESIGN_POSTS_RESEARCH_2026-02-17.md](./FE_SYSTEM_DESIGN_POSTS_RESEARCH_2026-02-17.md)
