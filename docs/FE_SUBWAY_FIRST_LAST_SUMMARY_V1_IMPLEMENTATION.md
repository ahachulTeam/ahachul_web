# FE 구현 기록: 홈 역 카드 첫차/막차 요약 V1

- 작성일: 2026-02-23
- 기반 명세: `docs/PM_TO_FE_SUBWAY_FIRST_LAST_SUMMARY_V1_SPEC.md`

## 구현 범위

1. `/v2/stations/times/summary` 요청 함수 추가
2. React Query 훅(`useFetchStationTimesSummary`) 추가
3. 홈 `TrainRealTimes` 카드에 "오늘 첫차/막차" 요약 UI 추가
4. API 요청 단위 테스트 추가

## 표시 규칙

- 상행/하행 각각 `첫차 / 막차` 형식
- 시간 포맷은 `HH:mm`
- 데이터 없으면 `--:--`
- 로딩 시 `오늘 첫차/막차 불러오는 중...`
