import styled from '@emotion/styled';
import { motion } from 'motion/react';

export const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 0 20px;
  background-color: #141517;
`;

export const SearchIconWrapper = styled.button`
  position: absolute;
  left: 27px;
  top: 50%;
  transform: translateY(-48%);

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17.5px;
    height: 17.5px;
    opacity: 0.7;
  }
`;

export const SearchInput = styled(motion.input)`
  width: 100%;
  max-width: 100%;
  height: 36px;
  background-color: #2e3034;
  border-radius: 9px;
  padding: 0 12px 0 28px;
  font-size: 16px;
  color: #f0f4ff;
  caret-color: rgba(0, 255, 163, 0.5);
  transition: all 0.3s ease;

  &::placeholder {
    color: #999aa1;
  }

  &:active:not(:focus) {
    background-color: rgba(119, 119, 119, 0.8);
  }
`;

export const CancelButton = styled(motion.button)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(100%, -50%);
  font-size: 16px;
  color: #025fac;
`;
