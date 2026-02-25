'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { localizePathname, type SupportedLocale } from '@/i18n';
import { fetchForeignerStationSocialHotspotsV2 } from '@/lib/foreigner-mode';
import type { ForeignerLocale } from '@/types';

type Props = {
  locale: SupportedLocale;
};

type ExchangePurpose = 'LANGUAGE_EXCHANGE' | 'FRIENDSHIP';

function resolveForeignerLocale(locale: SupportedLocale): ForeignerLocale {
  if (locale === 'ko') {
    return 'ko';
  }
  return 'en';
}

function resolvePurposeLabel(purpose: ExchangePurpose): string {
  return purpose === 'LANGUAGE_EXCHANGE' ? '언어교환' : '친목';
}

export default function ForeignerLanguageExchangeClient({ locale }: Props) {
  const foreignerLocale = resolveForeignerLocale(locale);

  const hotspotsQuery = useQuery({
    queryKey: ['foreigner', 'language-exchange', 'hotspots', foreignerLocale],
    queryFn: () => fetchForeignerStationSocialHotspotsV2(foreignerLocale),
  });

  const buildDetailHref = (
    stationId: number,
    subwayLineId: number,
    purpose: ExchangePurpose,
  ): string => {
    const search = new URLSearchParams();
    search.set('subwayLineId', String(subwayLineId));
    search.set('purpose', purpose);
    return `${localizePathname(`/foreigner/hotspots/${stationId}`, locale)}?${search.toString()}`;
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-md bg-white px-5 py-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-heading-small text-gray-100">외국인-한국인 언어교환/친목 허브</h1>
        <Link
          href={localizePathname('/foreigner/hotspots', locale)}
          className="text-label-small text-key-color"
        >
          역 소셜 허브
        </Link>
      </div>
      <p className="mt-2 text-body-small text-gray-80">
        한국인과 외국인 누구나 같은 역 기반으로 언어교환 모임을 만들고, 친목 모임으로 이어갈 수
        있습니다.
      </p>
      <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <p className="text-body-small text-emerald-900">
          한국인: 배우고 싶은 언어를 설정하고 참여하세요. 외국인: 한국어 또는 모국어 교환 파트너를
          찾을 수 있어요.
        </p>
      </div>

      {hotspotsQuery.isLoading ? (
        <p className="mt-4 text-body-small text-gray-70">허브 데이터를 불러오는 중입니다.</p>
      ) : null}
      {hotspotsQuery.isError ? (
        <p className="mt-4 text-body-small text-danger">허브 데이터를 불러오지 못했습니다.</p>
      ) : null}

      {!hotspotsQuery.isLoading && !hotspotsQuery.isError ? (
        <ul className="mt-4 space-y-3">
          {hotspotsQuery.data?.hotspots.map(hotspot => (
            <li
              key={`language-exchange-${hotspot.stationId}`}
              className="rounded-2xl border border-gray-20 bg-gray-05 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-label-small text-gray-70">{hotspot.districtLabel}</p>
                  <p className="mt-1 text-title-small text-gray-100">
                    {hotspot.stationNameLocalized} · {hotspot.lineNameLocalized}
                  </p>
                </div>
                <p className="rounded-full border border-key-color/30 bg-key-color/10 px-2 py-0.5 text-label-small text-key-color">
                  모임 {hotspot.upcomingMeetupCount}
                </p>
              </div>
              <p className="mt-2 text-body-small text-gray-80">{hotspot.summary}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(['LANGUAGE_EXCHANGE', 'FRIENDSHIP'] as const).map(purpose => (
                  <Link
                    key={`${hotspot.stationId}-${purpose}`}
                    href={buildDetailHref(hotspot.stationId, hotspot.subwayLineId, purpose)}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-30 bg-white px-3 py-2 text-label-small text-gray-90"
                  >
                    {resolvePurposeLabel(purpose)} 모임 열기
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
