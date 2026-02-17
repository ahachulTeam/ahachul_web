# Common Conventions

## Workflow

- Task lifecycle: `Todo -> InProgress -> QAReady -> ValidatorPass -> Committed -> Done`
- Failure path: `* -> Rework -> QAReady`
- One task per commit.

## Branch

- Branch naming: `codex/<scope>`

## Merge Policy

- Large refactor or operational hardening PRs: prefer `Merge Commit`.
- Small feature or fix PRs with noisy intermediate commits: use `Squash Merge`.
- `Rebase Merge` is opt-in only when linear history is explicitly required.
- If commit hashes are referenced in governance docs (`SPRINT_BOARD`, `WORKLOG`, `DECISIONS`), avoid `Rebase Merge`.

## Validation Authority

- `Perfectionist Validator` is a blocking gate.
- No task moves to `Done` until validator pass is recorded in `WORKLOG.md`.
