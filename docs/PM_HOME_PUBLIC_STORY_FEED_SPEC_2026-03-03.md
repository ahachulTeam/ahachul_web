# PM_HOME_PUBLIC_STORY_FEED_SPEC_2026-03-03

## 1. 미흡한 부분

- 기존 스토리 기능은 마이페이지 중심이라, 홈에서 “지금 공유되는 사용자 분위기”를 바로 확인하기 어렵다.
- 신규 유입 사용자는 스토리 기능 존재 자체를 빠르게 인지하지 못한다.
- 역/호선 맥락 기반 실시간 체감 정보가 홈에서 끊겨 UX 연속성이 약하다.

## 2. 개선 포인트

- 홈 화면에 `공개 스토리 피드` 섹션을 추가해 마이페이지 진입 없이 스토리 콘텐츠를 소비할 수 있게 한다.
- 사용자 즐겨찾기(역/호선) 맥락이 있으면 해당 컨텍스트 기반으로 우선 필터 조회한다.
- 스토리 썸네일 탭 -> 오버레이 뷰어 -> 작성자 프로필 이동까지 3단계 탐색 동선을 제공한다.
- FE/Vite/one-app 모두 동일 API 계약(`/v2/stories/public`)을 사용해 기능 일관성을 유지한다.

## 3. 개발 진행

### 3.1 BE

- 신규 API 추가
  - `GET /v2/stories/public`
  - Query:
    - `limit` (optional, default 12, max 60)
    - `stationId` (optional)
    - `subwayLineId` (optional)
- 응답 스키마
  - `generatedAt`
  - `stories[]`
    - `storyId`, `memberId`, `nickname`, `imageUrl`, `caption`
    - `stationId`, `stationName`, `subwayLineId`, `subwayLineName`
    - `createdAt`
- 조회 조건
  - `status=CREATED`
  - 선택적 역/호선 필터
  - 최신순(`createdAt desc`)
- 문서 테스트
  - `StoryControllerDocsTest#getPublicStories` 추가

### 3.2 FE (Vite)

- 홈 패널에 `StoryFeed` 신규 컴포넌트 추가
  - 로딩/에러/빈 상태/정상 상태 모두 처리
  - 스토리 탭 시 오버레이 뷰어 표시
  - 작성자 프로필 이동 CTA 제공
- `packages/http`에 API path 추가
  - `API_PATHS.story.publicStoriesV2`
- `services/user`에 공개 스토리 query hook 추가
  - 생성/삭제 mutation 후 공개 스토리 쿼리 무효화
- mock API에 `/v2/stories/public` 핸들러 및 계약 테스트 추가

### 3.3 FE (one-app)

- 홈 리뉴얼 컴포넌트에 공개 스토리 피드 섹션 추가
- 동일 API(`/v2/stories/public`) 기반 조회 유틸 추가
- 스토리 목록/뷰어/작성자 프로필 이동 동선 반영

## 4. 검증 결과

- FE(Vite)
  - `NX_DAEMON=false pnpm app:type` 통과
  - `NX_DAEMON=false pnpm app:lint` 통과
  - `NX_DAEMON=false pnpm app:test` 통과
- FE(one-app)
  - `NX_DAEMON=false pnpm nextjs:type` 통과
  - `NX_DAEMON=false pnpm nextjs:lint` 통과
  - `NX_DAEMON=false pnpm nextjs:test` 통과
- BE
  - `./gradlew --no-daemon :application:test --tests '*StoryControllerDocsTest'` 통과

## 5. 완료 조건

- 홈 화면에서 공개 스토리 피드가 노출된다.
- 사용자 맥락(역/호선) 필터가 있으면 우선 반영된다.
- 스토리 오버레이 뷰어와 작성자 프로필 이동이 동작한다.
- FE/BE 게이트 명령이 통과한다.
