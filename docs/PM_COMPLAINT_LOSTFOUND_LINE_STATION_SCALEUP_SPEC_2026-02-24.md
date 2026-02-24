# PM 기능 명세: 민원/유실물 호선·역 구조 확장 (2026-02-24)

## 1. 미흡한 부분

1. 민원/유실물 목록은 현재 호선 중심 필터만 제공되어, 사용자가 특정 역 맥락으로 탐색하기 어렵다.
2. 커뮤니티는 이미 `호선 -> 역` 필터 구조를 사용하고 있으나, 민원/유실물은 동일 패턴이 없어 UX 일관성이 깨진다.
3. FE one-app/vite 간 필터 키/파라미터 체계가 완전히 정렬되어 있지 않아 동일 기능 확장 시 회귀 위험이 높다.
4. BE 검색 API에서 민원/유실물 `stationId`를 공식 검색 파라미터로 받지 않아, 역 기반 확장 요구를 처리할 수 없다.

## 2. 개선 포인트

1. 민원/유실물 모두 커뮤니티와 동일하게 `subwayLine + station` 2단계 필터를 제공한다.
2. 역 필터는 선택된 호선의 역 목록으로 제한하고, 호선 변경 시 역 필터를 기본값(`0`)으로 재설정한다.
3. BE는 `stationId`를 optional로 수용하고, 역-호선 매핑을 사용해 검색 호선 조건과 교집합을 계산한다.
4. 교집합이 비는 경우 전체 데이터 노출이 아니라 빈 결과를 반환해 필터 의미를 보장한다.
5. FE(one-app/vite) 요청 파라미터를 `subwayLineIds`, `stationId`로 통일한다.

## 3. 개발 진행

### 3.1 BE 할당

1. 대상 API

- `GET /v1/complaint-posts`
- `GET /v1/lost-posts`

2. 요청 파라미터

- 기존: `subwayLineIds`, `keyword`, `pageToken`, `pageSize` (+ 유실물 `lostType`, `category`)
- 추가: `stationId` (optional, Long)

3. 처리 규칙

- `stationId`만 주어진 경우: 해당 역의 소속 호선 집합으로 필터링
- `subwayLineIds`와 `stationId` 동시 입력: 두 조건의 교집합으로 필터링
- 교집합이 빈 경우: 빈 목록 반환(`1=0` 조건)

4. 문서/테스트

- Complaint/Lost Docs 테스트에 `stationId` 파라미터 문서화
- 서비스 테스트에 역-호선 교집합 시나리오 추가

### 3.2 FE(one-app) 할당

1. 대상 화면

- `/complaint`
- `/lost-found`

2. 필터 확장

- 기존: 호선(유실물은 카테고리 + 호선)
- 변경: (유실물 카테고리) + 호선 + 역

3. 데이터 소스

- `/subway-lines` 응답으로 호선/역 옵션 동적 구성

4. 동작 규칙

- 호선 기본: `0(전체)`
- 역 기본: `0(전체)`
- 호선 미선택(전체) 시 역 목록은 `전체 역 보기`만 노출
- 선택된 역이 현재 호선에 없으면 `stationId`를 자동 제거/초기화

5. 요청 파라미터

- 목록 조회 시 `subwayLineIds`, `stationId` 전달
- 프리패치/쿼리 시그니처에도 `stationId` 반영

### 3.3 FE(vite: ahhachul.com) 할당

1. 대상 화면

- `ComplaintPage` 검색 필터/목록
- `LostFoundPage` 검색 필터/목록

2. 필터/타입 확장

- 필터 키에 `stationId` 추가
- 타입(`ComplaintFilters`, `LostFoundFilters`, list params)에 `stationId` 반영

3. 동작 규칙

- 커뮤니티와 동일한 방식으로 동적 호선/역 옵션 구성
- 호선 변경 시 `stationId=0` 리셋
- 목록 훅에서 `stationId`를 API params/querySignature에 포함

## 4. 완료 조건(DoD)

1. one-app/vite 민원/유실물 화면에서 호선 선택 후 역 선택이 가능하다.
2. 호선 변경 시 역 선택이 유효하지 않으면 자동 초기화된다.
3. BE가 `stationId`를 수용하며 `subwayLineIds`와 조합 시 교집합 규칙을 따른다.
4. 교집합이 빈 경우 빈 목록을 반환한다(전체 목록으로 fallback 금지).
5. 기존 목록/상세/작성/수정/삭제 흐름에 회귀가 없다.

## 5. 검증 기준

1. FE(one-app): `pnpm nextjs:type`, `pnpm nextjs:lint`, `pnpm nextjs:test`
2. FE(vite): `pnpm app:type`, `pnpm app:lint`, `pnpm app:test`
3. BE:

- `./gradlew --no-daemon :application:test --tests \"*ComplaintPostControllerDocsTest\"`
- `./gradlew --no-daemon :application:test --tests \"*LostPostControllerDocsTest\"`
- `./gradlew --no-daemon :application:test`

4. 문서 게이트:

- `test -s docs/PM_COMPLAINT_LOSTFOUND_LINE_STATION_SCALEUP_SPEC_2026-02-24.md`
- `rg -q \"[^[:space:]]\" docs/PM_COMPLAINT_LOSTFOUND_LINE_STATION_SCALEUP_SPEC_2026-02-24.md`

## 6. 리스크 및 대응

1. 현재 민원/유실물 엔티티는 stationId를 직접 저장하지 않으므로, 1차는 역-호선 매핑 기반 필터를 적용한다.
2. 실제 역 단위 정밀 필터가 필요하면 2차에서 `station_id` 스키마 확장 및 작성/수정 폼 연동을 진행한다.
3. FE에서는 필터 상태가 URL과 동기화되므로, 잘못된 수동 쿼리 입력에 대한 정규화 로직(역 리셋)을 반드시 유지한다.
