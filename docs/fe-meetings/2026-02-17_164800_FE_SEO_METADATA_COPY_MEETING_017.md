# FE Meeting 017 - SEO Metadata Copy Upgrade (RF-990)

- DateTime (KST): 2026-02-17 16:48:00
- Task ID: RF-990
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, QA Engineer, Perfectionist Validator, Technical Writer

## Agenda

1. Next 우선 메타데이터 카피 전면 리라이트 기준 확정
2. indexable route와 noindex internal route 분리 정책 확정
3. 공통 SEO 유틸(`@ahhachul/seo`) 확장 범위 합의
4. Vite 단일 메타 태그를 Next 기본 카피와 정렬

## Discussion Summary

- Team Lead는 검색 유입 대상 페이지와 내부 기능 페이지를 분리하지 않으면 snippet 품질이 흔들린다고 지적했다.
- FE Lead는 메타데이터 문구를 페이지별 하드코딩 대신 공통 카피 상수(`src/constant/seo.ts`)로 통합해 일관성을 확보하는 안을 제시했다.
- FE Specialist A는 `@ahhachul/seo`에 canonical/metadataBase/robots(openGraph 포함) 기본값을 넣어 호출부 중복을 줄이자고 제안했다.
- FE Specialist B는 auth callback, login flow redirect, 개인화 페이지(`me/messages/notifications/user`)를 noindex 처리해 검색 품질을 보호해야 한다고 제안했다.
- QA는 누락된 metadata route가 없도록 전수 점검 스크립트와 `pnpm validate:full` 통과를 blocking gate로 요청했다.
- Validator는 기능 동작 변경 없이 메타 품질만 개선한다는 리팩토링 핵심 규칙 준수를 확인했다.

## Decisions

1. RF-990에서는 Next 메타데이터를 우선 개선하고, Vite는 단일 엔트리 메타만 동일 카피로 정렬한다.
2. `@ahhachul/seo`는 canonical/metadataBase/robots 및 OG/Twitter 일관 옵션을 기본 제공한다.
3. sitemap indexable route는 `/`, `/community`, `/complaint`, `/lost-found`로 제한한다.
4. auth/internal/personalized route는 noindex(필요 시 nofollow 포함)를 기본 적용한다.

## Action Items

- FE Lead: 공통 SEO 카피 상수와 Next 메타데이터 호출부 일괄 마이그레이션.
- FE Specialist A: `@ahhachul/seo` 유틸 확장 및 route index 정책 반영.
- FE Specialist B: auth 누락 메타데이터 보강 및 Vite index 메타 정렬.
- QA/Validator: `pnpm validate:full`로 블로킹 게이트 최종 확인.

## Validator Verdict

- Status: `ValidatorPass`
- Reason: 누락 메타데이터 보강, noindex 정책 분리, sitemap 정리, 그리고 `pnpm validate:full` 통과가 모두 확인됨.
