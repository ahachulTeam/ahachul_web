import React from 'react';

import type { LostFoundFilters } from '@ahhachul/schemas';

import { UiComponent } from '@/components';
import { useActivity } from '@/stackflow';
import type { IFilterState } from '@/types/filter';

import * as S from './LostFoundFilters.styled';

interface LostFoundFilterListProps extends Omit<IFilterState<LostFoundFilters>, 'loaded'> {
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
        </S.FilterListWrap>
      </S.FilterGroup>
    </>
  );
};

export default LostFoundFilters;
