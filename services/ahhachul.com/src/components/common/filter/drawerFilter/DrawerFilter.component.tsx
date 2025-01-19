import React, { useState, useCallback } from 'react';

import { Drawer } from 'vaul';

import { ChevronIcon, SearchIcon } from '@/assets/icons/system';

import * as S from './DrawerFilter.styled';

export interface DrawerFilterProps {
  label: string;
  drawerTitle: string;
}

const DrawerFilter: React.FC<DrawerFilterProps> = ({ label, drawerTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDrawer = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <Drawer.Root
      open={isOpen}
      shouldScaleBackground
      repositionInputs={false}
      onOpenChange={handleToggleDrawer}
    >
      <Drawer.Trigger asChild>
        <S.FilterButton>
          <span>{label}</span>
          <S.ChevronIconWrapper>
            <ChevronIcon />
          </S.ChevronIconWrapper>
        </S.FilterButton>
      </Drawer.Trigger>
      <Drawer.Portal>
        <S.Overlay />
        <S.DrawerContent>
          <S.ContentWrapper>
            <S.Header>
              <S.ActionButton variant="cancel" onClick={handleToggleDrawer}>
                취소
              </S.ActionButton>
              <S.HeaderTitle>{drawerTitle}</S.HeaderTitle>
              <S.ActionButton variant="done" onClick={handleToggleDrawer}>
                완료
              </S.ActionButton>
            </S.Header>
            <S.SearchContainer>
              <S.SearchIconWrapper>
                <SearchIcon />
              </S.SearchIconWrapper>
              <S.SearchInput placeholder="사용자 필터링" />
            </S.SearchContainer>
            <S.ContentArea />
          </S.ContentWrapper>
        </S.DrawerContent>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerFilter;
