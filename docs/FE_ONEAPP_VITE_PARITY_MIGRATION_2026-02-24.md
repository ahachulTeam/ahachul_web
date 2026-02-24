# one-app ↔ vite 기능 동등화 마이그레이션 (2026-02-24)

## 1. 미흡한 부분

- `one-app`에는 존재하지만 `vite(services/ahhachul.com)`에는 누락된 사용자 도메인 기능이 있었다.
- 누락 축은 크게 다음 2가지였다.
  - 프로필 공개/비공개 설정, 프로필 미리보기, 타 사용자 프로필 조회
  - 즐겨찾기 역 기반 추천 경로 조회 및 사용자 경로 저장/삭제
- `vite`의 즐겨찾기 역 저장은 `stationName` 중심으로 동작해 `stationId`를 안정적으로 전달하지 못하는 경로가 있었다.

## 2. 개선 포인트

- API 계약을 one-app 수준으로 맞춘다.
  - `GET /members/{nickname}/profile`
  - `GET /v2/members/bookmarks/routes/recommendations`
  - `GET/POST/DELETE /v2/members/bookmarks/routes`
- `vite`에서도 프로필 공개정책을 직접 설정/검증할 수 있는 사용자 흐름을 제공한다.
- 즐겨찾는 역 저장 시 `stationId`를 우선 보존해 BE 추천 경로 API와 정합성을 맞춘다.

## 3. 개발 진행

### 3.1 API/타입 계층 반영

- `services/ahhachul.com/src/types/user.ts`
  - 프로필 공개정책 필드와 프로필 상세 응답 타입 추가
  - 즐겨찾기 경로 DTO/요청 타입 추가
- `services/ahhachul.com/src/apis/request/user.ts`
  - 프로필 상세 조회 API 추가
  - 즐겨찾기 경로 추천/목록/생성/삭제 API 추가
  - `updateUser`를 공개정책 업데이트까지 처리 가능한 형태로 확장
- `services/ahhachul.com/src/services/user.ts`
  - 관련 query/mutation hook 추가
  - 경로 변경 시 추천/목록 캐시 invalidation 추가

### 3.2 마이페이지/설정 UI 반영

- `services/ahhachul.com/src/components/domain/my/FavoriteRouteCard.component.tsx` 신규
  - 추천 경로 조회
  - 사용자 경로 생성/삭제
  - 수동 새로고침
- `services/ahhachul.com/src/pages/my/page.tsx`
  - `FavoriteRouteCard` 연결
- `services/ahhachul.com/src/pages/my/setting.tsx`
  - 즐겨찾는 역 저장 payload에 `stationId` 포함
- `services/ahhachul.com/src/components/domain/home/headerActions/HomeHeaderActions.component.tsx`
  - 즐겨찾는 역 순서 변경 시 `stationId` 유지

### 3.3 프로필 페이지 반영

- `services/ahhachul.com/src/pages/user/[username]/ProfileOverview.tsx` 신규
  - default/settings/preview 모드 통합
  - 공개정책 토글/저장
  - 프로필 공개 여부/글/댓글 공개 여부에 따른 렌더링 분기
- `services/ahhachul.com/src/pages/user/[username]/*` 신규
  - 프로필/설정/미리보기 활동 페이지 추가
- 라우팅 연결
  - `services/ahhachul.com/src/constants/path.ts`
  - `services/ahhachul.com/src/stackflow.config.ts`
  - `services/ahhachul.com/src/pages/index.ts`
  - `services/ahhachul.com/src/pages/my/account.tsx` 진입 버튼 추가

## 4. 검증 결과

- `vite` 사용자 도메인 기준 핵심 누락 기능(프로필 공개정책, 즐겨찾기 경로)을 one-app과 동등한 수준으로 반영했다.
- 타입/린트/테스트 게이트는 워커 태스크 실행 시점에 `pnpm app:type`, `pnpm app:lint`, `pnpm app:test`로 검증한다.
