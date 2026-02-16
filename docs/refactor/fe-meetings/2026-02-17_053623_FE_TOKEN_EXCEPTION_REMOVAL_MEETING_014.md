# FE Token Exception Removal Council 014

- DateTime (KST): 2026-02-17 05:36:23
- Task ID: RF-940
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator

## Agenda

1. Remove RF-891 temporary exception scope (`icons.tsx`, `subway.tsx`) and complete tokenization.
2. Decide canonical token ownership for icon-specific and subway-fallback colors.
3. Confirm residual-hex zero policy without exception filters.

## Discussion Summary

- FE Lead: temporary exception debt must be fully retired; no carve-out files remain.
- FE Specialist A: extend `@ahhachul/design-system` with icon semantic tokens and subway fallback token.
- FE Specialist B: migrate icon SVG literals and subway line color switch literals to shared token references.
- QA Engineer: validate with residual-hex scan over full Vite `src` scope (non-SVG) without `grep -v` exclusions.
- Perfectionist Validator: reject if any inline hex remains in Vite source code.

## Decision

- Added shared token fields:
  - `colors.icon.{disabled,neutral,muted,success,danger,light}`
  - `colors.subway.fallback`
- Migrated exception files to shared tokens:
  - `services/ahhachul.com/src/assets/icons/jsx/icons.tsx`
  - `services/ahhachul.com/src/constants/subway.tsx`
- Exception scope removed from FE rulebook; policy now zero-exception.

## Validator Gate

- `pnpm validate:full` => PASS
- `rg -n "#[0-9A-Fa-f]{3,8}" services/ahhachul.com/src --glob '!**/*.svg'` => no match

## Action Items

1. FE Specialist A: keep new icon/subway token fields stable and avoid re-introducing literal fallback colors.
2. FE Specialist B: enforce shared token usage in future icon additions by default.
3. Technical Writer: update rulebook/checklist/sprint/worklog/team-memory artifacts for RF-940 completion.
