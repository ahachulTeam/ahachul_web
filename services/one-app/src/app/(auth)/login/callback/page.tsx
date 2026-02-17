import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import CallbackRedirect from './_components/CallbackRedirect';

type Props = {
  searchParams: Promise<{ type: string; code: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.loginCallback.title),
    description: messages.seo.loginCallback.description,
    siteUrl: SITE_URL,
    noIndex: true,
    noFollow: true,
    ...getLocalizedMetadataOptions('/login/callback', locale),
  }) as Metadata;
}

export default async function AuthCallbackPage({ searchParams }: Props) {
  const query = await searchParams;
  const code = query.code;
  const type = query.type;

  return <CallbackRedirect code={code} type={type} />;
}
