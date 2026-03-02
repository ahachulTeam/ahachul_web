import React, { useMemo, useReducer } from 'react';

import { Drawer } from 'vaul';

import { ChevronIcon } from '@/assets/icons/system';

import * as S from './StationPicker.styled';

import { SelectMolecules } from '../form/molecules';

interface StationPickerProps {
  title: string;
  buttonLabel: string;
  selectedStationId?: string;
  options: Record<string, string>;
  errorMsg?: string;
  onChange: (value: string) => void;
}

const DEFAULT_STATION_VALUE = '0';

const StationPicker: React.FC<StationPickerProps> = ({
  title,
  buttonLabel,
  selectedStationId,
  options,
  errorMsg,
  onChange,
}) => {
  const [isOpen, toggleOpen] = useReducer(open => !open, false);
  const normalizedSelectedStationId = selectedStationId ?? DEFAULT_STATION_VALUE;

  const isSelected = useMemo(
    () =>
      normalizedSelectedStationId !== DEFAULT_STATION_VALUE &&
      !!options[normalizedSelectedStationId],
    [normalizedSelectedStationId, options],
  );

  const selectedLabel = isSelected ? options[normalizedSelectedStationId] : buttonLabel;

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
        <S.SelectButton isActive={isSelected} aria-invalid={!!errorMsg}>
          <span>{selectedLabel}</span>
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
            <S.StationListContainer>
              <SelectMolecules
                overrideCss={S.stationList}
                options={options}
                selectedOption={normalizedSelectedStationId}
                variant="searchable"
                searchPlaceholder="역 이름 검색 (예: 강남)"
                emptyMessage="검색 결과가 없습니다."
                isError={!!errorMsg}
                onChange={handleChange}
              />
            </S.StationListContainer>
          </S.ContentWrapper>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default StationPicker;
