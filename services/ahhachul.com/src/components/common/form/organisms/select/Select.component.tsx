import { Controller, Path, RegisterOptions, FieldValues, useFormContext } from 'react-hook-form';

import { FormComponent } from '@/components';

import { SelectMolecules } from '../../molecules';

interface SelectFieldProps<T extends FieldValues> {
  options: Record<string, string>;
  name: Path<T>;
  label?: string;
  rules?: Omit<RegisterOptions<T>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

const SelectField = <T extends FieldValues>({
  options,
  name,
  label = '카테고리',
  rules,
}: SelectFieldProps<T>) => {
  const {
    formState: { errors },
    control,
  } = useFormContext<T>();
  const errorMessage = errors[name]?.message;
  const errorMsg = typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <FormComponent.FormSection>
      <div>
        <p>{label}</p>
        <FormComponent.RequiredMark />
      </div>
      <Controller<T>
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <SelectMolecules
            options={options}
            isError={!!errorMsg}
            selectedOption={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
      <FormComponent.ErrorMessage errMsg={errorMsg} />
    </FormComponent.FormSection>
  );
};

export default SelectField;
