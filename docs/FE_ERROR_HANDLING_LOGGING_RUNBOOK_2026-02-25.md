# FE 전역 에러 처리/로깅 런북 (one-app + Vite)

## 1. 목표

- 렌더링 오류, 네트워크 오류, 비동기 누락 오류를 전역에서 수집한다.
- 서버 에러 코드(`code`) 중심으로 사용자 메시지를 일관되게 제공한다.
- 개발/운영 환경에서 서로 다른 로그 정책(콘솔/원격 전송)을 적용한다.

## 2. 아키텍처 원칙

1. 공유는 계약만: `@ahhachul/domain`에 에러 정규화/로깅 규격을 두고, 런타임(fetch/axios)은 앱별로 유지한다.
2. UI 복구는 경계별로: 전역 경계(Global Boundary) + Query Boundary + 라우트 경계(Next `error.tsx`)를 분리한다.
3. 사용자 메시지는 서버 코드 우선: `code` 매핑 > 서버 메시지 > 앱 fallback 순으로 해석한다.
4. 로깅은 개발 우선 가시성, 운영 우선 안정성: 개발은 콘솔 중심, 운영은 원격 endpoint 중심.

## 3. 서버 에러 코드 기본 매핑

- `101`: 요청 값 오류
- `102`: 서버 내부 처리 오류
- `205`: 소셜 로그인 code 만료/유효하지 않음
- `206`: 소셜 access token 유효하지 않음
- `701`: 도착 열차 정보 없음
- `704`: 실시간 열차 정보 조회 실패
- `802`: 역 시간표 조회 실패
- `811`: 이미지 업로드 실패
- `401/403`: 인증/권한 오류

## 4. 적용 지점

### 4.1 공유(`packages/domain`)

- `src/error-management.ts`
  - `normalizeAppError()`
  - `resolveServerErrorMessage()`
  - `toAppClientError()`
- `src/logging.ts`
  - `createAppLogger()`
  - 개발 환경 콘솔 로깅 + 선택적 원격 전송

### 4.2 one-app(Next)

- 전역:
  - `src/components/Error/GlobalAppErrorBoundary.tsx`
  - `src/components/Error/GlobalErrorListeners.tsx`
  - `src/app/error.tsx`
  - `src/app/global-error.tsx`
- 데이터/HTTP:
  - `src/lib/fetch-client.ts`
  - `src/lib/get-query-client.tsx`
  - `src/lib/post-submit-error.ts`
  - `src/lib/observability.ts`

### 4.3 ahhachul.com(Vite)

- 전역:
  - `src/components/common/appErrorBoundary/GlobalAppErrorBoundary.component.tsx`
  - `src/components/common/appErrorBoundary/GlobalErrorListeners.component.tsx`
  - `src/render.tsx` 래핑
- 데이터/HTTP:
  - `src/apis/fetcher.ts`
  - `src/contexts/tanstack-query.tsx`
  - `src/utils/postSubmitError.ts`
  - `src/utils/observability.ts`
- 쿼리 경계 fallback 고도화:
  - 커뮤니티/유실물/민원/해시태그 리스트에서 `<div />` fallback 제거

## 5. 환경 변수

### one-app

- `NEXT_PUBLIC_LOG_LEVEL`: `debug | info | warn | error`
- `NEXT_PUBLIC_LOG_ENDPOINT`: 원격 로깅 수집 endpoint

### ahhachul.com

- `VITE_LOG_LEVEL`: `debug | info | warn | error`
- `VITE_LOG_ENDPOINT`: 원격 로깅 수집 endpoint

## 6. 운영 체크리스트

1. 운영 배포 전 `LOG_ENDPOINT` 헬스체크(수신 2xx, CORS 허용) 완료
2. 장애 리허설 시나리오 실행
   - API 500
   - 네트워크 단절
   - 렌더링 throw
3. 로그 샘플 필수 필드 확인
   - `id`, `timestamp`, `app`, `namespace`, `level`, `message`, `error.code/status`
4. 사용자 노출 문구 검수
   - 서버 메시지 원문 노출 정책 확인(민감 정보 필터링)

## 7. 비고

- `theme-playground`의 `devLogger` 패턴(개발 환경에서만 콘솔 노출)을 기준으로, 현재 로거도 기본 정책을 동일하게 적용했다.
- 운영 로그 백엔드가 준비되면 `LOG_ENDPOINT`만 설정해 원격 전송을 활성화할 수 있다.
