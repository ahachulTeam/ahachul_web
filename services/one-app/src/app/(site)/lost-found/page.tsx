'use client';
import { Suspense } from 'react';

import LostFoundFilterList from './_components/searchResults/filterList/FilterList';
import LostFoundSearchedList from './_components/searchResults/searchedList/SearchedList';
import { useLostFoundFilters } from './_lib/useLostFoundFilterStore';
import { SuspenseQueryBoundary } from '@/common/components/SuspenseQueryBoundary/SuspenseQueryBoundary';

const LoadingPage = () => <div>Loading...</div>;

function LostFound() {
  const { loaded, keyword, filters, boundaryKeys, getFilterProps } =
    useLostFoundFilters();

  return loaded ? (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col">
        <LostFoundFilterList {...getFilterProps()} />
        <SuspenseQueryBoundary
          keys={boundaryKeys}
          resetError={() => {}}
          errorFallback={<div>error</div>}
          suspenseFallback={<div>loading</div>}
        >
          <LostFoundSearchedList keyword={keyword} filters={filters} />
        </SuspenseQueryBoundary>
      </div>
    </main>
  ) : (
    <LoadingPage />
  );
}

export default function LostFoundPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <LostFound />
    </Suspense>
  );
}
