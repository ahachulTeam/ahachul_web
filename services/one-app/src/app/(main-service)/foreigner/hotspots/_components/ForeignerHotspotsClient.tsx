'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { localizePathname, type SupportedLocale } from '@/i18n';
import { fetchForeignerStationSocialHotspotsV2 } from '@/lib/foreigner-mode';
import type { ForeignerLocale } from '@/types';

type Props = {
  locale: SupportedLocale;
};

function resolveForeignerLocale(locale: SupportedLocale): ForeignerLocale {
  if (locale === 'ko') {
    return 'ko';
  }
  return 'en';
}

export default function ForeignerHotspotsClient({ locale }: Props) {
  const foreignerLocale = resolveForeignerLocale(locale);

  const hotspotsQuery = useQuery({
    queryKey: ['foreigner', 'station-social', 'hotspots', foreignerLocale],
    queryFn: () => fetchForeignerStationSocialHotspotsV2(foreignerLocale),
  });

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md bg-white px-5 py-6">
      <h1 className="text-heading-small text-gray-100">외국인 역 소셜 허브</h1>
      <p className="mt-2 text-body-small text-gray-80">
        외국인 방문이 많은 주요 5개 역의 모임, 후기, 문화 팁을 한 번에 확인하세요.
      </p>

      {hotspotsQuery.isLoading ? (
        <p className="mt-4 text-body-small text-gray-70">핫스팟 정보를 불러오는 중입니다.</p>
      ) : null}

      {hotspotsQuery.isError ? (
        <p className="mt-4 text-body-small text-danger">핫스팟 정보를 불러오지 못했습니다.</p>
      ) : null}

      {!hotspotsQuery.isLoading && !hotspotsQuery.isError ? (
        <ul className="mt-4 space-y-3">
          {hotspotsQuery.data?.hotspots.map(hotspot => (
            <li key={hotspot.stationId}>
              <Link
                href={localizePathname(
                  `/foreigner/hotspots/${hotspot.stationId}?subwayLineId=${hotspot.subwayLineId}`,
                  locale,
                )}
                className="block rounded-2xl border border-gray-20 bg-gray-05 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-label-small text-gray-70">{hotspot.districtLabel}</p>
                    <p className="mt-1 text-title-small text-gray-100">
                      {hotspot.stationNameLocalized} · {hotspot.lineNameLocalized}
                    </p>
                    <p className="mt-1 text-label-small text-gray-70">
                      Romanized: {hotspot.romanizedName}
                    </p>
                  </div>
                  <p className="rounded-full border border-key-color/30 bg-key-color/10 px-2 py-0.5 text-label-small text-key-color">
                    모임 {hotspot.upcomingMeetupCount}
                  </p>
                </div>
                <p className="mt-2 text-body-small text-gray-80">{hotspot.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {hotspot.contentTags.map(tag => (
                    <span
                      key={`${hotspot.stationId}-${tag}`}
                      className="rounded-full border border-gray-30 px-2 py-0.5 text-label-small text-gray-80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
