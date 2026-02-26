# PM -> FE/BE 핸드오프: 프로필 이미지 선택 업로드

## 1. 목표

- 사용자가 선택적으로 프로필 이미지를 업로드해 계정을 꾸밀 수 있도록 지원한다.
- one-app/vite 모두 동일한 동작 품질로 제공한다.

## 2. BE 전달 사항

- 구현 필수
  - `tb_member.image_url` 추가 (nullable)
  - `UpdateMemberCommand`, `UpdateMemberDto`, `GetMemberDto`에 `imageUrl` 반영
  - `MemberService.updateMember`에서 `imageUrl` 저장
- 계약
  - `GET /v1/members` -> `result.imageUrl` optional
  - `PATCH /v1/members` request/response -> `imageUrl` optional
- 테스트
  - `MemberControllerDocsTest` 필드 문서 갱신

## 3. FE 전달 사항

### 3.1 Vite

- 위치: 마이 계정(`my/account`)
- 작업
  - 카메라 버튼 클릭 시 파일 선택
  - presigned 업로드 후 `updateUser({ imageUrl })`
  - 업로드 상태 UX(버튼 disabled, 토스트)

### 3.2 one-app

- 위치: 마이페이지 대시보드(`me`)
- 작업
  - 프로필 카드 내 이미지 미리보기/기본 이니셜 표시
  - 파일 선택 업로드 + `updateMyProfile({ imageUrl })`
  - `myQueryKeys.profile()` invalidate로 즉시 반영

## 4. 리스크/예외

- S3 presigned 응답 포맷 차이(`{url,fields}` vs `{result:{url,fields}}`)를 FE 유틸에서 방어한다.
- 업로드는 성공했지만 멤버 업데이트 실패 시, 실패 메시지와 함께 재시도 유도.

## 5. QA 체크포인트

- 같은 계정으로 업로드 후 재로그인해도 이미지가 유지되는지
- 5MB 초과/비이미지 파일이 차단되는지
- 업로드 실패 시 사용자 메시지가 노출되는지
