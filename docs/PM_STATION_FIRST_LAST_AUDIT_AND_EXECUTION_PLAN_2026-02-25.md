# PM 실행 문서: 역별 첫차/막차 기능 점검 및 즉시 개선 (2026-02-25)

## 1. 미흡한 부분

1. BE `v1/stations/times`의 `RESULT 단독(INFO-200)` 실패 경로는 보강으로 해소되었지만, 외부 공공 API no-data 비율이 높아 실사용 구간에서 첫차/막차가 비어 보이는 케이스가 여전히 많습니다.
2. BE `v2/stations/times/summary`, `v2/stations/times/full`은 fallback으로 200을 반환하지만, 실제 값이 모두 비어도 FE가 원인을 명확히 안내하지 못합니다.
3. FE(Vite/one-app) 모두 첫차/막차가 `--:--`로만 보이는 경우가 있어, 사용자 관점에서 "정보 없음"과 "오류/연동 실패"를 구분하기 어렵습니다.

## 2. 개선 포인트

1. BE 역시간표 파서 강건화

- `SearchSTNTimeTableByIDService` 래퍼 응답뿐 아니라 `RESULT` 단독 응답(INFO-200)도 정상 파싱
- no-data는 기술 오류(500) 대신 빈 시간표로 표준화

2. FE no-data UX 명시

- 첫차/막차 값이 전부 비어 있으면 안내 문구를 명시적으로 노출
- Vite/one-app 모두 동일 정책 적용

3. 검증 기준 통일

- BE: StationTimes DTO/Client 테스트로 응답 케이스(정상/비정상/no-data) 검증
- FE: type/lint/test 게이트 통과 + 문구 렌더링 회귀 없음 확인

## 3. 개발 진행

### 3.1 BE 실행 항목

1. `SeoulTrainClientImpl` 보강

- 역시간표 API 응답을 문자열로 받아 JSON 트리 기반 파싱
- `RESULT` 단독 응답 시 빈 row를 가진 `StationTimesDto.Response`로 변환

2. `StationTimesDto` 실패 판정 보강

- `INFO-000`(정상), `INFO-200`(데이터 없음)을 실패로 보지 않도록 조정
- no-data 판정 함수(`isNoData`) 추가

3. 테스트 수정

- `SeoulTrainClientImplTest`: INFO-200 케이스를 예외가 아닌 no-data 정상 처리로 변경
- `StationTimesDtoTest`: 실패 코드와 no-data 케이스를 분리 검증

### 3.2 FE 실행 항목

1. Vite(`TrainRealTimes.component.tsx`)

- summary 값이 모두 비어 있을 때
  `시간표 데이터를 받지 못해 첫차/막차를 표시할 수 없습니다.` 문구 노출

2. one-app(`MyDashboard.tsx` + i18n)

- 동일 no-data 분기 추가
- 다국어 메시지(`ko/en/cn/th`)에 `summaryNoData` 키 추가

## 4. 검증 결과

### 4.1 런타임 점검 근거

1. `GET /v2/stations/times/summary?...` -> 200, summaries 첫차/막차 null/null (재현)
2. `GET /v2/stations/times/full?...` -> 200, stationTimes 빈 배열 (재현)
3. `GET /v1/stations/times?stationTimeWeekType=WEEKDAY...` -> 200, `stationTimes=[]` (no-data fallback 정상)
4. `GET /v1/stations/times?weekTag=1...` -> 200, `stationTimes=[]` (레거시 파라미터 하위호환 적용)
5. `GET /health-check/readiness` -> 200, `database=UP`, `redis=UP`

### 4.2 역별 커버리지 점검(현행 데이터 품질)

1. 전체 역-호선 조합 668건 기준 `first/last non-null` 비율

- non-null: 243건 (36.4%)
- all-null: 425건 (63.6%)

2. 노선별 관측(평일 기준)

- 데이터 존재: 3호선, 4호선, 6호선, 7호선, 8호선, 9호선
- 전역 all-null: 1호선, 2호선, 5호선, 경강선, 경의중앙선, 경춘선, 공항철도, 서해선, 수인분당선, 신분당선, 우이신설경전철

3. 해석

- 기능 경로/계약/예외처리는 동작하지만, 노선별 원천 데이터 커버리지가 낮아 "역마다 첫차/막차가 안정적으로 나온다" 수준에는 아직 도달하지 못함.

### 4.3 테스트 근거

1. FE(Vite)

- `subway.station-time-summary.v2.test.ts` 통과
- `subway.last-train-risk.v2.test.ts` 통과
- `lastTrainRisk.test.ts` 통과

2. FE(one-app)

- `subway-realtime-v2.spec.ts` 통과

3. BE

- `StationControllerDocsTest` 통과
- `StationServiceLastTrainRiskFallbackUnitTest` / `StationLastTrainRiskCalculatorTest` 통과
- 참고: 전체 `:application:test`는 환경의 Testcontainers Docker 미가동 이슈로 기존 실패가 남아 있음

## 5. 후속(다음 스프린트)

1. BE 데이터 품질 감사 배치 추가

- 역-호선 단위 `stationCode` 유효성 검사 + no-data 비율 집계 리포트 생성
- all-null 노선 우선순위(1,2,5,16,18,20...)로 코드 매핑 검증/보정

2. BE 다중 소스 전략 수립

- 현 공공 API no-data 지속 구간은 보조 소스(정적 GTFS/기관별 시간표) fallback 도입
- 소스별 `freshness`, `coverage` 메타를 응답에 포함

3. FE 정책 고도화

- 노선/역 단위로 "시간표 미제공/수집중" 상태를 명시
- 데이터 없음과 시스템 오류를 완전히 분리한 문구/배지 적용
