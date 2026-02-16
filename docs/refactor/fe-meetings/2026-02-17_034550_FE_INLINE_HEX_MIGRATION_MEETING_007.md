# FE Inline Hex Migration Meeting 007

- DateTime (KST): 2026-02-17 03:45:50
- Task ID: RF-890
- Participants: FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Technical Writer, Perfectionist Validator
- Topic: one-app residual inline hex eradication and semantic token enforcement

## Agenda

1. Audit residual inline hex patterns in one-app (`bg-[#...]`, inline SVG hex, direct color props).
2. Decide token-model extension strategy in `@ahhachul/design-system`.
3. Apply migration and lock enforcement with lint + validator gate.

## Decisions

1. Residual one-app hex literals are fully migrated to shared token references.
2. `@ahhachul/design-system` token scope is expanded with semantic groups:
   - `badge.service`
   - `social.kakao`, `social.google.*`
   - `brand.logo`
   - `icon.dark`, `icon.warning`
   - `skeleton.base`, `skeleton.highlight`
3. Tailwind arbitrary hex class usage is banned for one-app and lint-enforced.
4. RF-891 follow-up will phase similar migration for Vite legacy inline hex files.

## Execution Assignments

- FE Lead: approve semantic token additions and lint policy.
- FE Specialist A: implement design-system token/tailwind/tokens.css expansion.
- FE Specialist B: migrate one-app callsites (badge, nav/header/search, icons, skeleton, auth constants).
- QA Engineer: run `pnpm validate:full` and residual hex scan.
- Perfectionist Validator: block task until full gate pass.

## Validation Result

- Gate commands:
  - `pnpm validate:full`
  - `rg -n "#[0-9A-Fa-f]{3,8}" services/one-app/src --glob '!**/*.svg'`
- Result: PASS

## Follow-up

- Execute RF-891 to apply no-inline-hex migration and guardrails to Vite legacy UI modules.
