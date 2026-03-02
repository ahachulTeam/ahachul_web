'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { formatDisplayNumber } from '@ahhachul/utils';

import { ChevronDownIcon } from '@/assets/icon';
import type { ObjectQueryParams } from '@/types';
import { cn } from '@/utils';

import { ConditionalRender } from '../ConditionalRender';

interface Props {
  options: ObjectQueryParams;
}

export const ResetFilter = ({ options }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const clearSearchParams = () => {
    router.push(pathname);
  };

  const searchParams = useSearchParams();
  const renderThis = !!searchParams.toString();
  const activatedCount = Object.keys(options).filter(
    key => searchParams.has(key) && searchParams.get(key) !== options[key],
  ).length;
  const activatedCountText = formatDisplayNumber(activatedCount);

  return (
    <ConditionalRender isRender={renderThis}>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button className="ah-motion-lift flex h-9 shrink-0 items-center rounded-full border border-gray-30 bg-white px-3">
            <span className=" rounded-full bg-gray-90 text-gray-0 w-[14px] h-[14px] text-label-small font-medium inline-flex items-center justify-center">
              {activatedCountText}
            </span>
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
            <DropdownMenu.Label className=" px-3 py-3 text-xs text-gray-90">
              {activatedCountText}개 필터가 적용됨.
            </DropdownMenu.Label>
            <DropdownMenu.Item
              className="relative flex h-[46px] items-center bg-white pl-[12px] text-sm text-red hover:bg-gray-20"
              onClick={clearSearchParams}
            >
              모든 필터 지우기
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </ConditionalRender>
  );
};
