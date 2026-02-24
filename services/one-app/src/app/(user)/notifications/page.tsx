import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.notifications.title),
    description: messages.seo.notifications.description,
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions('/notifications', locale),
  }) as Metadata;
}

export default async function NotificationsPage() {
  const locale = await getServerLocale();
  const copy = getLocaleMessages(locale).notificationsPage;

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="mb-3 rounded-2xl border border-gray-30 bg-white px-4 py-3">
        <h1 className="text-title-small text-gray-100">{copy.title}</h1>
        <p className="mt-1 text-body-medium text-gray-70">{copy.description}</p>
      </section>

      <section className="space-y-2">
        {copy.items.map((notification, index) => (
          <article
            key={`${notification.title}-${index}`}
            className="rounded-2xl border border-gray-30 bg-white p-4"
          >
            <p className="text-label-small text-key-color">{notification.category}</p>
            <h2 className="mt-1 text-title-small text-gray-100">{notification.title}</h2>
            <p className="mt-1 text-body-medium text-gray-80">{notification.description}</p>
            <p className="mt-2 text-body-small text-gray-60">{notification.time}</p>
          </article>
        ))}
      </section>

      <div className="mt-4 flex gap-2">
        <Link
          href={localizePathname('/notifications/settings', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          알림 설정
        </Link>
        <Link
          href={localizePathname('/me', locale)}
          className="inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
        >
          {copy.backToMyPage}
        </Link>
      </div>
    </main>
  );
}
