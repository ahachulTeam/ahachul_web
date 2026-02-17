# FE Meeting 018 - SEO Discovery Linking and Feed Architecture (RF-1000)

- DateTime (KST): 2026-02-17 17:20:00
- Task ID: RF-1000
- Participants: Team Lead, FE Lead, FE Specialist A, FE Specialist B, Infra Engineer, QA Engineer, Perfectionist Validator, Technical Writer

## Agenda

1. Next 내부 링크를 SEO 친화적으로 재정렬할지 검토
2. Google 구조화 네비게이션 노출을 위한 JSON-LD 설계 확정
3. 대규모 확장 전제 sitemap index + segmented sitemap 구조 확정
4. RSS 자동화 및 빌드-타임 네트워크 실패 복원 전략 확정

## Discussion Summary

- FE Lead는 버튼 기반 네비게이션만으로는 크롤러가 링크 관계를 안정적으로 학습하기 어렵기 때문에, shell 컴포넌트에서 anchor 렌더링을 허용해야 한다고 제안했다.
- FE Specialist A는 JSON-LD를 페이지별 산발 삽입이 아니라 shared builder 중심으로 구성해 확장 시 타입 안정성을 유지하자고 제안했다.
- FE Specialist B는 상세 페이지에서 breadcrumb JSON-LD와 visible breadcrumb를 동시 제공해 검색결과 내 구조화 힌트를 강화하는 방안을 제시했다.
- Infra Engineer는 sitemap 단일 파일 구조는 대규모 확장에서 병목이 될 수 있으므로 index + segment 분리를 기본 아키텍처로 채택해야 한다고 제안했다.
- QA는 API 비가용 시에도 RSS/sitemap route가 빌드 실패를 유발하면 안 된다고 지적했고, fallback XML 반환을 blocking 조건으로 요청했다.
- Validator는 리팩토링 핵심 규칙(동작 보존, 과추상화 금지) 준수 여부를 확인하고 `pnpm validate:full` 통과를 다음 단계 조건으로 지정했다.

## Decisions

1. 내부 링크는 crawl path 보장을 위해 anchor 기반 렌더링 경로를 유지한다.
2. 구조화 데이터는 `@ahhachul/seo` 공통 함수로 생성하고 `layout` + breadcrumb 지점에서 일관 삽입한다.
3. sitemap은 `/sitemap.xml` index와 `/sitemaps/{core,community,complaint,lost-found}.xml` 세그먼트로 운영한다.
4. RSS는 통합/섹션 feed를 모두 제공하고, upstream fetch 실패 시에도 유효 XML(empty items)로 응답한다.

## Action Items

- FE Lead: shared routes/seo contract 확장과 Next 내부 링크 개선 통합.
- FE Specialist A: JSON-LD, sitemap, RSS XML builder 및 discovery 데이터 계층 구현.
- FE Specialist B: page/layout/breadcrumb 링크 마이그레이션 및 metadata feed alternates 연결.
- QA/Validator: `pnpm --filter @ahhachul/one-app build` + `pnpm validate:full` 블로킹 게이트 실행.

## Validator Verdict

- Status: `ValidatorPass`
- Reason: 내부 링크/JSON-LD/sitemap/RSS 구조 변경 이후에도 빌드 및 full gate가 통과했고, API 비가용 상황에서 RSS/사이트맵 라우트가 fail-safe 응답을 반환함을 확인함.
