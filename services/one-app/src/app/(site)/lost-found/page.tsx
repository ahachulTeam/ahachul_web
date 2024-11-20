import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/plus';
import LostFoundList from './_components/LostFoundList';
import { SuspensedQueryBoundary } from '@/common/components/SuspensedQueryBoundary/SuspensedQueryBoundary';

export default function LostFoundPage() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
        <Link href={'/lost-found/1'}>
          <PlusIcon />
        </Link>
        <SuspensedQueryBoundary suspenseFallback={<div>loading</div>}>
          <LostFoundList />
        </SuspensedQueryBoundary>
      </div>
    </main>
  );
}
