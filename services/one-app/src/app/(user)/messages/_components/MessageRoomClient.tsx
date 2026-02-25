'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { localizePathname } from '@/i18n';
import type { SupportedLocale } from '@/i18n/config';
import { getMessageRoomMessages, getMessageRooms, sendMessage } from '@/lib/messages';
import { resolveClientErrorMessage } from '@/lib/observability';
import type { SendMessageRequest } from '@/types';

const ROOM_LIST_QUERY_KEY = ['message-rooms'] as const;
const ROOM_MESSAGES_QUERY_KEY = (roomId: number) => ['message-room-messages', roomId] as const;

const ROOM_MESSAGES_PAGE_SIZE = 50;
const ROOM_POLLING_INTERVAL_MS = 5_000;

interface MessageRoomClientProps {
  locale: SupportedLocale;
  roomId: number;
  copy: {
    title: string;
    description: string;
    backToMyPage: string;
  };
}

function getErrorMessage(error: unknown): string {
  return resolveClientErrorMessage(error, '쪽지 기능 처리 중 오류가 발생했습니다.');
}

export default function MessageRoomClient({ locale, roomId, copy }: MessageRoomClientProps) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roomsQuery = useQuery({
    queryKey: ROOM_LIST_QUERY_KEY,
    queryFn: getMessageRooms,
    refetchInterval: ROOM_POLLING_INTERVAL_MS,
  });

  const roomMessagesQuery = useQuery({
    queryKey: ROOM_MESSAGES_QUERY_KEY(roomId),
    queryFn: () =>
      getMessageRoomMessages(roomId, {
        pageSize: ROOM_MESSAGES_PAGE_SIZE,
      }),
    refetchInterval: ROOM_POLLING_INTERVAL_MS,
    refetchIntervalInBackground: true,
  });

  const roomMessages = roomMessagesQuery.data?.result.messages ?? [];
  const roomTitle = useMemo(() => {
    const roomFromMessages = roomMessagesQuery.data?.result.partnerNickname;
    if (roomFromMessages) {
      return roomFromMessages;
    }

    const roomFromList = roomsQuery.data?.result.rooms.find(room => room.roomId === roomId);
    return roomFromList?.partnerNickname ?? `쪽지방 #${roomId}`;
  }, [roomId, roomMessagesQuery.data?.result.partnerNickname, roomsQuery.data?.result.rooms]);

  const sendMessageMutation = useMutation({
    mutationFn: (payload: SendMessageRequest) => sendMessage(payload),
    onSuccess: async () => {
      setDraft('');
      setSubmitError(null);

      await queryClient.invalidateQueries({
        queryKey: ROOM_MESSAGES_QUERY_KEY(roomId),
      });
      await queryClient.invalidateQueries({ queryKey: ROOM_LIST_QUERY_KEY });
    },
    onError: error => {
      setSubmitError(getErrorMessage(error));
    },
  });

  const handleSendMessage = () => {
    const trimmedDraft = draft.trim();
    if (!trimmedDraft) {
      setSubmitError('쪽지 내용을 입력해주세요.');
      return;
    }

    const payload: SendMessageRequest = {
      roomId,
      content: trimmedDraft,
    };

    sendMessageMutation.mutate(payload);
  };

  const handleRefresh = async () => {
    await roomsQuery.refetch();
    await roomMessagesQuery.refetch();
  };

  let roomMessagesBody: React.ReactNode = (
    <ul className="space-y-2">
      {roomMessages.map(message => (
        <li
          key={message.messageId}
          className={`flex ${message.mine ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[85%] rounded-xl px-3 py-2 ${
              message.mine
                ? 'bg-key-color text-white'
                : 'border border-gray-30 bg-white text-gray-90'
            }`}
          >
            <p className="mb-1 text-[11px] opacity-80">{message.senderNickname}</p>
            <p className="whitespace-pre-wrap text-body-small">{message.content}</p>
            <p className="mt-1 text-[10px] opacity-80">
              {message.createdAt} · {message.readYn}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );

  if (roomMessagesQuery.isLoading) {
    roomMessagesBody = <p className="text-body-small text-gray-70">메시지를 불러오는 중입니다.</p>;
  } else if (roomMessagesQuery.isError) {
    roomMessagesBody = <p className="text-body-small text-red">메시지 조회에 실패했습니다.</p>;
  } else if (!roomMessages.length) {
    roomMessagesBody = (
      <p className="text-body-small text-gray-70">첫 메시지를 보내 대화를 시작해보세요.</p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-title-small text-gray-100">{roomTitle}</h1>
            <p className="mt-1 text-body-medium text-gray-70">
              입장 중에는 5초마다 자동 새로고침됩니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              void handleRefresh();
            }}
            className="rounded-lg border border-gray-40 px-3 py-1 text-label-small text-gray-90"
          >
            수동 새로고침
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-30 bg-white p-3">
        <div className="mb-3 h-[420px] overflow-y-auto rounded-xl border border-gray-30 bg-gray-10 p-3">
          {roomMessagesBody}
        </div>

        <div className="rounded-xl border border-gray-30 bg-white p-3">
          <textarea
            value={draft}
            onChange={event => setDraft(event.target.value)}
            placeholder="쪽지를 입력해주세요."
            className="h-24 w-full resize-none rounded-lg border border-gray-40 p-3 text-body-medium text-gray-90"
          />
          {submitError ? <p className="mt-2 text-body-small text-red">{submitError}</p> : null}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={sendMessageMutation.isPending}
              className="rounded-lg bg-key-color px-4 py-2 text-label-medium text-white disabled:opacity-40"
            >
              {sendMessageMutation.isPending ? '전송 중...' : '전송'}
            </button>
          </div>
        </div>
      </section>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={localizePathname('/messages', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          목록으로 돌아가기
        </Link>
        <Link
          href={localizePathname('/me', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          {copy.backToMyPage}
        </Link>
      </div>
    </main>
  );
}
