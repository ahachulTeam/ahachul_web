# PM -> FE 핸드오프: 홈 역/호선 커뮤니티 진입 확장 (2026-02-25)

## 1. 미흡한 부분

- 홈에서 커뮤니티로 들어갈 때 역/호선 맥락이 사라진다.
- 사용자가 원하는 `내 역`, `내 호선` 기반 커뮤니티로 바로 이동하기 어렵다.

## 2. 개선 포인트

- 홈에 인기글 섹션 2개 추가:

1. `{선택 역} 커뮤니티 인기글`
2. `{선택 호선} 커뮤니티 인기글`

- 각 섹션의 `더보기`는 독립 페이지로 이동:

1. 역: `community/station/{stationId}`
2. 호선: `community/line/{subwayLineId}`

- 독립 페이지에서도 기존 커뮤니티와 동일한 필터 구조를 유지한다.

## 3. 개발 진행

### 3.1 one-app 작업

- 파일 후보

1. `services/one-app/src/app/_components/HomeViteParity.tsx`
2. `services/one-app/src/app/(main-service)/community/station/[stationId]/page.tsx` (신규)
3. `services/one-app/src/app/(main-service)/community/line/[subwayLineId]/page.tsx` (신규)

- 구현 규칙

1. 홈 섹션 데이터는 기존 `community-hot-posts` 기반으로 조회
2. `더보기`는 locale-aware 경로로 이동
3. 독립 페이지는 기존 `CommunityPosts`, `FilterList`를 재사용하되 URL 초기 필터를 반영

### 3.2 vite 작업

- 파일 후보

1. `services/ahhachul.com/src/pages/home/page.tsx`
2. `services/ahhachul.com/src/components/domain/home/panel/*` (신규 섹션 컴포넌트 추가)
3. `services/ahhachul.com/src/pages/community/station.tsx` (신규)
4. `services/ahhachul.com/src/pages/community/line.tsx` (신규)
5. `services/ahhachul.com/src/pages/community/index.ts` / `src/constants/path.ts` / `src/stackflow.config.ts`

- 구현 규칙

1. 기존 `useFetchCommunityList`/커뮤니티 필터 구조 재사용
2. 신규 Activity 라우트 명시:

- `CommunityStationPage`
- `CommunityLinePage`

3. 홈 섹션 링크는 Stackflow Link로 해당 Activity 진입

### 3.3 BE 협의 결과

- 결론: 이번 범위는 FE 단독 구현
- 사유: 기존 API 스펙으로 필터 조회 가능

## 4. 검증 결과

### 4.1 FE 게이트

- one-app: `NX_DAEMON=false pnpm nextjs:type && NX_DAEMON=false pnpm nextjs:lint && NX_DAEMON=false pnpm nextjs:test`
- vite: `NX_DAEMON=false pnpm app:type && NX_DAEMON=false pnpm app:lint && NX_DAEMON=false pnpm app:test`

### 4.2 수동 확인

1. 홈에서 역/호선 인기글 섹션 노출
2. 더보기 클릭 시 각 독립 페이지 이동
3. 독립 페이지 필터 조작 시 목록 정상 갱신
4. 기존 `/community` 회귀 없음
