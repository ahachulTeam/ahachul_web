# FE 구현 기록: 실시간 confidence 배지 V1

- 작성일: 2026-02-23
- 기반 명세: `docs/PM_TO_FE_REALTIME_CONFIDENCE_BADGE_V1_SPEC.md`

## 구현 내용

1. V2 실시간 응답 정규화 함수 추가
2. 홈 `TrainRealTimes` 카드에 신뢰도 배지/지연 문구 추가
3. V2 메타(`confidenceLevel`, `isStale`, `freshnessSec`) 안전 노출
4. 정규화 로직 단위 테스트 추가

## 비고

- V2 비활성/메타 누락 시 기존 UI를 유지
