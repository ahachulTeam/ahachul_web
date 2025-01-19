import React from 'react';

import { UiComponent } from '@/components';
import { lostFoundFilterKeys, lostFoundTypeOptions, subwayLineFilterOptions } from '@/constants';
import { useActivity } from '@/stackflow';
import type { IFilterState } from '@/stores/filter';
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
            onSelect={handleSelect}
          />
          <UiComponent.DropdownFilter
            filters={filters}
            name={lostFoundFilterKeys.subwayLineId}
            options={subwayLineFilterOptions}
            onSelect={handleSelect}
          />
        </S.FilterListWrap>
      </S.FilterGroup>
    </>
  );
};

export default LostFoundFilters;
