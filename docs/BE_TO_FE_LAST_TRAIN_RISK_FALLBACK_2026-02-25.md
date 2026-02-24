# BE -> FE 핸드오프: 막차 리스크 외부 실패 Fallback 전환

- 작성일: 2026-02-25
- 대상 API: `GET /v2/stations/times/last-train-risk`
- 목적: 외부 역시간표 API 실패 시 FE 화면이 500 에러 상태로 깨지지 않도록, BE 응답을 안전한 200 형태로 전환

## 1. 변경 배경

- 기존에는 일부 역/호선 조합(예: `stationId=557`, `subwayLineId=18`)에서 외부 역시간표 API 실패가 발생하면
  - HTTP 500
  - 코드 `802`
  - 메시지 `역 시간표 API를 조회하는데 실패하였습니다.`
    로 응답했습니다.
- FE에서는 해당 500을 실패로 인식해 홈/지하철 관련 플로우에서 에러 경험이 발생했습니다.

## 2. BE 변경 사항

- 외부 역시간표 API 실패(`FAILED_STATION_TIMES_API`, `INVALID_STATION_TIMES_API_RESPONSE`)를
  `last-train-risk` 경로에서 예외로 전파하지 않고 빈 시간표 fallback으로 처리합니다.
- fallback 시 막차 리스크 계산기는 아래 안전 응답을 반환합니다.
  - `lastDepartureTime = null`
  - `minutesToLastTrain = -1`
  - `isLastTrainRisk = true`
  - `riskLevel = RISK`
  - `message = "막차 정보가 없습니다."`

## 3. FE 반영 가이드

- FE는 `last-train-risk` 호출에서 500 전제 처리를 제거/축소하고, 아래 200 응답 기반 분기만 유지하면 됩니다.
  - `riskLevel === "RISK"` + `message === "막차 정보가 없습니다."` 인 경우
    - 사용자 문구: 막차 정보 불가 안내(현행 문구 유지 가능)
    - UI 동작: 하드 에러 화면 대신 경고/배지 표시 유지
- `minutesToLastTrain === -1`은 계산 불가 의미로 처리하세요.

## 4. 검증 결과

- 검증 요청:
  - `GET http://localhost:8080/v2/stations/times/last-train-risk?stationId=557&subwayLineId=18&upDownType=UP&stationTimeWeekType=WEEKDAY&walkingMinutes=15`
- 변경 전: `500`, `code=802`
- 변경 후: `200`, `code=100`, `result.riskLevel=RISK`, `result.message="막차 정보가 없습니다."`

## 5. 영향 범위

- 이번 변경은 `last-train-risk` 엔드포인트의 외부 실패 처리에 한정됩니다.
- `station-times summary`, `quick exits`의 계약은 변경하지 않았습니다.
