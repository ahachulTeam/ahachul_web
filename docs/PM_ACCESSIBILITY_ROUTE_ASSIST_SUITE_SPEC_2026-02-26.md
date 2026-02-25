# PM 기능 명세서: 접근성 라우팅 + 탑승칸/혼잡/관광/긴급/주변정보 통합 (2026-02-26)

## 1. 미흡한 부분

1. 기존 경로탐색은 `최단/환승/정차` 중심으로, 휠체어/유모차/엘리베이터 우선 등 접근성 제약을 경로 점수에 반영하지 못한다.
2. "어느 칸에 타야 환승이 유리한지"가 경로 결과에 결합되어 있지 않아 실제 이동 시 시행착오가 크다.
3. 혼잡도는 실시간 도착정보와 분리되어 있어, "덜 붐비는 칸" 추천이 경로 선택까지 이어지지 않는다.
4. 공항/관광 사용자(짐 많은 사용자)의 의사결정 요소(엘리베이터, 장거리 보행 회피)가 경로 정책으로 제공되지 않는다.
5. 다국어 긴급/분실 신고가 템플릿 수준에 머물러 "원클릭 액션(즉시 진입/신고)" 경험이 부족하다.
6. 주변 정보는 일반 추천 중심이라 `편의점/화장실/ATM/늦은 시간 식당` 필수 카테고리와 신뢰도 근거 노출이 약하다.

## 2. 개선 포인트

1. `/v3/subway/routes/search`를 "이동 보조 통합 응답"으로 확장한다.
2. 입력 파라미터에 `접근성 모드`, `혼잡 선호`, `짐 모드`, `이용 맥락`, `locale`를 추가한다.
3. 응답에 아래 도메인을 추가한다.
   1. 접근성 프로파일(역사 내 이동 난이도, 계단/엘리베이터 추정)
   2. 탑승/환승 최적 칸 안내(Where should I stand?)
   3. 혼잡도 예측 + 덜 붐비는 칸 추천
   4. 관광/공항 특화 태그
   5. 다국어 긴급/분실 원클릭 액션
   6. 주변 필수 정보 + 신뢰도(점수/근거)
4. FE(one-app/vite) 길찾기 화면에서 위 정보를 동일 UX 레벨로 노출한다.
5. 홈 외국인 가이드에서 긴급/분실 원클릭 버튼을 노출해 즉시 진입 경로를 제공한다.

## 3. 개발 진행

### 3.1 API 계약 (BE)

1. `GET /v3/subway/routes/search` Query 확장
   - `accessibilityMode`: `BALANCED|ELEVATOR_PRIORITY|STAIRS_MINIMIZED|WHEELCHAIR|STROLLER`
   - `crowdingPreference`: `BALANCED|LESS_CROWDED`
   - `luggageMode`: `NORMAL|HEAVY_LUGGAGE|AIRPORT_TRAVEL`
   - `travelerContext`: `COMMUTE|SCHOOL|TRAVEL`
   - `locale`: `ko|en|th|cn` (기본 `ko`)
2. 응답 확장
   - top-level
     - `oneClickActions[]`: 긴급/분실/민원 원클릭 액션
   - route-level
     - `accessibilityProfile`
     - `boardingGuide`
     - `crowdingGuide`
     - `nearbyEssentials`
     - `travelModeTags[]`
   - quality-level
     - `accessibilityScore`
     - `inStationDifficultyScore`
     - `crowdingComfortScore`
3. 기존 필드 하위호환 유지
   - 기존 `quality`/`summary`/`nodes`/`edges` 필드는 삭제하지 않는다.

### 3.2 BE 구현 정책

1. 점수 모델 확장
   - 기존 `transfer/walking/last-train/delay`에 `accessibility/crowding/in-station-difficulty` 가중치 추가
2. 탑승칸 추천
   - 빠른하차 추천 규칙을 재사용해 route 응답에 결합
3. 혼잡도/칸 추천
   - 시간대 + 노선 기반 휴리스틱으로 `predictedLevel`/`lessCrowdedCars` 산정
4. 주변 필수정보
   - 카테고리 고정: `CONVENIENCE_STORE|RESTROOM|ATM|LATE_NIGHT_FOOD`
   - 항목별 신뢰도 점수/근거 문자열 제공
5. 다국어 원클릭 액션
   - 신고 페이지 deeplink + 다국어 payload 템플릿 제공
6. 테스트
   - Station route V3 단위 테스트
   - Station docs 테스트
   - Foreigner docs/서비스 테스트(원클릭 액션 필드 포함)

### 3.3 FE 구현 정책 (one-app/vite 공통)

1. 길찾기 옵션 UI 확장
   - 접근성 모드, 혼잡 선호, 짐 모드, 이용 맥락 선택기 추가
2. 경로 카드 확장
   - 점수 배지(접근성/혼잡/난이도)
   - 탑승칸/환승칸 추천
   - 혼잡도 + 덜 붐비는 칸
   - 주변 필수정보 + 신뢰도
   - 관광/공항 태그
3. 원클릭 액션
   - `긴급전화(112)`, `분실 신고`, `민원 신고`, `긴급 문구 복사` 액션 노출
4. 외국인 가이드
   - 홈 카드에 원클릭 액션 버튼 추가
5. 관찰성
   - 액션 로그(`createActionLogger`)로 경로옵션 변경/원클릭 버튼 클릭 추적

## 4. 검증 결과(완료 조건/예외 정책)

### 4.1 완료 조건

1. BE가 확장 계약으로 응답하고, FE 두 앱이 동일 필드를 렌더링한다.
2. 접근성/혼잡/짐 모드 변경 시 route 점수 또는 추천 내용이 실제로 달라진다.
3. 원클릭 액션이 최소 1개 이상 즉시 실행된다(전화/신고 페이지 이동/복사).
4. 주변 필수정보 4개 카테고리가 신뢰도와 함께 노출된다.

### 4.2 예외 정책

1. 실시간/외부 데이터 부재 시
   - `confidenceLevel=LOW` + 안내 문구 + 휴리스틱 fallback 유지
2. 주변 필수정보 데이터 부족 시
   - 카테고리 유지 + fallback 항목 제공, 빈 화면 금지
3. 원클릭 deeplink 미지원 환경
   - 실패 토스트 + 대체 경로(페이지 이동/복사) 제공
