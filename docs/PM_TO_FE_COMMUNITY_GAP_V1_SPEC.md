# PM -> FE 기능명세 전달서 (커뮤니티 댓글 개선 V1)

- 작성일: 2026-02-24
- 담당 팀: FE
- Task ID: `RF-1100-FE`
- 원문 기준: `docs/PM_COMMUNITY_PAGE_GAP_IMPROVEMENT_SPEC_2026-02-24.md`

## 0. 목표

- 커뮤니티 상세에서 댓글 `조회/작성/수정/삭제/답글`을 실제 동작 가능한 수준으로 완성한다.
- API 실패/권한 예외 상황에서도 화면이 깨지지 않도록 상태 처리 규칙을 고정한다.

## 1. 구현 범위 (P0)

1. `CommunityDetail`에 댓글 섹션 실제 마운트
2. 댓글 목록 조회 + 댓글 작성 + 답글 작성
3. 본인 댓글에만 수정/삭제 메뉴 노출
4. 인라인 수정(저장/취소) + 삭제 확인 모달 + 소프트 삭제 표시

## 2. 구현 범위 (P1)

1. 네트워크 오류 토스트 + 재시도 버튼
2. 중복 제출 방지(저장 중 비활성화)
3. 낙관적 업데이트 실패 롤백
4. 접근성(키보드 포커스/스크린리더 라벨)

## 3. 우선 변경 대상

- `services/one-app/src/app/(main-service)/community/[id]/_components/CommunityDetail.tsx`
- `services/one-app/src/components/Comment/CommentCard.tsx`
- `services/one-app/src/components/Comment/CommentTextField.tsx`
- `services/one-app/src/services/community.ts` (또는 동등 레이어)
- `packages/http/src/api-contract.ts` (FE 계약 소비부)

## 4. API 연동 계약

1. `GET /v1/community-posts/{postId}/comments`
2. `POST /v1/community-posts/{postId}/comments`
3. `PATCH /v1/community-posts/{postId}/comments/{commentId}`
4. `DELETE /v1/community-posts/{postId}/comments/{commentId}`

## 5. 권한/상태 규칙

1. 작성자 본인 댓글에만 수정/삭제 액션 노출
2. `403`: 권한 안내 토스트 + 액션 종료
3. `404`: 목록 재조회 후 삭제/수정 상태 정리
4. `400`: 입력값 검증 메시지 노출

## 6. 완료 기준 (DoD)

1. 댓글 작성/수정/삭제/답글 E2E 시나리오 통과
2. 실패 시 UI 깨짐 없음(무한 로딩/중복 제출/버튼 고착 금지)
3. 다국어 문자열 누락 없음
4. 커뮤니티 상세 기존 본문/메타 렌더링 회귀 없음

## 7. FE 산출물

1. 구현 PR(또는 타겟 브랜치 커밋)
2. 스크린샷 또는 짧은 동작 GIF
3. 테스트 로그(`type-check`, `lint`, 댓글 관련 테스트)
4. 회귀 체크리스트 결과
