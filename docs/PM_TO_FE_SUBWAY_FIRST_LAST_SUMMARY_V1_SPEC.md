# PM -> FE 기능명세서: 홈 역 카드 첫차/막차 요약 V1

- 작성일: 2026-02-23
- 기준 문서: `ahachul_data/docs/PM_SUBWAY_PUBLIC_DATA_DEEP_RESEARCH_2026-02-23.md`
- 목표: 외국인 포함 사용자에게 "지금 기준 첫차/막차" 정보를 홈에서 즉시 확인 가능하게 제공

## 1. 기능명
- **Subway Home First/Last Summary V1**

## 2. 사용자 가치
1. 현재 선택 역에서 상행/하행 첫차/막차를 즉시 확인
2. 막차 임박 여부 판단 전 기본 정보 확인 시간을 단축
3. 도착정보와 시간표 요약을 한 화면에서 제공

## 3. FE 구현 범위
1. 홈의 역 정보 카드(`TrainRealTimes`)에 "오늘 첫차/막차" 요약 섹션 추가
2. BE 신규 API `GET /v2/stations/times/summary` 연동
3. 표시는 상행/하행 각 1행
4. 시간 포맷은 `HH:mm` (원본 `HH:mm:ss`에서 초 제거)
5. 데이터 없음/실패 시 `--:--` 처리

## 4. 요청 파라미터 규칙
1. `stationId`, `subwayLineId`: 현재 선택된 역/노선
2. `stationTimeWeekType`:
- 월~금: `WEEKDAY`
- 토: `SATURDAY`
- 일: `HOLIDAY`

## 5. 상태/문구 규칙
1. 로딩: `오늘 첫차/막차 불러오는 중...`
2. 성공: `상행 05:31 / 23:58`, `하행 05:36 / 23:54`
3. 에러 또는 빈값: `상행 --:-- / --:--`, `하행 --:-- / --:--`

## 6. 테스트 요구사항
1. API 요청 단위 테스트 추가
2. 경로/쿼리파라미터(`stationId`, `subwayLineId`, `stationTimeWeekType`) 검증
3. 응답 매핑 필드(`upDownType`, `firstDepartureTime`, `lastDepartureTime`) 검증

## 7. 완료 조건 (DoD)
1. 홈 화면에 요약 섹션 노출
2. API 실패 시 UI 깨짐 없음
3. 테스트 PASS 증적 포함
4. 문서/코드 주석은 한국어 유지
