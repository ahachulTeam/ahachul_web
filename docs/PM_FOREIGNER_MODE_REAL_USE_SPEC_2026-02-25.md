# PM 외국인 모드 실사용형 명세 (우선순위4)

## 1. 미흡한 부분

- 현재 역/노선 화면은 한국어 중심이라 외국인 사용자가 역명 해석, 발음, 민원 작성에 높은 진입 장벽이 있다.
- 민원/유실물 작성 시 다국어 템플릿이 없어, 핵심 정보를 누락하거나 과도한 자유서술로 처리 지연이 발생할 수 있다.
- 커뮤니티 글은 한국어 원문 위주여서 외국인 사용자가 상황 파악(지연/혼잡/사고 제보)을 즉시 하기 어렵다.
- 막차/환승 예절/안전 수칙 등 문화형 안내가 분산되어 있어, 실제 이동 상황에서 빠른 행동 가이드가 부족하다.

## 2. 개선 포인트

- 외국인 모드 전용 API를 신설해 `역명 다국어/로마자/발음`, `민원·유실물 템플릿`, `문화형 안내`를 한 번에 제공한다.
- 커뮤니티 상세 글에 자동 번역 API를 연결해 원문/번역문 토글 UX를 제공한다.
- locale는 `ko/en/th/cn`를 1차 지원하고, 미지원 locale은 `en`으로 안전 fallback 한다.
- 번역 불가/데이터 부족 시에도 화면 공백이 없도록 원문 유지 + 안내 문구로 degrade 한다.

## 3. 개발 진행

### 3.1 BE API

1. `GET /v2/foreigner/stations/guide`

- Query: `stationId`(required), `subwayLineId`(required), `locale`(optional, default=`en`)
- Response:
  - `station`: `nameKo`, `nameLocalized`, `romanizedName`, `pronunciation`, `subwayLineNameKo`, `subwayLineNameLocalized`
  - `templates`: `complaintTitleTemplate`, `complaintBodyTemplate`, `lostTitleTemplate`, `lostBodyTemplate`
  - `cultureGuide`: `lastTrainTip`, `transferEtiquetteTip`, `safetyTip`, `emergencyPhrase`
  - `supportedLocales`

2. `GET /v2/foreigner/community-posts/{postId}/translation`

- Query: `targetLocale`(optional, default=`en`)
- Response:
  - `postId`, `sourceLocale`, `targetLocale`
  - `originalTitle`, `originalContent`
  - `translatedTitle`, `translatedContent`
  - `isFallback`

### 3.2 FE(one-app, vite 공통 UX)

1. 홈

- 선택된 역/노선 기준 외국인 모드 카드(다국어 역명/로마자/발음/문화 안내) 노출
- API 실패 시 기존 홈 기능 유지 + 카드 내 오류 문구만 노출

2. 민원/유실물 작성

- `언어 선택 + 템플릿 적용` 버튼 제공
- 적용 시 제목/본문 기본 템플릿을 폼에 채우고 사용자가 추가 편집 가능하도록 유지

3. 커뮤니티 상세

- `자동 번역` 토글 버튼 제공
- 토글 ON 시 번역문 블록 노출, OFF 시 원문만 노출
- 번역 실패 시 원문 유지 + 재시도 버튼

### 3.3 정책/예외

- 자동 번역 결과는 참고용 안내를 노출한다(법적/공식 번역 아님).
- 번역 API 지연 시 2초 이상 로딩 인디케이터 표시, 타임아웃 시 실패 상태로 전환한다.
- 템플릿은 민감정보를 강제 수집하지 않으며, 사용자가 직접 삭제/수정 가능해야 한다.

## 4. 검증 결과(완료 조건)

- BE
  - 신규 2개 API docs test 통과
  - 단위 테스트로 로케일 fallback/빈 본문 fallback 검증
- FE
  - one-app/vite 모두 홈 카드 + 템플릿 적용 + 번역 토글 동작 확인
  - `nextjs:type/lint/test`, `app:type/lint/test` 통과
- 공통
  - 문서 비어있음 게이트(`test -s`, `rg -q "[^[:space:]]"`) 통과
  - 오케스트레이션 보고 형식(`task id -> worker -> 상태판 반영`) 유지
