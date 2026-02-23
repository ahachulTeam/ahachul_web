# PM -> FE 기능명세서: 첫차/막차 + 도보시간 리스크 V1

- 작성일: 2026-02-23
- 기준 문서: `ahachul_data/docs/PM_SUBWAY_PUBLIC_DATA_DEEP_RESEARCH_2026-02-23.md`

## 1. 목표
- 사용자가 현재 역 기준으로 "지금 출발 시 막차 위험"을 즉시 판단할 수 있도록 제공

## 2. 구현 범위
1. 홈 역 카드에 `도보시간(분)` 입력 UI 추가(기본 15분)
2. BE API `GET /v2/stations/times/last-train-risk` 연동
3. 리스크 상태 배지 노출

## 3. 표시 규칙
1. SAFE: `막차 여유`
2. WARN: `막차 임박`
3. RISK: `막차 위험`
4. 보조문구: BE `message` 그대로 노출

## 4. 테스트 요구사항
1. API 요청 단위 테스트 추가
2. `walkingMinutes` 파라미터 전달 검증
3. 리스크 상태 매핑 검증

## 5. 완료 조건
1. 입력값 변경 시 리스크 갱신
2. 에러 시 UI 깨짐 없음
3. 테스트 PASS
