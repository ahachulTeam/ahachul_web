import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.notFound.title),
    description: messages.seo.notFound.description,
    siteUrl: SITE_URL,
    pathname: localizePathname('/not-found', locale),
    noIndex: true,
  }) as Metadata;
}

export default async function NotFound() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return (
    <div className=" flex flex-col gap-2">
      <div className=" text-black">{messages.notFound.message}</div>
      <Link href={localizePathname('/', locale)} className=" text-black">
        {messages.notFound.goHome}
      </Link>
    </div>
  );
}
