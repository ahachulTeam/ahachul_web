# PM -> FE/BE 핸드오프: 경로탐색 품질 V3 (정확도 중심)

## 1. 미흡한 부분

- 기존 V2 길찾기는 "빠른 경로"는 제공하지만 "안전한 경로" 판단 근거가 부족함.
- 환승/보행/막차/지연 리스크를 사용자가 즉시 이해할 수 있는 UI가 부재.

## 2. 개선 포인트

- BE는 V3 품질 점수 API를 제공하고, FE는 점수 기반 추천 UX를 반영.
- 단, 장애 복원력을 위해 FE는 V3 실패 시 V2 fallback 필수.

## 3. 개발 진행

### BE 전달사항

- 구현 대상: `GET /v3/subway/routes/search`
- 필수 요구
  - V2 경로 탐색 로직 재사용 가능
  - 경로별 `quality` 객체 계산 후 정렬
  - `quality.reasons`(사용자 노출 문구), `quality.badges`(배지), `confidenceLevel` 포함
  - 데이터 부족 시 중립 점수 + confidence 하향
- 테스트
  - `StationServiceRouteSearchUnitTest` 보강
  - `StationControllerDocsTest`에 V3 endpoint docs 추가

### FE 전달사항

- one-app + vite 동시 반영
- 필수 요구
  - 경로 카드에 `총점`, `배지`, `추천 사유` 노출
  - `walkingPreference` 입력 UI 제공(빠른 이동 / 계단 적음)
  - V3 실패 시 V2 fallback
- 비고
  - 백엔드가 V3 점수 필드 미제공하는 구간에서도 화면이 깨지지 않도록 optional 처리

### API 계약 초안

- Query
  - `sourceStationId`, `destinationStationId`, `strategy`, `alternatives`, `walkingPreference`, `stationTimeWeekType`
- Response
  - `result.modelVersion = ROUTE_QUALITY_V3`
  - `result.routes[].quality.totalScore`
  - `result.routes[].quality.transferRiskScore`
  - `result.routes[].quality.walkingScore`
  - `result.routes[].quality.lastTrainSafetyScore`
  - `result.routes[].quality.delayResilienceScore`
  - `result.routes[].quality.delayProbabilityPercent`
  - `result.routes[].quality.confidenceLevel`
  - `result.routes[].quality.badges[]`
  - `result.routes[].quality.reasons[]`

## 4. 검증 결과

- 본 문서는 핸드오프 문서로 작성 완료.
- 구현 검증은 FE/BE 완료 후 아래를 충족해야 함.
  - BE: V3 endpoint + 테스트 통과
  - FE: one-app/vite 렌더링 + fallback 동작 확인
  - FE 게이트 + BE 변경경로 테스트 성공
