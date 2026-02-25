# PM -> FE/BE 핸드오프: 출근 코치 개인화

## 1. 미흡한 부분

- 홈 진입 시 사용자가 즉시 확인해야 할 `출발 시각 의사결정` 정보가 없다.
- 경로 추천은 존재하지만 출근 상황으로 재해석한 결과(위험도/권장 시각/대체안)가 없다.

## 2. 개선 포인트

- 홈에서 `출근 코치`를 1패널로 노출한다.
- 권장 출발 시각, 위험도, 추천/대체 경로를 단일 응답으로 받아 렌더한다.
- 실패해도 홈 전체는 정상 동작하고 코치 카드만 우아하게 실패 처리한다.

## 3. 개발 진행

### 3.1 BE 작업

- 엔드포인트
  - `GET /v2/members/commute-coach/today`
- 구현 상세
  - 기존 `getFavoriteRouteRecommendations(limit=3)` 결과 재사용
  - 1순위 경로를 `primaryRoute`, 2~3순위를 `alternativeRoutes`로 구성
  - `targetArrivalAt` 기준 `safeDepartureAt`, `departureInMinutes`, `riskLevel`, `riskReasons` 계산
  - 가이드 문구 `guidanceMessage` 포함
- 테스트
  - `MemberControllerDocsTest`에 API 문서 케이스 추가
  - `MemberServiceTest`에 계산/빈 데이터 케이스 추가

### 3.2 FE(one-app) 작업

- 파일
  - `HomeViteParity.tsx`에 코치 카드 섹션 추가
  - 필요 시 `me/_lib/getMyProfile.ts` 타입/함수 확장
- UX
  - loading: `출근 코치 정보를 계산하는 중입니다.`
  - error: `출근 코치 정보를 불러오지 못했습니다.`
  - no-data: `즐겨찾기 역을 2개 이상 등록하면 출근 코치를 제공할 수 있어요.`
  - success: 위험도 배지 + 권장 출발 시각 + 기본/대체 경로 요약 + 수동 새로고침

### 3.3 FE(vite) 작업

- 파일
  - `components/domain/home/panel/commuteCoach/*` 신규
  - `components/domain/home/panel/index.ts` export
  - `pages/home/page.tsx` 패널 배치
  - `apis/request/user.ts`, `services/user.ts`, `types/user.ts` 타입/쿼리 확장
- UX
  - one-app과 동일 문구/상태 정책 적용

## 4. 검증 결과(목표 게이트)

- FE
  - `NX_DAEMON=false pnpm nextjs:type`
  - `NX_DAEMON=false pnpm nextjs:lint`
  - `NX_DAEMON=false pnpm nextjs:test`
  - `NX_DAEMON=false pnpm app:type`
  - `NX_DAEMON=false pnpm app:lint`
  - `NX_DAEMON=false pnpm app:test`
- BE
  - `./gradlew :application:test --tests '*MemberServiceTest' --tests '*MemberControllerDocsTest'`

## 5. 완료 정의

- 홈에서 코치 카드가 정상 노출되고, 권장 출발 시각/리스크/대체 경로가 표시된다.
- 즐겨찾기 부족/경로 없음/오류 상태에서 빈 문구가 아닌 명확한 안내가 노출된다.
- FE/BE 테스트 게이트를 통과하고 회귀가 없다.
