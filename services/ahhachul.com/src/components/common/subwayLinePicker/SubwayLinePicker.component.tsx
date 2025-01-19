import React, { useReducer } from 'react';

import { Drawer } from 'vaul';

import { ChevronIcon } from '@/assets/icons/system';
import { subwayLineOptions } from '@/constants';
import type { SubwayLineType } from '@/types';

import * as S from './SubwayLinePicker.styled';

import { SelectMolecules } from '../form/molecules';

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
    <Drawer.Root open={isOpen} shouldScaleBackground onOpenChange={toggleOpen}>
      <Drawer.Trigger asChild>
        <S.SelectButton isActive={!!selectedLine} aria-invalid={!!errorMsg}>
          <span>{selectedLine ? subwayLineOptions[selectedLine] : buttonLabel}</span>
          <ChevronIcon />
        </S.SelectButton>
      </Drawer.Trigger>
      <Drawer.Portal>
        <S.DrawerOverlay />
        <S.DrawerContainer>
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
        </S.DrawerContainer>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SubwayLinePicker;
