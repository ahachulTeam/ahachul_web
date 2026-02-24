import { API_PATHS } from '@ahhachul/http';

import { fetchClient } from '@/lib/fetch-client';
import type {
  ApiResponse,
  MessageRoomListResponse,
  MessageRoomMessagesResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '@/types';

interface GetMessageRoomMessagesParams {
  cursorId?: number;
  pageSize?: number;
}

export async function getMessageRooms() {
  return fetchClient<ApiResponse<MessageRoomListResponse>>(API_PATHS.message.rooms);
}

export async function getMessageRoomMessages(
  roomId: number,
  params: GetMessageRoomMessagesParams = {},
) {
  const queryParams: Record<string, number> = {
    pageSize: params.pageSize ?? 30,
  };

  if (params.cursorId !== undefined) {
    queryParams.cursorId = params.cursorId;
  }

  return fetchClient<ApiResponse<MessageRoomMessagesResponse>>(
    API_PATHS.message.roomMessages(roomId),
    {
      params: queryParams,
    },
  );
}

export async function sendMessage(payload: SendMessageRequest) {
  return fetchClient<ApiResponse<SendMessageResponse>>(API_PATHS.message.messages, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
