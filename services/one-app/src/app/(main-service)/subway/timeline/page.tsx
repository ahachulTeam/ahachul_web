import Link from 'next/link';

import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

export default async function SubwayTimelinePage() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return (
    <main className="min-h-screen bg-gray-10 px-5 pb-24 pt-4">
      <section className="rounded-2xl border border-gray-30 bg-white p-4">
        <h1 className="text-title-small text-gray-100">지하철 타임라인</h1>
        <p className="mt-1 text-body-medium text-gray-70">
          one-app 타임라인 화면은 2차 마이그레이션에서 고도화될 예정입니다.
        </p>
      </section>

      <Link
        href={localizePathname('/', locale)}
        className="mt-4 inline-flex h-10 items-center rounded-xl border border-gray-40 bg-white px-4 text-label-medium text-gray-90"
      >
        {messages.nav.home}
      </Link>
    </main>
  );
}
