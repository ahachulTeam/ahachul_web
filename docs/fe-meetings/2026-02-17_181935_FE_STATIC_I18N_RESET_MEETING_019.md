# FE Meeting 019 - Static i18n Reset and Locale UX Rollout (RF-1010)

- DateTime (KST): 2026-02-17 18:19:35
- Task ID: RF-1010
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer

## Agenda

1. 동적 번역(DeepL/서버 자동 번역) 범위를 제거하고 정적 i18n만 유지할지 확정
2. Next locale URL 정책(`ko/en/th/cn`)과 middleware 처리 경계를 확정
3. 언어 선택 UX를 홈 푸터/마이페이지에 동일 제공하는 기준 확정
4. 서버 전용 locale resolver와 클라이언트 번들 경계 규칙 확정

## Discussion Summary

- FE Lead는 현재 라운드 목표를 안정성 우선으로 두고, 동적 번역 의존성을 제거해 메시지 소스를 정적 JSON으로 고정하자고 제안했다.
- FE Specialist A는 locale 처리 중복을 줄이기 위해 `config/pathname/messages/server` 계층으로 i18n 모듈을 분리하고, middleware에서 locale cookie/header를 단일 관리해야 한다고 제안했다.
- FE Specialist B는 사용자가 어디에서 진입하든 언어 변경 가능해야 한다는 UX 기준을 위해 홈 푸터와 마이페이지에 동일한 selector를 배치하고, 현재 path/query를 유지한 채 locale만 전환하도록 구현안을 제시했다.
- QA는 Next 15 기준 `headers()/cookies()` 비동기 사용, 클라이언트 번들에 server-only 모듈 유입 금지, 라우팅/메타데이터/내부 링크의 locale 정합을 핵심 회귀 포인트로 지정했다.
- Validator는 리팩토링 핵심 규칙(동작 보존/과추상화 금지/현대 React 정합) 준수와 `pnpm validate:full` 통과를 블로킹 게이트로 지정했다.

## Decisions

1. RF-1010 범위는 정적 i18n만 포함하며 동적 번역/DeepL은 구현하지 않는다.
2. 지원 locale은 `ko/en/th/cn`이며 기본 locale `ko`는 비-prefix canonical 경로를 유지한다.
3. 비기본 locale은 URL prefix(`/en`, `/th`, `/cn`)를 사용하고 middleware가 내부 경로로 normalize한다.
4. 언어 selector는 홈 푸터와 마이페이지에 공통 제공하며 현재 path/query를 보존해 이동한다.
5. `getServerLocale`는 `@/i18n/server`에서만 사용하고 `@/i18n` 배럴에는 server-only export를 두지 않는다.

## Action Items

- FE Lead: i18n 모듈 구조/경계 확정 및 middleware locale 정책 반영.
- FE Specialist A: locale 메시지 리소스(`ko/en/th/cn`) 및 locale path helper 구현.
- FE Specialist B: 홈/마이페이지 selector 배치, nav/header/home 링크 locale 적용, metadata locale 반영.
- QA/Validator: `pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm --filter @ahhachul/one-app test -- --runInBand`, `pnpm validate:full` 실행.

## Validator Verdict

- Status: `ValidatorPass`
- Reason: static i18n 스코프 재정의가 코드/문서에 반영되었고, locale 경계 분리(서버 전용 import), 테스트/빌드 포함 full gate를 통과함.
