import LostFoundPostDetail from '../_components/postDetail/PostDetail';
import { SuspenseQueryBoundary } from '@/common/components/SuspenseQueryBoundary/SuspenseQueryBoundary';
import { ArticleDetailSuspenseFallback } from '@/common/components/Article/ArticleDetail.suspense';

type Props = {
  params: {
    lostId: number;
  };
};

export default function LostFoundDetailPage({ params }: Props) {
  const { lostId } = params;

  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
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
