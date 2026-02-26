# 출퇴근 코치 자동 도보분 연동 명세 (2026-02-27)

## 1. 미흡한 부분

- 출퇴근 코치의 권장 출발 시각 계산이 `경로 요약(estimatedMinutes, transferBuffer)`만 반영되어 실제 보행 시간이 누락됨.
- 막차 리스크는 즐겨찾기 역 위치 메타를 반영하지만, 출퇴근 코치는 동일 기준을 쓰지 않아 기능 간 일관성이 깨짐.
- FE 카드에서 “왜 이 시각이 추천됐는지”를 설명하는 도보 근거 정보가 부족함.

## 2. 개선 포인트

- 출퇴근 코치도 막차 리스크와 동일하게 `REQUEST(없음) -> USER_PROFILE -> DEFAULT` 전략을 적용한다.
- 추천 경로의 출발역/도착역 각각에 대해 도보분을 계산하고 합계(`totalWalkingMinutes`)를 `requiredMinutes`에 반영한다.
- FE 카드에 합계/역별 도보분/소스(프로필, 기본값)를 노출해 계산 근거를 사용자에게 제공한다.

## 3. 개발 진행 범위

### 3.1 BE

- 응답 DTO 확장
  - `walkingMeta.totalWalkingMinutes`
  - `walkingMeta.source.{stationId,stationName,walkingMinutes,walkingMinutesSource,walkingMinutesUpdatedAt}`
  - `walkingMeta.destination.{...}`
- 서비스 로직 확장
  - 즐겨찾기 역 도보 메타 조회
  - 프로필값 없으면 `DEFAULT=15`분 적용
  - `requiredMinutes = estimatedMinutes + transferBuffer + totalWalkingMinutes`
  - 위험 사유에 도보 반영 문구 추가
- 테스트/문서
  - MemberService 테스트: 기본값 fallback, 프로필 메타 반영 케이스 추가
  - MemberControllerDocsTest: `walkingMeta` 응답 필드 문서화

### 3.2 FE(vite + one-app)

- 타입 계약 동기화
  - `CommuteCoachWalkingMinutesSource = USER_PROFILE | DEFAULT`
  - `CommuteCoachWalkingLeg`, `CommuteCoachWalkingMeta`
- UI 반영
  - 출퇴근 코치 카드에 `도보 합계 n분 반영`
  - `출발역 n분(프로필/기본값) · 도착역 n분(프로필/기본값)` 표시

## 4. 완료 조건

- 출퇴근 코치 API 응답에 `walkingMeta`가 포함되고 FE 양 앱에서 동일하게 렌더링된다.
- 즐겨찾기 도보분이 있는 경우 `USER_PROFILE`, 없으면 `DEFAULT`가 내려간다.
- 필수 게이트 통과:
  - FE: type/lint/test
  - BE: compile + docs test(환경 허용 범위 내 서비스 테스트)
