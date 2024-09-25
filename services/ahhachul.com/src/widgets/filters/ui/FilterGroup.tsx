import React from 'react';
import { FilterProvider, useFilters } from './FilterContext';
import { SearchFilter, SearchFilterProps } from './SearchFilter';
import { DropdownFilter, DropdownFilterProps } from './DropdownFilter';
import { DrawerFilter, DrawerFilterProps } from './DrawerFilter';
import { FilterManager } from './FilterManager';
import * as styles from './Filter.css';

interface FilterGroupProps {
  children: React.ReactNode;
  id: string;
  isScale: boolean;
  isActive: boolean;
  defaultValues: Record<string, string>;
  handleScale: () => void;
}

const FilterGroupInner: React.FC<
  Omit<FilterGroupProps, 'id' | 'defaultValues'>
> = ({ children, isScale, isActive, handleScale }) => {
  const { controlledFilterLength, resetFilters, setKeyword, resetKeyword } =
    useFilters();

  return (
    <>
      <div css={styles.motion(isScale)} />
      <div css={styles.filterGroup(isScale, isActive)}>
        <SearchFilter
          handleScale={handleScale}
          resetKeyword={resetKeyword}
          handleSetKeyword={setKeyword}
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

type FilterGroupMainType = React.FC<FilterGroupProps> & {
  SearchFilter: React.FC<SearchFilterProps>;
  DrawerFilter: React.FC<DrawerFilterProps>;
  DropdownFilter: React.FC<DropdownFilterProps>;
};

const FilterGroupMain: FilterGroupMainType = ({
  id,
  children,
  isScale,
  isActive,
  defaultValues,
  handleScale,
}) => (
  <FilterProvider id={id} defaultValues={defaultValues}>
    <FilterGroupInner
      isScale={isScale}
      isActive={isActive}
      handleScale={handleScale}
    >
      {children}
    </FilterGroupInner>
  </FilterProvider>
);

FilterGroupMain.SearchFilter = SearchFilter;
FilterGroupMain.DrawerFilter = DrawerFilter;
FilterGroupMain.DropdownFilter = DropdownFilter;

export const FilterGroup = FilterGroupMain;
