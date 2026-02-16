# FE Rulebook Changelog

Track every modification to `FE_RULEBOOK.md` in chronological order.

## Entry Template

- DateTime (KST):
- Task ID:
- Author/Owner:
- Change Type: `Added` | `Changed` | `Removed`
- Section(s):
- Summary:
- Follow-up:

## Entries

- DateTime (KST): 2026-02-17 01:54:04
- Task ID: RF-800
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Scope, FE Pod Structure, Rule 1, Rule 2, Rule 3, Sources
- Summary: Initial FE rulebook published with utility/react-query/date convention baseline.
- Follow-up: Enforce phase-1 utility conventions in code.

- DateTime (KST): 2026-02-17 02:19:53
- Task ID: RF-820
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 2 (Query keys/defaults/invalidation)
- Summary: React Query convention details expanded with key factory, stale/gc-time, and invalidation policy.
- Follow-up: Migrate dual-app query modules.

- DateTime (KST): 2026-02-17 02:28:28
- Task ID: RF-830
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 3 (Date/Time)
- Summary: `formatDisplayDate` single-entrypoint rule and lint enforcement clarified.
- Follow-up: Remove legacy date-format callsites.

- DateTime (KST): 2026-02-17 02:41:00
- Task ID: RF-840
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Validation Baseline, Number/Price Formatting Baseline, Rule 4
- Summary: Added validation and numeric display conventions (`validateNickname`, `isBlankText`, `formatDisplayNumber`, `formatDisplayPrice`).
- Follow-up: Expand migration coverage across remaining utility callsites.

- DateTime (KST): 2026-02-17 03:15:00
- Task ID: RF-850
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Scope, Rulebook Operations
- Summary: Established mandatory rulebook-change logging process and timestamped FE meeting-log file management.
- Follow-up: Keep this changelog updated in every future FE rulebook edit commit.

- DateTime (KST): 2026-02-17 03:13:02
- Task ID: RF-860
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 1 (Subway/Common Utility Baseline), Implementation Checklist
- Summary: Added shared-entrypoint mandate for subway/common utilities (`formatSubwayFilterOption`, `formatSubwayLineInfo`, `getFirstParentLineId`, `formatLost112Content`, `formatSubwayArrivalTime`, `parseFileExtOfName`) and checklist enforcement item.
- Follow-up: Complete remaining utility migration and enforce through validator gate in every new FE task.

- DateTime (KST): 2026-02-17 03:19:49
- Task ID: RF-870
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 6 (Shared Utility Test Conventions), Implementation Checklist
- Summary: Added mandatory unit-test conventions for shared utility contracts and required `@ahhachul/utils:test` inclusion in validator test gate.
- Follow-up: Apply the same test-first rule to all future shared utility changes.

- DateTime (KST): 2026-02-17 03:34:41
- Task ID: RF-880
- Author/Owner: FE Lead
- Change Type: Added
- Section(s): Scope priority, Rule 7 (Design System Token Conventions), Implementation Checklist
- Summary: Added design-system governance requiring Vite palette authority in `@ahhachul/design-system`, shared token consumption by Vite/Next, and dual-app token subscription rule.
- Follow-up: Replace residual app-local ad-hoc hex literals with semantic/shared tokens in follow-up refactor tasks.

- DateTime (KST): 2026-02-17 03:45:50
- Task ID: RF-890
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 7 (Design System Token Conventions), Implementation Checklist
- Summary: Added strict no-inline-hex policy for one-app (`className` arbitrary hex and JSX/SVG hex literals) and documented shared-token-only enforcement with scan checklist.
- Follow-up: Expand identical no-inline-hex enforcement to phased Vite legacy migration tasks (RF-891+).

- DateTime (KST): 2026-02-17 03:59:25
- Task ID: RF-891
- Author/Owner: FE Lead
- Change Type: Changed
- Section(s): Rule 7 (Design System Token Conventions), Implementation Checklist
- Summary: Expanded no-inline-hex policy to Vite Emotion/styled layer with explicit exception scope (`assets/icons/jsx/icons.tsx`, `constants/subway.tsx`) and added required residual-hex scan command for validator gate.
- Follow-up: Remove exception scopes in dedicated icon/subway tokenization tasks and keep scan check mandatory for all future Vite style refactors.
