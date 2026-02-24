# PM 기능 명세: 유저간 쪽지방 V1

## 1. 목표

- 1:1 유저 간 "채팅방 형태의 쪽지"를 주고받을 수 있게 한다.
- 실시간 소켓 없이도 사용성이 떨어지지 않도록 `폴링` + `수동 새로고침`을 제공한다.
- 채팅 서비스가 아닌 "쪽지 기능"으로 범위를 제한한다.

## 2. 범위(V1)

- 포함
  - 쪽지방 목록 조회
  - 쪽지방 메시지 조회
  - 메시지 전송
  - 새 대화 시작(상대 `memberId` 기반)
  - 읽지 않은 메시지 수 표시
  - 쪽지방 입장 시 메시지 폴링(5초)
  - 수동 새로고침 버튼
- 제외
  - WebSocket/SSE 실시간 푸시
  - 그룹 채팅
  - 파일/이미지 첨부
  - 차단/신고/AI 요약

## 3. 사용자 시나리오

1. 사용자는 메시지함에 진입한다.
2. 시스템은 쪽지방 목록을 표시한다(최근 메시지 순).
3. 사용자가 쪽지방을 열면 메시지 목록을 조회하고 5초 폴링을 시작한다.
4. 사용자가 전송하면 즉시 목록/대화창이 갱신된다.
5. 사용자는 새로고침 버튼으로 즉시 최신 상태를 강제 동기화할 수 있다.

## 4. API 요구사항(BE)

1. `GET /v1/message-rooms`

- 내 쪽지방 목록 반환
- 응답 필드: `roomId`, `partnerMemberId`, `partnerNickname`, `lastMessageContent`, `lastMessageAt`, `unreadCount`

2. `GET /v1/message-rooms/{roomId}/messages?pageSize=30&cursorId={optional}`

- 방 메시지 페이징 조회
- 응답 필드: `roomId`, `partnerMemberId`, `partnerNickname`, `hasNext`, `nextCursorId`, `messages[]`
- `messages[]` 필드: `messageId`, `senderMemberId`, `senderNickname`, `content`, `createdAt`, `mine`, `readYn`
- 방 진입/조회 시 상대가 보낸 미열람 메시지는 읽음 처리

3. `POST /v1/message-rooms/messages`

- 요청
  - 기존 방 전송: `{ "roomId": 10, "content": "..." }`
  - 새 대화 시작 + 전송: `{ "receiverMemberId": 25, "content": "..." }`
- 응답: `roomId`, `messageId`, `createdAt`

## 5. 정책/검증

- 본인 미참여 방 접근/전송 금지
- 본인에게 쪽지 전송 금지
- 공백 메시지 금지
- 최대 길이 1000자

## 6. FE 요구사항

- 메시지함 화면 구성
  - 쪽지방 목록
  - 선택된 방의 메시지 타임라인
  - 입력창 + 전송 버튼
- 폴링
  - 방 입장 상태에서만 5초 간격 폴링
- 수동 갱신
  - 새로고침 버튼으로 즉시 `방 목록 + 현재 방 메시지` 동시 갱신
- 상태 표시
  - 로딩/에러/빈 상태

## 7. QA 체크리스트

- 로그인 없이 접근 시 보호 라우트 동작 확인
- 본인 미참여 방 조회 시 에러 확인
- 전송 후 5초 내 다른 세션에서 수신 반영 확인(폴링)
- 수동 새로고침 즉시 반영 확인
- 긴 메시지/공백 메시지 검증 확인

## 8. 운영 메모

- V1은 폴링 기반으로 운영하고, 트래픽/지연 지표 확인 후 V2(WebSocket) 검토
