# PM 외국인 역 소셜/매칭 풀 구현 명세 (2026-02-25)

## 1. 미흡한 부분

- 외국인 사용자는 역 단위 실시간 정보는 볼 수 있지만, 같은 시간/관심사를 가진 사람을 만나거나 검증된 현지 정보를 교환할 구조가 없다.
- 기존 커뮤니티는 게시글 중심이라 `오늘 명동 같이 갈 사람`, `내일 성수 방문 동행` 같은 일정형 수요를 소화하기 어렵다.
- 국적/언어 맥락이 필요한 사용자는 필터링 기준이 없어 탐색 비용이 높다.
- 역별 후기/핫 정보가 분산되어 외국인에게 중요한 방문 맥락(쇼핑/식음/안전/이동 팁)이 한 화면에 모이지 않는다.

## 2. 개선 포인트

- 외국인 수요가 높은 5개 역(명동, 성수, 홍대입구, 강남, 안국)을 `외국인 역 소셜 허브`로 고정 제공한다.
- 역 허브에서 한 번에 제공:
  - 역 다국어 안내/문화 팁
  - 일정형 모임(생성/참여/승인)
  - 날짜별 모임 수 캘린더 요약
  - 역 기반 커뮤니티 리뷰/핫글 요약
- 국적 필터 정책:
  - 모임 생성 시 `sameNationalityOnly` 설정 가능
  - 참여 요청 시 `nationalityCode` 입력
  - 같은 국적만 보기 토글 지원
- 매칭 완료 즉시 쪽지방 연결:
  - 모임 참가자 간 매칭 버튼으로 room 생성/재사용
  - FE는 roomId를 받아 바로 쪽지 상세로 이동

## 3. 개발 진행

### 3.1 BE

1. 신규 API

- `GET /v2/foreigner/station-social/hotspots`
- `GET /v2/foreigner/station-social/overview`
  - Query: `stationId`, `subwayLineId`, `locale`, `sameNationalityOnly`, `nationalityCode`, `limit`
- `POST /v2/foreigner/station-social/meetups`
- `POST /v2/foreigner/station-social/meetups/{meetupId}/join`
- `PATCH /v2/foreigner/station-social/meetups/{meetupId}/participants/{participantId}`
- `POST /v2/foreigner/station-social/meetups/{meetupId}/match`

2. DB 스키마

- `tb_station_social_meetup`
  - 역/호선/주최자, 제목/설명, 모임일시, 최대 인원, 국적 정책, 상태
- `tb_station_social_meetup_participant`
  - 모임/참여자, 상태(REQUESTED/ACCEPTED/REJECTED/CANCELED), 국적, 소개문

3. 도메인 규칙

- 모임 생성자는 자동으로 ACCEPTED 참여자로 등록
- `sameNationalityOnly=true`인 모임은 참여 요청 국적이 생성자 국적과 다르면 거절
- 참여 승인 시 정원 초과 방지
- 매칭 시 호출자는 모임 host 또는 ACCEPTED 참여자여야 하며, 대상도 ACCEPTED 참여자여야 함
- 매칭 성공 시 기존 쪽지방 재사용, 없으면 생성 후 `roomId` 반환

### 3.2 FE(one-app, vite 공통)

1. 홈

- `외국인 역 소셜 허브` 섹션 추가
- 핫스팟 5개 역 카드 노출 + 상세 진입

2. 역 허브 상세

- 상단: 역 다국어/로마자/발음/문화 팁
- 중단: 모임 목록 + 캘린더 요약 + 국적 필터 토글
- 하단: 역 리뷰(커뮤니티 HOT) 요약

3. 모임 기능

- 생성 폼: 제목/설명/일시/정원/국적코드/같은 국적만 옵션
- 참여: 소개문 + 국적코드 입력
- host 승인/거절 버튼
- 매칭 버튼 -> 쪽지방 상세로 이동

## 4. 검증 결과 (완료 조건)

- BE
  - 신규 API Docs 테스트 통과
  - 서비스 단위 테스트로 핵심 정책(정원/국적/권한/매칭 room 재사용) 검증
- FE
  - one-app/vite 모두 동일 흐름 구현
  - 쪽지방 이동까지 실제 동선 확인
  - 게이트 통과:
    - `pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm nextjs:test`
    - `pnpm app:type`, `pnpm app:lint`, `pnpm app:test`
- 공통
  - 문서 비어있음 게이트(`test -s`, `rg -q "[^[:space:]]"`) 통과
  - 작업 보고 형식(`task id -> worker -> 상태판 반영`) 준수
