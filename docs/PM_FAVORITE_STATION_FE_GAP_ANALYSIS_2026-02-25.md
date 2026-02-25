# PM 즐겨찾는 역 FE 로직 분석 및 개선안 (2026-02-25)

## 1. 미흡한 부분

### 1.1 Vite(`services/ahhachul.com`)의 저장 UX 불안정

- 저장 버튼 클릭 시 `mutate` 완료를 기다리지 않고 `500ms` 후 무조건 뒤로 이동합니다.
- 근거:
  - `services/ahhachul.com/src/pages/my/setting.tsx`
  - `updateUserFavoriteStations(formattedStations);` 직후 `setTimeout(() => pop(), 500)` 실행
- 영향:
  - 실제 저장 실패여도 사용자는 저장 성공처럼 인식할 수 있음
  - 네트워크 지연 시 화면 이탈로 재시도 동선이 단절됨

### 1.2 one-app(`services/one-app`)의 입력 방식이 자유 텍스트 중심

- 즐겨찾는 역을 역명 문자열로 직접 입력받아 오타/표기 흔들림 가능성이 큼
- 근거:
  - `services/one-app/src/app/(main-service)/me/_components/MyDashboard.tsx`
  - `stationName`, `label`을 `input`으로 직접 입력
- 영향:
  - 역명 오입력 시 BE에서 역 매칭 실패 발생
  - 동일 역 다른 표기(띄어쓰기/철자)로 인한 품질 저하

### 1.3 역 식별자(stationId) 일관성 부재

- one-app 저장 페이로드는 `stationName` 기반, Vite는 `stationId`를 보조로 다루는 형태가 혼재
- 근거:
  - one-app: `services/one-app/src/app/(main-service)/me/_lib/getMyProfile.ts`의 `FavoriteStationPayload`에 `stationId` 없음
  - Vite: `services/ahhachul.com/src/apis/request/user.ts`의 `FavoriteStationPayload`에 `stationId?` 존재
- 영향:
  - 앱 간 동등성(parity) 저하
  - 중복 역명(동명이역) 처리 정책이 FE에서 불명확

### 1.4 라벨 정책 불일치

- Vite는 `집/회사/학교/즐겨찾는 장소` 선택형, one-app은 자유 입력형
- 근거:
  - Vite: `services/ahhachul.com/src/pages/my/setting.tsx`의 `LABEL_OPTIONS`
  - one-app: `services/one-app/src/app/(main-service)/me/_components/MyDashboard.tsx`의 `label` 입력 필드
- 영향:
  - 유저 경험과 데이터 품질이 앱별로 달라짐
  - 분석/추천 로직에서 라벨 표준화가 어려워짐

### 1.5 인터랙션 패턴(알림/확인)이 브라우저 기본 API에 의존

- one-app에서 `window.alert`, `window.prompt` 기반 피드백이 다수
- 근거:
  - `services/one-app/src/app/(main-service)/me/_components/MyDashboard.tsx`
- 영향:
  - 모바일 UX 품질 저하
  - 접근성/국제화 대응 및 디자인 일관성 저하

## 2. 개선 포인트

### 2.1 입력 모델 통합: `stationId` 우선, `stationName`은 표시값

- FE 저장 데이터 기준을 `stationId`로 통일
- 역 검색/선택 UI에서 역명+호선을 함께 표기해 동명이역 혼선을 제거
- `stationName`은 렌더링/백업 필드로만 활용

### 2.2 저장 트랜잭션 UX 표준화

- 저장 버튼 클릭 -> 로딩 상태 -> 성공/실패 토스트 -> 성공 시에만 이동
- 강제 지연(`setTimeout`) 제거

### 2.3 라벨 정책 표준화

- 단기: 현재 선택형 라벨셋으로 두 앱 통일
- 중기: 라벨 정책을 PM/BE 합의 스키마(열거형 or 자유입력 정책)로 확정

### 2.4 one-app 편집기 고도화

- 자유 텍스트 입력 제거
- `subway-lines` 카탈로그 기반 선택형 UI로 전환
- 오입력/중복 검증을 사전 차단

### 2.5 알림 체계 통합

- `window.alert/prompt` 제거
- 공통 토스트/모달 컴포넌트로 전환
- 문구는 i18n 메시지 리소스로 이동

## 3. 개발 진행 (FE 전달 기준)

### 3.1 FE-A (Vite 우선 안정화)

1. `setting.tsx` 저장 로직을 `mutateAsync` 기반으로 변경
2. 성공 시에만 `pop()` 이동, 실패 시 화면 유지 + 토스트 표시
3. 중복 역명/빈 입력/최대 개수 검증 메시지 명확화

### 3.2 FE-B (one-app 구조 개선)

1. 즐겨찾기 역 편집기의 자유 입력 필드를 선택형 UI로 교체
2. `stationId` 중심 저장 페이로드로 전환 준비
3. `window.alert/prompt`를 토스트/모달 패턴으로 교체
4. 하드코딩 문구를 i18n 리소스로 이관

### 3.3 FE 공통(동등성)

1. Vite/one-app 검증 시나리오 동일화
2. 동일 API 계약과 동일 에러 처리 정책 적용
3. 회귀 테스트 항목(저장 실패/중복/최대개수/경로 생성) 문서화

## 4. 검증 결과

### 4.1 분석 근거 코드 확인 완료

- Vite 주요 파일
  - `services/ahhachul.com/src/pages/my/setting.tsx`
  - `services/ahhachul.com/src/components/domain/my/FavoriteRouteCard.component.tsx`
  - `services/ahhachul.com/src/services/user.ts`
  - `services/ahhachul.com/src/apis/request/user.ts`
- one-app 주요 파일
  - `services/one-app/src/app/(main-service)/me/_components/MyDashboard.tsx`
  - `services/one-app/src/app/(main-service)/me/_lib/getMyProfile.ts`

### 4.2 본 문서 결과물

- FE 개선 핸드오프 문서 작성 완료:
  - `ahachul_web/docs/PM_TO_FE_FAVORITE_STATION_UX_IMPROVEMENT_HANDOFF_2026-02-25.md`

### 4.3 완료 조건

- FE는 핸드오프 문서의 P0 범위부터 착수
- 완료 보고는 기능별로 `미흡한 부분 -> 개선 포인트 -> 개발 진행 -> 검증 결과` 순서로 제출
