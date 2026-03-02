# PM_TO_FE_BE_HOME_PUBLIC_STORY_FEED_HANDOFF_2026-03-03

## 1. 미흡한 부분

- 홈 화면에서 사용자 스토리가 보이지 않아 실시간 커뮤니티 체감이 약했다.
- 스토리 기능이 마이페이지 내부에 고립되어 신규/복귀 사용자 유입 동선이 약했다.

## 2. 개선 포인트

- 홈에 공개 스토리 피드를 노출해 콘텐츠 발견성을 높인다.
- 사용자 역/호선 맥락 기반 우선 조회로 관련도 높은 스토리를 먼저 노출한다.
- “홈 요약 -> 스토리 뷰어 -> 작성자 프로필”로 탐색 깊이를 제공한다.

## 3. 개발 진행

### FE 전달

- 홈 화면에 `스토리 피드` 섹션 추가
  - 로딩/에러/빈 상태 문구 포함
  - 원형 썸네일 horizontal list
  - 탭 시 오버레이 뷰어 노출
  - 작성자 프로필 이동 버튼 제공
- API 계약
  - `GET /v2/stories/public?limit={n}&stationId={id?}&subwayLineId={id?}`
- 쿼리 정책
  - 기본 `limit=12`
  - 역/호선 값은 있으면만 전달
  - 스토리 생성/삭제 후 목록 invalidate

### BE 전달

- 엔드포인트 구현
  - `GET /v2/stories/public`
- 규칙
  - `limit` 범위 보정(1~60)
  - `StoryStatusType.CREATED`만 조회
  - `stationId`, `subwayLineId` 선택 필터 적용
  - `createdAt DESC`
- 문서 테스트
  - 요청/응답 필드 문서화 포함

## 4. 검증 결과

- FE(Vite) 게이트 통과
- FE(one-app) 게이트 통과
- BE 문서 테스트 통과(`StoryControllerDocsTest`)
- mock API 계약 테스트에 신규 경로 추가 완료
