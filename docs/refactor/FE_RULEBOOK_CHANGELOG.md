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
