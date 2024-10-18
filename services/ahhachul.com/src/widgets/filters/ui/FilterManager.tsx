import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as styles from './Filter.css';

interface FilterManagerProps {
  activeFilterCount: number;
  removeAllFilterControl: () => void;
}

export const FilterManager: React.FC<FilterManagerProps> = ({
  activeFilterCount,
  removeAllFilterControl,
}) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button css={styles.buttonFilter}>
          <span css={styles.controlledFilterLength}>{activeFilterCount}</span>
          <ChevronDownIcon stroke="#4C5874" className="arrow-down-img" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="start"
        sideOffset={10}
        alignOffset={-10}
        className="DropdownMenuContent"
      >
        <DropdownMenu.Label className="DropdownMenuLabel">
          {activeFilterCount}개 필터가 적용됨.
        </DropdownMenu.Label>
        <DropdownMenu.Item
          className="DropdownMenuItem red"
          onClick={removeAllFilterControl}
        >
          모든 필터 지우기
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
