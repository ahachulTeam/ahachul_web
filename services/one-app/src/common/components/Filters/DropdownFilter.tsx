import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import type { KeyOf } from '@/model/Utils';
import { objectEntries } from '@/common/utils/object';
import CheckIcon from '@/common/assets/icons/check';
import ChevronDownIcon from '@/common/assets/icons/chevron-down';

export interface DropdownFilterProps<
  T extends Record<string, string>,
  K extends KeyOf<T>,
> {
  name: K;
  filters: T;
  options: Record<string, string>;
  onSelect: (key: K, value: T[K]) => void;
}

export const DropdownFilter = <
  T extends Record<string, string>,
  K extends KeyOf<T>,
>({
  filters,
  options,
  onSelect,
  name,
}: DropdownFilterProps<T, K>): React.ReactElement => {
  const activeValue = filters[name];
  const defaultValue = Object.keys(options)[0] as T[K];
  const isActive = activeValue !== defaultValue;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button data-active={isActive}>
          <span>{options[activeValue]}</span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="start"
        sideOffset={10}
        alignOffset={-10}
        className="DropdownMenuContent"
      >
        <DropdownMenu.RadioGroup
          value={activeValue as string}
          onValueChange={(newValue) => onSelect(name, newValue as T[K])}
        >
          {objectEntries(options).map(([val, label]) => (
            <DropdownMenu.RadioItem
              key={val}
              value={val}
              className="DropdownMenuRadioItem"
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
