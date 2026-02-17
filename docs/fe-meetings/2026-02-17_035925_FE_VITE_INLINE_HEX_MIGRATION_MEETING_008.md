# FE Vite Inline Hex Migration Meeting 008

- DateTime (KST): 2026-02-17 03:59:25
- Task ID: RF-891
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator
- Topic: Vite legacy Emotion/styled inline hex phased removal with shared semantic token policy

## Agenda

1. Audit Vite inline hex residuals in Emotion/styled layer and separate exception scope.
2. Decide shared token expansion strategy for legacy Vite palette values.
3. Apply phased migration and execute blocking validator gate.

## Decisions

1. Vite legacy inline hex in Emotion/styled/UI css objects is replaced with shared tokens from `@ahhachul/design-system`.
2. Added `colors.legacy.*` token groups and matching CSS variables in `tokens.css` to preserve existing Vite visual values while removing inline literals.
3. Exception scope is temporarily fixed to two files only:
   - `services/ahhachul.com/src/assets/icons/jsx/icons.tsx`
   - `services/ahhachul.com/src/constants/subway.tsx`
4. Validator scan command for Vite is mandatory in every follow-up FE styling task.

## Execution Assignments

- FE Lead: finalize token taxonomy and approve exception boundaries.
- FE Specialist A: expand `@ahhachul/design-system` token groups and exports.
- FE Specialist B: migrate Vite Emotion/styled callsites to shared token vars.
- QA Engineer: run `pnpm validate:full` and residual-hex scans.
- Perfectionist Validator: block task until all gates pass.

## Validation Result

- Gate commands:
  - `pnpm validate:full`
  - `rg -n "#[0-9A-Fa-f]{3,8}" services/ahhachul.com/src --glob '!**/*.svg' | grep -v 'assets/icons/jsx/icons.tsx' | grep -v 'constants/subway.tsx'`
- Result: PASS

## Follow-up

- Execute next phase to remove exception scope by tokenizing Vite icon JSX source and centralizing subway line color mapping in design-system contracts.
