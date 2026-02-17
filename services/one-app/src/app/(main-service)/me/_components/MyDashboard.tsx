'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { QUERY_STALE_TIME, myQueryKeys } from '@ahhachul/domain';

import LanguageSelector from '@/app/_components/LanguageSelector';
import { localizePathname, type LocaleMessages, type SupportedLocale } from '@/i18n';
import { AuthService } from '@/lib/auth-service';

import { getMyFavoriteStations, getMyProfile } from '../_lib/getMyProfile';

const cardClassName = 'rounded-2xl border border-gray-30 bg-white p-4';

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
  const stationNames = stations?.result.stationInfoList?.map(station => station.stationName) ?? [];

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
            onClick={() => AuthService.expireSession()}
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
      </article>

      <article className={cardClassName}>
        <h3 className="text-title-small text-gray-100">{copy.languageSectionTitle}</h3>
        <LanguageSelector className="mt-3" />
      </article>
    </section>
  );
}
