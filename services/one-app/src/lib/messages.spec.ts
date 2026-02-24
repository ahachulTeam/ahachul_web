import { API_PATHS } from '@ahhachul/http';

import type { ApiResponse, MessageRoomListResponse, MessageRoomMessagesResponse } from '@/types';

import { fetchClient } from './fetch-client';
import { getMessageRoomMessages, getMessageRooms, sendMessage } from './messages';

jest.mock('./fetch-client', () => ({
  fetchClient: jest.fn(),
}));

const mockedFetchClient = jest.mocked(fetchClient);

describe('messages', () => {
  beforeEach(() => {
    mockedFetchClient.mockReset();
  });

  it('쪽지방 목록 API를 호출한다', async () => {
    const response: ApiResponse<MessageRoomListResponse> = {
      code: '100',
      message: 'SUCCESS',
      result: {
        rooms: [
          {
            roomId: 1,
            partnerMemberId: 22,
            partnerNickname: '아하철러22',
            lastMessageContent: '지금 열차 지연이에요.',
            lastMessageAt: '2026-02-24 15:10:10.010',
            unreadCount: 1,
          },
        ],
      },
    };

    mockedFetchClient.mockResolvedValue(response);

    await getMessageRooms();

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.message.rooms);
  });

  it('쪽지방 메시지 API를 pageSize/cursorId와 함께 호출한다', async () => {
    const response: ApiResponse<MessageRoomMessagesResponse> = {
      code: '100',
      message: 'SUCCESS',
      result: {
        roomId: 1,
        partnerMemberId: 22,
        partnerNickname: '아하철러22',
        hasNext: true,
        nextCursorId: 101,
        messages: [
          {
            messageId: 102,
            senderMemberId: 22,
            senderNickname: '아하철러22',
            content: '곧 도착합니다.',
            createdAt: '2026-02-24 15:11:11.111',
            mine: false,
            readYn: 'Y',
          },
        ],
      },
    };

    mockedFetchClient.mockResolvedValue(response);

    await getMessageRoomMessages(1, { pageSize: 30, cursorId: 120 });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.message.roomMessages(1), {
      params: {
        pageSize: 30,
        cursorId: 120,
      },
    });
  });

  it('쪽지 전송 API를 POST로 호출한다', async () => {
    mockedFetchClient.mockResolvedValue({
      code: '100',
      message: 'SUCCESS',
      result: {
        roomId: 1,
        messageId: 103,
        createdAt: '2026-02-24 15:12:12.222',
      },
    });

    await sendMessage({
      roomId: 1,
      content: '알겠습니다. 바로 출발할게요.',
    });

    expect(mockedFetchClient).toHaveBeenCalledWith(API_PATHS.message.messages, {
      method: 'POST',
      body: JSON.stringify({
        roomId: 1,
        content: '알겠습니다. 바로 출발할게요.',
      }),
    });
  });
});
