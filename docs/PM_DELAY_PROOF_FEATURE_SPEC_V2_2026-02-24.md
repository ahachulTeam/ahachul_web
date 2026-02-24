# PM 지하철 지연 증빙 기능 명세 V2 (2026-02-24)

## 0. 기획 보강 배경
기존 V1은 `실시간 도착정보 기반 개인 증빙`에 초점이 있었고, 다음 요구가 부족했다.
1. 공공 긴급정보(사고/장애/운행중단) 기반 공식 근거 연동
2. 같은 호선/시간대 커뮤니티 신호를 종합한 집단 근거 반영

본 문서는 위 2가지를 핵심 축으로 V2를 정의한다.

## 1. 목표
- 단순 "늦어요"가 아니라 `공식 근거 + 군집 근거 + 실시간 데이터`를 합성한 증빙을 제공한다.
- 수신자가 "실제로 지연이 있었구나"를 확인할 수 있는 `검증 링크`를 제공한다.
- 증빙 등급(신뢰등급)을 명시해 과장/오용을 줄인다.

## 2. 미흡한 부분 (현재)
1. 공공 긴급정보 API를 수집/정규화하는 모듈이 없다.
2. 커뮤니티 글을 지연 시그널로 변환/집계하는 파이프라인이 없다.
3. 다중 근거를 합성해 증빙서류(share text + verify page)로 발급하는 API가 없다.
4. 증빙 내 근거 출처(`official/community/realtime`)를 구조화해 표시하지 않는다.

## 3. 우리가 이미 갖춘 것
1. 실시간 열차 데이터
- `GET /v2/trains/real-times`
- `confidenceLevel`, `isStale`, `freshnessSec` 활용 가능

2. 사용자/개인화
- 로그인/닉네임/마이페이지
- 즐겨찾는 역(`/members/bookmarks/stations`) 기반 기본역 프리셋 가능

3. 커뮤니티 데이터 자산
- 노선/역 문맥이 포함된 게시글/댓글 도메인 존재
- 시간순 조회/작성자/반응 데이터 기반 집계 확장 가능

4. 운영 인프라
- Redis/배치/모니터링 패턴 일부 보유
- v2 API 증설 경험(역 요약/막차 리스크/빠른하차/주변시설)

## 4. 핵심 개선 포인트
1. 증빙 근거를 3축으로 합성
- `Official`: 공공 긴급정보 API(사고/지연/운행장애)
- `Community`: 동일 호선/시간대 지연 신고 군집
- `Realtime`: 열차 도착 지연 지표

2. 신뢰등급 산정 규칙 도입
- `A (HIGH)`: Official + Realtime 일치
- `B (MEDIUM)`: Official 없음, Community+Realtime 강한 일치
- `C (LOW)`: Realtime만 존재 또는 stale 높음

3. 증빙서류를 검증 가능한 형태로 제공
- 발급 텍스트
- 검증 URL(근거 요약 표시)
- 서버 서명(signature) + 만료시간

## 5. 공공 긴급정보 연동 명세 (요구사항)
### 5.1 목적
- 열차 사고/장애/운행중지/지연 공지를 공식 근거로 사용

### 5.2 수집 원칙
1. 공공데이터 API 또는 운영기관 공개 피드(지하철 긴급공지 성격) 연동
2. 1차는 수도권 대상, 이후 전국 확장
3. 장애 시 이전 캐시 + `official_stale` 플래그로 안전 처리

### 5.3 정규화 필드
- `eventId`
- `occurredAt`
- `resolvedAt`
- `lineIds[]`
- `stationIds[]` (가능 시)
- `severity` (`INFO|DELAY|DISRUPTION|SUSPENDED`)
- `title`, `description`, `source`
- `sourceUrl`

### 5.4 갭
- 실제 제공기관별 스키마 차이 큼 -> 어댑터 계층 필요
- 일부 피드는 역/호선 매핑 정보가 약함 -> 키워드/사전 매핑 필요

## 6. 커뮤니티 집계 증빙 명세 (요구사항)
### 6.1 목적
- 같은 호선/시간대 출근자 체감 데이터를 집단 근거로 반영

### 6.2 시그널 추출
1. 대상: 커뮤니티 게시글/댓글
2. 조건: 최근 N분(기본 30분), 동일 호선 중심
3. 추출값
- `lineId`, `stationId(optional)`
- `reportedDelayMin` (텍스트에서 추정)
- `createdAt`
- `authorTrustScore` (신규 계정/반복 신고 보정)

### 6.3 집계 규칙
- `communitySignalCount`
- `medianReportedDelayMin`
- `distinctAuthors`
- `confidence` (저자 다양성/시간 밀집/내용 유사도 반영)

### 6.4 악용 방지
- 동일 계정 반복 신고 가중치 감소
- 신규 계정 단독 신고는 증빙 등급 상승 불가
- 신고 키워드 스팸 패턴 차단

## 7. 증빙서류 생성 명세 (V2)
### 7.1 API 제안
#### POST `/v2/delay-proofs`
Request
```json
{
  "stationId": 201,
  "subwayLineId": 2,
  "upDownType": "UP",
  "expectedArrivalAt": "2026-02-24T10:35:00+09:00",
  "customMessage": "최대한 빨리 가겠습니다."
}
```

Response
```json
{
  "result": {
    "proofId": "dpv2_01...",
    "issuedAt": "2026-02-24T10:21:12+09:00",
    "expiresAt": "2026-02-25T10:21:12+09:00",
    "grade": "B",
    "confidenceLevel": "MEDIUM",
    "evidenceSummary": {
      "official": {"matched": true, "eventCount": 1},
      "community": {"signalCount": 18, "distinctAuthors": 11},
      "realtime": {"isStale": false, "freshnessSec": 24}
    },
    "text": "지하철 지연으로 10:35 도착예정입니다. 공식공지 1건/동일 호선 커뮤니티 18건 확인(10:21 생성).",
    "shareUrl": "https://ahhachul.com/proofs/dpv2_01...",
    "signature": "base64..."
  }
}
```

#### GET `/v2/delay-proofs/{proofId}`
- 검증 페이지 데이터 반환
- 만료 시 `410 GONE`

#### GET `/v2/subway/incidents`
- 정규화된 공식 긴급정보 조회

#### GET `/v2/community/delay-signals`
- 내부/운영용 집계 API (외부 노출 범위는 정책으로 결정)

## 8. 데이터 모델 제안
### 8.1 subway_incident_event
- `id`, `source`, `source_event_id`, `occurred_at`, `resolved_at`
- `severity`, `line_ids_json`, `station_ids_json`
- `title`, `description`, `source_url`, `created_at`

### 8.2 community_delay_signal_minute
- `minute_at`, `line_id`, `station_id`
- `signal_count`, `distinct_authors`, `median_delay_min`
- `signal_confidence`, `created_at`

### 8.3 delay_proof_v2
- `id`, `member_id`, `station_id`, `subway_line_id`, `up_down_type`
- `expected_arrival_at`, `grade`, `confidence_level`
- `official_event_count`, `community_signal_count`
- `realtime_snapshot_json`, `official_snapshot_json`, `community_snapshot_json`
- `signature`, `issued_at`, `expires_at`, `created_at`

## 9. 개발 진행 계획
### 9.1 PM
1. 공식 긴급정보 공급원 우선순위 정의(수도권 1차)
2. 증빙 등급 문구/정책 최종 승인
3. 법적 고지 문안 확정(`법적 증명서 아님`)

### 9.2 BE
1. 공식 긴급정보 수집기 + 정규화 어댑터 구현
2. 커뮤니티 지연 시그널 집계 배치 구현
3. `/v2/delay-proofs` 발급/조회 API 구현
4. 서명/만료/레이트리밋/감사로그 구현

### 9.3 FE
1. `지연 증빙 만들기(V2)` 진입 UI 추가
2. 증빙 결과 화면에 근거 요약(official/community/realtime) 표시
3. 공유 텍스트/링크 복사/시스템 공유
4. 검증 페이지 뷰 구현

### 9.4 QA
1. 공식 이벤트 매칭 시 등급 A 부여 검증
2. 커뮤니티 신호 기반 등급 B 부여 검증
3. stale/데이터없음/만료/레이트리밋 실패 시나리오 검증
4. 허위 신고/스팸 방지 규칙 검증

## 10. 완료 조건 (DoD)
1. 공식 긴급정보 연동이 실제 응답/캐시 포함 동작
2. 커뮤니티 집계 기반 지연 신호가 증빙에 반영
3. 증빙 생성 시 `근거 3축`이 JSON/화면 모두 확인 가능
4. FE/BE/QA 테스트 통과 및 PM 최종 승인

## 11. 오픈 이슈
1. 공식 긴급정보 API의 라이선스/호출제한 확인 필요
2. 역/호선 매핑 정합성(운영기관별 표기 차이) 보정 전략 필요
3. 커뮤니티 NLP 고도화 범위(규칙기반 vs 모델기반) 단계화 필요
