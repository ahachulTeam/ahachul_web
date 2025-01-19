import type { PropsWithChildren } from 'react';

import * as S from './FloatButton.styled';

interface FloatButtonProps {
  onClick: () => void;
}

const FloatButton = ({ onClick, children }: PropsWithChildren<FloatButtonProps>) => {
  return (
    <S.FloatButton type="button" onClick={onClick}>
      {children}
    </S.FloatButton>
  );
};

export default FloatButton;
