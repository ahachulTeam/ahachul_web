'use client';
<<<<<<< HEAD

import { useState, useEffect, useCallback } from 'react';

import clsx from 'clsx';

import ArrowDownIcon from '@/common/assets/icons/arrow-down';
import { Carousel, CarouselContent, CarouselItem } from '@/common/components/Carousel';
import { type CarouselApi } from '@/common/components/Carousel';
=======
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from '@/common/assets/icons/arrow-down';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/common/components/Carousel';
>>>>>>> develop
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/common/components/Drawer';
import SUBWAY_LINES from '@/common/constants/subwayLines';
<<<<<<< HEAD
import { cn } from '@/common/utils/cn';

=======

import { cn } from '@/common/utils/cn';

import { type CarouselApi } from '@/common/components/Carousel';

>>>>>>> develop
const CAROUSEL_SUBWAY_LINES = SUBWAY_LINES.reduce(
  (acc, _, index) => {
    if (index % 12 === 0) {
      acc.push(SUBWAY_LINES.slice(index, index + 12));
    }
    return acc;
  },
  [] as Array<{ name: string; id: number }[]>,
);

<<<<<<< HEAD
const DotButton = ({ active, onClick }: { active: boolean; onClick: () => void }) => {
  const buttonClass = clsx('h-2 rounded-full cursor-pointer transition-width duration-300', {
    'w-[15px] bg-[#33333E]': active,
    'w-2 bg-[#CED0DD]': !active,
  });
=======
const DotButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  const buttonClass = clsx(
    'h-2 rounded-full cursor-pointer transition-width duration-300',
    {
      'w-[15px] bg-[#33333E]': active,
      'w-2 bg-[#CED0DD]': !active,
    },
  );
>>>>>>> develop

  return <button className={buttonClass} onClick={onClick} />;
};

const SelectLineDrawer = ({ subwayLineId, setSubwayLineId }: any) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.scrollTo(selectedIndex, true);
    carouselApi.on('select', ({ selectedScrollSnap }) => {
      setSelectedIndex(selectedScrollSnap());
    });
  }, [carouselApi]);

  const onClickDotButton = useCallback(
    (index: number) => carouselApi && carouselApi.scrollTo(index),
    [carouselApi],
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex justify-between w-full border px-4 py-2 rounded-[5px]">
<<<<<<< HEAD
          {SUBWAY_LINES.find(line => line.id === subwayLineId)?.name}
=======
          {SUBWAY_LINES.find((line) => line.id === subwayLineId)?.name}
>>>>>>> develop
          <ArrowDownIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-full bg-gray-20 border border-gray-30 [box-shadow:0px_-5px_8px_0px_rgba(0,0,0,0.05)]">
        <div className="pl-[20px] pr-[20px] w-full h-full bg-gray-20">
          <DrawerHeader className="p-0 mb-[32px]">
<<<<<<< HEAD
            <DrawerTitle className="!text-title-small text-gray-90 mb-3">호선 변경</DrawerTitle>
=======
            <DrawerTitle className="!text-title-small text-gray-90 mb-3">
              호선 변경
            </DrawerTitle>
>>>>>>> develop
            <DrawerDescription className="text-left !text-label-medium text-gray-80">
              소식이 궁금한 호선을 선택해주세요.
            </DrawerDescription>
          </DrawerHeader>
          <Carousel className="w-full" setApi={setCarouselApi}>
            <CarouselContent className="ml-0 mb-[32px]">
<<<<<<< HEAD
              {CAROUSEL_SUBWAY_LINES.map(lines => {
=======
              {CAROUSEL_SUBWAY_LINES.map((lines) => {
>>>>>>> develop
                return (
                  <CarouselItem
                    key={lines.join('')}
                    className="pb-0 grid grid-cols-3 grid-rows-4 gap-x-[9px] gap-y-[20px] p-0 min-w-[335px]"
                  >
<<<<<<< HEAD
                    {lines.map(line => {
                      return (
                        <div key={line.name}>
                          <input type="radio" id={line.name} name="line" className="hidden" />
=======
                    {lines.map((line) => {
                      return (
                        <div key={line.name}>
                          <input
                            type="radio"
                            id={line.name}
                            name="line"
                            className="hidden"
                          />
>>>>>>> develop
                          <label
                            htmlFor={line.name}
                            onClick={() => setSubwayLineId(line.id)}
                            className={cn(
                              'w-full flex items-center justify-center rounded-full border px-[4px] py-[8px]',
                              'cursor-pointer min-w-[105px] text-label-medium',
                              subwayLineId === line.id
                                ? 'bg-key-color border-key-color text-gray-0'
                                : 'bg-gray-10 border-gray-30 text-gray-90',
                            )}
                          >
                            {line.name}
                          </label>
                        </div>
                      );
                    })}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <div className="flex justify-center gap-2">
            {CAROUSEL_SUBWAY_LINES.map((_, index) => {
              return (
                <DotButton
                  key={index}
                  active={index === selectedIndex}
                  onClick={() => onClickDotButton(index)}
                />
              );
            })}
          </div>
          <DrawerFooter className="w-full mt-[24px] p-0">
            <DrawerClose asChild>
              <button className="text-title-large text-gray-0 px-[138px] py-[15px] bg-key-color rounded-lg">
                완료
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectLineDrawer;
