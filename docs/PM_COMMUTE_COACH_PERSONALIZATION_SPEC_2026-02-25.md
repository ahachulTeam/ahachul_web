# 출근 코치 개인화 명세서 (우선순위 3)

## 1. 미흡한 부분

- 현재 홈 화면은 역/호선 실시간 정보 중심이며, 사용자의 출근 맥락(지금 나가야 하는지, 대체 경로가 필요한지)을 직접 안내하지 못한다.
- 즐겨찾기 역 기반 경로 추천 기능은 `마이페이지`에만 있어, 출근 직전 의사결정(출발 시각, 위험도, 대체안)으로 연결되지 않는다.
- 지연/막차 리스크가 높은 날에도 홈에서 즉시 인지 가능한 요약 카드가 없다.

## 2. 개선 포인트

- 홈 상단에 `출근 코치` 카드를 추가해 매일 한 번에 확인 가능한 의사결정 정보를 제공한다.
- 코치 응답은 아래 4개를 기본 포함한다.
  - `safeDepartureAt`: 권장 출발 시각
  - `departureInMinutes`: 지금 기준 권장 출발까지 남은 분
  - `primaryRoute`: 기본 추천 경로
  - `alternativeRoutes`: 대체 경로 목록(최대 2)
- 위험도(`LOW|MEDIUM|HIGH`)와 권장 이유(`riskReasons`)를 함께 표시해 사용자가 왜 해당 안내를 받았는지 이해할 수 있어야 한다.
- 즐겨찾기 역/경로가 부족한 경우에도 빈 화면 대신 가이드 메시지를 제공한다.

## 3. 개발 진행

### 3.1 BE 스펙

- 신규 API: `GET /v2/members/commute-coach/today`
- 인증: 필수(`@Authentication`)
- Query:
  - `targetArrivalAt` (optional, `HH:mm`, 기본 `09:00`)
  - `timezone` (optional, 기본 `Asia/Seoul`)
- Response(요약):
  - `generatedAt`
  - `targetArrivalAt`
  - `safeDepartureAt`
  - `departureInMinutes`
  - `riskLevel`
  - `riskReasons: string[]`
  - `primaryRoute: FavoriteRouteDto.Route | null`
  - `alternativeRoutes: FavoriteRouteDto.Route[]`
  - `guidanceMessage`
- 계산 정책(MVP):
  - 기본 경로는 즐겨찾기 기반 추천 경로 1순위 사용
  - 버퍼 분(min) = `4 + transferCount * 3`
  - `safeDepartureAt = targetArrivalAt - (estimatedMinutes + buffer)`
  - 위험도:
    - `LOW`: 남은 시간 >= estimated + buffer
    - `MEDIUM`: 남은 시간 >= estimated
    - `HIGH`: 남은 시간 < estimated
  - `alternativeRoutes`는 추천 경로 2~3순위에서 최대 2개 제공

### 3.2 FE 스펙

- one-app:
  - 홈(`HomeViteParity`)에 `출근 코치` 카드 추가
  - 상태: loading / error / no-data / success
  - 핵심 문구:
    - `지금 출발하면 {riskLabel}`
    - `권장 출발 시각 {safeDepartureAt}`
    - `대체 경로 {n}개`
- vite:
  - 홈 패널에 `CommuteCoach` 컴포넌트 신규 추가
  - 카드 정보와 상태 정책을 one-app과 동일하게 맞춘다.
- 양 앱 공통:
  - 에러는 인라인 메시지 + 관측 로깅으로 처리
  - 새로고침 동작(수동) 제공

## 4. 완료 조건/예외 정책

### 4.1 완료 조건

- BE API가 문서/테스트와 함께 배포 가능한 형태로 동작한다.
- one-app/vite 모두 홈에서 출근 코치 카드를 확인 가능하다.
- 즐겨찾기 부족/경로 없음/요청 실패 상황에서 빈 화면 없이 안내 문구를 표시한다.
- FE/BE 역할별 게이트가 통과한다.

### 4.2 예외 정책

- 즐겨찾기 역 2개 미만: `primaryRoute=null`, `guidanceMessage`로 설정 유도
- 추천 경로 0건: `riskLevel=HIGH`, `guidanceMessage`로 마이페이지 경로 저장 유도
- `targetArrivalAt` 형식 오류: `400` 검증 에러 반환(표준 에러 스펙 준수)
