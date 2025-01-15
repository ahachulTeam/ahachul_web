/* eslint-disable react/prop-types */
import React from 'react';

import { useActivity } from 'app/stackflow';

import { DrawerFilter } from './DrawerFilter';
import { DropdownFilter } from './DropdownFilter';
import * as styles from './Filter.css';
import { FilterManager } from './FilterManager';
import { SearchFilter } from './SearchFilter';

import { useKeywordSearch } from '../lib/useKeywordSearch';
import type { AppUniqueFilterId } from '../model';

interface FilterGroupProps {
  children: React.ReactNode;
  uniqueId: AppUniqueFilterId;
  isScale: boolean;
  activeFilterCount: number;
  handleScale: () => void;
  resetFilters: () => void;
}

type FilterGroupMainType = React.FC<FilterGroupProps>;

const FilterGroupMain: FilterGroupMainType = ({
  children,
  uniqueId,
  isScale,
  activeFilterCount,
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
          {activeFilterCount > 0 && (
            <FilterManager
              activeFilterCount={activeFilterCount}
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
