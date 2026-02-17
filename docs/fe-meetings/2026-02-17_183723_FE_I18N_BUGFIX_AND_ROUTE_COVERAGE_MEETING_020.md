# FE Meeting 020 - i18n Runtime Bugfix and Route Coverage Expansion (RF-1020, RF-1030)

- DateTime (KST): 2026-02-17 18:37:23
- Task ID: RF-1020, RF-1030
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer

## Agenda

1. `/en/login` hydration mismatch reports 원인 분류 및 대응
2. 언어 selector 변경 직후 번역이 즉시 반영되지 않는 이슈 해결
3. 정적 i18n 커버리지를 어떤 라우트부터 확장할지 우선순위 확정
4. 라우트별 metadata/CTA/알림 문구 품질 개선 범위 확정

## Discussion Summary

- FE Lead는 hydration 경고 로그의 `cz-shortcut-listen` 속성이 브라우저 확장 주입 패턴과 일치한다는 점을 확인하고, 제품 동작 변경 없이 DX 노이즈를 완화하는 경계 처리를 제안했다.
- FE Specialist A는 locale selector의 `router.push + router.refresh` 조합이 rewrite 경로에서 적용 타이밍을 불안정하게 만들 수 있다고 판단해, cookie 반영 후 단일 내비게이션으로 전환하자고 제안했다.
- FE Specialist B는 사용자 체감 개선을 위해 로그인/메시지/알림/404 경로를 정적 i18n 2차 커버리지 우선 대상으로 지정하고 visible copy + metadata를 동시에 이관하자고 제안했다.
- QA는 동작 보존 규칙에 따라 데이터 계약/API 로직은 변경하지 않고 문구/링크/metadata만 i18n화해야 한다고 강조했고, `type/lint/test/build` 전부 통과를 블로킹 조건으로 지정했다.
- Validator는 과추상화 없이 기존 구조에서 최소 변경으로 해결하는 접근을 승인했다.

## Decisions

1. hydration 로그 노이즈 완화를 위해 root layout body 경계에 `suppressHydrationWarning`을 적용한다.
2. locale selector는 `window.location.assign` 기반 단일 전환으로 변경해 수동 새로고침 없이 한 번에 locale 적용을 보장한다.
3. RF-1030 범위는 로그인/메시지/알림/404 경로의 static copy + metadata + CTA/alert까지 포함한다.
4. Turbopack + MSW 런타임 안정성 이슈는 별도 트랙으로 유지하며 현재는 webpack dev 경로를 기본으로 운영한다.

## Action Items

- FE Lead: selector 동작 경로 및 hydration 경계 처리.
- FE Specialist A: i18n message 스키마 확장 (`login/messagesPage/notificationsPage/notFound/seo.*`).
- FE Specialist B: route별 page/component 적용 및 localized link/metadata 반영.
- QA/Validator: `pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm --filter @ahhachul/one-app test -- --runInBand`, `pnpm nextjs:build` 게이트 실행.

## Validator Verdict

- Status: `ValidatorPass`
- Reason: 사용자 리포트 재현 시나리오의 핵심 이슈(언어 전환 즉시 반영, hydration 노이즈 완화)가 코드 레벨에서 해결되었고, Next 대상 타입/린트/테스트/빌드 게이트를 모두 통과함.
