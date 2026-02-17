import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

import LostFoundPostEditor from '../_components/LostFoundPostEditor';

export const metadata: Metadata = createPageMetadata({
  title: '유실물 등록 / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철',
  description: '유실물 게시글을 등록하고 노선별 이용자와 빠르게 정보를 공유하세요.',
  siteUrl: SITE_URL,
  pathname: '/lost-found/new',
}) as Metadata;

export default function NewLostFoundPage() {
  return <LostFoundPostEditor mode="create" />;
}
