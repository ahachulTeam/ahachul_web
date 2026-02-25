import { API_PATHS } from '@ahhachul/http';

import axiosInstance from '@/apis/fetcher';
import type {
  ApiResponse,
  MessageRoomListResponse,
  MessageRoomMessagesResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '@/types';

interface MessageRoomMessagesParams {
  cursorId?: number;
  pageSize?: number;
}

export const fetchMessageRooms = async () => {
  const { data } = await axiosInstance.get<ApiResponse<MessageRoomListResponse>>(
    API_PATHS.message.rooms,
  );
  return data;
};

export const fetchMessageRoomMessages = async (
  roomId: number,
  params: MessageRoomMessagesParams = {},
) => {
  const { data } = await axiosInstance.get<ApiResponse<MessageRoomMessagesResponse>>(
    API_PATHS.message.roomMessages(roomId),
    {
      params: {
        pageSize: params.pageSize ?? 30,
        ...(params.cursorId !== undefined ? { cursorId: params.cursorId } : {}),
      },
    },
  );

  return data;
};

export const createMessage = async (payload: SendMessageRequest) => {
  const { data } = await axiosInstance.post<ApiResponse<SendMessageResponse>>(
    API_PATHS.message.messages,
    payload,
  );

  return data;
};
