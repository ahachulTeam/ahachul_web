import React, { useReducer } from 'react';

import { Drawer } from 'vaul';

import { ChevronIcon } from '@/assets/icons/system';
import type { SubwayLineType } from '@/types';

import * as S from './SubwayLinePicker.styled';

import { SelectMolecules } from '../form/molecules';

const subwayLineOptions = {
  '1': '1호선',
  '2': '2호선',
  '3': '3호선',
  '4': '4호선',
  '5': '5호선',
  '6': '6호선',
  '7': '7호선',
  '8': '8호선',
  '9': '9호선',
  '11': '경의중앙선',
  '13': '공항철도',
  '15': '서해선',
  '16': '수인분당선',
  '18': '신분당선',
  '20': '우이신설경전철',
};

interface SubwayLinePickerProps {
  name: string;
  title: string;
  buttonLabel: string;
  selectedLine: SubwayLineType;
  errorMsg?: string;
  onChange: (value: string) => void;
}

const SubwayLinePicker: React.FC<SubwayLinePickerProps> = ({
  title,
  selectedLine,
  buttonLabel,
  errorMsg,
  onChange,
}) => {
  const [isOpen, toggleOpen] = useReducer(open => !open, false);

  const handleChange = (value: string) => {
    onChange(value);
    toggleOpen();
  };

  return (
    <Drawer.Root
      open={isOpen}
      shouldScaleBackground={false}
      repositionInputs={false}
      onOpenChange={toggleOpen}
    >
      <Drawer.Trigger asChild>
        <S.SelectButton isActive={!!selectedLine} aria-invalid={!!errorMsg}>
          <span>
            {selectedLine
              ? subwayLineOptions[selectedLine as keyof typeof subwayLineOptions]
              : buttonLabel}
          </span>
          <ChevronIcon />
        </S.SelectButton>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay css={S.overlay} />
        <Drawer.Content css={S.drawerContainer}>
          <S.ContentWrapper>
            <S.DrawerHeader>
              <S.CancelButton onClick={toggleOpen}>취소</S.CancelButton>
              <S.DrawerTitle>{title}</S.DrawerTitle>
              <S.DoneButton disabled>완료</S.DoneButton>
            </S.DrawerHeader>
            <S.SubwayListContainer>
              <SelectMolecules
                overrideCss={S.subwayList}
                options={subwayLineOptions}
                selectedOption={selectedLine}
                onChange={handleChange}
              />
            </S.SubwayListContainer>
          </S.ContentWrapper>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SubwayLinePicker;
