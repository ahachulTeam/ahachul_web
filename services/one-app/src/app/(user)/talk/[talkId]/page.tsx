import { redirect } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  params: Promise<{
    talkId: string;
  }>;
};

export default async function TalkDetailPage({ params }: Props) {
  const locale = await getServerLocale();
  const { talkId } = await params;

  const normalizedRoomId = Number(talkId);
  if (!Number.isInteger(normalizedRoomId) || normalizedRoomId <= 0) {
    redirect(localizePathname('/messages', locale));
  }

  redirect(localizePathname(`/messages/${normalizedRoomId}`, locale));
}
