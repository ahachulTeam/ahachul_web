# PM -> FE/BE 핸드오프: 경로기반 인맥 추천 (2026-02-26)

## 1) 기능 목적

- 출발/도착이 비슷한 사용자들을 찾아 인맥 추천을 제공한다.
- 추천 결과를 그룹/그래프로 표현해 이후 동행/카쉐어링 기능의 기반 데이터로 활용한다.

## 2) 핵심 정책

- 매칭 판정
  - 출발역 차이 `<= 1`
  - 도착역 차이 `<= 1`
  - 전체 차이 합 `<= 2`
- 기준 경로(anchor)
  - 1순위: 내 저장 경로 첫 번째
  - 2순위: 즐겨찾기 역 2개 fallback

## 3) BE 전달 사항

- API: `GET /v2/members/route-connections/recommendations`
- Query: `limit`, `groupLimit`
- Response 필수 필드:
  - `matchingPolicy`
  - `anchorRoute`
  - `recommendations` (memberId, nickname, route, score, reason)
  - `groups` (경로 그룹)
  - `graph` (nodes/edges)
- 검증:
  - Service 테스트 1건 이상(유사 경로 필터)
  - Docs 테스트 1건 이상(신규 API 계약)

## 4) FE 전달 사항

- one-app, vite 모두 동일 UX 반영
  - 마이페이지 > 즐겨찾기 경로 카드 > 인맥 추천 섹션
  - 추천 카드 내 `쪽지 보내기` CTA
  - 쪽지 시작 페이지 `memberId` 프리필
- 에러 UX
  - 로딩/실패/빈 상태 문구 분리
  - 실패 시 기존 전역 에러 처리/로깅 규칙 준수

## 5) 완료 기준

- 추천 사용자/그룹이 화면에서 확인 가능
- 추천 카드에서 쪽지 진입 시 대상 memberId 자동 입력
- FE/BE 필수 게이트 통과
