import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/plus';
import { SuspenseQueryBoundary } from '@/common/components';
import LostFoundDetail from '../_components/LostFoundDetail';

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
        <SuspenseQueryBoundary suspenseFallback={<div>loading</div>}>
          <LostFoundDetail lostId={lostId} />
        </SuspenseQueryBoundary>
      </div>
    </main>
  );
}
