import { Suspense } from 'react';
import Link from 'next/link';
import PlusIcon from '@/common/assets/icons/plus';
import LoggedIn from './(site)/_component/LoggedIn';
import UseQueryComponent from './(site)/_component/UseQueryComponent';
import UseSuspenseQueryComponent from './(site)/_component/UseSuspenseQueryComponent';
import { UnPredictableErrorBoundary } from './(site)/_component/PartialErrorExample';
import SpinnerIcon from '@/common/assets/icons/loading-spinner';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-3">
        <Link href={'/login'}>
          <PlusIcon />
        </Link>
        <LoggedIn />
        <UseQueryComponent />
      </div>
    </main>
  );
}
