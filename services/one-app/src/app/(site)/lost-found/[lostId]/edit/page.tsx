import { SuspenseQueryBoundary } from '@/common/components';
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
