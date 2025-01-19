import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'motion/react';

export const Form = styled.form`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 0 20px;
    background-color: ${theme.colors.white};
  `}
`;

export const SearchIconWrapper = styled.button`
  position: absolute;
  left: 27px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }
`;

export const SearchInput = styled(motion.input)`
  ${({ theme }) => css`
    width: 100%;
    max-width: 100%;
    height: 36px;
    border-radius: 9px;
    padding: 0 12px 0 29px;
    font-size: 15px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.gray[20]};
    caret-color: rgba(0, 255, 163, 0.5);
    transition: all 0.3s ease;
    border: 0;

    &::placeholder {
      font-size: 15px;
      color: ${theme.colors.gray[70]};
    }

    &:active:not(:focus) {
      background-color: rgba(119, 119, 119, 0.8);
    }
  `}
`;

export const CancelButton = styled(motion.button)`
  ${({ theme }) => css`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(100%, -50%);
    font-size: 16px;
    color: ${theme.colors.primary.primary_pressed};
  `}
`;
