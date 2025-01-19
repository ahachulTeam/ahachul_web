import React from 'react';

import { UiComponent } from '@/components';

import * as S from './SubmitButton.styled';

interface SubmitButtonGProps {
  isActive: boolean;
  isSubmitting: boolean;
  label?: string;
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonGProps> = ({
  isActive,
  isSubmitting,
  label = '등록',
  onSubmit,
}) => {
  return (
    <UiComponent.AnimatePortal mounted={isActive}>
      <S.SubmitContainer>
        <S.SubmitButton
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {label}
        </S.SubmitButton>
      </S.SubmitContainer>
    </UiComponent.AnimatePortal>
  );
};

export default SubmitButton;
