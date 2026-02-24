import React, { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME, subwayQueryKeys } from '@ahhachul/domain';

import { fetchSubwayLines } from '@/apis/request/subway';
import { UiComponent } from '@/components';
import {
  lostFoundFilterKeys,
  lostFoundTypeOptions,
  subwayLineFilterOptions as baseSubwayLineFilterOptions,
} from '@/constants';
import { useActivity } from '@/stackflow';
import type { IFilterState } from '@/stores/filter';
import { SubwayLineFilterOptions } from '@/types';
import type { LostFoundFilters as TypeLostFoundFilters } from '@/types/lostFound';

import * as S from './LostFoundFilters.styled';

interface LostFoundFilterListProps extends Omit<IFilterState<TypeLostFoundFilters>, 'loaded'> {
  isScale: boolean;
  toggleScale: () => void;
}

const LostFoundFilters: React.FC<LostFoundFilterListProps> = ({
  isScale,
  toggleScale,
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
      ...baseSubwayLineFilterOptions,
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
    key: keyof TypeLostFoundFilters,
    value: TypeLostFoundFilters[keyof TypeLostFoundFilters],
  ) => {
    handleSelect(key, value);

    if (key === lostFoundFilterKeys.subwayLineId) {
      handleSelect(
        lostFoundFilterKeys.stationId,
        defaultStationId as TypeLostFoundFilters[keyof TypeLostFoundFilters],
      );
    }
  };

  return (
    <>
      <S.Motion isScale={isScale} />
      <S.FilterGroup isScale={isScale} isActive={isActive}>
        <UiComponent.SearchInput uniqueId="LostFoundPage" toggleScale={toggleScale} />
        <S.FilterListWrap>
          <UiComponent.FilterActions
            activeFilterCount={activatedCount}
            removeAllFilterControl={handleReset}
          />
          <UiComponent.DropdownFilter
            filters={filters}
            name={lostFoundFilterKeys.lostType}
            options={lostFoundTypeOptions}
            onSelect={handleSelectWithStationReset}
          />
          <UiComponent.DropdownFilter
            filters={filters}
            name={lostFoundFilterKeys.subwayLineId}
            options={subwayLineFilterOptions}
            onSelect={handleSelectWithStationReset}
          />
          <UiComponent.DropdownFilter
            filters={{
              ...filters,
              stationId: normalizedStationId,
            }}
            name={lostFoundFilterKeys.stationId}
            options={stationFilterOptions}
            onSelect={handleSelectWithStationReset}
          />
        </S.FilterListWrap>
      </S.FilterGroup>
    </>
  );
};

export default LostFoundFilters;
