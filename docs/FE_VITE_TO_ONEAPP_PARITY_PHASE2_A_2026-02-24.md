# FE one-app 동등화 2차 A (커뮤니티/민원 작성·수정)

## 1. 미흡한 부분

- one-app에서 `community/new`, `community/[id]/edit`, `complaint/new`, `complaint/[id]/edit` 경로가 누락되어 Vite 대비 글 작성/편집 플로우가 단절됨.
- 민원 작성 시 `complaintType`에 따른 `shortContentType` 선택 흐름이 one-app에 없어서 입력 품질이 떨어짐.

## 2. 개선 포인트

- one-app에 누락된 커뮤니티/민원 작성·수정 경로를 명시적으로 복구한다.
- 민원 작성 폼에서 `민원 유형 -> 상세 유형 -> 노선/역 -> 제목/내용` 입력 단계를 강제해 데이터 정합성을 높인다.
- 민원 수정은 현재 API/UX 준비 수준을 고려해 “준비 중” 화면으로 명시하고 대체 경로를 제공한다.

## 3. 개발 진행

- `community`:
  - `community/new/page.tsx` 추가
  - `community/[id]/edit/page.tsx` 추가
  - `CommunityPostEditor` + `upsertPost` 기반 생성/수정 플로우 연결
- `complaint`:
  - `complaint/new/page.tsx` + `ComplaintPostEditor` 추가
  - `complaint/_lib/upsertPost.ts` 추가
  - `complaint/[id]/edit/page.tsx` 추가(준비 중 + 대체 링크)
- 타입/상수:
  - `ComplaintForm.stationId` 추가
  - `complaintShortTypeOptions` 추가

## 4. 검증 결과

- FE 게이트 예정:
  - `NX_DAEMON=false pnpm nextjs:type`
  - `NX_DAEMON=false pnpm nextjs:lint`
  - `NX_DAEMON=false pnpm nextjs:test`
- 문서 비어있지 않음 검증:
  - `test -s docs/FE_VITE_TO_ONEAPP_PARITY_PHASE2_A_2026-02-24.md`
  - `rg -q "[^[:space:]]" docs/FE_VITE_TO_ONEAPP_PARITY_PHASE2_A_2026-02-24.md`
