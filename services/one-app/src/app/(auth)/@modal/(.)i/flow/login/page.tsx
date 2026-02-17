import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle('로그인 모달 플로우 이동'),
  description: '로그인 모달 경로를 표준 URL로 정규화합니다.',
  siteUrl: SITE_URL,
  pathname: '/i/flow/login',
  noIndex: true,
  noFollow: true,
}) as Metadata;

export default function LoginFlowModalRedirectPage() {
  redirect('/login');
}
