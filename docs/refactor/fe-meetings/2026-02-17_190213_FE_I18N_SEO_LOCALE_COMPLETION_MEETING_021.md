# FE Meeting 021 - Residual i18n Copy Migration and SEO Locale Completion (RF-1040)

- DateTime (KST): 2026-02-17 19:02:13
- Task ID: RF-1040
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer

## Agenda

1. 잔여 하드코딩 카피 범위 확정(닉네임/프로필/배지/상세 테이블/브레드크럼)
2. locale-aware SEO를 메타데이터/JSON-LD까지 일관 적용할 방법 확정
3. 기존 i18n 정책(정적 메시지, 동적 번역 미사용) 하에서의 안전한 마이그레이션 순서 정의
4. validator 게이트 통과 조건 재확인

## Discussion Summary

- FE Lead는 `RF-1030` 이후에도 남아 있던 UI 하드코딩 카피를 사용자 체감 우선순위(로그인 닉네임 설정, 프로필, 상세 배지/테이블, 브레드크럼)로 묶어 1차 제거 대상으로 정의했다.
- FE Specialist A는 SEO locale 완성도를 위해 `openGraph.locale`, `alternates.languages(hreflang)`, `WebSite JSON-LD inLanguage`를 같은 locale map에서 생성해야 drift를 막을 수 있다고 제안했다.
- FE Specialist B는 상수 `metadata`를 사용하는 페이지를 `generateMetadata`로 전환하고 locale-aware redirect(`i/flow/login`)까지 함께 정리해 URL/카피/메타의 일관성을 맞추자고 제안했다.
- QA는 동작 변경 금지 원칙을 재확인하고, API 데이터 계약은 건드리지 않고 copy/metadata/routing-localization 영역만 수정하는 것을 승인했다.
- Validator는 과도한 추상화 없이 `@ahhachul/seo` 최소 확장 + `one-app` helper 계층으로 제한한 구현 전략을 채택했다.

## Decisions

1. locale SEO 필드는 shared helper 단일 경로로 관리한다 (`openGraph.locale`, `hreflang`, `schema inLanguage`).
2. 잔여 하드코딩 카피 이관은 메시지 리소스(`ko/en/th/cn`) 동시 업데이트를 기본 규칙으로 한다.
3. 로그인 플로우 redirect 페이지도 locale-aware canonical redirect를 적용한다.
4. RF-1040 완료 조건은 `pnpm validate:full` 블로킹 게이트 통과로 고정한다.

## Action Items

- FE Lead: locale SEO helper 설계/적용 및 rulebook 갱신.
- FE Specialist A: `@ahhachul/seo` alternates languages 확장 및 metadata callsite 이관.
- FE Specialist B: 잔여 하드코딩 카피 컴포넌트 이관 + 다국어 메시지 동기화.
- QA/Validator: `pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm --filter @ahhachul/one-app test -- --runInBand`, `pnpm nextjs:build`, `pnpm validate:full` 게이트 실행.

## Validator Verdict

- Status: `ValidatorPass`
- Reason: 잔여 하드코딩 카피가 지정 범위에서 locale 메시지로 치환되었고, locale-aware metadata/JSON-LD/hreflang 일관성이 코드 레벨에서 확보되었으며, 전체 validator 게이트(`validate:full`)를 통과함.
