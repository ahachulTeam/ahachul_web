# PM -> FE/BE 핸드오프: 지하철 길찾기 + 전체 시간표 (2026-02-25)

## 1. 미흡한 부분

- Timeline 화면이 실서비스 기능 없이 placeholder 상태입니다.
- 사용자 기준의 일반 길찾기 API가 없어 즐겨찾기 경로 기능만 재사용되고 있습니다.
- 역/호선 전체 시간표는 단일 API로 취합되지 않아 FE가 다중 호출/예외처리를 직접 해야 합니다.

## 2. 개선 포인트

- BE: 검색형 길찾기 API + 통합 전체 시간표 API 제공
- FE: Vite/one-app 동일 UX와 동일 계약으로 화면 구현
- 공통: 장애 시 fallback 표시 + 빈 화면 금지

## 3. 개발 진행

### 3.1 BE 작업

1. `GET /v2/subway/routes/search`
2. `GET /v2/stations/times/full`
3. 카카오 로그인 OAuth 예외 매핑(500 방지)
4. 단위 테스트 추가

### 3.2 FE 작업

1. API contract 확장(`routes/search`, `stations/times/full`)
2. Vite `SubwayTimelinePage` 구현
3. one-app `/subway/timeline` 구현
4. 전략 선택/대안 경로/요일-방향 시간표 UI 반영

## 4. 검증 결과(요구 게이트)

- FE
  - `pnpm app:type && pnpm app:lint && pnpm app:test`
  - `pnpm nextjs:type && pnpm nextjs:lint && pnpm nextjs:test`
- BE
  - `./gradlew :application:test --tests "*StationService*" --tests "*KakaoMemberClientImplTest"`

## 5. 완료조건

- 로그인 500 미재현
- 길찾기 경로 1개 이상 정상 반환
- 전체 시간표(3요일 x 상/하행) 응답 구조 정상
- Vite/one-app UI 동작 동일
