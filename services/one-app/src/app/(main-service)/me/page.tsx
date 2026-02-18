import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import MyDashboard from './_components/MyDashboard';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.me.title),
    description: messages.seo.me.description,
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions('/me', locale),
  }) as Metadata;
}

export default async function MyPage() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return (
    <main className="min-h-screen bg-gray-10 pb-16">
      <MyDashboard locale={locale} copy={messages.me} />
    </main>
  );
}
