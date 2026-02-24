# PM → FE 전달 명세서 (V1)

## 1. 목표

- 아하철의 모든 유통 아티클(커뮤니티/유실물/민원)에서 `좋아요`와 `북마크`를 지원한다.
- 사용자가 누른 좋아요/북마크 이력을 마이페이지에서 히스토리로 확인한다.
- 대상 앱: `services/one-app`, `services/ahhachul.com`.

## 2. 범위

- 상세 페이지 3종

1. 커뮤니티 상세
2. 유실물 상세
3. 민원 상세

- 마이페이지

1. 좋아요 히스토리
2. 북마크 히스토리

## 3. UX 규칙

- 버튼

1. 비활성 상태: `좋아요`, `북마크`
2. 활성 상태: `좋아요 취소`, `북마크 취소`
3. 카운트 표기: `버튼 라벨 + count`

- 비로그인 사용자

1. 버튼 클릭 시 로그인 필요 안내
2. 기존 화면 유지, 강제 이동 없음

- 마이페이지 히스토리

1. 섹션 분리: `좋아요`, `북마크`
2. 항목 정보: 아티클 타입, 제목, 반응 시각
3. 항목 클릭 시 해당 상세 화면 이동
4. 수동 새로고침 버튼 제공

## 4. API 계약 (FE 소비)

- 반응 토글

1. `POST /v1/community-posts/{id}/like`
2. `DELETE /v1/community-posts/{id}/like`
3. `POST /v1/community-posts/{id}/bookmark`
4. `DELETE /v1/community-posts/{id}/bookmark`
5. `POST /v1/complaint-posts/{id}/like`
6. `DELETE /v1/complaint-posts/{id}/like`
7. `POST /v1/complaint-posts/{id}/bookmark`
8. `DELETE /v1/complaint-posts/{id}/bookmark`
9. `POST /v1/lost-posts/{id}/like`
10. `DELETE /v1/lost-posts/{id}/like`
11. `POST /v1/lost-posts/{id}/bookmark`
12. `DELETE /v1/lost-posts/{id}/bookmark`

- 마이페이지 히스토리

1. `GET /v1/members/article-histories?limit=30`

## 5. 상세 응답 반영 필드

- 커뮤니티/유실물/민원 상세 공통

1. `likeCnt`
2. `bookmarkCnt`
3. `likeYn`
4. `bookmarkYn`

## 6. 구현 체크리스트

- one-app

1. 상세 3종 반응 버튼/카운트/토글
2. 마이페이지 히스토리 섹션 렌더링

- ahhachul.com

1. 상세 3종 반응 버튼/카운트/토글
2. 마이페이지 히스토리 카드 추가

## 7. 완료 조건 (DoD)

1. 상세 3종에서 좋아요/북마크 토글이 실제 API와 연동된다.
2. 반응 후 상세 데이터가 invalidate/refetch로 즉시 갱신된다.
3. 마이페이지에서 좋아요/북마크 이력 리스트가 노출된다.
4. 항목 클릭 시 각 도메인 상세 페이지로 이동한다.
5. 타입체크/린트/테스트 게이트 통과.
