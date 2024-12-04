import Link from 'next/link';

import LostFoundPostDetail from '../_components/postDetail/PostDetail';
import PlusIcon from '@/common/assets/icons/plus';
import { SuspenseQueryBoundary } from '@/common/components/SuspenseQueryBoundary/SuspenseQueryBoundary';

type Props = {
  params: {
    lostId: string;
  };
};

export default function LostFoundDetailPage({ params }: Props) {
  const { lostId } = params;

  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
        <Link href={'/lost-found/1'}>
          <PlusIcon />
        </Link>
        <SuspenseQueryBoundary
          errorFallback={<div>error</div>}
          suspenseFallback={<div>loading</div>}
        >
          <LostFoundPostDetail lostId={lostId} />
        </SuspenseQueryBoundary>
      </div>
    </main>
  );
}
