import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';

import LostFoundPostEditor from '../../_components/LostFoundPostEditor';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return createPageMetadata({
    title: withBrandTitle(`유실물 글 수정 #${id}`),
    description: '유실물 게시글 정보를 최신 상태로 수정하세요.',
    siteUrl: SITE_URL,
    pathname: `/lost-found/${id}/edit`,
    noIndex: true,
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
