import React, { HTMLAttributes } from 'react';

import { InfoIcon } from '@/assets/icons/system';

import * as S from './FormErrorMessage.styled';

interface FieldErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  errMsg?: string | null | undefined;
}

const FormErrorMessage: React.FC<FieldErrorMessageProps> = ({ errMsg, ...props }) => {
  if (!errMsg) return null;

  return (
    <S.ErrorMessage {...props}>
      <InfoIcon />
      <span>{errMsg}</span>
    </S.ErrorMessage>
  );
};

export default FormErrorMessage;
