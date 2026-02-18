# FE Services Code Quality Strategy (RF-1050)

- DateTime (KST): 2026-02-18
- Scope: `services/ahhachul.com/src`, `services/one-app/src`
- Owners: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator

## Objective

Define and operationalize a staged code-quality governance model for the two FE service apps without large behavior-changing refactors in the first round.

## Team Discussion Outcome

- FE Lead: prioritize quality dimensions in fixed order `Readability -> Predictability -> Cohesion/Coupling`.
- FE Specialist A: convert rules to enforceable scan/gate rules first.
- FE Specialist B: execute incremental hotspot migration by app area, not broad rewrites.
- QA Engineer: accumulate report baseline first, then promote low-risk rules to blocking.
- Perfectionist Validator: permit blocking only for low-false-positive, low-remediation-cost rules.

## Baseline Snapshot

- Timing magic-number signals (`setTimeout`/`debounceTime`): `5`
- Hidden UI side-effect signals in service layer (`window.alert`/`window.location`): `13`
- Trivial inline handler wrapper signals (`onClick={() => fn()}`): `30`
- Complex inline boolean condition signals: `26`
- Complex ternary signals: `11`

## Rule Set (12)

1. `timing-magic-number-constant`
2. `no-hidden-ui-side-effect-in-service`
3. `no-trivial-inline-handler-wrapper`
4. `split-conditional-render-path`
5. `complex-condition-must-be-named`
6. `ternary-complexity-cap`
7. `hook-return-contract-standardization`
8. `validation-result-union-standard`
9. `interaction-component-extraction`
10. `form-cohesion-policy`
11. `state-scope-minimization`
12. `composition-over-props-drilling`

## Phase Plan

### Phase A — Governance Lock

- Publish Rule 14 in `FE_RULEBOOK.md`.
- Record changelog entry and FE meeting log.
- Publish strategy artifact and validator checklist update.

### Phase B — Visibility (Current Round)

- Add `scripts/scan-services-code-quality.mjs` in report mode.
- Add root scripts:
  - `scan:services-quality`
  - `validate:services-quality:report`
  - `validate:services-quality:block`
- Output non-blocking artifacts:
  - `artifacts/services-quality/report.json`
  - `artifacts/services-quality/report.md`

### Phase C — Partial Block

- Promote rules `1`, `2`, `3`, `6` to blocking mode once baseline trend is stable.
- Keep remaining rules in report/manual mode.

### Phase D — Expanded Block

- Incrementally promote `4`, `5`, `7`, `8`, `9`, `10`, `11`, `12`.
- Split migration PRs by service-area hotspot and regression risk.

## Scanner Report Contract

`report.json` schema:

- violation item:
  - `ruleId`
  - `severity`
  - `filePath`
  - `line`
  - `message`
  - `snippet` (optional line preview)
- summary:
  - `summary.total`
  - `summary.byRule`
  - `summary.byService`

## Acceptance for RF-1050

- Governance artifacts complete (rulebook/changelog/meeting/strategy/checklist).
- Scanner + scripts are committed and runnable.
- Report mode is non-blocking.
- Existing `validate:full` flow remains unchanged.
