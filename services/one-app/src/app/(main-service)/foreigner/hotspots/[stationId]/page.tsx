import { getServerLocale } from '@/i18n/server';

import ForeignerHotspotDetailClient from './_components/ForeignerHotspotDetailClient';

type Props = {
  params: Promise<{ stationId: string }>;
  searchParams: Promise<{ subwayLineId?: string }>;
};

export default async function ForeignerHotspotDetailPage({ params, searchParams }: Props) {
  const locale = await getServerLocale();
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  return (
    <ForeignerHotspotDetailClient
      locale={locale}
      stationId={Number(resolvedParams.stationId)}
      subwayLineId={Number(resolvedSearch.subwayLineId ?? 0)}
    />
  );
}
