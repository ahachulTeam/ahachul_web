# FE Services Folder Structure Convention Book (RF-1060)

- DateTime (KST): 2026-02-18
- Scope:
  - `services/one-app/src`
  - `services/ahhachul.com/src`
- Goal: keep framework-aligned folder structure while minimizing coupling and preserving safe migration boundaries.

## 1) Research Summary (latest official guidance)

- Next.js App Router recommends file-system routing with route groups/private folders and colocated route logic.
- Next.js file-convention contract is strict for reserved route files (`page`, `layout`, `route`, etc.).
- Vite is intentionally unopinionated around domain foldering; team-level structure convention should be explicit and consistent.
- Redux style guide recommends organizing by feature/domain rather than only by technical type where possible.
- Nx guidance emphasizes module-boundary enforcement to prevent cross-layer coupling in monorepos.

## 2) Current Structure Snapshot (after RF-1060 execution)

### one-app (Next.js)

```text
src/
  app/
    (auth)/
    (main-service)/
    (user)/
    _components/
  assets/
  components/
  constants/
  contexts/
  hooks/
  i18n/
  lib/
  mocks/
  seo/
  stores/
  types/
  utils/
  __tests__/
```

### ahhachul.com (Vite)

```text
src/
  apis/
  assets/
  components/
    common/
    domain/
    layout/
  constants/
  contexts/
  hooks/
    domain/
  lib/
  mocks/
  pages/
  services/
  stores/
  styles/
  types/
  utils/
  __tests__/
```

## 3) Folder-Structure Improvements Executed

### one-app executed

- Shared root layer normalized to plural folders for consistency and discoverability.
- Route-private login component folder unified to `_components`.
- All aliases/imports were migrated to match the new structure.

### ahhachul.com executed

- `src/libs` renamed to `src/lib` for consistency with existing repository utility-layer naming.
- Imports migrated to `@/lib` usage.

## 4) Per-Service Target Structure Policy

### one-app policy

- Keep route/domain logic colocated under `app/**` with route groups (`(auth)`, `(main-service)`, `(user)`).
- Keep cross-route shared UI/utilities in root shared layer (`components`, `lib`, `hooks`, `stores`, `utils`, `constants`).
- Keep route-private modules in `_components` and `_lib` to prevent accidental global coupling.

### ahhachul.com policy

- Keep route entry in `pages/**`, domain UI in `components/domain/**`, reusable UI in `components/common/**`.
- Keep domain hooks under `hooks/domain/**` and side-effect/data contracts under `apis/**` + `services/**`.
- Keep low-level shared utilities under `lib/**` and `utils/**` with explicit responsibility split.

## 5) Phased Structure Migration Plan

1. Phase A (completed in RF-1060): naming/folder normalization without runtime behavior change.
2. Phase B: incremental domain-slice hardening (service-by-service) with feature-level PR splits.
3. Phase C: optional deeper folder migration only when route/domain ownership is unambiguous and regression-safe.

## 6) Governance and Validation

- Rulebook authority: `docs/FE_RULEBOOK.md` Rule 15.
- Scanner: `scripts/scan-services-file-conventions.mjs`.
- Report gate:
  - `pnpm validate:services-file-conventions:report`
- Promotion gate (post-baseline):
  - `pnpm validate:services-file-conventions:block`

## Sources (Web Research, checked 2026-02-18)

- Next.js project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js file conventions: https://nextjs.org/docs/app/api-reference/file-conventions
- Vite shared options (`root`, `publicDir`): https://vite.dev/config/shared-options
- Nx module boundary enforcement: https://nx.dev/features/enforce-module-boundaries
- Redux style guide (feature-oriented structure): https://redux.js.org/style-guide/
