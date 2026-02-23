'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';

import LanguageSelector from '@/app/_components/LanguageSelector';
import { useStationTimeSummaryV2Query, useTrainRealtimeV2Query } from '@/hooks';
import { localizePathname, type LocaleMessages, type SupportedLocale } from '@/i18n';
import { AuthService } from '@/lib/auth-service';
import { mapRealtimePayloadToSectionVM, type StationTimeWeekType } from '@/types';

import { getMyFavoriteStations, getMyProfile } from '../_lib/getMyProfile';

const cardClassName = 'rounded-2xl border border-gray-30 bg-white p-4';

function resolveStationTimeWeekType(currentDate = new Date()): StationTimeWeekType {
  const day = currentDate.getDay();
  if (day === 0) {
    return 'HOLIDAY';
  }
  if (day === 6) {
    return 'SATURDAY';
  }
  return 'WEEKDAY';
}

function formatStationTime(time: string | null | undefined) {
  if (!time) {
    return '--:--';
  }
  return time.slice(0, 5);
}

type MyDashboardProps = {
  locale: SupportedLocale;
  copy: LocaleMessages['me'];
};

export default function MyDashboard({ locale, copy }: MyDashboardProps) {
  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useQuery({
    queryKey: myQueryKeys.profile(),
    queryFn: getMyProfile,
    staleTime: QUERY_STALE_TIME.user,
  });

  const { data: stations } = useQuery({
    queryKey: myQueryKeys.favoriteStations(),
    queryFn: getMyFavoriteStations,
    staleTime: QUERY_STALE_TIME.user,
  });

  const profileReady = Boolean(profile?.result) && !isProfilePending && !isProfileError;
  const favoriteStations = stations?.result.stationInfoList ?? [];
  const stationNames = favoriteStations.map(station => station.stationName);
  const primaryStation = favoriteStations[0];
  const stationTimeWeekType = resolveStationTimeWeekType();
  const {
    data: realtimeResponse,
    isPending: isRealtimePending,
    isFetching: isRealtimeFetching,
    isError: isRealtimeError,
    refetch: refetchRealtime,
  } = useTrainRealtimeV2Query(
    {
      stationId: primaryStation?.stationId ?? 0,
      subwayLineId: primaryStation?.lineId ?? 0,
      limit: 2,
    },
    {
      enabled: profileReady && Boolean(primaryStation),
    },
  );
  const {
    data: summaryResponse,
    isPending: isSummaryPending,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useStationTimeSummaryV2Query(
    {
      stationId: primaryStation?.stationId ?? 0,
      subwayLineId: primaryStation?.lineId ?? 0,
      stationTimeWeekType,
    },
    {
      enabled: profileReady && Boolean(primaryStation),
    },
  );
  const realtimeSection = realtimeResponse?.result
    ? mapRealtimePayloadToSectionVM(realtimeResponse.result)
    : null;
  const summaryByType = summaryResponse?.result.summaries.reduce<
    Partial<Record<'UP' | 'DOWN', { first: string | null; last: string | null }>>
  >((accumulator, summary) => {
    accumulator[summary.upDownType] = {
      first: summary.firstDepartureTime,
      last: summary.lastDepartureTime,
    };
    return accumulator;
  }, {});
  const handleRealtimeRefresh = () => {
    void refetchRealtime();
    void refetchSummary();
  };

  if (isProfilePending) {
    return (
      <section className="space-y-3 px-5 pb-24 pt-4">
        <div className={`${cardClassName} h-[122px] animate-pulse bg-gray-20`} />
        <div className={`${cardClassName} h-[172px] animate-pulse bg-gray-20`} />
      </section>
    );
  }

  if (isProfileError || !profile?.result) {
    return (
      <section className="px-5 pb-24 pt-4">
        <article className={cardClassName}>
          <h2 className="text-title-small text-gray-90">{copy.authRequiredTitle}</h2>
          <p className="mt-2 text-body-medium text-gray-70">{copy.authRequiredDescription}</p>
          <Link
            href={localizePathname('/login', locale)}
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-key-color px-4 text-label-medium text-white"
          >
            {copy.goToLogin}
          </Link>
        </article>
      </section>
    );
  }

  const member = profile.result;
  const handleLogout = () => AuthService.expireSession();
  let realtimeContent = <p className="text-body-small text-gray-70">{copy.realtime.empty}</p>;
  if (isRealtimePending) {
    realtimeContent = <p className="text-body-small text-gray-70">{copy.realtime.loading}</p>;
  } else if (isRealtimeError) {
    realtimeContent = <p className="text-body-small text-danger">{copy.realtime.error}</p>;
  } else if (realtimeSection?.empty) {
    realtimeContent = <p className="text-body-small text-gray-70">{copy.realtime.empty}</p>;
  } else if (realtimeSection) {
    realtimeContent = (
      <ul className="space-y-1">
        {realtimeSection.cards.slice(0, 2).map(card => (
          <li key={card.id} className="text-body-small text-gray-90">
            {card.upDownType} · {card.etaMinDisplay}
            {copy.realtime.minuteSuffix} · {card.destinationText}
          </li>
        ))}
      </ul>
    );
  }

  let summaryContent = (
    <div className="mt-1 space-y-1 text-body-small text-gray-90">
      <p>
        {copy.realtime.upLabel} {formatStationTime(summaryByType?.UP?.first)} /{' '}
        {formatStationTime(summaryByType?.UP?.last)}
      </p>
      <p>
        {copy.realtime.downLabel} {formatStationTime(summaryByType?.DOWN?.first)} /{' '}
        {formatStationTime(summaryByType?.DOWN?.last)}
      </p>
    </div>
  );

  if (isSummaryPending) {
    summaryContent = (
      <p className="mt-1 text-body-small text-gray-70">{copy.realtime.summaryLoading}</p>
    );
  } else if (isSummaryError) {
    summaryContent = (
      <p className="mt-1 text-body-small text-danger">{copy.realtime.summaryError}</p>
    );
  }

  return (
    <section className="space-y-3 px-5 pb-24 pt-4">
      <article className={`${cardClassName} bg-gradient-to-r from-green-50 to-white`}>
        <p className="text-label-small text-gray-80">{copy.profileLabel}</p>
        <h2 className="mt-1 text-headline-small text-gray-100">{member.nickname}</h2>
        <p className="mt-1 text-body-medium text-gray-80">{member.email || copy.noEmail}</p>
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={localizePathname(`/user/${encodeURIComponent(member.nickname)}`, locale)}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            {copy.viewProfile}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-9 items-center rounded-lg border border-gray-40 px-3 text-label-medium text-gray-90"
          >
            {copy.logout}
          </button>
        </div>
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">{copy.quickLinksHeading}</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={localizePathname('/messages', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.messages}
          </Link>
          <Link
            href={localizePathname('/notifications', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.notifications}
          </Link>
          <Link
            href={localizePathname('/community', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.community}
          </Link>
          <Link
            href={localizePathname('/complaint', locale)}
            className="rounded-xl bg-gray-20 p-3 text-label-medium text-gray-90"
          >
            {copy.quickLinks.complaint}
          </Link>
        </div>
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">{copy.subwaySettingsHeading}</h3>
        {stationNames.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {stationNames.map(stationName => (
              <li
                key={stationName}
                className="rounded-full border border-gray-30 bg-gray-10 px-3 py-1 text-body-small text-gray-90"
              >
                {stationName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-body-medium text-gray-70">{copy.noFavoriteStations}</p>
        )}
        {primaryStation && (
          <div className="mt-4 rounded-xl border border-gray-30 bg-gray-10 p-3">
            <div className="flex items-center justify-between">
              <h4 className="text-label-medium text-gray-100">
                {copy.realtime.title.replace('{station}', primaryStation.stationName)}
              </h4>
              <button
                type="button"
                onClick={handleRealtimeRefresh}
                className="rounded-md border border-gray-40 px-2 py-1 text-label-small text-gray-90"
                disabled={isRealtimeFetching}
              >
                {copy.realtime.refresh}
              </button>
            </div>
            <p className="mt-1 text-body-small text-gray-70">
              {realtimeSection?.updatedAtLabel ?? copy.realtime.updatedAtFallback}
            </p>

            <div className="mt-3 space-y-1">{realtimeContent}</div>

            <div className="mt-3 border-t border-gray-30 pt-2">
              <p className="text-label-small text-gray-80">{copy.realtime.firstLastTitle}</p>
              {summaryContent}
            </div>
          </div>
        )}
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">{copy.languageSectionTitle}</h3>
        <LanguageSelector className="mt-3" />
      </article>
    </section>
  );
}
