import { Controller, Path, FieldValues, useFormContext } from 'react-hook-form';

import { FormComponent, UiComponent } from '@/components';

import * as S from './SelectSubwayLine.styled';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label?: string;
}

const SelectSubwayLine = <T extends FieldValues>({ name, label = '호선 선택' }: Props<T>) => {
  const {
    formState: { errors },
    control,
  } = useFormContext<T>();
  const errorMessage = errors[name]?.message as string | undefined;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <FormComponent.FormSection>
      <div>
        <p>{label}</p>
        <FormComponent.RequiredMark />
      </div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: '지하철 호선을 선택해주세요',
        }}
        render={({ field }) => (
          <UiComponent.SubwayLinePicker
            name={name}
            title="호선 변경"
            buttonLabel={label}
            errorMsg={errorMessage}
            selectedLine={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <FormComponent.ErrorMessage errMsg={errorMsg} css={S.errorStyle} />
    </FormComponent.FormSection>
  );
};

export default SelectSubwayLine;
