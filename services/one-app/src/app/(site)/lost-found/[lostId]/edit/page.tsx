import { SuspenseQueryBoundary } from '@/common/components';
import LostFoundEdit from '../../_components/LostFoundEdit';

type Props = {
  params: Promise<{
    lostId: string;
  }>;
};

export default async function LostFoundEditPage({ params} : Props)  {
  const { lostId } = await params;

  return (
    <SuspenseQueryBoundary
      errorFallback={<div>error</div>}
      suspenseFallback={<div>loading</div>}
    >
      <LostFoundEdit lostId={lostId} />
    </SuspenseQueryBoundary>
  );
};

