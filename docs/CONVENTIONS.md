# Refactor Conventions Hub

This document is the index for convention scopes.

## Convention Scopes

- Common: `docs/CONVENTIONS_COMMON.md`
- FE (ahachul_web): `docs/CONVENTIONS_FE.md`
- BE/DB/Infra stack (`ahhachul_backend`, `ahachul_data`, `ahachul_secret`): `docs/CONVENTIONS_BE.md`

## Precedence

1. Repository-specific rules (`CONVENTIONS_FE` or `CONVENTIONS_BE`)
2. Common rules (`CONVENTIONS_COMMON`)
3. Supplemental rulebooks (`FE_RULEBOOK`, validator checklist, runbooks)

## Notes

- If a task touches multiple repos, apply commit message rules per target repo.
- Branch naming remains unified as `codex/<scope>`.
