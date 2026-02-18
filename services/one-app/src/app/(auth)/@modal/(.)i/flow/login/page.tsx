import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.loginModalFlow.title),
    description: messages.seo.loginModalFlow.description,
    siteUrl: SITE_URL,
    noIndex: true,
    noFollow: true,
    ...getLocalizedMetadataOptions('/i/flow/login', locale),
  }) as Metadata;
}

export default async function LoginFlowModalRedirectPage() {
  const locale = await getServerLocale();

  redirect(localizePathname('/login', locale));
}
