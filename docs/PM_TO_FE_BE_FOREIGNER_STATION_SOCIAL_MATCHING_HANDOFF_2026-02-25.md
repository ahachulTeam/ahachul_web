# PM -> FE/BE 핸드오프: 외국인 역 소셜/매칭 (2026-02-25)

## 1. 미흡한 부분

- 외국인 방문자 관점에서 역 기반 동행/매칭 기능이 부재
- 역별 핵심 정보(리뷰/팁/일정형 모임)가 분리되어 탐색 동선이 길다
- 국적/언어 맥락 기반 필터링이 없어 사용자 맞춤성이 낮다

## 2. 개선 포인트

- 외국인 수요가 높은 5개 역을 허브화해 소셜/콘텐츠를 집중 노출
- 모임 생성-참여-승인-매칭-쪽지 연결까지 단일 플로우 제공
- `sameNationalityOnly` + `nationalityCode` 정책으로 필터/매칭 정밀도 강화

## 3. 개발 진행

### 3.1 BE 구현 요구

1. Endpoint

- `GET /v2/foreigner/station-social/hotspots`
- `GET /v2/foreigner/station-social/overview`
- `POST /v2/foreigner/station-social/meetups`
- `POST /v2/foreigner/station-social/meetups/{meetupId}/join`
- `PATCH /v2/foreigner/station-social/meetups/{meetupId}/participants/{participantId}`
- `POST /v2/foreigner/station-social/meetups/{meetupId}/match`

2. 핵심 응답 계약

- hotspots: 역/호선 식별자, localized 이름, 태그, 요약, upcomingMeetupCount, reviewCount
- overview:
  - station(다국어/발음)
  - calendar(날짜별 모임 수)
  - meetups(참여자 상태 포함)
  - reviewPosts(커뮤니티 HOT 요약)
- match: `roomId`, `messageId(optional)`, `targetMemberId`

3. 정책

- 생성자 자동 참여(ACCEPTED)
- 국적 제한 모임에서 불일치 참여 차단
- 정원 초과 승인 차단
- host만 승인/거절 가능
- 매칭 권한: host 또는 ACCEPTED 참여자

### 3.2 FE 구현 요구 (one-app + vite 동일)

1. 홈 진입

- 외국인 역 소셜 허브 카드/리스트
- 핫스팟 상세 진입 CTA

2. 역 상세 페이지

- 모임 목록 + 국적 필터
- 모임 생성 폼
- 참여 요청 버튼/상태 표기
- host 승인/거절 액션
- 매칭 버튼 -> 쪽지방 이동
- 역 리뷰 요약(커뮤니티 HOT)

3. UX 규칙

- 빈 상태 메시지 명확화(모임 없음/참여 승인 대기/국적 미일치)
- 실패 시 원인 문구를 액션 근처에 인라인 표기
- 매칭 완료 시 roomId 기반 즉시 라우팅

## 4. 검증 결과 (완료 기준)

- BE
  - Docs 테스트 + 서비스 정책 테스트 통과
  - 외국인 모드 기존 API 회귀 없음
- FE
  - one-app/vite 모두 기능 동등성 확보
  - 생성/참여/승인/매칭/쪽지 이동 e2e 수동 검증 완료
  - type/lint/test 통과
