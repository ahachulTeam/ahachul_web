import React from 'react';
import { UseFormRegister, FieldErrors, Path } from 'react-hook-form';
import { FieldErrorMessage } from 'shared/ui/FieldErrorMessage/FieldErrorMessage';
import * as styles from './FormField.css';

interface TitleFieldProps<T extends Record<string, any>> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
}

export const TitleField = <T extends Record<string, any>>({
  register,
  errors,
  name,
}: TitleFieldProps<T>) => {
  const errorMessage = errors[name]?.message;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <div css={styles.section}>
      <p>
        제목
        <span css={styles.requireMark}>*</span>
      </p>
      <input
        {...register(name, {
          required: '제목을 입력해주세요',
          minLength: { value: 2, message: '제목은 2자 이상 입력해주세요.' },
          maxLength: { value: 20, message: '제목은 20자 이하로 입력해주세요.' },
        })}
        placeholder="제목"
        aria-invalid={!!errorMsg}
      />
      <FieldErrorMessage css={styles.errMsgLayout} errMsg={errorMsg} />
    </div>
  );
};
