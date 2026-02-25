# PM -> FE/BE 핸드오프: 홈 일일 투표 + 역 일기 + 댓글 이미지 (2026-02-25)

## 1. 미흡한 부분

- 출퇴근/등하교 공감형 참여 기능이 홈에서 즉시 보이지 않는다.
- 오늘의 체감을 역 단위로 기록/공유하는 경량 일기 기능이 없다.
- 댓글 이미지/GIF 공유가 불가해 공감 반응 밀도가 낮다.

## 2. 개선 포인트

- 홈 진입 즉시 개인화된 “오늘 n호선 투표”를 보여준다.
- 주 투표 완료 후 “오늘의 xx역은 어떠셨나요?”를 unlock한다.
- 투표 댓글에 이미지 URL 배열(GIF 포함)을 허용한다.
- 댓글 정렬(최신/인기), 좋아요를 지원한다.

## 3. 개발 진행

### 3.1 BE 전달사항

- `GET /v2/daily-votes/today`
- 응답에 `primaryPoll`, `secondaryPoll`, `stationDiary`를 포함한다.
- `stationDiary.visible`은 `primaryPoll` 참여 여부에 따라 계산한다.
- `POST /v2/daily-votes/{pollId}/votes`
- 동일 멤버의 중복 투표는 기존 투표 갱신 또는 1회 제한 정책 중 하나로 일관 처리
- `GET /v2/daily-votes/{pollId}/comments?sort=latest|popular`
- `POST /v2/daily-votes/{pollId}/comments` (`content`, `imageUrls`)
- `POST/DELETE /v2/daily-votes/comments/{commentId}/likes`
- 댓글 DTO 확장
- 공통 댓글 응답에도 `imageUrls: string[]` 필드를 제공(기존 화면 호환 보장)

### 3.2 FE 전달사항

- one-app/vite 공통
- 홈에 투표 카드 섹션 추가
- `primaryPoll` 우선 노출, `secondaryPoll`는 접기/펼치기 가능
- 투표 제출 후 결과 비율/카운트 즉시 갱신
- 투표 상세
- 댓글 입력창에 이미지 URL 추가/삭제 UI
- URL 미유효시 인라인 검증 메시지
- 댓글 카드에 텍스트 + 이미지 미리보기
- GIF URL도 일반 이미지와 동일 렌더링
- 역 일기
- `stationDiary.visible=false`면 잠금 안내
- `true`면 일기형 댓글 작성/조회 활성화

## 4. 검증 결과(요구)

- BE
- 정책 기반 단위 테스트(라벨/시간대/투표 unlock)
- controller docs 테스트(오늘 조회/투표/댓글/좋아요)
- FE
- API 연동 테스트 + 핵심 UI 상태 테스트(로딩/에러/완료)
- 홈에서 투표 참여 -> 역 일기 노출 전환 시나리오 검증
