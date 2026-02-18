import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.setNickname.title),
    description: messages.seo.setNickname.description,
    siteUrl: SITE_URL,
    noIndex: true,
    noFollow: true,
    ...getLocalizedMetadataOptions('/login/set-nickname', locale),
  }) as Metadata;
}

export default function SetNicknameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
