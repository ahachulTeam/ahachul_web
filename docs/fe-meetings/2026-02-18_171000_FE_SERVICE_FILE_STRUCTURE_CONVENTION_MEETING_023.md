# FE Meeting 023 - Services File Naming and Folder Structure Convention (RF-1060)

- DateTime (KST): 2026-02-18 17:10:00
- Task ID: RF-1060
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer

## Agenda

1. Review file naming inconsistency in `services/one-app` and `services/ahhachul.com`.
2. Align each service to its existing runtime/framework conventions.
3. Define enforceable scanner/gate strategy for filename and folder contracts.
4. Decide folder-structure improvement scope for this round (safe rename phase vs. deep domain relocation).

## Parallel Work Split

- FE Specialist A (Next.js): `services/one-app`
  - root layer pluralization (`asset/component/constant/...` -> `assets/components/constants/...`)
  - route-private folder normalization (`_component` -> `_components`)
  - component filename cleanup (`subway-logo-icon-map.tsx` -> `SubwayLogoIconMap.tsx`)
- FE Specialist B (Vite): `services/ahhachul.com`
  - legacy module filename typo/miscase cleanup (`newBtn`, `imageZoomViewer`, `NaItem`)
  - utility support path normalization (`src/libs` -> `src/lib`)

## Discussion Summary

- FE Lead requested explicit separation of immutable framework file conventions (Next reserved filenames) and local team conventions (component/module naming).
- FE Specialist A reported that one-app structure is App Router centric and safest improvement is naming-layer normalization without moving route/domain ownership.
- FE Specialist B reported Vite side has stable domain layering and low-risk wins are module filename contracts and `lib` path normalization.
- QA requested scanner-first governance with non-blocking report baseline before any blocking promotion.
- Perfectionist Validator approved only low-false-positive checks for later blocking (`legacy folder/import/file typo` class).

## Decisions

1. Rule 15 is added to FE Rulebook as dual-app file/folder convention governance.
2. New scanner contract is introduced:
   - `scripts/scan-services-file-conventions.mjs`
   - artifacts: `artifacts/services-file-conventions/report.{json,md}`
3. Root scripts are added:
   - `scan:services-file-conventions`
   - `validate:services-file-conventions:report`
   - `validate:services-file-conventions:block`
4. Current round executes safe rename/repath changes only; deep domain folder relocation is deferred to dedicated follow-up task.

## Action Items

- FE Lead: publish Rule 15 and convention books (filename + folder structure).
- FE Specialist A/B: maintain scanner rule list with concrete violation examples when new naming debt appears.
- QA/Validator: monitor two release cycles of report artifacts before deciding block-mode promotion.

## Validator Verdict

- Status: `ValidatorPass`
- Reason: convention cleanup was behavior-preserving (rename/path normalization), with scanner/report governance and rollback-safe phased policy.
