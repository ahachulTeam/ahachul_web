# 홈 날씨 안내 기능 딥 리서치 및 명세 (2026-02-25)

## 1. 미흡한 부분

- 현재 홈 화면은 실시간 열차/시간표 중심이며, 당일 외부 환경(날씨)에 따른 이용자 행동 가이드가 없다.
- 사용자 입장에서는 출근 전 별도 앱에서 날씨를 다시 확인해야 해서 이탈이 발생한다.
- 날씨 API를 무비용/저비용으로 안정 운영하는 기준(호출량, 캐시, 장애 fallback)이 문서화되어 있지 않다.

## 2. 개선 포인트

- 홈 상단에 `오늘 날씨 + 주의점 + 친화 문구`를 제공한다.
- FE/BE 공통 스펙을 고정해 Vite/one-app UX를 동일하게 유지한다.
- BE는 `저비용 캐시 우선` 전략으로 외부 호출을 최소화한다.

## 3. 개발 진행

### 3.1 리서치 결론

- 1차 데이터 소스는 Open-Meteo를 사용한다.
- 선택 근거
  - 즉시 사용 가능(키 없이 호출 가능): [Open-Meteo Docs](https://open-meteo.com/en/docs)
  - 무료 구간의 명시된 호출 한도 존재(분/시간/일): [Open-Meteo Pricing](https://open-meteo.com/en/pricing)
  - 한국(KMA) 모델 포함 안내가 있어 국내 정확도 측면의 기본 요건 충족: [Open-Meteo Docs](https://open-meteo.com/en/docs)
- 2차(후속) 후보
  - 기상청 단기예보 API(개발계정 1일 10,000건): [기상청\_단기예보 조회서비스](https://www.data.go.kr/data/15084084/openapi.do)
  - 서울 실시간 지하철 API는 1일 1,000건 제한 특성이 있어 날씨에 병행 사용 시 호출 예산 관리 필요: [서울 열린데이터광장 Open API 안내](https://data.seoul.go.kr/together/guide/useGuide.do)

### 3.2 기능 범위(MVP)

- 엔드포인트: `GET /v2/stations/weather/brief`
- Query
  - `stationId` (Long, required)
- Response(요약)
  - `stationId`, `stationName`
  - `generatedAt`
  - `dataSource` (`API|CACHE|STALE_CACHE|FALLBACK`)
  - `isStale` (Boolean)
  - `summaryText` (예: `현재 맑음, 9°C`)
  - `cautionText` (예: `일교차가 커서 겉옷을 챙기세요.`)
  - `friendlyText` (예: `오늘은 날씨가 화창합니다. 좋은 하루 되세요.`)
  - `temperatureC`, `apparentTemperatureC`, `precipitationMm`, `windSpeedMps`
  - `weatherCode`, `weatherLabel`

### 3.3 BE 설계 기준(비용 최적화)

- 외부 호출 빈도 축소
  - Fresh cache TTL: 10분
  - Stale cache TTL: 3시간
- 호출 실패 시 fallback
  - 외부 API 실패 → stale cache 반환
  - stale cache도 없으면 내부 fallback 문구 반환(빈 화면 금지)
- 캐시 키
  - `HOME_WEATHER_BRIEF:FRESH:{hourBucket}`
  - `HOME_WEATHER_BRIEF:STALE:{hourBucket}`
- 관측 지표
  - `weather_external_call_count`
  - `weather_cache_hit_count`
  - `weather_stale_fallback_count`
  - `weather_fallback_count`

### 3.4 FE UX 기준

- 홈 날씨 카드는 `내 역 실시간 도착정보` 카드 상단에 배치한다.
- 오류 시에도 카드 영역은 유지하고 fallback 문구를 노출한다.
- Vite/one-app 모두 동일 필드/문구 정책 사용
  - `summaryText`: 현재 상태 요약
  - `cautionText`: 행동 가이드
  - `friendlyText`: 친화 문구

### 3.5 완료조건(Definition of Done)

- Vite/one-app 홈에서 날씨 카드가 동일하게 보인다.
- BE가 외부 실패 상황에서도 `200 + fallback payload`를 반환한다.
- FE/BE 필수 게이트 통과
  - FE: `app:type/lint/test`, `nextjs:type/lint/test`
  - BE: `:application:test`, 날씨 endpoint docs test

### 3.6 예외정책

- Redis 장애 시: 캐시 생략하고 API 직접 호출, 실패하면 fallback 문구 반환
- 외부 API 지연/실패 시: stale 또는 fallback 반환
- Station ID 불일치 시: 도메인 예외 반환(`INVALID_DOMAIN`)

## 4. 검증 결과

- 본 문서는 구현 전 PM 기준 명세다.
- 구현 후 검증 항목
  - API 응답 스냅샷 비교(정상/외부 실패/Redis 실패)
  - 홈 화면 시나리오 점검(정상/지연/오류)
  - 게이트 로그 첨부
