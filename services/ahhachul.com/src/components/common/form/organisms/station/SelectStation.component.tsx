import { Controller, Path, FieldValues, useFormContext } from 'react-hook-form';

import { FormComponent, UiComponent } from '@/components';

import * as S from './SelectStation.styled';

interface Props<T extends FieldValues> {
  name: Path<T>;
  options: Record<string, string>;
  label?: string;
}

const SelectStation = <T extends FieldValues>({
  name,
  options,
  label = '역 선택 (선택)',
}: Props<T>) => {
  const {
    formState: { errors },
    control,
  } = useFormContext<T>();
  const errorMessage = errors[name]?.message as string | undefined;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <FormComponent.FormSection>
      <S.Label>{label}</S.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <UiComponent.StationPicker
            title="역 선택"
            buttonLabel={label}
            options={options}
            errorMsg={errorMsg}
            selectedStationId={String(field.value ?? '0')}
            onChange={field.onChange}
          />
        )}
      />
      <FormComponent.ErrorMessage errMsg={errorMsg} css={S.errorStyle} />
    </FormComponent.FormSection>
  );
};

export default SelectStation;
