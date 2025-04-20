import type { PropsWithChildren } from 'react';

import * as S from './FloatButton.styled';

interface FloatButtonProps {
  onClick: () => void;
  className?: string;
}

const FloatButton = ({ onClick, className, children }: PropsWithChildren<FloatButtonProps>) => {
  return (
    <S.FloatButton type="button" className={className} onClick={onClick}>
      {children}
    </S.FloatButton>
  );
};

export default FloatButton;
