# PM -> FE/BE 핸드오프: 역 주변 여행정보 확장 V2 (2026-02-26)

## 1. 미흡한 부분

- 주변 장소 정보가 `openNow` 중심이라 실제 의사결정(지금 방문 가능/혼잡 회피/정확한 위치 신뢰)에 필요한 컨텍스트가 부족함.

## 2. 개선 포인트

- `POI 정확도 + 운영시간 + 혼잡도`를 공통 계약으로 확장하고, 경로탐색과 홈/타임라인 화면에서 동일하게 노출.

## 3. 개발 진행

### 3.1 BE 작업

1. 대상 API

- `GET /v2/stations/nearby-places`
- `GET /v3/subway/routes/search` (`nearbyEssentials.items[]`)

2. 신규 필드

- `poiAccuracyScore: number`
- `poiAccuracyReason: string`
- `operatingHours: string`
- `crowdLevel: LOW|MEDIUM|HIGH|VERY_HIGH`
- `crowdUpdatedAt: string(ISO offset datetime)`

3. 테스트

- `StationNearbyPlacesControllerDocsTest` 갱신
- `StationControllerDocsTest`(route v3) 갱신
- 생성기 단위 테스트(추천 데이터 생성) 보강

### 3.2 FE 작업

1. one-app

- `/subway/timeline`의 `nearbyEssentials.items` 렌더 확장
- 라벨 규칙:
  - `crowdLevel`: `여유/보통/혼잡/매우 혼잡`
  - `operatingHours` 없으면 `운영시간 정보 없음`
  - `poiAccuracyScore` 없으면 `정확도 정보 없음`

2. vite

- `/subway/timeline` 동일 반영
- 홈 `TrainRealTimes` 주변정보 패널에도 `운영시간·혼잡·정확도` 2차 정보 노출
- `packages/mock-api`의 `/v2/stations/nearby-places` 응답을 신규 필드로 동기화

## 4. 검증 결과 (요구)

1. FE 게이트

- `NX_DAEMON=false pnpm nextjs:type`
- `NX_DAEMON=false pnpm nextjs:lint`
- `NX_DAEMON=false pnpm nextjs:test`
- `NX_DAEMON=false pnpm app:type`
- `NX_DAEMON=false pnpm app:lint`
- `NX_DAEMON=false pnpm app:test`

2. BE 게이트

- `./gradlew --no-daemon :application:test --tests '*StationNearbyPlacesControllerDocsTest'`
- `./gradlew --no-daemon :application:test --tests '*StationControllerDocsTest'`

## 5. 리스크/주의사항

- `ahhachul_backend`의 기존 변경 파일 2개(`application-test.yml`)는 이번 작업 범위에서 제외하고 touch 금지.
- 신규 필드는 optional이 아니라 기본 제공을 원칙으로 하되, FE는 누락 fallback 문구를 반드시 구현.
