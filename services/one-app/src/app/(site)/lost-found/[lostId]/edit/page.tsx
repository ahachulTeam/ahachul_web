import { SuspenseQueryBoundary } from '@/common/components';
<<<<<<< HEAD

import LostFoundEdit from '../../_components/LostFoundEdit';

type Props = {
  params: Promise<{
    lostId: string;
  }>;
};

export default async function LostFoundEditPage({ params }: Props) {
  const { lostId } = await params;

  return (
    <SuspenseQueryBoundary errorFallback={<div>error</div>} suspenseFallback={<div>loading</div>}>
      <LostFoundEdit lostId={lostId} />
    </SuspenseQueryBoundary>
  );
}
=======
import LostFoundEdit from '../../_components/LostFoundEdit';

type Props = {
  params: {
    lostId: string;
  };
};

const LostFoundEditPage = ({ params: { lostId } }: Props) => {
  return (
    <SuspenseQueryBoundary
      errorFallback={<div>error</div>}
      suspenseFallback={<div>loading</div>}
    >
      <LostFoundEdit lostId={lostId} />
    </SuspenseQueryBoundary>
  );
};

export default LostFoundEditPage;
>>>>>>> main
