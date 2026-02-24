import { notFound } from 'next/navigation';

import CommunityPostEditor from '../../_components/CommunityPostEditor';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CommunityEditPage({ params }: Props) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isFinite(postId) || postId <= 0) {
    notFound();
  }

  return <CommunityPostEditor mode="edit" postId={postId} />;
}
