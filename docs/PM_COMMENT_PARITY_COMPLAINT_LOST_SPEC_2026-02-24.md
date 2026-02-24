# PM 민원/유실물 댓글 기능 동등화 명세서 (2026-02-24)

## 1. 미흡한 부분
- 유실물(Lost): 커뮤니티와 유사한 댓글 기능(목록/작성/수정/삭제/대댓글/비공개)이 이미 구현되어 있음.
- 민원(Complaint): 댓글 기능이 부분 구현 상태임.
  - BE: `GET /v1/complaint-posts/{id}/comments`, `POST /v1/complaint-posts/{id}/comments`만 노출되어 post-scoped 수정/삭제 API 부재.
  - FE(one-app): 민원 상세에 댓글 목록/입력/수정/삭제/대댓글 UI가 없음.
  - API 계약: complaint에 `comment(postId, commentId)` 경로가 없어 타입 안전한 post-scoped 수정/삭제 연동이 불가.

## 2. 개선 포인트
- 목표: 민원 댓글 기능을 커뮤니티와 동일 수준으로 정합화.
- 범위:
  1. BE: 민원 댓글 수정/삭제 post-scoped API 추가 및 문서/테스트 보강
  2. FE(one-app): 민원 상세 댓글 UI/상태관리/권한 처리 커뮤니티 수준으로 확장
  3. FE(vite): 기존 동작 회귀 검증 및 공통 API 계약 정합화

## 3. 개발 진행(할당 지시)
### BE 할당
- API 추가
  1. `PATCH /v1/complaint-posts/{postId}/comments/{commentId}`
  2. `DELETE /v1/complaint-posts/{postId}/comments/{commentId}`
- 정책
  1. 댓글 수정/삭제 권한은 기존 CommentUseCase 정책을 따름
  2. postId와 commentId 스코프 불일치 시 실패 처리
- 테스트/문서
  1. 컨트롤러 docs test 추가
  2. 예외 케이스(타 게시글 댓글 접근) 테스트 추가

### FE 할당
- one-app
  1. 민원 상세에 댓글 목록/작성/수정/삭제/답글/비공개 작성 UI 추가
  2. 로그인/권한/에러 처리 문구는 커뮤니티 패턴 재사용
  3. 댓글 변경 시 detail/comments query invalidate 처리
- 공통 계약
  1. `API_PATHS.complaint.comment(postId, commentId)` 추가
  2. complaint comment API 유틸 정비
- vite
  1. 민원 댓글 플로우 회귀 테스트

## 4. 검증 결과(완료 조건)
1. 민원 상세에서 댓글 생성/수정/삭제/답글/비공개가 커뮤니티와 동일하게 동작한다.
2. BE API 문서 테스트가 통과한다.
3. one-app 타입체크/린트/테스트가 통과한다.
4. 회귀로 유실물 댓글 동작이 깨지지 않는다.

## 5. 비범위
- 유실물 댓글 신규 개발은 비범위(현행 유지 + 회귀 검증만 수행).
