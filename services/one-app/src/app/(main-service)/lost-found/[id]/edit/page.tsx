import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

import LostFoundPostEditor from '../../_components/LostFoundPostEditor';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: `유실물 글 수정(${id}) / 1등 지하철 민원 & 분실물 & 커뮤니티 정보 앱 - 아하철`,
    description: '유실물 게시글을 수정하고 최신 상태로 갱신하세요.',
    siteUrl: SITE_URL,
    pathname: `/lost-found/${id}/edit`,
  }) as Metadata;
}

export default async function LostFoundEditPage({ params }: Props) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isFinite(postId) || postId <= 0) {
    notFound();
  }

  return <LostFoundPostEditor mode="edit" postId={postId} />;
}
