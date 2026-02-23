# PM -> FE 기능명세서: 실시간 도착 신뢰도 배지 V1

- 작성일: 2026-02-23
- 기준 문서: `ahachul_data/docs/PM_SUBWAY_PUBLIC_DATA_DEEP_RESEARCH_2026-02-23.md`
- 목표: 실시간 도착정보에 신뢰도(HIGH/MEDIUM/LOW)와 지연 상태를 직관적으로 표시

## 1. 구현 범위
1. 홈 `TrainRealTimes` 카드에 신뢰도 배지 추가
2. V2 응답 필드(`confidenceLevel`, `isStale`, `freshnessSec`, `lastExternalRecptnAt`)를 활용
3. V2 비활성/응답 누락 시 배지 미노출(기존 UX 유지)

## 2. 표시 규칙
1. HIGH: `신뢰도 높음`
2. MEDIUM: `신뢰도 보통`
3. LOW: `신뢰도 낮음`
4. `isStale=true`이면 보조 문구 `정보 지연`

## 3. UX 규칙
1. 배지는 도착 상태 영역 근처에 작게 노출
2. 스켈레톤/로딩 상태에서는 배지 숨김
3. 에러 상태에서는 배지 숨김

## 4. 테스트 요구사항
1. V2 응답 정규화 로직 단위 테스트 추가
2. `arrivalCode` -> 기존 UI 코드(`currentTrainArrivalCode`) 매핑 검증
3. `confidenceLevel`/`isStale` 메타 보존 검증

## 5. 완료 조건
1. 배지 노출 확인
2. 테스트 PASS
3. 문서/주석 한국어 유지
