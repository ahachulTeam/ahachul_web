# PM 분석 보고서: 유실물 기능 미흡점/기술 보완/개선안

- 작성일: 2026-02-24
- 작성자: PM
- 분석 범위:
  - FE: `services/one-app`, `services/ahhachul.com`
  - BE: `ahhachul_backend` 유실물/댓글 API

## 0. 결론 요약

- 현재 `ahhachul.com`(Vite)은 유실물 상세의 댓글/상태표시/액션이 비교적 완성되어 있으나,
  `one-app`(Next)에는 동일 기능이 일부 비활성/미연결 상태다.
- 특히 `one-app` 유실물 상세의 댓글 기능 미마운트, 필터 파라미터 불일치, 권한 기반 UI 누락은 사용자 체감 이슈(P0)다.
- BE는 유실물 자체 CRUD는 안정적이나, 댓글 수정/삭제의 리소스 스코프 경로 부재 및 목록 조회 N+1 성능 리스크가 존재한다.

## 1. 현재 구현 스냅샷

### 1.1 FE(one-app)

1. 유실물 목록/상세/등록/수정 화면은 존재
2. 미들웨어로 `/lost-found/new`, `/lost-found/:id/edit` 인증 가드 적용
3. 댓글 UI 컴포넌트는 공용으로 존재하지만 유실물 상세에서는 미연결

### 1.2 FE(ahhachul.com)

1. 유실물 상세에서 댓글 목록/입력/상태표시/권한 연동이 동작
2. 댓글 조회 시 `sort` 파라미터를 명시적으로 포함

### 1.3 BE

1. 유실물 포스트 조회/목록/생성/수정/상태변경/삭제 API 제공
2. 유실물 댓글 조회/생성 API 제공
3. 댓글 수정/삭제는 공통 경로(`/v1/comments/{commentId}`)로만 제공

## 2. 미흡점 진단 (우선순위)

## 2.1 P0 (즉시 보완)

1. 유실물 상세 댓글 기능이 실제 화면에서 비활성

- 근거:
  - `services/one-app/src/app/(main-service)/lost-found/[id]/_components/LostFoundDetail.tsx:103`
  - `services/one-app/src/app/(main-service)/lost-found/[id]/_components/LostFoundDetail.tsx:104`

2. 목록 필터 파라미터 명 불일치로 호선 필터 오동작 가능

- FE 전송: `subwayLineId`
- BE 계약: `subwayLineIds`
- 근거:
  - `services/one-app/src/app/(main-service)/lost-found/_lib/getLostFoundPosts.tsx:22`
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/lost/adapter/web/in/dto/SearchLostPostsDto.kt:14`

3. 상세 화면의 수정 버튼이 작성자 여부와 무관하게 노출

- 근거:
  - `services/one-app/src/app/(main-service)/lost-found/[id]/_components/LostFoundDetail.tsx:66`

4. 댓글 조회 API 호출 시 `sort` 필수 파라미터 누락

- 근거:
  - `services/one-app/src/app/(main-service)/lost-found/[id]/_lib/getComments.ts:15`
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/comment/adapter/web/in/dto/GetCommentsDto.kt:12`

## 2.2 P1 (스프린트 내 보완)

1. 상세 페이지에서 댓글 프리패치는 수행하지만 실제 렌더는 없음(불필요 트래픽)

- 근거:
  - `services/one-app/src/app/(main-service)/lost-found/[id]/page.tsx:66`
  - `services/one-app/src/app/(main-service)/lost-found/[id]/_components/LostFoundDetail.tsx:103`

2. one-app 유실물 에디터의 핵심 문구가 하드코딩(다국어 미흡)

- 근거:
  - `services/one-app/src/app/(main-service)/lost-found/_components/LostFoundPostEditor.tsx:143`
  - `services/one-app/src/app/(main-service)/lost-found/_components/LostFoundPostEditor.tsx:326`

3. 추천 섹션 타이틀이 고정 문자열("추천 습득물")로 컨텍스트/다국어 반영 부족

- 근거:
  - `services/one-app/src/app/(main-service)/lost-found/[id]/_components/RecommendArticles.tsx:13`

## 2.3 P2 (구조 개선)

1. BE 목록 변환 구간에서 댓글 수를 게시글별 개별 조회(N+1)

- 근거:
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/lost/application/service/LostPostService.kt:125`
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/lost/application/service/LostPostService.kt:134`

2. 수정 API Request DTO의 body `id`가 path 변수와 중복

- 근거:
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/lost/adapter/web/in/dto/UpdateLostPostDto.kt:11`
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/lost/adapter/web/in/dto/UpdateLostPostDto.kt:19`

3. 유실물 댓글 수정/삭제의 리소스 스코프 경로 부재

- 현재: `PATCH/DELETE /v1/comments/{commentId}`
- 개선 권장: `PATCH/DELETE /v1/lost-posts/{lostId}/comments/{commentId}`
- 근거:
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/lost/adapter/web/in/LostPostCommentController.kt:17`
  - `application/src/main/kotlin/backend/team/ahachul_backend/api/comment/adapter/web/in/CommentController.kt:17`

## 3. 기술적 보완점

1. FE-API 계약 테스트 고정

- one-app에서 유실물 목록/댓글 API 파라미터를 스냅샷 테스트로 고정
- 최소 항목: `lostType`, `subwayLineIds`, `sort`

2. 댓글 모듈 공용화 수준 재정의

- `ahhachul.com`의 댓글 액션 패턴을 one-app으로 이식하되,
  transport는 app-local 유지, 계약(API_PATHS/QueryKey/타입)만 공유

3. BE 조회 성능 개선

- 목록 응답에서 `commentCnt`/대표 이미지를 projection 또는 배치 조회로 통합
- 10개 페이지 기준 쿼리 수 상한을 명시하고 회귀 검증

4. 에러 표준화

- 댓글 관련 `400/403/404`를 FE 토스트 문구와 1:1 매핑
- 문구/행동 규칙(재시도, 입력 유지, 리프레시)을 공통 표로 고정

## 4. 개선 로드맵

1. Phase A (P0)

- one-app 유실물 상세 댓글 섹션 활성화
- `subwayLineIds` 파라미터 정합화
- 수정 버튼 권한 노출 조건 적용
- 댓글 조회 `sort` 파라미터 적용

2. Phase B (P1)

- 하드코딩 문구 i18n 전환
- 댓글 프리패치/렌더 흐름 최적화
- 추천 섹션 문구/라벨 다국어 정합화

3. Phase C (P2)

- BE 목록 조회 N+1 개선
- 유실물 댓글 scoped PATCH/DELETE 경로 추가
- DTO 중복 필드 정리 및 계약 문서 갱신

## 5. 승인 기준(DoD)

1. one-app 유실물 상세에서 댓글 조회/작성/수정/삭제/답글 E2E 통과
2. 호선 필터 동작이 BE 계약(`subwayLineIds`)과 일치
3. 작성자/비작성자 권한 노출 정책 준수
4. BE 성능 점검: 목록 API 쿼리 수/응답시간 회귀 없음
5. 문구 다국어 누락 없음(ko/en/cn/th)
