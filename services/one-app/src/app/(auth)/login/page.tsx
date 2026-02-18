import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { HelloOnLogin, SocialLogins } from '@/app/(auth)/login/_components';
import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.login.title),
    description: messages.seo.login.description,
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions('/login', locale),
  }) as Metadata;
}

export default async function Login() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <HelloOnLogin subtitle={messages.login.heroSubtitle} />
      <section className="fixed bottom-[34px] left-0 right-0 flex flex-col gap-2 px-[30px] pt-6">
        <SocialLogins
          continueWithProviderTemplate={messages.login.continueWithProvider}
          unknownErrorMessage={messages.common.unknownError}
        />
      </section>
    </main>
  );
}
