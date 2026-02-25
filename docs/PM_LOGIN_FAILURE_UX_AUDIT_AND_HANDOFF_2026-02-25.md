# 로그인 실패 UX 점검 및 FE/BE 핸드오프 (2026-02-25)

## 1. 미흡한 부분

- one-app
  - 소셜 리다이렉트 URL 조회 실패 시 `alert`로만 안내되어 흐름이 끊김.
  - 콜백 실패 시 `/login?error=from_callback`로만 이동하여 실패 원인(코드 만료/토큰 오류/파라미터 오류) 구분이 불가능.
  - 로그인 화면에서 실패 이유를 지속적으로 확인할 수 있는 인라인 UI가 없음.
- Vite (`ahhachul.com`)
  - 소셜 로그인 실패 시 `window.alert` 중심 처리로 사용자 경험이 단절됨.
  - 콜백 실패 시 `SignInPage`로 복귀만 하고 실패 원인 정보가 유실됨.
  - 버튼 중복 클릭 방지(요청 중 비활성화)가 미흡함.

## 2. 개선 포인트

- 공통 정책
  - 실패 안내는 `alert` 대신 로그인 화면 내 인라인 에러 배너로 표준화.
  - 백엔드 응답 코드 기반으로 원인별 문구를 분기:
    - `205`: 권한 코드 만료/무효
    - `206`: 소셜 액세스 토큰 무효/만료
    - 기타: 알 수 없는 오류
  - 로그인 재시도 액션이 자연스럽게 이어지도록 로그인 버튼은 요청 중 비활성화.
- one-app 정책
  - 콜백 오류를 `error query`로 정규화(`invalid_callback_params`, `invalid_authorization_code`, `invalid_access_token`, `unknown`).
  - 다국어 메시지(`ko/en/th/cn`)에 로그인 실패 문구를 명시 추가.
- Vite 정책
  - 콜백에서 `SignInPage`로 복귀할 때 `loginErrorCode`를 함께 전달.
  - 로그인 페이지에서 `loginErrorCode`를 인라인 문구로 렌더링.

## 3. 개발 진행

- FE 반영(one-app)
  - 콜백 실패 코드 파싱/매핑 유틸 추가:
    - `services/one-app/src/app/(auth)/login/_lib/loginError.ts`
  - 콜백 실패 리다이렉트 개선:
    - `services/one-app/src/app/(auth)/login/callback/_components/CallbackRedirect.tsx`
  - 로그인 화면 인라인 에러 노출 및 버튼 비활성화:
    - `services/one-app/src/app/(auth)/login/page.tsx`
    - `services/one-app/src/app/(auth)/login/_components/SocialLogins.tsx`
    - `services/one-app/src/app/(auth)/login/_components/SocialLoginButton.tsx`
  - 다국어 문구 추가:
    - `services/one-app/src/i18n/messages/{ko,en,th,cn}.json`
- FE 반영(Vite)
  - 로그인 에러 코드 유틸 추가:
    - `services/ahhachul.com/src/utils/loginError.ts`
  - 리다이렉트 실패 처리에서 alert 제거 + 코드 매핑:
    - `services/ahhachul.com/src/components/domain/auth/socialLogin/SocialLogin.component.tsx`
    - `services/ahhachul.com/src/components/domain/auth/socialLogin/SocialLogin.styled.tsx`
  - 콜백 실패 시 코드 전달:
    - `services/ahhachul.com/src/pages/auth/callback.tsx`
  - 로그인 페이지 인라인 배너 렌더링:
    - `services/ahhachul.com/src/pages/auth/login.tsx`
- BE 전달 사항(필수)
  - 로그인 실패 계약을 FE가 안정적으로 소비할 수 있도록 `code/message/httpStatus`를 고정 유지:
    - `205 INVALID_OAUTH_AUTHORIZATION_CODE`
    - `206 INVALID_OAUTH_ACCESS_TOKEN`
  - Apple OAuth 경로에서 예외가 500으로 누출되지 않도록 `CommonException(205/206)` 매핑 일관성 점검.

## 4. 검증 결과

- FE 단위 검증 추가
  - one-app: `services/one-app/src/app/(auth)/login/_lib/loginError.spec.ts`
  - Vite: `services/ahhachul.com/src/utils/loginError.test.ts`
- 완료조건
  - 로그인 실패 시 사용자에게 원인 기반 인라인 메시지가 표시된다.
  - 실패 후 사용자가 즉시 같은 화면에서 재시도 가능하다.
  - `alert` 기반 실패 UX가 로그인 플로우에서 제거된다.
