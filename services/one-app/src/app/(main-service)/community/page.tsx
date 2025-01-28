import type { Metadata } from 'next';

import SearchForm from '@/component/SearchForm';
import { SUBWAY_LINES } from '@/constant';
import { SubwayLineFilterOptions } from '@/types';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ subwayLineId?: string }>;
}): Promise<Metadata> {
  const { subwayLineId } = await searchParams;

  let title = '커뮤니티 / 아하철 - 1등 지하철 유실물 & 민원 정보앱';

  if (subwayLineId && +subwayLineId !== 0) {
    title = SUBWAY_LINES.find(subway => subway.id === +subwayLineId)?.name + ' ' + title;
  }

  return {
    title,
    description: '지하철에 당신의 따뜻한 이야기를 채워나가요',
    applicationName: '아하철 | AhHachul',
    keywords:
      '지하철, 지하철 민원, 지하철 유실물, 지하철 분실물, 1호선, 2호선, 3호선, 4호선, 5호선, 6호선, 7호선, 8호선, 9호선, 신분당선, 수인분당선, 경의중앙선',
    viewport: { width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false },
  };
}

type Props = {
  searchParams: Promise<{ q?: string; category?: string; subwayLineId?: SubwayLineFilterOptions }>;
};

export default async function CommunityPage({ searchParams }: Props) {
  const query = await searchParams;

  return (
    <main className="flex min-h-screen flex-col bg-white ">
      <SearchForm
        actionString="/community"
        q={query.q}
        category={query.category}
        subwayLineId={query.subwayLineId}
      />
      {/* <Filters queries={queries} /> */}
      {/* <Suspense fallback={<div>loading...</div>}>
    <LostFoundPostsSuspense queries={queries} />
  </Suspense> */}
    </main>
  );
}
