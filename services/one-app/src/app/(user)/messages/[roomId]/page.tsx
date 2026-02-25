import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import MessageRoomClient from '../_components/MessageRoomClient';

type Props = {
  params: Promise<{
    roomId: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.messages.title),
    description: messages.seo.messages.description,
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions('/messages', locale),
  }) as Metadata;
}

export default async function MessageRoomPage({ params }: Props) {
  const locale = await getServerLocale();
  const copy = getLocaleMessages(locale).messagesPage;
  const { roomId } = await params;

  const normalizedRoomId = Number(roomId);
  if (!Number.isInteger(normalizedRoomId) || normalizedRoomId <= 0) {
    redirect(localizePathname('/messages', locale));
  }

  return <MessageRoomClient locale={locale} roomId={normalizedRoomId} copy={copy} />;
}
