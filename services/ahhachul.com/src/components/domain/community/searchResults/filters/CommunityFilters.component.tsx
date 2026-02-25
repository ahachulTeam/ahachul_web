import React, { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME, subwayQueryKeys } from '@ahhachul/domain';

import { fetchSubwayLines } from '@/apis/request/subway';
import { UiComponent } from '@/components';
import { communityFilterKeys, communityTypeOptions } from '@/constants';
import { APP_UNIQUE_FILTER_ID_LIST } from '@/constants/filter';
import { useActivity } from '@/stackflow';
import type { IFilterState } from '@/stores/filter';
import { SubwayLineFilterOptions } from '@/types';
import type { CommunityFilters as TypeCommunityFilters } from '@/types/community';
import type { AppUniqueFilterId } from '@/types/filter';

import * as S from './CommunityFilters.styled';

interface CommunityFilterListProps extends Omit<IFilterState<TypeCommunityFilters>, 'loaded'> {
  isScale: boolean;
  toggleScale: () => void;
  searchInputUniqueId?: AppUniqueFilterId;
}

const CommunityFilters: React.FC<CommunityFilterListProps> = ({
  isScale,
  toggleScale,
  searchInputUniqueId = APP_UNIQUE_FILTER_ID_LIST.CommunityPage,
  filters,
  activatedCount,
  handleSelect,
  handleReset,
}) => {
  const { isActive } = useActivity();
  const defaultStationId = '0';

  const { data: subwayLineResponse } = useQuery({
    queryKey: subwayQueryKeys.subwayLine(),
    queryFn: fetchSubwayLines,
    staleTime: QUERY_STALE_TIME.static,
    gcTime: QUERY_GC_TIME.static,
  });

  const subwayLines = subwayLineResponse?.data.result.subwayLines ?? [];

  const subwayLineFilterOptions = useMemo<Record<string, string>>(() => {
    const dynamicLineOptions = subwayLines.reduce<Record<string, string>>((acc, line) => {
      acc[String(line.id)] = line.name;
      return acc;
    }, {});

    return {
      [SubwayLineFilterOptions.ALL_LINES]: '전체 호선 보기',
      [SubwayLineFilterOptions.ONLY_MY_LINE]: '내 호선만 보기',
      ...dynamicLineOptions,
    };
  }, [subwayLines]);

  const stationFilterOptions = useMemo<Record<string, string>>(() => {
    if (
      filters.subwayLineId === SubwayLineFilterOptions.ALL_LINES ||
      filters.subwayLineId === SubwayLineFilterOptions.ONLY_MY_LINE
    ) {
      return { [defaultStationId]: '전체 역 보기' };
    }

    const selectedLine = subwayLines.find(line => String(line.id) === filters.subwayLineId);
    if (!selectedLine) {
      return { [defaultStationId]: '전체 역 보기' };
    }

    return {
      [defaultStationId]: '전체 역 보기',
      ...selectedLine.stations.reduce<Record<string, string>>((acc, station) => {
        acc[String(station.id)] = `${station.name}역`;
        return acc;
      }, {}),
    };
  }, [defaultStationId, filters.subwayLineId, subwayLines]);

  const normalizedStationId = stationFilterOptions[filters.stationId]
    ? filters.stationId
    : defaultStationId;

  const handleSelectWithStationReset = (
    key: keyof TypeCommunityFilters,
    value: TypeCommunityFilters[keyof TypeCommunityFilters],
  ) => {
    handleSelect(key, value);

    if (key === communityFilterKeys.subwayLineId) {
      handleSelect(
        communityFilterKeys.stationId,
        defaultStationId as TypeCommunityFilters[keyof TypeCommunityFilters],
      );
    }
  };

  return (
    <>
      <S.Motion isScale={isScale} />
      <S.FilterGroup isScale={isScale} isActive={isActive}>
        <UiComponent.SearchInput uniqueId={searchInputUniqueId} toggleScale={toggleScale} />
        <S.FilterListWrap>
          <UiComponent.FilterActions
            activeFilterCount={activatedCount}
            removeAllFilterControl={handleReset}
          />
          <UiComponent.DropdownFilter
            filters={filters}
            name={communityFilterKeys.communityType}
            options={communityTypeOptions}
            onSelect={handleSelectWithStationReset}
          />
          <UiComponent.DropdownFilter
            filters={filters}
            name={communityFilterKeys.subwayLineId}
            options={subwayLineFilterOptions}
            onSelect={handleSelectWithStationReset}
          />
          <UiComponent.DropdownFilter
            filters={{
              ...filters,
              stationId: normalizedStationId,
            }}
            name={communityFilterKeys.stationId}
            options={stationFilterOptions}
            onSelect={handleSelectWithStationReset}
          />
          <UiComponent.DrawerFilter label="작성자" drawerTitle="작성자별 필터" />
        </S.FilterListWrap>
      </S.FilterGroup>
    </>
  );
};

export default CommunityFilters;
