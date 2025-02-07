import { Path, useFormContext } from 'react-hook-form';

import { FormComponent } from '@/components';

import * as S from './TitleField.styled';

interface TitleFieldProps<T extends Record<string, any>> {
  name: Path<T>;
}

const TitleField = <T extends Record<string, any>>({ name }: TitleFieldProps<T>) => {
  const {
    formState: { errors },
    register,
  } = useFormContext<T>();
  const errorMessage = errors[name]?.message;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <FormComponent.FormSection>
      <div>
        <p>제목</p>
        <FormComponent.RequiredMark />
      </div>
      <S.TextField
        {...register(name, {
          required: '제목을 입력해주세요',
          minLength: { value: 2, message: '제목은 2자 이상 입력해주세요.' },
          maxLength: { value: 20, message: '제목은 20자 이하로 입력해주세요.' },
        })}
        placeholder="제목"
        aria-invalid={!!errorMsg}
      />
      <FormComponent.ErrorMessage errMsg={errorMsg} css={S.errorStyle} />
    </FormComponent.FormSection>
  );
};

export default TitleField;
