# 경로기반 인맥 추천/그룹핑 기능 명세 (2026-02-26)

## 1. 미흡한 부분

- 현재 마이페이지 `즐겨찾기 경로`는 개인 경로 관리/추천만 제공하고, 비슷한 동선 사용자 탐색 기능이 없다.
- 사용자 간 자연스러운 연결(쪽지 시작)의 진입점이 부족해 커뮤니티 확장성이 낮다.
- 향후 카쉐어링/동행 기능을 위한 “유사 경로 클러스터” 데이터가 없다.

## 2. 개선 포인트

- 내 기준 경로(anchor)와 타 사용자 저장 경로를 비교해 유사도를 계산한다.
- 유사 조건은 아래 정책으로 고정한다.
  - 출발역 정거장 차이 `<= 1`
  - 도착역 정거장 차이 `<= 1`
  - 전체 차이 합 `<= 2`
- 결과는 `추천 사용자 목록 + 유사 경로 그룹 + 그래프 데이터`를 한 번에 제공한다.
- FE에서 “쪽지 보내기”를 즉시 실행할 수 있도록 `memberId`를 포함한다.

## 3. 개발 진행 (완료 조건)

### 3.1 BE

- 신규 API: `GET /v2/members/route-connections/recommendations`
- Query:
  - `limit` (기본 12, 최대 50)
  - `groupLimit` (기본 6, 최대 20)
- Response:
  - `matchingPolicy`
  - `anchorRoute`
  - `recommendations[]` (memberId, nickname, score, reason, route 정보)
  - `groups[]` (동일 출발/도착 조합 그룹)
  - `graph` (nodes/edges)
- 매칭 기준:
  - 비교 대상은 타 사용자의 저장 경로(`CUSTOM`) 우선
  - 내 기준 경로는 내 저장 경로 첫 번째, 없으면 즐겨찾기 역 2개로 fallback
- 테스트:
  - Member Service 테스트: 유사/비유사 필터 검증
  - Member Controller Docs 테스트: 신규 엔드포인트 계약 문서화

### 3.2 FE (one-app + vite)

- 마이페이지 `즐겨찾기 경로` 카드에 섹션 추가:
  - 추천 사용자 카드
  - 유사 경로 그룹 리스트
- 추천 사용자 카드에 `쪽지 보내기` CTA 제공
- 쪽지 시작 페이지에서 `memberId` 프리필 지원

## 4. 검증 결과 기준

- BE:
  - `MemberServiceTest` 신규 케이스 통과
  - `MemberControllerDocsTest` 신규 케이스 통과
- FE:
  - one-app: `nextjs:type`, `nextjs:lint`, `nextjs:test` 통과
  - vite: `app:type`, `app:lint`, `app:test` 통과
- UX:
  - 마이페이지에서 추천 사용자 확인 가능
  - 추천 사용자에서 쪽지 시작 시 대상 `memberId` 자동 입력
