# PM -> FE/BE 핸드오프: 접근성 라우팅 통합 고도화 (2026-02-26)

## 1. 미흡한 부분

1. 경로탐색 결과가 실제 탑승 행동(칸 선택/환승 동선/혼잡 회피)으로 이어지지 않음.
2. 접근성 모드(휠체어/유모차/엘리베이터)가 경로 계산에 직접 반영되지 않음.
3. 주변 필수 정보(편의점/화장실/ATM/늦은 식당) 신뢰도 표기가 부족함.
4. 외국인 사용자를 위한 긴급/분실 신고 원클릭 진입이 부족함.

## 2. 개선 포인트

1. 경로 API 응답을 "선택 + 실행" 중심으로 확장한다.
2. FE 두 앱(one-app/vite)에서 동일 구조로 렌더링한다.
3. 데이터가 부족해도 빈 화면 대신 fallback 정보를 유지한다.

## 3. 개발 진행

## 3.1 BE 작업 지시

1. 대상 API: `GET /v3/subway/routes/search`
2. Query 추가
   - `accessibilityMode`
   - `crowdingPreference`
   - `luggageMode`
   - `travelerContext`
   - `locale`
3. Response 추가
   - `result.oneClickActions[]`
   - `result.routes[].accessibilityProfile`
   - `result.routes[].boardingGuide`
   - `result.routes[].crowdingGuide`
   - `result.routes[].nearbyEssentials`
   - `result.routes[].travelModeTags[]`
   - `result.routes[].quality.accessibilityScore`
   - `result.routes[].quality.inStationDifficultyScore`
   - `result.routes[].quality.crowdingComfortScore`
4. 주변정보 추천 확장
   - 필수 카테고리 4종 + 신뢰도 점수/근거 제공
5. 테스트
   - `StationControllerDocsTest`
   - `StationServiceRouteSearchUnitTest`
   - `StationNearbyPlacesControllerDocsTest`
   - `ForeignerModeControllerDocsTest`(원클릭 액션 필드)

## 3.2 FE 작업 지시

1. one-app: `services/one-app/src/app/(main-service)/subway/timeline/page.tsx`
2. vite: `services/ahhachul.com/src/pages/subway/timeline-page.tsx`
3. 입력 UI 추가
   - 접근성 모드
   - 혼잡 선호
   - 짐 모드
   - 이용 맥락
4. 경로 카드 렌더링 추가
   - 접근성 프로파일
   - 탑승칸/환승칸 안내
   - 혼잡도 + 추천 칸
   - 주변 필수정보 + 신뢰도
   - 관광/공항 태그
5. 원클릭 액션
   - 긴급전화/분실신고/민원신고/문구복사 버튼
6. 홈 외국인 가이드 확장
   - 원클릭 액션 버튼 추가
7. 로깅
   - 옵션 변경/액션 클릭 이벤트 로깅 추가

## 4. 검증 결과

1. FE 게이트
   - `NX_DAEMON=false pnpm nextjs:type`
   - `NX_DAEMON=false pnpm nextjs:lint`
   - `NX_DAEMON=false pnpm nextjs:test`
   - `NX_DAEMON=false pnpm app:type`
   - `NX_DAEMON=false pnpm app:lint`
   - `NX_DAEMON=false pnpm app:test`
2. BE 게이트
   - `./gradlew :application:test --tests '*StationControllerDocsTest' --tests '*StationServiceRouteSearchUnitTest' --tests '*StationNearbyPlacesControllerDocsTest' --tests '*ForeignerModeControllerDocsTest' --no-daemon`
3. 문서 게이트
   - `test -s docs/PM_ACCESSIBILITY_ROUTE_ASSIST_SUITE_SPEC_2026-02-26.md`
   - `test -s docs/PM_TO_FE_BE_ACCESSIBILITY_ROUTE_ASSIST_HANDOFF_2026-02-26.md`
   - `rg -q "[^[:space:]]" docs/PM_ACCESSIBILITY_ROUTE_ASSIST_SUITE_SPEC_2026-02-26.md`
   - `rg -q "[^[:space:]]" docs/PM_TO_FE_BE_ACCESSIBILITY_ROUTE_ASSIST_HANDOFF_2026-02-26.md`
