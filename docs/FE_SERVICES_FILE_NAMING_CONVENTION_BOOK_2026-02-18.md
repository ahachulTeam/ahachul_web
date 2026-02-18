# FE Services File Naming Convention Book (RF-1060)

- DateTime (KST): 2026-02-18
- Scope:
  - `services/one-app/src`
  - `services/ahhachul.com/src`
- Goal: normalize filename contracts to current framework/runtime conventions and keep them scanner-verifiable.

## 1) Service-Specific Naming Conventions

### one-app (Next.js)

- Next reserved app-router file names are fixed and lowercase:
  - `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, `not-found.tsx`, `default.tsx`
- Shared component files (`src/components/**`) and route-private component files (`src/app/**/_components/**`) use PascalCase.
- Optional variant suffix is allowed for component wrappers/skeletons:
  - `PascalCase.suspense.tsx`
  - `PascalCase.skeleton.styled.tsx`
- Hook files use exported-hook naming (`useXxx.ts`).
- Shared root directories use lowercase plural nouns:
  - `assets`, `components`, `constants`, `contexts`, `hooks`, `stores`, `utils`, `__tests__`
- Legacy singular aliases are prohibited in imports:
  - `@/asset`, `@/component`, `@/constant`, `@/context`, `@/hook`, `@/store`, `@/util`

### ahhachul.com (Vite)

- Component module files use PascalCase base (optional variant suffix) + suffix:
  - `*.component.tsx`
  - `*.styled.tsx`
  - `*.hook.ts`
  - `*.type.ts`
  - `*.constant.ts(x)`
- `src/lib` is canonical utility-support folder (`src/libs` prohibited).
- Legacy typo/miscase file variants are prohibited:
  - `newBtn.component.tsx`
  - `imageZoomViewer.component.tsx`
  - `imageZoomViewer.styled.tsx`
  - `NaItem.type.ts`

## 2) Baseline Findings and Applied Refactors

### one-app refactors (executed)

- Root folder normalization:
  - `asset` -> `assets`
  - `component` -> `components`
  - `constant` -> `constants`
  - `context` -> `contexts`
  - `hook` -> `hooks`
  - `store` -> `stores`
  - `util` -> `utils`
  - `__test__` -> `__tests__`
- Route-private folder normalization:
  - `src/app/(auth)/login/_component` -> `src/app/(auth)/login/_components`
- Test filename normalization:
  - `1__StartPage.spec.tsx` -> `StartPage.spec.tsx`
- Component filename normalization:
  - `subway-logo-icon-map.tsx` -> `SubwayLogoIconMap.tsx`
- Import-path migration completed for all renamed folders.

### ahhachul.com refactors (executed)

- Component module filename normalization:
  - `newBtn.component.tsx` -> `NewBtn.component.tsx`
  - `imageZoomViewer.component.tsx` -> `ImageZoomViewer.component.tsx`
  - `imageZoomViewer.styled.tsx` -> `ImageZoomViewer.styled.tsx`
  - `NaItem.type.ts` -> `NavItem.type.ts`
- Utility support folder normalization:
  - `src/libs` -> `src/lib`
- Import-path migration completed for all renamed modules/folders.

## 3) Enforcement and Commands

- Scanner: `scripts/scan-services-file-conventions.mjs`
- Commands:
  - `pnpm scan:services-file-conventions`
  - `pnpm validate:services-file-conventions:report`
  - `pnpm validate:services-file-conventions:block`
- Artifacts:
  - `artifacts/services-file-conventions/report.json`
  - `artifacts/services-file-conventions/report.md`

## 4) Current Result (RF-1060 Round)

- `scan-services-file-conventions --mode=report`: `0` violations.
- Gate mode is report-only in this round. Block mode is reserved for post-baseline promotion.

## 5) Naming Governance Notes

- This round intentionally avoids behavior-changing refactors.
- Deep domain-level relocations are deferred to dedicated migration tasks, while naming contracts are now baseline-enforced by scanner.

## Sources (Web Research, checked 2026-02-18)

- Next.js project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js file conventions: https://nextjs.org/docs/app/api-reference/file-conventions
