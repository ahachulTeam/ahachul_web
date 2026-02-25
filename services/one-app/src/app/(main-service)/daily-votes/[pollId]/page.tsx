import { getServerLocale } from '@/i18n/server';

import DailyVoteDetailClient from './_components/DailyVoteDetailClient';

type Props = {
  params: Promise<{ pollId: string }>;
  searchParams: Promise<{ question?: string; stationName?: string }>;
};

export default async function DailyVoteDetailPage({ params, searchParams }: Props) {
  const locale = await getServerLocale();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const pollId = Number(resolvedParams.pollId);

  return (
    <DailyVoteDetailClient
      locale={locale}
      pollId={Number.isFinite(pollId) ? pollId : 0}
      question={resolvedSearchParams.question}
      stationName={resolvedSearchParams.stationName}
    />
  );
}
