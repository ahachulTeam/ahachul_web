import React from 'react';
import { SymbolIcon } from '@radix-ui/react-icons';
import { AnimatedState } from '../AnimatedState/AnimatedState';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface Props {
  status: 'error' | 'idle' | 'pending' | 'success';
  idleText?: string;
  successText?: string;
  errorText?: string;
  className?: string;
  handleClick?: () => void;
}

export const SmoothButton = ({
  status,
  idleText = '확인',
  successText = '삭제 완료',
  errorText = '오류 발생',
  className,
  handleClick,
}: Props) => {
  const buttonContent = {
    idle: idleText,
    pending: <SpinningIcon />,
    success: successText,
    error: errorText,
  };

  return (
    <StyledButton
      type="button"
      disabled={status !== 'idle'}
      className={className}
      onClick={() => {
        if (status === 'success' || status === 'error') return;
        handleClick?.();
      }}
    >
      <AnimatedStateWrapper state={status}>
        {buttonContent[status]}
      </AnimatedStateWrapper>
    </StyledButton>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button`
  position: relative;
  height: 32px;
  width: 144px;
  overflow: hidden;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:disabled {
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

const AnimatedStateWrapper = styled(AnimatedState)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SpinningIcon = styled(SymbolIcon)`
  width: 16px;
  height: 16px;
  animation: ${spin} 1s linear infinite;
`;
