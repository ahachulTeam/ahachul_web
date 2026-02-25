# PM 경로탐색 품질 V3 명세 (정확도 중심)

## 1. 미흡한 부분

- 기존 `/v2/subway/routes/search`는 `정차 수/환승 수/예상 소요` 중심이라, 사용자가 실제 체감하는 리스크(환승 실패, 보행 부담, 막차 실패, 지연 가능성)를 반영하지 못한다.
- 동일 예상 소요 시간의 경로가 여러 개일 때, 어떤 경로가 더 안전한지 설명 가능한 근거가 없다.
- FE에서는 경로 리스트를 단순 정렬 결과로만 노출해 사용자가 "왜 이 경로가 추천인지" 이해하기 어렵다.

## 2. 개선 포인트

- V2 API는 유지하고, 정확도 강화 전용 `V3` API를 추가한다.
- 경로별 품질을 아래 4개 축으로 점수화한다.
  - 환승 리스크
  - 계단/보행 부담
  - 막차 안전도
  - 지연 확률
- 총점 기반 추천 정렬을 적용하고, 세부 점수/배지/추천 사유를 함께 내려 FE에서 설명 가능한 UX를 제공한다.
- 점수 계산에 필요한 실데이터가 부족한 경우(예: 막차 데이터 없음)에는 중립 점수 + 낮은 신뢰도(`MEDIUM/LOW`)로 안전하게 fallback 한다.

## 3. 개발 진행

### 3.1 API

- 신규: `GET /v3/subway/routes/search`
- 기존: `GET /v2/subway/routes/search` 유지(하위호환)

#### Query

- `sourceStationId` (Long, required)
- `destinationStationId` (Long, required)
- `strategy` (`BALANCED|MIN_TRANSFER|MIN_STOP`, optional, default=`BALANCED`)
- `alternatives` (Int, optional, default=2, min=1, max=4)
- `walkingPreference` (`FAST|LESS_STAIRS`, optional, default=`FAST`)
- `stationTimeWeekType` (`WEEKDAY|SATURDAY|HOLIDAY`, optional, default=`WEEKDAY`)

#### Response (요약)

- `modelVersion`: `ROUTE_QUALITY_V3`
- `generatedAt`
- `sourceStationId`, `destinationStationId`, `strategy`, `walkingPreference`, `stationTimeWeekType`
- `routes[]`
  - 기존 경로 필드(nodes/edges/summary)
  - 신규 품질 필드
    - `quality.totalScore` (0~100)
    - `quality.transferRiskScore` (0~100)
    - `quality.walkingScore` (0~100)
    - `quality.lastTrainSafetyScore` (0~100)
    - `quality.delayResilienceScore` (0~100)
    - `quality.delayProbabilityPercent` (0~100)
    - `quality.confidenceLevel` (`HIGH|MEDIUM|LOW`)
    - `quality.badges[]`
    - `quality.reasons[]`

### 3.2 점수 모델

- 총점 계산(가중합)
  - `totalScore = 0.30*transfer + 0.20*walking + 0.25*lastTrain + 0.25*delayResilience`
- 환승 리스크 점수
  - 환승 횟수가 증가할수록 점수 하락
- 보행 점수
  - 정차 수 + 환승 수 기반 페널티
  - `LESS_STAIRS`일 때 환승 페널티 가중
- 막차 안전도
  - 가능하면 첫 구간 노선 기준 막차 데이터로 여유시간 계산
  - 데이터 미가용 시 중립 점수(`50~60`) + confidence 하향
- 지연 복원력
  - 환승 횟수, 장거리(소요시간), 혼잡 시간대(출퇴근), 혼잡 노선 힌트로 확률 추정

### 3.3 정렬 정책

- 1순위: `quality.totalScore DESC`
- 2순위: `summary.estimatedMinutes ASC`
- 3순위: `summary.transferCount ASC`

### 3.4 FE UX 정책

- 경로 카드에 아래를 반드시 노출
  - 총점(예: `품질 82점`)
  - 리스크 배지(예: `지연주의`, `막차주의`, `환승다수`)
  - 추천 사유 1~2줄(백엔드 reasons 사용)
- V3 호출 실패 시 V2 fallback으로 화면 공백 없이 경로를 제공한다.

### 3.5 비기능

- V3 실패가 V2 기능을 깨면 안 된다.
- 점수 필드 추가는 기존 화면/계약을 깨지 않도록 optional-safe로 적용한다.
- 로깅은 경로탐색 실패/score fallback 사유를 남겨 운영 중 진단 가능해야 한다.

## 4. 검증 결과(완료 조건)

- BE
  - `GET /v3/subway/routes/search` 정상 응답
  - 점수 필드/배지/사유 포함 확인
  - route unit test + station controller docs test 통과
- FE
  - one-app + vite에서 V3 점수 UI 표시
  - V3 실패 시 V2 fallback 동작 확인
  - `nextjs:type/lint/test`, `app:type/lint/test` 통과
- 공통
  - 문서 비어있음 게이트 통과
  - 결과는 오케스트레이션 보고 형식(`task id -> worker -> 상태판`)으로 기록
