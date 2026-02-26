import { getServerLocale } from '@/i18n/server';

import DailyVoteStationBoardClient from './_components/DailyVoteStationBoardClient';

type Props = {
  params: Promise<{ stationId: string }>;
  searchParams: Promise<{ stationName?: string; subwayLineId?: string; subwayLineName?: string }>;
};

export default async function DailyVoteStationBoardPage({ params, searchParams }: Props) {
  const locale = await getServerLocale();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const stationId = Number(resolvedParams.stationId);
  const subwayLineId = Number(resolvedSearchParams.subwayLineId);

  return (
    <DailyVoteStationBoardClient
      locale={locale}
      stationId={Number.isFinite(stationId) ? stationId : 0}
      stationName={resolvedSearchParams.stationName}
      subwayLineId={Number.isFinite(subwayLineId) ? subwayLineId : undefined}
      subwayLineName={resolvedSearchParams.subwayLineName}
    />
  );
}
