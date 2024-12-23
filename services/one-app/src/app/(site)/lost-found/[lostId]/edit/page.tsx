import { SuspenseQueryBoundary } from '@/common/components';
import LostFoundForm from '../../_components/LostFoundForm';

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
      <LostFoundForm lostId={lostId} />
    </SuspenseQueryBoundary>
  );
};

export default LostFoundEditPage;
