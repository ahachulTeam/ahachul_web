# PM -> FE/BE 핸드오프: 외국인 모드 실사용형 (우선순위4)

## 1. 미흡한 부분

- 역명 표기가 한국어 단일 축이라 외국인 사용자의 탐색/발화/민원 작성 난이도가 높음
- 민원/유실물 입력 폼에 다국어 템플릿이 없어 입력 품질 편차가 큼
- 커뮤니티 원문 이해 장벽으로 실시간 제보 소비율이 낮음

## 2. 개선 포인트

- FE/BE 동시 반영으로 외국인 모드 핵심 4요소를 한 스프린트에 개통
  1. 역명 다국어/로마자/발음
  2. 다국어 민원·유실물 템플릿
  3. 커뮤니티 자동 번역
  4. 문화형 안내(막차/환승 예절/안전)

## 3. 개발 진행

### 3.1 BE 작업 지시

1. API 구현

- `GET /v2/foreigner/stations/guide`
- `GET /v2/foreigner/community-posts/{postId}/translation`

2. 구현 기준

- locale 파싱: `ko/en/th/cn`, 미지원 입력은 `en` fallback
- station guide는 `stationId + subwayLineId` 기준으로 생성
- 커뮤니티 번역은 원문 누락 시 빈문자열이 아니라 안전 문구를 반환
- `isFallback`로 번역 신뢰 상태를 FE가 분기할 수 있게 제공

3. 테스트/문서

- `ForeignerModeControllerDocsTest` 추가
- 서비스 단위테스트로 fallback 케이스 검증
- `application/src/docs/asciidoc` 문서 include 반영

### 3.2 FE 작업 지시

1. one-app

- 홈: 외국인 모드 카드 추가(역명 다국어/로마자/발음 + 문화 안내)
- 민원/유실물 작성: 언어 선택 + 템플릿 적용 액션
- 커뮤니티 상세: 자동 번역 토글 + 실패 fallback

2. vite

- 홈: 외국인 모드 패널 추가
- 민원/유실물 작성: 언어 선택 + 템플릿 적용 액션
- 커뮤니티 상세: 자동 번역 토글 + 실패 fallback

3. 공통 UI 규칙

- 로딩: 스켈레톤 또는 짧은 로딩 문구
- 실패: 원문 유지 + 재시도 버튼
- 접근성: 버튼/셀렉트에 명확한 라벨 제공

### 3.3 QA 완료 기준

- 다국어 locale별(`en/th/cn`) 템플릿 적용 결과가 실제 폼 값으로 반영된다.
- 번역 토글 ON/OFF에 따라 원문/번역문 노출이 명확히 분리된다.
- API 실패 시 화면 공백 없이 기존 기능이 유지된다.

## 4. 검증 결과(반영 시 보고 형식)

- `task #<id> 큐 등록 완료`
- `worker=<name>, status=<busy|idle>, current_task_id=<id> 확인`
- `status board 반영 확인(<timestamp>, <changed fields>)`
