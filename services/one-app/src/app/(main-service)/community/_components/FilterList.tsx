'use client';

import { useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { QUERY_GC_TIME, QUERY_STALE_TIME, subwayQueryKeys } from '@ahhachul/domain';
import { API_PATHS } from '@ahhachul/http';

import { ResetFilter, DropdownFilter } from '@/components';
import { communityTypeOptions, defaultCommunityFilterValues } from '@/constants/community';
import { SUBWAY_LINES } from '@/constants/subway';
import { fetchClient } from '@/lib/fetch-client';
import type { ApiResponse } from '@/types';
import { CommunityType } from '@/types/community';

type Station = {
  id: number;
  name: string;
};

type SubwayLine = {
  id: number;
  name: string;
  stations: Station[];
};

type SubwayLineCatalogResponse = {
  subwayLines: SubwayLine[];
};

const DEFAULT_FILTER_VALUE = '0';

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = (searchParams.get('category') as CommunityType) ?? CommunityType.HOT;
  const selectedSubwayLineId = searchParams.get('subwayLineId') ?? DEFAULT_FILTER_VALUE;
  const selectedStationId = searchParams.get('stationId') ?? DEFAULT_FILTER_VALUE;

  const { data } = useQuery({
    queryKey: subwayQueryKeys.subwayLine(),
    queryFn: () => fetchClient<ApiResponse<SubwayLineCatalogResponse>>(API_PATHS.subway.lines),
    staleTime: QUERY_STALE_TIME.static,
    gcTime: QUERY_GC_TIME.static,
  });

  const subwayLines = data?.result.subwayLines;

  const subwayLineIdOptions = useMemo(() => {
    if (!subwayLines?.length) {
      return {
        [DEFAULT_FILTER_VALUE]: '전체 호선 보기',
        ...SUBWAY_LINES.reduce<Record<string, string>>((acc, line) => {
          acc[String(line.id)] = line.name;
          return acc;
        }, {}),
      };
    }

    return {
      [DEFAULT_FILTER_VALUE]: '전체 호선 보기',
      ...subwayLines.reduce<Record<string, string>>((acc, line) => {
        acc[String(line.id)] = line.name;
        return acc;
      }, {}),
    };
  }, [subwayLines]);

  const stationIdOptions = useMemo<Record<string, string>>(() => {
    if (selectedSubwayLineId === DEFAULT_FILTER_VALUE || !subwayLines?.length) {
      return {
        [DEFAULT_FILTER_VALUE]: '전체 역 보기',
      };
    }

    const selectedLine = subwayLines.find(line => String(line.id) === selectedSubwayLineId);
    if (!selectedLine) {
      return {
        [DEFAULT_FILTER_VALUE]: '전체 역 보기',
      };
    }

    return {
      [DEFAULT_FILTER_VALUE]: '전체 역 보기',
      ...selectedLine.stations.reduce<Record<string, string>>((acc, station) => {
        acc[String(station.id)] = `${station.name}역`;
        return acc;
      }, {}),
    };
  }, [selectedSubwayLineId, subwayLines]);

  const normalizedStationId = stationIdOptions[selectedStationId]
    ? selectedStationId
    : DEFAULT_FILTER_VALUE;

  useEffect(() => {
    const stationIsValid = !!stationIdOptions[selectedStationId];
    if (selectedStationId === DEFAULT_FILTER_VALUE || stationIsValid) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete('stationId');
    const nextQuery = nextSearchParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }, [pathname, router, searchParams, selectedStationId, stationIdOptions]);

  return (
    <section className=" flex items-center gap-2 px-5 mt-4">
      <ResetFilter options={defaultCommunityFilterValues} />
      <DropdownFilter name="category" value={category} options={communityTypeOptions} />
      <DropdownFilter
        name="subwayLineId"
        value={selectedSubwayLineId as keyof typeof subwayLineIdOptions}
        options={subwayLineIdOptions}
      />
      <DropdownFilter
        name="stationId"
        value={normalizedStationId as keyof typeof stationIdOptions}
        options={stationIdOptions}
      />
    </section>
  );
};

export default Filters;
