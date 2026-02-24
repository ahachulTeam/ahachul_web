# FE one-app 동등화 2차 B (딥링크/설정/뉴스 라우트)

## 1. 미흡한 부분

- Vite에서 접근 가능한 일부 경로가 one-app에서는 404로 끊기는 문제가 남아 있었다.
  - `/comments/:commentId/edit`, `/comments/:commentId/reply`
  - `/me/setting`, `/me/setting/account`
  - `/setting`, `/subway`, `/news/:newsId`
  - `/login/settings/nickname`, `/login/settings/subway`

## 2. 개선 포인트

- one-app에서 누락 경로를 전부 라우팅 가능 상태로 복구한다.
- 기능이 이미 다른 경로에 존재하는 경우에는 안전한 redirect/안내 페이지로 연결해 사용자 이탈을 줄인다.
- 딥링크 재진입 시 최소 안내와 복귀 경로를 제공해 UX 공백을 방지한다.

## 3. 개발 진행

- 누락 라우트 추가:
  - `setting/page.tsx` -> `/me` redirect
  - `subway/page.tsx` -> `/subway/map` redirect
  - `me/setting/page.tsx`, `me/setting/account/page.tsx` -> `/me` redirect
  - `comments/[commentId]/edit|reply/page.tsx` 안내 + 복귀 경로 처리
  - `news/[newsId]/page.tsx` 상세 placeholder 추가
  - `login/settings/nickname|subway/page.tsx` alias redirect 추가

## 4. 검증 결과

- FE 게이트 예정:
  - `NX_DAEMON=false pnpm nextjs:type`
  - `NX_DAEMON=false pnpm nextjs:lint`
  - `NX_DAEMON=false pnpm nextjs:test`
- 문서 비어있지 않음 검증:
  - `test -s docs/FE_VITE_TO_ONEAPP_PARITY_PHASE2_B_2026-02-24.md`
  - `rg -q "[^[:space:]]" docs/FE_VITE_TO_ONEAPP_PARITY_PHASE2_B_2026-02-24.md`
