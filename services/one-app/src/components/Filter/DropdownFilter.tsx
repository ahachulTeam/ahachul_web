'use client';

import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { objectEntries } from '@ahhachul/utils';

import { CheckIcon, ChevronDownIcon } from '@/assets/icon';
import type { KeyOf, ObjectQueryParams } from '@/types';
import { cn } from '@/utils';

export interface DropdownFilterProps<T extends ObjectQueryParams, K extends KeyOf<T>> {
  name: string;
  value: K;
  options: T;
}

export const DropdownFilter = <T extends ObjectQueryParams, K extends KeyOf<T>>({
  name,
  value,
  options,
}: DropdownFilterProps<T, K>): React.ReactElement => {
  const defaultValue = Object.keys(options)[0] as KeyOf<T>;
  const isActive = defaultValue !== value;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = (newVal: string) => {
    let newSearchParams = new URLSearchParams(searchParams);

    if (newVal === defaultValue) {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, newVal);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'ah-motion-lift flex h-9 shrink-0 items-center rounded-full border border-gray-30 bg-white px-3',
            isActive && 'border-gray-70 bg-gray-10',
          )}
        >
          <span className="text-label-medium text-gray-90">{options[value]}</span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={10}
          alignOffset={-10}
          className={cn(
            'w-[190px] overflow-hidden rounded-2xl border border-gray-30 bg-white shadow-[0_12px_30px_rgba(10,14,25,0.18)]',
            'data-[state=open]:animate-[slideDownAndFade_150ms_ease-out]',
            'will-change-[opacity,transform]',
          )}
        >
          <DropdownMenu.RadioGroup
            value={value as string}
            onValueChange={newValue => onSelect(newValue)}
          >
            {objectEntries(options).map(([val, label]) => (
              <DropdownMenu.RadioItem
                key={val}
                value={val}
                className={cn(
                  'relative flex h-[46px] items-center bg-white pl-[34px] text-sm text-gray-90',
                  '[&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:border-gray-20',
                  'outline-none transition-colors hover:bg-gray-20',
                )}
              >
                <DropdownMenu.ItemIndicator className="absolute left-[6px] inline-flex w-[24px] items-center justify-center">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
                {label}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
