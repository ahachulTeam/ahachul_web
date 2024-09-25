import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';
import { SelectList } from 'shared/ui/Select/SelectList';
import { FieldErrorMessage } from 'shared/ui/FieldErrorMessage/FieldErrorMessage';
import * as styles from './FormField.css';

interface CategorySelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  options: Record<string, string>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export const CategorySelectField = <T extends FieldValues>({
  options,
  control,
  errors,
  name,
  label = '카테고리',
  rules,
}: CategorySelectFieldProps<T>) => {
  const errorMessage = errors[name]?.message;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <div css={styles.section}>
      <p>
        {label}
        <span css={styles.requireMark}>*</span>
      </p>
      <Controller<T>
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <SelectList
            options={options}
            current={field.value as string}
            hasError={!!errorMsg}
            handleChange={(key: string) => () => {
              field.onChange(key);
            }}
          />
        )}
      />
      <FieldErrorMessage css={styles.errMsgLayout} errMsg={errorMsg} />
    </div>
  );
};
