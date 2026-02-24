# PM 실행 문서: 유실물 기능 리팩토링 + UX 개선 (2026-02-24)

## 0. 범위
- 대상 FE: `services/one-app` 유실물 목록/상세/댓글 작성 UX
- 대상 BE: 유실물 댓글/목록 성능 및 스코프 검증 로직
- 이번 배포는 **기능 추가보다 신뢰성/사용성 개선**에 초점을 둔다.

## 1. 미흡한 부분
1. FE 상세 화면에서 상태 맥락 부족
- `COMPLETE` 상태 게시글이 일반 게시글과 동일하게 보이며, 사용자가 "이미 해결된 글"인지 즉시 파악하기 어렵다.

2. FE 상세 화면의 이미지 전달력 부족
- 등록 이미지/외부(Lost112) 이미지 확인 동선이 약해서, 실제 물품 식별 UX가 떨어진다.

3. FE 댓글 작성 UX의 인증 가이드 부족
- 비로그인 상태에서 댓글 작성 시도가 가능해 보이며, 실패 원인이 명확히 안내되지 않는다.

4. FE 목록 필터 파라미터의 안정성 부족
- `subwayLineId=0(전체)` 케이스가 BE의 `subwayLineIds`로 그대로 전달될 수 있어 불필요한 오류 위험이 있다.

5. BE 유실물 목록의 댓글 수 계산 N+1 리스크
- 목록 `N건` 조회 시 `countLost`가 항목마다 호출되어 트래픽 증가 구간에서 성능 저하 위험이 존재한다.

6. BE 댓글 답글 생성의 게시글 스코프 검증 누락
- `upperCommentId`가 다른 게시글의 댓글이어도 생성 시점에 명시적으로 차단되지 않는다.

## 2. 개선 포인트
1. FE 상세 상단에 완료 배지/알림 배너 추가
- `status=COMPLETE`일 때 고정 배너로 해결 상태를 즉시 노출한다.

2. FE 상세에 이미지 프리뷰 섹션 강화
- Lost112/일반 게시글 모두 이미지 묶음을 일관 렌더링한다.

3. FE 댓글 인증 유도 UX 도입
- 비로그인 상태에서는 입력창을 비활성화하고 로그인 CTA를 명확히 노출한다.

4. FE 필터 파라미터 정규화
- `lostType`/`subwayLineId`를 안전 파싱하고 `전체(0)`는 API 필터에서 제외한다.

5. BE 댓글 수 배치 집계 API(내부 포트) 도입
- `countLostByPostIds(postIds)`로 목록 댓글 수를 1회 집계한다.

6. BE 답글 스코프 검증 추가
- `createComment`에서 상위 댓글이 요청된 `(postType, postId)`에 실제 속하는지 검사한다.

## 3. 개발 진행 명세
### 3.1 FE 작업 명세
1. `LostFoundDetail.tsx`
- 완료 배너 추가
- 이미지 프리뷰 영역 추가
- 로그인 상태 기반 댓글 입력 제어 및 로그인 링크 노출

2. `getLostFoundPosts.tsx`
- `category -> lostType` 안전 매핑
- `subwayLineId=0` 제외 규칙 적용

3. `LostFoundPosts.tsx`
- 빈 목록 상태 메시지 추가
- locale-aware 링크 적용

4. i18n
- `ko/en/th/cn`에 완료 배너/이미지 섹션/댓글 로그인 유도 문구 추가

5. FE 테스트
- 목록 파라미터 정규화(unit spec) 추가

### 3.2 BE 작업 명세
1. `CommentService.createComment`
- `upperCommentId` 존재 시 `validateBelongsTo(postType, postId)` 강제

2. `CommentReader/CommentPersistence/CustomCommentRepository`
- `countLostByPostIds` 추가

3. `LostPostService.searchLostPosts`
- 댓글 수 조회를 배치 집계 맵으로 치환

4. `UpdateLostPostDto.Request`
- body `id`를 optional로 완화해 경로 변수 단일 기준 유지

5. BE 테스트
- 댓글 답글 스코프 불일치 예외 테스트 추가
- 유실물 목록 댓글 수 정확성 테스트 추가

## 4. 완료 조건 (DoD)
1. FE
- `pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm nextjs:test` 통과
- 유실물 상세에서 상태배너/이미지/비로그인 댓글 UX 확인

2. BE
- 최소 변경 경로 테스트 통과
- `CommentServiceTest`, `LostPostServiceTest`, `LostPostCommentControllerDocsTest` 통과

3. 문서
- 본 문서는 한국어로 작성되고 빈 문서가 아님을 검증

## 5. 리스크 및 대응
1. FE 스타일 회귀
- 기존 클래스 시스템 범위 내 최소 변경으로 적용

2. BE 통합 테스트 환경 편차(H2/Flyway/Testcontainers)
- 변경 경로 대상 테스트를 우선 통과시키고, full suite는 별도 환경에서 추적한다.
