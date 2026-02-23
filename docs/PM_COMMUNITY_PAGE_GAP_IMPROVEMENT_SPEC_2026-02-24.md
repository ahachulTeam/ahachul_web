# PM 기능명세서: 커뮤니티 페이지 보완/개선 백로그

- 작성일: 2026-02-24
- 범위: `services/one-app` 커뮤니티 상세/댓글 UX 및 API 연동 완성도
- 목적: 커뮤니티 상세에서 댓글 작성/수정/삭제/답글 등 핵심 상호작용을 실제 동작 가능한 상태로 끌어올린다.

## 1. 현재 문제 진단 (코드 근거)

1. 댓글 영역이 상세 화면에 실제 마운트되지 않음

- 근거: `services/one-app/src/app/(main-service)/community/[id]/_components/CommunityDetail.tsx:77`

2. 댓글 카드에 액션 UI는 있으나 실제 이벤트/메뉴 로직 없음

- 근거: `services/one-app/src/components/Comment/CommentCard.tsx:26`

3. 댓글 입력 컴포넌트의 취소/등록/비공개 토글 상태 관리 미구현

- 근거: `services/one-app/src/components/Comment/CommentTextField.tsx:42`

4. 댓글 API 계약에 `수정(PATCH)`/`삭제(DELETE)` 경로가 없음

- 근거: `packages/http/src/api-contract.ts:34`

5. 상세 화면에서 댓글 수(`commentCnt`)와 실제 댓글 목록 동기화 규칙 부재

- 근거: `services/one-app/src/app/(main-service)/community/[id]/_components/CommunityDetail.tsx:77`

## 2. 이번 개선 목표

1. 커뮤니티 상세에서 댓글 목록/작성/답글 작성까지 최소 기능(MVP) 동작
2. 댓글 수정/삭제 플로우 및 권한 조건(작성자 본인만) 명확화
3. API 실패 시 사용자 경험(토스트/재시도/낙관적 업데이트 롤백) 표준화

## 3. 기능 요구사항

### 3.1 댓글 작성/목록 (P0)

1. 상세 진입 시 댓글 목록 조회
2. 댓글 작성 후 목록 즉시 반영
3. 답글(대댓글) 작성 지원
4. 빈 목록 상태 문구 표시

### 3.2 댓글 수정/삭제 (P0)

1. 본인 댓글만 `수정`/`삭제` 메뉴 노출
2. 수정 시 인라인 편집 모드 진입, 저장/취소 동작
3. 삭제 시 확인 모달 후 소프트 삭제 반영
4. 삭제된 댓글은 "삭제된 댓글입니다." 형태 유지

### 3.3 오류/상태 처리 (P1)

1. 네트워크 오류: 토스트 + 재시도 버튼
2. 중복 제출 방지: 저장 중 버튼 비활성화
3. 낙관적 업데이트 실패 시 롤백

### 3.4 접근성/품질 (P1)

1. 댓글 액션 메뉴 키보드 접근 가능
2. 스크린리더용 버튼 라벨 제공
3. 장문 댓글 렌더링 성능 저하 방지(가상화는 2차)

## 4. API 계약 요구사항 (BE 협업)

1. `GET /v1/community-posts/{postId}/comments` (기존)
2. `POST /v1/community-posts/{postId}/comments` (신규 또는 기존 확인)
3. `PATCH /v1/community-posts/{postId}/comments/{commentId}` (신규)
4. `DELETE /v1/community-posts/{postId}/comments/{commentId}` (신규)

### 에러 코드 정책

1. 권한 없음: 403
2. 댓글 없음: 404
3. 검증 실패(길이/금칙어): 400

## 5. FE 구현 태스크

1. `CommunityDetail`에 댓글 섹션 실제 연결
2. 댓글 query/mutation 훅 추가(목록/작성/수정/삭제)
3. `CommentCard` 액션 메뉴(수정/삭제/답글) 연결
4. `CommentTextField` 상태/검증/전송 로직 연결
5. 쿼리 무효화 전략 정의(`detail`, `comments`, `commentCnt`)

## 6. QA 승인 기준 (DoD)

1. 댓글 작성/수정/삭제/답글 E2E 시나리오 통과
2. API 실패 시 UI 깨짐 없음
3. 본인/타인 댓글 권한 노출 정책 준수
4. 다국어 문자열 누락 없음
5. 회귀 테스트: 커뮤니티 상세 기존 렌더링(본문/배지/작성일) 유지

## 7. 단계별 일정 제안

1. Phase A (당일): 댓글 목록 + 작성 + 답글
2. Phase B (다음): 수정/삭제 + 권한 처리 + 회귀 테스트
3. Phase C (후속): 신고/차단/관리자 고도화, 댓글 정렬 옵션

## 8. 리스크 및 대응

1. BE API 미정: FE는 어댑터 계층/목업으로 선개발, 계약 확정 후 매핑 교체
2. 낙관적 업데이트 버그: 실패 롤백 단위테스트를 필수 게이트로 설정
3. 대댓글 깊이 증가: 1-depth 고정 정책으로 범위 통제
