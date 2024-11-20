import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/plus';
import { SuspensedQueryBoundary } from '@/common/components/SuspensedQueryBoundary/SuspensedQueryBoundary';
import LostFoundDetail from '../_components/LostFoundDetail';

type Params = {
  params: {
    lostId: string;
  };
};

export default function LostFoundDetailPage({ params }: Params) {
  const { lostId } = params;

  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
        <Link href={'/lost-found/1'}>
          <PlusIcon />
        </Link>
        <SuspensedQueryBoundary suspenseFallback={<div>loading</div>}>
          <LostFoundDetail lostId={lostId} />
        </SuspensedQueryBoundary>
      </div>
    </main>
  );
}
