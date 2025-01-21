import React from 'react';

import { UiComponent } from '@/components';
import { communityFilterKeys, communityTypeOptions, subwayLineFilterOptions } from '@/constants';
import { useActivity } from '@/stackflow';
import type { IFilterState } from '@/stores/filter';
import type { CommunityFilters as TypeCommunityFilters } from '@/types/community';

import * as S from './CommunityFilters.styled';

interface CommunityFilterListProps extends Omit<IFilterState<TypeCommunityFilters>, 'loaded'> {
  isScale: boolean;
  toggleScale: () => void;
}

const CommunityFilters: React.FC<CommunityFilterListProps> = ({
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
        <UiComponent.SearchInput uniqueId="CommunityPage" toggleScale={toggleScale} />
        <S.FilterListWrap>
          <UiComponent.FilterActions
            activeFilterCount={activatedCount}
            removeAllFilterControl={handleReset}
          />
          <UiComponent.DropdownFilter
            filters={filters}
            name={communityFilterKeys.communityType}
            options={communityTypeOptions}
            onSelect={handleSelect}
          />
          <UiComponent.DropdownFilter
            filters={filters}
            name={communityFilterKeys.subwayLineId}
            options={subwayLineFilterOptions}
            onSelect={handleSelect}
          />
          <UiComponent.DrawerFilter label="작성자" drawerTitle="작성자별 필터" />
        </S.FilterListWrap>
      </S.FilterGroup>
    </>
  );
};

export default CommunityFilters;
