# 막차 리스크 자동화 기획 명세 (2026-02-27)

## 1. 미흡한 부분

- 홈 화면 막차 리스크가 `도보 n분` 수동 입력에 의존하여 사용자가 매번 같은 값을 반복 입력해야 했다.
- 사용자 생활거점(집/회사/학교)과 즐겨찾는 역이 연결되지 않아 개인화 리스크 계산 정확도가 낮았다.
- 현재 위치를 기반으로 주변 역을 즉시 탐색하고 실시간 도착 정보를 확인하는 흐름이 없었다.

## 2. 개선 포인트

- 마이페이지 즐겨찾는 역에 `위치 메타(locationMeta)`를 추가해 주소/좌표/도보분/산출 소스를 저장한다.
- 막차 리스크 API는 `walkingMinutes`를 optional로 변경하고, 서버가 다음 우선순위로 자동 계산한다.
  - 1순위: 요청 파라미터
  - 2순위: 사용자 프로필(즐겨찾는 역 locationMeta.walkingMinutes)
  - 3순위: 기본값(15분)
- 현재 위치를 허용한 사용자는 주변 역 리스트를 확인하고 해당 역의 실시간/시간표 화면으로 즉시 이동할 수 있게 한다.

## 3. 개발 진행

### BE

- `tb_member_station`에 위치 메타 컬럼 추가
  - `location_name`, `road_address`, `jibun_address`, `latitude`, `longitude`, `walking_minutes`, `walking_source`, `walking_updated_at`
- `POST /v1/members/favorite-stations` 요청/응답에 `stationId`, `locationMeta` 확장
- `GET /v2/stations/times/last-train-risk`
  - `walkingMinutes` optional
  - 응답에 `walkingMinutesSource`, `walkingMinutesUpdatedAt` 추가
  - 익명 호출 허용(`@Authentication(required=false)`) + 로그인 시 프로필 fallback 적용

### FE (Vite)

- 마이페이지 즐겨찾는 역 설정 화면 확장
  - 다음 Postcode 주소 검색
  - 현재 위치 기반 주변 역 탐색
  - 장소 별칭/도보분 관리 + 저장 payload에 locationMeta 포함
- 홈 막차 리스크 카드 개선
  - 수동 입력 제거
  - 서버 자동 계산 결과(`walkingMinutes`, `walkingMinutesSource`) 표시
  - 기본값 사용 시 마이페이지 설정 유도 문구 표시

### FE (one-app)

- 즐겨찾는 역 API 계약 동기화
  - `stationId`, `locationMeta` 필드 read/write 가능하도록 타입/저장 경로 정렬

## 4. 검증 결과

- BE
  - `./gradlew --no-daemon :application:compileKotlin` 성공
  - `./gradlew --no-daemon :application:test --tests '*MemberControllerDocsTest' --tests '*StationControllerDocsTest'` 성공
- FE
  - `NX_DAEMON=false pnpm app:type` 성공
  - `NX_DAEMON=false pnpm app:lint` 성공
  - `NX_DAEMON=false pnpm app:test` 성공
  - `NX_DAEMON=false pnpm nextjs:type` 성공
  - `NX_DAEMON=false pnpm nextjs:lint` 성공
  - `NX_DAEMON=false pnpm nextjs:test` 성공

## 5. 완료 기준

- 사용자는 마이페이지에서 위치 메타를 저장할 수 있다.
- 홈 막차 리스크는 수동 입력 없이 자동 계산 결과를 노출한다.
- 현재 위치 기반 주변 역에서 실시간/시간표 화면 진입이 가능하다.
- BE/FE 계약 및 테스트가 동기화되어 회귀 없이 동작한다.
