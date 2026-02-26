import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { HelloOnLogin, SocialLogins } from '@/app/(auth)/login/_components';
import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import { LOGIN_ERROR_QUERY, parseLoginErrorQuery } from './_lib/loginError';

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

function resolveLoginErrorMessage(
  rawError: string | undefined,
  messages: ReturnType<typeof getLocaleMessages>,
) {
  const error = parseLoginErrorQuery(rawError);
  if (!error) {
    return null;
  }

  switch (error) {
    case LOGIN_ERROR_QUERY.INVALID_CALLBACK_PARAMS:
      return messages.login.errors.invalidCallbackParams;
    case LOGIN_ERROR_QUERY.INVALID_AUTHORIZATION_CODE:
      return messages.login.errors.invalidAuthorizationCode;
    case LOGIN_ERROR_QUERY.INVALID_ACCESS_TOKEN:
      return messages.login.errors.invalidAccessToken;
    default:
      return messages.login.errors.unknown;
  }
}

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

export default async function Login({ searchParams }: LoginPageProps) {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const params = searchParams ? await searchParams : undefined;
  const errorParam = Array.isArray(params?.error) ? params?.error[0] : params?.error;
  const initialErrorMessage = resolveLoginErrorMessage(errorParam, messages);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black_secondary">
      <HelloOnLogin subtitle={messages.login.heroSubtitle} />
      <section className="absolute bottom-[34px] left-0 right-0 flex flex-col gap-2 px-[30px] pt-6">
        <SocialLogins
          continueWithProviderTemplate={messages.login.continueWithProvider}
          unknownErrorMessage={messages.common.unknownError}
          initialErrorMessage={initialErrorMessage}
        />
      </section>
    </main>
  );
}
