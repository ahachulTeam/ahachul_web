import React from 'react';

import { UiComponent } from '@/components';

import * as S from './SubmitButton.styled';

interface SubmitButtoProps {
  active: boolean;
  loading: boolean;
  label?: string;
  disabled?: boolean;
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtoProps> = ({
  active,
  loading,
  disabled,
  label = '등록',
  onSubmit,
}) => {
  return (
    <UiComponent.AnimatePortal mounted={active}>
      <S.SubmitContainer>
        <S.SubmitButton type="button" onClick={onSubmit} disabled={disabled} aria-busy={loading}>
          {label}
        </S.SubmitButton>
      </S.SubmitContainer>
    </UiComponent.AnimatePortal>
  );
};

export default SubmitButton;
