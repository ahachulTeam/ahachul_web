# PM -> BE 전달서: 유실물 기능 보완 V1

- 작성일: 2026-02-24
- 담당: BE
- Task ID: `RF-1201-BE`
- 원문: `docs/PM_LOST_FOUND_GAP_ANALYSIS_2026-02-24.md`

## 0. 목표

- 유실물 댓글/목록 계약을 FE가 안정적으로 소비할 수 있도록 API 스코프, 성능, 에러 규칙을 정리한다.

## 1. 구현 범위 (P0)

1. 유실물 댓글 수정/삭제 scoped 경로 제공

- `PATCH /v1/lost-posts/{lostId}/comments/{commentId}`
- `DELETE /v1/lost-posts/{lostId}/comments/{commentId}`
- 댓글이 해당 `lostId` 소속이 아니면 오류 반환

2. 댓글 조회 sort 안정화

- `sort` 미입력 시 기본값(`createdAt,asc`) 적용 또는 명시적 400 정책 문서화

3. 권한/오류 규칙 명시

- 본인 댓글만 수정/삭제 가능
- 필수 오류코드 매핑 표 제공(`400/403/404`)

## 2. 구현 범위 (P1)

1. 유실물 목록 조회 성능 개선

- `commentCnt` 계산 N+1 제거(배치 집계/프로젝션)
- 대표 이미지 조회 N+1 완화

2. DTO 정합성 개선

- `UpdateLostPostDto.Request`의 body `id` 중복 제거(점진적 하위호환 가능)

3. API 문서 보강

- RestDocs/Swagger에 요청 파라미터(`subwayLineIds`, `sort`)와 예외 응답 샘플 추가

## 3. 성능/품질 게이트

1. 목록 API: pageSize=10 기준 p95 회귀 없음
2. 댓글 API: 수정/삭제 권한 우회 불가
3. 문서 테스트: 신규 endpoint 문서화 누락 없음

## 4. 테스트 기준

1. Controller Docs Test

- 유실물 댓글 scoped PATCH/DELETE 문서화

2. Service Test

- 소속 검증, 권한 검증, 예외 케이스

3. 통합 테스트

- 목록 조회 성능 개선 로직 회귀 검증

## 5. 산출물

1. 구현 커밋
2. 테스트 로그
3. API 계약 문서(요청/응답/오류)
4. FE 공유용 변경사항 요약(브레이킹 여부 포함)
