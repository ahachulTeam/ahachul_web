import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import MessagesInboxClient from './_components/MessagesInboxClient';

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

export default async function MessagesPage() {
  const locale = await getServerLocale();
  const copy = getLocaleMessages(locale).messagesPage;

  return <MessagesInboxClient locale={locale} copy={copy} />;
}
