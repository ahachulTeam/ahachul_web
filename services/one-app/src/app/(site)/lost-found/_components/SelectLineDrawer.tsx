'use client';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from '@/common/assets/icons/arrow-down';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import SUBWAY_LINES from '@/constants/subwayLines';

import { type CarouselApi } from '@/components/ui/carousel';

const CAROUSEL_SUBWAY_LINES = SUBWAY_LINES.reduce(
  (acc, _, index) => {
    if (index % 12 === 0) {
      acc.push(SUBWAY_LINES.slice(index, index + 12));
    }
    return acc;
  },
  [] as Array<{ name: string; id: number }[]>,
);

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

  return <button className={buttonClass} onClick={onClick} />;
};

const SelectLineDrawer = ({ subwayLineId, setSubwayLineId }: any) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(selectedIndex, true);
    api.on('select', ({ selectedScrollSnap }) => {
      setSelectedIndex(selectedScrollSnap());
    });
  }, [api]);

  const onClickDotButton = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api],
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex justify-between w-full border px-4 py-2 rounded-[5px]">
          {SUBWAY_LINES.find((line) => line.id === subwayLineId)?.name}
          <ArrowDownIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-full bg-[#F5F5F5] border border-[#EAECF1] [box-shadow:0px_-5px_8px_0px_rgba(0,0,0,0.05)]">
        <div className="pl-[20px] pr-[20px] w-full h-full bg-[#F5F5F5]">
          <DrawerHeader className="p-0 mb-[32px]">
            <DrawerTitle className="text-left text-[#33333E] mb-3">
              호선 변경
            </DrawerTitle>
            <DrawerDescription className="text-left text-[#74757C]">
              소식이 궁금한 호선을 선택해주세요.
            </DrawerDescription>
          </DrawerHeader>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent className="ml-0 mb-[32px]">
              {CAROUSEL_SUBWAY_LINES.map((lines) => {
                return (
                  <CarouselItem
                    key={lines.join('')}
                    className="pb-0 grid grid-cols-3 grid-rows-4 gap-x-[9px] gap-y-[20px] p-0 min-w-[335px]"
                  >
                    {lines.map((line, idx) => {
                      return (
                        <div key={line.name}>
                          <input
                            type="radio"
                            id={line.name}
                            name="line"
                            className="hidden"
                          />
                          <label
                            htmlFor={line.name}
                            onClick={() => setSubwayLineId(line.id)}
                            className={`${subwayLineId === line.id ? 'bg-[#2ACF6C] border-[#2ACF6C] text-white' : 'bg-[#FCFCFC] border-[#EAECF1] text-[#33333E]'} w-full flex items-center justify-center rounded-full border px-[4px] py-[8px] cursor-pointer min-w-[105px]`}
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
              <button className="font-semibold text-white px-[138px] py-[15px] bg-[#2ACF6C] rounded-lg">
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
