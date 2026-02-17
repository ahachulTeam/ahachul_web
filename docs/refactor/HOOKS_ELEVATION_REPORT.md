# Hooks Elevation Report

## Scope

- Target: React hooks scattered across Vite/Next codebases
- Focus: Form + Zod + Schema hooks and reusable orchestration primitives

## Inventory (2026-02-17)

### Vite (`services/ahhachul.com`)

- Domain form hooks with duplicated logic:
  - `useCommunityForm`
  - `useEditCommunityForm`
  - `useLostFoundForm`
  - `useEditLostFoundForm`
  - `useComplaintForm`
- Generic local hooks:
  - `useThrottle`, `useIntersectionObserver`, `useOnClickOutside`, `useTimeout`, etc.

### Next (`services/one-app`)

- Generic local hooks:
  - `useDebounce`, `useIntersectionObserver`, `useTimeout`, `useIsomorphicLayoutEffect`, `useAsyncCallback`
- `zod` usage currently concentrated in auth utility layers, not domain form hooks.

## Elevation Decisions

1. Elevate now (implemented in RF-850):
   - Shared Vite form orchestration primitives under `hooks/domain/form/*`
   - Schema-driven form setup with Zod + resolver baseline
2. Defer elevation:
   - Cross-app hook package for generic hooks
   - Reason: runtime and form stack mismatch between Vite and Next
3. Keep local:
   - Domain-filter stores and feature-specific business hooks

## Implemented Shared Primitives

- `useSchemaForm`
- `useLexicalValidatedSubmit`
- `useCreatePostImageHandlers`
- `useEditPostImageHandlers`
- Form schemas:
  - `communityFormSchema`
  - `communityEditFormSchema`
  - `lostFoundFormSchema`
  - `lostFoundEditFormSchema`
  - `complaintFormSchema`

## Migration Coverage

- Migrated:
  - `useCommunityForm`
  - `useEditCommunityForm`
  - `useLostFoundForm`
  - `useEditLostFoundForm`
  - `useComplaintForm`
- Remaining candidate (next tranche):
  - Cross-product generic hooks (`useIntersectionObserver`, `useIsomorphicLayoutEffect`, timeout/debounce family)

## Validation Gate

- Blocking gate: `pnpm validate:full`
