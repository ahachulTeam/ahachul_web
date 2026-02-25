# PM 우선순위 1 명세: 지연/사고 통합 센터 + 증빙팩 자동생성 (2026-02-25)

## 1. 미흡한 부분

1. 현재 지연 증빙 V2는 `발급/조회` API는 존재하지만, 사용자가 증빙을 만들기 전에 한 화면에서
   - 공식 사고/긴급 공지,
   - 커뮤니티 지연 시그널,
   - 실시간 도착 신뢰도
     를 종합 확인하는 통합 진입점이 없다.
2. one-app은 마이페이지 내부 모달에서만 증빙 발급이 가능해 발견성과 재사용성이 낮다.
3. Vite 앱에는 동일한 수준의 증빙 생성 UX가 부재해 two-app 기능 동등성이 낮다.
4. 공유 링크 진입 시 증빙 내용을 검증하는 전용 화면이 앱 레벨에서 분리되어 있지 않다.

## 2. 개선 포인트

1. 우선순위 1 전용 신규 API 추가
   - `GET /v2/delay-centers/overview`
   - 목적: 증빙 발급 전 `공식/커뮤니티/실시간` 3축을 통합 조회하고, 자동 추천 증빙 문구를 제공
2. one-app/Vite 모두 전용 화면 추가
   - 페이지명: `지연/사고 통합 센터`
   - 핵심 기능: 조건 선택(역/호선/상하행) -> 통합분석 -> 추천 문구 확인 -> 즉시 증빙팩 발급
3. 증빙 검증 페이지 추가
   - `/proofs/{proofId}`에서 증빙 상세(등급/신뢰도/근거)를 재확인 가능
4. UX 정책
   - 법적 효력 아님 문구 고정 노출
   - 실패 시 인라인 에러 + 재시도 버튼
   - `공식 공지 N건 / 커뮤니티 N건 / 실시간 신뢰도`를 항상 시각화

## 3. 개발 진행 (구현 범위/완료조건/예외정책)

### 3.1 BE 구현 범위

1. API
   - `GET /v2/delay-centers/overview`
2. Query
   - `stationId` (Long, required)
   - `subwayLineId` (Long, required)
   - `upDownType` (`UP|DOWN`, optional)
   - `windowMinutes` (Int, optional, default=30, min=5, max=120)
   - `incidentLimit` (Int, optional, default=10, min=1, max=100)
   - `signalLimit` (Int, optional, default=100, min=5, max=200)
3. Response 200 (요약)
   - `realtime`: 신뢰도, stale 여부, freshness, 첫 열차 ETA
   - `official`: 공식 공지 개수/소스/상세
   - `community`: 시그널 수/작성자 수/중앙값/신뢰도/샘플
   - `recommendation`: 추천 도착시각, 추천 문구, 예상 지연 분, 등급 preview
4. 기존 API 유지
   - `POST /v2/delay-proofs` (증빙 발급)
   - `GET /v2/delay-proofs/{proofId}` (증빙 조회)
   - `GET /v2/subway/incidents`, `GET /v2/community/delay-signals`

### 3.2 FE 구현 범위 (one-app + Vite 공통)

1. 페이지 추가
   - `지연/사고 통합 센터` 전용 페이지 신규
2. 흐름
   - 역/호선/상하행 선택
   - `통합 분석` 클릭 -> overview 조회
   - 추천 문구/등급/근거 확인
   - `증빙팩 발급` 클릭 -> `/v2/delay-proofs` 호출
   - 결과에서 문구 복사/링크 복사/공유
3. 검증 페이지
   - `/proofs/{proofId}` 신규
   - 공개 접근 가능(로그인 불필요)
4. 마이페이지 연결
   - 기존 `지연 증빙` 기능은 유지하되, 통합 센터로 이동 가능한 빠른 링크 제공

### 3.3 완료조건 (Definition of Done)

1. BE
   - 신규 overview API 구현 + docs test 추가
   - Delay Proof asciidoc에 overview 섹션 반영
2. FE
   - one-app/Vite 모두 통합 센터에서 증빙팩 발급 가능
   - one-app/Vite 모두 증빙 조회 페이지 접근 가능
3. 품질
   - FE 게이트: `nextjs:type/lint/test`, `app:type/lint/test`
   - BE 게이트: `:application:test` + `DelayProofControllerDocsTest` 지정 실행
4. 운영
   - 문서 비어있음 게이트 통과

### 3.4 예외정책

1. 공식 공지 미연동/비어있음: 기능 실패가 아니라 `eventCount=0`으로 정상 응답
2. 커뮤니티 시그널 부족: `confidenceLevel=LOW`, 증빙 등급 하향
3. 실시간 stale: `realtime.isStale=true`를 명시하고 추천문구에는 생성시각 포함
4. 증빙 만료: 기존 `901 DELAY_PROOF_EXPIRED` 정책 유지
