import React from 'react';
import {
  Control,
  Controller,
  Path,
  FieldValues,
  useFormState,
} from 'react-hook-form';
import { FieldErrorMessage } from 'widgets/form-fields/ui/FieldErrorMessage';
import * as styles from './FormField.css';
import SubwayFilter from 'widgets/filters/ui/SubwayFilter';

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

const SubwaySelectField = <T extends FieldValues>({
  control,
  name,
  label = '호선 선택',
}: Props<T>) => {
  const { errors } = useFormState({ control });
  const errorMessage = errors[name]?.message as string | undefined;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <div css={styles.section}>
      <p>
        {label}
        <span css={styles.requireMark}>*</span>
      </p>
      <Controller
        name={name}
        control={control}
        rules={{
          required: '지하철 호선을 선택해주세요',
        }}
        render={({ field }) => (
          <SubwayFilter
            name={name}
            title="호선 변경"
            buttonLabel={label}
            errorMsg={errorMessage}
            current={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FieldErrorMessage css={styles.errMsgLayout} errMsg={errorMsg} />
    </div>
  );
};

export default SubwaySelectField;
