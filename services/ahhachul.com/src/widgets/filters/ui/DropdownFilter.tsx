import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@radix-ui/react-icons';
import { FilterButton } from './FilterButton';
import { useFilters } from './FilterContext';

export interface DropdownFilterProps {
  filterKey: string;
  buttonLabel: string;
  options: Record<string, string>;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  filterKey,
  buttonLabel,
  options,
}) => {
  const { filters, setFilter } = useFilters();
  const value = filters[filterKey];
  const currentLabel = options[value] || buttonLabel;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <FilterButton
          label={currentLabel}
          isActive={value !== Object.keys(options)[0]}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="start"
        sideOffset={10}
        alignOffset={-10}
        className="DropdownMenuContent"
      >
        <DropdownMenu.RadioGroup
          value={value}
          onValueChange={(newValue) => setFilter(filterKey, newValue)}
        >
          {Object.entries(options).map(([key, label]) => (
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
