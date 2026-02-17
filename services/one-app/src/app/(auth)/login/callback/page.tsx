import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';

import CallbackRedirect from './_components/CallbackRedirect';

type Props = {
  searchParams: Promise<{ type: string; code: string }>;
};

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle('로그인 인증 처리'),
  description: '소셜 로그인 인증 결과를 확인하고 아하철 앱으로 이동합니다.',
  siteUrl: SITE_URL,
  pathname: '/login/callback',
  noIndex: true,
  noFollow: true,
}) as Metadata;

export default async function AuthCallbackPage({ searchParams }: Props) {
  const query = await searchParams;
  const code = query.code;
  const type = query.type;

  return <CallbackRedirect code={code} type={type} />;
}
