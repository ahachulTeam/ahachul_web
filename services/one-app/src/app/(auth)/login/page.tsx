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
    <main className="relative min-h-screen overflow-hidden px-6 pb-10 pt-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-key-color/30 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-subway-s4/30 blur-[110px]" />

      <HelloOnLogin subtitle={messages.login.heroSubtitle} />

      <section className="ah-glass-card relative z-10 mt-10 rounded-[28px] border border-white/70 bg-white/88 p-5 shadow-[0_24px_56px_rgba(12,16,26,0.22)]">
        <h2 className="text-title-large text-gray-100">3초 만에 시작하는 아하철</h2>
        <p className="mt-2 text-body-medium text-gray-70">
          로그인 후 즐겨찾기 역, 경로 추천, 커뮤니티, 유실물/민원 기능을 바로 사용할 수 있습니다.
        </p>
        <div className="mt-5 flex flex-col gap-2.5">
          <SocialLogins
            continueWithProviderTemplate={messages.login.continueWithProvider}
            unknownErrorMessage={messages.common.unknownError}
            initialErrorMessage={initialErrorMessage}
          />
        </div>
      </section>
    </main>
  );
}
