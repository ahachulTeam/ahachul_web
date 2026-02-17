import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle('닉네임 설정'),
  description: '로그인 완료를 위해 아하철에서 사용할 닉네임을 설정합니다.',
  siteUrl: SITE_URL,
  pathname: '/login/set-nickname',
  noIndex: true,
  noFollow: true,
}) as Metadata;

export default function SetNicknameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
