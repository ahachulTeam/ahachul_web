# PM 기능 명세 V2: 프로필 공개/비공개 설정 + 미리보기 + 타 유저 프로필

## 1. 미흡한 부분

- 현재 프로필 페이지는 본인 정보 확인 중심으로 구성되어 있고, 타 유저 프로필 컨텍스트가 약하다.
- 프로필 항목별 공개 정책(이메일/성별/연령대/작성 글/작성 댓글)을 저장하고 반영하는 기능이 없다.
- 내 프로필이 타인에게 어떻게 노출되는지 사전 확인(미리보기) 기능이 없다.
- 프로필 비공개 정책과 게시판 검색 정책(작성자 검색 결과 노출) 간 경계 규칙이 문서화되어 있지 않다.

## 2. 개선 포인트

- 사용자 스스로 공개 범위를 제어할 수 있어야 한다.
  - 프로필 전체 공개 여부
  - 이메일 공개 여부
  - 성별/연령대 공개 여부
  - 내가 쓴 글 공개 여부
  - 내가 쓴 댓글 공개 여부
- 프로필 페이지는 정책을 해석한 `실제 노출 결과`를 명확히 표시해야 한다.
- 미리보기는 항상 `타인 시점`으로 렌더링되어야 한다.
- 프로필 비공개여도 커뮤니티/민원/유실물의 작성자 검색 결과는 기존 정책대로 유지한다.
  - 즉, 게시판 검색에서 찾히는 것과 프로필 내부 활동 탭 노출은 분리 정책으로 관리한다.

## 3. 개발 진행 명세

### 3.1 BE 구현 명세

1. `GET /v1/members`
- 기존 응답에 공개 정책 필드 추가
  - `profilePublic`, `emailPublic`, `genderAgePublic`, `postsPublic`, `commentsPublic`

2. `PATCH /v1/members`
- 기존 수정 필드 유지: `nickname`, `gender`, `ageRange`
- 공개 정책 수정 필드 추가(모두 optional)
  - `profilePublic`, `emailPublic`, `genderAgePublic`, `postsPublic`, `commentsPublic`

3. `GET /v1/members/{nickname}/profile`
- 인증 optional
- Query
  - `asPublic` (default=false): true면 본인 조회도 타인 기준으로 강제 렌더링(미리보기)
  - `limit` (default=20, max=50): 활동 목록 최대 개수
- Response
  - `profile`: 닉네임, 이메일, 마스킹 이메일, 성별, 연령대, 본인 여부
  - `visibility`: 설정값 + 실제 노출 가능 여부
  - `activities.posts[]`: 작성 글 목록(커뮤니티/민원/유실물 통합)
  - `activities.comments[]`: 작성 댓글 목록(원글 타입/원글 ID 포함)

4. 정책 규칙
- 본인 조회 + `asPublic=false` : 전체 정보 확인 가능
- 본인 조회 + `asPublic=true` : 타인 기준 노출 강제
- 타인 조회 : 저장된 공개정책 기준 노출
- 프로필 비공개 상태에서도 게시판 작성자 검색 결과는 기존대로 유지

### 3.2 FE 구현 명세

1. 프로필 설정 페이지
- 경로: `/user/[username]/settings`
- 기능
  - 공개 정책 토글 5종
  - 저장 시 `PATCH /v1/members`
  - 본인 외 접근 차단

2. 프로필 미리보기 페이지
- 경로: `/user/[username]/preview`
- 기능
  - `GET /v1/members/{nickname}/profile?asPublic=true` 사용
  - 실제 타인 노출 상태 그대로 렌더링

3. 사용자 프로필 페이지
- 경로: `/user/[username]`
- 기능
  - `GET /v1/members/{nickname}/profile`
  - 공개 정책에 따라 계정정보/작성글/댓글 노출
  - 노출된 활동 항목은 원문 상세 페이지 링크 제공

4. 마이페이지 연동
- `/me`에서 `프로필 설정` / `프로필 미리보기` 진입 제공

### 3.3 QA 체크리스트

- 비로그인 상태에서 타 유저 프로필 조회가 가능한지
- 본인 외 사용자가 `/settings` 접근 시 차단되는지
- 공개 정책 저장 후 `/user/[username]` 반영이 즉시 되는지
- `/preview`와 타 계정 시점 화면이 동일한지
- `postsPublic=false`, `commentsPublic=false`일 때 프로필 내부 활동 탭이 비노출되는지
- 작성자 검색(커뮤니티/민원/유실물)에서 기존 검색 동작이 유지되는지

## 4. 완료 조건

- 문서는 한국어이며 비어있지 않다.
- BE: API 계약 + 문서 테스트 + 최소 컴파일 검증 통과
- FE: 타입체크 + 린트 + 테스트 통과
- 최종 보고는 `task id -> worker -> 상태판 반영` 순서를 준수한다.
