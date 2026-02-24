# vite -> one-app 역방향 동등화 1차 (2026-02-24)

## 1. 미흡한 부분

- `services/ahhachul.com(vite)` 기준으로 존재하는 일부 라우트/흐름이 `services/one-app(next)`에는 없었다.
- 대표 누락 영역:
  - `hashtag` 검색 엔트리
  - `complaint/panel` 라우트
  - `notifications/settings` 라우트
  - `subway/map`, `subway/timeline` 라우트
  - `talk/*` 레거시 엔트리
- 또한 one-app 커뮤니티 목록 API 어댑터는 `hashTag` 필터 파라미터를 실사용하지 않아, 해시태그 전용 검색 흐름을 바로 만들기 어려웠다.

## 2. 개선 포인트

- 1차는 저위험/즉시효과 영역부터 동등화한다.
  - 누락 라우트를 우선 복구해 진입 경로 단절을 해소
  - `hashTag` 필터를 one-app 커뮤니티 조회 경로에서 직접 지원
- 구조 차이가 큰 항목(예: 작성/수정 전용 페이지의 완전한 UI 동등화)은 2차로 분리해 진행한다.

## 3. 개발 진행

### 3.1 커뮤니티 해시태그 조회 경로 확장

- `services/one-app/src/app/(main-service)/community/_lib/getCommunityPosts.tsx`
  - `hashTag`, `writer` 쿼리 파라미터 전달 추가
  - `hashTag/writer`가 존재하면 `hotList` 대신 `community.list` 엔드포인트를 사용하도록 보정
- `services/one-app/src/app/(main-service)/community/_lib/prefetchPosts.ts`
  - prefetch signature에 `hashTag`, `writer` 반영

### 3.2 누락 라우트 1차 복구

- 신규:
  - `services/one-app/src/app/(main-service)/hashtag/page.tsx`
  - `services/one-app/src/app/(main-service)/complaint/panel/page.tsx`
  - `services/one-app/src/app/(main-service)/subway/map/page.tsx`
  - `services/one-app/src/app/(main-service)/subway/timeline/page.tsx`
  - `services/one-app/src/app/(user)/notifications/settings/page.tsx`
  - `services/one-app/src/app/(user)/talk/page.tsx`
  - `services/one-app/src/app/(user)/talk/[talkId]/page.tsx`
  - `services/one-app/src/app/(user)/talk/settings/page.tsx`

### 3.3 알림 페이지에서 설정 진입 보강

- `services/one-app/src/app/(user)/notifications/page.tsx`
  - `알림 설정` 이동 버튼 추가

## 4. 검증 결과

- one-app 필수 게이트(`pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm nextjs:test`)는 워커 태스크 실행에서 검증한다.
- 문서 빈 파일 게이트를 통과하도록 작성했다.

## 5. 2차 예정 범위

- `community/complaint` 작성/수정 전용 페이지 UX를 vite와 완전 동등화
- `my/setting`, `my/account` 라우트의 one-app형 재설계
- `comments/:commentId/edit|reply` 딥링크 규칙 정합화
