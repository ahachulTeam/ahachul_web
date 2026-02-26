import { getServerLocale } from '@/i18n/server';

import DailyVoteHubClient from './_components/DailyVoteHubClient';

type Props = {
  searchParams: Promise<{
    stationId?: string;
    stationName?: string;
    subwayLineId?: string;
    subwayLineName?: string;
  }>;
};

export default async function DailyVoteHubPage({ searchParams }: Props) {
  const locale = await getServerLocale();
  const resolvedSearchParams = await searchParams;
  const stationId = Number(resolvedSearchParams.stationId);
  const subwayLineId = Number(resolvedSearchParams.subwayLineId);

  return (
    <DailyVoteHubClient
      locale={locale}
      stationId={Number.isFinite(stationId) ? stationId : undefined}
      stationName={resolvedSearchParams.stationName}
      subwayLineId={Number.isFinite(subwayLineId) ? subwayLineId : undefined}
      subwayLineName={resolvedSearchParams.subwayLineName}
    />
  );
}
