'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { localizePathname } from '@/i18n';
import type { SupportedLocale } from '@/i18n/config';
import { getMessageRoomMessages, getMessageRooms, sendMessage } from '@/lib/messages';
import type { MessageRoomSummary, SendMessageRequest } from '@/types';

const ROOM_LIST_QUERY_KEY = ['message-rooms'] as const;
const ROOM_MESSAGES_QUERY_KEY = (roomId: number | null) =>
  ['message-room-messages', roomId] as const;

const ROOM_MESSAGES_PAGE_SIZE = 50;
const ROOM_POLLING_INTERVAL_MS = 5_000;

interface MessagesInboxClientProps {
  locale: SupportedLocale;
  copy: {
    title: string;
    description: string;
    backToMyPage: string;
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return '쪽지 기능 처리 중 오류가 발생했습니다.';
}

export default function MessagesInboxClient({ locale, copy }: MessagesInboxClientProps) {
  const queryClient = useQueryClient();

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isComposingNew, setIsComposingNew] = useState(false);
  const [targetMemberId, setTargetMemberId] = useState('');
  const [draft, setDraft] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roomsQuery = useQuery({
    queryKey: ROOM_LIST_QUERY_KEY,
    queryFn: getMessageRooms,
    refetchInterval: ROOM_POLLING_INTERVAL_MS,
  });

  const rooms = roomsQuery.data?.result.rooms ?? [];

  useEffect(() => {
    if (rooms.length === 0) {
      setSelectedRoomId(null);
      return;
    }

    if (isComposingNew) {
      return;
    }

    if (selectedRoomId === null || !rooms.some(room => room.roomId === selectedRoomId)) {
      setSelectedRoomId(rooms[0].roomId);
    }
  }, [isComposingNew, rooms, selectedRoomId]);

  const selectedRoom = useMemo<MessageRoomSummary | null>(() => {
    if (selectedRoomId === null) {
      return null;
    }

    return rooms.find(room => room.roomId === selectedRoomId) ?? null;
  }, [rooms, selectedRoomId]);

  const roomMessagesQuery = useQuery({
    queryKey: ROOM_MESSAGES_QUERY_KEY(selectedRoomId),
    queryFn: () =>
      getMessageRoomMessages(selectedRoomId!, {
        pageSize: ROOM_MESSAGES_PAGE_SIZE,
      }),
    enabled: selectedRoomId !== null && !isComposingNew,
    refetchInterval: selectedRoomId !== null && !isComposingNew ? ROOM_POLLING_INTERVAL_MS : false,
    refetchIntervalInBackground: true,
  });

  const roomMessages = roomMessagesQuery.data?.result.messages ?? [];

  const sendMessageMutation = useMutation({
    mutationFn: (payload: SendMessageRequest) => sendMessage(payload),
    onSuccess: async response => {
      setDraft('');
      setSubmitError(null);
      setIsComposingNew(false);
      setSelectedRoomId(response.result.roomId);

      await queryClient.invalidateQueries({ queryKey: ROOM_LIST_QUERY_KEY });
      await queryClient.invalidateQueries({
        queryKey: ROOM_MESSAGES_QUERY_KEY(response.result.roomId),
      });
    },
    onError: error => {
      setSubmitError(getErrorMessage(error));
    },
  });

  const handleSelectRoom = (roomId: number) => {
    setSelectedRoomId(roomId);
    setIsComposingNew(false);
    setSubmitError(null);
  };

  const handleNewConversation = () => {
    setIsComposingNew(true);
    setSelectedRoomId(null);
    setDraft('');
    setSubmitError(null);
  };

  const handleRefresh = async () => {
    await roomsQuery.refetch();
    if (selectedRoomId !== null && !isComposingNew) {
      await roomMessagesQuery.refetch();
    }
  };

  const handleSendMessage = () => {
    const trimmedDraft = draft.trim();

    if (!trimmedDraft) {
      setSubmitError('쪽지 내용을 입력해주세요.');
      return;
    }

    const payload: SendMessageRequest = {
      content: trimmedDraft,
    };

    if (selectedRoomId !== null && !isComposingNew) {
      payload.roomId = selectedRoomId;
    } else {
      const normalizedReceiverId = Number(targetMemberId);
      if (!Number.isInteger(normalizedReceiverId) || normalizedReceiverId <= 0) {
        setSubmitError('새 대화를 시작하려면 상대 memberId를 숫자로 입력해주세요.');
        return;
      }

      payload.receiverMemberId = normalizedReceiverId;
    }

    sendMessageMutation.mutate(payload);
  };

  const isChatMode = selectedRoom !== null && !isComposingNew;
  const roomTitle = isComposingNew
    ? '새 쪽지 보내기'
    : (selectedRoom?.partnerNickname ?? '쪽지방을 선택하세요');
  const roomDescription = isChatMode
    ? '입장 중에는 5초마다 자동 새로고침됩니다.'
    : '새 대화는 상대 memberId 입력 후 시작할 수 있습니다.';

  let roomListBody: React.ReactNode = (
    <ul className="space-y-2">
      {rooms.map(room => {
        const isSelected = selectedRoomId === room.roomId && !isComposingNew;

        return (
          <li key={room.roomId}>
            <button
              type="button"
              onClick={() => handleSelectRoom(room.roomId)}
              className={`w-full rounded-xl border px-3 py-2 text-left ${
                isSelected ? 'border-key-color bg-key-color/5' : 'border-gray-30 bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-label-medium text-gray-90">{room.partnerNickname}</p>
                {room.unreadCount > 0 ? (
                  <span className="rounded-full bg-key-color px-2 py-0.5 text-[11px] text-white">
                    {room.unreadCount}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-1 text-body-small text-gray-70">
                {room.lastMessageContent ?? '메시지가 없습니다.'}
              </p>
              <p className="mt-1 text-[11px] text-gray-60">{room.lastMessageAt ?? '-'}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );

  if (roomsQuery.isLoading) {
    roomListBody = <p className="text-body-small text-gray-70">쪽지방을 불러오는 중입니다.</p>;
  } else if (rooms.length === 0) {
    roomListBody = <p className="text-body-small text-gray-70">참여 중인 쪽지방이 없습니다.</p>;
  }

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

  if (!isChatMode) {
    roomMessagesBody = (
      <p className="text-body-small text-gray-70">쪽지방을 선택하거나 새 대화를 시작해주세요.</p>
    );
  } else if (roomMessagesQuery.isLoading) {
    roomMessagesBody = <p className="text-body-small text-gray-70">메시지를 불러오는 중입니다.</p>;
  } else if (roomMessagesQuery.isError) {
    roomMessagesBody = <p className="text-body-small text-red">메시지 조회에 실패했습니다.</p>;
  } else if (roomMessages.length === 0) {
    roomMessagesBody = (
      <p className="text-body-small text-gray-70">첫 메시지를 보내 대화를 시작해보세요.</p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <h1 className="text-title-small text-gray-100">{copy.title}</h1>
        <p className="mt-1 text-body-medium text-gray-70">{copy.description}</p>
      </section>

      <section className="grid gap-3 md:grid-cols-[280px_1fr]">
        <article className="rounded-2xl border border-gray-30 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-label-large text-gray-90">쪽지방</h2>
            <button
              type="button"
              onClick={handleNewConversation}
              className="rounded-lg border border-gray-40 px-2 py-1 text-label-small text-gray-90"
            >
              새 대화
            </button>
          </div>
          {roomListBody}
        </article>

        <article className="rounded-2xl border border-gray-30 bg-white p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-label-large text-gray-90">{roomTitle}</h2>
              <p className="text-[11px] text-gray-60">{roomDescription}</p>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="rounded-lg border border-gray-40 px-3 py-1 text-label-small text-gray-90"
            >
              수동 새로고침
            </button>
          </div>

          {isComposingNew ? (
            <div className="mb-3 rounded-xl border border-gray-30 bg-gray-10 p-3">
              <label
                className="mb-1 block text-label-small text-gray-80"
                htmlFor="receiverMemberId"
              >
                상대 memberId
              </label>
              <input
                id="receiverMemberId"
                value={targetMemberId}
                onChange={event => setTargetMemberId(event.target.value)}
                placeholder="예: 25"
                className="h-10 w-full rounded-lg border border-gray-40 bg-white px-3 text-body-medium text-gray-90"
              />
            </div>
          ) : null}

          <div className="mb-3 h-[360px] overflow-y-auto rounded-xl border border-gray-30 bg-gray-10 p-3">
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
        </article>
      </section>

      <Link
        href={localizePathname('/me', locale)}
        className="mt-4 inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
      >
        {copy.backToMyPage}
      </Link>
    </main>
  );
}
