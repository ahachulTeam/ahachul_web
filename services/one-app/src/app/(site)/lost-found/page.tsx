'use client';

import { Suspense } from 'react';
import { useLostFoundFilters } from './_lib';
import { LostFoundFilterList, LostFoundSearchedList } from './_components';
import {
  Spinner,
  SuspenseQueryBoundary,
  ArticleListSuspenseFallback,
} from '@/common/components';

function LostFound() {
  const { loaded, keyword, filters, boundaryKeys, getFilterProps } =
    useLostFoundFilters();

  return loaded ? (
    <main className="flex min-h-screen flex-col text-black bg-white ">
      <div className="flex flex-col gap-[25px]">
        <LostFoundFilterList {...getFilterProps()} />
        <SuspenseQueryBoundary
          keys={boundaryKeys}
          resetError={() => {}}
          errorFallback={<div>error</div>}
          suspenseFallback={<ArticleListSuspenseFallback />}
        >
          <LostFoundSearchedList keyword={keyword} filters={filters} />
        </SuspenseQueryBoundary>
      </div>
    </main>
  ) : (
    <Spinner />
  );
}

export default function LostFoundPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LostFound />
    </Suspense>
  );
}
