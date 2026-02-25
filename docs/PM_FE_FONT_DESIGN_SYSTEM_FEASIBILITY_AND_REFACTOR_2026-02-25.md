# PM/FE 보고: 폰트 디자인시스템 공용화 가능 여부 및 즉시 리팩토링 (2026-02-25)

## 1. 미흡한 부분

- `@ahhachul/design-system`은 색상 토큰 중심으로만 운영되고 폰트 토큰은 미포함 상태였다.
- Vite(`services/ahhachul.com`)는 `styles/theme/fonts.ts`에서 타이포 스케일을 로컬 정의하고 있었다.
- one-app(`services/one-app`)은 `tailwind.config.ts`에서 동일한 타이포 스케일을 별도로 다시 정의하고 있었다.
- 폰트 패밀리 fallback도 Vite(globalStyles)와 one-app(next/font local fallback)에서 중복 관리되고 있었다.

## 2. 개선 포인트

- 폰트 관련 기준을 `packages/design-system`으로 승격한다.
  - 공용 폰트 패밀리 fallback
  - 공용 CSS stack 문자열
  - 공용 폰트 웨이트
  - 공용 타이포 스케일(display/headline/title/label/body)
- one-app은 공용 토큰으로 Tailwind `fontFamily/fontWeight/fontSize`를 생성한다.
- Vite는 공용 타이포 스케일을 Emotion `css` 토큰으로 매핑하여 기존 `theme.fonts.*` API를 유지한다.

## 3. 개발 진행

### 3.1 디자인시스템 확장

- 추가 파일
  - `packages/design-system/src/tokens/typography.ts`
- 확장 내용
  - `fontSansFallback`, `fontMonoFallback`
  - `fontSansCssStack`, `fontMonoCssStack`
  - `fontWeights`
  - `typographyScale`
- Tailwind 연동 유틸 추가
  - `createTailwindSansFontFamily`
  - `tailwindFontWeights`
  - `tailwindTypographyScale`
- 인덱스 export 확장
  - `packages/design-system/src/index.ts`

### 3.2 one-app 리팩토링

- 파일
  - `services/one-app/tailwind.config.ts`
  - `services/one-app/src/assets/font/pretendard/index.ts`
- 변경
  - Tailwind 타이포 정의를 디자인시스템 공용 토큰으로 교체
  - `next/font/local` fallback 목록을 디자인시스템 `fontSansFallback` 재사용

### 3.3 Vite 리팩토링

- 파일
  - `services/ahhachul.com/src/styles/theme/fonts.ts`
  - `services/ahhachul.com/src/styles/globalStyles.ts`
  - `services/ahhachul.com/src/pages/news/[newsId]/page.tsx`
  - `services/ahhachul.com/src/components/domain/lostFound/postDetail/template/LostFoundDetail.styled.tsx`
- 변경
  - Vite `theme.fonts`를 디자인시스템 `typographyScale` 기반으로 생성
  - 글로벌/개별 컴포넌트 하드코딩 `font-family: 'Pretendard'`를 공용 stack(`fontSansCssStack`) 사용으로 통일

## 4. 검증 결과

### 4.1 가능 여부 결론

- **가능(YES)**.
- 기존 UI API(`theme.fonts.*`, Tailwind `text-*`)를 유지하면서 폰트 스펙만 공통화할 수 있어 회귀 위험이 낮다.

### 4.2 검증 항목

- FE 게이트 수행 결과
  - `NX_DAEMON=false pnpm nextjs:type` 통과
  - `NX_DAEMON=false pnpm nextjs:lint` 통과
  - `NX_DAEMON=false pnpm nextjs:test` 통과
  - `NX_DAEMON=false pnpm app:type` 통과
  - `NX_DAEMON=false pnpm app:lint` 통과
  - `NX_DAEMON=false pnpm app:test` 통과

### 4.3 기대 효과

- 폰트 정책 변경 시 디자인시스템 1곳 수정으로 two-app 동시 반영 가능
- 타이포 스케일 드리프트(앱 간 수치 불일치) 방지
- 새로운 클라이언트 앱 추가 시 폰트 토큰 재사용 가능
