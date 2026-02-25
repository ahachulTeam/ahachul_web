import { beforeEach, describe, expect, it, vi } from 'vitest';

import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';

import { createMessage, fetchMessageRoomMessages, fetchMessageRooms } from './message';

vi.mock('@/apis/fetcher', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('message request api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('쪽지방 목록 API를 호출한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: { rooms: [] } } } as never);

    await fetchMessageRooms();

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.message.rooms);
  });

  it('쪽지방 메시지 API에 pageSize/cursorId를 전달한다', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { result: { messages: [] } } } as never);

    await fetchMessageRoomMessages(15, {
      pageSize: 50,
      cursorId: 120,
    });

    expect(axiosInstance.get).toHaveBeenCalledWith(API_PATHS.message.roomMessages(15), {
      params: {
        pageSize: 50,
        cursorId: 120,
      },
    });
  });

  it('메시지 전송 API를 호출한다', async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({ data: { result: { roomId: 1 } } } as never);

    const payload = {
      roomId: 1,
      content: '안녕하세요',
    };

    await createMessage(payload);

    expect(axiosInstance.post).toHaveBeenCalledWith(API_PATHS.message.messages, payload);
  });
});
