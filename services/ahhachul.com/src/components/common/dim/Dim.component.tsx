import type { PropsWithChildren } from 'react';

import * as S from './Dim.styled';

interface DimProps {
  opacity?: number;
  isWhite?: boolean;
}

const Dim = ({ opacity = 0.45, isWhite = false, children }: PropsWithChildren<DimProps>) => {
  return (
    <S.Wrapper>
      <S.Cover opacity={opacity} isWhite={isWhite} />
      <S.Background>{children}</S.Background>
    </S.Wrapper>
  );
};

export default Dim;
