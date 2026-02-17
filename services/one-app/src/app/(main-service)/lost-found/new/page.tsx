import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';

import LostFoundPostEditor from '../_components/LostFoundPostEditor';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle('유실물 등록'),
  description: '유실물 정보를 등록해 노선별 이용자와 빠르게 공유하세요.',
  siteUrl: SITE_URL,
  pathname: '/lost-found/new',
  noIndex: true,
}) as Metadata;

export default function NewLostFoundPage() {
  return <LostFoundPostEditor mode="create" />;
}
