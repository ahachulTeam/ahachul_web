import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { UiComponent } from '@/components';

import * as S from './SubmitButton.styled';

interface SubmitButtoProps {
  active: boolean;
  loading: boolean;
  label?: string;
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtoProps> = ({
  active,
  loading,
  label = '등록',
  onSubmit,
}) => {
  const { watch } = useFormContext();

  const [title, content] = watch(['title', 'content']);

  const isDisabled = useMemo(() => {
    const isEmpty = (value?: string) => !value?.trim();
    return isEmpty(title) || isEmpty(content) || loading;
  }, [title, content, loading]);

  return (
    <UiComponent.AnimatePortal mounted={active}>
      <S.SubmitContainer>
        <S.SubmitButton type="button" onClick={onSubmit} disabled={isDisabled} aria-busy={loading}>
          {label}
        </S.SubmitButton>
      </S.SubmitContainer>
    </UiComponent.AnimatePortal>
  );
};

export default SubmitButton;
