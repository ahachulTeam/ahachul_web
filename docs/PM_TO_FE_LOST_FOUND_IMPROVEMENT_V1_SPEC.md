# PM -> FE 전달서: 유실물 기능 보완 V1

- 작성일: 2026-02-24
- 담당: FE
- Task ID: `RF-1201-FE`
- 원문: `docs/PM_LOST_FOUND_GAP_ANALYSIS_2026-02-24.md`

## 0. 목표

- one-app 유실물 기능을 Vite 수준으로 상향하고, 사용자 핵심 플로우(탐색/상세/댓글/권한)를 안정화한다.

## 1. 구현 범위 (P0)

1. 유실물 상세 댓글 섹션 활성화

- 댓글 목록/작성/수정/삭제/답글 연결
- 대상: `services/one-app/src/app/(main-service)/lost-found/[id]/_components/LostFoundDetail.tsx`

2. 목록 필터 파라미터 정합화

- `subwayLineId` -> `subwayLineIds` 계약 정렬
- 대상: `services/one-app/src/app/(main-service)/lost-found/_lib/getLostFoundPosts.tsx`

3. 수정 버튼 권한 노출 처리

- 작성자만 수정 버튼 표시
- 비작성자는 버튼 미노출

4. 댓글 조회 `sort` 파라미터 추가

- 대상: `services/one-app/src/app/(main-service)/lost-found/[id]/_lib/getComments.ts`

## 2. 구현 범위 (P1)

1. 유실물 에디터 하드코딩 문구 i18n 전환 (ko/en/cn/th)
2. 상세 페이지 댓글 프리패치와 실제 렌더 흐름 정합화
3. 추천 섹션 라벨 다국어 및 컨텍스트 정리

## 3. API 계약

1. 목록: `GET /v1/lost-posts` with `lostType`, `subwayLineIds`, `pageSize`, `pageToken`
2. 상세: `GET /v1/lost-posts/{lostId}`
3. 댓글:

- `GET /v1/lost-posts/{lostId}/comments?sort=createdAt,asc`
- `POST /v1/lost-posts/{lostId}/comments`
- 수정/삭제는 이번 스프린트 BE 산출 스펙(`RF-1201-BE`)과 동기화

## 4. 테스트 기준

1. 유실물 목록 필터 E2E

- 호선 필터 적용 시 결과 변화 검증

2. 유실물 상세 댓글 E2E

- 작성/수정/삭제/답글 및 권한 시나리오

3. 단위/통합

- API 파라미터 스냅샷(`subwayLineIds`, `sort`) 고정

4. 회귀

- 등록/수정 플로우 기존 동작 유지

## 5. 산출물

1. 코드 변경 커밋
2. 테스트 로그(`type-check`, `lint`, `test`, 필요 시 `build`)
3. 스크린샷 또는 짧은 시연 영상
4. FE-BE 계약 체크 결과 표
