# PM 지하철 길찾기 + 전체 시간표 마스터 스펙 (2026-02-25)

## 1. 미흡한 부분

- 현재 Vite `SubwayTimelinePage`, one-app `/subway/timeline`은 유지보수 안내/placeholder 수준이라 실제 길찾기/전체 시간표 탐색이 불가능합니다.
- BE는 `실시간 도착(v2)`, `요약 시간표(v2)`, `막차 리스크(v2)`는 있으나, 사용자 관점의 `출발역-도착역 길찾기 검색 API`와 `역/호선 기준 전체 시간표(요일+상/하행 통합)`가 부족합니다.
- 기존 경로 그래프 계산 로직은 `즐겨찾기 역 기반 추천`에 묶여 있어 일반 검색(비로그인 포함)에 재사용하기 어렵습니다.
- FE는 역/호선/방향/요일을 한 화면에서 탐색하고 비교하는 UX가 없어 외국인/초행 사용자에게 불편합니다.

## 2. 개선 포인트

- 길찾기 핵심: `출발역-도착역` 입력만으로 `최적 경로(최단시간/최소환승)`를 즉시 반환하는 공개 API를 신설합니다.
- 시간표 핵심: `역+호선` 단일 요청으로 `WEEKDAY/SATURDAY/HOLIDAY x UP/DOWN` 전체 시간표를 내려주는 집계 API를 신설합니다.
- 품질 핵심: 외부 API 지연/장애 시 빈 화면 대신 fallback 데이터를 제공하고, 신뢰도/갱신시각을 노출합니다.
- 운영 핵심: p95 latency, 외부 API 실패율, fallback 비율, no-data 비율을 관측하고 롤백 기준을 사전에 정의합니다.

## 3. 리서치 결과 요약(구현 반영 관점)

### 3.1 사용자 가치

- 출근/등교 사용자: "지금 출발 시 몇 분 소요, 환승 몇 번"을 가장 빠르게 확인해야 함.
- 외국인 사용자: 역명-호선-방향 정보가 분산되어 있으면 이탈이 큼. 한 화면 통합형 탐색이 유리.
- 지연 상황 사용자: 경로별 예상 시간과 환승부담을 동시에 보여줘야 의사결정이 쉬움.

### 3.2 데이터 소스 전략

- 1차(이미 보유): 서울시/수도권 공공 데이터 기반 실시간/시간표 API + 내부 캐시.
- 2차(확장): 혼잡도/장애 정보/커뮤니티 지연신호를 경로 점수에 가중치로 반영.
- 이번 스프린트 범위: 1차를 우선 완성하고, 2차는 확장 포인트를 명세에 반영.

### 3.3 경로 계산 정책

- 기본 전략 `BALANCED`: 정차역 수 우선, 환승 수 보조.
- 대안 전략 `MIN_TRANSFER`: 환승 수 우선, 정차역 수 보조.
- 대안 전략 `MIN_STOP`: 정차역 수 최우선.
- 예상 소요시간 추정식(초기): `estimatedMinutes = 정차역*2 + 환승*4`.

## 4. 개발 진행(명세)

### 4.1 BE 명세

1. `GET /v2/subway/routes/search`

- Query
  - `sourceStationId` (Long, required)
  - `destinationStationId` (Long, required)
  - `strategy` (`BALANCED|MIN_TRANSFER|MIN_STOP`, optional, default=`BALANCED`)
  - `alternatives` (Int, optional, default=2, min=1, max=3)
- Response 200

```json
{
  "result": {
    "generatedAt": "2026-02-25T06:10:00+09:00",
    "sourceStationId": 154,
    "destinationStationId": 201,
    "strategy": "BALANCED",
    "routes": [
      {
        "rank": 1,
        "nodes": [
          { "stationId": 154, "stationName": "안암", "order": 0, "isTransfer": false },
          { "stationId": 151, "stationName": "신설동", "order": 1, "isTransfer": true }
        ],
        "edges": [
          { "fromStationId": 154, "toStationId": 151, "subwayLineId": 6, "subwayLineName": "6호선" }
        ],
        "summary": {
          "totalStops": 8,
          "transferCount": 1,
          "estimatedMinutes": 20
        }
      }
    ]
  }
}
```

- Error
  - `806 ROUTE_NOT_FOUND`: 경로 계산 불가
  - `101 BAD_REQUEST`: 파라미터 누락/범위 오류

2. `GET /v2/stations/times/full`

- Query
  - `stationId` (Long, required)
  - `subwayLineId` (Long, required)
- Response 200

```json
{
  "result": {
    "generatedAt": "2026-02-25T06:12:00+09:00",
    "stationId": 154,
    "subwayLineId": 6,
    "weeks": [
      {
        "stationTimeWeekType": "WEEKDAY",
        "upDownTimetables": [
          {
            "upDownType": "UP",
            "stationTimes": [
              {
                "arrivalTime": "05:20:00",
                "departureTime": "05:21:00",
                "arrivalStationName": "응암",
                "departureStationName": "신내",
                "trainType": "LOCAL"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

- 예외 정책
  - 특정 요일/방향 외부 API 실패 시 해당 슬롯은 빈 배열 fallback (전체 API 500 금지)
  - 역/호선 자체가 유효하지 않으면 기존 코드(`801`, `802`, `805`) 준수

### 4.2 FE 명세

1. Vite `/subway/timeline` 고도화

- 입력
  - 출발역/도착역 선택(초기값: 현재 진입 역)
  - 경로 전략 선택(`균형/최소환승/최소정차`)
- 출력
  - 경로 카드(정거장 수, 환승 수, 예상 시간)
  - 역 이동 시각화(노드/엣지)
  - 전체 시간표 탭(평일/토요일/공휴일, 상/하행)
- UX
  - `조회 중`, `데이터 없음`, `부분 fallback` 명시
  - 수동 새로고침 제공

2. one-app `/subway/timeline` 실구현

- placeholder 제거 후 Vite와 동일 계약/동일 정보밀도 유지
- 모바일 우선 레이아웃(리스트/탭/카드)

### 4.3 공통 완료조건(DoD)

- BE
  - 신규 API 2종 구현 + 단위 테스트
  - 기존 API 회귀 없음
- FE
  - Vite/one-app 모두 신규 API 연동
  - 타입/린트/테스트 통과
- 운영
  - 빈 문서 금지 게이트 통과
  - 장애 시 fallback UI 확인

## 5. FE/BE 작업 분해

### BE

1. Kakao 로그인 500 수정(우선순위 P0)
2. `/v2/subway/routes/search` 구현
3. `/v2/stations/times/full` 구현
4. 테스트 및 로컬 검증

### FE

1. API contract/타입 추가
2. Vite `SubwayTimelinePage` 실제 화면 구현
3. one-app `/subway/timeline` 실제 화면 구현
4. 스모크/게이트 검증

## 6. 검증 결과(본 문서 작성 시점)

- 카카오 로그인 500 → 401(code=205)로 BE 수정/재현 확인 완료.
- 길찾기/전체 시간표는 본 명세 기준으로 구현 착수.

## 7. 남은 리스크

- 외부 시간표 API 원천 지연이 크면 전체 시간표 응답 지연 가능.
- 경로 계산 고도화(실시간 혼잡도/장애 반영)는 2차 작업 필요.
- 다국어 역명 표기(영문/중문/태국어)는 별도 데이터셋 정합화 필요.
