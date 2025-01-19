'use client';

<<<<<<< HEAD
import { SuspenseQueryBoundary, ArticleDetailSuspenseFallback } from '@/common/components';

import { LostFoundPostDetail } from '../_components';

type Props = {
  params: Promise<{
    lostId: number;
  }>;
};

export default async function LostFoundDetailPage({ params }: Props) {
  const { lostId } = await params;
=======
import {
  SuspenseQueryBoundary,
  ArticleDetailSuspenseFallback,
} from '@/common/components';
import { LostFoundPostDetail } from '../_components';

type Props = {
  params: {
    lostId: number;
  };
};

export default function LostFoundDetailPage({ params }: Props) {
  const { lostId } = params;
>>>>>>> main

  return (
    <main className="flex min-h-screen flex-col text-black bg-white mb-[210px]">
      <div className="flex flex-col">
        <SuspenseQueryBoundary
          errorFallback={<div>error</div>}
          suspenseFallback={<ArticleDetailSuspenseFallback />}
        >
          <LostFoundPostDetail lostId={lostId} />
        </SuspenseQueryBoundary>
      </div>
    </main>
  );
}
