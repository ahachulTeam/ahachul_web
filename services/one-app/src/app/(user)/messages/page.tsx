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
    title: withBrandTitle(messages.seo.messages.title),
    description: messages.seo.messages.description,
    siteUrl: SITE_URL,
    pathname: localizePathname('/messages', locale),
    noIndex: true,
  }) as Metadata;
}

export default async function MessagesPage() {
  const locale = await getServerLocale();
  const copy = getLocaleMessages(locale).messagesPage;

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <h1 className="text-title-small text-gray-100">{copy.title}</h1>
        <p className="mt-1 text-body-medium text-gray-70">{copy.description}</p>
      </section>

      <section className="space-y-2">
        {copy.items.map((message, index) => (
          <article
            key={`${message.title}-${index}`}
            className="rounded-2xl border border-gray-30 bg-white p-4"
          >
            <p className="text-label-small text-gray-70">{message.sender}</p>
            <h2 className="mt-1 text-title-small text-gray-100">{message.title}</h2>
            <p className="mt-1 text-body-medium text-gray-80">{message.body}</p>
            <p className="mt-2 text-body-small text-gray-60">{message.receivedAt}</p>
          </article>
        ))}
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
