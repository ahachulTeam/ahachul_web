# FE 민원 댓글 동등화 실행 계획 (2026-02-24)

## 1. 미흡한 부분
- one-app 민원 상세는 댓글 UI/연동이 비활성 상태이며, 좋아요/북마크만 제공한다.
- 민원 댓글의 post-scoped 수정/삭제 API 계약 경로가 공통 계약에 없다.

## 2. 개선 포인트
- 커뮤니티 댓글 컴포넌트/상태 패턴을 민원 상세에 동일 적용한다.
- `API_PATHS.complaint.comment(postId, commentId)`를 추가해 계약 일관성을 확보한다.

## 3. 개발 진행
1. `services/one-app` 민원 상세에 댓글 목록/입력/답글/수정/삭제/비공개 작성 구현
2. complaint comment API 유틸 추가(`get/create/update/delete`)
3. invalidate 정책(상세+댓글) 및 에러 문구 처리
4. `services/ahhachul.com` 민원 댓글 회귀 검증

## 4. 검증 결과(계획)
- `pnpm nextjs:type`
- `pnpm nextjs:lint`
- `pnpm nextjs:test`
- `pnpm app:type`
- `pnpm app:lint`
- `pnpm app:test`

## 5. 비범위
- 유실물 댓글 신규 기능 추가 없음(회귀 확인만 수행).
