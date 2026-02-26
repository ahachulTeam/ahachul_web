# Vite vs one-app 전수 동등화 점검 (2026-02-27)

## 1. 미흡한 부분

- 레거시 Vite 경로(`/my/*`, `/lostFound/*`, `/notification/*`, `/subway/*-page`, `/comment/*`)로 one-app에 진입 시 일부가 비정규 경로로 이동하거나 세부 경로가 정확히 매핑되지 않았다.
- query 기반 레거시 진입 경로(`/community/line?subwayLineId=...`, `/community/station?stationId=...`, `/foreigner/hotspot-detail?stationId=...`, `/proofs/detail?proofId=...`)는 one-app에서 직접 지원 경로가 부족했다.
- one-app 민원 상세(`/complaint/:id`)는 서버 prefetch/metadata fetch 실패 시 500으로 터져 Vite의 에러-복구 UX와 동등하지 않았다.
- Vite 알림/알림설정/노선도 페이지는 placeholder 중심이라 one-app 대비 정보 밀도와 구조가 낮았다.

## 2. 개선 포인트

- 경로 호환은 단일 규칙으로 관리하기 위해 `packages/routes`의 레거시 리다이렉트 사전에 명시적으로 추가한다.
- query 기반 레거시 진입은 one-app alias page에서 canonical 경로로 안전하게 redirect한다.
- 상세 페이지 prefetch 실패는 SSR 500 대신 fallback metadata + 클라이언트 경계 복구로 다운그레이드한다.
- Vite placeholder 화면은 one-app과 유사한 최소 운영형 정보 카드 구조로 맞춘다.

## 3. 개발 진행

### 3.1 경로 호환(레거시 -> canonical)

- 파일: `packages/routes/src/index.ts`
- 추가한 핵심 매핑:
  - `/my/account` -> `/me/setting/account`
  - `/my/setting` -> `/me/setting`
  - `/my/delay-center` -> `/delay-center`
  - `/notification/setting` -> `/notifications/settings`
  - `/talk/setting` -> `/talk/settings`
  - `/subway/map-page` -> `/subway/map`
  - `/subway/timeline-page` -> `/subway/timeline`
  - `/subway/daily-vote-hub-page` -> `/daily-votes`
  - `/comment/*` -> `/comments/*` prefix

### 3.2 one-app alias page 추가(query 기반 레거시 처리)

- `services/one-app/src/app/(main-service)/community/line/page.tsx`
- `services/one-app/src/app/(main-service)/community/station/page.tsx`
- `services/one-app/src/app/(main-service)/subway/daily-vote-page/page.tsx`
- `services/one-app/src/app/(main-service)/subway/daily-vote-station-page/page.tsx`
- `services/one-app/src/app/(main-service)/foreigner/hotspot-detail/page.tsx`
- `services/one-app/src/app/proofs/detail/page.tsx`

### 3.3 one-app 상세 페이지 500 복구 처리

- 파일:
  - `services/one-app/src/app/(main-service)/complaint/[id]/page.tsx`
  - `services/one-app/src/app/(main-service)/community/[id]/page.tsx`
  - `services/one-app/src/app/(main-service)/lost-found/[id]/page.tsx`
- 변경:
  - `generateMetadata`에서 fetch 실패 시 fallback metadata 반환
  - `prefetchQuery` 실패를 try/catch로 흡수하여 SSR 500 방지

### 3.4 Vite 정보 페이지 동등화(placeholder 개선)

- 파일:
  - `services/ahhachul.com/src/pages/notification/page.tsx`
  - `services/ahhachul.com/src/pages/notification/setting.tsx`
  - `services/ahhachul.com/src/pages/subway/map-page.tsx`
- 변경:
  - one-app과 유사한 카드형 안내 UI + 이동 버튼 구성

## 4. 검증 결과

### 4.1 레거시 경로 전수 스모크

- 기준: 주요 44개 경로(`auth/community/lostFound/complaint/my/notification/talk/subway/foreigner/news/proofs/comment/user`)
- 결과:
  - Vite: 전 경로 HTTP 200
  - one-app: 전 경로 5xx 없음(redirect 포함 정상)
  - 기존 치명 이슈 `/complaint/2001` 500 -> 200으로 복구

### 4.2 동작 차이(의도된 차이)

- one-app은 인증 가드가 stricter하여 일부 경로는 로그인 redirect(307) 발생
- 이는 보안 정책 차이이며, 기능 부재/크래시와는 구분된다.
