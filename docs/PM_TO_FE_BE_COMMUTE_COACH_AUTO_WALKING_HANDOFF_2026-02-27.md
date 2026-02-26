# PM -> FE/BE 핸드오프: 출퇴근 코치 자동 도보분 연동 (2026-02-27)

## 목적

- 막차 리스크와 출퇴근 코치의 계산 기준을 통일해 사용자 신뢰도를 높인다.
- 권장 출발 시각 계산 시 실제 도보 이동 시간을 기본 반영한다.

## 구현 지시

### BE

1. `GET /v1/members/commute-coach/today` 응답에 `walkingMeta` 추가.
2. 추천 경로의 출발/도착 역 기준으로 도보분 조회:
   - 즐겨찾기 메타 존재 시 `USER_PROFILE`
   - 미존재 시 `DEFAULT(15분)`
3. 계산식 변경:
   - `requiredMinutes = estimatedMinutes + transferBuffer + sourceWalking + destinationWalking`
4. `riskReasons`에 도보 반영 문구 추가.
5. 문서/테스트:
   - MemberControllerDocsTest response fields 확장
   - MemberServiceTest에 fallback/프로필 반영 케이스 추가

### FE (vite / one-app 공통)

1. CommuteCoach 타입에 `walkingMeta` 추가.
2. 홈 출퇴근 코치 카드 노출 규칙:
   - `도보 합계 n분 반영`
   - `출발 <역> n분(프로필|기본값) · 도착 <역> n분(프로필|기본값)`
3. `walkingMeta`가 없으면 기존 카드 렌더링 유지(회귀 방지).

## 검수 포인트

- 동일 사용자/동일 경로에서 막차 리스크와 출퇴근 코치 모두 프로필 도보분 기준으로 계산되는지 확인.
- 도보 정보 미설정 사용자도 에러 없이 기본값으로 결과를 받는지 확인.
- Vite/one-app 카드 문구와 구조가 동일한지 확인.
