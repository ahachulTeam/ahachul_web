import React from 'react';

import { UiComponent } from '@/components';
import { compalintFilterKeys, subwayLineFilterOptions } from '@/constants';
import { useActivity } from '@/stackflow';
import type { IFilterState } from '@/stores/filter';
import type { ComplaintFilters as TypeComplaintFilters } from '@/types/complaint';

import * as S from './ComplaintFilters.styled';

interface ComplaintFilterListProps extends Omit<IFilterState<TypeComplaintFilters>, 'loaded'> {
  isScale: boolean;
  toggleScale: () => void;
}

const ComplaintFilters: React.FC<ComplaintFilterListProps> = ({
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
            name={compalintFilterKeys.subwayLineId}
            options={subwayLineFilterOptions}
            onSelect={handleSelect}
          />
        </S.FilterListWrap>
      </S.FilterGroup>
    </>
  );
};

export default ComplaintFilters;
