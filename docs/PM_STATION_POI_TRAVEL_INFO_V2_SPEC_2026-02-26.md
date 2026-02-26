# PM 기능 명세서: 역 주변 여행정보 확장 V2 (POI 정확도/운영시간/혼잡 반영)

## 1. 미흡한 부분

- 현재 주변 장소 정보는 `도보 시간 + openNow + 신뢰도 점수` 중심이라, 실제 방문 의사결정(지금 갈 수 있는지/붐비는지/정확한지)에 필요한 정보가 부족하다.
- 운영시간이 `열림/닫힘`만 제공되어, 다음 행동(지금 가면 몇 시까지 가능한지) 판단이 어렵다.
- 혼잡도 정보가 없어 사용자(특히 외국인/관광객/짐 많은 사용자)가 회피 동선을 선택하기 어렵다.

## 2. 개선 포인트

- 주변 장소의 품질을 `POI 정확도`, `운영시간`, `혼잡도` 3축으로 확장한다.
- 단일 주변장소 API(`/v2/stations/nearby-places`)와 경로탐색 V3(`/v3/subway/routes/search`)의 `nearbyEssentials`를 동일 계약으로 맞춘다.
- FE는 카드/리스트 렌더에서 3축 정보를 압축 노출하고, 데이터 부족 시 명시적인 fallback 문구를 표준화한다.

## 3. 개발 진행

### 3.1 API 계약 (BE)

1. `GET /v2/stations/nearby-places`

- 기존 필드 유지 + `result.places[]` 확장:
  - `poiAccuracyScore` (Int, 0~100)
  - `poiAccuracyReason` (String)
  - `operatingHours` (String, 예: `24시간`, `09:00-22:00`)
  - `crowdLevel` (`LOW|MEDIUM|HIGH|VERY_HIGH`)
  - `crowdUpdatedAt` (ISO OffsetDateTime String)

2. `GET /v3/subway/routes/search`

- 기존 필드 유지 + `result.routes[].nearbyEssentials.items[]` 확장:
  - `poiAccuracyScore` (Int, 0~100)
  - `poiAccuracyReason` (String)
  - `operatingHours` (String)
  - `crowdLevel` (`LOW|MEDIUM|HIGH|VERY_HIGH`)
  - `crowdUpdatedAt` (ISO OffsetDateTime String)

### 3.2 UX/노출 기준 (FE)

1. one-app `/subway/timeline`

- 각 POI 항목에 다음 2줄을 최소 노출:
  - 1줄: 카테고리 · 장소명 · 도보 n분
  - 2줄: `영업시간`, `혼잡 레벨`, `POI 정확도 n점`
- 데이터 누락 시:
  - `operatingHours` 없음: `운영시간 정보 없음`
  - `crowdLevel` 없음: `혼잡도 정보 없음`
  - `poiAccuracyScore` 없음: `정확도 정보 없음`

2. vite `/subway/timeline` + 홈 카드(`TrainRealTimes`)

- 동일 정보축으로 렌더링해 앱 간 해석 차이를 제거한다.
- 홈에서는 공간 제약이 있으므로 핵심만 압축:
  - 배지: 영업 상태
  - 보조문구: 운영시간 · 혼잡 · 정확도

### 3.3 데이터 정책

- 초기 단계는 seed/fallback 기반 휴리스틱 허용.
- 단, API 필드 구조는 운영 전환을 고려해 고정(향후 실제 외부 POI 데이터 소스로 치환 가능해야 함).

## 4. 검증 결과 (완료 기준)

1. BE

- Station Nearby Places docs 테스트 통과
- Route Search V3 docs 테스트 통과

2. FE

- one-app 타입체크/린트/테스트 통과
- vite 타입체크/린트/테스트 통과
- mock-api 계약 동기화 후 로컬 스모크에서 주변정보 섹션 정상 표시

3. 공통

- 문서 비어있지 않음 검증 통과
