import type { PropsWithChildren } from 'react';

import { UiComponent } from '@/components';

import * as S from './Dim.styled';

interface DimProps {
  opacity?: number;
  isWhite?: boolean;
}

const Dim = ({ opacity = 0.45, isWhite = false, children }: PropsWithChildren<DimProps>) => {
  return (
    <UiComponent.Portal mounted>
      <S.Wrapper>
        <S.Cover opacity={opacity} isWhite={isWhite} />
        <S.Background>{children}</S.Background>
      </S.Wrapper>
    </UiComponent.Portal>
  );
};

export default Dim;
