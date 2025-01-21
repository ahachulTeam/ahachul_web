import { Controller, type Path, type FieldValues, useFormContext } from 'react-hook-form';

import { FormComponent } from '@/components';

import { ImageUploadMolecules } from '../../molecules';

interface ImageUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  onImgChange: (files: File[]) => void;
  onDeleteImg: (index: number) => void;
}

const ImageUploadField = <T extends FieldValues>({
  name,
  label,
  onImgChange,
  onDeleteImg,
}: ImageUploadFieldProps<T>) => {
  const { control } = useFormContext<T>();

  const handleChange = (files: File[]) => {
    onImgChange?.(files);
  };

  const handleDelete = (index: number) => {
    onDeleteImg(index);
  };

  return (
    <FormComponent.FormSection>
      <div>
        <p>{label}</p>
      </div>
      <Controller
        name={name}
        render={({ field }) => (
          <ImageUploadMolecules
            hasPreview
            images={(field.value as File[]) || []}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        )}
        control={control}
      />
    </FormComponent.FormSection>
  );
};

export default ImageUploadField;
