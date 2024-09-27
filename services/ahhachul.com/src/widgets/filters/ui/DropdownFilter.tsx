import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import * as styles from './Filter.css';

export interface DropdownFilterProps<T extends Record<string, string>> {
  filters: T;
  filterKey: KeyOf<T>;
  handleSetFilter: <K extends KeyOf<T>>(key: K, value: T[K]) => void;
  buttonLabel: string;
  optionList: Record<string, string>;
}

export const DropdownFilter = <T extends Record<string, string>>({
  filters,
  filterKey,
  handleSetFilter,
  buttonLabel,
  optionList,
}: DropdownFilterProps<T>): React.ReactElement => {
  const value = filters[filterKey];
  const isActive = value !== Object.keys(optionList)[0];
  const currentLabel = optionList[value as string] || buttonLabel;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button data-active={isActive} css={styles.buttonFilter}>
          <span>{currentLabel}</span>
          <ChevronDownIcon
            className="arrow-down-img"
            stroke={isActive ? '#fff' : '#4C5874'}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="start"
        sideOffset={10}
        alignOffset={-10}
        className="DropdownMenuContent"
      >
        <DropdownMenu.RadioGroup
          value={value as string}
          onValueChange={(newValue) =>
            handleSetFilter(filterKey, newValue as T[keyof T])
          }
        >
          {Object.entries(optionList).map(([key, label]) => (
            <DropdownMenu.RadioItem
              key={key}
              className="DropdownMenuRadioItem"
              value={key}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
