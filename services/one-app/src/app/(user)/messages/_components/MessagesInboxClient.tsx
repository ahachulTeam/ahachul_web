'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { localizePathname } from '@/i18n';
import type { SupportedLocale } from '@/i18n/config';
import { getMessageRooms } from '@/lib/messages';

const ROOM_LIST_QUERY_KEY = ['message-rooms'] as const;
const ROOM_POLLING_INTERVAL_MS = 5_000;

interface MessagesInboxClientProps {
  locale: SupportedLocale;
  copy: {
    title: string;
    description: string;
    backToMyPage: string;
  };
}

export default function MessagesInboxClient({ locale, copy }: MessagesInboxClientProps) {
  const roomsQuery = useQuery({
    queryKey: ROOM_LIST_QUERY_KEY,
    queryFn: getMessageRooms,
    refetchInterval: ROOM_POLLING_INTERVAL_MS,
  });

  const rooms = roomsQuery.data?.result.rooms ?? [];

  let roomListBody: React.ReactNode = null;
  if (roomsQuery.isLoading) {
    roomListBody = <p className="text-body-small text-gray-70">쪽지방을 불러오는 중입니다.</p>;
  } else if (roomsQuery.isError) {
    roomListBody = (
      <p className="text-body-small text-red">
        쪽지방 조회에 실패했습니다. 잠시 후 다시 시도해주세요.
      </p>
    );
  } else if (!rooms.length) {
    roomListBody = <p className="text-body-small text-gray-70">참여 중인 쪽지방이 없습니다.</p>;
  } else {
    roomListBody = (
      <ul className="space-y-2">
        {rooms.map(room => (
          <li key={room.roomId}>
            <Link
              href={localizePathname(`/messages/${room.roomId}`, locale)}
              className="block rounded-xl border border-gray-30 bg-white px-3 py-2 transition-colors hover:border-key-color hover:bg-key-color/5"
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
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <h1 className="text-title-small text-gray-100">{copy.title}</h1>
        <p className="mt-1 text-body-medium text-gray-70">{copy.description}</p>
      </section>

      <section className="rounded-2xl border border-gray-30 bg-white p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="text-label-large text-gray-90">쪽지방 목록</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                void roomsQuery.refetch();
              }}
              className="rounded-lg border border-gray-40 px-2 py-1 text-label-small text-gray-90"
            >
              새로고침
            </button>
            <Link
              href={localizePathname('/messages/new', locale)}
              className="rounded-lg border border-gray-40 px-2 py-1 text-label-small text-gray-90"
            >
              새 대화
            </Link>
          </div>
        </div>
        {roomListBody}
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
