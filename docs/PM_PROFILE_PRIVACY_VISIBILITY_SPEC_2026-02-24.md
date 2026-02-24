# PM 기능 명세: 프로필 공개/비공개 + 프로필 활동 공개 정책 V1

## 1. 미흡한 부분

- 현재 프로필 화면은 사실상 내 정보 조회용으로 동작하며, `타 유저 프로필` 맥락이 약하다.
- 프로필 내 공개 범위 정책(이메일/기본정보/내 활동)이 없어 사용자 통제권이 부족하다.
- 프로필 페이지에서 유저 활동(작성 글/댓글)을 정책 기반으로 노출/비노출 제어할 수 없다.
- 내 프로필이 타인에게 어떻게 보이는지 사전 확인(미리보기) 기능이 없다.

## 2. 개선 포인트

- 공개 정책을 유저가 직접 설정할 수 있어야 한다.
  - 프로필 전체 공개 여부
  - 이메일 공개 여부
  - 성별/연령대 공개 여부
  - 작성 글 공개 여부
  - 작성 댓글 공개 여부
- 프로필 페이지는 `정책 반영 결과`를 중심으로 표시한다.
- 내 프로필 미리보기는 "타인이 보는 상태"를 강제 렌더링해야 한다.
- 커뮤니티/민원/유실물의 작성자 검색 경험은 유지한다.
  - 즉, 프로필에서 비공개여도 게시판 검색 결과 노출 정책은 유지(요구사항 반영).

## 3. 개발 진행 명세

### 3.1 BE API 명세

1. `GET /v1/members`
- 기존 응답에 공개 정책 필드 추가
  - `profilePublic`
  - `emailPublic`
  - `genderAgePublic`
  - `postsPublic`
  - `commentsPublic`

2. `PATCH /v1/members`
- 기존 닉네임/성별/연령대 수정 API에 공개 정책 수정 필드 추가(모두 optional)
  - `profilePublic?: boolean`
  - `emailPublic?: boolean`
  - `genderAgePublic?: boolean`
  - `postsPublic?: boolean`
  - `commentsPublic?: boolean`

3. `GET /v1/members/{nickname}/profile`
- 인증 optional (`@Authentication(required=false)`)
- Query
  - `asPublic` (optional, default=false): true면 본인 조회라도 타인 기준으로 강제 렌더링(미리보기)
  - `limit` (optional, default=20, max=50): 활동 목록 개수 제한
- 응답
  - `profile`: 닉네임/이메일/성별/연령대/마스킹 이메일
  - `visibility`: 설정값 + 실제 노출 가능 여부(`profileVisible`, `postsVisible`, `commentsVisible`)
  - `activities.posts[]`: 작성 글 목록(커뮤니티/민원/유실물)
  - `activities.comments[]`: 작성 댓글 목록
- 정책
  - 본인 조회 + `asPublic=false` => 전체 확인 가능
  - 본인 조회 + `asPublic=true` => 타인 기준 노출 강제(미리보기)
  - 타인 조회 => 설정값 기준 노출

### 3.2 FE 명세

1. 프로필 설정 페이지
- 경로: `/user/[username]/settings`
- 기능
  - 공개 정책 토글 5종 제공
  - 저장 시 `PATCH /v1/members`
  - 본인 계정이 아닌 경우 접근 제한

2. 프로필 미리보기 페이지
- 경로: `/user/[username]/preview`
- 기능
  - `GET /v1/members/{nickname}/profile?asPublic=true`로 렌더링
  - 타인에게 보이는 카드/활동 목록 그대로 확인

3. 사용자 프로필 페이지
- 경로: `/user/[username]`
- 기능
  - `GET /v1/members/{nickname}/profile`
  - 공개 정책에 따라 정보/활동 노출
  - 활동 목록의 글/댓글에서 원문 링크 이동

4. 마이페이지 연동
- `/me`에서 설정/미리보기로 이동 가능한 진입 버튼 추가

### 3.3 QA 체크리스트

- 비로그인 상태에서 타 유저 프로필 조회 가능 여부
- 본인 프로필 설정 변경 후 즉시 반영 여부
- `asPublic=true` 미리보기와 타인 계정에서 본 화면 일치 여부
- `postsPublic=false`, `commentsPublic=false`일 때 프로필 내 활동 비노출 확인
- 동일 닉네임으로 게시판 검색 시 기존 작성글 탐색 경로가 유지되는지 확인

## 4. 검증 결과(수용 조건)

- PM 문서가 한국어로 작성되고 비어있지 않다.
- FE/BE 구현에서 아래가 모두 확인된다.
  - 프로필 공개 설정 저장 가능
  - 프로필 미리보기 페이지 동작
  - 타 유저 프로필 + 활동 목록 페이지 동작
  - 프로필 내 활동 비공개 정책이 정확히 반영
  - 게시판 작성자 검색 정책은 기존 동작 유지
