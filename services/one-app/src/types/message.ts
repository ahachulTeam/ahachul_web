import type { TypeYN } from './common';

export interface MessageRoomSummary {
  roomId: number;
  partnerMemberId: number;
  partnerNickname: string;
  lastMessageContent?: string | null;
  lastMessageAt?: string | null;
  unreadCount: number;
}

export interface MessageRoomListResponse {
  rooms: MessageRoomSummary[];
}

export interface MessageThreadItem {
  messageId: number;
  senderMemberId: number;
  senderNickname: string;
  content: string;
  createdAt: string;
  mine: boolean;
  readYn: TypeYN;
}

export interface MessageRoomMessagesResponse {
  roomId: number;
  partnerMemberId: number;
  partnerNickname: string;
  hasNext: boolean;
  nextCursorId?: number | null;
  messages: MessageThreadItem[];
}

export interface SendMessageRequest {
  roomId?: number;
  receiverMemberId?: number;
  content: string;
}

export interface SendMessageResponse {
  roomId: number;
  messageId: number;
  createdAt: string;
}
