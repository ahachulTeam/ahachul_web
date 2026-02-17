# FE Form/Schema Hooks Meeting 003

- DateTime (KST): 2026-02-17 03:15:00
- Facilitator: FE Lead
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator
- Objective: Analyze scattered React hooks, decide elevation scope, and start Form + Zod + Schema hook refactor.

## Agenda

1. Hook inventory across Vite/Next
2. Elevation decision (shared package vs app-domain shared)
3. Form + Zod + Schema standardization design
4. Immediate implementation boundary and validator gate

## Inventory Summary

- Vite (`services/ahhachul.com`)
  - Form hooks with heavy duplication: `useCommunityForm`, `useEditCommunityForm`, `useLostFoundForm`, `useEditLostFoundForm`, `useComplaintForm`
  - Shared UI hooks already present: scroll/throttle/intersection/todo/etc.
- Next (`services/one-app`)
  - Generic hooks: debounce/intersection/timeout/isomorphicLayoutEffect/async callback
  - `zod` currently used in auth callback libs, not yet in domain form flows

## Elevation Decision

1. Immediate elevation target (Now):
   - Form hook duplication inside Vite domain hooks
   - Centralize as `hooks/domain/form/*` with schema + submit/image handler primitives
2. Deferred elevation target (Later):
   - Cross-product shared hook package for generic hooks (`useIntersectionObserver`, `useIsomorphicLayoutEffect`, timeout/debounce)
   - Deferred because runtime contracts and import boundaries differ between Vite/Next today
3. Keep local (Not elevated now):
   - Domain filter store hooks and feature-specific business hooks

## Architecture Decisions

1. Add schema layer with Zod for post form baseline (`title`, `content`, `line`, `images`, domain enums/types).
2. Introduce shared form primitives:
   - `useSchemaForm`
   - `useLexicalValidatedSubmit`
   - `useCreatePostImageHandlers`
   - `useEditPostImageHandlers`
3. Migrate 5 Vite domain form hooks to shared primitives with identical runtime behavior.
4. Keep lexical-editor required validation as explicit gate in submit/error flow.

## Action Items

- RF-850 (InProgress):
  - FE rulebook changelog process + meeting log folderization
  - Form + Zod + Schema shared hook foundation + domain hook migration
- QA Gate: `pnpm validate:full`

## Notes

- Decision bias: reduce duplication first, then elevate cross-app when Next form stack converges.
- Validator requested no task closure without full gate evidence.
