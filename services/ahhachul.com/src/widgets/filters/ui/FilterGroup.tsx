import React from 'react';
import { useActivity } from 'app/stackflow';
import { SearchFilter } from './SearchFilter';
import { DrawerFilter } from './DrawerFilter';
import { FilterManager } from './FilterManager';
import { DropdownFilter } from './DropdownFilter';
import { useKeywordSearch } from '../lib/useKeywordSearch';
import type { AppUniqueFilterId } from '../model';
import * as styles from './Filter.css';

interface FilterGroupProps {
  children: React.ReactNode;
  uniqueId: AppUniqueFilterId;
  isScale: boolean;
  controlledFilterLength: number;
  handleScale: () => void;
  resetFilters: () => void;
}

type FilterGroupMainType = React.FC<FilterGroupProps>;

const FilterGroupMain: FilterGroupMainType = ({
  children,
  uniqueId,
  isScale,
  controlledFilterLength,
  handleScale,
  resetFilters,
}) => {
  const { isActive } = useActivity();
  const { updateKeyword, resetKeyword } = useKeywordSearch(uniqueId);

  return (
    <>
      <div css={styles.motion(isScale)} />
      <div css={styles.filterGroup(isScale, isActive)}>
        <SearchFilter
          handleScale={handleScale}
          resetKeyword={resetKeyword}
          handleSetKeyword={updateKeyword}
        />
        <div css={[styles.btn_wrap, styles.dropdownMenu]}>
          {controlledFilterLength > 0 && (
            <FilterManager
              controlledFilterLength={controlledFilterLength}
              removeAllFilterControl={resetFilters}
            />
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export const FilterGroup = Object.assign(FilterGroupMain, {
  DrawerFilter: DrawerFilter,
  DropdownFilter: DropdownFilter,
});
