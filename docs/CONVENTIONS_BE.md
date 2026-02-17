# BE/DB/Infra Conventions

Scope: `ahhachul_backend`, `ahachul_data`, `ahachul_secret`

## Commit Message

- Source of truth: backend README collaboration rule.
- Format: `gitmoji <commit message> (#issue number)`
- Examples:
  - `:sparkles: 로그인 API 개선 (#123)`
  - `:bug: OAuth callback 예외 처리 수정 (#124)`
  - `:memo: 시크릿 키 운영 문서 보강 (#125)`

## Branch Strategy

- Backend documented branch model:
  - `main`
  - `develop`
  - `feature/<#issue number>`
  - `hotfix`

## Architecture/Coding Standards

- Hexagonal + multi-module baseline (`core`, `application`, `scheduler`, `consumer`) must be preserved.
- API response contract uses `CommonResponse` and `ResponseCode`.
- Request DTO to use-case mapping follows `toCommand(...)`.
- DB schema changes must use Flyway migrations under `core/src/main/resources/db/migration`.
- Secret changes must be managed via `ahachul_secret` files, never hardcoded in code.

## Operational Safety

- Do not use company default AWS account for Ahhachul work.
- Always verify identity before infra operations: `aws sts get-caller-identity`.
- See detailed guardrails:
  - `docs/BACKEND_DB_INFRA_RULEBOOK.md`
  - `docs/BACKEND_DB_INFRA_EXECUTION_CHECKLIST.md`
